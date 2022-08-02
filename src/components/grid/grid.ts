/* eslint-disable @typescript-eslint/no-explicit-any */
import * as PIXI from "pixi.js";
import { dimensions } from "../../utils";
import { clamp } from "../../utils/math";
import config from "../../config";
import { ConnectionType, Tile } from "../tiles/tile";
import { Direction, rotateClockWise } from "../../utils/directions";
import state from "../../state";
import { EditMode } from "../../utils/edit_mode";
import Graph from "../../logic/graph";
import { deleteTile, editTile, setTile } from "../../history/tile_actions";
import HistoryManager from "../../history/history_manager";
import { PlacedChip } from "../chip/placed_chip";
import ChipTile from "../tiles/chip_tile";
import { deleteChip } from "../../history/chip_actions";
import ChipInputTile from "../tiles/chip_input_tile";
import ButtonTile from "../tiles/button_tile";
import LeverTile from "../tiles/lever_tile";
import ChipOutputTile from "../tiles/chip_output_tile";
import { ChipOutputTileType, TileType } from "../tiles/tile_types";
import ChipGridMode from "../../utils/chip_grid_mode";
import IOTile from "../tiles/io_tile";

type Handler<P> = Array<(payload: P, reject?: () => void) => Promise<void>>;

interface GridHandlers {
    preAddTile: Handler<Tile>;
    postAddTile: Handler<Tile>;
    postRemoveTile: Handler<Tile>;
    postEditTile: Handler<Tile>;
    postAddChip: Handler<PlacedChip>;
    postRemoveChip: Handler<PlacedChip>;
}

/** Grid class */
export default class Grid extends PIXI.Container {
    startingSize: number;
    size: number;
    tiles: Map<string, Tile> = new Map();
    chips: PlacedChip[] = [];

    lineGraphics: PIXI.Graphics;
    hlTile: PIXI.Graphics;
    selectionGraphics: PIXI.Graphics;
    chipOutlines: PIXI.Container;
    tilesContainer: PIXI.Container;

    historyManager: HistoryManager;

    sortableChildren = true;
    zIndex = 1000;

    handlers: GridHandlers = {
        preAddTile: [],
        postAddTile: [],
        postRemoveTile: [],
        postEditTile: [],
        postAddChip: [],
        postRemoveChip: [],
    };

    dragData: {
        isDragging: boolean;
        startLocation: {
            grid: { x: number; y: number } | undefined;
            screen: { x: number; y: number } | undefined;
        };
        endLocation: {
            grid: { x: number; y: number } | undefined;
            screen: { x: number; y: number } | undefined;
        };
    } = {
        isDragging: false,
        startLocation: { grid: undefined, screen: undefined },
        endLocation: { grid: undefined, screen: undefined },
    };

    /**
     * Constructs grid
     *
     * @param size pixel size of grid tile
     * @param tiles initial tiles
     */
    constructor(size: number, tiles?: Map<string, Tile>) {
        super();

        this.startingSize = size;
        this.size = size;

        this.historyManager = new HistoryManager();

        this.lineGraphics = new PIXI.Graphics();
        this.lineGraphics.zIndex = 1000;
        this.hlTile = new PIXI.Graphics();
        this.hlTile.zIndex = 200;
        this.hlTile.alpha = 0.2;
        this.selectionGraphics = new PIXI.Graphics();
        this.selectionGraphics.zIndex = 2000;
        this.selectionGraphics.alpha = 0.2;
        this.chipOutlines = new PIXI.Container();
        this.chipOutlines.zIndex = 1500;

        if (tiles) this.tiles = tiles;

        this.addChild(this.lineGraphics);
        this.addChild(this.hlTile);
        this.addChild(this.selectionGraphics);
        this.addChild(this.chipOutlines);

        this.tilesContainer = new PIXI.Container();
        this.addChild(this.tilesContainer);

        this.renderGrid();
    }

    /**
     * get tile at location
     *
     * @param x x coordinate
     * @param y y coordinate
     * @returns tile at location
     */
    getTile(x: number, y: number) {
        return this.tiles.get(`${x},${y}`);
    }

    /**
     * set tile at location
     *
     * @param x x coordinate
     * @param y y coordinate
     * @param tile
     */
    setTile(x: number, y: number, tile: Tile) {
        this.tiles.set(`${x},${y}`, tile);
    }

    /**
     * remove tile at coordinate
     *
     * @param x x coordinate
     * @param y y coordinate
     */
    deleteTile(x: number, y: number) {
        this.tiles.delete(`${x},${y}`);
    }

    addHandler = <T extends keyof GridHandlers>(
        handlerName: T,
        callback: GridHandlers[T][number]
    ) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.handlers[handlerName].push(callback as any);
    };

    dispatchHandler = async <T extends keyof GridHandlers>(
        handlerName: T,
        payload: Parameters<GridHandlers[T][number]>[0],
        reject?: () => void
    ) => {
        for (const handler of this.handlers[handlerName]) {
            await handler(payload as any, reject);
        }
    };

    /**
     * Connects tiles together
     *
     * @param toTile tile to connect to
     * @param fromTile tile to connect from
     * @param direction direction from newTile to prevTile
     * @param forced if the connection should be forced
     */
    async connectTiles(
        toTile: Tile,
        fromTile: Tile,
        direction: Direction,
        forced = false
    ) {
        // Get direction of connection
        const oppositeDirection = Direction.toLower(
            Direction.getOpposite(direction)
        );
        const directDirection = Direction.toLower(direction);

        // Determine whether the tiles can be connected
        const canConnect =
            toTile.getConnectionTemplate()[directDirection] !==
                ConnectionType.BLOCKED &&
            fromTile.getConnectionTemplate()[oppositeDirection] !==
                ConnectionType.BLOCKED &&
            (forced || toTile.isWire || fromTile.isWire);

        // If the tiles can be connected and the previous tile is not already connected,
        // connect the previous tile
        if (!fromTile.getConnections()[oppositeDirection] && canConnect) {
            const newFromTile = fromTile.clone();
            newFromTile.setConnection(oppositeDirection, true);
            await this.historyManager.performAction(editTile, {
                x: newFromTile.x,
                y: newFromTile.y,
                tile: newFromTile,
                grid: this,
            });
        }

        // If the new tile is not already connected and the tiles can be connected or we are placing a new tile
        // connect the new tile
        if (!toTile.getConnections()[directDirection] && canConnect) {
            const newToTile = toTile.clone();
            newToTile.setConnection(directDirection, true);
            await this.historyManager.performAction(editTile, {
                x: newToTile.x,
                y: newToTile.y,
                tile: newToTile,
                grid: this,
            });
        }
    }

    /**
     * handles forced connections of tiles
     *
     * @param x x coordinate
     * @param y y coordinate
     */
    async handleForceConnection(x: number, y: number) {
        let tile = this.getTile(x, y);
        if (!tile) return;

        for (const key in tile.getConnectionForce()) {
            const forceDirectionKey = key as "up" | "right" | "down" | "left";
            const force = tile.getConnectionForce()[forceDirectionKey];
            const forceDirection = Direction.fromString(forceDirectionKey);
            if (force) {
                const forceTile = this.getTile(
                    tile.x + Direction.getOffset(forceDirection)[0],
                    tile.y + Direction.getOffset(forceDirection)[1]
                );
                if (forceTile) {
                    await this.connectTiles(
                        tile,
                        forceTile,
                        forceDirection,
                        true
                    );
                    tile = this.getTile(x, y) as Tile;
                }
            }
        }

        for (const direction of Direction.values()) {
            const adjacentTile = this.getTile(
                tile.x + Direction.getOffset(direction)[0],
                tile.y + Direction.getOffset(direction)[1]
            );
            if (adjacentTile) {
                if (
                    adjacentTile.getConnectionForce()[
                        Direction.toLower(Direction.getOpposite(direction))
                    ]
                ) {
                    await this.connectTiles(tile, adjacentTile, direction);
                    tile = this.getTile(x, y) as Tile;
                }
            }
        }
    }

    /**
     * add tile to grid
     *
     * @param x x location of tile
     * @param y y location of tile
     * @param type tile to add
     * @param prevTile last tile added
     * @param direction direction of placement
     * @param noHistory if history shouldn't be recorded
     * @param fromChipPlacement if the tile is being placed from a chip
     * @returns tile if add was successful, undefined otherwise
     */
    async addTile(
        x: number,
        y: number,
        type: TileType,
        prevTile: Tile | undefined,
        direction: Direction | undefined,
        noHistory = false,
        fromChipPlacement = false
    ): Promise<Tile | undefined> {
        const tileAtLocation = this.getTile(x, y);
        if (tileAtLocation) {
            const interacting = this.historyManager.interacting;
            if (!interacting) this.historyManager.beginInteraction();
            const extraTile = new type.tile(x, y);
            if (
                tileAtLocation instanceof ChipInputTile &&
                !tileAtLocation.extraInputTile &&
                (extraTile instanceof ButtonTile ||
                    extraTile instanceof LeverTile) &&
                !state.chipEditor
            ) {
                const newTileAtLocation =
                    tileAtLocation.clone() as ChipInputTile;
                newTileAtLocation.setExtraInputTile(extraTile);
                await this.historyManager.performAction(
                    editTile,
                    {
                        x,
                        y,
                        tile: newTileAtLocation,
                        grid: this,
                    },
                    false,
                    !noHistory
                );
                tileAtLocation.chip?.deleteTile(x, y);
                tileAtLocation.chip?.setTile(x, y, newTileAtLocation);
            }
            if (direction !== undefined && prevTile)
                await this.connectTiles(
                    this.getTile(x, y) as Tile,
                    prevTile,
                    direction
                );
            if (!interacting) this.historyManager.endInteraction();
            return this.getTile(x, y);
        }

        const tileObj = new type.tile(x, y);

        if (fromChipPlacement && tileObj instanceof ChipTile) {
            tileObj.placedInChip = false;
        }

        if (
            tileObj instanceof IOTile &&
            state.chipEditor &&
            state.chipGridMode === ChipGridMode.EDITING
        )
            tileObj.isInParentChip = true;

        if (tileObj instanceof ChipOutputTile)
            tileObj.hue = (type as ChipOutputTileType).hue;

        const interacting = this.historyManager.isInteracting();
        if (!interacting) this.historyManager.beginInteraction();

        await this.historyManager.performAction(
            setTile,
            {
                x,
                y,
                tile: tileObj,
                grid: this,
            },
            false,
            !noHistory
        );

        if (prevTile && direction !== undefined)
            await this.connectTiles(tileObj, prevTile, direction);

        await this.handleForceConnection(x, y);

        if (!interacting) this.historyManager.endInteraction();

        return this.getTile(x, y) as Tile;
    }

    removingExtraTiles = false;

    /**
     * Removes tile at location
     *
     * @param x x coordinate
     * @param y y coordinate
     * @param removeChip whether you are moving a chip (Leave this as default value)
     * @param noHistory if history shouldn't be recorded
     * @returns success of deletion
     */
    async removeTile(
        x: number,
        y: number,
        removeChip = false,
        noHistory = false
    ) {
        const tile = this.getTile(x, y);
        if (!tile) return false;
        // (tile as GraphicsTile).graphics?.destroy();

        if (
            state.editMode === EditMode.ERASER &&
            !state.chipEditor &&
            tile instanceof ChipInputTile &&
            tile.extraInputTile &&
            !removeChip
        ) {
            this.removingExtraTiles = true;
        }

        if (
            !removeChip &&
            state.editMode !== EditMode.CURSOR &&
            tile instanceof ChipInputTile &&
            tile.extraInputTile
        ) {
            const newTile = tile.clone() as ChipInputTile;
            newTile.setExtraInputTile(undefined);
            await this.historyManager.performAction(
                editTile,
                {
                    x,
                    y,
                    tile: newTile,
                    grid: this,
                },
                false,
                !noHistory
            );
            return;
        }

        if (this.removingExtraTiles) return;

        if (!removeChip && tile instanceof ChipTile && tile.chip) {
            this.removeChip(tile.chip, !noHistory);
        } else {
            await this.historyManager.performAction(
                deleteTile,
                { x, y, grid: this },
                false,
                !noHistory
            );
        }

        const removalSpots: {
            offset: number[];
            side: "up" | "right" | "down" | "left";
        }[] = [
            { offset: [-1, 0], side: "right" },
            { offset: [1, 0], side: "left" },
            { offset: [0, -1], side: "down" },
            { offset: [0, 1], side: "up" },
        ];
        for (const removalSpot of removalSpots) {
            const adjacentTile = this.getTile(
                x + removalSpot.offset[0],
                y + removalSpot.offset[1]
            );

            if (
                adjacentTile !== undefined &&
                adjacentTile.getConnections()[removalSpot.side]
            ) {
                const newTile = adjacentTile.clone();
                newTile.setConnection(removalSpot.side, false);
                await this.historyManager.performAction(
                    editTile,
                    {
                        x: newTile.x,
                        y: newTile.y,
                        tile: newTile,
                        grid: this,
                    },
                    false,
                    !noHistory
                );
            }
        }
        return true;
    }

    /**
     * removed specified chip
     *
     * @param placedChip placed chip to be removed
     * @param recordHistory if true, record history
     */
    async removeChip(placedChip: PlacedChip, recordHistory = true) {
        const interacting = this.historyManager.isInteracting();
        if (!interacting) this.historyManager.beginInteraction();

        placedChip.chip.getRootOriginal().placedChips.delete(placedChip);

        await this.historyManager.performAction(
            deleteChip,
            {
                grid: this,
                chip: placedChip,
            },
            false,
            recordHistory
        );

        if (!interacting) this.historyManager.endInteraction(!recordHistory);
    }

    /**
     * Rotates tiles clockwise
     *
     * @param x x coordinate
     * @param y y coordinate
     */
    async rotateTile(x: number, y: number) {
        const tile = this.getTile(x, y);
        if (tile && tile.breakOnRotate) {
            const newTile = tile.clone();
            if (newTile.rotatable) {
                newTile.direction = rotateClockWise(tile.direction);
            }

            if (newTile.hasConnections()) {
                newTile.setConnection("up", false);
                newTile.setConnection("down", false);
                newTile.setConnection("left", false);
                newTile.setConnection("right", false);
            }

            const interacting = this.historyManager.isInteracting();
            if (!interacting) this.historyManager.beginInteraction();

            if (newTile.rotatable || tile.hasConnections()) {
                await this.historyManager.performAction(editTile, {
                    x,
                    y,
                    tile: newTile,
                    grid: this,
                });
            }

            const removalSpots: {
                offset: number[];
                side: "up" | "right" | "down" | "left";
            }[] = [
                { offset: [-1, 0], side: "right" },
                { offset: [1, 0], side: "left" },
                { offset: [0, -1], side: "down" },
                { offset: [0, 1], side: "up" },
            ];
            for (const removalSpot of removalSpots) {
                const adjacentTile = this.getTile(
                    x + removalSpot.offset[0],
                    y + removalSpot.offset[1]
                );

                if (
                    adjacentTile !== undefined &&
                    adjacentTile.getConnections()[removalSpot.side]
                ) {
                    const newAdjacentTile = adjacentTile.clone();
                    newAdjacentTile.setConnection(removalSpot.side, false);
                    await this.historyManager.performAction(editTile, {
                        x: newAdjacentTile.x,
                        y: newAdjacentTile.y,
                        tile: newAdjacentTile,
                        grid: this,
                    });
                }
            }

            await this.handleForceConnection(tile.x, tile.y);
            if (!interacting) this.historyManager.endInteraction();
        }
    }

    zoom = (x: number, y: number, delta: number) => {
        let mult = config.zoomCoeff * delta;
        if (mult < 0) mult = -1 / mult;

        const prevPos = this.screenToGrid(x, y);

        this.size = Math.round(mult * this.size);
        this.size = clamp(this.size, 10, 350);

        const newPos = this.screenToGrid(x, y);

        this.x += (newPos.x - prevPos.x) * this.size;
        this.y += (newPos.y - prevPos.y) * this.size;

        this.update({
            updateTiles: { updateSize: true },
            updateGridLines: true,
        });
    };

    /** renders out grid */
    renderGrid() {
        const width = dimensions()[0];
        const height = dimensions()[1];
        const tileXCount = Math.floor(width / this.size);
        const tileYCount = Math.floor(height / this.size);

        this.lineGraphics.clear();

        for (
            let x = -Math.ceil(this.x / this.size);
            x <= tileXCount - Math.floor(this.x / this.size);
            x++
        ) {
            this.lineGraphics.beginFill(config.lineColor);
            this.lineGraphics.lineStyle(0);
            this.lineGraphics.drawRect(
                x * this.size -
                    (config.lineWidth *
                        (x % Math.floor(clamp(200 / this.size, 3, 8)) === 0
                            ? 2
                            : 1)) /
                        2,
                -this.y,
                config.lineWidth *
                    (x % Math.floor(clamp(200 / this.size, 3, 8)) === 0
                        ? 2
                        : 1),
                height
            );
        }

        for (
            let y = -Math.ceil(this.y / this.size);
            y <= tileYCount - Math.floor(this.y / this.size);
            y++
        ) {
            this.lineGraphics.beginFill(config.lineColor);
            this.lineGraphics.lineStyle(0);
            this.lineGraphics.drawRect(
                -this.x,
                y * this.size -
                    (config.lineWidth *
                        (y % Math.floor(clamp(200 / this.size, 3, 8)) === 0
                            ? 2
                            : 1)) /
                        2,
                width,
                config.lineWidth *
                    (y % Math.floor(clamp(200 / this.size, 3, 8)) === 0 ? 2 : 1)
            );
        }
    }

    /** render selection */
    renderSelection() {
        if (
            state.editMode === EditMode.CURSOR &&
            this.dragData.startLocation.grid &&
            this.dragData.endLocation.grid
        ) {
            const minX = Math.min(
                this.dragData.startLocation.grid.x,
                this.dragData.endLocation.grid.x
            );
            const minY = Math.min(
                this.dragData.startLocation.grid.y,
                this.dragData.endLocation.grid.y
            );

            const maxX = Math.max(
                this.dragData.startLocation.grid.x,
                this.dragData.endLocation.grid.x
            );
            const maxY = Math.max(
                this.dragData.startLocation.grid.y,
                this.dragData.endLocation.grid.y
            );

            const start = this.gridToScreen(minX, minY);
            const end = this.gridToScreen(maxX + 1, maxY + 1);

            this.selectionGraphics.clear();
            this.selectionGraphics.beginFill(config.colors.gridSelection);
            this.selectionGraphics.lineStyle(4, config.colors.gridSelection);
            this.selectionGraphics.drawRect(
                start.x - this.x,
                start.y - this.y,
                end.x - start.x,
                end.y - start.y
            );
        }
    }

    /**
     * renders all the tiles
     *
     * @param root0
     * @param root0.updateSize
     * @param root0.newGraphics
     * @param root0.newDirection
     */
    renderTiles({
        updateSize = false,
        newGraphics = false,
        newDirection = false,
    }) {
        for (const tile of this.tiles.values())
            if (tile)
                tile.update({
                    newDirection,
                    newGraphics,
                    newSize: updateSize ? this.size : undefined,
                });
    }

    /**
     * render all the chip outlines
     *
     * @param mouseX
     * @param mouseY
     */
    renderChipOutlines(mouseX: number, mouseY: number) {
        // TODO: make this more efficient
        const tile = this.getTile(mouseX, mouseY);
        // for (const child of this.chipOutlines.children) child.destroy();
        this.chipOutlines.removeChildren();
        for (const chip of this.chips) {
            const hovering =
                tile instanceof ChipTile &&
                tile.chip?.scopeName === chip.scopeName;
            this.chipOutlines.addChild(
                chip.buildOutlineGraphic(this, hovering)
            );
        }
    }

    /** Removes all children that are tile containers */
    removeTileGraphics() {
        // TODO: make better
        for (const child of this.children) {
            if (
                child !== this.lineGraphics &&
                child !== this.hlTile &&
                child !== this.selectionGraphics &&
                child !== this.chipOutlines
            ) {
                this.removeChild(child);
            }
        }
    }

    /** Generates containers for each tile */
    generateTileGraphics() {
        for (const tile of this.tiles.values()) {
            if (tile) {
                const tileGraphics: PIXI.Container = tile.getContainer(
                    this.size
                );
                this.tilesContainer.addChild(tileGraphics);
            }
        }
    }

    /** Updates the background and the grid lines. Should be called when screen has moved or resized */
    updateGridLines() {
        this.renderGrid();
    }

    /**
     * Updates all the graphics of the tiles
     *
     * @param options
     * @param options.updateSize
     * @param options.newGraphics
     * @param options.newDirection
     */
    updateTiles(options: {
        updateSize?: boolean;
        newGraphics?: boolean;
        newDirection?: boolean;
    }) {
        this.renderTiles(options);
    }

    /** Updates the selection */
    updateSelection() {
        this.renderSelection();
    }

    /**
     * Update the grids graphics
     *
     * @param root0
     * @param root0.updateGridLines
     * @param root0.updateTiles
     * @param root0.updateSelection
     * @param root0.updateTiles.updateSize
     * @param root0.updateTiles.newGraphics
     * @param root0.updateTiles.newDirection
     */
    update({
        updateGridLines = true,
        updateTiles = {
            updateSize: false,
            newGraphics: false,
            newDirection: false,
        },
        updateSelection = true,
    }: {
        updateGridLines?: boolean;
        updateTiles: {
            updateSize?: boolean | undefined;
            newGraphics?: boolean | undefined;
            newDirection?: boolean | undefined;
        };
        updateSelection?: boolean;
    }) {
        if (updateGridLines) this.updateGridLines();
        this.updateTiles(updateTiles);
        if (updateSelection) this.updateSelection();
    }

    convertToGraph = () => {
        return Graph.genFromGrid(this);
    };

    gridPointsBetween = (x0: number, y0: number, x1: number, y1: number) => {
        const dx = x1 - x0;
        const dy = y1 - y0;
        const nx = Math.abs(dx);
        const ny = Math.abs(dy);
        const signX = Math.sign(dx);
        const signY = Math.sign(dy);

        const point: { x: number; y: number; direction?: Direction } = {
            x: x0,
            y: y0,
            direction: undefined,
        };
        const points = [{ ...point }];

        for (let ix = 0, iy = 0; ix < nx || iy < ny; ) {
            if ((1 + 2 * ix) * ny < (1 + 2 * iy) * nx) {
                point.x += signX;
                point.direction = signX < 0 ? Direction.RIGHT : Direction.LEFT;
                ix++;
            } else {
                point.y += signY;
                point.direction = signY < 0 ? Direction.DOWN : Direction.UP;
                iy++;
            }
            points.push({ ...point });
        }

        return points;
    };

    /**
     * From screen space to grid space
     *
     * @param x X in screen space
     * @param y Y in screen space
     * @param floored if input should be floored
     * @param upScale if value should be up scaled
     * @returns Coordinates in grid space
     */
    screenToGrid = (x: number, y: number, floored = false, upScale = false) =>
        upScale
            ? floored
                ? {
                      x: Math.floor((-this.x + x) / this.size) * this.size,
                      y: Math.floor((-this.y + y) / this.size) * this.size,
                  }
                : {
                      x: -this.x + x,
                      y: -this.y + y,
                  }
            : floored
            ? {
                  x: Math.floor((-this.x + x) / this.size),
                  y: Math.floor((-this.y + y) / this.size),
              }
            : {
                  x: (-this.x + x) / this.size,
                  y: (-this.y + y) / this.size,
              };

    /**
     * From grid space to screen space (Top Left corner by default)
     *
     * @param x X in grid space
     * @param y Y in grid space
     * @param floored whether to floor the coordinates (default true)
     * @param offset whether to offset the coordinates (default true)
     * @param corner what corner grid location is in respect to
     * @returns Coordinates in screen space
     */
    gridToScreen = (
        x: number,
        y: number,
        floored = true,
        offset = true,
        corner:
            | "top-left"
            | "top-right"
            | "bottom-left"
            | "bottom-right" = "top-left"
    ) => {
        switch (corner) {
            case "top-left":
                break;
            case "top-right":
                x++;
                break;
            case "bottom-left":
                y++;
                break;
            case "bottom-right":
                x++;
                y++;
                break;
        }
        return offset
            ? floored
                ? {
                      x: Math.floor(x) * this.size + this.x,
                      y: Math.floor(y) * this.size + this.y,
                  }
                : {
                      x: x * this.size + this.x,
                      y: y * this.size + this.y,
                  }
            : floored
            ? {
                  x: Math.floor(x) * this.size,
                  y: Math.floor(y) * this.size,
              }
            : {
                  x: x * this.size,
                  y: y * this.size,
              };
    };
}

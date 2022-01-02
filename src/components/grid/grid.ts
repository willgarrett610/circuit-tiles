/* eslint-disable @typescript-eslint/no-explicit-any */
import * as PIXI from "pixi.js";
import { dimensions } from "../../utils";
import { clamp } from "../../utils/math";
import config from "../../config";
import { ConnectionType, Tile } from "../tiles/tile";
import { Direction, rotateClockWise } from "../../utils/directions";
import "../../utils/compute_logic";
import state from "../../state";
import { EditMode } from "../../utils/edit_mode";
import Graph from "../../logic/graph";
import { GridAction } from "../../utils/action";
import { gridManager } from "../..";

interface GridHandlers {
    postAddTile: ((payload: Tile) => void)[];
    postRemoveTile: ((payload: Tile) => void)[];
    postEditTile: ((payload: Tile) => void)[];
    postUndo: ((
        payload: {
            action: GridAction;
            prevTile: Tile | undefined;
            postTile: Tile | undefined;
            location: {
                x: number;
                y: number;
            };
        }[]
    ) => void)[];
    postRedo: ((
        payload: {
            action: GridAction;
            prevTile: Tile | undefined;
            postTile: Tile | undefined;
            location: {
                x: number;
                y: number;
            };
        }[]
    ) => void)[];
}

/** Grid class */
export default class Grid extends PIXI.Container {
    startingSize: number;
    size: number;
    tiles: { [key: string]: Tile | undefined } = {};

    lineGraphics: PIXI.Graphics;
    hlTile: PIXI.Graphics;
    selectionGraphics: PIXI.Graphics;

    sortableChildren = true;
    zIndex = 1000;

    handlers: GridHandlers = {
        postAddTile: [],
        postRemoveTile: [],
        postEditTile: [],
        postUndo: [],
        postRedo: [],
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
    constructor(size: number, tiles?: { [key: string]: Tile | undefined }) {
        super();

        this.startingSize = size;
        this.size = size;

        this.lineGraphics = new PIXI.Graphics();
        this.lineGraphics.zIndex = 1000;
        this.hlTile = new PIXI.Graphics();
        this.hlTile.zIndex = 200;
        this.hlTile.alpha = 0.2;
        this.selectionGraphics = new PIXI.Graphics();
        this.selectionGraphics.zIndex = 2000;
        this.selectionGraphics.alpha = 0.2;

        if (tiles) this.tiles = tiles;

        this.addChild(this.lineGraphics);
        this.addChild(this.hlTile);

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
        return this.tiles[`${x},${y}`];
    }

    /**
     * set tile at location
     *
     * @param x x coordinate
     * @param y y coordinate
     * @param tile
     */
    setTile(x: number, y: number, tile: Tile) {
        this.tiles[`${x},${y}`] = tile;
    }

    /**
     * remove tile at coordinate
     *
     * @param x x coordinate
     * @param y y coordinate
     */
    deleteTile(x: number, y: number) {
        delete this.tiles[`${x},${y}`];
    }

    addHandler = <T extends keyof GridHandlers>(
        handlerName: T,
        callback: GridHandlers[T][number]
    ) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.handlers[handlerName].push(callback as any);
    };

    dispatchHandler = <T extends keyof GridHandlers>(
        handlerName: T,
        payload: Parameters<GridHandlers[T][number]>[0]
    ) => {
        for (const handler of this.handlers[handlerName]) {
            handler(payload as any);
        }
    };

    /**
     * Connects tiles together
     *
     * @param newTile
     * @param prevTile
     * @param direction direction from newTile to prevTile
     * @param editedNewTile
     * @param forced if the connection should be forced
     */
    connectTiles(
        newTile: Tile,
        prevTile: Tile | undefined,
        direction: Direction | undefined,
        editedNewTile: boolean,
        forced = false
    ) {
        if (
            newTile !== undefined &&
            prevTile !== undefined &&
            direction !== undefined
        ) {
            const oppositeDirection = Direction.toLower(
                Direction.getOpposite(direction)
            );
            const directDirection = Direction.toLower(direction);

            const canConnect =
                newTile.getConnectionTemplate()[directDirection] !==
                    ConnectionType.BLOCKED &&
                prevTile.getConnectionTemplate()[oppositeDirection] !==
                    ConnectionType.BLOCKED &&
                (forced || newTile.isWire || prevTile.isWire);

            if (!prevTile.getConnections()[oppositeDirection] && canConnect) {
                gridManager.historyManager.tempHistory.push({
                    action: GridAction.EDIT,
                    prevTile: prevTile.clone(),
                    postTile: undefined,
                    location: { x: prevTile.x, y: prevTile.y },
                });

                prevTile.setConnection(oppositeDirection, true);
                gridManager.historyManager.tempHistory[
                    gridManager.historyManager.tempHistory.length - 1
                ].postTile = prevTile.clone();
            }
            if (
                !newTile.getConnections()[directDirection] &&
                (canConnect || !editedNewTile)
            ) {
                gridManager.historyManager.tempHistory.push({
                    action: editedNewTile ? GridAction.EDIT : GridAction.ADD,
                    prevTile: editedNewTile ? newTile.clone() : undefined,
                    postTile: undefined,
                    location: { x: newTile.x, y: newTile.y },
                });

                if (canConnect) newTile.setConnection(directDirection, true);

                gridManager.historyManager.tempHistory[
                    gridManager.historyManager.tempHistory.length - 1
                ].postTile = newTile.clone();
            }
            prevTile.updateContainer?.();
        } else if (!editedNewTile) {
            gridManager.historyManager.tempHistory.push({
                action: GridAction.ADD,
                prevTile: undefined,
                postTile: newTile.clone(),
                location: { x: newTile.x, y: newTile.y },
            });
        }

        newTile.updateContainer?.();
    }

    /**
     * handles forced connections of tiles
     *
     * @param tile tile to attempt to force connect
     */
    handleForceConnection(tile: Tile) {
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
                    this.connectTiles(
                        tile,
                        forceTile,
                        forceDirection,
                        true,
                        true
                    );
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
                    this.connectTiles(tile, adjacentTile, direction, true);
                }
            }
        }
    }

    /**
     * add tile to grid
     *
     * @param x x location of tile
     * @param y y location of tile
     * @param tile tile to add
     * @param prevTile last tile added
     * @param direction direction of placement
     * @returns tile if add was successful, undefined otherwise
     */
    addTile<T extends Tile>(
        x: number,
        y: number,
        tile: {
            new (x: number, y: number): T;
        },
        prevTile: Tile | undefined,
        direction: Direction | undefined
    ): Tile | undefined {
        const tileAtLocation = this.getTile(x, y);
        if (tileAtLocation) {
            this.connectTiles(tileAtLocation, prevTile, direction, true);
            return tileAtLocation;
        }

        const tileObj = new tile(x, y);

        this.setTile(x, y, tileObj);

        const tileGraphics: PIXI.Container = tileObj.getContainer(this.size);
        this.addChild(tileGraphics);

        this.connectTiles(tileObj, prevTile, direction, false);

        this.handleForceConnection(tileObj);

        this.dispatchHandler("postAddTile", tileObj);

        return tileObj;
    }

    /**
     * Removes tile at location
     *
     * @param x x coordinate
     * @param y y coordinate
     * @returns success of deletion
     */
    removeTile(x: number, y: number) {
        const tile = this.getTile(x, y);
        if (!tile) return false;
        gridManager.historyManager.tempHistory.push({
            action: GridAction.REMOVE,
            prevTile: tile.clone(),
            postTile: undefined,
            location: { x: tile.x, y: tile.y },
        });
        this.removeChild(tile.getContainer(this.size));
        this.deleteTile(x, y);
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
                gridManager.historyManager.tempHistory.push({
                    action: GridAction.EDIT,
                    prevTile: adjacentTile.clone(),
                    postTile: undefined,
                    location: { x: adjacentTile.x, y: adjacentTile.y },
                });
                adjacentTile.setConnection(removalSpot.side, false);
                gridManager.historyManager.tempHistory[
                    gridManager.historyManager.tempHistory.length - 1
                ].postTile = adjacentTile.clone();
                adjacentTile.updateContainer?.();
            }
        }
        this.dispatchHandler("postRemoveTile", tile);
        return true;
    }

    /**
     * Rotates tiles clockwise
     *
     * @param x x coordinate
     * @param y y coordinate
     */
    rotateTile(x: number, y: number) {
        const tile = this.getTile(x, y);
        if (tile && tile.breakOnRotate) {
            gridManager.historyManager.tempHistory.push({
                action: GridAction.EDIT,
                prevTile: tile.clone(),
                postTile: undefined,
                location: { x, y },
            });
            if (tile.rotatable)
                tile.direction = rotateClockWise(tile.direction);
            tile.setConnection("up", false);
            tile.setConnection("down", false);
            tile.setConnection("left", false);
            tile.setConnection("right", false);
            tile.updateContainer?.();
            gridManager.historyManager.tempHistory[
                gridManager.historyManager.tempHistory.length - 1
            ].postTile = tile.clone();

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
                    gridManager.historyManager.tempHistory.push({
                        action: GridAction.EDIT,
                        prevTile: adjacentTile.clone(),
                        postTile: undefined,
                        location: {
                            x: adjacentTile.x,
                            y: adjacentTile.y,
                        },
                    });
                    adjacentTile.setConnection(removalSpot.side, false);
                    gridManager.historyManager.tempHistory[
                        gridManager.historyManager.tempHistory.length - 1
                    ].postTile = adjacentTile.clone();
                    adjacentTile.updateContainer?.();
                }
            }

            this.handleForceConnection(tile);
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

        this.update();
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
            this.addChild(this.selectionGraphics);

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

    /** renders all the tiles */
    renderTiles() {
        for (const [_, tile] of Object.entries(this.tiles))
            if (tile) tile.update(this.size);
    }

    /** Removes all children that are tile containers */
    removeTileGraphics() {
        for (const child of this.children) {
            if (child !== this.lineGraphics && child !== this.hlTile) {
                this.removeChild(child);
            }
        }
    }

    /** Generates containers for each tile */
    generateTileGraphics() {
        for (const [_, tile] of Object.entries(this.tiles)) {
            if (tile) {
                const tileGraphics: PIXI.Container = tile.getContainer(
                    this.size
                );
                this.addChild(tileGraphics);
            }
        }
    }

    /**
     * Update the grids graphics
     */
    update() {
        this.renderGrid();
        this.renderTiles();
        this.renderSelection();
    }

    convertToGraph = () => {
        return Graph.genFromTiles(this.tiles);
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
     * From grid space to screen space (Top Left corner)
     *
     * @param x X in grid space
     * @param y Y in grid space
     * @param floored whether to floor the coordinates
     * @returns Coordinates in screen space
     */
    gridToScreen = (x: number, y: number, floored = true) =>
        floored
            ? {
                  x: Math.floor(x) * this.size + this.x,
                  y: Math.floor(y) * this.size + this.y,
              }
            : {
                  x: x * this.size + this.x,
                  y: y * this.size + this.y,
              };
}

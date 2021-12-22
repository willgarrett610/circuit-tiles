import * as PIXI from "pixi.js";
import {
    dimensions,
    height,
    locationToTuple,
    mouseDown,
    pressedKeys,
    width,
} from "../../utils";
import { clamp } from "../../utils/math";
import config from "../../config";
import { ConnectionType, Tile } from "../tiles/tile";
import { Direction, rotateClockWise } from "../../utils/directions";
import getTileTypes from "../tiles/tile_types";
import "../../utils/compute_logic";
import { GridAction, Interaction } from "../../utils/action";
import state, { setState } from "../../state";
import { EditMode } from "../../utils/edit_mode";
/** Grid class */
export default class Grid extends PIXI.Container {
    startingSize: number;
    size: number;
    tiles: { [key: string]: Tile | undefined } = {};

    history: {
        action: GridAction;
        prevTile: Tile | undefined;
        postTile: Tile | undefined;
        location: { x: number; y: number };
    }[][] = [[]];
    tempHistory: {
        action: GridAction;
        prevTile: Tile | undefined;
        postTile: Tile | undefined;
        location: { x: number; y: number };
    }[] = [];
    undoHistory: {
        action: GridAction;
        prevTile: Tile | undefined;
        postTile: Tile | undefined;
        location: { x: number; y: number };
    }[][] = [];

    mousePos: [x: number, y: number] = [0, 0];
    prevMousePos: [x: number, y: number] = [0, 0];

    lineGraphics: PIXI.Graphics;
    hlTile: PIXI.Graphics;

    selectedTileType = -1;

    interactive = true;
    sortableChildren = true;
    zIndex = 1000;

    currentInteraction: Interaction = Interaction.NONE;

    /**
     * Constructs grid
     *
     * @param size pixel size of grid tile
     */
    constructor(size: number) {
        super();
        this.startingSize = size;
        this.size = size;

        this.lineGraphics = new PIXI.Graphics();
        this.lineGraphics.zIndex = 1000;
        this.hlTile = new PIXI.Graphics();
        this.hlTile.zIndex = 200;
        this.hlTile.alpha = 0.2;

        this.addChild(this.lineGraphics);
        this.addChild(this.hlTile);

        this.renderGrid();

        this.on("mousemove", this.mouseMove);
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
        const connectTiles = (
            newTile: Tile,
            prevTile: Tile | undefined,
            direction: Direction | undefined,
            editedNewTile: boolean
        ) => {
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
                    newTile.getConnectionTemplate()[directDirection] !=
                        ConnectionType.BLOCKED &&
                    prevTile.getConnectionTemplate()[oppositeDirection] !=
                        ConnectionType.BLOCKED;

                if (
                    !prevTile.getConnections()[oppositeDirection] &&
                    canConnect
                ) {
                    this.tempHistory.push({
                        action: GridAction.EDIT,
                        prevTile: prevTile.clone(),
                        postTile: undefined,
                        location: { x: prevTile.x, y: prevTile.y },
                    });

                    prevTile.setConnection(oppositeDirection, true);
                    this.tempHistory[this.tempHistory.length - 1].postTile =
                        prevTile.clone();
                }
                if (
                    !newTile.getConnections()[directDirection] &&
                    (canConnect || !editedNewTile)
                ) {
                    this.tempHistory.push({
                        action: editedNewTile
                            ? GridAction.EDIT
                            : GridAction.ADD,
                        prevTile: editedNewTile ? newTile.clone() : undefined,
                        postTile: undefined,
                        location: { x: newTile.x, y: newTile.y },
                    });

                    if (canConnect)
                        newTile.setConnection(directDirection, true);

                    this.tempHistory[this.tempHistory.length - 1].postTile =
                        newTile.clone();
                }
                prevTile.updateContainer?.();
            } else if (!editedNewTile) {
                this.tempHistory.push({
                    action: GridAction.ADD,
                    prevTile: undefined,
                    postTile: newTile.clone(),
                    location: { x: newTile.x, y: newTile.y },
                });
            }

            newTile.updateContainer?.();
        };

        const tileAtLocation = this.getTile(x, y);
        if (tileAtLocation) {
            connectTiles(tileAtLocation, prevTile, direction, true);
            return tileAtLocation;
        }

        const tileObj = new tile(x, y);
        this.setTile(x, y, tileObj);
        const tileGraphics: PIXI.Container = tileObj.getContainer(this.size);
        this.addChild(tileGraphics);

        connectTiles(tileObj, prevTile, direction, false);

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
        this.tempHistory.push({
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
                this.tempHistory.push({
                    action: GridAction.EDIT,
                    prevTile: adjacentTile.clone(),
                    postTile: undefined,
                    location: { x: adjacentTile.x, y: adjacentTile.y },
                });
                adjacentTile.setConnection(removalSpot.side, false);
                this.tempHistory[this.tempHistory.length - 1].postTile =
                    adjacentTile.clone();
                adjacentTile.updateContainer?.();
            }
        }
        return true;
    }

    currentHistory = () => {
        return this.history[this.history.length - 1];
    };

    newHistory = () => {
        this.history.push([]);
    };

    undo = async () => {
        this.finishInteraction();
        if (this.history.length < 2) return;
        const actions = this.history[this.history.length - 2];
        this.undoHistory.push(actions);

        for (const { action, prevTile: tile, location } of [
            ...actions,
        ].reverse()) {
            const refTile = this.getTile(location.x, location.y);
            switch (action) {
                case GridAction.ADD: {
                    if (refTile)
                        this.removeChild(refTile.getContainer(this.size));
                    this.deleteTile(location.x, location.y);

                    break;
                }
                case GridAction.EDIT: {
                    if (tile) {
                        if (refTile)
                            this.removeChild(refTile.getContainer(this.size));
                        this.setTile(location.x, location.y, tile);
                        const tileGraphics: PIXI.Container = tile.getContainer(
                            this.size
                        );
                        this.addChild(tileGraphics);
                    }
                    this.getTile(location.x, location.y)?.updateContainer?.();

                    break;
                }
                case GridAction.REMOVE: {
                    if (tile) {
                        this.setTile(location.x, location.y, tile);
                        const tileGraphics: PIXI.Container = tile.getContainer(
                            this.size
                        );
                        this.addChild(tileGraphics);
                    }

                    this.getTile(location.x, location.y)?.updateContainer?.();
                    break;
                }
            }
        }

        this.history.splice(this.history.length - 2, 1);
    };

    redo = async () => {
        this.finishInteraction();
        if (this.undoHistory.length === 0) return;

        const actions = this.undoHistory.pop();
        if (!actions) return;

        this.currentHistory().push(...actions);
        this.newHistory();

        for (const { action, postTile, location } of actions) {
            const refTile = this.getTile(location.x, location.y);
            switch (action) {
                case GridAction.REMOVE: {
                    if (refTile)
                        this.removeChild(refTile.getContainer(this.size));
                    this.deleteTile(location.x, location.y);

                    break;
                }
                case GridAction.EDIT: {
                    if (postTile) {
                        if (refTile)
                            this.removeChild(refTile.getContainer(this.size));
                        this.setTile(location.x, location.y, postTile);
                        const tileGraphics: PIXI.Container =
                            postTile.getContainer(this.size);
                        this.addChild(tileGraphics);
                    }
                    this.getTile(location.x, location.y)?.updateContainer?.();

                    break;
                }
                case GridAction.ADD: {
                    if (postTile) {
                        this.setTile(location.x, location.y, postTile);
                        const tileGraphics: PIXI.Container =
                            postTile.getContainer(this.size);
                        this.addChild(tileGraphics);
                    }

                    this.getTile(location.x, location.y)?.updateContainer?.();
                    break;
                }
            }
        }
    };

    cleanHistory = () => {
        if (this.history[this.history.length - 1].length === 0)
            this.history.pop();
    };

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

    scroll = (e: WheelEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((e as any).wheelDeltaY === 0) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const delta = (e as any).wheelDeltaY > 1 ? 1 : -1;

        this.zoom(e.pageX, e.pageY, delta);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mouseMove = (event: any) => {
        const e = event.data.originalEvent as PointerEvent;
        this.prevMousePos = [...this.mousePos];
        this.mousePos = [e.pageX, e.pageY];
        if (mouseDown.left) {
            if (
                e.shiftKey ||
                pressedKeys["Space"] ||
                state.editMode === EditMode.PAN
            ) {
                this.x += e.movementX;
                this.y += e.movementY;
            } else if (state.editMode === EditMode.ERASER) {
                this.currentInteraction = Interaction.REMOVING;

                const gridPoints = this.gridPointsBetween(
                    ...locationToTuple(
                        this.screenToGrid(...this.prevMousePos, true)
                    ),
                    ...locationToTuple(
                        this.screenToGrid(...this.mousePos, true)
                    )
                );

                for (const gridPoint of gridPoints)
                    this.removeTile(...locationToTuple(gridPoint));
            } else {
                // TODO Tile and Chip modes
                this.currentInteraction = Interaction.PLACING;

                const gridPoints = this.gridPointsBetween(
                    ...locationToTuple(
                        this.screenToGrid(...this.prevMousePos, true)
                    ),
                    ...locationToTuple(
                        this.screenToGrid(...this.mousePos, true)
                    )
                );

                let prevTile: Tile | undefined = undefined;
                for (let i = 0; i < gridPoints.length; i++) {
                    const gridPoint = gridPoints[i];

                    const newTile: Tile | undefined = this.addTile(
                        ...locationToTuple(gridPoint),
                        getTileTypes()[this.selectedTileType],
                        prevTile,
                        gridPoint.direction
                    );

                    prevTile = newTile;
                }
            }
            this.update();
        }

        this.updateHighlightTile();
    };

    finishInteraction = () => {
        if (this.currentInteraction !== Interaction.NONE) {
            this.currentInteraction = Interaction.NONE;
            if (this.history.length > 0) {
                this.currentHistory().push(...this.tempHistory);
                this.cleanHistory();
            }
            this.newHistory();
            this.undoHistory = [];
            this.tempHistory = [];
        }
    };

    updateHighlightTile = () => {
        const gridPos = this.screenToGrid(...this.mousePos, true, true);

        this.hlTile.clear();
        this.hlTile.beginFill(config.colors.highlightTile);
        this.hlTile.lineStyle(0);
        this.hlTile.drawRect(gridPos.x, gridPos.y, this.size, this.size);
    };

    click = (event: PIXI.interaction.InteractionEvent) => {
        if (
            event.data.button == 0 &&
            !event.data.originalEvent.shiftKey &&
            !pressedKeys["Space"] &&
            state.editMode !== EditMode.PAN
        ) {
            const gridPoint = locationToTuple(
                this.screenToGrid(...this.mousePos, true)
            );

            if (state.editMode == EditMode.ERASER) {
                this.currentInteraction = Interaction.REMOVING;
                this.removeTile(...gridPoint);
            } else if (state.editMode == EditMode.CURSOR) {
                // rotate tile around

                const tile = this.getTile(...gridPoint);

                if (tile && tile.rotatable) {
                    this.tempHistory.push({
                        action: GridAction.EDIT,
                        prevTile: tile.clone(),
                        postTile: undefined,
                        location: { x: tile.x, y: tile.y },
                    });
                    tile.direction = rotateClockWise(tile.direction);
                    this.tempHistory[this.tempHistory.length - 1].postTile =
                        tile.clone();
                }
            } else {
                // TODO Tile and Chip modes
                this.currentInteraction = Interaction.PLACING;
                this.addTile(
                    ...gridPoint,
                    getTileTypes()[this.selectedTileType],
                    undefined,
                    undefined
                );
            }

            this.update();
        }

        this.finishInteraction();
    };

    keyActionCooldownTime = 250;
    lastKeyActionTime = 0;

    keyDown = (e: KeyboardEvent) => {
        const currTime = Date.now();
        if (currTime - this.lastKeyActionTime < this.keyActionCooldownTime)
            return;
        if (e.ctrlKey && e.code === "KeyZ") {
            e.preventDefault();
            this.lastKeyActionTime = currTime;
            if (e.shiftKey) {
                this.redo();
            } else {
                this.undo();
            }
            e.stopPropagation();
        }

        if (e.code === "KeyX") {
            setState({ editMode: EditMode.ERASER });
        }

        if (!e.ctrlKey && !e.shiftKey) {
            if (e.code === "Equal") {
                e.preventDefault();

                this.zoom(width() / 2, height() / 2, 1);
            }

            if (e.code === "Minus") {
                e.preventDefault();

                this.zoom(width() / 2, height() / 2, -1);
            }

            if (e.code === "Digit0") {
                e.preventDefault();

                const prevPos = this.screenToGrid(
                    this.width / 2,
                    this.height / 2
                );

                this.size = this.startingSize;

                const newPos = this.screenToGrid(
                    this.width / 2,
                    this.height / 2
                );

                this.x += (newPos.x - prevPos.x) * this.size;
                this.y += (newPos.y - prevPos.y) * this.size;

                this.update();
            }
        }

        if (!e.ctrlKey && !e.shiftKey && e.code === "KeyH") {
            e.preventDefault();
            this.x = 0;
            this.y = 0;
            this.update();
        }
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

    /** renders all the tiles */
    renderTiles() {
        for (const [_, tile] of Object.entries(this.tiles))
            if (tile) tile.update(this.size);
    }

    update = () => {
        this.renderGrid();
        this.renderTiles();
        this.updateHighlightTile();
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

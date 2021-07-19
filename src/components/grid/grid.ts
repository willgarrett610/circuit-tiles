import * as PIXI from "pixi.js";
import {
    dimensions,
    locationToTuple,
    mouseDown,
    onKeyDown,
    onResize,
    onScroll,
    pressedKeys,
    sleep,
} from "../../utils";
import { clamp } from "../../utils/math";
import config from "../../config";
import { Tile } from "../tiles/tile";
import { Direction } from "../../utils/directions";
import getTileTypes from "../tiles/tile_types";
import "../../utils/compute-logic";
import { GridAction, Interaction } from "../../utils/action";
export default class Grid extends PIXI.Container {
    startingSize: number;
    size: number;
    tiles: { [key: string]: Tile | undefined } = {};

    history: {
        action: GridAction;
        tile: Tile | undefined;
        location: { x: number; y: number };
    }[][] = [[]];
    tempHistory: {
        action: GridAction;
        tile: Tile | undefined;
        location: { x: number; y: number };
    }[] = [];

    mousePos: [x: number, y: number] = [0, 0];
    prevMousePos: [x: number, y: number] = [0, 0];

    lineGraphics: PIXI.Graphics;
    hlTile: PIXI.Graphics;

    selectedTileType: number = -1;

    interactive = true;
    sortableChildren = true;
    zIndex = 1000;

    currentInteraction: Interaction = Interaction.NONE;

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

        onResize(this.update);

        onScroll(this, this.scroll);

        this.on("mousemove", this.mouseMove);
        // this.on("mouseup", this.mouseUp);

        onKeyDown(this.keyDown);
    }

    getTile(x: number, y: number) {
        return this.tiles[`${x},${y}`];
    }

    setTile(x: number, y: number, tile: Tile) {
        this.tiles[`${x},${y}`] = tile;
    }

    deleteTile(x: number, y: number) {
        delete this.tiles[`${x},${y}`];
    }

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
                if (!prevTile.connections[oppositeDirection]) {
                    this.tempHistory.push({
                        action: GridAction.EDIT,
                        tile: prevTile.clone(),
                        location: { x: prevTile.x, y: prevTile.y },
                    });
                    prevTile.connections[oppositeDirection] = true;
                }
                const directDirection = Direction.toLower(direction);
                if (!newTile.connections[directDirection]) {
                    this.tempHistory.push({
                        action: editedNewTile
                            ? GridAction.EDIT
                            : GridAction.ADD,
                        tile: editedNewTile ? newTile.clone() : undefined,
                        location: { x: newTile.x, y: newTile.y },
                    });
                    newTile.connections[directDirection] = true;
                }
                prevTile.updateContainer?.();
            } else if (!editedNewTile) {
                this.tempHistory.push({
                    action: GridAction.ADD,
                    tile: undefined,
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

    removeTile(x: number, y: number) {
        const tile = this.getTile(x, y);
        if (!tile) return false;
        this.tempHistory.push({
            action: GridAction.REMOVE,
            tile: tile.clone(),
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
        for (let removalSpot of removalSpots) {
            const adjacentTile = this.getTile(
                x + removalSpot.offset[0],
                y + removalSpot.offset[1]
            );

            if (
                adjacentTile !== undefined &&
                adjacentTile.connections[removalSpot.side]
            ) {
                this.tempHistory.push({
                    action: GridAction.EDIT,
                    tile: adjacentTile.clone(),
                    location: { x: adjacentTile.x, y: adjacentTile.y },
                });
                adjacentTile.connections[removalSpot.side] = false;
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
        console.log("undoing");
        this.finishInteraction();
        if (this.history.length < 2) return;
        const actions = this.history[this.history.length - 2];
        for (let { action, tile, location } of actions
            .reverse()
            .sort((a, b) => b.action - a.action)) {
            // await sleep(50);
            const refTile = this.getTile(location.x, location.y);
            console.log({ action });
            switch (action) {
                case GridAction.ADD: {
                    console.log(refTile);
                    if (refTile)
                        this.removeChild(refTile.getContainer(this.size));
                    this.deleteTile(location.x, location.y);
                }
                case GridAction.EDIT: {
                    if (tile) {
                        if (refTile)
                            this.removeChild(refTile.getContainer(this.size));
                        console.log(tile.connections);
                        this.setTile(location.x, location.y, tile);
                        const tileGraphics: PIXI.Container = tile.getContainer(
                            this.size
                        );
                        this.addChild(tileGraphics);
                    }
                    this.getTile(location.x, location.y)?.updateContainer?.();
                }
                case GridAction.REMOVE: {
                    // if (tile) this.setTile(location.x, location.y, tile);
                    // this.getTile(location.x, location.y)?.updateContainer?.();
                }
            }
        }

        this.history.splice(this.history.length - 2, 1);
    };

    cleanHistory = () => {
        if (this.history[this.history.length - 1].length === 0)
            this.history.pop();
    };

    scroll = (e: WheelEvent) => {
        if (e.deltaY === 0) return;

        let mult = 1 / (config.zoomCoeff * e.deltaY);
        if (mult < 0) mult = -1 / mult;

        let prevPos = this.screenToGrid(e.pageX, e.pageY);

        this.size = Math.round(mult * this.size);
        this.size = clamp(this.size, 20, 350);

        let newPos = this.screenToGrid(e.pageX, e.pageY);

        this.x += (newPos.x - prevPos.x) * this.size;
        this.y += (newPos.y - prevPos.y) * this.size;

        this.update();
    };

    mouseMove = (event: any) => {
        let e = event.data.originalEvent as PointerEvent;
        this.prevMousePos = [...this.mousePos];
        this.mousePos = [e.pageX, e.pageY];
        if (mouseDown.left) {
            if (e.shiftKey || pressedKeys["Space"]) {
                this.x += e.movementX;
                this.y += e.movementY;
            } else if (pressedKeys["KeyX"]) {
                this.currentInteraction = Interaction.REMOVING;

                const gridPoints = this.gridPointsBetween(
                    ...locationToTuple(
                        this.screenToGrid(...this.prevMousePos, true)
                    ),
                    ...locationToTuple(
                        this.screenToGrid(...this.mousePos, true)
                    )
                );

                for (let gridPoint of gridPoints)
                    this.removeTile(...locationToTuple(gridPoint));
            } else {
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

    // mouseUp = () => {
    //     this.finishInteraction();
    // };

    finishInteraction = () => {
        if (this.currentInteraction !== Interaction.NONE) {
            this.currentInteraction = Interaction.NONE;
            if (this.history.length > 0) {
                this.currentHistory().push(...this.tempHistory);
                this.cleanHistory();
            }
            console.log(this.history);
            this.newHistory();
            this.tempHistory = [];
        }
    };

    updateHighlightTile = () => {
        let gridPos = this.screenToGrid(...this.mousePos, true, true);

        this.hlTile.clear();
        this.hlTile.beginFill(config.colors.highlightTile);
        this.hlTile.lineStyle(0);
        this.hlTile.drawRect(gridPos.x, gridPos.y, this.size, this.size);
    };

    click = (event: PIXI.interaction.InteractionEvent) => {
        console.log("click");
        if (
            event.data.button == 0 &&
            !event.data.originalEvent.shiftKey &&
            !pressedKeys["Space"]
        ) {
            const gridPoint = locationToTuple(
                this.screenToGrid(...this.mousePos, true)
            );

            if (pressedKeys["KeyX"]) {
                this.currentInteraction = Interaction.REMOVING;
                this.removeTile(...gridPoint);
            } else {
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
            } else {
                this.undo();
            }
        }

        if (!e.ctrlKey && !e.shiftKey) {
            if (e.code === "Equal") {
                e.preventDefault();

                let mult = 1 / (config.zoomCoeff * -100);
                if (mult < 0) mult = -1 / mult;

                let prevPos = this.screenToGrid(
                    this.width / 2,
                    this.height / 2
                );

                this.size = Math.round(mult * this.size);
                this.size = clamp(this.size, 20, 350);

                let newPos = this.screenToGrid(this.width / 2, this.height / 2);

                this.x += (newPos.x - prevPos.x) * this.size;
                this.y += (newPos.y - prevPos.y) * this.size;

                this.update();
            }

            if (e.code === "Minus") {
                e.preventDefault();

                let mult = 1 / (config.zoomCoeff * 100);
                if (mult < 0) mult = -1 / mult;

                let prevPos = this.screenToGrid(
                    this.width / 2,
                    this.height / 2
                );

                this.size = Math.round(mult * this.size);
                this.size = clamp(this.size, 20, 350);

                let newPos = this.screenToGrid(this.width / 2, this.height / 2);

                this.x += (newPos.x - prevPos.x) * this.size;
                this.y += (newPos.y - prevPos.y) * this.size;

                this.update();
            }

            if (e.code === "Digit0") {
                e.preventDefault();

                let prevPos = this.screenToGrid(
                    this.width / 2,
                    this.height / 2
                );

                this.size = this.startingSize;

                let newPos = this.screenToGrid(this.width / 2, this.height / 2);

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

    renderGrid() {
        let width = dimensions()[0];
        let height = dimensions()[1];
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

    renderTiles() {
        for (let [_, tile] of Object.entries(this.tiles))
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
     * @param x X in screen space
     * @param y Y in screen space
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
     * @param x X in grid space
     * @param y Y in grid space
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

import * as PIXI from "pixi.js";
import {
    dimensions,
    locationToTuple,
    mouseDown,
    onKeyDown,
    onResize,
    onScroll,
    pressedKeys,
} from "../../utils";
import { clamp } from "../../utils/math";
import config from "../../config";
import WireTile from "../tiles/wire_tile";
import { Tile } from "../tiles/tile";
import { Direction } from "../../utils/directions";
import getTileTypes from "../tiles/tile_types";

export default class Grid extends PIXI.Container {
    startingSize: number;
    size: number;
    tiles: { [key: string]: Tile | undefined };

    mousePos: [x: number, y: number];
    prevMousePos: [x: number, y: number];

    lineGraphics: PIXI.Graphics;
    hlTile: PIXI.Graphics;

    selectedTileType: number = -1;

    constructor(size: number) {
        super();
        this.startingSize = size;
        this.size = size;
        this.tiles = {};
        this.prevMousePos = [0, 0];
        this.mousePos = [0, 0];

        this.lineGraphics = new PIXI.Graphics();
        this.lineGraphics.zIndex = 1000;
        this.hlTile = new PIXI.Graphics();
        this.hlTile.zIndex = 200;
        this.hlTile.alpha = 0.2;

        this.addChild(this.lineGraphics);
        this.addChild(this.hlTile);

        this.renderGrid();

        onResize(this.update);

        this.interactive = true;
        this.sortableChildren = true;
        this.zIndex = 1000;

        onScroll(this, this.scroll);

        this.on("mousedown", this.mouseDown);
        this.on("mouseup", this.mouseUp);
        this.on("mousemove", this.mouseMove);

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
        tile: { new (x: number, y: number): T }
    ): [placed: boolean, tile: Tile | undefined] {
        if (this.getTile(x, y)) return [false, this.getTile(x, y)];
        let tileObj = new tile(x, y);
        this.setTile(x, y, tileObj);
        const tileGraphics: PIXI.Container = tileObj.getContainer(this.size);
        this.addChild(tileGraphics);

        return [true, tileObj];
    }

    removeTile(x: number, y: number) {
        const tile = this.getTile(x, y);
        if (!tile) return false;
        this.removeChild(tile.getContainer(this.size));
        this.deleteTile(x, y);
        const removalSpots = [
            { offset: [-1, 0], side: "right" },
            { offset: [1, 0], side: "left" },
            { offset: [0, -1], side: "down" },
            { offset: [0, 1], side: "up" },
        ];
        for (let removalSpot of removalSpots) {
            const adjacentTile: any = this.getTile(
                x + removalSpot.offset[0],
                y + removalSpot.offset[1]
            );
            if (adjacentTile && adjacentTile.connect !== undefined) {
                adjacentTile.connect[removalSpot.side] = false;
                adjacentTile.updateContainer();
            }
        }
        return true;
    }

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

    mouseDown = (e: PIXI.interaction.InteractionEvent) => {};

    mouseUp = (e: PIXI.interaction.InteractionEvent) => {};

    mouseMove = (event: any) => {
        let e = event.data.originalEvent as PointerEvent;
        this.prevMousePos = [...this.mousePos];
        this.mousePos = [e.pageX, e.pageY];
        if (mouseDown.left) {
            if (e.shiftKey || pressedKeys["Space"]) {
                this.x += e.movementX;
                this.y += e.movementY;
            } else if (pressedKeys["KeyX"]) {
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

                    const [placed, newTile] = this.addTile(
                        ...locationToTuple(gridPoint),
                        getTileTypes()[this.selectedTileType]
                    );

                    if (
                        gridPoint.direction != undefined &&
                        newTile instanceof WireTile
                    ) {
                        if (prevTile && prevTile instanceof WireTile)
                            (prevTile.connect as any)[
                                ["down", "right", "up", "left"][
                                    gridPoint.direction.valueOf()
                                ]
                            ] = true;
                        ((newTile as WireTile).connect as any)[
                            ["up", "left", "down", "right"][
                                gridPoint.direction.valueOf()
                            ]
                        ] = true;

                        prevTile?.updateContainer?.();
                        newTile?.updateContainer?.();
                    }

                    prevTile = newTile;
                }
            }
        }

        this.update();
    };

    click = (event: PIXI.interaction.InteractionEvent) => {
        if (
            event.data.button == 0 &&
            !event.data.originalEvent.shiftKey &&
            !pressedKeys["Space"]
        ) {
            const gridPoint = locationToTuple(
                this.screenToGrid(...this.mousePos, true)
            );

            if (pressedKeys["KeyX"]) {
                this.removeTile(...gridPoint);
            } else {
                this.addTile(
                    ...gridPoint,
                    getTileTypes()[this.selectedTileType]
                );
            }

            this.update();
        }
    };

    keyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && !e.shiftKey) {
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

        let gridPos = this.screenToGrid(...this.mousePos);
        gridPos.x = Math.floor(gridPos.x) * this.size;
        gridPos.y = Math.floor(gridPos.y) * this.size;

        this.hlTile.clear();
        this.hlTile.beginFill(config.colors.highlightTile);
        this.hlTile.lineStyle(0);
        this.hlTile.drawRect(
            gridPos.x + config.lineWidth / 2,
            gridPos.y + config.lineWidth / 2,
            this.size,
            this.size
        );
    }

    renderTiles() {
        for (let [_, tile] of Object.entries(this.tiles))
            if (tile) tile.update(this.size);
    }

    update = () => {
        this.renderGrid();
        this.renderTiles();
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
                point.direction = signX < 0 ? Direction.LEFT : Direction.RIGHT;
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
    screenToGrid = (x: number, y: number, floored = false) =>
        floored
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
    gridToScreen = (x: number, y: number) => ({
        x: Math.floor(x) * this.size + this.x,
        y: Math.floor(y) * this.size + this.y,
    });
}

import * as PIXI from "pixi.js";
import {
    dimensions,
    locationToTuple,
    mouseDown,
    onKeyDown,
    onResize,
    onScroll,
    pressedKeys,
} from "../utils";
import { clamp } from "../utils/math";
import config from "../config";
import Wire from "./tiles/wire-tile";
import { Tile } from "./tiles/tile";
import { Direction } from "../utils/directions";

export default class Grid extends PIXI.Container {
    startingSize: number;
    size: number;
    tiles: { [key: string]: Tile };

    mousePos: [x: number, y: number];
    prevMousePos: [x: number, y: number];

    lineGraphics: PIXI.Graphics;
    hlTile: PIXI.Graphics;

    constructor(size: number) {
        super();
        this.startingSize = size;
        this.size = size;
        this.tiles = {};
        this.prevMousePos = [0, 0];
        this.mousePos = [0, 0];

        this.lineGraphics = new PIXI.Graphics();
        this.hlTile = new PIXI.Graphics();

        this.addChild(this.lineGraphics);
        this.addChild(this.hlTile);

        // this.generateChildren().forEach((child) => this.addChild(child));
        this.renderGrid();

        onResize(this.update);

        this.interactive = true;

        onScroll(this, this.scroll);

        this.on("mousedown", this.mouseDown);
        this.on("mouseup", this.mouseUp);
        this.on("mousemove", this.mouseMove);

        onKeyDown(this.keyDown);
    }

    addTile<T extends Tile>(
        x: number,
        y: number,
        tile: { new (x: number, y: number): T }
    ): [placed: boolean, tile: Tile] {
        if (this.tiles[`${x},${y}`]) return [false, this.tiles[`${x},${y}`]];
        let tileObj = new tile(x, y);
        this.tiles[`${x},${y}`] = tileObj;
        const tileGraphics: PIXI.Container = tileObj.getContainer(this.size);
        this.addChild(tileGraphics);

        return [true, tileObj];
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
            } else {
                const gridPoints = this.gridPointsBetween(
                    ...locationToTuple(
                        this.screenToGrid(...this.prevMousePos, true)
                    ),
                    ...locationToTuple(
                        this.screenToGrid(...this.mousePos, true)
                    )
                );

                for (let i = 0; i < gridPoints.length; i++) {
                    const gridPoint = gridPoints[i];

                    const [placed, newTile] = this.addTile(
                        ...locationToTuple(gridPoint),
                        Wire
                    );

                    if (gridPoint.direction && newTile instanceof Wire) {
                        // (newTile as Wire).connect[
                        //     gridPoint.direction.toString().toLowerCase()
                        // ] = true;
                        // TODO: THIS RIGHT HERE
                    }
                    (newTile as Wire).connect;
                }
                // const gridPoint = locationToTuple(
                //     this.screenToGrid(...this.mousePos, true)
                // );
            }
        }

        this.update();
    };

    click = (event: PIXI.interaction.InteractionEvent) => {
        if (event.data.button == 0 && !event.data.originalEvent.shiftKey) {
            const gridPoint = locationToTuple(
                this.screenToGrid(...this.mousePos, true)
            );

            this.addTile(...gridPoint, Wire);

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

        let output = [];
        for (
            let x = -Math.ceil(this.x / this.size);
            x <= tileXCount - Math.floor(this.x / this.size);
            x++
        ) {
            this.lineGraphics.beginFill(config.lineColor);
            this.lineGraphics.lineStyle(0);
            this.lineGraphics.drawRect(
                x * this.size,
                -this.y,
                config.lineWidth,
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
                y * this.size,
                width,
                config.lineWidth
            );
        }

        let gridPos = this.screenToGrid(...this.mousePos);
        gridPos.x = Math.floor(gridPos.x) * this.size;
        gridPos.y = Math.floor(gridPos.y) * this.size;

        this.hlTile.clear();
        this.hlTile.beginFill(config.highlightTileColor);
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
            tile.update(this.size);
    }

    update = () => {
        // this.removeChildren();
        this.renderGrid();
        // this.generateChildren().forEach((child) => this.addChild(child));
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
            if ((0.5 + ix) / nx < (0.5 + iy) / ny) {
                point.x += signX;
                point.direction = signX < 0 ? Direction.LEFT : Direction.RIGHT;
                ix++;
            } else {
                point.y += signY;
                point.y = signX < 0 ? Direction.DOWN : Direction.UP;
                iy++;
            }
            points.push({ ...point });
        }

        return points;
    };

    /* 2.1. Orthogonal steps | https://www.redblobgames.com/grids/line-drawing.html
        function walk_grid(p0, p1) {
            let dx = p1.x-p0.x, dy = p1.y-p0.y;
            let nx = Math.abs(dx), ny = Math.abs(dy);
            let sign_x = dx > 0? 1 : -1, sign_y = dy > 0? 1 : -1;

            let p = new Point(p0.x, p0.y);
            let points = [new Point(p.x, p.y)];
            for (let ix = 0, iy = 0; ix < nx || iy < ny;) {
                if ((0.5+ix) / nx < (0.5+iy) / ny) {
                    // next step is horizontal
                    p.x += sign_x;
                    ix++;
                } else {
                    // next step is vertical
                    p.y += sign_y;
                    iy++;
                }
                points.push(new Point(p.x, p.y));
            }
            return points;
        }
    */

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

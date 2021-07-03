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

export default class Grid extends PIXI.Container {
    startingSize: number;
    size: number;
    tiles: { [key: string]: Tile };

    mousePos: [x: number, y: number];

    lineGraphics: PIXI.Graphics;
    hlTile: PIXI.Graphics;

    constructor(size: number) {
        super();
        this.startingSize = size;
        this.size = size;
        this.tiles = {};
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

        this.on("mousemove", this.mouseMove);

        onKeyDown(this.keyDown);
    }

    addTile<T extends Tile>(x: number, y: number, tile: {new(x:number,y:number): T}): boolean {
        if (this.tiles[`${x},${y}`]) return false;
        let tileObj = new tile(x, y);
        this.tiles[`${x},${y}`] = tileObj;
        console.log(this.tiles);
        
        const tileGraphics: PIXI.Container = tileObj.getContainer(this.size);
        // const screenPoint = this.gridToScreen(tile.x, tile.y);
        this.addChild(tileGraphics);

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
    }

    mouseMove = (event: any) => {
        let e = event.data.originalEvent as PointerEvent;
        this.mousePos = [e.pageX, e.pageY];
        if (mouseDown.left) {
            if (e.shiftKey || pressedKeys["Space"]) {
                this.x += e.movementX;
                this.y += e.movementY;
            } else {
                const gridPoint = locationToTuple(
                    this.screenToGrid(...this.mousePos, true)
                );

                this.addTile(...gridPoint, Wire);
            }
        }

        this.update();
    }

    click = (event: PIXI.interaction.InteractionEvent) => {
        if (event.data.button == 0 && !event.data.originalEvent.shiftKey) {
            const gridPoint = locationToTuple(
                this.screenToGrid(...this.mousePos, true)
            );

            this.addTile(...gridPoint, Wire);

            this.update();
        }
    }

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
        for (let [key, tile] of Object.entries(this.tiles)) {
            // const tileGraphics: PIXI.Container = tile.draw(this.size);
            // tileGraphics.x += tile.x * this.size;
            // tileGraphics.y += tile.y * this.size;
            // this.addChild(tileGraphics);
            tile.update(this.size);
        }
    }

    update = () => {
        // this.removeChildren();
        this.renderGrid();
        // this.generateChildren().forEach((child) => this.addChild(child));
        this.renderTiles();
    }

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

import * as PIXI from "pixi.js";
import {
    dimensions,
    mouseDown,
    onKeyDown,
    onResize,
    onScroll,
    pressedKeys,
} from "../utils";
import { clamp } from "../utils/math";
import config from "../config";
import Tile from "./tiles/tile";

export default class Grid extends PIXI.Container {
    startingSize: number;
    size: number;
    tiles: Tile[];

    mousePos: [x: number, y: number];

    constructor(size: number) {
        super();
        this.startingSize = size;
        this.size = size;
        this.tiles = [];
        this.mousePos = [0, 0];

        this.generateChildren().forEach((child) => this.addChild(child));

        onResize(this.update.bind(this));

        this.interactive = true;

        onScroll(this, this.scroll.bind(this));

        this.on("mousemove", this.mouseMove.bind(this));

        onKeyDown(this.keyDown);
    }

    addTile() {}

    scroll(e: WheelEvent) {
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

    mouseMove(event: any) {
        let e = event.data.originalEvent as PointerEvent;
        this.mousePos = [e.pageX, e.pageY];
        if (mouseDown.left && (e.shiftKey || pressedKeys["Space"])) {
            this.x += e.movementX;
            this.y += e.movementY;
        }

        this.update();
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
        }
    };

    generateChildren(): PIXI.Graphics[] {
        let width = dimensions()[0];
        let height = dimensions()[1];
        const tileXCount = Math.floor(width / this.size);
        const tileYCount = Math.floor(height / this.size);

        let lineGraphics = new PIXI.Graphics();

        let output = [];
        for (
            let x = -Math.ceil(this.x / this.size);
            x <= tileXCount - Math.floor(this.x / this.size);
            x++
        ) {
            lineGraphics.beginFill(config.lineColor);
            lineGraphics.lineStyle(0);
            lineGraphics.drawRect(
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
            lineGraphics.beginFill(config.lineColor);
            lineGraphics.lineStyle(0);
            lineGraphics.drawRect(
                -this.x,
                y * this.size,
                width,
                config.lineWidth
            );
        }

        let gridPos = this.screenToGrid(...this.mousePos);
        gridPos.x = Math.floor(gridPos.x) * this.size;
        gridPos.y = Math.floor(gridPos.y) * this.size;

        let hlTile = new PIXI.Graphics();
        hlTile.beginFill(config.highlightTileColor);
        hlTile.lineStyle(0);
        hlTile.drawRect(
            gridPos.x + config.lineWidth / 2,
            gridPos.y + config.lineWidth / 2,
            this.size,
            this.size
        );

        output.push(hlTile);
        output.push(lineGraphics);

        return output;
    }

    update() {
        this.removeChildren();
        this.generateChildren().forEach((child) => this.addChild(child));
    }

    /**
     * From screen space to grid space
     * @param x X in screen space
     * @param y Y in screen space
     * @returns Coordinates in grid space
     */
    screenToGrid = (x: number, y: number) => ({
        x: (-this.x + x) / this.size,
        y: (-this.y + y) / this.size,
    });

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

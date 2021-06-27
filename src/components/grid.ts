import * as PIXI from "pixi.js";
import {
    dimensions,
    mouseDown,
    onMouseMove,
    onResize,
    onScroll,
} from "../utils";
import { Line } from "../utils/line";
import { clamp } from "../utils/math";
import config from "../config";
import Tile from "./tiles/tile";

export default class Grid extends PIXI.Container {

    size: number;
    tiles: Array<Tile>;

    mousePos: [x: number, y: number];

    constructor(size: number) {
        super();
        this.size = size;
        this.tiles = new Array<Tile>();
        this.mousePos = [0,0];

        this.generateChildren().forEach((child) => this.addChild(child));
        
        onResize(this.update.bind(this));

        onScroll(this.scroll.bind(this));

        onMouseMove(this.mouseMove.bind(this));
    }

    public addTile() {
        
    }

    public scroll(e: WheelEvent) {
        let mult = 1/(config.zoomCoeff * e.deltaY);
        if (mult < 0) mult = -1/mult;
        // console.log(mult);

        let prevPos = this.screenToGrid(e.pageX, e.pageY);

        this.size = Math.round(mult*this.size);
        this.size = clamp(this.size, 20, 350);

        let newPos = this.screenToGrid(e.pageX, e.pageY);

        // console.log(prevPos);
        // console.log(newPos);

        this.x += (newPos.x-prevPos.x) * this.size;
        this.y += (newPos.y-prevPos.y) * this.size;

        // console.log({ size: this.size });

        this.update();
    }

    public mouseMove(e: MouseEvent) {
        this.mousePos = [e.pageX, e.pageY];

        // console.log(this.mousePos);

        if (!mouseDown.left) return;

        this.x += e.movementX;
        this.y += e.movementY;

        // console.log({x: this.x, y: this.y});

        this.update();
    }

    public generateChildren(): PIXI.Graphics[] {
        let width = dimensions()[0];
        let height = dimensions()[1];
        const tileXCount = Math.floor(width / this.size);
        const tileYCount = Math.floor(height / this.size);

        let output = [];
        for (
            let x = -Math.ceil(this.x / this.size);
            x <= tileXCount - Math.floor(this.x / this.size);
            x++
        ) {
            var line = new Line(
                [x * this.size, -this.y, x * this.size, -this.y + height],
                config.lineWidth,
                config.lineColor
            );
            output.push(line);
        }

        for (
            let y = -Math.ceil(this.y / this.size);
            y <= tileYCount - Math.floor(this.y / this.size);
            y++
        ) {
            var line = new Line(
                [-this.x, y * this.size, -this.x + width, y * this.size],
                config.lineWidth,
                config.lineColor
            );
            output.push(line);
        }

        let gridPos = this.screenToGrid(this.mousePos[0], this.mousePos[1]);
        gridPos.x = Math.floor(gridPos.x)*this.size;
        gridPos.y = Math.floor(gridPos.y)*this.size;

        console.log(gridPos);

        let hlTile = new PIXI.Graphics();
        hlTile.beginFill(config.highlightTileColor);
        hlTile.lineStyle(1, config.highlightTileColor);
        hlTile.drawRect(gridPos.x + config.lineWidth, gridPos.y + config.lineWidth, this.size - (config.lineWidth * 2), this.size - (config.lineWidth * 2));

        output.push(hlTile);

        return output;
    }

    public update() {
        this.removeChildren();
        this.generateChildren().forEach((child) => this.addChild(child));
    }

    /**
     * From screen space to grid space
     * @param x X in screen space
     * @param y Y in screen space
     * @returns Coordinates in grid space
     */
    public screenToGrid = (x: number, y: number) => ({
        x: (-this.x + x) / this.size,
        y: (-this.y + y) / this.size,
    })

    /**
     * From grid space to screen space (Top Left corner)
     * @param x X in grid space
     * @param y Y in grid space
     * @returns Coordinates in screen space
     */
     public gridToScreen = (x: number, y: number) => ({
        x: Math.floor(x) * this.size + this.x,
        y: Math.floor(y) * this.size + this.y,
    });

}

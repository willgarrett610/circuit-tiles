import * as PIXI from "pixi.js";
import {
    dimensions,
    mouseDown,
    onResize,
    onScroll
} from "../utils";
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

        this.interactive = true;

        // this.on("wheel", (e:PIXI.FederatedEvent) => console.log("scroll"));
        onScroll(this, this.scroll.bind(this));

        this.on("mousemove", this.mouseMove.bind(this));
        // onMouseMove(this.mouseMove.bind(this));
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

    public mouseMove(event: any) {
        let e = event.data.originalEvent as PointerEvent;
        this.mousePos = [e.pageX, e.pageY];

        // console.log(this.mousePos);

        if (!mouseDown.left || !e.shiftKey) return;

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

        let lineGraphics = new PIXI.Graphics();

        let output = [];
        for (
            let x = -Math.ceil(this.x / this.size);
            x <= tileXCount - Math.floor(this.x / this.size);
            x++
        ) {
            lineGraphics.beginFill(config.lineColor);
            lineGraphics.lineStyle(0);
            lineGraphics.drawRect(x * this.size, -this.y, config.lineWidth, height);
        }

        for (
            let y = -Math.ceil(this.y / this.size);
            y <= tileYCount - Math.floor(this.y / this.size);
            y++
        ) {
            lineGraphics.beginFill(config.lineColor);
            lineGraphics.lineStyle(0);
            lineGraphics.drawRect(-this.x, y * this.size, width, config.lineWidth);
        }

        let gridPos = this.screenToGrid(this.mousePos[0], this.mousePos[1]);
        gridPos.x = Math.floor(gridPos.x)*this.size;
        gridPos.y = Math.floor(gridPos.y)*this.size;

        let hlTile = new PIXI.Graphics();
        hlTile.beginFill(config.highlightTileColor);
        hlTile.lineStyle(0);
        hlTile.drawRect(gridPos.x + (config.lineWidth / 2), gridPos.y + (config.lineWidth / 2), this.size, this.size);

        output.push(hlTile);
        output.push(lineGraphics);

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

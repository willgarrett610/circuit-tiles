import { Rotation } from "../../utils/directions";
import * as PIXI from "pixi.js";

export interface Connectable {
    connect: {
        up: boolean;
        down: boolean;
        left: boolean;
        right: boolean;
    };
}

export abstract class Tile {
    label?: string = undefined;
    x = 0;
    y = 0;
    direction = Rotation.NORMAL;
    container?: PIXI.Container;
    signalActive = false;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    abstract generateContainer(): PIXI.Container;

    postGenerate?(): void;

    abstract updateContainer?(): void;

    getContainer(size: number): PIXI.Container {
        if (!this.container) {
            this.container = this.generateContainer();
            this.postGenerate?.();
        }
        this.container.zIndex = 100;
        this.container.width = size;
        this.container.height = size;
        this.container.pivot.x =
            this.container.width / (this.container.scale.x * 2);
        this.container.pivot.y =
            this.container.height / (this.container.scale.y * 2);
        this.container.x = this.x * size + size / 2;
        this.container.y = this.y * size + size / 2;
        this.container.rotation = (this.direction.valueOf() * Math.PI) / 2;
        return this.container;
    }

    update(size: number) {
        if (this.container) {
            this.container.zIndex = 100;
            this.container.width = size;
            this.container.height = size;
            this.container.pivot.x =
                this.container.width / (this.container.scale.x * 2);
            this.container.pivot.y =
                this.container.height / (this.container.scale.y * 2);
            this.container.x = this.x * size + size / 2;
            this.container.y = this.y * size + size / 2;
            this.container.rotation = (this.direction.valueOf() * Math.PI) / 2;
        }
    }
}

export abstract class SpriteTile extends Tile {
    abstract texture: PIXI.Texture;

    generateContainer() {
        return new PIXI.Sprite(this.texture);
    }
}

export abstract class GraphicsTile extends Tile {
    graphics?: PIXI.Graphics;

    abstract drawGraphics(): void;

    generateContainer() {
        this.graphics = new PIXI.Graphics();
        this.drawGraphics();
        return this.graphics;
    }

    updateContainer() {
        this.drawGraphics();
    }
}

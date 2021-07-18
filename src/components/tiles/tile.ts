import { Direction, Rotation } from "../../utils/directions";
import * as PIXI from "pixi.js";
import config from "../../config";

export enum ConnectionType {
    BOTH,
    INPUT,
    OUTPUT,
    BLOCKED,
}
export abstract class Tile {
    abstract type: typeof Tile;

    copyProps = ["connections", "label", "x", "y", "direction", "signalActive"];

    connections: {
        up: boolean;
        down: boolean;
        left: boolean;
        right: boolean;
    } = {
        up: false,
        down: false,
        left: false,
        right: false,
    };

    connectionTemplate = {
        up: ConnectionType.BOTH,
        down: ConnectionType.BOTH,
        left: ConnectionType.BOTH,
        right: ConnectionType.BOTH,
    };

    abstract label: string;
    x = 0;
    y = 0;
    direction = Rotation.NORMAL;
    container?: PIXI.Container;
    signalActive = false;

    canUse = () => true;

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

    clone() {
        let output: Tile = new (this.type as any)(this.x, this.y);
        output.connections = { ...this.connections };
        return output;
    }

    // clone() {
    //     const output = this.createClone();
    //     output.connections = { ...this.connections };
    // }

    // abstract createClone(): Tile;
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

    clearGraphics() {
        if (!this.graphics) return;

        this.graphics.clear();

        // have to do this to set size to draw in the center
        // also has small alpha so it has bigger hit box
        this.graphics.beginFill(config.colors.tileBackground);
        this.graphics.drawRect(0, 0, 120, 120);
        this.graphics.endFill();
    }

    generateContainer() {
        this.graphics = new PIXI.Graphics();
        this.clearGraphics();
        this.drawGraphics();
        return this.graphics;
    }

    updateContainer() {
        this.clearGraphics();
        this.drawGraphics();
    }
}

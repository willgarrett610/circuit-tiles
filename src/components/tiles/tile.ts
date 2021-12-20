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

    protected connections: {
        up: boolean;
        right: boolean;
        down: boolean;
        left: boolean;
    } = {
        up: false,
        right: false,
        down: false,
        left: false,
    };

    protected connectionTemplate = {
        up: ConnectionType.BOTH,
        right: ConnectionType.BOTH,
        down: ConnectionType.BOTH,
        left: ConnectionType.BOTH,
    };

    abstract label: string;
    x = 0;
    y = 0;
    direction = Rotation.NORMAL;
    container?: PIXI.Container;
    signalActive = false;

    private getRotatedKey(dir: Direction) {
        return Direction.toLower(
            Direction.values()[
                (dir.valueOf() - this.direction.valueOf() + 4) % 4
            ]
        );
    }

    private rotateConnections<T>(connections: {
        up: T;
        right: T;
        down: T;
        left: T;
    }) {
        const rotatedConnections: any = {};
        for (const dir of Direction.values()) {
            rotatedConnections[Direction.toLower(dir)] =
                connections[this.getRotatedKey(dir)];
        }
        return rotatedConnections as {
            up: T;
            right: T;
            down: T;
            left: T;
        };
    }

    getConnections() {
        return this.rotateConnections(this.connections);
    }

    getConnectionTemplate() {
        return this.rotateConnections(this.connectionTemplate);
    }

    setConnection(dir: string, val: boolean) {
        const enumDir = Direction.fromString(dir);
        if (enumDir == null) return;
        this.connections[this.getRotatedKey(enumDir)] = val;
    }

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
        const output: Tile = new (this.type as any)(this.x, this.y);
        output.connections = { ...this.connections };
        output.direction = this.direction;
        output.signalActive = this.signalActive;
        output.label = this.label;
        output.createClone?.();

        return output;
    }

    createClone?(): Tile;
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

import { Direction, Rotation } from "../../utils/directions";
import * as PIXI from "pixi.js";
import config from "../../config";
import LogicNode from "../../logic/node";
export enum ConnectionType {
    BOTH,
    INPUT,
    OUTPUT,
    BLOCKED,
}

/** Tile */
export abstract class Tile {
    static chipTile = false;
    abstract type: typeof Tile;

    copyProps = ["connections", "label", "x", "y", "direction", "signalActive"];
    isNode = false;
    isEdge = false;

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

    protected connectionForce = {
        up: false,
        right: false,
        down: false,
        left: false,
    };

    abstract label: string;
    x = 0;
    y = 0;
    direction = Rotation.NORMAL;
    container?: PIXI.Container;
    signalActive = false;
    rotatable = false;

    /**
     * Get rotation from direction
     *
     * @param dir Direction
     * @returns rotation
     */
    private getRotatedKey(dir: Direction) {
        return Direction.toLower(
            Direction.values()[
                (dir.valueOf() - this.direction.valueOf() + 4) % 4
            ]
        );
    }

    /**
     * Rotates passed connections
     *
     * @param connections setup connections
     * @param connections.up up connection
     * @param connections.right right connection
     * @param connections.down down connection
     * @param connections.left left connection
     * @returns new rotated connections
     */
    private rotateConnections<T>(connections: {
        up: T;
        right: T;
        down: T;
        left: T;
    }) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    toNode?(): LogicNode;

    /**
     * get connections
     *
     * @returns connections
     */
    getConnections() {
        return this.rotateConnections(this.connections);
    }

    /**
     * get connection template
     *
     * @returns connection template
     */
    getConnectionTemplate() {
        return this.rotateConnections(this.connectionTemplate);
    }

    /**
     * get connection template
     *
     * @returns connection template
     */
    getConnectionForce() {
        return this.rotateConnections(this.connectionForce);
    }

    /**
     * sets up connection for tile
     *
     * @param dir direction of connection
     * @param val value of connection state
     */
    setConnection(dir: "up" | "right" | "down" | "left", val: boolean) {
        const enumDir = Direction.fromString(dir);
        if (enumDir === null) return;
        this.connections[this.getRotatedKey(enumDir)] = val;
    }

    canUse = () => true;

    /**
     * constructs tile
     *
     * @param x x position
     * @param y y position
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    abstract generateContainer(): PIXI.Container;

    postGenerate?(): void;

    abstract updateContainer?(): void;

    /**
     * gets container
     *
     * @param size size of the tile
     * @returns container
     */
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

    /**
     * updates container
     *
     * @param size size of the tile
     */
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

    /**
     * clones tile
     *
     * @returns cloned tile
     */
    clone() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

/** sprite tile */
export abstract class SpriteTile extends Tile {
    abstract texture: PIXI.Texture;

    /**
     * generates container
     *
     * @returns container
     */
    generateContainer() {
        return new PIXI.Sprite(this.texture);
    }
}

/** graphics tile */
export abstract class GraphicsTile extends Tile {
    graphics?: PIXI.Graphics;

    abstract drawGraphics(): void;

    /** clears graphics */
    clearGraphics() {
        if (!this.graphics) return;

        this.graphics.clear();

        // have to do this to set size to draw in the center
        // also has small alpha so it has bigger hit box
        this.graphics.beginFill(config.colors.tileBackground);
        this.graphics.drawRect(0, 0, 120, 120);
        this.graphics.endFill();
    }

    /**
     * generate container
     *
     * @returns container
     */
    generateContainer() {
        this.graphics = new PIXI.Graphics();
        this.clearGraphics();
        this.drawGraphics();
        return this.graphics;
    }

    /** update container */
    updateContainer() {
        this.clearGraphics();
        this.drawGraphics();
    }
}

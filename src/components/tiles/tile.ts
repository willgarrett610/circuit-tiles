import { Direction, Rotation } from "../../utils/directions";
import * as PIXI from "pixi.js";
import config from "../../config";
import LogicNode from "../../logic/node";
import { CMouseEvent, onContextMenu } from "../../utils/event";
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
    typeNumber: number = -1;

    copyProps = ["connections", "label", "x", "y", "direction", "signalActive"];
    isNode = false;
    isWire = false;
    isDisposed = false;

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
    rotatable = true;
    breakOnRotate = true;
    forGraphicOnly = false;
    onSignalUpdate?(signalActive: boolean): void;

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

    /**
     * Update the signal active state
     *
     * @param signalActive New signal active value
     */
    public setSignalActive(signalActive: boolean) {
        this.signalActive = signalActive;
        this.onSignalUpdate?.(signalActive);
    }

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

    toNode?(scope: string[]): LogicNode;

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

    /**
     * Whether the tile is connected to anything
     *
     * @returns whether the tile is connected to anything
     */
    hasConnections(): boolean {
        return (
            this.connections.up ||
            this.connections.right ||
            this.connections.down ||
            this.connections.left
        );
    }

    onClick?(e: PIXI.interaction.InteractionEvent): void;
    onContext?(e: CMouseEvent): void;

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
        console.log(this.container);
        if (!this.container || this.isDisposed) {
            this.container = this.generateContainer();
            this.container.zIndex = 100;

            if (this.onClick || this.onContext)
                this.container.interactive = true;
            if (this.onClick) this.container.addListener("click", this.onClick);
            if (this.onContext) onContextMenu(this.container, this.onContext);
            this.postGenerate?.();
        }
        console.log(this.container);
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
     * @param root0
     * @param root0.newSize new size of the tile
     * @param root0.newDirection if there was a new direction
     * @param root0.newGraphics if there is new graphics update
     */
    update({
        newSize,
        newDirection = false,
        newGraphics = false,
    }: {
        newSize?: number;
        newDirection: boolean;
        newGraphics: boolean;
    }) {
        if (this.container) {
            if (newSize) this.updateSize(newSize);
            if (newDirection) this.updateRotation();
            // TODO this might not be very efficient
            // Only need to rerender when state is changed
            // Perhaps we could have a function to call whenever state is changed that requires
            // need new graphics and a variable is set to true and if it is true then this
            // function will run, and after it is run it will set the variable back to false
            if (newGraphics) {
                this.updateContainer?.();
            }
        }
    }

    /** updates the rotation on the container graphic */
    updateRotation() {
        this.container!.rotation = (this.direction.valueOf() * Math.PI) / 2;
    }

    /**
     * updates the properties of the tile on size change
     *
     * @param size
     */
    updateSize(size: number) {
        const container = this.container!;
        container.width = size;
        container.height = size;
        container.pivot.x = container.width / (container.scale.x * 2);
        container.pivot.y = container.height / (container.scale.y * 2);
        container.x = this.x * size + size / 2;
        container.y = this.y * size + size / 2;
        container.rotation = (this.direction.valueOf() * Math.PI) / 2;
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
        output.createClone?.(this);

        return output;
    }

    createClone?(tile: Tile): void;

    /**
     * disposes of tile's graphics
     */
    dispose() {
        this.isDisposed = true;
        this.container?.destroy({ children: true });
    }
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

    /**
     * disposes of tile
     */
    dispose() {
        this.container?.destroy({ children: true, texture: true });
    }
}

/** graphics tile */
export abstract class GraphicsTile extends Tile {
    graphics?: PIXI.Graphics;

    abstract drawGraphics(): void;

    /** clears graphics */
    clearGraphics() {
        if (!this.graphics) throw new Error("graphics is undefined");

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
        const container = new PIXI.Container();
        this.graphics = new PIXI.Graphics();
        this.clearGraphics();
        this.drawGraphics();
        container.addChild(this.graphics);
        return container;
    }

    /** update container */
    updateContainer() {
        this.clearGraphics();
        this.drawGraphics();
    }
}

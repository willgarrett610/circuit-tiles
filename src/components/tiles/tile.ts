import { Direction } from "../../utils/directions";
import * as PIXI from "pixi.js";

export abstract class Tile {
    label?: string = undefined;
    x = 0;
    y = 0;
    direction = Direction.NORMAL;
    container?: PIXI.Container;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    abstract generateContainer(): PIXI.Container;

    getContainer(size: number): PIXI.Container {
        if (this.container == null) this.container = this.generateContainer();
        this.container.width = size;
        this.container.height = size;
        this.container.pivot.x = this.container.width / (this.container.scale.x * 2);
        this.container.pivot.y = this.container.height / (this.container.scale.y * 2);
        this.container.x = this.x * size + size/2;
        this.container.y = this.y * size + size/2;
        this.container.rotation = this.direction.valueOf() * Math.PI/2;
        return this.container;
    }

    update(size: number) {
        if (this.container) {
            this.container.width = size;
            this.container.height = size;
            this.container.pivot.x = this.container.width / (this.container.scale.x * 2);
            this.container.pivot.y = this.container.height / (this.container.scale.y * 2);
            this.container.x = this.x * size + size/2;
            this.container.y = this.y * size + size/2;
            this.container.rotation = this.direction.valueOf() * Math.PI/2;
        }
    }
}

export abstract class SpriteTile extends Tile{

    abstract texture: PIXI.Texture;

    generateContainer() {
        return new PIXI.Sprite(this.texture);
    }

}
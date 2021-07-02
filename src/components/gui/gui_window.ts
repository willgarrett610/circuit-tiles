import * as PIXI from "pixi.js";
import Button from "./button";
import GUIComponent from "./gui_component";

export default class GUIWindow extends PIXI.Container {
    components: Array<GUIComponent>;
    backgroundColor: number;
    cWidth: number;
    cHeight: number;
    backgroundRect: PIXI.Sprite;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number = 0xffffff
    ) {
        super();

        this.x = x;
        this.y = y;
        this.cWidth = width;
        this.cHeight = height;

        this.components = [];
        this.backgroundColor = backgroundColor;

        this.interactive = true;

        this.backgroundRect = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.backgroundRect.width = width;
        this.backgroundRect.height = height;
        this.backgroundRect.tint = backgroundColor;
        this.backgroundRect.interactive = true;

        this.addChild(this.backgroundRect);

        this.on("click", (e: PIXI.interaction.InteractionEvent) => {
            e.stopPropagation();
        });

        this.on("mousemove", (e: PIXI.interaction.InteractionEvent) => {
            let point = e.data.global;
            if (
                point.x >= this.x &&
                point.x < this.x + this.cWidth &&
                point.y >= this.y &&
                point.y < this.y + this.cHeight
            ) {
                e.stopPropagation();
            }
        });

        let btn = new Button(10, 10, 20, 20);
        btn.onClick = (e) => {
            console.log("test");
        };

        this.addChild(btn);

        this.draw();
    }

    addChild<TChildren extends PIXI.DisplayObject[]>(
        ...child: TChildren
    ): TChildren[0] {
        for (let c in child) {
            if ((c as any).__proto__ instanceof GUIComponent) {
                this.components.push(c as any);
            }
        }
        return super.addChild(...child);
    }

    addChildAt<T extends PIXI.DisplayObject>(child: T, index: number): T {
        if ((child as any).__proto__ instanceof GUIComponent) {
            this.components.push(child as any);
        }
        return super.addChildAt(child, index);
    }

    removeChild<TChildren extends PIXI.DisplayObject[]>(
        ...child: TChildren
    ): TChildren[0] {
        for (let c in child) {
            if ((c as any).__proto__ instanceof GUIComponent) {
                const index = this.components.indexOf(c as any);
                if (index > -1) this.components.splice(index, 1);
            }
        }
        return super.removeChild(...child);
    }

    removeChildAt(index: number): PIXI.DisplayObject {
        let child = super.removeChildAt(index);
        if ((child as any).__proto__ instanceof GUIComponent) {
            const index = this.components.indexOf(child as any);
            if (index > -1) this.components.splice(index, 1);
        }
        return child;
    }

    removeChildren(
        beginIndex?: number,
        endIndex?: number
    ): PIXI.DisplayObject[] {
        let children = super.removeChildren(beginIndex, endIndex);
        for (let child in children) {
            if ((child as any).__proto__ instanceof GUIComponent) {
                const index = this.components.indexOf(child as any);
                if (index > -1) this.components.splice(index, 1);
            }
        }
        return children;
    }

    draw() {
        this.components.forEach((comp) => comp.drawComponent());
    }
}

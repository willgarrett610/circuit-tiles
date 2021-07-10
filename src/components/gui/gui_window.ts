import * as PIXI from "pixi.js";
import { GUIComponent } from "./gui_component";

export default class GUIWindow extends PIXI.Container {
    components: GUIComponent[];
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

        // this.draw();
    }

    setSize(width: number, height: number) {
        this.cWidth = width;
        this.cHeight = height;
        this.backgroundRect.width = width;
        this.backgroundRect.height = height;
    }

    addChild(
        ...children: (PIXI.DisplayObject | GUIComponent)[]
    ): PIXI.DisplayObject | GUIComponent {
        for (let child of children) {
            if (child instanceof GUIComponent)
                this.components.push(child as GUIComponent);
        }
        return super.addChild(...children);
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

    // draw(delta?: number) {
    //     this.components.forEach((comp) => comp.drawComponent(delta));
    // }
}

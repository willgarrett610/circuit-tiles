import * as PIXI from "pixi.js";
import { onScroll } from "../../utils";
import { clamp } from "../../utils/math";
import { GUIComponent } from "./gui_component";

export default class GUIWindow extends PIXI.Container {
    components: GUIComponent[];
    container: PIXI.Container;
    backgroundColor: number;
    cWidth: number;
    cHeight: number;
    backgroundRect: PIXI.Sprite;
    scrollableX = false;
    scrollableY = false;
    scrollMarginX = 0;
    scrollMarginY = 0;
    borderWidth = 0;
    borderColor = 0x000000;
    private border: PIXI.Graphics;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number = 0xffffff,
        borderWidth: number = 0,
        borderColor: number = 0x000000
    ) {
        super();

        this.sortableChildren = true;

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

        this.borderWidth = borderWidth;
        this.borderColor = borderColor;

        const border = new PIXI.Graphics();
        border.beginFill(0, 0);
        border.lineStyle(borderWidth, borderColor);
        border.drawRect(
            borderWidth / 2,
            borderWidth / 2,
            width - borderWidth,
            height - borderWidth
        );
        border.endFill();
        border.zIndex = 500;

        const mask = new PIXI.Graphics();
        mask.beginFill(0xffffff);
        mask.drawRect(0, 0, width, height);
        mask.endFill();

        this.mask = mask;
        super.addChild(mask);

        super.addChild(this.backgroundRect);

        this.border = border;
        super.addChild(border);

        this.container = new PIXI.Container();
        super.addChild(this.container);

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

        onScroll(this, (e: WheelEvent) => {
            if (
                e.shiftKey &&
                this.scrollableX &&
                this.container.width > this.cWidth
            ) {
            } else if (
                !e.shiftKey &&
                this.scrollableY &&
                this.container.height > this.cHeight
            ) {
                this.container.y = clamp(
                    this.container.y - e.deltaY,
                    this.cHeight - this.container.height - this.scrollMarginY,
                    0
                );
            }
        });

        // this.draw();
    }

    setSize(width: number, height: number) {
        this.cWidth = width;
        this.cHeight = height;
        this.backgroundRect.width = width;
        this.backgroundRect.height = height;

        const mask: PIXI.Graphics = this.mask as PIXI.Graphics;

        mask.clear();
        mask.beginFill(0xffffff);
        mask.drawRect(0, 0, width, height);
        mask.endFill();

        const border = this.border;
        border.clear();
        border.beginFill(0, 0);
        border.lineStyle(this.borderWidth, this.borderColor);
        border.drawRect(
            this.borderWidth / 2,
            this.borderWidth / 2,
            width - this.borderWidth,
            height - this.borderWidth
        );
        border.endFill();
        border.zIndex = 1000;
    }

    addChild(
        ...children: (PIXI.DisplayObject | GUIComponent)[]
    ): PIXI.DisplayObject | GUIComponent {
        for (let child of children) {
            if (child instanceof GUIComponent)
                this.components.push(child as GUIComponent);
        }
        return this.container.addChild(...children);
    }

    addChildAt<T extends PIXI.DisplayObject>(child: T, index: number): T {
        if ((child as any).__proto__ instanceof GUIComponent) {
            this.components.push(child as any);
        }
        return this.container.addChildAt(child, index);
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
        return this.container.removeChild(...child);
    }

    removeChildAt(index: number): PIXI.DisplayObject {
        let child = this.container.removeChildAt(index);
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
        let children = this.container.removeChildren(beginIndex, endIndex);
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

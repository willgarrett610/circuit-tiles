/* eslint-disable @typescript-eslint/no-explicit-any */
import * as PIXI from "pixi.js";
import { clamp } from "../../../utils/math";
import { GUIComponent } from "./gui_component";
import Layout from "../layout/layout";
import { subscribe } from "../../../state";
import { onResize, onScroll } from "../../../utils/event";

/** gui window */
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
    layout?: Layout;

    xLambda?: () => number;
    yLambda?: () => number;
    sizeLambda?: () => [w: number, h: number];

    /**
     * construct gui window
     *
     * @param x
     * @param y
     * @param width
     * @param height
     * @param backgroundColor
     * @param borderWidth
     * @param borderColor
     */
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
            const point = e.data.global;
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
                return;
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

        subscribe("interactive", (value) => {
            this.interactive = value;
        });

        onResize(() => {
            if (this.xLambda) {
                this.x = this.xLambda();
            }
            if (this.yLambda) {
                this.y = this.yLambda();
            }
            if (this.sizeLambda) {
                this.setSize(...this.sizeLambda());
            }
        });
    }

    /**
     * set size of gui window
     *
     * @param width pixel width
     * @param height pixel height
     */
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

    /**
     * set layout
     *
     * @param layout
     */
    setLayout(layout: Layout) {
        this.layout = layout;
        this.updateLayout();
    }

    /**
     * update layout
     */
    updateLayout() {
        if (this.layout !== undefined) {
            for (let i = 0; i < this.components.length; i++) {
                const comp = this.components[i];
                const posSize = this.layout.getElementPosSize(i, comp, this);
                comp.x = posSize[0];
                comp.y = posSize[1];
                comp.width = posSize[2];
                comp.height = posSize[3];
            }
        }
    }

    /**
     * add children to gui window
     *
     * @param children
     * @returns
     */
    addChild(
        ...children: (PIXI.DisplayObject | GUIComponent)[]
    ): PIXI.DisplayObject | GUIComponent {
        for (const child of children) {
            if (child instanceof GUIComponent) {
                this.components.push(child as GUIComponent);
                this.updateLayout();
            }
        }
        return this.container.addChild(...children);
    }

    /**
     * add children to gui window at index
     *
     * @param child
     * @param index
     * @returns
     */
    addChildAt<T extends PIXI.DisplayObject>(child: T, index: number): T {
        if ((child as any).__proto__ instanceof GUIComponent) {
            this.components.splice(index, 0, child as any);
            this.updateLayout();
        }
        return this.container.addChildAt(child, index);
    }

    /**
     * remove children from gui window
     *
     * @param child
     * @returns
     */
    removeChild<TChildren extends PIXI.DisplayObject[]>(
        ...child: TChildren
    ): TChildren[0] {
        for (const c of child) {
            if ((c as any).__proto__ instanceof GUIComponent) {
                const index = this.components.indexOf(c as any);
                if (index > -1) this.components.splice(index, 1);
                this.updateLayout();
            }
        }
        return this.container.removeChild(...child);
    }

    /**
     * remove children from gui window at index
     *
     * @param index
     * @returns
     */
    removeChildAt(index: number): PIXI.DisplayObject {
        const child = this.container.removeChildAt(index);
        if ((child as any).__proto__ instanceof GUIComponent) {
            const index = this.components.indexOf(child as any);
            if (index > -1) {
                this.components.splice(index, 1);
                this.updateLayout();
            }
        }
        return child;
    }

    /**
     * remove all children from gui window at indexes
     *
     * @param beginIndex
     * @param endIndex
     * @returns
     */
    removeChildren(
        beginIndex?: number,
        endIndex?: number
    ): PIXI.DisplayObject[] {
        // for (const child of this.container.children.slice(beginIndex, endIndex))
        //     child.destroy();

        const children = this.container.removeChildren(beginIndex, endIndex);
        for (const child of children) {
            if ((child as any).__proto__ instanceof GUIComponent) {
                const index = this.components.indexOf(child as any);
                if (index > -1) {
                    this.components.splice(index, 1);
                    this.updateLayout();
                }
            }
        }
        return children;
    }

    // draw(delta?: number) {
    //     this.components.forEach((comp) => comp.drawComponent(delta));
    // }
}

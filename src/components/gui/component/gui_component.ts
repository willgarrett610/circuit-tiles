import * as PIXI from "pixi.js";
import { subscribe } from "../../../state";
import { onResize } from "../../../utils";

export enum GUIComponentState {
    DEFAULT,
    HOVER,
    PRESSED,
    DISABLED,
}

/** gui component */
export class GUIComponent extends PIXI.Container {
    backgroundColor: number;
    defaultContainer?: PIXI.Container;
    hoverContainer?: PIXI.Container;
    pressedContainer?: PIXI.Container;
    disabledContainer?: PIXI.Container;
    cWidth: number;
    cHeight: number;
    backgroundSprite: PIXI.Sprite;
    onHover?(): void;
    onEndHover?(): void;
    onClick?(e: PIXI.interaction.InteractionEvent): void;
    onRightClick?(e: PIXI.interaction.InteractionEvent): void;
    onStateChange?(newState: GUIComponentState): void;
    state: GUIComponentState = GUIComponentState.DEFAULT;

    xLambda?: () => number;
    yLambda?: () => number;

    /**
     * construct gui components
     *
     * @param x
     * @param y
     * @param width
     * @param height
     * @param backgroundColor
     */
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

        this.interactive = true;

        this.backgroundColor = backgroundColor;

        this.backgroundSprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.backgroundSprite.width = width;
        this.backgroundSprite.height = height;
        this.backgroundSprite.interactive = true;
        this.backgroundSprite.tint = backgroundColor;

        this.addChild(this.backgroundSprite);

        this.on("click", (e: PIXI.interaction.InteractionEvent) => {
            e.stopPropagation();
            if (this.state !== GUIComponentState.DISABLED) {
                this.onClick?.(e);
            }
        });

        this.on("rightclick", (e: PIXI.interaction.InteractionEvent) => {
            e.stopPropagation();
            if (this.state !== GUIComponentState.DISABLED) {
                this.onRightClick?.(e);
            }
        });

        this.on("mouseover", () => {
            if (this.state !== GUIComponentState.DISABLED) {
                this.onHover?.();
                this.setState(GUIComponentState.HOVER);
            }
        });
        this.on("mouseout", () => {
            if (this.state !== GUIComponentState.DISABLED) {
                this.onEndHover?.();
                this.setState(GUIComponentState.DEFAULT);
            }
        });

        this.on("mousedown", () => {
            if (this.state !== GUIComponentState.DISABLED) {
                this.setState(GUIComponentState.PRESSED);
            }
        });
        this.on("mouseup", () => {
            if (this.state !== GUIComponentState.DISABLED) {
                this.setState(GUIComponentState.HOVER);
            }
        });
        this.on("mouseupoutside", () => {
            if (this.state !== GUIComponentState.DISABLED) {
                this.setState(GUIComponentState.DEFAULT);
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
        });
    }

    /**
     * get container by state
     *
     * @param state
     * @returns
     */
    getContainer(state: GUIComponentState) {
        switch (state) {
            case GUIComponentState.DEFAULT:
                return this.defaultContainer;
            case GUIComponentState.HOVER:
                return this.hoverContainer;
            case GUIComponentState.PRESSED:
                return this.pressedContainer;
            case GUIComponentState.DISABLED:
                return this.disabledContainer;
            default:
                return null;
        }
    }

    /**
     * set state for gui component
     *
     * @param state new state
     */
    setState(state: GUIComponentState) {
        const prevContainer = this.getContainer(this.state);
        this.state = state;
        const newContainer = this.getContainer(this.state);
        if (newContainer && prevContainer) {
            this.removeChild(prevContainer);
            this.addChild(newContainer);
        }
        this.onStateChange?.(state);
    }

    /**
     * set background color
     *
     * @param backgroundColor
     */
    setBackgroundColor(backgroundColor: number = 0xffffff) {
        this.backgroundColor = backgroundColor;
        this.backgroundSprite.tint = backgroundColor;
    }

    /**
     * set background sprite
     *
     * @param backgroundSprite
     */
    setBackgroundSprite(backgroundSprite: PIXI.Sprite) {
        this.removeChild(this.backgroundSprite);
        this.backgroundSprite = backgroundSprite;
        this.backgroundSprite.width = this.cWidth;
        this.backgroundSprite.height = this.cHeight;
        this.addChild(this.backgroundSprite);
    }

    /**
     * set default container
     *
     * @param container
     */
    setDefaultContainer(container: PIXI.Container) {
        this.defaultContainer = container;
        this.defaultContainer.zIndex = 100;
        this.addChild(container);
    }

    /**
     * set hover container
     *
     * @param container
     */
    setHoverContainer(container: PIXI.Container) {
        this.hoverContainer = container;
        this.hoverContainer.zIndex = 100;
    }

    /**
     * set pressed container
     *
     * @param container
     */
    setPressedContainer(container: PIXI.Container) {
        this.pressedContainer = container;
        this.pressedContainer.zIndex = 100;
    }

    /**
     * set disabled container
     *
     * @param container
     */
    setDisabledContainer(container: PIXI.Container) {
        this.disabledContainer = container;
    }
}

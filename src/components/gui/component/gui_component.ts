import * as PIXI from "pixi.js";

export enum GUIComponentState {
    default,
    hover,
    pressed,
    disabled,
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
    state: GUIComponentState = GUIComponentState.default;

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
            if (this.state != GUIComponentState.disabled) {
                this.onClick?.(e);
            }
        });

        this.on("rightclick", (e: PIXI.interaction.InteractionEvent) => {
            e.stopPropagation();
            if (this.state != GUIComponentState.disabled) {
                this.onRightClick?.(e);
            }
        });

        this.on("mouseover", () => {
            if (this.state != GUIComponentState.disabled) {
                this.onHover?.();
                this.setState(GUIComponentState.hover);
            }
        });
        this.on("mouseout", () => {
            if (this.state != GUIComponentState.disabled) {
                this.onEndHover?.();
                this.setState(GUIComponentState.default);
            }
        });

        this.on("mousedown", () => {
            if (this.state != GUIComponentState.disabled) {
                this.setState(GUIComponentState.pressed);
            }
        });
        this.on("mouseup", () => {
            if (this.state != GUIComponentState.disabled) {
                this.setState(GUIComponentState.hover);
            }
        });
        this.on("mouseupoutside", () => {
            if (this.state != GUIComponentState.disabled) {
                this.setState(GUIComponentState.default);
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
            case GUIComponentState.default:
                return this.defaultContainer;
            case GUIComponentState.hover:
                return this.hoverContainer;
            case GUIComponentState.pressed:
                return this.pressedContainer;
            case GUIComponentState.disabled:
                return this.disabledContainer;
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
        if (newContainer) {
            if (prevContainer) this.removeChild(prevContainer);
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

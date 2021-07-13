import * as PIXI from "pixi.js";

export enum GUIComponentState {
    default,
    hover,
    pressed,
    disabled,
}

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

    setState(state: GUIComponentState) {
        let prevContainer = this.getContainer(this.state);
        this.state = state;
        let newContainer = this.getContainer(this.state);
        if (newContainer) {
            if (prevContainer) this.removeChild(prevContainer);
            this.addChild(newContainer);
        }
        this.onStateChange?.(state);
    }

    setBackgroundColor(backgroundColor: number = 0xffffff) {
        this.backgroundColor = backgroundColor;
        this.backgroundSprite.tint = backgroundColor;
    }

    setBackgroundSprite(backgroundSprite: PIXI.Sprite) {
        this.removeChild(this.backgroundSprite);
        this.backgroundSprite = backgroundSprite;
        this.addChild(this.backgroundSprite);
    }

    setDefaultContainer(container: PIXI.Container) {
        this.defaultContainer = container;
        this.defaultContainer.zIndex = 100;
        this.addChild(container);
    }

    setHoverContainer(container: PIXI.Container) {
        this.hoverContainer = container;
        this.hoverContainer.zIndex = 100;
    }

    setPressedContainer(container: PIXI.Container) {
        this.pressedContainer = container;
        this.pressedContainer.zIndex = 100;
    }

    setDisabledContainer(container: PIXI.Container) {
        this.disabledContainer = container;
    }
}

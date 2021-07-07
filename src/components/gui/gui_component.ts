import * as PIXI from "pixi.js";

export enum GUIComponentState {
    default,
    hover,
    pressed
}

export class GUIComponent extends PIXI.Container {
    backgroundColor: number;
    defaultContainer?: PIXI.Container;
    hoverContainer?: PIXI.Container;
    pressedContainer?: PIXI.Container;
    cWidth: number;
    cHeight: number;
    backgroundSprite: PIXI.Sprite;
    onHover?(): void;
    onEndHover?(): void;
    onClick?(e: PIXI.interaction.InteractionEvent): void;
    onRightClick?(e: PIXI.interaction.InteractionEvent): void;
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
            this.onClick?.(e);
        });

        this.on("rightclick", (e: PIXI.interaction.InteractionEvent) => {
            e.stopPropagation();
            this.onRightClick?.(e);
        });

        this.on("mouseover", () => {
            this.onHover?.();
            this.setState(GUIComponentState.hover);
        });
        this.on("mouseout", () => {
            this.onEndHover?.();
            this.setState(GUIComponentState.default);
        });

        this.on("mousedown", () => (this.setState(GUIComponentState.pressed)));
        this.on("mouseup", () => (this.setState(GUIComponentState.hover)));
        this.on("mouseupoutside", () => (this.setState(GUIComponentState.default)));
    }

    getContainer(state: GUIComponentState) {
        switch (state) {
            case GUIComponentState.default:
                return this.defaultContainer;
            case GUIComponentState.hover:
                return this.hoverContainer;
            case GUIComponentState.pressed:
                return this.pressedContainer;
        }
    }

    setState(state: GUIComponentState) {
        let prevContainer = this.getContainer(this.state);
        this.state = state;
        let newContainer = this.getContainer(this.state);
        if (prevContainer) this.removeChild(prevContainer);
        if (newContainer) this.addChild(newContainer);
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
    }

    setHoverContainer(container: PIXI.Container) {
        this.hoverContainer = container;
    }

    setPressedContainer(container: PIXI.Container) {
        this.pressedContainer = container;
    }

};

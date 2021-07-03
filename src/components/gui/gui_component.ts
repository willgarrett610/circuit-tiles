import * as PIXI from "pixi.js";
abstract class GUIComponent extends PIXI.Container {
    backgroundColor: number;
    graphics: PIXI.Graphics;
    cWidth: number;
    cHeight: number;
    backgroundSprite: PIXI.Sprite;
    onHover?(): void;
    onEndHover?(): void;
    onClick?(e: PIXI.interaction.InteractionEvent): void;
    onRightClick?(e: PIXI.interaction.InteractionEvent): void;
    hovered: boolean = false;
    active: boolean = false;

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

        this.backgroundColor = backgroundColor;

        this.interactive = true;

        this.backgroundSprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.backgroundSprite.width = width;
        this.backgroundSprite.height = height;
        this.backgroundSprite.tint = backgroundColor;
        this.backgroundSprite.interactive = true;

        this.addChild(this.backgroundSprite);

        this.graphics = new PIXI.Graphics();

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
            this.hovered = true;
        });
        this.on("mouseout", () => {
            this.onEndHover?.();
            this.hovered = false;
        });

        this.on("mousedown", () => (this.active = true));
        this.on("mouseup", () => (this.active = false));
        this.on("mouseupoutside", () => (this.active = false));
    }

    setBackgroundSprite(backgroundSprite: PIXI.Sprite) {
        this.removeChild(this.backgroundSprite);
        this.backgroundSprite = backgroundSprite;
        this.addChild(this.backgroundSprite);
    }

    drawComponent(delta?: number) {
        this.draw(delta);
    }

    abstract draw(delta?: number): void;
}

export default GUIComponent;

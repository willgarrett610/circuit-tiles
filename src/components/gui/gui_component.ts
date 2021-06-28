import * as PIXI from "pixi.js";

interface GUIComponent {
    onHover?(): void;
    onClick?(e: PIXI.interaction.InteractionEvent): void;
}

abstract class GUIComponent extends PIXI.Container{

    backgroundColor: number;
    graphics: PIXI.Graphics;
    cWidth: number;
    cHeight: number;
    backgroundSprite: PIXI.Sprite;

    constructor(x: number, y: number, width: number, height: number, backgroundColor: number = 0xffffff) {
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
            if (this.onClick != undefined) {
                this.onClick(e);
            }
        });
    }

    setBackgroundSprite(backgroundSprite: PIXI.Sprite) {
        this.removeChild(this.backgroundSprite);
        this.backgroundSprite = backgroundSprite;
        this.addChild(this.backgroundSprite);
    }

    drawComponent() {
        this.draw();
    }

    abstract draw():void;
}

export default GUIComponent;
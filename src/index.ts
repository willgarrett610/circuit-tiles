import * as PIXI from "pixi.js";
import { createGrid } from "./create-grid";

const load = (app: PIXI.Application) =>
    new Promise<void>((resolve) =>
        app.loader.add("assets/sprites/doge-icon.svg").load(() => resolve())
    );

const main = async () => {
    let app = new PIXI.Application();

    document.body.style.margin = "0";
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(app.view);

    await load(app);
    let sprite = new PIXI.Sprite(
        app.loader.resources["assets/sprites/doge-icon.svg"].texture
    );

    sprite.width = 200;
    sprite.height = 200;
    sprite.x = window.innerWidth / 2 - sprite.width / 2;
    sprite.y = window.innerHeight / 2 - sprite.height / 2;
    app.stage.addChild(sprite);

    let grid = createGrid(app, 100, 0, 0);
    app.stage.addChild(grid);

    window.addEventListener("resize", () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        sprite.x = window.innerWidth / 2 - sprite.width / 2;
        sprite.y = window.innerHeight / 2 - sprite.height / 2;
    });

    let context = {
        velocity: { x: 1, y: 1 },
        sprite,
    };

    app.ticker.add(update, context);
};

function update(this: any, delta: number) {
    if (
        this.sprite.x <= 0 ||
        this.sprite.x >= window.innerWidth - this.sprite.width
    ) {
        this.velocity.x = -this.velocity.x;
    }
    if (
        this.sprite.y <= 0 ||
        this.sprite.y >= window.innerHeight - this.sprite.height
    ) {
        this.velocity.y = -this.velocity.y;
    }
    this.sprite.x += this.velocity.x;
    this.sprite.y += this.velocity.y;
}

main();

import * as PIXI from "pixi.js";
import { createGrid } from "./components/create-grid";
import { dimensions, height, onResize, width } from "./utils";

const load = (app: PIXI.Application) =>
    new Promise<void>((resolve) =>
        app.loader
            .add("doge", "assets/sprites/doge-icon.svg")
            .load(() => resolve())
    );

const main = async () => {
    let app = new PIXI.Application();

    document.body.style.margin = "0";
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(app.view);

    await load(app);

    app.renderer.backgroundColor = 0x333333;

    let { container: grid, update: updateGrid } = createGrid(100);

    app.stage.addChild(grid);

    let sprite = new PIXI.Sprite(app.loader.resources.doge.texture);
    sprite.width = 200;
    sprite.height = 200;
    sprite.x = width() / 2 - sprite.width / 2;
    sprite.y = height() / 2 - sprite.height / 2;
    app.stage.addChild(sprite);

    onResize(() => {
        app.renderer.resize(...dimensions());
        sprite.x = width() / 2 - sprite.width / 2;
        sprite.y = height() / 2 - sprite.height / 2;
    });

    let velocity = { x: 1, y: 1 };

    function update(delta: number) {
        if (sprite.x <= 0 || sprite.x >= width() - sprite.width)
            velocity.x = -velocity.x;

        if (sprite.y <= 0 || sprite.y >= height() - sprite.height)
            velocity.y = -velocity.y;
        sprite.x += velocity.x * delta;
        sprite.y += velocity.y * delta;

        grid.x += 0.15 * delta;
        grid.y += 0.1 * delta;
        updateGrid();
    }
    app.ticker.add(update);
};

main();

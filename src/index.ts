import * as PIXI from "pixi.js";
import Grid from "./components/grid";
import { dimensions, height, onMouseMove, onResize, width } from "./utils";
import config from "./config";

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

    app.renderer.backgroundColor = config.backgroundColor;

    let grid = new Grid(100);

    app.stage.addChild(grid);

    let sprite = new PIXI.Sprite(app.loader.resources.doge.texture);
    sprite.width = 20;
    sprite.height = 20;
    sprite.x = width() / 2 - sprite.width / 2;
    sprite.y = height() / 2 - sprite.height / 2;
    app.stage.addChild(sprite);

    onMouseMove((e) => {
        // console.log(grid.screenToGrid(e.clientX, e.clientY));
    });

    onResize(() => {
        app.renderer.resize(...dimensions());
        sprite.x = width() / 2 - sprite.width / 2;
        sprite.y = height() / 2 - sprite.height / 2;
    });

    // let velocity = { x: 1, y: 1 };

    function update(delta: number) {
        // if (sprite.x <= 0 || sprite.x >= width() - sprite.width)
        //     velocity.x = -velocity.x;

        // if (sprite.y <= 0 || sprite.y >= height() - sprite.height)
        //     velocity.y = -velocity.y;
        // sprite.x += velocity.x * delta;
        // sprite.y += velocity.y * delta;

        // grid.x += 0.15 * delta;
        // grid.y += 0.1 * delta;
        grid.update();
        sprite.x = grid.gridToScreen(0.5, 0.5).x;
        sprite.y = grid.gridToScreen(0.5, 0.5).y;
    }
    app.ticker.add(update);
};

main();

import * as PIXI from "pixi.js";
import Grid from "./components/grid";
import {
    dimensions,
    height,
    onResize,
    width,
    scrollListeners,
    DisplayObjectScrollEvent,
} from "./utils";
import config from "./config";
import GUIWindow from "./components/gui/gui_window";

PIXI.utils.skipHello();

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

    let guiTest = new GUIWindow(20, 20, 100, 500, 0xff0000);

    app.stage.addChild(guiTest);

    onResize(() => {
        app.renderer.resize(...dimensions());
    });

    window.addEventListener("contextmenu", (e) => e.preventDefault());

    window.addEventListener("wheel", (e: WheelEvent) => {
        let hitObject = app.renderer.plugins.interaction.hitTest(
            new PIXI.Point(e.pageX, e.pageY),
            app.stage
        );
        if (hitObject != null) {
            scrollListeners.forEach((eventObj: DisplayObjectScrollEvent) => {
                if (eventObj.object == hitObject) eventObj.listener(e);
            });
        }
    });

    function update(delta: number) {
        sprite.x = grid.gridToScreen(0.5, 0.5).x;
        sprite.y = grid.gridToScreen(0.5, 0.5).y;
    }

    app.ticker.add(update);
};

main();

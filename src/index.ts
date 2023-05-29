import * as PIXI from "pixi.js";
import initGUI from "./components/gui/gui";

import GridManager from "./components/grid/grid_manager";
import { loadSprites } from "./components/sprites/sprite_loader";
import { initContextMenu } from "./utils/context_menu";
import { setupMenus } from "./menus";
import { handleEvent, onResize } from "./utils/event";
import Graph from "./logic/graph";
import state, { subscribe } from "./state";
import { addUpdatedTile, doTick, stopLoop } from "./logic/logic_manager";
import { height, width } from "./utils";
import config from "./config";

PIXI.utils.skipHello();

export const gridManager = new GridManager();

/**
 * Setups up the application
 */
const main = async () => {
    const app = new PIXI.Application({
        antialias: true,
    });

    initContextMenu(app);

    // Set up DOM settings for full screen

    document.body.style.margin = "0";
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.view.style.height = "100%";
    app.renderer.view.style.width = "100%";
    app.renderer.resize(window.innerWidth, window.innerHeight);

    document.body.appendChild(app.view);

    setupMenus();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gridManager = gridManager;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).graph = Graph;

    const backgroundGraphics = new PIXI.Graphics();
    backgroundGraphics.zIndex = 0;
    backgroundGraphics.beginFill(config.colors.background);
    backgroundGraphics.drawRect(0, 0, width(), height());
    backgroundGraphics.endFill();

    onResize(() => {
        backgroundGraphics.clear();
        backgroundGraphics.beginFill(config.colors.background);
        backgroundGraphics.drawRect(0, 0, width(), height());
        backgroundGraphics.endFill();
    });

    app.stage.addChild(backgroundGraphics);
    app.stage.addChild(gridManager);

    loadSprites().then(() => initGUI(app));

    subscribe("running", (running) => {
        if (running) {
            // ! ADD BACK?
            // beginLoop(400);
            doTick();
        } else {
            stopLoop();
        }
    });

    window.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        handleEvent(e, app);
    });

    window.addEventListener("wheel", (e: WheelEvent) => {
        handleEvent(e, app);
    });

    gridManager.mainGrid.addHandler("postAddTile", async (tile) => {
        // TODO: this should be changed such that it is added once the mouse is released so it doesn't keep going on drag
        addUpdatedTile(tile);
        if (state.running) doTick();
    });

    gridManager.mainGrid.addHandler("postEditTile", async () => {
        if (state.running) doTick();
    });

    gridManager.mainGrid.addHandler("postRemoveTile", async () => {
        if (state.running) doTick();
    });
};

main();

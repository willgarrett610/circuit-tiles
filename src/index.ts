import * as PIXI from "pixi.js";
import initGUI from "./components/gui/gui";

import GridManager from "./components/grid/grid_manager";
import { loadSprites } from "./components/sprites/sprite_loader";
import { initContextMenu } from "./utils/context_menu";
import { setupMenus } from "./menus";
import { handleEvent } from "./utils/event";
import Graph from "./logic/graph";
import state, { subscribe } from "./state";
import {
    addUpdatedTile,
    beginLoop,
    doTick,
    stopLoop,
} from "./logic/logic_manager";

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

    app.stage.addChild(gridManager);

    loadSprites().then(() => initGUI(app));

    subscribe("running", (runnning) => {
        if (runnning) {
            beginLoop(400);
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

    gridManager.mainGrid.addHandler("postAddTile", (tile) => {
        addUpdatedTile(tile);
        if (!state.running) doTick();
    });
};

main();

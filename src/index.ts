import * as PIXI from "pixi.js";
import { handleEvent } from "./utils";
import config from "./config";
import initGUI from "./components/gui/gui";

import GridManager from "./components/grid/grid_manager";
import { loadSprites } from "./components/sprites/sprite_loader";
import { initContextMenu } from "./utils/context_menu";
import { setupMenus } from "./menus";

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

    app.renderer.backgroundColor = config.colors.background;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gridManager = gridManager;

    app.stage.addChild(gridManager);

    loadSprites().then(() => initGUI(app));

    window.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        handleEvent(e, app);
    });

    window.addEventListener("wheel", (e: WheelEvent) => {
        handleEvent(e, app);
    });
};

main();

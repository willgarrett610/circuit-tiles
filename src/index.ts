import * as PIXI from "pixi.js";
import { scrollListeners, CWheelEvent } from "./utils";
import config from "./config";
import initGUI from "./components/gui/gui";

import GridManager from "./components/grid/grid_manager";

PIXI.utils.skipHello();

/**
 * Setups up the application
 */
const main = async () => {
    const app = new PIXI.Application();

    // Set up DOM settings for full screen

    document.body.style.margin = "0";
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.view.style.height = "100%";
    app.renderer.view.style.width = "100%";
    app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(app.view);

    app.renderer.backgroundColor = config.colors.background;

    const gridManager = new GridManager();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gridManager = gridManager;

    app.stage.addChild(gridManager);

    initGUI(app, gridManager);

    window.addEventListener("contextmenu", (e) => e.preventDefault());

    window.addEventListener("wheel", (e: WheelEvent) => {
        const cE: CWheelEvent = CWheelEvent.fromWheelEvent(e);

        const hitObject = app.renderer.plugins.interaction.hitTest(
            new PIXI.Point(cE.pageX, cE.pageY),
            app.stage
        );

        if (hitObject != null) {
            let testObject = hitObject;
            while (testObject != undefined) {
                for (let i = 0; i < scrollListeners.length; i++) {
                    const eventObj = scrollListeners[i];
                    if (eventObj.object == testObject) {
                        eventObj.listener(cE);
                        break;
                    }
                }

                if (cE.propagationStopped) break;
                testObject = testObject.parent;
            }
        }
    });
};

main();

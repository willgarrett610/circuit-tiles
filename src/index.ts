import * as PIXI from "pixi.js";
import { handleEvent } from "./utils";
import config from "./config";
import initGUI from "./components/gui/gui";

import GridManager from "./components/grid/grid_manager";
import { loadSprites } from "./components/sprites/sprite_loader";
import { setState, subscribe } from "./state";
import { initContextMenu } from "./utils/context_menu";

PIXI.utils.skipHello();

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

    const chipCreation = document.getElementById("chip_creation");
    if (chipCreation) {
        document.body.removeChild(chipCreation);
        document.body.appendChild(chipCreation);
    }

    const textInputForm = document.getElementById("text_input_modal");
    if (textInputForm) {
        document.body.removeChild(textInputForm);
        document.body.appendChild(textInputForm);
    }

    app.renderer.backgroundColor = config.colors.background;

    const gridManager = new GridManager();

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

    // Set up chip creation color preview
    const nameInput = document.getElementById(
        "chip_name_input"
    ) as HTMLInputElement;
    const hueInput = document.getElementById(
        "chip_hue_input"
    ) as HTMLInputElement;
    const huePreview = document.getElementById("chip_color_prev");

    if (hueInput && huePreview) {
        hueInput.addEventListener("input", () => {
            const hue = parseInt(hueInput.value);
            huePreview.style.backgroundColor = `hsl(${hue}, 50%, 40%)`;
        });
    }

    const chipCreationForm = document.getElementById("chip_creation");
    if (chipCreationForm) {
        subscribe("chipCreation", (value) => {
            if (value.open) {
                nameInput.value = "";
                hueInput.value = "0";
                if (huePreview)
                    huePreview.style.backgroundColor = "hsl(0, 50%, 40%)";
                chipCreationForm.style.display = "block";
                setState({ interactive: false });
            } else {
                chipCreationForm.style.display = "none";
                setState({ interactive: true });
            }
        });
    }

    const textInputTitle = document.getElementById(
        "text_input_title"
    ) as HTMLElement;
    const textInputName = document.getElementById(
        "text_input_name"
    ) as HTMLElement;
    const textInput = document.getElementById("text_input") as HTMLInputElement;

    if (textInputForm) {
        subscribe("textInput", (value) => {
            if (value.open) {
                textInputForm.style.display = "block";
                textInputTitle.innerText = value.title;
                textInputName.innerText = value.name + ":";
                textInput.value = value.value;

                setState({ interactive: false });
            } else {
                textInputForm.style.display = "none";
                setState({ interactive: true });
            }
        });
    }
};

main();

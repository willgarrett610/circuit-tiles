import * as PIXI from "pixi.js";
import { dimensions, onResize, scrollListeners, CWheelEvent } from "./utils";
import config from "./config";
import GUIWindow from "./components/gui/gui_window";
import getTileTypes from "./components/tiles/tile_types";
import { GUIComponent } from "./components/gui/gui_component";
import ButtonGroup from "./components/gui/button_group";

import init from "./lib";
import GridManager from "./components/grid/grid_manager";
import { LabeledButton, LabelType } from "./components/gui/labeled_button";
import LineWrapLayout from "./components/gui/line_wrap_layout";

var mod: typeof import("../crate/pkg");

async function loadMod() {
    mod = await init();
}

loadMod();

// setTimeout(() => console.log(mod?.add(3, 3)), 5000);
// setTimeout(() => console.log(mod), 5000);

// import init, { m } from "../pkg/index_bg.wasm";

// import ("lib.js");

PIXI.utils.skipHello();

class BtnGeneratorData {
    name: string;
    defaultContainer: PIXI.Container;
    hoverContainer: PIXI.Container;

    constructor(
        name: string,
        defaultContainer: PIXI.Container,
        hoverContainer: PIXI.Container
    ) {
        this.name = name;
        this.defaultContainer = defaultContainer;
        this.hoverContainer = hoverContainer;
    }
}

const createSelectorMenu = (
    x: number,
    y: number,
    width: number,
    height: number,
    title: string,
    btnGenerator: (i: number, tileSize: number) => BtnGeneratorData | null,
    onSelectionChange: (i: number) => void
) => {
    // Create window for selector
    let selector = new GUIWindow(
        x,
        y,
        width,
        height,
        config.colors.menuColor,
        4
    );
    selector.scrollableY = true;
    selector.scrollMarginY = config.tileSelector.margin * 2;

    // Add header text to selector window
    const headerText = new PIXI.Text(title, {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0x000000,
        fontWeight: "bold",
    });
    headerText.x = 75 - headerText.width / 2;
    headerText.y = 10;

    selector.addChild(headerText);

    // Generate tile size so the number of btns to fit in a column with margin added is config.tileSelector.tilePerColum
    var tileSize =
        (selector.width -
            config.tileSelector.margin *
                (config.tileSelector.tilePerColumn + 1)) /
        config.tileSelector.tilePerColumn;

    // Add line wrapping layout
    var btnLayout = new LineWrapLayout(
        tileSize,
        1,
        config.tileSelector.margin,
        0,
        40
    );

    selector.setLayout(btnLayout);

    // Setup graphics for border around tile when selected

    let selectedGraphics = new PIXI.Graphics();

    selectedGraphics.beginFill(0, 0);
    selectedGraphics.lineStyle(
        config.tileSelector.selectedWidth,
        config.colors.selectedTileBtn
    );
    selectedGraphics.drawRect(
        config.tileSelector.selectedWidth / 2,
        config.tileSelector.selectedWidth / 2,
        tileSize - config.tileSelector.selectedWidth,
        tileSize - config.tileSelector.selectedWidth
    );
    selectedGraphics.endFill();

    // Create a button group so only one button can be selected at any given time
    let btnGroup = new ButtonGroup(selectedGraphics);

    // Update state when selection is changed
    btnGroup.onSelectionChange = (i) => {
        onSelectionChange(i);
    };

    var btnData: BtnGeneratorData | null = null;
    var i = 0;

    while ((btnData = btnGenerator(i, tileSize)) != null) {
        var tileBtn = new LabeledButton(
            0,
            0,
            tileSize,
            tileSize,
            LabelType.BELOW,
            btnData.name,
            config.tileSelector.textSize,
            0x000000,
            config.colors.background
        );

        if (btnLayout.compHeight == 1) btnLayout.compHeight = tileBtn.height;

        btnData.defaultContainer.zIndex = 100;
        btnData.defaultContainer.removeAllListeners();

        btnData.hoverContainer.zIndex = 100;
        btnData.hoverContainer.removeAllListeners();
        var hoverGraphics = new PIXI.Graphics();

        hoverGraphics.beginFill(config.colors.highlightTile);
        hoverGraphics.drawRect(
            0,
            0,
            btnData.hoverContainer.width,
            btnData.hoverContainer.height
        );
        hoverGraphics.endFill();

        hoverGraphics.scale.x = 1 / btnData.hoverContainer.scale.x;
        hoverGraphics.scale.y = 1 / btnData.hoverContainer.scale.y;

        hoverGraphics.alpha = 0.2;
        hoverGraphics.zIndex = 200;

        btnData.hoverContainer.addChild(hoverGraphics);

        tileBtn.setDefaultContainer(btnData.defaultContainer);

        tileBtn.setHoverContainer(btnData.hoverContainer);

        selector.addChild(tileBtn);

        btnGroup.addButton(tileBtn);

        i++;
    }

    return selector;
};

const initGUI = (app: PIXI.Application, gridManager: GridManager) => {
    let selectorHeights = (dimensions()[1] - config.menubarSize) / 2;

    /*
    MENU BAR
    */

    let menuBar = new GUIWindow(
        0,
        0,
        dimensions()[0],
        config.menubarSize,
        config.colors.menuColor
    );

    /*
    TILE SELECTION
    */

    const tileSelector = createSelectorMenu(
        0,
        config.menubarSize,
        config.selectorWidth,
        selectorHeights,
        "Tiles",
        (i, tileSize) => {
            if (i >= getTileTypes().length) return null;

            var tileType = getTileTypes()[i];
            var tileOff = new tileType(0, 0);
            var tileOn = new tileType(0, 0);
            tileOn.signalActive = true;

            var defaultContainer = tileOff.getContainer(tileSize);
            var hoverContainer = tileOn.getContainer(tileSize);

            return new BtnGeneratorData(
                tileOff.label,
                defaultContainer,
                hoverContainer
            );
        },
        (i) => (gridManager.getGrid().selectedTileType = i)
    );

    /*
    CHIP SELECTION
    */

    const chipSelector = createSelectorMenu(
        0,
        config.menubarSize + selectorHeights,
        config.selectorWidth,
        selectorHeights,
        "Chips",
        (i, tileSize) => {
            if (i > getTileTypes().length) return null;

            var tileType = getTileTypes()[i];
            var tileOff = new tileType(0, 0);
            var tileOn = new tileType(0, 0);
            tileOn.signalActive = true;

            var defaultContainer = tileOff.getContainer(tileSize);
            var hoverContainer = tileOn.getContainer(tileSize);

            return new BtnGeneratorData(
                tileOff.label,
                defaultContainer,
                hoverContainer
            );
        },
        (i) => (gridManager.getGrid().selectedTileType = i)
    );

    app.stage.addChild(chipSelector);

    app.stage.addChild(tileSelector);

    app.stage.addChild(menuBar);

    onResize(() => {
        let selectorHeights = (dimensions()[1] - config.menubarSize) / 2;
        app.renderer.resize(...dimensions());
        tileSelector.setSize(config.selectorWidth, selectorHeights);
        chipSelector.setSize(config.selectorWidth, selectorHeights);
        chipSelector.y = config.menubarSize + selectorHeights;
        menuBar.setSize(dimensions()[0], config.menubarSize);
    });
};

const main = async () => {
    let app = new PIXI.Application();

    // Set up DOM settings for full screen

    document.body.style.margin = "0";
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(app.view);

    app.renderer.backgroundColor = config.colors.background;

    let gridManager = new GridManager();

    (window as any).gridManager = gridManager;

    console.log(gridManager);

    app.stage.addChild(gridManager);

    initGUI(app, gridManager);

    window.addEventListener("contextmenu", (e) => e.preventDefault());

    window.addEventListener("wheel", (e: WheelEvent) => {
        let cE: CWheelEvent = CWheelEvent.fromWheelEvent(e);

        let hitObject = app.renderer.plugins.interaction.hitTest(
            new PIXI.Point(cE.pageX, cE.pageY),
            app.stage
        );

        if (hitObject != null) {
            let testObject = hitObject;
            while (testObject != undefined) {
                for (let i = 0; i < scrollListeners.length; i++) {
                    let eventObj = scrollListeners[i];
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

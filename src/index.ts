import * as PIXI from "pixi.js";
import Grid from "./components/grid/grid";
import {
    dimensions,
    height,
    onResize,
    width,
    scrollListeners,
    DisplayObjectScrollEvent,
    CWheelEvent,
    onScroll,
} from "./utils";
import config from "./config";
import GUIWindow from "./components/gui/gui_window";
import getTileTypes from "./components/tiles/tile_types";
import { GUIComponent } from "./components/gui/gui_component";
import ButtonGroup from "./components/gui/button_group";

import init from "./lib";
import GridManager from "./components/grid/grid_manager";
import { LabeledButton, LabelType } from "./components/gui/labeled_button";
import LineWrapper from "./components/gui/line_wrap_layout";
import LineWrapLayout from "./components/gui/line_wrap_layout";

PIXI.utils.skipHello();

const initGUI = (app: PIXI.Application, gridManager: GridManager) => {
    const selectorHeights = (dimensions()[1] - config.menubarSize) / 2;

    /*
    MENU BAR
    */

    const menuBar = new GUIWindow(
        0,
        0,
        dimensions()[0],
        config.menubarSize,
        config.colors.menuColor
    );

    /*
    TILE SELECTION
    */

    const tileSelector = new GUIWindow(
        0,
        config.menubarSize,
        config.selectorWidth,
        selectorHeights,
        config.colors.menuColor,
        4
    );
    tileSelector.scrollableY = true;
    tileSelector.scrollMarginY = config.tileSelector.margin * 2;

    const headerText = new PIXI.Text("Tiles", {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0x000000,
        fontWeight: "bold",
    });
    headerText.x = 75 - headerText.width / 2;
    headerText.y = 10;

    tileSelector.addChild(headerText);

    const tileSize =
        (tileSelector.width -
            config.tileSelector.margin *
                (config.tileSelector.tilesPerRow + 1)) /
        config.tileSelector.tilesPerRow;

    const tileBtnLayout = new LineWrapLayout(
        tileSize,
        1,
        config.tileSelector.margin,
        0,
        40
    );

    tileSelector.setLayout(tileBtnLayout);

    // Setup graphics for selected tile

    const selectedGraphics = new PIXI.Graphics();

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

    const tileBtnGroup = new ButtonGroup(selectedGraphics);

    tileBtnGroup.onSelectionChange = (i) => {
        gridManager.getGrid().selectedTileType = i;
    };
    let i = 0;
    for (; i < getTileTypes().length; i++) {
        let y = Math.floor(i / config.tileSelector.tilesPerRow);
        let x = i - y * config.tileSelector.tilesPerRow;

        y =
            config.menubarSize +
            config.tileSelector.margin +
            (config.tileSelector.margin * 2 + tileSize) * y +
            config.tileSelector.textSize * y;
        x =
            config.tileSelector.margin +
            (config.tileSelector.margin + tileSize) * x;

        const tileType = getTileTypes()[i];
        const tileOff = new tileType(0, 0);
        const tileOn = new tileType(0, 0);
        tileOn.signalActive = true;

        const tileBtn = new LabeledButton(
            0,
            0,
            tileSize,
            tileSize,
            LabelType.BELOW,
            tileOff.label,
            config.tileSelector.textSize,
            0x000000,
            config.colors.background
        );

        if (tileBtnLayout.compHeight == 1)
            tileBtnLayout.compHeight = tileBtn.height;

        const defaultContainer = tileOff.getContainer(tileSize);
        defaultContainer.zIndex = 100;
        defaultContainer.removeAllListeners();

        const hoverContainer = tileOn.getContainer(tileSize);
        hoverContainer.zIndex = 100;
        hoverContainer.removeAllListeners();
        const hoverGraphics = new PIXI.Graphics();

        hoverGraphics.beginFill(config.colors.highlightTile);
        hoverGraphics.drawRect(
            0,
            0,
            hoverContainer.width,
            hoverContainer.height
        );
        hoverGraphics.endFill();

        hoverGraphics.scale.x = 1 / hoverContainer.scale.x;
        hoverGraphics.scale.y = 1 / hoverContainer.scale.y;

        hoverGraphics.alpha = 0.2;
        hoverGraphics.zIndex = 200;

        hoverContainer.addChild(hoverGraphics);

        tileBtn.setDefaultContainer(defaultContainer);

        tileBtn.setHoverContainer(hoverContainer);

        tileSelector.addChild(tileBtn);

        tileBtnGroup.addButton(tileBtn);
    }

    /*
    CHIP SELECTION
    */

    const chipSelector = new GUIWindow(
        0,
        config.menubarSize + selectorHeights,
        config.selectorWidth,
        selectorHeights,
        config.colors.menuColor,
        4,
        0x000000
    );
    chipSelector.scrollableY = true;
    chipSelector.scrollMarginY = config.tileSelector.margin * 2;

    const chipHeaderText = new PIXI.Text("Tiles", {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0x000000,
        fontWeight: "bold",
    });
    chipHeaderText.x = 75 - chipHeaderText.width / 2;
    chipHeaderText.y = 10;

    chipSelector.addChild(chipHeaderText);

    let y = Math.floor(i / config.tileSelector.tilesPerRow);
    let x = i - y * config.tileSelector.tilesPerRow;

    y =
        config.menubarSize +
        config.tileSelector.margin +
        (config.tileSelector.margin * 2 + tileSize) * y +
        config.tileSelector.textSize * y;
    x =
        config.tileSelector.margin +
        (config.tileSelector.margin + tileSize) * x;

    const newChipBtn = new GUIComponent(
        x,
        y,
        tileSize,
        tileSize,
        config.colors.background
    );

    app.stage.addChild(chipSelector);

    app.stage.addChild(tileSelector);

    app.stage.addChild(menuBar);

    onResize(() => {
        const selectorHeights = (dimensions()[1] - config.menubarSize) / 2;
        app.renderer.resize(...dimensions());
        tileSelector.setSize(config.selectorWidth, selectorHeights);
        chipSelector.setSize(config.selectorWidth, selectorHeights);
        chipSelector.y = config.menubarSize + selectorHeights;
        menuBar.setSize(dimensions()[0], config.menubarSize);
    });
};

const main = async () => {
    const app = new PIXI.Application();

    // Set up DOM settings for full screen

    document.body.style.margin = "0";
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(app.view);

    app.renderer.backgroundColor = config.colors.background;

    const gridManager = new GridManager();

    (window as any).gridManager = gridManager;

    console.log(gridManager);

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

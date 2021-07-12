import * as PIXI from "pixi.js";
import Grid from "./components/grid";
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

var mod: typeof import("../pkg");

async function loadMod() {
    mod = await init();
}

loadMod();

setTimeout(() => console.log(mod?.add(3, 3)), 5000);
// setTimeout(() => console.log(mod), 5000);

// import init, { m } from "../pkg/index_bg.wasm";

// import ("lib.js");

PIXI.utils.skipHello();

const main = async () => {
    let app = new PIXI.Application();

    // Set up DOM settings for full screen

    document.body.style.margin = "0";
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(app.view);

    app.renderer.backgroundColor = config.backgroundColor;

    let grid = new Grid(100);

    app.stage.addChild(grid);

    // Create tile selection gui

    let tileSelector = new GUIWindow(
        config.guiMargin,
        config.guiMargin,
        150,
        dimensions()[1] - config.guiMargin * 2,
        0xaaaaaa
    );
    tileSelector.scrollableY = true;
    tileSelector.scrollMarginY = config.tileSelector.margin * 2;

    var tileSize =
        (tileSelector.width -
            config.tileSelector.margin *
                (config.tileSelector.tilesPerRow + 1)) /
        config.tileSelector.tilesPerRow;

    // Setup graphics for selected tile

    let selectedGraphics = new PIXI.Graphics();

    selectedGraphics.beginFill(0, 0);
    selectedGraphics.lineStyle(
        config.tileSelector.selectedWidth,
        config.tileSelector.selectedColor
    );
    selectedGraphics.drawRect(
        config.tileSelector.selectedWidth / 2,
        config.tileSelector.selectedWidth / 2,
        tileSize - config.tileSelector.selectedWidth,
        tileSize - config.tileSelector.selectedWidth
    );
    selectedGraphics.endFill();

    let tileBtnGroup = new ButtonGroup(selectedGraphics);

    tileBtnGroup.onSelectionChange = (i) => {
        grid.selectedTileType = i;
    };

    for (var i = 0; i < getTileTypes().length; i++) {
        var y = Math.floor(i / config.tileSelector.tilesPerRow);
        var x = i - y * config.tileSelector.tilesPerRow;

        y =
            config.tileSelector.margin +
            (config.tileSelector.margin * 2 + tileSize) * y +
            config.tileSelector.textSize * y;
        x =
            config.tileSelector.margin +
            (config.tileSelector.margin + tileSize) * x;

        var tileBtn = new GUIComponent(
            x,
            y,
            tileSize,
            tileSize,
            config.backgroundColor
        );

        var tileType = getTileTypes()[i];
        var tile = new tileType(0, 0);

        var text = new PIXI.Text(tile.label, {
            fontFamily: "Arial",
            fontSize: config.tileSelector.textSize,
            fill: 0x000000,
            fontWeight: "bold",
        });
        text.x = x + tileSize / 2 - text.width / 2;
        text.y = y + tileSize + config.tileSelector.margin / 2;

        var defaultContainer = tile.getContainer(tileSize);
        defaultContainer.removeAllListeners();
        tile.container = undefined;

        var hoverContainer = tile.getContainer(tileSize);
        hoverContainer.removeAllListeners();
        var hoverGraphics = new PIXI.Graphics();

        hoverGraphics.beginFill(config.highlightTileColor);
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

        tileSelector.addChild(text);

        tileBtnGroup.addButton(tileBtn);
    }

    app.stage.addChild(tileSelector);

    onResize(() => {
        app.renderer.resize(...dimensions());
        tileSelector.setSize(150, dimensions()[1] - config.guiMargin * 2);
    });

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

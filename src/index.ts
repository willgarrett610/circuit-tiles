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

PIXI.utils.skipHello();

const load = (app: PIXI.Application) =>
    new Promise<void>((resolve) =>
        app.loader
            .add("doge", "assets/sprites/doge-icon.svg")
            .load(() => resolve())
    );

const main = async () => {
    let app = new PIXI.Application();

    // Set up DOM settings for full screen

    document.body.style.margin = "0";
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(app.view);

    await load(app);

    app.renderer.backgroundColor = config.backgroundColor;

    let grid = new Grid(100);

    app.stage.addChild(grid);

    // Set sprite at origin for reference

    let sprite = new PIXI.Sprite(app.loader.resources.doge.texture);
    sprite.width = 20;
    sprite.height = 20;
    sprite.x = width() / 2 - sprite.width / 2;
    sprite.y = height() / 2 - sprite.height / 2;
    app.stage.addChild(sprite);

    // Create tile selection gui

    let tileSelector = new GUIWindow(config.guiMargin, config.guiMargin, 150, dimensions()[1] - config.guiMargin * 2, 0xaaaaaa);
    tileSelector.scrollableY = true;
    tileSelector.scrollMarginY = config.tileSelector.margin * 2;

    var tileSize = (tileSelector.width - (config.tileSelector.margin * (config.tileSelector.tilesPerRow + 1))) / config.tileSelector.tilesPerRow;

    // Setup graphics for selected tile
    
    let selectedGraphics = new PIXI.Graphics();

    selectedGraphics.beginFill(0, 0);
    selectedGraphics.lineStyle(config.tileSelector.selectedWidth, config.tileSelector.selectedColor);
    selectedGraphics.drawRect(config.tileSelector.selectedWidth/2,config.tileSelector.selectedWidth/2,tileSize-config.tileSelector.selectedWidth,tileSize-config.tileSelector.selectedWidth);
    selectedGraphics.endFill();

    let tileBtnGroup = new ButtonGroup(selectedGraphics);

    tileBtnGroup.onSelectionChange = (i) => {
        grid.selectedTileType = i;
    }

    for (var i = 0; i < getTileTypes().length; i++) {
        var y = Math.floor(i / config.tileSelector.tilesPerRow);
        var x = i - (y * config.tileSelector.tilesPerRow);

        y = config.tileSelector.margin + (config.tileSelector.margin + tileSize) * y;
        x = config.tileSelector.margin + (config.tileSelector.margin + tileSize) * x;

        var tileBtn = new GUIComponent(x, y, tileSize, tileSize, config.backgroundColor);

        var tileType = getTileTypes()[i];
        var tile = new tileType(0, 0);

        var defaultContainer = tile.getContainer(tileSize);
        defaultContainer.removeAllListeners();
        tile.container = undefined;

        var hoverContainer = tile.getContainer(tileSize);
        hoverContainer.removeAllListeners();
        var hoverGraphics = new PIXI.Graphics();

        hoverGraphics.beginFill(config.highlightTileColor);
        hoverGraphics.drawRect(0, 0, hoverContainer.width, hoverContainer.height);
        hoverGraphics.endFill();

        hoverGraphics.scale.x = 1/hoverContainer.scale.x;
        hoverGraphics.scale.y = 1/hoverContainer.scale.y;

        hoverGraphics.alpha = 0.2;
        hoverGraphics.zIndex = 200;

        hoverContainer.addChild(hoverGraphics);

        tileBtn.setDefaultContainer(defaultContainer);

        tileBtn.setHoverContainer(hoverContainer);

        tileSelector.addChild(tileBtn);

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

    function update(delta: number) {
        sprite.x = grid.gridToScreen(0.5, 0.5).x;
        sprite.y = grid.gridToScreen(0.5, 0.5).y;
    }

    app.ticker.add(update);
};

main();

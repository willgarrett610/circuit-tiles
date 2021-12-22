import * as PIXI from "pixi.js";

import { dimensions, onResize } from "../../utils";
import GUIWindow from "./component/gui_window";
import getTileTypes from "../tiles/tile_types";
import ButtonGroup from "./component/button_group";
import LineWrapLayout from "./layout/line_wrap_layout";
import config from "../../config";

import GridManager from "../grid/grid_manager";
import { GUIComponent, GUIComponentState } from "./component/gui_component";
import { getSprite } from "../sprites/sprite_loader";
import state, { setState, subscribe } from "../../state";
import { EditMode } from "../../utils/edit_mode";
import SelectorMenu, { BtnGeneratorData } from "./component/selector_menu";

const createToolBtn = (spriteKey: string): GUIComponent => {
    const toolHover = new PIXI.Graphics();

    toolHover.beginFill(config.colors.highlightTool);
    toolHover.drawRect(0, 0, config.menubarSize, config.menubarSize);
    toolHover.endFill();

    // toolHover.scale.x = 1 / btnData.hoverContainer.scale.x;
    // toolHover.scale.y = 1 / btnData.hoverContainer.scale.y;

    toolHover.alpha = 0.2;
    toolHover.zIndex = 200;

    const tool = new GUIComponent(
        0,
        0,
        config.menubarSize,
        config.menubarSize,
        config.colors.menuColor
    );
    const defaultContainer = new PIXI.Container();
    const defaultSprite = getSprite(spriteKey);
    defaultSprite.width = tool.cWidth;
    defaultSprite.height = tool.cHeight;
    defaultContainer.addChild(defaultSprite);
    tool.setDefaultContainer(defaultContainer);

    const hoverContainer = new PIXI.Container();
    const hoverSprite = getSprite(spriteKey);
    hoverSprite.width = tool.cWidth;
    hoverSprite.height = tool.cHeight;
    hoverContainer.addChild(hoverSprite);
    hoverContainer.addChild(toolHover);
    tool.setHoverContainer(hoverContainer);
    tool.setState(GUIComponentState.DEFAULT);

    return tool;
};

const createToolSelector = (onSelectionChange: (i: number) => void) => {
    const selector = new GUIWindow(
        0,
        config.menubarSize,
        config.menubarSize,
        dimensions()[1] - config.menubarSize,
        config.colors.menuColor
    );

    const layout = new LineWrapLayout(
        config.menubarSize,
        config.menubarSize,
        0
    );

    const panTool = createToolBtn("pan");
    const eraseTool = createToolBtn("eraser");
    const tilesTool = createToolBtn("tiles");
    const chipsTool = createToolBtn("chips");

    selector.setLayout(layout);

    selector.addChild(panTool);
    selector.addChild(eraseTool);
    selector.addChild(tilesTool);
    selector.addChild(chipsTool);

    const selectedGraphics = new PIXI.Graphics();

    selectedGraphics.beginFill(config.colors.selectedTool);
    selectedGraphics.drawRect(0, 0, config.menubarSize, config.menubarSize);
    selectedGraphics.endFill();

    // toolHover.scale.x = 1 / btnData.hoverContainer.scale.x;
    // toolHover.scale.y = 1 / btnData.hoverContainer.scale.y;

    selectedGraphics.alpha = 0.2;
    selectedGraphics.zIndex = 200;

    const btnGroup = new ButtonGroup(selectedGraphics);

    btnGroup.addButton(panTool);
    btnGroup.addButton(eraseTool);
    btnGroup.addButton(tilesTool);
    btnGroup.addButton(chipsTool);

    btnGroup.onSelectionChange = onSelectionChange;

    btnGroup.setSelected(state.editMode);

    subscribe(["editMode"], (e) => {
        if (e.value === e.prevValue) return;
        btnGroup.setSelected(e.value);
    });

    return selector;
};

/**
 * Sets up application GUI
 *
 * @param app PIXI application
 * @param gridManager Grid Manager
 */
const initGUI = (app: PIXI.Application, gridManager: GridManager) => {
    const selectorHeights = dimensions()[1] - config.menubarSize;

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

    const tileSelector = new SelectorMenu(
        config.menubarSize,
        config.menubarSize,
        config.selectorWidth,
        selectorHeights,
        "Tiles",
        (i, tileSize) => {
            if (i >= getTileTypes().length) return null;

            const tileType = getTileTypes()[i];

            const tileOff = new tileType(0, 0);
            const tileOn = new tileType(0, 0);
            tileOn.signalActive = true;

            const defaultContainer = tileOff.getContainer(tileSize);
            const hoverContainer = tileOn.getContainer(tileSize);

            return new BtnGeneratorData(
                tileOff.label,
                defaultContainer,
                hoverContainer
            );
        },
        (i) => (gridManager.getGrid().selectedTileType = i)
    );
    tileSelector.visible = false;

    /*
    CHIP SELECTION
    */

    const chipSelector = new SelectorMenu(
        config.menubarSize,
        config.menubarSize,
        config.selectorWidth,
        selectorHeights,
        "Chips",
        (i, tileSize) => {
            if (i >= getTileTypes().length) return null;

            const tileType = getTileTypes()[i];
            const tileOff = new tileType(0, 0);
            const tileOn = new tileType(0, 0);
            tileOn.signalActive = true;

            const defaultContainer = tileOff.getContainer(tileSize);
            const hoverContainer = tileOn.getContainer(tileSize);

            return new BtnGeneratorData(
                tileOff.label,
                defaultContainer,
                hoverContainer
            );
        },
        (i) => (gridManager.getGrid().selectedTileType = i)
    );
    chipSelector.visible = false;

    /*
    TOOL SELECTION
    */

    const toolSelector = createToolSelector((i) => {
        tileSelector.visible = false;
        chipSelector.visible = false;
        // state.editMode = i;
        setState({ editMode: i });
        switch (i) {
            case EditMode.TILE:
                // Tiles
                tileSelector.visible = true;
                break;
            case EditMode.CHIP:
                // Chips
                chipSelector.visible = true;
                break;
        }
    });

    app.stage.addChild(chipSelector);

    app.stage.addChild(tileSelector);

    app.stage.addChild(toolSelector);

    app.stage.addChild(menuBar);

    onResize(() => {
        const selectorHeights = dimensions()[1] - config.menubarSize;
        app.renderer.resize(...dimensions());
        tileSelector.setSize(config.selectorWidth, selectorHeights);
        chipSelector.setSize(config.selectorWidth, selectorHeights);
        chipSelector.y = config.menubarSize;
        menuBar.setSize(dimensions()[0], config.menubarSize);
        toolSelector.setSize(
            toolSelector.width,
            dimensions()[1] - config.menubarSize
        );
    });
};

export default initGUI;

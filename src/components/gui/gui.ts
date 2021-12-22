import * as PIXI from "pixi.js";

import { dimensions, onResize } from "../../utils";
import GUIWindow from "./component/gui_window";
import getTileTypes from "../tiles/tile_types";
import ButtonGroup from "./component/button_group";
import { LabeledButton, LabelType } from "./component/labeled_button";
import LineWrapLayout from "./layout/line_wrap_layout";
import config from "../../config";

import GridManager from "../grid/grid_manager";
import { GUIComponent, GUIComponentState } from "./component/gui_component";
import { getSprite } from "../sprites/sprite_loader";
import state, { setState, subscribe } from "../../state";
import { EditMode } from "../../utils/edit_mode";

/** btn generator data */
class BtnGeneratorData {
    name: string;
    defaultContainer: PIXI.Container;
    hoverContainer: PIXI.Container;

    /**
     * construct btn generator data
     *
     * @param name
     * @param defaultContainer
     * @param hoverContainer
     */
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

/**
 * Creates a menu for tile and chip selection
 *
 * @param x X position of gui window
 * @param y Y position of gui window
 * @param width Width of gui window
 * @param height Height of gui window
 * @param title Text for menu header
 * @param btnGenerator Lambda that returns BtnGeneratorData for a button of index i
 * @param onSelectionChange Callback for selection change event
 * @returns selector menu with type GUIWindow
 */
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
    const selector = new GUIWindow(
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

    const tileSize =
        (selector.width -
            config.tileSelector.margin *
                (config.tileSelector.tilePerColumn + 1)) /
        config.tileSelector.tilePerColumn;

    const btnLayout = new LineWrapLayout(
        tileSize,
        1,
        config.tileSelector.margin,
        0,
        40
    );

    selector.setLayout(btnLayout);

    // Setup graphics for border around tile when selected

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

    const btnGroup = new ButtonGroup(selectedGraphics);

    // Update state when selection is changed
    btnGroup.onSelectionChange = (i) => {
        onSelectionChange(i);
    };

    let btnData: BtnGeneratorData | null = null;
    let i = 0;

    while ((btnData = btnGenerator(i, tileSize)) != null) {
        // let y = Math.floor(i / config.tileSelector.tilesPerRow);
        // let x = i - y * config.tileSelector.tilesPerRow;

        // y =
        //     config.menubarSize +
        //     config.tileSelector.margin +
        //     (config.tileSelector.margin * 2 + tileSize) * y +
        //     config.tileSelector.textSize * y;
        // x =
        //     config.tileSelector.margin +
        //     (config.tileSelector.margin + tileSize) * x;

        // const tileType = getTileTypes()[i];
        // const tileOff = new tileType(0, 0);
        // const tileOn = new tileType(0, 0);
        // tileOn.signalActive = true;

        const tileBtn = new LabeledButton(
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
        const hoverGraphics = new PIXI.Graphics();

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

    const cursorTool = createToolBtn("cursor");
    const panTool = createToolBtn("pan");
    const eraseTool = createToolBtn("eraser");
    const tilesTool = createToolBtn("tiles");
    const chipsTool = createToolBtn("chips");

    selector.setLayout(layout);

    selector.addChild(cursorTool);
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

    btnGroup.addButton(cursorTool);
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

    const tileSelector = createSelectorMenu(
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

    const chipSelector = createSelectorMenu(
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

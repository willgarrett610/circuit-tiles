import * as PIXI from "pixi.js";

import {
    dimensions,
    generateRoundedRectContainer,
    getCreateChipInput,
    onResize,
    width,
} from "../../utils";
import GUIWindow from "./component/gui_window";
import getTileTypes from "../tiles/tile_types";
import ButtonGroup from "./component/button_group";
import LineWrapLayout from "./layout/line_wrap_layout";
import config from "../../config";

import GridManager from "../grid/grid_manager";
import { GUIComponent, GUIComponentState } from "./component/gui_component";
import { getSprite } from "../sprites/sprite_loader";
import state, { setState, setStateProp, subscribe } from "../../state";
import { EditMode } from "../../utils/edit_mode";
import SelectorMenu from "./component/selector_menu";
import ChipGridMode from "../../utils/chip_grid_mode";

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
        config.colors.menu
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
        config.colors.menu
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

    subscribe("editMode", (value, prevValue) => {
        if (value === prevValue) return;
        btnGroup.setSelected(value);
    });

    return selector;
};

const createGridModeIndicator = () => {
    const gridModeIndicator = new GUIWindow(
        width() / 2 - config.chipModeIndicator.width / 2,
        config.menubarSize,
        config.chipModeIndicator.width,
        config.chipModeIndicator.height
    );
    gridModeIndicator.visible = false;

    subscribe("chipEditor", (value) => {
        gridModeIndicator.visible = value;
    });

    gridModeIndicator.backgroundRect.alpha = 0;

    const defaultContainer = new PIXI.Container();

    const mainBackground = generateRoundedRectContainer(
        0,
        0,
        gridModeIndicator.width,
        gridModeIndicator.height,
        config.colors.chipModeIndicator,
        {
            topLeft: 0,
            topRight: 0,
            botRight: 5,
            botLeft: 5,
        }
    );

    defaultContainer.addChild(mainBackground);

    const gridModeBoldText = new PIXI.Text("EDITING ", {
        fontFamily: "Arial",
        fontSize: config.chipModeIndicator.textSize,
        fill: 0,
        fontWeight: "bold",
    });

    subscribe(["chipGridMode"], (e) => {
        let text = "";
        switch (e.value) {
            case ChipGridMode.EDITING:
                text = "EDITING ";
                break;
            case ChipGridMode.STRUCTURING:
                text = "STRUCTURING ";
                break;
            case ChipGridMode.VIEWING:
                text = "VIEWING ";
                break;
        }
        gridModeBoldText.text = text;
        gridModeText.x = gridModeBoldText.x + gridModeBoldText.width;
        textContainer.x =
            (config.chipModeIndicator.width -
                config.chipModeIndicator.closeBtnSize) /
                2 -
            textContainer.width / 2;
    });

    const gridModeText = new PIXI.Text("", {
        fontFamily: "Arial",
        fontSize: config.chipModeIndicator.textSize,
        fill: 0,
    });

    const textContainer = new PIXI.Container();

    subscribe("editingChip", (value) => {
        const chip = value;
        if (!chip) {
            console.error("No chip selected");
            return;
        }

        gridModeText.text = chip.name;

        if (chip.name.length > 10) {
            gridModeText.text = chip.name.slice(0, 10) + "...";
        }

        textContainer.x =
            (gridModeIndicator.width - config.chipModeIndicator.closeBtnSize) /
                2 -
            textContainer.width / 2;
    });

    textContainer.addChild(gridModeBoldText);

    gridModeText.x = gridModeBoldText.x + gridModeBoldText.width;

    textContainer.addChild(gridModeText);

    textContainer.y = (gridModeIndicator.height - textContainer.height) / 2;

    textContainer.x =
        (config.chipModeIndicator.width -
            config.chipModeIndicator.closeBtnSize) /
            2 -
        textContainer.width / 2;

    defaultContainer.addChild(textContainer);

    const closeBtn = new GUIComponent(
        gridModeIndicator.width - config.chipModeIndicator.closeBtnSize,
        0,
        config.chipModeIndicator.closeBtnSize,
        gridModeIndicator.height,
        0
    );

    closeBtn.onClick = () => {
        console.log(state.editingChip);
        setState({ chipEditor: false });
    };

    closeBtn.backgroundSprite.alpha = 0;

    const closeBtnContainer = new PIXI.Container();

    const closeBackground = generateRoundedRectContainer(
        0,
        0,
        closeBtn.width,
        closeBtn.height,
        config.colors.chipModeIndicatorClose,
        { botRight: 5 }
    );

    closeBtnContainer.addChild(closeBackground);

    const closeBtnText = new PIXI.Text("Exit", {
        fontFamily: "Arial",
        fontSize: config.chipModeIndicator.textSize,
        fill: 0,
        fontWeight: "bold",
    });

    closeBtnText.y = (closeBtn.height - closeBtnText.height) / 2;
    closeBtnText.x = (closeBtn.width - closeBtnText.width) / 2;

    closeBtnContainer.addChild(closeBtnText);

    closeBtn.setDefaultContainer(closeBtnContainer);

    defaultContainer.addChild(closeBtn);

    gridModeIndicator.addChild(defaultContainer);

    return gridModeIndicator;
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
        config.colors.menu
    );

    const chipGridModeText = new PIXI.Text("Switch to structure", {
        fontFamily: "Arial",
        fontSize: config.chipGridMode.textSize,
        fill: 0xffffff,
    });

    const chipGridModeBtn = new GUIComponent(
        width() - chipGridModeText.width - 35,
        5,
        chipGridModeText.width + 30,
        config.chipGridMode.height,
        config.colors.chipGridMode
    );

    chipGridModeText.y = (chipGridModeBtn.height - chipGridModeText.height) / 2;
    chipGridModeText.x = chipGridModeBtn.width - chipGridModeText.width - 5;

    chipGridModeBtn.backgroundSprite.alpha = 0;

    const chipGridModeBtnContainer = generateRoundedRectContainer(
        0,
        0,
        chipGridModeBtn.width,
        config.chipGridMode.height,
        config.colors.chipGridMode,
        { topLeft: 5, topRight: 5, botRight: 5, botLeft: 5 }
    );

    chipGridModeBtn.setDefaultContainer(chipGridModeBtnContainer);

    subscribe(["chipGridMode"], (e) => {
        let text = "Switch to ";
        if (e.value === ChipGridMode.EDITING) {
            text += "structure";
        } else {
            text += "edit";
        }
        chipGridModeText.text = text;
        chipGridModeBtn.defaultContainer?.removeChildren();
        chipGridModeBtn.setDefaultContainer(
            generateRoundedRectContainer(
                0,
                0,
                chipGridModeText.width + 30,
                config.chipGridMode.height,
                config.colors.chipGridMode,
                { topLeft: 5, topRight: 5, botRight: 5, botLeft: 5 }
            )
        );
        chipGridModeBtn.defaultContainer?.addChild(chipGridModeText);
        chipGridModeBtn.defaultContainer?.addChild(swapSprite);
        chipGridModeBtn.x =
            width() -
            (chipGridModeBtn.defaultContainer as PIXI.Container).width -
            5;
    });

    const swapSprite = getSprite("swap");
    swapSprite.width = config.chipGridMode.height;
    swapSprite.height = config.chipGridMode.height;

    chipGridModeBtnContainer.addChild(chipGridModeText);

    chipGridModeBtnContainer.addChild(swapSprite);

    chipGridModeBtn.visible = false;

    chipGridModeBtn.onClick = () => {
        if (state.chipGridMode === ChipGridMode.EDITING) {
            setState({ chipGridMode: ChipGridMode.STRUCTURING });
        } else if (state.chipGridMode === ChipGridMode.STRUCTURING) {
            setState({ chipGridMode: ChipGridMode.EDITING });
        }
    };

    subscribe(["chipEditor"], (e) => {
        chipGridModeBtn.visible = e.value;
    });

    menuBar.addChild(chipGridModeBtn);

    /*
    GRID MODE INDICATOR
    */

    const gridModeIndicator = createGridModeIndicator();

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
            if (i >= getTileTypes(state.chipEditor).length) return null;

            const tileType = getTileTypes(state.chipEditor)[i];

            const tileOff = new tileType(0, 0);
            const tileOn = new tileType(0, 0);
            tileOn.signalActive = true;

            const defaultContainer = tileOff.getContainer(tileSize);
            const hoverContainer = tileOn.getContainer(tileSize);

            return {
                name: tileOff.label,
                defaultContainer,
                hoverContainer,
                selectable: true,
            };
        },
        (i) => {
            return (gridManager.getGrid().selectedTileType = i);
        }
    );
    tileSelector.visible = false;

    subscribe("chipEditor", () => {
        gridManager.getGrid().selectedTileType = -1;
        tileSelector.generateComponents();
    });

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
            if (i > state.chips.length) return null;

            if (i === state.chips.length) {
                const defaultContainer = new PIXI.Container();
                const defaultSprite = getSprite("add");
                defaultSprite.width = tileSize;
                defaultSprite.height = tileSize;
                defaultContainer.addChild(defaultSprite);
                const hoverContainer = new PIXI.Container();
                const hoverSprite = getSprite("add");
                hoverSprite.width = tileSize;
                hoverSprite.height = tileSize;
                hoverContainer.addChild(hoverSprite);

                return {
                    name: "New Chip",
                    defaultContainer,
                    hoverContainer,
                    selectable: false,
                    onClick: () => {
                        getCreateChipInput().then((chip) => {
                            if (!chip) return;
                            setStateProp("chips", (chips) => {
                                chips.push(chip);
                            });
                            setState({ editingChip: chip, chipEditor: true });
                        });
                    },
                };
            }

            const chip = state.chips[i];

            const genContainer = () => {
                const graphics = new PIXI.Graphics();
                graphics.beginFill(chip.color);
                graphics.drawRect(0, 0, 100, 100);
                graphics.endFill();

                graphics.width = tileSize;
                graphics.height = tileSize;

                const container = new PIXI.Container();
                container.addChild(graphics);
                return container;
            };

            const defaultContainer = genContainer();
            const hoverContainer = genContainer();

            return {
                name: chip.name,
                defaultContainer,
                hoverContainer,
                selectable: true,
            };
        },
        (i) => (gridManager.getGrid().selectedTileType = i)
    );
    chipSelector.visible = false;

    subscribe("chips", () => {
        chipSelector.generateComponents();
    });

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

    app.stage.addChild(gridModeIndicator);

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
        gridModeIndicator.x = width() / 2 - config.chipModeIndicator.width / 2;
        chipGridModeBtn.x =
            width() -
            (chipGridModeBtn.defaultContainer as PIXI.Container).width -
            5;
    });
};

export default initGUI;

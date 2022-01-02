import * as PIXI from "pixi.js";

import { dimensions } from "../../utils";

import MenuBar from "./menus/menu_bar";
import GridModeIndicator from "./menus/grid_mode_indicator";
import TileSelector from "./menus/tile_selector";
import ToolSelector from "./menus/tool_selector";
import ChipSelector from "./menus/chip_selector";
import { onResize } from "../../utils/event";

/**
 * Sets up application GUI
 *
 * @param app PIXI application
 */
const initGUI = (app: PIXI.Application) => {
    const menuBar = new MenuBar();
    const gridModeIndicator = new GridModeIndicator();
    const tileSelector = new TileSelector();
    const chipSelector = new ChipSelector();
    const toolSelector = new ToolSelector(tileSelector, chipSelector);

    app.stage.addChild(chipSelector);

    app.stage.addChild(tileSelector);

    app.stage.addChild(toolSelector);

    app.stage.addChild(menuBar);

    app.stage.addChild(gridModeIndicator);

    onResize(() => {
        app.renderer.resize(...dimensions());
    });
};

export default initGUI;

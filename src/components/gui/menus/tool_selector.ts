import * as PIXI from "pixi.js";

import config from "../../../config";
import state, { setState, subscribe } from "../../../state";
import { height } from "../../../utils";
import { EditMode } from "../../../utils/edit_mode";
import { getSprite } from "../../sprites/sprite_loader";
import ButtonGroup from "../component/button_group";
import { GUIComponent, GUIComponentState } from "../component/gui_component";
import GUIWindow from "../component/gui_window";
import SelectorMenu from "../component/selector_menu";
import LineWrapLayout from "../layout/line_wrap_layout";

/**
 * Side menu used to select the current tool
 */
export default class ToolSelector extends GUIWindow {
    /**
     * Constructs the tool selector
     *
     * @param tileSelector The tile selector
     * @param chipSelector The chip selector
     */
    constructor(tileSelector: SelectorMenu, chipSelector: SelectorMenu) {
        super(
            0,
            config.menubarSize,
            config.menubarSize,
            height() - config.menubarSize,
            config.colors.menu
        );

        this.sizeLambda = () => [this.width, height() - config.menubarSize];

        const layout = new LineWrapLayout(
            config.menubarSize,
            config.menubarSize,
            0
        );

        const cursorTool = this.createToolBtn("cursor");
        const panTool = this.createToolBtn("pan");
        const eraseTool = this.createToolBtn("eraser");
        const tilesTool = this.createToolBtn("tiles");
        const chipsTool = this.createToolBtn("chips");

        this.setLayout(layout);

        this.addChild(cursorTool);
        this.addChild(panTool);
        this.addChild(eraseTool);
        this.addChild(tilesTool);
        this.addChild(chipsTool);

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

        btnGroup.onSelectionChange = (i) => {
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
        };

        btnGroup.setSelected(state.editMode);

        subscribe("editMode", (value, prevValue) => {
            if (value === prevValue) return;
            btnGroup.setSelected(value);
        });
    }

    createToolBtn = (spriteKey: string): GUIComponent => {
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
}

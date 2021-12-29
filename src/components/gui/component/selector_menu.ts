import * as PIXI from "pixi.js";

import config from "../../../config";
import { CMouseEvent, onContextMenu } from "../../../utils";
import LineWrapLayout from "../layout/line_wrap_layout";
import ButtonGroup from "./button_group";
import GUIWindow from "./gui_window";
import { LabeledButton, LabelType } from "./labeled_button";

/** btn generator data */
export interface BtnGeneratorData {
    name: string;
    defaultContainer: PIXI.Container;
    hoverContainer: PIXI.Container;
    selectable: boolean;
    onClick?: (e: PIXI.interaction.InteractionEvent) => void;
    onContext?: (e: CMouseEvent) => void;
}

/**
 * Selector menu
 */
export default class SelectorMenu extends GUIWindow {
    btnGroup: ButtonGroup;
    tileSize: number;
    btnGenerator: (i: number, tileSize: number) => BtnGeneratorData | null;
    title: string;

    /**
     * Selector menu constructor
     *
     * @param x X position
     * @param y Y position
     * @param width Width
     * @param height Height
     * @param title Title of window
     * @param btnGenerator Lambda function that returns components at index i
     * @param onSelectionChange Selection change callback
     */
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        title: string,
        btnGenerator: (i: number, tileSize: number) => BtnGeneratorData | null,
        onSelectionChange: (i: number) => void
    ) {
        // Create window for this
        super(x, y, width, height, config.colors.menu, 4);
        this.scrollableY = true;
        this.scrollMarginY = config.tileSelector.margin * 2;
        this.title = title;

        this.tileSize =
            (this.width -
                config.tileSelector.margin *
                    (config.tileSelector.tilePerColumn + 1)) /
            config.tileSelector.tilePerColumn;

        this.btnGenerator = btnGenerator;

        const btnLayout = new LineWrapLayout(
            this.tileSize,
            1,
            config.tileSelector.margin,
            0,
            40
        );

        this.setLayout(btnLayout);

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
            this.tileSize - config.tileSelector.selectedWidth,
            this.tileSize - config.tileSelector.selectedWidth
        );
        selectedGraphics.endFill();

        this.btnGroup = new ButtonGroup(selectedGraphics);

        // Update state when selection is changed
        this.btnGroup.onSelectionChange = (i) => {
            onSelectionChange(i);
        };

        this.generateComponents();
    }

    /**
     * Generate header and button components
     */
    generateComponents() {
        const btnLayout = this.layout as LineWrapLayout;

        // this.removeChildren(0, this.children.length - 1);
        this.removeChildren();

        // Add header text to Selector window
        const headerText = new PIXI.Text(this.title, {
            fontFamily: "Arial",
            fontSize: 24,
            fill: 0x000000,
            fontWeight: "bold",
        });
        headerText.x = 75 - headerText.width / 2;
        headerText.y = 10;

        this.addChild(headerText);

        let btnData: BtnGeneratorData | null = null;
        let i = 0;

        this.btnGroup.buttons = [];
        this.btnGroup.selected = -1;

        while ((btnData = this.btnGenerator(i, this.tileSize)) !== null) {
            let name = btnData.name;

            if (name.length > 8) {
                name = name.slice(0, 8) + "...";
            }

            const tileBtn = new LabeledButton(
                0,
                0,
                this.tileSize,
                this.tileSize,
                LabelType.BELOW,
                name,
                config.tileSelector.textSize,
                0x000000,
                config.colors.tileBackground
            );

            if (btnData.onContext) onContextMenu(tileBtn, btnData.onContext);

            if (btnData.onClick) tileBtn.on("click", btnData.onClick);

            if (btnLayout.compHeight === 1)
                btnLayout.compHeight = tileBtn.height;

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

            this.addChild(tileBtn);

            if (btnData.selectable) this.btnGroup.addButton(tileBtn);

            i++;
        }
    }
}

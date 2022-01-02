import * as PIXI from "pixi.js";

import config from "../../../config";
import { subscribe, setState } from "../../../state";
import { generateRoundedRectContainer, width } from "../../../utils";
import ChipGridMode from "../../../utils/chip_grid_mode";
import { GUIComponent } from "../component/gui_component";
import GUIWindow from "../component/gui_window";

/**
 * Small drop down that is shown when a chip is opened
 */
export default class GridModeIndicator extends GUIWindow {
    /**
     * Constructs the grid mode indicator
     */
    constructor() {
        super(
            width() / 2 - config.chipModeIndicator.width / 2,
            config.menubarSize,
            config.chipModeIndicator.width,
            config.chipModeIndicator.height
        );
        this.visible = false;

        this.xLambda = () => width() / 2 - config.chipModeIndicator.width / 2;

        subscribe("chipEditor", (value) => {
            this.visible = value;
        });

        this.backgroundRect.alpha = 0;

        const defaultContainer = new PIXI.Container();

        const mainBackground = generateRoundedRectContainer(
            0,
            0,
            this.width,
            this.height,
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

        subscribe("chipGridMode", (value) => {
            let text = "";
            switch (value) {
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

        subscribe("currentChipGrid", (chipGrid) => {
            const chip = chipGrid?.chip;
            if (!chip) {
                console.error("No chip selected");
                return;
            }

            gridModeText.text = chip.name;

            if (chip.name.length > 10) {
                gridModeText.text = chip.name.slice(0, 10) + "...";
            }

            textContainer.x =
                (this.width - config.chipModeIndicator.closeBtnSize) / 2 -
                textContainer.width / 2;
        });

        textContainer.addChild(gridModeBoldText);

        gridModeText.x = gridModeBoldText.x + gridModeBoldText.width;

        textContainer.addChild(gridModeText);

        textContainer.y = (this.height - textContainer.height) / 2;

        textContainer.x =
            (config.chipModeIndicator.width -
                config.chipModeIndicator.closeBtnSize) /
                2 -
            textContainer.width / 2;

        defaultContainer.addChild(textContainer);

        const closeBtn = new GUIComponent(
            this.width - config.chipModeIndicator.closeBtnSize,
            0,
            config.chipModeIndicator.closeBtnSize,
            this.height,
            0
        );

        closeBtn.onClick = () => {
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

        this.addChild(defaultContainer);
    }
}

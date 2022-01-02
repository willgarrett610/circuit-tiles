import * as PIXI from "pixi.js";

import config from "../../../config";
import state, { multiSubscribe, setState, subscribe } from "../../../state";
import { generateRoundedRectContainer, width } from "../../../utils";
import ChipGridMode from "../../../utils/chip_grid_mode";
import { getSprite } from "../../sprites/sprite_loader";
import { GUIComponent } from "../component/gui_component";
import GUIWindow from "../component/gui_window";

/**
 * Menu bar that sits at the top of the screen
 */
export default class MenuBar extends GUIWindow {
    chipGridModeBtn: GUIComponent;

    /**
     * Constructs menu bar
     */
    constructor() {
        super(0, 0, width(), config.menubarSize, config.colors.menu);

        this.sizeLambda = () => [width(), config.menubarSize];

        const chipGridModeText = new PIXI.Text("Switch to structure", {
            fontFamily: "Arial",
            fontSize: config.chipGridMode.textSize,
            fill: 0xffffff,
        });

        this.chipGridModeBtn = new GUIComponent(
            width() - chipGridModeText.width - 35,
            5,
            chipGridModeText.width + 30,
            config.chipGridMode.height,
            config.colors.chipGridMode
        );

        this.chipGridModeBtn.xLambda = () =>
            width() -
            (this.chipGridModeBtn.defaultContainer as PIXI.Container).width -
            5;

        chipGridModeText.y =
            (this.chipGridModeBtn.height - chipGridModeText.height) / 2;
        chipGridModeText.x =
            this.chipGridModeBtn.width - chipGridModeText.width - 5;

        this.chipGridModeBtn.backgroundSprite.alpha = 0;

        const chipGridModeBtnContainer = generateRoundedRectContainer(
            0,
            0,
            this.chipGridModeBtn.width,
            config.chipGridMode.height,
            config.colors.chipGridMode,
            { topLeft: 5, topRight: 5, botRight: 5, botLeft: 5 }
        );

        this.chipGridModeBtn.setDefaultContainer(chipGridModeBtnContainer);

        multiSubscribe(["chipGridMode", "isStructured"], (event) => {
            if (event.name === "chipGridMode") {
                let text = "Switch to ";
                if (event.value === ChipGridMode.EDITING) {
                    text += "structure";
                } else {
                    text += "edit";
                }
                chipGridModeText.text = text;
            }

            this.chipGridModeBtn.defaultContainer?.removeChildren();
            this.chipGridModeBtn.setDefaultContainer(
                generateRoundedRectContainer(
                    0,
                    0,
                    chipGridModeText.width + 30,
                    config.chipGridMode.height,
                    state.currentChipGrid?.chip.isStructured()
                        ? config.colors.chipGridMode
                        : config.colors.chipGridModeHighlight,
                    { topLeft: 5, topRight: 5, botRight: 5, botLeft: 5 }
                )
            );

            this.chipGridModeBtn.defaultContainer?.addChild(chipGridModeText);
            this.chipGridModeBtn.defaultContainer?.addChild(swapSprite);
            this.chipGridModeBtn.x =
                width() -
                (this.chipGridModeBtn.defaultContainer as PIXI.Container)
                    .width -
                5;
        });

        const swapSprite = getSprite("swap");
        swapSprite.width = config.chipGridMode.height;
        swapSprite.height = config.chipGridMode.height;

        chipGridModeBtnContainer.addChild(chipGridModeText);

        chipGridModeBtnContainer.addChild(swapSprite);

        this.chipGridModeBtn.visible = false;

        this.chipGridModeBtn.onClick = () => {
            if (state.chipGridMode === ChipGridMode.EDITING) {
                setState({ chipGridMode: ChipGridMode.STRUCTURING });
            } else if (state.chipGridMode === ChipGridMode.STRUCTURING) {
                setState({ chipGridMode: ChipGridMode.EDITING });
            }
        };

        subscribe("chipEditor", (value) => {
            this.chipGridModeBtn.visible = value;
        });

        this.addChild(this.chipGridModeBtn);
    }
}

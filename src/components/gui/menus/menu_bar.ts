import * as PIXI from "pixi.js";

import config from "../../../config";
import state, { multiSubscribe, setState, subscribe } from "../../../state";
import { width } from "../../../utils";
import ChipGridMode from "../../../utils/chip_grid_mode";
import { generateRoundedRectContainer } from "../../../utils/graphics";
import { getSprite } from "../../sprites/sprite_loader";
import { GUIComponent, GUIComponentState } from "../component/gui_component";
import GUIWindow from "../component/gui_window";

/**
 * Menu bar that sits at the top of the screen
 */
export default class MenuBar extends GUIWindow {
    chipGridModeBtn: GUIComponent;
    playBtn: GUIComponent;
    pauseBtn: GUIComponent;

    /**
     * Constructs menu bar
     */
    constructor() {
        super(0, 0, width(), config.menubarSize, config.colors.menu);

        this.sizeLambda = () => [width(), config.menubarSize];

        this.chipGridModeBtn = this.createChipGridModeBtn();

        this.playBtn = this.createPlayPauseBtn(true);

        this.pauseBtn = this.createPlayPauseBtn(false);

        subscribe("running", (running) => {
            this.playBtn.visible = !running;
            this.pauseBtn.visible = running;
        });
    }

    /**
     * Create the play or pause button
     *
     * @param playBtn True if the button should be a play button
     * @returns {GUIComponent}
     */
    private createPlayPauseBtn(playBtn: boolean) {
        const btn = new GUIComponent(2, 2, config.menubarSize - 4, config.menubarSize - 4);
        btn.backgroundSprite.alpha = 0;

        const defaultCont = new PIXI.Container();
        const defaultSprite = getSprite(playBtn ? "play" : "pause");
        defaultSprite.width = btn.cWidth;
        defaultSprite.height = btn.cHeight;
        defaultCont.addChild(defaultSprite);
        btn.setDefaultContainer(defaultCont);

        const hoverGraph = new PIXI.Graphics();

        hoverGraph.beginFill(config.colors.highlightTool);
        hoverGraph.drawRect(0, 0, btn.cWidth, btn.cHeight);
        hoverGraph.endFill();

        hoverGraph.alpha = 0.2;
        hoverGraph.zIndex = 200;

        const hoverContainer = new PIXI.Container();
        const hoverSprite = getSprite(playBtn ? "play" : "pause");
        hoverSprite.width = btn.cWidth;
        hoverSprite.height = btn.cHeight;
        hoverContainer.addChild(hoverSprite);
        hoverContainer.addChild(hoverGraph);
        btn.setHoverContainer(hoverContainer);
        btn.setState(GUIComponentState.DEFAULT);

        btn.onClick = () => setState({ running: playBtn });
        if (playBtn) btn.visible = false;

        this.addChild(btn);

        return btn;
    }

    /**
     * Create the chip grid mode button
     *
     * @returns {GUIComponent}
     */
    private createChipGridModeBtn() {
        const chipGridModeText = new PIXI.Text("Switch to structure", {
            fontFamily: "Arial",
            fontSize: config.chipGridMode.textSize,
            fill: 0xffffff,
        });

        const btn = new GUIComponent(
            width() - chipGridModeText.width - 35,
            5,
            chipGridModeText.width + 30,
            config.chipGridMode.height,
            config.colors.chipGridMode
        );

        btn.xLambda = () => width() - btn.defaultContainer!.width - 5;

        chipGridModeText.y = (btn.height - chipGridModeText.height) / 2;
        chipGridModeText.x = btn.width - chipGridModeText.width - 5;

        btn.backgroundSprite.alpha = 0;

        const chipGridModeBtnContainer = generateRoundedRectContainer(
            0,
            0,
            btn.width,
            config.chipGridMode.height,
            config.colors.chipGridMode,
            { topLeft: 5, topRight: 5, botRight: 5, botLeft: 5 }
        );

        btn.setDefaultContainer(chipGridModeBtnContainer);

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

            btn.defaultContainer?.removeChildren();
            btn.setDefaultContainer(
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

            btn.defaultContainer?.addChild(chipGridModeText);
            btn.defaultContainer?.addChild(swapSprite);
            btn.x = width() - (btn.defaultContainer as PIXI.Container).width - 5;
        });

        const swapSprite = getSprite("swap");
        swapSprite.width = config.chipGridMode.height;
        swapSprite.height = config.chipGridMode.height;

        chipGridModeBtnContainer.addChild(chipGridModeText);

        chipGridModeBtnContainer.addChild(swapSprite);

        btn.visible = false;

        btn.onClick = () => {
            if (state.chipGridMode === ChipGridMode.EDITING) {
                setState({ chipGridMode: ChipGridMode.STRUCTURING });
            } else if (state.chipGridMode === ChipGridMode.STRUCTURING) {
                setState({ chipGridMode: ChipGridMode.EDITING });
            }
        };

        subscribe("chipEditor", (value) => {
            btn.visible = value;
        });

        this.addChild(btn);
        return btn;
    }
}

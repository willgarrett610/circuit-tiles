import * as PIXI from "pixi.js";

import config from "../../../config";
import GUIWindow from "./gui_window";

/**
 * Prompt user with input
 */
export default class FormPrompt extends GUIWindow {
    /**
     * Constructs a form prompts
     *
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param title Title
     * @param backgroundColor Background color
     */
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        title: string,
        backgroundColor: number
    ) {
        super(x, y, width, height, backgroundColor);

        const header = new PIXI.Container();

        const background = new PIXI.Graphics();
        background.beginFill(config.colors.menuHeader);
        background.drawRect(0, 0, width, config.formPromt.headerHeight);
        background.endFill();

        header.addChild(background);

        const headerText = new PIXI.Text(title, {
            fontFamily: "Arial",
            fontSize: config.formPromt.headerFontSize,
            fill: 0,
            fontWeight: "normal",
        });
        headerText.x = 5;
        headerText.y = 5;

        header.addChild(headerText);

        this.addChild(header);
    }
}

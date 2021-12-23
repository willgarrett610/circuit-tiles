import * as PIXI from "pixi.js";

import config from "../../../config";
// import { dimensions } from "../../../utils";
import GUIWindow from "./gui_window";
import { LabeledButton, LabelType } from "./labeled_button";
// import TextField from "./input/text_field";

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
     * @param onSubmit Submit callback
     */
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        title: string,
        backgroundColor: number,
        onSubmit: (values: [] | null) => void
    ) {
        super(x, y, width, height, backgroundColor);

        this.zIndex = 500;

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

        const exitBtn = new LabeledButton(
            width - config.formPromt.headerHeight,
            0,
            config.formPromt.headerHeight,
            config.formPromt.headerHeight,
            LabelType.INSIDE,
            "X",
            17,
            0,
            0xdd3333,
            3
        );

        exitBtn.onClick = () => {
            this.visible = false;
            onSubmit(null);
        };

        header.addChild(exitBtn);

        // const textField = new TextField(
        //     100,
        //     100,
        //     200,
        //     50,
        //     "Test123",
        //     12,
        //     0x000000,
        //     0xffffff,
        //     (text) => {
        //         console.log(text);
        //     }
        // );

        // this.addChild(textField);
        // textField.update();

        this.addChild(header);
    }

    /**
     * Open form prompt
     */
    open() {
        this.visible = true;
    }

    close(values: [] | null) {
        this.visible = false;
        // this.onSubmit()
    }
}

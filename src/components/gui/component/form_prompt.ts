import * as PIXI from "pixi.js";

import config from "../../../config";
import { ColumnLayout } from "../layout/column_layout";
// import { dimensions } from "../../../utils";
import GUIWindow from "./gui_window";
import { LabeledButton, LabelType } from "./labeled_button";
// import TextField from "./input/text_field";

/**
 * Prompt user with input
 */
export default class FormPrompt extends GUIWindow {
    onSubmit: (values: []) => void;

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
        onSubmit: (values: []) => void
    ) {
        super(x, y, width, height, backgroundColor);

        this.onSubmit = onSubmit;

        this.setLayout(
            new ColumnLayout(10, config.formPromt.headerHeight + 10)
        );

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
            this.close(null);
        };

        header.addChild(exitBtn);

        this.addChild(header);
    }

    /**
     * Open form prompt
     */
    open() {
        this.visible = true;
    }

    /**
     * Close form prompt and submit values
     *
     * @param values Values that will be passed to the callback
     */
    close(values: [] | null) {
        this.visible = false;
        if (values) {
            this.onSubmit(values);
        }
    }
}

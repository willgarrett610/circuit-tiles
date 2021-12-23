import * as PIXI from "pixi.js";
// import config from "../../../config";
import { GUIComponent } from "./gui_component";

export enum LabelType {
    BELOW,
    ABOVE,
    INSIDE,
}

/** labeled button */
export class LabeledButton extends GUIComponent {
    textObj: PIXI.Text;

    /**
     * construct labeled button
     *
     * @param x
     * @param y
     * @param width
     * @param height
     * @param labelType
     * @param text
     * @param fontSize
     * @param color
     * @param backgroundColor
     * @param margin
     */
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        labelType: LabelType,
        text: string,
        fontSize: number,
        color: number = 0x000000,
        backgroundColor: number = 0xffffff,
        margin: number = 7
    ) {
        super(x, y, width, height, backgroundColor);

        this.textObj = new PIXI.Text(text, {
            fontFamily: "Arial",
            fontSize: fontSize,
            fill: color,
            fontWeight: "bold",
        });
        this.textObj.x = width / 2 - this.textObj.width / 2;

        switch (labelType) {
            case LabelType.ABOVE:
                this.textObj.y = y - margin - fontSize;
                break;
            case LabelType.INSIDE:
                this.textObj.y = y + margin;
                break;
            case LabelType.BELOW:
                this.textObj.y = height + margin;
                break;
        }

        this.addChild(this.textObj);
    }
}

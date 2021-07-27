import config from "../../config";
import { GUIComponent } from "./gui_component";

export enum LabelType {
    BELOW,
    ABOVE,
    INSIDE,
}

export class LabeledButton extends GUIComponent {
    textObj: PIXI.Text;

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
        margin: number = 5
    ) {
        super(x, y, width, height, backgroundColor);

        this.textObj = new PIXI.Text(text, {
            fontFamily: "Arial",
            fontSize: config.tileSelector.textSize,
            fill: color,
            fontWeight: "bold",
        });
        this.textObj.x = x + width / 2 - this.textObj.width / 2;

        switch (labelType) {
            case LabelType.ABOVE:
                this.textObj.y = y - margin - fontSize;
                break;
            case LabelType.INSIDE:
                this.textObj.y = y + margin;
                break;
            case LabelType.BELOW:
                this.textObj.y = y + height + margin;
                break;
        }
    }
}

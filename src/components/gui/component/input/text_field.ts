import * as PIXI from "pixi.js";
import InputComponent from "./input_component";

/**
 * Text Field input
 */
export default class TextField extends InputComponent<string> {
    textComp: PIXI.Text;
    fontSize: number;
    fontColor: number;

    /**
     * Constructs a text field
     *
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param value Text
     * @param fontSize Font size
     * @param fontColor Font color
     * @param backgroundColor Background color
     * @param onChange Change callback
     */
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        value: string,
        fontSize: number,
        fontColor: number,
        backgroundColor: number,
        onChange: (text: string) => void
    ) {
        super(x, y, width, height, backgroundColor, value, onChange);
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.onChange = onChange;
        this.textComp = new PIXI.Text(this.value, {
            fontFamily: "Arial",
            fontSize: this.fontSize,
            fill: this.fontColor,
            fontWeight: "normal",
        });
        this.addChild(this.textComp);
        this.textComp.x = 5;
        this.textComp.y = this.cHeight / 2 - this.textComp.height / 2;
    }

    /**
     * Update text field graphics
     */
    update() {
        this.textComp.text = this.value;
    }
}

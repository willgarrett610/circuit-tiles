import GUIComponent from "./gui_component";

export default class Button extends GUIComponent {

    drawNormal?(graphics: PIXI.Graphics): void;
    drawHover?(graphics: PIXI.Graphics): void;
    drawActive?(graphics: PIXI.Graphics): void;

}

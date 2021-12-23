import { GUIComponent } from "../component/gui_component";
import GUIWindow from "../component/gui_window";
import Layout from "./layout";

/**
 * Layout components in a row or column
 */
export class ColumnLayout implements Layout {
    nextY: number = 0;
    xOffset: number;
    yOffset: number;

    /**
     * Constructs a column layout
     *
     * @param xOffset X offset
     * @param yOffset Y offset
     */
    constructor(xOffset: number = 0, yOffset: number = 0) {
        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }

    /**
     * Get the position and size of an element
     *
     * @param i Index of the element in the window
     * @param component The component
     * @param window The window
     * @returns x, y, width, height of the element
     */
    getElementPosSize(
        i: number,
        component: GUIComponent,
        window: GUIWindow
    ): [x: number, y: number, w: number, h: number] {
        const w = component.width;
        const h = component.height;

        const x = this.xOffset;
        const y = this.nextY + this.yOffset;

        this.nextY += component.height;

        console.log({ x, y });

        if (i == window.components.length - 1) {
            this.nextY = 0;
        }

        return [x, y, w, h];
    }
}

import { GUIComponent } from "../component/gui_component";
import GUIWindow from "../component/gui_window";
import Layout from "./layout";

/** line wrap layout */
export default class LineWrapLayout implements Layout {
    compWidth: number;
    compHeight: number;
    margin: number;
    xOff: number;
    yOff: number;

    /**
     * construct line wrap layout
     *
     * @param compWidth
     * @param compHeight
     * @param margin
     * @param xOff
     * @param yOff
     */
    constructor(
        compWidth: number,
        compHeight: number,
        margin: number,
        xOff: number = 0,
        yOff: number = 0
    ) {
        this.compWidth = compWidth;
        this.compHeight = compHeight;
        this.margin = margin;
        this.xOff = xOff;
        this.yOff = yOff;
    }

    /**
     * get element position size
     *
     * @param i
     * @param component
     * @param window
     * @returns
     */
    getElementPosSize(
        i: number,
        component: GUIComponent,
        window: GUIWindow
    ): [x: number, y: number, w: number, h: number] {
        // Number of components per row
        const n = Math.floor(
            (window.width - this.margin) / (this.margin + this.compWidth)
        );
        const y: number =
            this.margin +
            (this.compHeight + this.margin) * Math.floor(i / n) +
            this.yOff;
        const x: number =
            this.margin + (this.compWidth + this.margin) * (i % n) + this.xOff;
        return [x, y, this.compWidth, this.compHeight];
    }
}

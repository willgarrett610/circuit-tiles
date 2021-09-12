import Layout from "./layout";

export default class LineWrapLayout implements Layout {
    compWidth: number;
    compHeight: number;
    margin: number;
    xOff: number;
    yOff: number;

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

    getElementPosSize(
        i: number,
        width: number,
        height: number
    ): [x: number, y: number, w: number, h: number] {
        // Number of components per row
        let n = Math.floor(
            (width - this.margin) / (this.margin + this.compWidth)
        );
        let y: number =
            this.margin + (this.compHeight + this.margin) * (i % n) + this.yOff;
        let x: number =
            this.margin +
            (this.compWidth + this.margin) * Math.floor(i / n) +
            this.xOff;
        return [x, y, this.compWidth, this.compHeight];
    }
}

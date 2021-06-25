import * as PIXI from "pixi.js";
export class Line extends PIXI.Graphics {
    points: number[];
    lineWidth: number;
    lineColor: number;

    constructor(
        points: number[],
        lineSize: number = 5,
        lineColor: number = 0x000000
    ) {
        super();

        this.lineWidth = lineSize;
        this.lineColor = lineColor;

        this.points = points;

        this.lineStyle(this.lineWidth, this.lineColor);

        this.moveTo(points[0], points[1]);
        this.lineTo(points[2], points[3]);
    }

    updatePoints(p: number[]) {
        var points = (this.points = p.map(
            (val, index) => val || this.points[index]
        ));

        var s = this.lineWidth,
            c = this.lineColor;

        this.clear();
        this.lineStyle(s, c);
        this.moveTo(points[0], points[1]);
        this.lineTo(points[2], points[3]);
    }
}

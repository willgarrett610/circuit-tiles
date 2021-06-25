import * as PIXI from "pixi.js";
import { dimensions } from "./utils";

class Line extends PIXI.Graphics {
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

export function createGrid(
    app: PIXI.Application,
    size: number,
    offsetX: number,
    offsetY: number
): PIXI.Container {
    let container = new PIXI.Container();

    const generate = (width: number, height: number): PIXI.Graphics[] => {
        const tileXCount = Math.ceil(width / size);
        const tileYCount = Math.ceil(height / size);

        let output = [];

        for (let x = 0; x <= tileXCount; x++) {
            var line = new Line([x * size, 0, x * size, height], 5, 0xeeeeee);
            output.push(line);
        }

        for (let y = 0; y <= tileYCount; y++) {
            var line = new Line([0, y * size, width, y * size], 5, 0xeeeeee);
            output.push(line);
        }

        return output;
    };

    generate(...dimensions()).forEach((child) => container.addChild(child));

    window.addEventListener("resize", () => {
        container.removeChildren();
        generate(...dimensions()).forEach((child) => container.addChild(child));
    });

    return container;
}

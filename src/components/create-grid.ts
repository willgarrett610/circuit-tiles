import * as PIXI from "pixi.js";
import { dimensions, onResize } from "../utils";
import { Line } from "../utils/line";

export function createGrid(
    size: number
): { container: PIXI.Container; update: () => void } {
    let container = new PIXI.Container();

    const generate = (width: number, height: number): PIXI.Graphics[] => {
        const tileXCount = Math.ceil(width / size);
        const tileYCount = Math.ceil(height / size);

        let output = [];
        for (
            let x = -Math.floor(container.x / size);
            x <= tileXCount - Math.floor(container.x / size);
            x++
        ) {
            var line = new Line(
                [x * size, -container.y, x * size, height - container.y],
                2,
                0x222222
            );
            output.push(line);
        }

        for (
            let y = -Math.floor(container.y / size);
            y <= tileYCount - Math.floor(container.y / size);
            y++
        ) {
            var line = new Line(
                [-container.x, y * size, width - container.x, y * size],
                2,
                0x222222
            );
            output.push(line);
        }

        return output;
    };

    generate(...dimensions()).forEach((child) => container.addChild(child));

    const update = () => {
        container.removeChildren();
        generate(...dimensions()).forEach((child) => container.addChild(child));
    };

    onResize(update);

    return { container, update };
}

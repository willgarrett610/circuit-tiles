import * as PIXI from "pixi.js";
import {
    dimensions,
    mouseDown,
    onMouseMove,
    onResize,
    onScroll,
} from "../utils";
import { Line } from "../utils/line";
import { clamp } from "../utils/math";

export function createGrid(
    size: number
): {
    container: PIXI.Container;
    update: () => void;
    screenToGrid: (x: number, y: number) => { x: number; y: number };
    gridToScreen: (x: number, y: number) => { x: number; y: number };
} {
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

    /**
     * From screen space to grid space
     * @param x X in screen space
     * @param y Y in screen space
     * @returns Coordinates in grid space
     */
    const screenToGrid = (x: number, y: number) => ({
        x: Math.floor((-container.x + x) / size),
        y: Math.floor((-container.y + y) / size),
    });

    /**
     * From grid space to screen space (Top Left corner)
     * @param x X in grid space
     * @param y Y in grid space
     * @returns Coordinates in screen space
     */
    const gridToScreen = (x: number, y: number) => ({
        x: Math.floor(x) * size + container.x,
        y: Math.floor(y) * size + container.y,
    });

    onResize(update);

    onScroll((e) => {
        size -= e.deltaY * 0.1;
        size = clamp(size, 20, 350);
        console.log({ size });
        update();
    });

    onMouseMove((e) => {
        if (!mouseDown.left) return;

        container.x += e.movementX;
        container.y += e.movementY;
        update();
    });

    return { container, update, screenToGrid, gridToScreen };
}

import * as PIXI from "pixi.js";
import { clamp } from "./math";

/**
 * Generate a pixi container with a rectangle that has the specified corner radii
 *
 * @param x X position
 * @param y Y position
 * @param w Width
 * @param h Height
 * @param color Color
 * @param radius Radius for each corner
 * @param radius.topLeft
 * @param radius.topRight
 * @param radius.botRight
 * @param radius.botLeft
 * @param graphicUpdater
 * @returns Pixi container
 */
export function generateRoundedRectContainer(
    x: number,
    y: number,
    w: number,
    h: number,
    color: number,
    { topLeft = 0, topRight = 0, botRight = 0, botLeft = 0 },
    graphicUpdater?: (graphics: PIXI.Graphics, colorChanger: (color: number) => void) => void
): PIXI.Container {
    const container = new PIXI.Container();
    container.x = x;
    container.y = y;

    const max = Math.min(w, h);

    topLeft = clamp(topLeft, 0, max / 2);
    topRight = clamp(topRight, 0, max / 2);
    botRight = clamp(botRight, 0, max / 2);
    botLeft = clamp(botLeft, 0, max / 2);

    const graphics = new PIXI.Graphics();

    const colorChanger = (color: number) => {
        graphics.clear();
        graphics.beginFill(color);

        // Top left
        graphics.drawCircle(topLeft, topLeft, topLeft);
        graphics.drawRect(0, topLeft, w / 2, h / 2 - topLeft);
        graphics.drawRect(topLeft, 0, w / 2 - topLeft, h / 2);

        // Top right
        graphics.drawCircle(w - topRight, topRight, topRight);
        graphics.drawRect(w / 2, topRight, w / 2, h / 2 - topRight);
        graphics.drawRect(w / 2, 0, w / 2 - topRight, h / 2);

        // Bottom right
        graphics.drawCircle(w - botRight, h - botRight, botRight);
        graphics.drawRect(w / 2, h / 2, w / 2, h / 2 - botRight);
        graphics.drawRect(w / 2, h / 2, w / 2 - botRight, h / 2);

        // Bottom left
        graphics.drawCircle(botLeft, h - botLeft, botLeft);
        graphics.drawRect(0, h / 2, w / 2, h / 2 - botLeft);
        graphics.drawRect(botLeft, h / 2, w / 2 - botLeft, h / 2);

        graphics.endFill();
    };

    graphicUpdater?.(graphics, colorChanger);
    colorChanger(color);

    container.addChild(graphics);

    container.width = w;
    container.height = h;

    return container;
}

/**
 * Converts hsl value to hex
 *
 * @param h Hue value (0-360)
 * @param s Saturation value (0-100)
 * @param l Lightness value (0-100)
 * @returns Hex value
 */
export function hslToHex(h: number, s: number, l: number): number {
    h = h % 360;
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2;
    let r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return (r << 16) + (g << 8) + b;
}

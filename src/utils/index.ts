/* eslint-disable @typescript-eslint/no-explicit-any */

import * as PIXI from "pixi.js";

import { Chip } from "../components/chip/chip";
import { setState } from "../state";
import { clamp } from "./math";

/**
 * Generate a pixi container with a recatangle that has the specified corner radii
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
 * @returns Pixi container
 */
export function generateRoundedRectContainer(
    x: number,
    y: number,
    w: number,
    h: number,
    color: number,
    { topLeft = 0, topRight = 0, botRight = 0, botLeft = 0 }
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

    container.addChild(graphics);

    container.width = w;
    container.height = h;

    return container;
}

/**
 * Open chip creation menu and return a promise that resolves when the menu is closed
 *
 * @returns Promise that resolves when the menu is closed
 */
export function getCreateChipInput(): Promise<Chip | null> {
    return new Promise<Chip | null>((resolve) => {
        setState({
            chipCreation: {
                open: true,
                nameValue: "",
                colorValue: 0x993333,
            },
        });
        const nameInput = document.getElementById(
            "chip_name_input"
        ) as HTMLInputElement;
        const hueInput = document.getElementById(
            "chip_hue_input"
        ) as HTMLInputElement;

        const cancelButton = document.getElementById(
            "chip_cancel_button"
        ) as HTMLButtonElement;
        const createButton = document.getElementById(
            "chip_create_button"
        ) as HTMLButtonElement;

        cancelButton.addEventListener(
            "click",
            () => {
                setState({
                    chipCreation: {
                        open: false,
                        nameValue: "",
                        colorValue: 0x993333,
                    },
                });
                resolve(null);
            },
            { once: true }
        );

        createButton.addEventListener(
            "click",
            () => {
                const name = nameInput.value;
                // const color = PIXI.utils.string2hex(
                //     "hsl(" + parseInt(hueInput.value) + ", 50%, 40%)"
                // );
                const color = hslToHex(parseInt(hueInput.value), 50, 40);

                setState({
                    chipCreation: {
                        open: false,
                        nameValue: name,
                        colorValue: color,
                    },
                });
                resolve(new Chip(name, color));
            },
            { once: true }
        );
    });
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

/**
 * Gets the dimensions of the viewport
 *
 * @returns returns the dimensions of the viewport
 */
export function dimensions(): [width: number, height: number] {
    return [window.innerWidth, window.innerHeight];
}

/**
 * Gets the width of the viewport
 *
 * @returns returns the width of the viewport
 */
export function width(): number {
    return window.innerWidth;
}

/**
 * Gets the heigh of the viewport
 *
 * @returns returns the height of the viewport
 */
export function height(): number {
    return window.innerHeight;
}

/**
 * Handles the resize event
 *
 * @param listener the listener to be called when the window is resized
 */
export function onResize(listener: (this: Window, ev: UIEvent) => any) {
    window.addEventListener("resize", listener);
}

/**
 * Get entries of array
 *
 * @param input any array
 * @returns entries of arrays with value and index as tuple
 */
export function entries<T>(input: T[]): [T, number][] {
    return Object.entries(input).map(([key, value]) => [value, +key]);
}

/**
 * Sleeps for a given amount of time
 *
 * @param ms time to sleep in milliseconds
 * @returns returns a promise that resolves after the given amount of time
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * CWheelEvent is a custom event that is used to handle the wheel event
 */
export class CWheelEvent extends WheelEvent {
    propagationStopped = false;
    stopPropagationOld?(): void;

    /**
     * CWheelEvent constructor
     *
     * @param e the original wheel event
     * @returns new wheel event
     */
    static fromWheelEvent(e: WheelEvent) {
        const cE = e as CWheelEvent;
        cE.stopPropagationOld = cE.stopPropagation;
        cE.stopPropagation = () => {
            cE.stopPropagationOld?.();
            cE.propagationStopped = true;
        };
        cE.propagationStopped = false;
        return cE;
    }
}

/**
 * CMouseEvent is a custom event that is used to handle the context menu event
 */
export class CMouseEvent extends MouseEvent {
    propagationStopped = false;
    stopPropagationOld?(): void;

    /**
     * CWheelEvent constructor
     *
     * @param e the original wheel event
     * @returns new wheel event
     */
    static fromMouseEvent(e: MouseEvent) {
        const cE = e as CWheelEvent;
        cE.stopPropagationOld = cE.stopPropagation;
        cE.stopPropagation = () => {
            cE.stopPropagationOld?.();
            cE.propagationStopped = true;
        };
        cE.propagationStopped = false;
        return cE;
    }
}

export interface DisplayObjectScrollEvent {
    object: PIXI.DisplayObject;
    listener: (ev: CWheelEvent) => any;
}

export interface DisplayObjectMouseEvent {
    object: PIXI.DisplayObject;
    listener: (ev: CMouseEvent) => any;
}

export const scrollListeners: Array<DisplayObjectScrollEvent> = [];
export const contextListeners: Array<DisplayObjectMouseEvent> = [];
/**
 * Adds a listener to the scroll event
 *
 * @param object Pixi DisplayObject
 * @param listener CWheelEvent listener
 */
export function onScroll(
    object: PIXI.DisplayObject,
    listener: (ev: CWheelEvent) => any
) {
    scrollListeners.push({ object, listener });
}

/**
 * Adds a listener to the context menu event
 *
 * @param object Pixi DisplayObject
 * @param listener CMouseEvent listener
 */
export function onContextMenu(
    object: PIXI.DisplayObject,
    listener: (ev: CMouseEvent) => any
) {
    contextListeners.push({ object, listener });
}

/**
 * Handle and propagate scroll and contextmenu events
 *
 * @param e Event
 * @param app Pixi Application
 */
export function handleEvent(e: WheelEvent | MouseEvent, app: PIXI.Application) {
    let cE: CWheelEvent | CMouseEvent;
    let listeners: DisplayObjectScrollEvent[] | DisplayObjectMouseEvent[];

    if (e instanceof WheelEvent) {
        cE = CWheelEvent.fromWheelEvent(e);
        listeners = scrollListeners;
    } else {
        cE = CMouseEvent.fromMouseEvent(e);
        listeners = contextListeners;
    }

    const hitObject = app.renderer.plugins.interaction.hitTest(
        new PIXI.Point(cE.pageX, cE.pageY),
        app.stage
    );

    if (hitObject) {
        let testObject = hitObject;
        while (testObject) {
            for (let i = 0; i < listeners.length; i++) {
                const eventObj = listeners[i];
                if (eventObj.object === testObject) {
                    eventObj.listener(cE as any);
                    break;
                }
            }

            if (cE.propagationStopped) break;
            testObject = testObject.parent;
        }
    }
}

/**
 * Keydown Handler
 *
 * @param listener
 */
export function onKeyDown(listener: (this: Window, ev: KeyboardEvent) => any) {
    window.addEventListener("keydown", listener);
}

/**
 * Keypress Handler
 *
 * @param listener
 */
export function onKeyPress(listener: (this: Window, ev: KeyboardEvent) => any) {
    window.addEventListener("keypress", listener);
}

/**
 * Converts a location object to tuple
 *
 * @param location location object
 * @param location.x x location
 * @param location.y y location
 * @returns tuple of x and y location
 */
export function locationToTuple(location: {
    x: number;
    y: number;
}): [x: number, y: number] {
    return [location.x, location.y];
}

/**
 * Converts a tuple to a location object
 *
 * @param location tuple of x and y location
 * @returns location object
 */
export function locationToPair(location: [x: number, y: number]): {
    x: number;
    y: number;
} {
    return { x: location[0], y: location[1] };
}

export const mouseDown = { left: false, middle: false, right: false };
window.addEventListener(
    "mouseup",
    (e) => ((mouseDown as any)[["left", "middle", "right"][e.button]] = false)
);
window.addEventListener(
    "mousedown",
    (e) => ((mouseDown as any)[["left", "middle", "right"][e.button]] = true)
);

export const pressedKeys: { [key: string]: boolean } = {};
window.addEventListener("keyup", (e) => (pressedKeys[e.code] = false));
window.addEventListener("keydown", (e) => (pressedKeys[e.code] = true));

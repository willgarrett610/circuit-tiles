/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface DisplayObjectScrollEvent {
    object: PIXI.DisplayObject;
    listener: (ev: CWheelEvent) => any;
}

export const scrollListeners: Array<DisplayObjectScrollEvent> = [];
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

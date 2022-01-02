/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Handles the resize event
 *
 * @param listener the listener to be called when the window is resized
 */
export function onResize(listener: (this: Window, ev: UIEvent) => any) {
    window.addEventListener("resize", listener);
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

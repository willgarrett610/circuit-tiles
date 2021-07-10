export function dimensions(): [width: number, height: number] {
    return [window.innerWidth, window.innerHeight];
}

export function width(): number {
    return window.innerWidth;
}

export function height(): number {
    return window.innerHeight;
}

export function onResize(listener: (this: Window, ev: UIEvent) => any) {
    window.addEventListener("resize", listener);
}

export class CWheelEvent extends WheelEvent {

    propagationStopped = false;
    stopPropagationOld?(): void;

    static fromWheelEvent(e: WheelEvent) {
        const cE = e as CWheelEvent;
        cE.stopPropagationOld = cE.stopPropagation;
        cE.stopPropagation = () => {
            cE.stopPropagationOld?.();
            cE.propagationStopped = true;
        }
        cE.propagationStopped = false;
        return cE;
    }

}

export interface DisplayObjectScrollEvent {
    object: PIXI.DisplayObject;
    listener: (ev: CWheelEvent) => any;
}

export const scrollListeners: Array<DisplayObjectScrollEvent> = [];
export function onScroll(
    object: PIXI.DisplayObject,
    listener: (ev: CWheelEvent) => any
) {
    scrollListeners.push({ object, listener });
}

export function onKeyDown(listener: (this: Window, ev: KeyboardEvent) => any) {
    window.addEventListener("keydown", listener);
}

export function onKeyPress(listener: (this: Window, ev: KeyboardEvent) => any) {
    window.addEventListener("keypress", listener);
}

export function locationToTuple(location: {
    x: number;
    y: number;
}): [x: number, y: number] {
    return [location.x, location.y];
}

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

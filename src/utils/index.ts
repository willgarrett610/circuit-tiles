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

export interface DisplayObjectScrollEvent {
    object: PIXI.DisplayObject;
    listener: (ev: WheelEvent) => any;
}

export const scrollListeners: Array<DisplayObjectScrollEvent> = [];
export function onScroll(object: PIXI.DisplayObject, listener: (ev: WheelEvent) => any) {
    scrollListeners.push({object, listener});
}

export const mouseDown = {left: false, middle: false, right: false};
window.addEventListener("mouseup", (e) => (mouseDown as any)[["left","middle","right"][e.button]] = false);
window.addEventListener("mousedown", (e) => (mouseDown as any)[["left","middle","right"][e.button]] = true);


export const pressedKeys: {[key: string]: boolean} = {};
window.addEventListener("keyup", (e) => pressedKeys[e.key] = false);
window.addEventListener("keydown", (e) => pressedKeys[e.key] = true);

// window.addEventListener("keydown", e => console.log(e.key));
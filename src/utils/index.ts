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

export function onMouseMove(listener: (this: Window, ev: MouseEvent) => any) {
    window.addEventListener("mousemove", listener);
}

export function onScroll(listener: (this: Window, ev: WheelEvent) => any) {
    window.addEventListener("wheel", listener);
}

export const mouseDown = {left: false, middle: false, right: false};
window.addEventListener("mouseup", (e) => (mouseDown as any)[["left","middle","right"][e.button]] = false);
window.addEventListener("mousedown", (e) => (mouseDown as any)[["left","middle","right"][e.button]] = true);


export const pressedKeys: {[key: string]: boolean} = {};
window.addEventListener("keyup", (e) => pressedKeys[e.key] = false);
window.addEventListener("keydown", (e) => pressedKeys[e.key] = true);


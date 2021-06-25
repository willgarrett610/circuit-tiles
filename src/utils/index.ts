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
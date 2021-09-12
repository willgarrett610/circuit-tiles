export default interface Layout {
    getElementPosSize(
        i: number,
        width: number,
        height: number
    ): [x: number, y: number, w: number, h: number];
}

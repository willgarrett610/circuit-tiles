import { Canvas, CanvasKit, Surface } from "canvaskit-wasm";

export function createGrid(
    CK: CanvasKit,
    surface: Surface,
    canvas: Canvas,
    size: number,
    offsetX: number,
    offsetY: number
): void {
    const tileXCount = Math.ceil(surface.width() / size);
    const tileYCount = Math.ceil(surface.height() / size);

    for (let x = 0; x <= tileXCount; x++) {
        const paint = new CK.Paint();
        paint.setColor(CK.Color4f(0, 0, 0, 1.0));
        paint.setStyle(CK.PaintStyle.Stroke);
        paint.setAntiAlias(true);

        canvas.drawLine(
            x * size + offsetX,
            0,
            x * size + offsetX,
            surface.height(),
            paint
        );
    }

    for (let y = 0; y <= tileYCount; y++) {
        const paint = new CK.Paint();
        paint.setColor(CK.Color4f(0, 0, 0, 1.0));
        paint.setStyle(CK.PaintStyle.Stroke);
        paint.setAntiAlias(true);

        canvas.drawLine(
            0,
            y * size + offsetY,
            surface.width(),
            y * size + offsetY,
            paint
        );
    }
}

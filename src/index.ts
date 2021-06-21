import CanvasKitInit from "canvaskit-wasm";

import { Canvas, CanvasKit, Surface } from "canvaskit-wasm";

(CanvasKitInit as any)({
    locateFile: (file: string) => file,
}).then((CK: CanvasKit) => {
    const surface: Surface | null = CK.MakeCanvasSurface("main");
    if (!surface) return;
    const surf: any = surface;
    const paint = new CK.Paint();
    paint.setColor(CK.Color4f(0.9, 0, 0, 1.0));
    paint.setStyle(CK.PaintStyle.Stroke);
    paint.setAntiAlias(true);
    // const rr = CanvasKit.RRectXY(CanvasKit.LTRBRect(10, 60, 210, 260), 25, 15);
    const w = 100; // size of rect
    const h = 60;
    let x = 10; // initial position of top left corner.
    let y = 60;
    let dirX = 1; // box is always moving at a constant speed in one of the four diagonal directions
    let dirY = 1;

    function drawFrame(canvas) {
        // boundary check
        if (x < 0 || x + w > 300) {
            dirX *= -1; // reverse x direction when hitting side walls
        }
        if (y < 0 || y + h > 300) {
            dirY *= -1; // reverse y direction when hitting top and bottom walls
        }
        // move
        x += dirX;
        y += dirY;

        canvas.clear(CK.WHITE);
        const rr = CK.RRectXY(CK.LTRBRect(x, y, x + w, y + h), 25, 15);
        canvas.drawRRect(rr, paint);
        surf.requestAnimationFrame(drawFrame);
    }

    surf.requestAnimationFrame(drawFrame);
});

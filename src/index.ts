import CanvasKitInit from "canvaskit-wasm";

import { Canvas, CanvasKit, Surface } from "canvaskit-wasm";

console.log(CanvasKitInit);

(CanvasKitInit as any)({
    locateFile: (file: string) => file,
}).then((CK: CanvasKit) => {
    const surface: Surface | null = CK.MakeCanvasSurface("main");
    if (!surface) return;

    const canvas: Canvas = surface.getCanvas();

    const paint = new CK.Paint();
    paint.setColor(CK.Color4f(0.9, 0, 0, 1));
    paint.setStyle(CK.PaintStyle.Fill);
    paint.setAntiAlias(true);
    const rect = CK.XYWHRect(0, 0, 600, 600);

    canvas.clear(CK.WHITE);
    canvas.drawRect(rect, paint);
});

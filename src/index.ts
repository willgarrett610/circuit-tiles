import { Canvas, CanvasKit, CanvasKitInit, Surface } from "canvaskit-wasm";

CanvasKitInit({
    locateFile: (file: string) => __dirname + "/bin/" + file,
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

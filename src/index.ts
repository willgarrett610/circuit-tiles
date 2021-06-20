// const CanvasKitInit = require('/node_modules/canvaskit-wasm/bin/canvaskit.js');
import {Canvas, CanvasKit, CanvasKitInit, Surface} from 'canvaskit-wasm';
CanvasKitInit({
    locateFile: (file: any) => __dirname + '/bin/'+file,
}).then((CK: CanvasKit) => {
    let surface:Surface|null = CK.MakeCanvasSurface('main');
    if (!surface) return;
    
    let canvas:Canvas = surface.getCanvas();

    const paint = new CK.Paint();
    paint.setColor(CK.Color4f(0.9,0,0,1));
    paint.setStyle(CK.PaintStyle.Fill);
    paint.setAntiAlias(true);
    const rect = CK.XYWHRect(0,0,600,600);

    canvas.clear(CK.WHITE);
    canvas.drawRect(rect, paint);
}); 
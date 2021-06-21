console.log("test"[1][1][1]);
// const CanvasKitInit = require("/node_modules/canvaskit-wasm/bin/canvaskit.js");
// import {} from "./node_modules/canvaskit-wasm/types"
import { CanvasKitInit, } from "canvaskit-wasm";
CanvasKitInit({
    locateFile: function (file) { return __dirname + "/bin/" + file; },
}).then(function (CK) {
    var surface = CK.MakeCanvasSurface("main");
    if (!surface)
        return;
    var canvas = surface.getCanvas();
    var paint = new CK.Paint();
    paint.setColor(CK.Color4f(0.9, 0, 0, 1));
    paint.setStyle(CK.PaintStyle.Fill);
    paint.setAntiAlias(true);
    var rect = CK.XYWHRect(0, 0, 600, 600);
    canvas.clear(CK.WHITE);
    canvas.drawRect(rect, paint);
});

webpackHotUpdate("main", {
    /***/ "./src/components/create-grid.ts":
        /*!***************************************!*\
  !*** ./src/components/create-grid.ts ***!
  \***************************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
            "use strict";
            eval(
                '\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nexports.createGrid = void 0;\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar utils_1 = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");\r\nvar line_1 = __webpack_require__(/*! ../utils/line */ "./src/utils/line.ts");\r\nfunction createGrid(size) {\r\n    var container = new PIXI.Container();\r\n    var generate = function (width, height) {\r\n        // console.log(container.x);\r\n        var tileXCount = Math.ceil(width / size);\r\n        var tileYCount = Math.ceil(height / size);\r\n        var output = [];\r\n        for (var x = container.x % width; x <= tileXCount; x++) {\r\n            var line = new line_1.Line([x * size, -container.y, x * size, height - container.y], 5, 0xeeeeee);\r\n            output.push(line);\r\n        }\r\n        for (var y = 0; y <= tileYCount; y++) {\r\n            var line = new line_1.Line([-container.x, y * size, width - container.x, y * size], 5, 0xeeeeee);\r\n            output.push(line);\r\n        }\r\n        return output;\r\n    };\r\n    generate.apply(void 0, utils_1.dimensions()).forEach(function (child) { return container.addChild(child); });\r\n    var update = function () {\r\n        container.removeChildren();\r\n        generate.apply(void 0, utils_1.dimensions()).forEach(function (child) { return container.addChild(child); });\r\n    };\r\n    utils_1.onResize(update);\r\n    return { container: container, update: update };\r\n}\r\nexports.createGrid = createGrid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9jcmVhdGUtZ3JpZC50cy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi9zcmMvY29tcG9uZW50cy9jcmVhdGUtZ3JpZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XHJcbmltcG9ydCB7IGRpbWVuc2lvbnMsIG9uUmVzaXplIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IExpbmUgfSBmcm9tIFwiLi4vdXRpbHMvbGluZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdyaWQoXHJcbiAgICBzaXplOiBudW1iZXJcclxuKTogeyBjb250YWluZXI6IFBJWEkuQ29udGFpbmVyOyB1cGRhdGU6ICgpID0+IHZvaWQgfSB7XHJcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcblxyXG4gICAgY29uc3QgZ2VuZXJhdGUgPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBQSVhJLkdyYXBoaWNzW10gPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbnRhaW5lci54KTtcclxuICAgICAgICBjb25zdCB0aWxlWENvdW50ID0gTWF0aC5jZWlsKHdpZHRoIC8gc2l6ZSk7XHJcbiAgICAgICAgY29uc3QgdGlsZVlDb3VudCA9IE1hdGguY2VpbChoZWlnaHQgLyBzaXplKTtcclxuXHJcbiAgICAgICAgbGV0IG91dHB1dCA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB4ID0gY29udGFpbmVyLnggJSB3aWR0aDsgeCA8PSB0aWxlWENvdW50OyB4KyspIHtcclxuICAgICAgICAgICAgdmFyIGxpbmUgPSBuZXcgTGluZShcclxuICAgICAgICAgICAgICAgIFt4ICogc2l6ZSwgLWNvbnRhaW5lci55LCB4ICogc2l6ZSwgaGVpZ2h0IC0gY29udGFpbmVyLnldLFxyXG4gICAgICAgICAgICAgICAgNSxcclxuICAgICAgICAgICAgICAgIDB4ZWVlZWVlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGxpbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gdGlsZVlDb3VudDsgeSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lID0gbmV3IExpbmUoXHJcbiAgICAgICAgICAgICAgICBbLWNvbnRhaW5lci54LCB5ICogc2l6ZSwgd2lkdGggLSBjb250YWluZXIueCwgeSAqIHNpemVdLFxyXG4gICAgICAgICAgICAgICAgNSxcclxuICAgICAgICAgICAgICAgIDB4ZWVlZWVlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGxpbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH07XHJcblxyXG4gICAgZ2VuZXJhdGUoLi4uZGltZW5zaW9ucygpKS5mb3JFYWNoKChjaGlsZCkgPT4gY29udGFpbmVyLmFkZENoaWxkKGNoaWxkKSk7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZHJlbigpO1xyXG4gICAgICAgIGdlbmVyYXRlKC4uLmRpbWVuc2lvbnMoKSkuZm9yRWFjaCgoY2hpbGQpID0+IGNvbnRhaW5lci5hZGRDaGlsZChjaGlsZCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBvblJlc2l6ZSh1cGRhdGUpO1xyXG5cclxuICAgIHJldHVybiB7IGNvbnRhaW5lciwgdXBkYXRlIH07XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFLQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQTNDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/create-grid.ts\n'
            );

            /***/
        },
});

webpackHotUpdate("main", {
    /***/ "./src/components/create-grid.ts":
        /*!***************************************!*\
  !*** ./src/components/create-grid.ts ***!
  \***************************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
            "use strict";
            eval(
                '\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nexports.createGrid = void 0;\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar utils_1 = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");\r\nvar line_1 = __webpack_require__(/*! ../utils/line */ "./src/utils/line.ts");\r\nfunction createGrid(size) {\r\n    var container = new PIXI.Container();\r\n    var generate = function (width, height) {\r\n        var tileXCount = Math.ceil(width / size);\r\n        var tileYCount = Math.ceil(height / size);\r\n        var output = [];\r\n        for (var x = -Math.floor(container.x / size); x <= tileXCount - Math.floor(container.x / size); x++) {\r\n            var line = new line_1.Line([x * size, -container.y, x * size, height - container.y], 2, 0x222222);\r\n            output.push(line);\r\n        }\r\n        for (var y = -Math.floor(container.y / size); y <= tileYCount - Math.floor(container.y / size); y++) {\r\n            var line = new line_1.Line([-container.x, y * size, width - container.x, y * size], 2, 0x222222);\r\n            output.push(line);\r\n        }\r\n        return output;\r\n    };\r\n    generate.apply(void 0, utils_1.dimensions()).forEach(function (child) { return container.addChild(child); });\r\n    var update = function () {\r\n        container.removeChildren();\r\n        generate.apply(void 0, utils_1.dimensions()).forEach(function (child) { return container.addChild(child); });\r\n    };\r\n    utils_1.onResize(update);\r\n    return { container: container, update: update };\r\n}\r\nexports.createGrid = createGrid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9jcmVhdGUtZ3JpZC50cy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi9zcmMvY29tcG9uZW50cy9jcmVhdGUtZ3JpZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XHJcbmltcG9ydCB7IGRpbWVuc2lvbnMsIG9uUmVzaXplIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IExpbmUgfSBmcm9tIFwiLi4vdXRpbHMvbGluZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdyaWQoXHJcbiAgICBzaXplOiBudW1iZXJcclxuKToge1xyXG4gICAgY29udGFpbmVyOiBQSVhJLkNvbnRhaW5lcjtcclxuICAgIHVwZGF0ZTogKCkgPT4gdm9pZDtcclxuICAgIHNjcmVlblRvR3JpZDogKHgsIHkpID0+IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcclxufSB7XHJcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcblxyXG4gICAgY29uc3QgZ2VuZXJhdGUgPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBQSVhJLkdyYXBoaWNzW10gPT4ge1xyXG4gICAgICAgIGNvbnN0IHRpbGVYQ291bnQgPSBNYXRoLmNlaWwod2lkdGggLyBzaXplKTtcclxuICAgICAgICBjb25zdCB0aWxlWUNvdW50ID0gTWF0aC5jZWlsKGhlaWdodCAvIHNpemUpO1xyXG5cclxuICAgICAgICBsZXQgb3V0cHV0ID0gW107XHJcbiAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgbGV0IHggPSAtTWF0aC5mbG9vcihjb250YWluZXIueCAvIHNpemUpO1xyXG4gICAgICAgICAgICB4IDw9IHRpbGVYQ291bnQgLSBNYXRoLmZsb29yKGNvbnRhaW5lci54IC8gc2l6ZSk7XHJcbiAgICAgICAgICAgIHgrK1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB2YXIgbGluZSA9IG5ldyBMaW5lKFxyXG4gICAgICAgICAgICAgICAgW3ggKiBzaXplLCAtY29udGFpbmVyLnksIHggKiBzaXplLCBoZWlnaHQgLSBjb250YWluZXIueV0sXHJcbiAgICAgICAgICAgICAgICAyLFxyXG4gICAgICAgICAgICAgICAgMHgyMjIyMjJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2gobGluZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKFxyXG4gICAgICAgICAgICBsZXQgeSA9IC1NYXRoLmZsb29yKGNvbnRhaW5lci55IC8gc2l6ZSk7XHJcbiAgICAgICAgICAgIHkgPD0gdGlsZVlDb3VudCAtIE1hdGguZmxvb3IoY29udGFpbmVyLnkgLyBzaXplKTtcclxuICAgICAgICAgICAgeSsrXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lID0gbmV3IExpbmUoXHJcbiAgICAgICAgICAgICAgICBbLWNvbnRhaW5lci54LCB5ICogc2l6ZSwgd2lkdGggLSBjb250YWluZXIueCwgeSAqIHNpemVdLFxyXG4gICAgICAgICAgICAgICAgMixcclxuICAgICAgICAgICAgICAgIDB4MjIyMjIyXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGxpbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH07XHJcblxyXG4gICAgZ2VuZXJhdGUoLi4uZGltZW5zaW9ucygpKS5mb3JFYWNoKChjaGlsZCkgPT4gY29udGFpbmVyLmFkZENoaWxkKGNoaWxkKSk7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZHJlbigpO1xyXG4gICAgICAgIGdlbmVyYXRlKC4uLmRpbWVuc2lvbnMoKSkuZm9yRWFjaCgoY2hpbGQpID0+IGNvbnRhaW5lci5hZGRDaGlsZChjaGlsZCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBvblJlc2l6ZSh1cGRhdGUpO1xyXG5cclxuICAgIHJldHVybiB7IGNvbnRhaW5lciwgdXBkYXRlIH07XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBS0E7QUFDQTtBQUVBO0FBS0E7QUFLQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFyREE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/create-grid.ts\n'
            );

            /***/
        },
});

webpackHotUpdate("main", {
    /***/ "./src/components/create-grid.ts":
        /*!***************************************!*\
  !*** ./src/components/create-grid.ts ***!
  \***************************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
            "use strict";
            eval(
                '\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nexports.createGrid = void 0;\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar utils_1 = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");\r\nvar line_1 = __webpack_require__(/*! ../utils/line */ "./src/utils/line.ts");\r\nfunction createGrid(size) {\r\n    var container = new PIXI.Container();\r\n    var generate = function (width, height) {\r\n        var tileXCount = Math.ceil(width / size);\r\n        var tileYCount = Math.ceil(height / size);\r\n        var output = [];\r\n        for (var x = -Math.floor(container.x / size); x <= tileXCount - Math.floor(container.x / size); x++) {\r\n            var line = new line_1.Line([x * size, -container.y, x * size, height - container.y], 2, 0x222222);\r\n            output.push(line);\r\n        }\r\n        for (var y = -Math.floor(container.y / size); y <= tileYCount - Math.floor(container.y / size); y++) {\r\n            var line = new line_1.Line([-container.x, y * size, width - container.x, y * size], 2, 0x222222);\r\n            output.push(line);\r\n        }\r\n        return output;\r\n    };\r\n    generate.apply(void 0, utils_1.dimensions()).forEach(function (child) { return container.addChild(child); });\r\n    var update = function () {\r\n        container.removeChildren();\r\n        generate.apply(void 0, utils_1.dimensions()).forEach(function (child) { return container.addChild(child); });\r\n    };\r\n    var screenToGrid = function (x, y) { return ({\r\n        x: Math.floor((-container.x + x) / size),\r\n        y: Math.floor((-container.y + y) / size),\r\n    }); };\r\n    /**\r\n     * From grid space to screen space (Top Left corner)\r\n     * @param x X in grid space\r\n     * @param y Y in grid space\r\n     * @returns Coordinates in screen space\r\n     */\r\n    var gridToScreen = function (x, y) { return ({\r\n        x: Math.floor((-container.x + x) / size),\r\n        y: Math.floor((-container.y + y) / size),\r\n    }); };\r\n    utils_1.onResize(update);\r\n    return { container: container, update: update, screenToGrid: screenToGrid, gridToScreen: gridToScreen };\r\n}\r\nexports.createGrid = createGrid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9jcmVhdGUtZ3JpZC50cy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi9zcmMvY29tcG9uZW50cy9jcmVhdGUtZ3JpZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XHJcbmltcG9ydCB7IGRpbWVuc2lvbnMsIG9uUmVzaXplIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IExpbmUgfSBmcm9tIFwiLi4vdXRpbHMvbGluZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdyaWQoXHJcbiAgICBzaXplOiBudW1iZXJcclxuKToge1xyXG4gICAgY29udGFpbmVyOiBQSVhJLkNvbnRhaW5lcjtcclxuICAgIHVwZGF0ZTogKCkgPT4gdm9pZDtcclxuICAgIHNjcmVlblRvR3JpZDogKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH07XHJcbiAgICBncmlkVG9TY3JlZW46ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4geyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xyXG59IHtcclxuICAgIGxldCBjb250YWluZXIgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuXHJcbiAgICBjb25zdCBnZW5lcmF0ZSA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IFBJWEkuR3JhcGhpY3NbXSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGlsZVhDb3VudCA9IE1hdGguY2VpbCh3aWR0aCAvIHNpemUpO1xyXG4gICAgICAgIGNvbnN0IHRpbGVZQ291bnQgPSBNYXRoLmNlaWwoaGVpZ2h0IC8gc2l6ZSk7XHJcblxyXG4gICAgICAgIGxldCBvdXRwdXQgPSBbXTtcclxuICAgICAgICBmb3IgKFxyXG4gICAgICAgICAgICBsZXQgeCA9IC1NYXRoLmZsb29yKGNvbnRhaW5lci54IC8gc2l6ZSk7XHJcbiAgICAgICAgICAgIHggPD0gdGlsZVhDb3VudCAtIE1hdGguZmxvb3IoY29udGFpbmVyLnggLyBzaXplKTtcclxuICAgICAgICAgICAgeCsrXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lID0gbmV3IExpbmUoXHJcbiAgICAgICAgICAgICAgICBbeCAqIHNpemUsIC1jb250YWluZXIueSwgeCAqIHNpemUsIGhlaWdodCAtIGNvbnRhaW5lci55XSxcclxuICAgICAgICAgICAgICAgIDIsXHJcbiAgICAgICAgICAgICAgICAweDIyMjIyMlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChsaW5lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoXHJcbiAgICAgICAgICAgIGxldCB5ID0gLU1hdGguZmxvb3IoY29udGFpbmVyLnkgLyBzaXplKTtcclxuICAgICAgICAgICAgeSA8PSB0aWxlWUNvdW50IC0gTWF0aC5mbG9vcihjb250YWluZXIueSAvIHNpemUpO1xyXG4gICAgICAgICAgICB5KytcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdmFyIGxpbmUgPSBuZXcgTGluZShcclxuICAgICAgICAgICAgICAgIFstY29udGFpbmVyLngsIHkgKiBzaXplLCB3aWR0aCAtIGNvbnRhaW5lci54LCB5ICogc2l6ZV0sXHJcbiAgICAgICAgICAgICAgICAyLFxyXG4gICAgICAgICAgICAgICAgMHgyMjIyMjJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2gobGluZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfTtcclxuXHJcbiAgICBnZW5lcmF0ZSguLi5kaW1lbnNpb25zKCkpLmZvckVhY2goKGNoaWxkKSA9PiBjb250YWluZXIuYWRkQ2hpbGQoY2hpbGQpKTtcclxuXHJcbiAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgZ2VuZXJhdGUoLi4uZGltZW5zaW9ucygpKS5mb3JFYWNoKChjaGlsZCkgPT4gY29udGFpbmVyLmFkZENoaWxkKGNoaWxkKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHNjcmVlblRvR3JpZCA9ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gKHtcclxuICAgICAgICB4OiBNYXRoLmZsb29yKCgtY29udGFpbmVyLnggKyB4KSAvIHNpemUpLFxyXG4gICAgICAgIHk6IE1hdGguZmxvb3IoKC1jb250YWluZXIueSArIHkpIC8gc2l6ZSksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZyb20gZ3JpZCBzcGFjZSB0byBzY3JlZW4gc3BhY2UgKFRvcCBMZWZ0IGNvcm5lcilcclxuICAgICAqIEBwYXJhbSB4IFggaW4gZ3JpZCBzcGFjZVxyXG4gICAgICogQHBhcmFtIHkgWSBpbiBncmlkIHNwYWNlXHJcbiAgICAgKiBAcmV0dXJucyBDb29yZGluYXRlcyBpbiBzY3JlZW4gc3BhY2VcclxuICAgICAqL1xyXG4gICAgY29uc3QgZ3JpZFRvU2NyZWVuID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiAoe1xyXG4gICAgICAgIHg6IE1hdGguZmxvb3IoKC1jb250YWluZXIueCArIHgpIC8gc2l6ZSksXHJcbiAgICAgICAgeTogTWF0aC5mbG9vcigoLWNvbnRhaW5lci55ICsgeSkgLyBzaXplKSxcclxuICAgIH0pO1xyXG5cclxuICAgIG9uUmVzaXplKHVwZGF0ZSk7XHJcblxyXG4gICAgcmV0dXJuIHsgY29udGFpbmVyLCB1cGRhdGUsIHNjcmVlblRvR3JpZCwgZ3JpZFRvU2NyZWVuIH07XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQVFBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBS0E7QUFDQTtBQUVBO0FBS0E7QUFLQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUF0RUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/create-grid.ts\n'
            );

            /***/
        },
});

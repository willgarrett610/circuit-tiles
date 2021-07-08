webpackHotUpdate("main", {
    /***/ "./src/components/create-grid.ts":
        /*!***************************************!*\
  !*** ./src/components/create-grid.ts ***!
  \***************************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
            "use strict";
            eval(
                '\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nexports.createGrid = void 0;\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar utils_1 = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");\r\nvar line_1 = __webpack_require__(/*! ../utils/line */ "./src/utils/line.ts");\r\nvar math_1 = __webpack_require__(/*! ../utils/math */ "./src/utils/math.ts");\r\nfunction createGrid(size) {\r\n    var container = new PIXI.Container();\r\n    var generate = function (width, height) {\r\n        var tileXCount = Math.ceil(width / size);\r\n        var tileYCount = Math.ceil(height / size);\r\n        var output = [];\r\n        for (var x = -Math.floor(container.x / size); x <= tileXCount - Math.floor(container.x / size); x++) {\r\n            var line = new line_1.Line([x * size, -container.y, x * size, height - container.y], 2, 0x222222);\r\n            output.push(line);\r\n        }\r\n        for (var y = -Math.floor(container.y / size); y <= tileYCount - Math.floor(container.y / size); y++) {\r\n            var line = new line_1.Line([-container.x, y * size, width - container.x, y * size], 2, 0x222222);\r\n            output.push(line);\r\n        }\r\n        return output;\r\n    };\r\n    generate.apply(void 0, utils_1.dimensions()).forEach(function (child) { return container.addChild(child); });\r\n    var update = function () {\r\n        container.removeChildren();\r\n        generate.apply(void 0, utils_1.dimensions()).forEach(function (child) { return container.addChild(child); });\r\n    };\r\n    /**\r\n     * From screen space to grid space\r\n     * @param x X in screen space\r\n     * @param y Y in screen space\r\n     * @returns Coordinates in grid space\r\n     */\r\n    var screenToGrid = function (x, y) { return ({\r\n        x: Math.floor((-container.x + x) / size),\r\n        y: Math.floor((-container.y + y) / size),\r\n    }); };\r\n    /**\r\n     * From grid space to screen space (Top Left corner)\r\n     * @param x X in grid space\r\n     * @param y Y in grid space\r\n     * @returns Coordinates in screen space\r\n     */\r\n    var gridToScreen = function (x, y) { return ({\r\n        x: Math.floor(x) * size + container.x,\r\n        y: Math.floor(y) * size + container.y,\r\n    }); };\r\n    utils_1.onResize(update);\r\n    utils_1.onScroll(function (e) {\r\n        size -= e.deltaY * 0.1;\r\n        size = math_1.clamp(size, 20, 350);\r\n        console.log({ size: size });\r\n        update();\r\n    });\r\n    utils_1.onDrag(function (e) {\r\n        container.x += e.offsetX;\r\n        container.y += e.offsetY;\r\n        update();\r\n    });\r\n    return { container: container, update: update, screenToGrid: screenToGrid, gridToScreen: gridToScreen };\r\n}\r\nexports.createGrid = createGrid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9jcmVhdGUtZ3JpZC50cy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi9zcmMvY29tcG9uZW50cy9jcmVhdGUtZ3JpZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XHJcbmltcG9ydCB7IGRpbWVuc2lvbnMsIG9uRHJhZywgb25SZXNpemUsIG9uU2Nyb2xsIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IExpbmUgfSBmcm9tIFwiLi4vdXRpbHMvbGluZVwiO1xyXG5pbXBvcnQgeyBjbGFtcCB9IGZyb20gXCIuLi91dGlscy9tYXRoXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR3JpZChcclxuICAgIHNpemU6IG51bWJlclxyXG4pOiB7XHJcbiAgICBjb250YWluZXI6IFBJWEkuQ29udGFpbmVyO1xyXG4gICAgdXBkYXRlOiAoKSA9PiB2b2lkO1xyXG4gICAgc2NyZWVuVG9HcmlkOiAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcclxuICAgIGdyaWRUb1NjcmVlbjogKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH07XHJcbn0ge1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG5cclxuICAgIGNvbnN0IGdlbmVyYXRlID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogUElYSS5HcmFwaGljc1tdID0+IHtcclxuICAgICAgICBjb25zdCB0aWxlWENvdW50ID0gTWF0aC5jZWlsKHdpZHRoIC8gc2l6ZSk7XHJcbiAgICAgICAgY29uc3QgdGlsZVlDb3VudCA9IE1hdGguY2VpbChoZWlnaHQgLyBzaXplKTtcclxuXHJcbiAgICAgICAgbGV0IG91dHB1dCA9IFtdO1xyXG4gICAgICAgIGZvciAoXHJcbiAgICAgICAgICAgIGxldCB4ID0gLU1hdGguZmxvb3IoY29udGFpbmVyLnggLyBzaXplKTtcclxuICAgICAgICAgICAgeCA8PSB0aWxlWENvdW50IC0gTWF0aC5mbG9vcihjb250YWluZXIueCAvIHNpemUpO1xyXG4gICAgICAgICAgICB4KytcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdmFyIGxpbmUgPSBuZXcgTGluZShcclxuICAgICAgICAgICAgICAgIFt4ICogc2l6ZSwgLWNvbnRhaW5lci55LCB4ICogc2l6ZSwgaGVpZ2h0IC0gY29udGFpbmVyLnldLFxyXG4gICAgICAgICAgICAgICAgMixcclxuICAgICAgICAgICAgICAgIDB4MjIyMjIyXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGxpbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgbGV0IHkgPSAtTWF0aC5mbG9vcihjb250YWluZXIueSAvIHNpemUpO1xyXG4gICAgICAgICAgICB5IDw9IHRpbGVZQ291bnQgLSBNYXRoLmZsb29yKGNvbnRhaW5lci55IC8gc2l6ZSk7XHJcbiAgICAgICAgICAgIHkrK1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB2YXIgbGluZSA9IG5ldyBMaW5lKFxyXG4gICAgICAgICAgICAgICAgWy1jb250YWluZXIueCwgeSAqIHNpemUsIHdpZHRoIC0gY29udGFpbmVyLngsIHkgKiBzaXplXSxcclxuICAgICAgICAgICAgICAgIDIsXHJcbiAgICAgICAgICAgICAgICAweDIyMjIyMlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChsaW5lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGdlbmVyYXRlKC4uLmRpbWVuc2lvbnMoKSkuZm9yRWFjaCgoY2hpbGQpID0+IGNvbnRhaW5lci5hZGRDaGlsZChjaGlsZCkpO1xyXG5cclxuICAgIGNvbnN0IHVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGRyZW4oKTtcclxuICAgICAgICBnZW5lcmF0ZSguLi5kaW1lbnNpb25zKCkpLmZvckVhY2goKGNoaWxkKSA9PiBjb250YWluZXIuYWRkQ2hpbGQoY2hpbGQpKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGcm9tIHNjcmVlbiBzcGFjZSB0byBncmlkIHNwYWNlXHJcbiAgICAgKiBAcGFyYW0geCBYIGluIHNjcmVlbiBzcGFjZVxyXG4gICAgICogQHBhcmFtIHkgWSBpbiBzY3JlZW4gc3BhY2VcclxuICAgICAqIEByZXR1cm5zIENvb3JkaW5hdGVzIGluIGdyaWQgc3BhY2VcclxuICAgICAqL1xyXG4gICAgY29uc3Qgc2NyZWVuVG9HcmlkID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiAoe1xyXG4gICAgICAgIHg6IE1hdGguZmxvb3IoKC1jb250YWluZXIueCArIHgpIC8gc2l6ZSksXHJcbiAgICAgICAgeTogTWF0aC5mbG9vcigoLWNvbnRhaW5lci55ICsgeSkgLyBzaXplKSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnJvbSBncmlkIHNwYWNlIHRvIHNjcmVlbiBzcGFjZSAoVG9wIExlZnQgY29ybmVyKVxyXG4gICAgICogQHBhcmFtIHggWCBpbiBncmlkIHNwYWNlXHJcbiAgICAgKiBAcGFyYW0geSBZIGluIGdyaWQgc3BhY2VcclxuICAgICAqIEByZXR1cm5zIENvb3JkaW5hdGVzIGluIHNjcmVlbiBzcGFjZVxyXG4gICAgICovXHJcbiAgICBjb25zdCBncmlkVG9TY3JlZW4gPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+ICh7XHJcbiAgICAgICAgeDogTWF0aC5mbG9vcih4KSAqIHNpemUgKyBjb250YWluZXIueCxcclxuICAgICAgICB5OiBNYXRoLmZsb29yKHkpICogc2l6ZSArIGNvbnRhaW5lci55LFxyXG4gICAgfSk7XHJcblxyXG4gICAgb25SZXNpemUodXBkYXRlKTtcclxuICAgIG9uU2Nyb2xsKChlKSA9PiB7XHJcbiAgICAgICAgc2l6ZSAtPSBlLmRlbHRhWSAqIDAuMTtcclxuICAgICAgICBzaXplID0gY2xhbXAoc2l6ZSwgMjAsIDM1MCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coeyBzaXplIH0pO1xyXG4gICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcbiAgICBvbkRyYWcoKGUpID0+IHtcclxuICAgICAgICBjb250YWluZXIueCArPSBlLm9mZnNldFg7XHJcbiAgICAgICAgY29udGFpbmVyLnkgKz0gZS5vZmZzZXRZO1xyXG4gICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHsgY29udGFpbmVyLCB1cGRhdGUsIHNjcmVlblRvR3JpZCwgZ3JpZFRvU2NyZWVuIH07XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBUUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBS0E7QUFLQTtBQUNBO0FBRUE7QUFLQTtBQUtBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQXZGQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/create-grid.ts\n'
            );

            /***/
        },

    /***/ "./src/index.ts":
        /*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
            "use strict";
            eval(
                '\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError("Generator is already executing.");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar create_grid_1 = __webpack_require__(/*! ./components/create-grid */ "./src/components/create-grid.ts");\r\nvar utils_1 = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");\r\nvar load = function (app) {\r\n    return new Promise(function (resolve) {\r\n        return app.loader\r\n            .add("doge", "assets/sprites/doge-icon.svg")\r\n            .load(function () { return resolve(); });\r\n    });\r\n};\r\nvar main = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    function update(delta) {\r\n        if (sprite.x <= 0 || sprite.x >= utils_1.width() - sprite.width)\r\n            velocity.x = -velocity.x;\r\n        if (sprite.y <= 0 || sprite.y >= utils_1.height() - sprite.height)\r\n            velocity.y = -velocity.y;\r\n        sprite.x += velocity.x * delta;\r\n        sprite.y += velocity.y * delta;\r\n        grid.x += 0.15 * delta;\r\n        grid.y += 0.1 * delta;\r\n        updateGrid();\r\n        sprite.x = gridToScreen(0.5, 0.5).x;\r\n        sprite.y = gridToScreen(0.5, 0.5).y;\r\n    }\r\n    var app, _a, grid, updateGrid, screenToGrid, gridToScreen, sprite, velocity;\r\n    return __generator(this, function (_b) {\r\n        switch (_b.label) {\r\n            case 0:\r\n                app = new PIXI.Application();\r\n                document.body.style.margin = "0";\r\n                app.renderer.view.style.position = "absolute";\r\n                app.renderer.view.style.display = "block";\r\n                app.renderer.resize(window.innerWidth, window.innerHeight);\r\n                document.body.appendChild(app.view);\r\n                return [4 /*yield*/, load(app)];\r\n            case 1:\r\n                _b.sent();\r\n                app.renderer.backgroundColor = 0x333333;\r\n                _a = create_grid_1.createGrid(100), grid = _a.container, updateGrid = _a.update, screenToGrid = _a.screenToGrid, gridToScreen = _a.gridToScreen;\r\n                app.stage.addChild(grid);\r\n                sprite = new PIXI.Sprite(app.loader.resources.doge.texture);\r\n                sprite.width = 20;\r\n                sprite.height = 20;\r\n                sprite.x = utils_1.width() / 2 - sprite.width / 2;\r\n                sprite.y = utils_1.height() / 2 - sprite.height / 2;\r\n                app.stage.addChild(sprite);\r\n                utils_1.onMouseMove(function (e) {\r\n                    console.log(screenToGrid(e.clientX, e.clientY));\r\n                });\r\n                utils_1.onResize(function () {\r\n                    var _a;\r\n                    (_a = app.renderer).resize.apply(_a, utils_1.dimensions());\r\n                    sprite.x = utils_1.width() / 2 - sprite.width / 2;\r\n                    sprite.y = utils_1.height() / 2 - sprite.height / 2;\r\n                });\r\n                velocity = { x: 1, y: 1 };\r\n                app.ticker.add(update);\r\n                return [2 /*return*/];\r\n        }\r\n    });\r\n}); };\r\nmain();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2NyZWF0ZS1ncmlkXCI7XG5pbXBvcnQgeyBkaW1lbnNpb25zLCBoZWlnaHQsIG9uTW91c2VNb3ZlLCBvblJlc2l6ZSwgd2lkdGggfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCBsb2FkID0gKGFwcDogUElYSS5BcHBsaWNhdGlvbikgPT5cbiAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT5cbiAgICAgICAgYXBwLmxvYWRlclxuICAgICAgICAgICAgLmFkZChcImRvZ2VcIiwgXCJhc3NldHMvc3ByaXRlcy9kb2dlLWljb24uc3ZnXCIpXG4gICAgICAgICAgICAubG9hZCgoKSA9PiByZXNvbHZlKCkpXG4gICAgKTtcblxuY29uc3QgbWFpbiA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgYXBwID0gbmV3IFBJWEkuQXBwbGljYXRpb24oKTtcblxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUubWFyZ2luID0gXCIwXCI7XG4gICAgYXBwLnJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgYXBwLnJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBhcHAucmVuZGVyZXIucmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwLnZpZXcpO1xuXG4gICAgYXdhaXQgbG9hZChhcHApO1xuXG4gICAgYXBwLnJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IDB4MzMzMzMzO1xuXG4gICAgbGV0IHtcbiAgICAgICAgY29udGFpbmVyOiBncmlkLFxuICAgICAgICB1cGRhdGU6IHVwZGF0ZUdyaWQsXG4gICAgICAgIHNjcmVlblRvR3JpZCxcbiAgICAgICAgZ3JpZFRvU2NyZWVuLFxuICAgIH0gPSBjcmVhdGVHcmlkKDEwMCk7XG5cbiAgICBhcHAuc3RhZ2UuYWRkQ2hpbGQoZ3JpZCk7XG5cbiAgICBsZXQgc3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKGFwcC5sb2FkZXIucmVzb3VyY2VzLmRvZ2UudGV4dHVyZSk7XG4gICAgc3ByaXRlLndpZHRoID0gMjA7XG4gICAgc3ByaXRlLmhlaWdodCA9IDIwO1xuICAgIHNwcml0ZS54ID0gd2lkdGgoKSAvIDIgLSBzcHJpdGUud2lkdGggLyAyO1xuICAgIHNwcml0ZS55ID0gaGVpZ2h0KCkgLyAyIC0gc3ByaXRlLmhlaWdodCAvIDI7XG4gICAgYXBwLnN0YWdlLmFkZENoaWxkKHNwcml0ZSk7XG5cbiAgICBvbk1vdXNlTW92ZSgoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhzY3JlZW5Ub0dyaWQoZS5jbGllbnRYLCBlLmNsaWVudFkpKTtcbiAgICB9KTtcblxuICAgIG9uUmVzaXplKCgpID0+IHtcbiAgICAgICAgYXBwLnJlbmRlcmVyLnJlc2l6ZSguLi5kaW1lbnNpb25zKCkpO1xuICAgICAgICBzcHJpdGUueCA9IHdpZHRoKCkgLyAyIC0gc3ByaXRlLndpZHRoIC8gMjtcbiAgICAgICAgc3ByaXRlLnkgPSBoZWlnaHQoKSAvIDIgLSBzcHJpdGUuaGVpZ2h0IC8gMjtcbiAgICB9KTtcblxuICAgIGxldCB2ZWxvY2l0eSA9IHsgeDogMSwgeTogMSB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlKGRlbHRhOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHNwcml0ZS54IDw9IDAgfHwgc3ByaXRlLnggPj0gd2lkdGgoKSAtIHNwcml0ZS53aWR0aClcbiAgICAgICAgICAgIHZlbG9jaXR5LnggPSAtdmVsb2NpdHkueDtcblxuICAgICAgICBpZiAoc3ByaXRlLnkgPD0gMCB8fCBzcHJpdGUueSA+PSBoZWlnaHQoKSAtIHNwcml0ZS5oZWlnaHQpXG4gICAgICAgICAgICB2ZWxvY2l0eS55ID0gLXZlbG9jaXR5Lnk7XG4gICAgICAgIHNwcml0ZS54ICs9IHZlbG9jaXR5LnggKiBkZWx0YTtcbiAgICAgICAgc3ByaXRlLnkgKz0gdmVsb2NpdHkueSAqIGRlbHRhO1xuXG4gICAgICAgIGdyaWQueCArPSAwLjE1ICogZGVsdGE7XG4gICAgICAgIGdyaWQueSArPSAwLjEgKiBkZWx0YTtcbiAgICAgICAgdXBkYXRlR3JpZCgpO1xuICAgICAgICBzcHJpdGUueCA9IGdyaWRUb1NjcmVlbigwLjUsIDAuNSkueDtcbiAgICAgICAgc3ByaXRlLnkgPSBncmlkVG9TY3JlZW4oMC41LCAwLjUpLnk7XG4gICAgfVxuICAgIGFwcC50aWNrZXIuYWRkKHVwZGF0ZSk7XG59O1xuXG5tYWluKCk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFNQTtBQXlDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUF0REE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQUE7QUFFQTtBQUVBO0FBT0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBaUJBOzs7O0FBQ0E7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.ts\n'
            );

            /***/
        },
});

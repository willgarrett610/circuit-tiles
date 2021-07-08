webpackHotUpdate("main", {
    /***/ "./src/index.ts":
        /*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
            "use strict";
            eval(
                '\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError("Generator is already executing.");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar create_grid_1 = __webpack_require__(/*! ./components/create-grid */ "./src/components/create-grid.ts");\r\nvar utils_1 = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");\r\nvar load = function (app) {\r\n    return new Promise(function (resolve) {\r\n        return app.loader\r\n            .add("doge", "assets/sprites/doge-icon.svg")\r\n            .load(function () { return resolve(); });\r\n    });\r\n};\r\nvar main = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    function update(delta) {\r\n        if (sprite.x <= 0 || sprite.x >= utils_1.width() - sprite.width)\r\n            velocity.x = -velocity.x;\r\n        if (sprite.y <= 0 || sprite.y >= utils_1.height() - sprite.height)\r\n            velocity.y = -velocity.y;\r\n        sprite.x += velocity.x * delta;\r\n        sprite.y += velocity.y * delta;\r\n        grid.x += 0.15 * delta;\r\n        grid.y += 0.1 * delta;\r\n        updateGrid();\r\n    }\r\n    var app, _a, grid, updateGrid, screenToGrid, gridToScreen, sprite, velocity;\r\n    return __generator(this, function (_b) {\r\n        switch (_b.label) {\r\n            case 0:\r\n                app = new PIXI.Application();\r\n                document.body.style.margin = "0";\r\n                app.renderer.view.style.position = "absolute";\r\n                app.renderer.view.style.display = "block";\r\n                app.renderer.resize(window.innerWidth, window.innerHeight);\r\n                document.body.appendChild(app.view);\r\n                return [4 /*yield*/, load(app)];\r\n            case 1:\r\n                _b.sent();\r\n                app.renderer.backgroundColor = 0x333333;\r\n                _a = create_grid_1.createGrid(100), grid = _a.container, updateGrid = _a.update, screenToGrid = _a.screenToGrid, gridToScreen = _a.gridToScreen;\r\n                app.stage.addChild(grid);\r\n                sprite = new PIXI.Sprite(app.loader.resources.doge.texture);\r\n                sprite.width = 200;\r\n                sprite.height = 200;\r\n                sprite.x = utils_1.width() / 2 - sprite.width / 2;\r\n                sprite.y = utils_1.height() / 2 - sprite.height / 2;\r\n                app.stage.addChild(sprite);\r\n                utils_1.onMouseMove(function (e) {\r\n                    console.log(screenToGrid(e.clientX, e.clientY));\r\n                });\r\n                utils_1.onResize(function () {\r\n                    var _a;\r\n                    (_a = app.renderer).resize.apply(_a, utils_1.dimensions());\r\n                    sprite.x = utils_1.width() / 2 - sprite.width / 2;\r\n                    sprite.y = utils_1.height() / 2 - sprite.height / 2;\r\n                });\r\n                velocity = { x: 1, y: 1 };\r\n                app.ticker.add(update);\r\n                return [2 /*return*/];\r\n        }\r\n    });\r\n}); };\r\nmain();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2NyZWF0ZS1ncmlkXCI7XG5pbXBvcnQgeyBkaW1lbnNpb25zLCBoZWlnaHQsIG9uTW91c2VNb3ZlLCBvblJlc2l6ZSwgd2lkdGggfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCBsb2FkID0gKGFwcDogUElYSS5BcHBsaWNhdGlvbikgPT5cbiAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT5cbiAgICAgICAgYXBwLmxvYWRlclxuICAgICAgICAgICAgLmFkZChcImRvZ2VcIiwgXCJhc3NldHMvc3ByaXRlcy9kb2dlLWljb24uc3ZnXCIpXG4gICAgICAgICAgICAubG9hZCgoKSA9PiByZXNvbHZlKCkpXG4gICAgKTtcblxuY29uc3QgbWFpbiA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgYXBwID0gbmV3IFBJWEkuQXBwbGljYXRpb24oKTtcblxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUubWFyZ2luID0gXCIwXCI7XG4gICAgYXBwLnJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgYXBwLnJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBhcHAucmVuZGVyZXIucmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwLnZpZXcpO1xuXG4gICAgYXdhaXQgbG9hZChhcHApO1xuXG4gICAgYXBwLnJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IDB4MzMzMzMzO1xuXG4gICAgbGV0IHtcbiAgICAgICAgY29udGFpbmVyOiBncmlkLFxuICAgICAgICB1cGRhdGU6IHVwZGF0ZUdyaWQsXG4gICAgICAgIHNjcmVlblRvR3JpZCxcbiAgICAgICAgZ3JpZFRvU2NyZWVuLFxuICAgIH0gPSBjcmVhdGVHcmlkKDEwMCk7XG5cbiAgICBhcHAuc3RhZ2UuYWRkQ2hpbGQoZ3JpZCk7XG5cbiAgICBsZXQgc3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKGFwcC5sb2FkZXIucmVzb3VyY2VzLmRvZ2UudGV4dHVyZSk7XG4gICAgc3ByaXRlLndpZHRoID0gMjAwO1xuICAgIHNwcml0ZS5oZWlnaHQgPSAyMDA7XG4gICAgc3ByaXRlLnggPSB3aWR0aCgpIC8gMiAtIHNwcml0ZS53aWR0aCAvIDI7XG4gICAgc3ByaXRlLnkgPSBoZWlnaHQoKSAvIDIgLSBzcHJpdGUuaGVpZ2h0IC8gMjtcbiAgICBhcHAuc3RhZ2UuYWRkQ2hpbGQoc3ByaXRlKTtcblxuICAgIG9uTW91c2VNb3ZlKChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNjcmVlblRvR3JpZChlLmNsaWVudFgsIGUuY2xpZW50WSkpO1xuICAgIH0pO1xuXG4gICAgb25SZXNpemUoKCkgPT4ge1xuICAgICAgICBhcHAucmVuZGVyZXIucmVzaXplKC4uLmRpbWVuc2lvbnMoKSk7XG4gICAgICAgIHNwcml0ZS54ID0gd2lkdGgoKSAvIDIgLSBzcHJpdGUud2lkdGggLyAyO1xuICAgICAgICBzcHJpdGUueSA9IGhlaWdodCgpIC8gMiAtIHNwcml0ZS5oZWlnaHQgLyAyO1xuICAgIH0pO1xuXG4gICAgbGV0IHZlbG9jaXR5ID0geyB4OiAxLCB5OiAxIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUoZGVsdGE6IG51bWJlcikge1xuICAgICAgICBpZiAoc3ByaXRlLnggPD0gMCB8fCBzcHJpdGUueCA+PSB3aWR0aCgpIC0gc3ByaXRlLndpZHRoKVxuICAgICAgICAgICAgdmVsb2NpdHkueCA9IC12ZWxvY2l0eS54O1xuXG4gICAgICAgIGlmIChzcHJpdGUueSA8PSAwIHx8IHNwcml0ZS55ID49IGhlaWdodCgpIC0gc3ByaXRlLmhlaWdodClcbiAgICAgICAgICAgIHZlbG9jaXR5LnkgPSAtdmVsb2NpdHkueTtcbiAgICAgICAgc3ByaXRlLnggKz0gdmVsb2NpdHkueCAqIGRlbHRhO1xuICAgICAgICBzcHJpdGUueSArPSB2ZWxvY2l0eS55ICogZGVsdGE7XG5cbiAgICAgICAgZ3JpZC54ICs9IDAuMTUgKiBkZWx0YTtcbiAgICAgICAgZ3JpZC55ICs9IDAuMSAqIGRlbHRhO1xuICAgICAgICB1cGRhdGVHcmlkKCk7XG4gICAgfVxuICAgIGFwcC50aWNrZXIuYWRkKHVwZGF0ZSk7XG59O1xuXG5tYWluKCk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFNQTtBQXlDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQXBEQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFBQTtBQUVBO0FBRUE7QUFPQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFlQTs7OztBQUNBO0FBRUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.ts\n'
            );

            /***/
        },
});

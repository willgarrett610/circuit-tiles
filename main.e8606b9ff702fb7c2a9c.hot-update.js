webpackHotUpdate("main", {
    /***/ "./src/index.ts":
        /*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
            "use strict";
            eval(
                '\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError("Generator is already executing.");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar create_grid_1 = __webpack_require__(/*! ./components/create-grid */ "./src/components/create-grid.ts");\r\nvar utils_1 = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");\r\nvar load = function (app) {\r\n    return new Promise(function (resolve) {\r\n        return app.loader\r\n            .add("doge", "assets/sprites/doge-icon.svg")\r\n            .load(function () { return resolve(); });\r\n    });\r\n};\r\nvar main = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    function update(delta) {\r\n        if (sprite.x <= 0 || sprite.x >= window.innerWidth - sprite.width)\r\n            velocity.x = -velocity.x;\r\n        if (sprite.y <= 0 || sprite.y >= window.innerHeight - sprite.height)\r\n            velocity.y = -velocity.y;\r\n        sprite.x += velocity.x * delta;\r\n        sprite.y += velocity.y * delta;\r\n        grid.x += 0.15 * delta;\r\n        grid.y += 0.1 * delta;\r\n        updateGrid();\r\n    }\r\n    var app, _a, grid, updateGrid, sprite, velocity;\r\n    return __generator(this, function (_b) {\r\n        switch (_b.label) {\r\n            case 0:\r\n                app = new PIXI.Application();\r\n                document.body.style.margin = "0";\r\n                app.renderer.view.style.position = "absolute";\r\n                app.renderer.view.style.display = "block";\r\n                app.renderer.resize(window.innerWidth, window.innerHeight);\r\n                document.body.appendChild(app.view);\r\n                return [4 /*yield*/, load(app)];\r\n            case 1:\r\n                _b.sent();\r\n                app.renderer.backgroundColor = 0x333333;\r\n                _a = create_grid_1.createGrid(100), grid = _a.container, updateGrid = _a.update;\r\n                app.stage.addChild(grid);\r\n                sprite = new PIXI.Sprite(app.loader.resources.doge.texture);\r\n                sprite.width = 200;\r\n                sprite.height = 200;\r\n                sprite.x = utils_1.width() / 2 - sprite.width / 2;\r\n                sprite.y = utils_1.height() / 2 - sprite.height / 2;\r\n                app.stage.addChild(sprite);\r\n                utils_1.onResize(function () {\r\n                    app.renderer.resize(window.innerWidth, window.innerHeight);\r\n                    sprite.x = window.innerWidth / 2 - sprite.width / 2;\r\n                    sprite.y = window.innerHeight / 2 - sprite.height / 2;\r\n                });\r\n                velocity = { x: 1, y: 1 };\r\n                app.ticker.add(update);\r\n                return [2 /*return*/];\r\n        }\r\n    });\r\n}); };\r\nmain();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2NyZWF0ZS1ncmlkXCI7XG5pbXBvcnQgeyBoZWlnaHQsIG9uUmVzaXplLCB3aWR0aCB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IGxvYWQgPSAoYXBwOiBQSVhJLkFwcGxpY2F0aW9uKSA9PlxuICAgIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PlxuICAgICAgICBhcHAubG9hZGVyXG4gICAgICAgICAgICAuYWRkKFwiZG9nZVwiLCBcImFzc2V0cy9zcHJpdGVzL2RvZ2UtaWNvbi5zdmdcIilcbiAgICAgICAgICAgIC5sb2FkKCgpID0+IHJlc29sdmUoKSlcbiAgICApO1xuXG5jb25zdCBtYWluID0gYXN5bmMgKCkgPT4ge1xuICAgIGxldCBhcHAgPSBuZXcgUElYSS5BcHBsaWNhdGlvbigpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW4gPSBcIjBcIjtcbiAgICBhcHAucmVuZGVyZXIudmlldy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBhcHAucmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIGFwcC5yZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhcHAudmlldyk7XG5cbiAgICBhd2FpdCBsb2FkKGFwcCk7XG5cbiAgICBhcHAucmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gMHgzMzMzMzM7XG5cbiAgICBsZXQgeyBjb250YWluZXI6IGdyaWQsIHVwZGF0ZTogdXBkYXRlR3JpZCB9ID0gY3JlYXRlR3JpZCgxMDApO1xuXG4gICAgYXBwLnN0YWdlLmFkZENoaWxkKGdyaWQpO1xuXG4gICAgbGV0IHNwcml0ZSA9IG5ldyBQSVhJLlNwcml0ZShhcHAubG9hZGVyLnJlc291cmNlcy5kb2dlLnRleHR1cmUpO1xuICAgIHNwcml0ZS53aWR0aCA9IDIwMDtcbiAgICBzcHJpdGUuaGVpZ2h0ID0gMjAwO1xuICAgIHNwcml0ZS54ID0gd2lkdGgoKSAvIDIgLSBzcHJpdGUud2lkdGggLyAyO1xuICAgIHNwcml0ZS55ID0gaGVpZ2h0KCkgLyAyIC0gc3ByaXRlLmhlaWdodCAvIDI7XG4gICAgYXBwLnN0YWdlLmFkZENoaWxkKHNwcml0ZSk7XG5cbiAgICBvblJlc2l6ZSgoKSA9PiB7XG4gICAgICAgIGFwcC5yZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIHNwcml0ZS54ID0gd2luZG93LmlubmVyV2lkdGggLyAyIC0gc3ByaXRlLndpZHRoIC8gMjtcbiAgICAgICAgc3ByaXRlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIC0gc3ByaXRlLmhlaWdodCAvIDI7XG4gICAgfSk7XG5cbiAgICBsZXQgdmVsb2NpdHkgPSB7IHg6IDEsIHk6IDEgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZShkZWx0YTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChzcHJpdGUueCA8PSAwIHx8IHNwcml0ZS54ID49IHdpbmRvdy5pbm5lcldpZHRoIC0gc3ByaXRlLndpZHRoKVxuICAgICAgICAgICAgdmVsb2NpdHkueCA9IC12ZWxvY2l0eS54O1xuXG4gICAgICAgIGlmIChzcHJpdGUueSA8PSAwIHx8IHNwcml0ZS55ID49IHdpbmRvdy5pbm5lckhlaWdodCAtIHNwcml0ZS5oZWlnaHQpXG4gICAgICAgICAgICB2ZWxvY2l0eS55ID0gLXZlbG9jaXR5Lnk7XG4gICAgICAgIHNwcml0ZS54ICs9IHZlbG9jaXR5LnggKiBkZWx0YTtcbiAgICAgICAgc3ByaXRlLnkgKz0gdmVsb2NpdHkueSAqIGRlbHRhO1xuXG4gICAgICAgIGdyaWQueCArPSAwLjE1ICogZGVsdGE7XG4gICAgICAgIGdyaWQueSArPSAwLjEgKiBkZWx0YTtcbiAgICAgICAgdXBkYXRlR3JpZCgpO1xuICAgIH1cbiAgICBhcHAudGlja2VyLmFkZCh1cGRhdGUpO1xufTtcblxubWFpbigpO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQURBO0FBTUE7QUFnQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUEzQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFlQTs7OztBQUNBO0FBRUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.ts\n'
            );

            /***/
        },
});

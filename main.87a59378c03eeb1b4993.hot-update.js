webpackHotUpdate("main",{

/***/ "./src/components/grid.ts":
/*!********************************!*\
  !*** ./src/components/grid.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Deleting local variable in strict mode (249:8)\\nFile was processed with these loaders:\\n * ./node_modules/ts-loader/index.js\\nYou may need an additional loader to handle the result of these loaders.\\n|             return false;\\n|         this.removeChild(tile.getContainer(this.size));\\n>         delete tile;\\n|         return true;\\n|     };\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ncmlkLnRzLmpzIiwic291cmNlcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/grid.ts\n");

/***/ }),

/***/ "./src/components/tiles/tile.ts":
false,

/***/ "./src/components/tiles/wire_tile.ts":
false,

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar grid_1 = __webpack_require__(/*! ./components/grid */ \"./src/components/grid.ts\");\r\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils/index.ts\");\r\nvar config_1 = __webpack_require__(/*! ./config */ \"./src/config.ts\");\r\nvar gui_window_1 = __webpack_require__(/*! ./components/gui/gui_window */ \"./src/components/gui/gui_window.ts\");\r\nPIXI.utils.skipHello();\r\nvar load = function (app) {\r\n    return new Promise(function (resolve) {\r\n        return app.loader\r\n            .add(\"doge\", \"assets/sprites/doge-icon.svg\")\r\n            .load(function () { return resolve(); });\r\n    });\r\n};\r\nvar main = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    function update(delta) {\r\n        sprite.x = grid.gridToScreen(0.5, 0.5).x;\r\n        sprite.y = grid.gridToScreen(0.5, 0.5).y;\r\n    }\r\n    var app, grid, sprite, tileSelector;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                app = new PIXI.Application();\r\n                document.body.style.margin = \"0\";\r\n                app.renderer.view.style.position = \"absolute\";\r\n                app.renderer.view.style.display = \"block\";\r\n                app.renderer.resize(window.innerWidth, window.innerHeight);\r\n                document.body.appendChild(app.view);\r\n                return [4 /*yield*/, load(app)];\r\n            case 1:\r\n                _a.sent();\r\n                app.renderer.backgroundColor = config_1.default.backgroundColor;\r\n                grid = new grid_1.default(100);\r\n                app.stage.addChild(grid);\r\n                sprite = new PIXI.Sprite(app.loader.resources.doge.texture);\r\n                sprite.width = 20;\r\n                sprite.height = 20;\r\n                sprite.x = utils_1.width() / 2 - sprite.width / 2;\r\n                sprite.y = utils_1.height() / 2 - sprite.height / 2;\r\n                app.stage.addChild(sprite);\r\n                tileSelector = new gui_window_1.default(config_1.default.guiMargin, config_1.default.guiMargin, 150, utils_1.dimensions()[1] - config_1.default.guiMargin * 2, 0xaaaaaa);\r\n                app.stage.addChild(tileSelector);\r\n                utils_1.onResize(function () {\r\n                    var _a;\r\n                    (_a = app.renderer).resize.apply(_a, utils_1.dimensions());\r\n                    tileSelector.setSize(150, utils_1.dimensions()[1] - config_1.default.guiMargin * 2);\r\n                });\r\n                window.addEventListener(\"contextmenu\", function (e) { return e.preventDefault(); });\r\n                window.addEventListener(\"wheel\", function (e) {\r\n                    var hitObject = app.renderer.plugins.interaction.hitTest(new PIXI.Point(e.pageX, e.pageY), app.stage);\r\n                    if (hitObject != null) {\r\n                        utils_1.scrollListeners.forEach(function (eventObj) {\r\n                            if (eventObj.object == hitObject)\r\n                                eventObj.listener(e);\r\n                        });\r\n                    }\r\n                });\r\n                app.ticker.add(update);\r\n                return [2 /*return*/];\r\n        }\r\n    });\r\n}); };\r\nmain();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcclxuaW1wb3J0IEdyaWQgZnJvbSBcIi4vY29tcG9uZW50cy9ncmlkXCI7XHJcbmltcG9ydCB7XHJcbiAgICBkaW1lbnNpb25zLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgb25SZXNpemUsXHJcbiAgICB3aWR0aCxcclxuICAgIHNjcm9sbExpc3RlbmVycyxcclxuICAgIERpc3BsYXlPYmplY3RTY3JvbGxFdmVudCxcclxufSBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQgR1VJV2luZG93IGZyb20gXCIuL2NvbXBvbmVudHMvZ3VpL2d1aV93aW5kb3dcIjtcclxuXHJcblBJWEkudXRpbHMuc2tpcEhlbGxvKCk7XHJcblxyXG5jb25zdCBsb2FkID0gKGFwcDogUElYSS5BcHBsaWNhdGlvbikgPT5cclxuICAgIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PlxyXG4gICAgICAgIGFwcC5sb2FkZXJcclxuICAgICAgICAgICAgLmFkZChcImRvZ2VcIiwgXCJhc3NldHMvc3ByaXRlcy9kb2dlLWljb24uc3ZnXCIpXHJcbiAgICAgICAgICAgIC5sb2FkKCgpID0+IHJlc29sdmUoKSlcclxuICAgICk7XHJcblxyXG5jb25zdCBtYWluID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGFwcCA9IG5ldyBQSVhJLkFwcGxpY2F0aW9uKCk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW4gPSBcIjBcIjtcclxuICAgIGFwcC5yZW5kZXJlci52aWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgYXBwLnJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIGFwcC5yZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcC52aWV3KTtcclxuXHJcbiAgICBhd2FpdCBsb2FkKGFwcCk7XHJcblxyXG4gICAgYXBwLnJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGNvbmZpZy5iYWNrZ3JvdW5kQ29sb3I7XHJcblxyXG4gICAgbGV0IGdyaWQgPSBuZXcgR3JpZCgxMDApO1xyXG5cclxuICAgIGFwcC5zdGFnZS5hZGRDaGlsZChncmlkKTtcclxuXHJcbiAgICBsZXQgc3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKGFwcC5sb2FkZXIucmVzb3VyY2VzLmRvZ2UudGV4dHVyZSk7XHJcbiAgICBzcHJpdGUud2lkdGggPSAyMDtcclxuICAgIHNwcml0ZS5oZWlnaHQgPSAyMDtcclxuICAgIHNwcml0ZS54ID0gd2lkdGgoKSAvIDIgLSBzcHJpdGUud2lkdGggLyAyO1xyXG4gICAgc3ByaXRlLnkgPSBoZWlnaHQoKSAvIDIgLSBzcHJpdGUuaGVpZ2h0IC8gMjtcclxuICAgIGFwcC5zdGFnZS5hZGRDaGlsZChzcHJpdGUpO1xyXG5cclxuICAgIGxldCB0aWxlU2VsZWN0b3IgPSBuZXcgR1VJV2luZG93KGNvbmZpZy5ndWlNYXJnaW4sIGNvbmZpZy5ndWlNYXJnaW4sIDE1MCwgZGltZW5zaW9ucygpWzFdIC0gY29uZmlnLmd1aU1hcmdpbiAqIDIsIDB4YWFhYWFhKTtcclxuXHJcbiAgICBhcHAuc3RhZ2UuYWRkQ2hpbGQodGlsZVNlbGVjdG9yKTtcclxuXHJcbiAgICBvblJlc2l6ZSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLnJlbmRlcmVyLnJlc2l6ZSguLi5kaW1lbnNpb25zKCkpO1xyXG4gICAgICAgIHRpbGVTZWxlY3Rvci5zZXRTaXplKDE1MCwgZGltZW5zaW9ucygpWzFdIC0gY29uZmlnLmd1aU1hcmdpbiAqIDIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIChlOiBXaGVlbEV2ZW50KSA9PiB7XHJcbiAgICAgICAgbGV0IGhpdE9iamVjdCA9IGFwcC5yZW5kZXJlci5wbHVnaW5zLmludGVyYWN0aW9uLmhpdFRlc3QoXHJcbiAgICAgICAgICAgIG5ldyBQSVhJLlBvaW50KGUucGFnZVgsIGUucGFnZVkpLFxyXG4gICAgICAgICAgICBhcHAuc3RhZ2VcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChoaXRPYmplY3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzY3JvbGxMaXN0ZW5lcnMuZm9yRWFjaCgoZXZlbnRPYmo6IERpc3BsYXlPYmplY3RTY3JvbGxFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50T2JqLm9iamVjdCA9PSBoaXRPYmplY3QpIGV2ZW50T2JqLmxpc3RlbmVyKGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGUoZGVsdGE6IG51bWJlcikge1xyXG4gICAgICAgIHNwcml0ZS54ID0gZ3JpZC5ncmlkVG9TY3JlZW4oMC41LCAwLjUpLng7XHJcbiAgICAgICAgc3ByaXRlLnkgPSBncmlkLmdyaWRUb1NjcmVlbigwLjUsIDAuNSkueTtcclxuICAgIH1cclxuXHJcbiAgICBhcHAudGlja2VyLmFkZCh1cGRhdGUpO1xyXG59O1xyXG5cclxubWFpbigpO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBUUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFNQTtBQStDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFqREE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFPQTs7OztBQUNBO0FBRUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.ts\n");

/***/ }),

/***/ "./src/utils/directions.ts":
false,

/***/ "./src/utils/math.ts":
false

})
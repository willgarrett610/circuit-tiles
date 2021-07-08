webpackHotUpdate("main", {
    /***/ "./src/index.ts":
        /*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
            "use strict";
            eval(
                '\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError("Generator is already executing.");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar create_grid_1 = __webpack_require__(/*! ./create-grid */ "./src/create-grid.ts");\r\nvar load = function (app) {\r\n    return new Promise(function (resolve) {\r\n        return app.loader.add("assets/sprites/doge-icon.svg").load(function () { return resolve(); });\r\n    });\r\n};\r\nvar main = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    var app, sprite, grid, context;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                app = new PIXI.Application();\r\n                document.body.style.margin = "0";\r\n                app.renderer.view.style.position = "absolute";\r\n                app.renderer.view.style.display = "block";\r\n                app.renderer.resize(window.innerWidth, window.innerHeight);\r\n                document.body.appendChild(app.view);\r\n                return [4 /*yield*/, load(app)];\r\n            case 1:\r\n                _a.sent();\r\n                sprite = new PIXI.Sprite(app.loader.resources["assets/sprites/doge-icon.svg"].texture);\r\n                sprite.width = 200;\r\n                sprite.height = 200;\r\n                sprite.x = window.innerWidth / 2 - sprite.width / 2;\r\n                sprite.y = window.innerHeight / 2 - sprite.height / 2;\r\n                app.stage.addChild(sprite);\r\n                grid = create_grid_1.createGrid(app, 100, 0, 0);\r\n                app.stage.addChild(grid);\r\n                window.addEventListener("resize", function () {\r\n                    app.renderer.resize(window.innerWidth, window.innerHeight);\r\n                    sprite.x = window.innerWidth / 2 - sprite.width / 2;\r\n                    sprite.y = window.innerHeight / 2 - sprite.height / 2;\r\n                    grid = create_grid_1.createGrid(app, 100, 0, 0);\r\n                    // app.stage.removeChild(grid);\r\n                });\r\n                context = {\r\n                    velocity: { x: 1, y: 1 },\r\n                    sprite: sprite,\r\n                };\r\n                app.ticker.add(update, context);\r\n                return [2 /*return*/];\r\n        }\r\n    });\r\n}); };\r\nfunction update(delta) {\r\n    if (this.sprite.x <= 0 ||\r\n        this.sprite.x >= window.innerWidth - this.sprite.width) {\r\n        this.velocity.x = -this.velocity.x;\r\n    }\r\n    if (this.sprite.y <= 0 ||\r\n        this.sprite.y >= window.innerHeight - this.sprite.height) {\r\n        this.velocity.y = -this.velocity.y;\r\n    }\r\n    this.sprite.x += this.velocity.x;\r\n    this.sprite.y += this.velocity.y;\r\n}\r\nmain();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tIFwiLi9jcmVhdGUtZ3JpZFwiO1xuXG5jb25zdCBsb2FkID0gKGFwcDogUElYSS5BcHBsaWNhdGlvbikgPT5cbiAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT5cbiAgICAgICAgYXBwLmxvYWRlci5hZGQoXCJhc3NldHMvc3ByaXRlcy9kb2dlLWljb24uc3ZnXCIpLmxvYWQoKCkgPT4gcmVzb2x2ZSgpKVxuICAgICk7XG5cbmNvbnN0IG1haW4gPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGFwcCA9IG5ldyBQSVhJLkFwcGxpY2F0aW9uKCk7XG5cbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm1hcmdpbiA9IFwiMFwiO1xuICAgIGFwcC5yZW5kZXJlci52aWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIGFwcC5yZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgYXBwLnJlbmRlcmVyLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcC52aWV3KTtcblxuICAgIGF3YWl0IGxvYWQoYXBwKTtcbiAgICBsZXQgc3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKFxuICAgICAgICBhcHAubG9hZGVyLnJlc291cmNlc1tcImFzc2V0cy9zcHJpdGVzL2RvZ2UtaWNvbi5zdmdcIl0udGV4dHVyZVxuICAgICk7XG5cbiAgICBzcHJpdGUud2lkdGggPSAyMDA7XG4gICAgc3ByaXRlLmhlaWdodCA9IDIwMDtcbiAgICBzcHJpdGUueCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMiAtIHNwcml0ZS53aWR0aCAvIDI7XG4gICAgc3ByaXRlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIC0gc3ByaXRlLmhlaWdodCAvIDI7XG4gICAgYXBwLnN0YWdlLmFkZENoaWxkKHNwcml0ZSk7XG5cbiAgICBsZXQgZ3JpZCA9IGNyZWF0ZUdyaWQoYXBwLCAxMDAsIDAsIDApO1xuICAgIGFwcC5zdGFnZS5hZGRDaGlsZChncmlkKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgICAgYXBwLnJlbmRlcmVyLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgc3ByaXRlLnggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgLSBzcHJpdGUud2lkdGggLyAyO1xuICAgICAgICBzcHJpdGUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDIgLSBzcHJpdGUuaGVpZ2h0IC8gMjtcblxuICAgICAgICBncmlkID0gY3JlYXRlR3JpZChhcHAsIDEwMCwgMCwgMCk7XG4gICAgICAgIC8vIGFwcC5zdGFnZS5yZW1vdmVDaGlsZChncmlkKTtcbiAgICB9KTtcblxuICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICB2ZWxvY2l0eTogeyB4OiAxLCB5OiAxIH0sXG4gICAgICAgIHNwcml0ZSxcbiAgICB9O1xuXG4gICAgYXBwLnRpY2tlci5hZGQodXBkYXRlLCBjb250ZXh0KTtcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZSh0aGlzOiBhbnksIGRlbHRhOiBudW1iZXIpIHtcbiAgICBpZiAoXG4gICAgICAgIHRoaXMuc3ByaXRlLnggPD0gMCB8fFxuICAgICAgICB0aGlzLnNwcml0ZS54ID49IHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5zcHJpdGUud2lkdGhcbiAgICApIHtcbiAgICAgICAgdGhpcy52ZWxvY2l0eS54ID0gLXRoaXMudmVsb2NpdHkueDtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgICB0aGlzLnNwcml0ZS55IDw9IDAgfHxcbiAgICAgICAgdGhpcy5zcHJpdGUueSA+PSB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLnNwcml0ZS5oZWlnaHRcbiAgICApIHtcbiAgICAgICAgdGhpcy52ZWxvY2l0eS55ID0gLXRoaXMudmVsb2NpdHkueTtcbiAgICB9XG4gICAgdGhpcy5zcHJpdGUueCArPSB0aGlzLnZlbG9jaXR5Lng7XG4gICAgdGhpcy5zcHJpdGUueSArPSB0aGlzLnZlbG9jaXR5Lnk7XG59XG5cbm1haW4oKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFEQTtBQUlBOzs7OztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUFBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.ts\n'
            );

            /***/
        },
});

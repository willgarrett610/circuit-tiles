webpackHotUpdate("main", {
    /***/ "./src/create-grid.ts":
        /*!****************************!*\
  !*** ./src/create-grid.ts ***!
  \****************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
            "use strict";
            eval(
                '\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar Line = /** @class */ (function (_super) {\r\n    __extends(Line, _super);\r\n    function Line(points, lineSize, lineColor) {\r\n        if (lineSize === void 0) { lineSize = 5; }\r\n        if (lineColor === void 0) { lineColor = 0x000000; }\r\n        var _this = _super.call(this) || this;\r\n        _this.lineWidth = lineSize;\r\n        _this.lineColor = lineColor;\r\n        _this.points = points;\r\n        _this.lineStyle(_this.lineWidth, _this.lineColor);\r\n        _this.moveTo(points[0], points[1]);\r\n        _this.lineTo(points[2], points[3]);\r\n        return _this;\r\n    }\r\n    Line.prototype.updatePoints = function (p) {\r\n        var _this = this;\r\n        var points = (this.points = p.map(function (val, index) { return val || _this.points[index]; }));\r\n        var s = this.lineWidth, c = this.lineColor;\r\n        this.clear();\r\n        this.lineStyle(s, c);\r\n        this.moveTo(points[0], points[1]);\r\n        this.lineTo(points[2], points[3]);\r\n    };\r\n    return Line;\r\n}(PIXI.Graphics));\r\nfunction createGrid(app, size, offsetX, offsetY) {\r\n    var tileXCount = Math.ceil(app.renderer.width / size);\r\n    var tileYCount = Math.ceil(app.renderer.height / size);\r\n    var container = new PIXI.Container();\r\n    var generate = function () {\r\n        var output = [];\r\n        for (var x = 0; x <= tileXCount; x++) {\r\n            var line = new Line([x * size, 0, x * size, app.renderer.height], 5, 0xeeeeee);\r\n            output.push(line);\r\n        }\r\n        for (var y = 0; y <= tileYCount; y++) {\r\n            var line = new Line([0, y * size, app.renderer.width, y * size], 5, 0xeeeeee);\r\n            output.push(line);\r\n        }\r\n        return output;\r\n    };\r\n    window.addEventListener("resize", function () {\r\n        container.removeChildren();\r\n    });\r\n    return container;\r\n}\r\nexports.createGrid = createGrid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY3JlYXRlLWdyaWQudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2NyZWF0ZS1ncmlkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcclxuXHJcbmNsYXNzIExpbmUgZXh0ZW5kcyBQSVhJLkdyYXBoaWNzIHtcclxuICAgIHBvaW50czogbnVtYmVyW107XHJcbiAgICBsaW5lV2lkdGg6IG51bWJlcjtcclxuICAgIGxpbmVDb2xvcjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHBvaW50czogbnVtYmVyW10sXHJcbiAgICAgICAgbGluZVNpemU6IG51bWJlciA9IDUsXHJcbiAgICAgICAgbGluZUNvbG9yOiBudW1iZXIgPSAweDAwMDAwMFxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5saW5lV2lkdGggPSBsaW5lU2l6ZTtcclxuICAgICAgICB0aGlzLmxpbmVDb2xvciA9IGxpbmVDb2xvcjtcclxuXHJcbiAgICAgICAgdGhpcy5wb2ludHMgPSBwb2ludHM7XHJcblxyXG4gICAgICAgIHRoaXMubGluZVN0eWxlKHRoaXMubGluZVdpZHRoLCB0aGlzLmxpbmVDb2xvcik7XHJcblxyXG4gICAgICAgIHRoaXMubW92ZVRvKHBvaW50c1swXSwgcG9pbnRzWzFdKTtcclxuICAgICAgICB0aGlzLmxpbmVUbyhwb2ludHNbMl0sIHBvaW50c1szXSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUG9pbnRzKHA6IG51bWJlcltdKSB7XHJcbiAgICAgICAgdmFyIHBvaW50cyA9ICh0aGlzLnBvaW50cyA9IHAubWFwKFxyXG4gICAgICAgICAgICAodmFsLCBpbmRleCkgPT4gdmFsIHx8IHRoaXMucG9pbnRzW2luZGV4XVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICB2YXIgcyA9IHRoaXMubGluZVdpZHRoLFxyXG4gICAgICAgICAgICBjID0gdGhpcy5saW5lQ29sb3I7XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmxpbmVTdHlsZShzLCBjKTtcclxuICAgICAgICB0aGlzLm1vdmVUbyhwb2ludHNbMF0sIHBvaW50c1sxXSk7XHJcbiAgICAgICAgdGhpcy5saW5lVG8ocG9pbnRzWzJdLCBwb2ludHNbM10pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR3JpZChcclxuICAgIGFwcDogUElYSS5BcHBsaWNhdGlvbixcclxuICAgIHNpemU6IG51bWJlcixcclxuICAgIG9mZnNldFg6IG51bWJlcixcclxuICAgIG9mZnNldFk6IG51bWJlclxyXG4pOiBQSVhJLkNvbnRhaW5lciB7XHJcbiAgICBjb25zdCB0aWxlWENvdW50ID0gTWF0aC5jZWlsKGFwcC5yZW5kZXJlci53aWR0aCAvIHNpemUpO1xyXG4gICAgY29uc3QgdGlsZVlDb3VudCA9IE1hdGguY2VpbChhcHAucmVuZGVyZXIuaGVpZ2h0IC8gc2l6ZSk7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lciA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG5cclxuICAgIGNvbnN0IGdlbmVyYXRlID0gKCk6IFBJWEkuR3JhcGhpY3NbXSA9PiB7XHJcbiAgICAgICAgbGV0IG91dHB1dCA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSB0aWxlWENvdW50OyB4KyspIHtcclxuICAgICAgICAgICAgdmFyIGxpbmUgPSBuZXcgTGluZShcclxuICAgICAgICAgICAgICAgIFt4ICogc2l6ZSwgMCwgeCAqIHNpemUsIGFwcC5yZW5kZXJlci5oZWlnaHRdLFxyXG4gICAgICAgICAgICAgICAgNSxcclxuICAgICAgICAgICAgICAgIDB4ZWVlZWVlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGxpbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gdGlsZVlDb3VudDsgeSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lID0gbmV3IExpbmUoXHJcbiAgICAgICAgICAgICAgICBbMCwgeSAqIHNpemUsIGFwcC5yZW5kZXJlci53aWR0aCwgeSAqIHNpemVdLFxyXG4gICAgICAgICAgICAgICAgNSxcclxuICAgICAgICAgICAgICAgIDB4ZWVlZWVlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGxpbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZHJlbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUE7QUFBQTtBQUtBO0FBRUE7QUFDQTtBQUhBO0FBT0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBOztBQUNBO0FBRUE7QUFBQTtBQUNBO0FBSUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBTUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFLQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQXhDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/create-grid.ts\n'
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
                '\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError("Generator is already executing.");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar create_grid_1 = __webpack_require__(/*! ./create-grid */ "./src/create-grid.ts");\r\nvar load = function (app) {\r\n    return new Promise(function (resolve) {\r\n        return app.loader.add("assets/sprites/doge-icon.svg").load(function () { return resolve(); });\r\n    });\r\n};\r\nvar main = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    var app, sprite, grid, context;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                app = new PIXI.Application();\r\n                document.body.style.margin = "0";\r\n                app.renderer.view.style.position = "absolute";\r\n                app.renderer.view.style.display = "block";\r\n                app.renderer.resize(window.innerWidth, window.innerHeight);\r\n                document.body.appendChild(app.view);\r\n                return [4 /*yield*/, load(app)];\r\n            case 1:\r\n                _a.sent();\r\n                sprite = new PIXI.Sprite(app.loader.resources["assets/sprites/doge-icon.svg"].texture);\r\n                sprite.width = 200;\r\n                sprite.height = 200;\r\n                sprite.x = window.innerWidth / 2 - sprite.width / 2;\r\n                sprite.y = window.innerHeight / 2 - sprite.height / 2;\r\n                app.stage.addChild(sprite);\r\n                grid = create_grid_1.createGrid(app, 100, 0, 0);\r\n                app.stage.addChild(grid);\r\n                window.addEventListener("resize", function () {\r\n                    app.renderer.resize(window.innerWidth, window.innerHeight);\r\n                    sprite.x = window.innerWidth / 2 - sprite.width / 2;\r\n                    sprite.y = window.innerHeight / 2 - sprite.height / 2;\r\n                });\r\n                context = {\r\n                    velocity: { x: 1, y: 1 },\r\n                    sprite: sprite,\r\n                };\r\n                app.ticker.add(update, context);\r\n                return [2 /*return*/];\r\n        }\r\n    });\r\n}); };\r\nfunction update(delta) {\r\n    if (this.sprite.x <= 0 ||\r\n        this.sprite.x >= window.innerWidth - this.sprite.width) {\r\n        this.velocity.x = -this.velocity.x;\r\n    }\r\n    if (this.sprite.y <= 0 ||\r\n        this.sprite.y >= window.innerHeight - this.sprite.height) {\r\n        this.velocity.y = -this.velocity.y;\r\n    }\r\n    this.sprite.x += this.velocity.x;\r\n    this.sprite.y += this.velocity.y;\r\n}\r\nmain();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tIFwiLi9jcmVhdGUtZ3JpZFwiO1xuXG5jb25zdCBsb2FkID0gKGFwcDogUElYSS5BcHBsaWNhdGlvbikgPT5cbiAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT5cbiAgICAgICAgYXBwLmxvYWRlci5hZGQoXCJhc3NldHMvc3ByaXRlcy9kb2dlLWljb24uc3ZnXCIpLmxvYWQoKCkgPT4gcmVzb2x2ZSgpKVxuICAgICk7XG5cbmNvbnN0IG1haW4gPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGFwcCA9IG5ldyBQSVhJLkFwcGxpY2F0aW9uKCk7XG5cbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm1hcmdpbiA9IFwiMFwiO1xuICAgIGFwcC5yZW5kZXJlci52aWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIGFwcC5yZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgYXBwLnJlbmRlcmVyLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcC52aWV3KTtcblxuICAgIGF3YWl0IGxvYWQoYXBwKTtcbiAgICBsZXQgc3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKFxuICAgICAgICBhcHAubG9hZGVyLnJlc291cmNlc1tcImFzc2V0cy9zcHJpdGVzL2RvZ2UtaWNvbi5zdmdcIl0udGV4dHVyZVxuICAgICk7XG5cbiAgICBzcHJpdGUud2lkdGggPSAyMDA7XG4gICAgc3ByaXRlLmhlaWdodCA9IDIwMDtcbiAgICBzcHJpdGUueCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMiAtIHNwcml0ZS53aWR0aCAvIDI7XG4gICAgc3ByaXRlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIC0gc3ByaXRlLmhlaWdodCAvIDI7XG4gICAgYXBwLnN0YWdlLmFkZENoaWxkKHNwcml0ZSk7XG5cbiAgICBsZXQgZ3JpZCA9IGNyZWF0ZUdyaWQoYXBwLCAxMDAsIDAsIDApO1xuICAgIGFwcC5zdGFnZS5hZGRDaGlsZChncmlkKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgICAgYXBwLnJlbmRlcmVyLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgc3ByaXRlLnggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgLSBzcHJpdGUud2lkdGggLyAyO1xuICAgICAgICBzcHJpdGUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDIgLSBzcHJpdGUuaGVpZ2h0IC8gMjtcbiAgICB9KTtcblxuICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICB2ZWxvY2l0eTogeyB4OiAxLCB5OiAxIH0sXG4gICAgICAgIHNwcml0ZSxcbiAgICB9O1xuXG4gICAgYXBwLnRpY2tlci5hZGQodXBkYXRlLCBjb250ZXh0KTtcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZSh0aGlzOiBhbnksIGRlbHRhOiBudW1iZXIpIHtcbiAgICBpZiAoXG4gICAgICAgIHRoaXMuc3ByaXRlLnggPD0gMCB8fFxuICAgICAgICB0aGlzLnNwcml0ZS54ID49IHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5zcHJpdGUud2lkdGhcbiAgICApIHtcbiAgICAgICAgdGhpcy52ZWxvY2l0eS54ID0gLXRoaXMudmVsb2NpdHkueDtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgICB0aGlzLnNwcml0ZS55IDw9IDAgfHxcbiAgICAgICAgdGhpcy5zcHJpdGUueSA+PSB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLnNwcml0ZS5oZWlnaHRcbiAgICApIHtcbiAgICAgICAgdGhpcy52ZWxvY2l0eS55ID0gLXRoaXMudmVsb2NpdHkueTtcbiAgICB9XG4gICAgdGhpcy5zcHJpdGUueCArPSB0aGlzLnZlbG9jaXR5Lng7XG4gICAgdGhpcy5zcHJpdGUueSArPSB0aGlzLnZlbG9jaXR5Lnk7XG59XG5cbm1haW4oKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFEQTtBQUlBOzs7OztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUFBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.ts\n'
            );

            /***/
        },
});

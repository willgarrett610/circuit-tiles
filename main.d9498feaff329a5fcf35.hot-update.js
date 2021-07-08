webpackHotUpdate("main", {
    /***/ "./src/create-grid.ts":
        /*!****************************!*\
  !*** ./src/create-grid.ts ***!
  \****************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
            "use strict";
            eval(
                '\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== "function" && b !== null)\r\n            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nexports.createGrid = void 0;\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar utils_1 = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");\r\nvar Line = /** @class */ (function (_super) {\r\n    __extends(Line, _super);\r\n    function Line(points, lineSize, lineColor) {\r\n        if (lineSize === void 0) { lineSize = 5; }\r\n        if (lineColor === void 0) { lineColor = 0x000000; }\r\n        var _this = _super.call(this) || this;\r\n        _this.lineWidth = lineSize;\r\n        _this.lineColor = lineColor;\r\n        _this.points = points;\r\n        _this.lineStyle(_this.lineWidth, _this.lineColor);\r\n        _this.moveTo(points[0], points[1]);\r\n        _this.lineTo(points[2], points[3]);\r\n        return _this;\r\n    }\r\n    Line.prototype.updatePoints = function (p) {\r\n        var _this = this;\r\n        var points = (this.points = p.map(function (val, index) { return val || _this.points[index]; }));\r\n        var s = this.lineWidth, c = this.lineColor;\r\n        this.clear();\r\n        this.lineStyle(s, c);\r\n        this.moveTo(points[0], points[1]);\r\n        this.lineTo(points[2], points[3]);\r\n    };\r\n    return Line;\r\n}(PIXI.Graphics));\r\nfunction createGrid(size, offsetX, offsetY) {\r\n    var container = new PIXI.Container();\r\n    var generate = function (width, height) {\r\n        var tileXCount = Math.ceil(width / size);\r\n        var tileYCount = Math.ceil(height / size);\r\n        var output = [];\r\n        for (var x = 0; x <= tileXCount; x++) {\r\n            var line = new Line([x * size + offsetX, 0, x * size + offsetX, height], 5, 0xeeeeee);\r\n            output.push(line);\r\n        }\r\n        for (var y = 0; y <= tileYCount; y++) {\r\n            var line = new Line([0, y * size + offsetY, width, y * size + offsetY], 5, 0xeeeeee);\r\n            output.push(line);\r\n        }\r\n        return output;\r\n    };\r\n    generate.apply(void 0, utils_1.dimensions()).forEach(function (child) { return container.addChild(child); });\r\n    utils_1.onResize(function () {\r\n        container.removeChildren();\r\n        generate.apply(void 0, utils_1.dimensions()).forEach(function (child) { return container.addChild(child); });\r\n    });\r\n    return container;\r\n}\r\nexports.createGrid = createGrid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY3JlYXRlLWdyaWQudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2NyZWF0ZS1ncmlkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcclxuaW1wb3J0IHsgZGltZW5zaW9ucywgb25SZXNpemUgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5cclxuY2xhc3MgTGluZSBleHRlbmRzIFBJWEkuR3JhcGhpY3Mge1xyXG4gICAgcG9pbnRzOiBudW1iZXJbXTtcclxuICAgIGxpbmVXaWR0aDogbnVtYmVyO1xyXG4gICAgbGluZUNvbG9yOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcG9pbnRzOiBudW1iZXJbXSxcclxuICAgICAgICBsaW5lU2l6ZTogbnVtYmVyID0gNSxcclxuICAgICAgICBsaW5lQ29sb3I6IG51bWJlciA9IDB4MDAwMDAwXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmxpbmVXaWR0aCA9IGxpbmVTaXplO1xyXG4gICAgICAgIHRoaXMubGluZUNvbG9yID0gbGluZUNvbG9yO1xyXG5cclxuICAgICAgICB0aGlzLnBvaW50cyA9IHBvaW50cztcclxuXHJcbiAgICAgICAgdGhpcy5saW5lU3R5bGUodGhpcy5saW5lV2lkdGgsIHRoaXMubGluZUNvbG9yKTtcclxuXHJcbiAgICAgICAgdGhpcy5tb3ZlVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xyXG4gICAgICAgIHRoaXMubGluZVRvKHBvaW50c1syXSwgcG9pbnRzWzNdKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQb2ludHMocDogbnVtYmVyW10pIHtcclxuICAgICAgICB2YXIgcG9pbnRzID0gKHRoaXMucG9pbnRzID0gcC5tYXAoXHJcbiAgICAgICAgICAgICh2YWwsIGluZGV4KSA9PiB2YWwgfHwgdGhpcy5wb2ludHNbaW5kZXhdXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIHZhciBzID0gdGhpcy5saW5lV2lkdGgsXHJcbiAgICAgICAgICAgIGMgPSB0aGlzLmxpbmVDb2xvcjtcclxuXHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMubGluZVN0eWxlKHMsIGMpO1xyXG4gICAgICAgIHRoaXMubW92ZVRvKHBvaW50c1swXSwgcG9pbnRzWzFdKTtcclxuICAgICAgICB0aGlzLmxpbmVUbyhwb2ludHNbMl0sIHBvaW50c1szXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHcmlkKFxyXG4gICAgc2l6ZTogbnVtYmVyLFxyXG4gICAgb2Zmc2V0WDogbnVtYmVyLFxyXG4gICAgb2Zmc2V0WTogbnVtYmVyXHJcbik6IGFueSB7XHJcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcblxyXG4gICAgY29uc3QgZ2VuZXJhdGUgPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBQSVhJLkdyYXBoaWNzW10gPT4ge1xyXG4gICAgICAgIGNvbnN0IHRpbGVYQ291bnQgPSBNYXRoLmNlaWwod2lkdGggLyBzaXplKTtcclxuICAgICAgICBjb25zdCB0aWxlWUNvdW50ID0gTWF0aC5jZWlsKGhlaWdodCAvIHNpemUpO1xyXG5cclxuICAgICAgICBsZXQgb3V0cHV0ID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDw9IHRpbGVYQ291bnQ7IHgrKykge1xyXG4gICAgICAgICAgICB2YXIgbGluZSA9IG5ldyBMaW5lKFxyXG4gICAgICAgICAgICAgICAgW3ggKiBzaXplICsgb2Zmc2V0WCwgMCwgeCAqIHNpemUgKyBvZmZzZXRYLCBoZWlnaHRdLFxyXG4gICAgICAgICAgICAgICAgNSxcclxuICAgICAgICAgICAgICAgIDB4ZWVlZWVlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGxpbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gdGlsZVlDb3VudDsgeSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lID0gbmV3IExpbmUoXHJcbiAgICAgICAgICAgICAgICBbMCwgeSAqIHNpemUgKyBvZmZzZXRZLCB3aWR0aCwgeSAqIHNpemUgKyBvZmZzZXRZXSxcclxuICAgICAgICAgICAgICAgIDUsXHJcbiAgICAgICAgICAgICAgICAweGVlZWVlZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChsaW5lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGdlbmVyYXRlKC4uLmRpbWVuc2lvbnMoKSkuZm9yRWFjaCgoY2hpbGQpID0+IGNvbnRhaW5lci5hZGRDaGlsZChjaGlsZCkpO1xyXG5cclxuICAgIG9uUmVzaXplKCgpID0+IHtcclxuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGRyZW4oKTtcclxuICAgICAgICBnZW5lcmF0ZSguLi5kaW1lbnNpb25zKCkpLmZvckVhY2goKGNoaWxkKSA9PiBjb250YWluZXIuYWRkQ2hpbGQoY2hpbGQpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFBQTtBQUtBO0FBRUE7QUFDQTtBQUhBO0FBT0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBOztBQUNBO0FBRUE7QUFBQTtBQUNBO0FBSUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBS0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFLQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUExQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/create-grid.ts\n'
            );

            /***/
        },
});

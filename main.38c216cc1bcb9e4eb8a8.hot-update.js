webpackHotUpdate("main", {
    /***/ "./src/components/grid.ts":
        /*!********************************!*\
  !*** ./src/components/grid.ts ***!
  \********************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
            "use strict";
            eval(
                '\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== "function" && b !== null)\r\n            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar utils_1 = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");\r\nvar math_1 = __webpack_require__(/*! ../utils/math */ "./src/utils/math.ts");\r\nvar config_1 = __webpack_require__(/*! ../config */ "./src/config.ts");\r\nvar Grid = /** @class */ (function (_super) {\r\n    __extends(Grid, _super);\r\n    function Grid(size) {\r\n        var _this = _super.call(this) || this;\r\n        _this.mouseMove = function (event) {\r\n            var e = event.data.originalEvent;\r\n            _this.mousePos = [e.pageX, e.pageY];\r\n            // console.log(this.mousePos);\r\n            if (!utils_1.mouseDown.left || !e.shiftKey)\r\n                return;\r\n            _this.x += e.movementX;\r\n            _this.y += e.movementY;\r\n            // console.log({x: this.x, y: this.y});\r\n            _this.update();\r\n        };\r\n        _this.update = function () {\r\n            _this.removeChildren();\r\n            _this.generateChildren().forEach(function (child) { return _this.addChild(child); });\r\n        };\r\n        /**\r\n         * From screen space to grid space\r\n         * @param x X in screen space\r\n         * @param y Y in screen space\r\n         * @returns Coordinates in grid space\r\n         */\r\n        _this.screenToGrid = function (x, y) { return ({\r\n            x: (-_this.x + x) / _this.size,\r\n            y: (-_this.y + y) / _this.size,\r\n        }); };\r\n        /**\r\n         * From grid space to screen space (Top Left corner)\r\n         * @param x X in grid space\r\n         * @param y Y in grid space\r\n         * @returns Coordinates in screen space\r\n         */\r\n        _this.gridToScreen = function (x, y) { return ({\r\n            x: Math.floor(x) * _this.size + _this.x,\r\n            y: Math.floor(y) * _this.size + _this.y,\r\n        }); };\r\n        _this.size = size;\r\n        _this.tiles = [];\r\n        _this.mousePos = [0, 0];\r\n        _this.generateChildren().forEach(function (child) { return _this.addChild(child); });\r\n        utils_1.onResize(_this.update.bind(_this));\r\n        _this.interactive = true;\r\n        // this.on("wheel", (e:PIXI.FederatedEvent) => console.log("scroll"));\r\n        utils_1.onScroll(_this, _this.scroll);\r\n        _this.on("mousemove", _this.mouseMove);\r\n        return _this;\r\n        // onMouseMove(this.mouseMove.bind(this));\r\n    }\r\n    Grid.prototype.addTile = function () {\r\n    };\r\n    Grid.prototype.scroll = function (e) {\r\n        var mult = 1 / (config_1.default.zoomCoeff * e.deltaY);\r\n        if (mult < 0)\r\n            mult = -1 / mult;\r\n        // console.log(mult);\r\n        var prevPos = this.screenToGrid(e.pageX, e.pageY);\r\n        this.size = Math.round(mult * this.size);\r\n        this.size = math_1.clamp(this.size, 20, 350);\r\n        var newPos = this.screenToGrid(e.pageX, e.pageY);\r\n        // console.log(prevPos);\r\n        // console.log(newPos);\r\n        this.x += (newPos.x - prevPos.x) * this.size;\r\n        this.y += (newPos.y - prevPos.y) * this.size;\r\n        // console.log({ size: this.size });\r\n        this.update();\r\n    };\r\n    Grid.prototype.generateChildren = function () {\r\n        var width = utils_1.dimensions()[0];\r\n        var height = utils_1.dimensions()[1];\r\n        var tileXCount = Math.floor(width / this.size);\r\n        var tileYCount = Math.floor(height / this.size);\r\n        var lineGraphics = new PIXI.Graphics();\r\n        var output = [];\r\n        for (var x = -Math.ceil(this.x / this.size); x <= tileXCount - Math.floor(this.x / this.size); x++) {\r\n            lineGraphics.beginFill(config_1.default.lineColor);\r\n            lineGraphics.lineStyle(0);\r\n            lineGraphics.drawRect(x * this.size, -this.y, config_1.default.lineWidth, height);\r\n        }\r\n        for (var y = -Math.ceil(this.y / this.size); y <= tileYCount - Math.floor(this.y / this.size); y++) {\r\n            lineGraphics.beginFill(config_1.default.lineColor);\r\n            lineGraphics.lineStyle(0);\r\n            lineGraphics.drawRect(-this.x, y * this.size, width, config_1.default.lineWidth);\r\n        }\r\n        var gridPos = this.screenToGrid(this.mousePos[0], this.mousePos[1]);\r\n        gridPos.x = Math.floor(gridPos.x) * this.size;\r\n        gridPos.y = Math.floor(gridPos.y) * this.size;\r\n        var hlTile = new PIXI.Graphics();\r\n        hlTile.beginFill(config_1.default.highlightTileColor);\r\n        hlTile.lineStyle(0);\r\n        hlTile.drawRect(gridPos.x + (config_1.default.lineWidth / 2), gridPos.y + (config_1.default.lineWidth / 2), this.size, this.size);\r\n        output.push(hlTile);\r\n        output.push(lineGraphics);\r\n        return output;\r\n    };\r\n    return Grid;\r\n}(PIXI.Container));\r\nexports.default = Grid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ncmlkLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL2dyaWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgZGltZW5zaW9ucyxcclxuICAgIG1vdXNlRG93bixcclxuICAgIG9uUmVzaXplLFxyXG4gICAgb25TY3JvbGxcclxufSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgY2xhbXAgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aFwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IFRpbGUgZnJvbSBcIi4vdGlsZXMvdGlsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZCBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcclxuXHJcbiAgICBzaXplOiBudW1iZXI7XHJcbiAgICB0aWxlczogVGlsZVtdO1xyXG5cclxuICAgIG1vdXNlUG9zOiBbeDogbnVtYmVyLCB5OiBudW1iZXJdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgICAgICB0aGlzLnRpbGVzID0gW107XHJcbiAgICAgICAgdGhpcy5tb3VzZVBvcyA9IFswLDBdO1xyXG5cclxuICAgICAgICB0aGlzLmdlbmVyYXRlQ2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4gdGhpcy5hZGRDaGlsZChjaGlsZCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG9uUmVzaXplKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB0aGlzLmludGVyYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5vbihcIndoZWVsXCIsIChlOlBJWEkuRmVkZXJhdGVkRXZlbnQpID0+IGNvbnNvbGUubG9nKFwic2Nyb2xsXCIpKTtcclxuICAgICAgICBvblNjcm9sbCh0aGlzLCB0aGlzLnNjcm9sbCk7XHJcblxyXG4gICAgICAgIHRoaXMub24oXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZU1vdmUpO1xyXG4gICAgICAgIC8vIG9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRpbGUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2Nyb2xsKGU6IFdoZWVsRXZlbnQpIHtcclxuICAgICAgICBsZXQgbXVsdCA9IDEvKGNvbmZpZy56b29tQ29lZmYgKiBlLmRlbHRhWSk7XHJcbiAgICAgICAgaWYgKG11bHQgPCAwKSBtdWx0ID0gLTEvbXVsdDtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhtdWx0KTtcclxuXHJcbiAgICAgICAgbGV0IHByZXZQb3MgPSB0aGlzLnNjcmVlblRvR3JpZChlLnBhZ2VYLCBlLnBhZ2VZKTtcclxuXHJcbiAgICAgICAgdGhpcy5zaXplID0gTWF0aC5yb3VuZChtdWx0KnRoaXMuc2l6ZSk7XHJcbiAgICAgICAgdGhpcy5zaXplID0gY2xhbXAodGhpcy5zaXplLCAyMCwgMzUwKTtcclxuXHJcbiAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKGUucGFnZVgsIGUucGFnZVkpO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcmV2UG9zKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdQb3MpO1xyXG5cclxuICAgICAgICB0aGlzLnggKz0gKG5ld1Bvcy54LXByZXZQb3MueCkgKiB0aGlzLnNpemU7XHJcbiAgICAgICAgdGhpcy55ICs9IChuZXdQb3MueS1wcmV2UG9zLnkpICogdGhpcy5zaXplO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh7IHNpemU6IHRoaXMuc2l6ZSB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3VzZU1vdmUgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGxldCBlID0gZXZlbnQuZGF0YS5vcmlnaW5hbEV2ZW50IGFzIFBvaW50ZXJFdmVudDtcclxuICAgICAgICB0aGlzLm1vdXNlUG9zID0gW2UucGFnZVgsIGUucGFnZVldO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm1vdXNlUG9zKTtcclxuICAgICAgICBpZiAoIW1vdXNlRG93bi5sZWZ0IHx8ICFlLnNoaWZ0S2V5KSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMueCArPSBlLm1vdmVtZW50WDtcclxuICAgICAgICB0aGlzLnkgKz0gZS5tb3ZlbWVudFk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHt4OiB0aGlzLngsIHk6IHRoaXMueX0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlQ2hpbGRyZW4oKTogUElYSS5HcmFwaGljc1tdIHtcclxuICAgICAgICBsZXQgd2lkdGggPSBkaW1lbnNpb25zKClbMF07XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IGRpbWVuc2lvbnMoKVsxXTtcclxuICAgICAgICBjb25zdCB0aWxlWENvdW50ID0gTWF0aC5mbG9vcih3aWR0aCAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgY29uc3QgdGlsZVlDb3VudCA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gdGhpcy5zaXplKTtcclxuXHJcbiAgICAgICAgbGV0IGxpbmVHcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcblxyXG4gICAgICAgIGxldCBvdXRwdXQgPSBbXTtcclxuICAgICAgICBmb3IgKFxyXG4gICAgICAgICAgICBsZXQgeCA9IC1NYXRoLmNlaWwodGhpcy54IC8gdGhpcy5zaXplKTtcclxuICAgICAgICAgICAgeCA8PSB0aWxlWENvdW50IC0gTWF0aC5mbG9vcih0aGlzLnggLyB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICB4KytcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgbGluZUdyYXBoaWNzLmJlZ2luRmlsbChjb25maWcubGluZUNvbG9yKTtcclxuICAgICAgICAgICAgbGluZUdyYXBoaWNzLmxpbmVTdHlsZSgwKTtcclxuICAgICAgICAgICAgbGluZUdyYXBoaWNzLmRyYXdSZWN0KHggKiB0aGlzLnNpemUsIC10aGlzLnksIGNvbmZpZy5saW5lV2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKFxyXG4gICAgICAgICAgICBsZXQgeSA9IC1NYXRoLmNlaWwodGhpcy55IC8gdGhpcy5zaXplKTtcclxuICAgICAgICAgICAgeSA8PSB0aWxlWUNvdW50IC0gTWF0aC5mbG9vcih0aGlzLnkgLyB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICB5KytcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgbGluZUdyYXBoaWNzLmJlZ2luRmlsbChjb25maWcubGluZUNvbG9yKTtcclxuICAgICAgICAgICAgbGluZUdyYXBoaWNzLmxpbmVTdHlsZSgwKTtcclxuICAgICAgICAgICAgbGluZUdyYXBoaWNzLmRyYXdSZWN0KC10aGlzLngsIHkgKiB0aGlzLnNpemUsIHdpZHRoLCBjb25maWcubGluZVdpZHRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBncmlkUG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQodGhpcy5tb3VzZVBvc1swXSwgdGhpcy5tb3VzZVBvc1sxXSk7XHJcbiAgICAgICAgZ3JpZFBvcy54ID0gTWF0aC5mbG9vcihncmlkUG9zLngpKnRoaXMuc2l6ZTtcclxuICAgICAgICBncmlkUG9zLnkgPSBNYXRoLmZsb29yKGdyaWRQb3MueSkqdGhpcy5zaXplO1xyXG5cclxuICAgICAgICBsZXQgaGxUaWxlID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICBobFRpbGUuYmVnaW5GaWxsKGNvbmZpZy5oaWdobGlnaHRUaWxlQ29sb3IpO1xyXG4gICAgICAgIGhsVGlsZS5saW5lU3R5bGUoMCk7XHJcbiAgICAgICAgaGxUaWxlLmRyYXdSZWN0KGdyaWRQb3MueCArIChjb25maWcubGluZVdpZHRoIC8gMiksIGdyaWRQb3MueSArIChjb25maWcubGluZVdpZHRoIC8gMiksIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcclxuXHJcbiAgICAgICAgb3V0cHV0LnB1c2goaGxUaWxlKTtcclxuICAgICAgICBvdXRwdXQucHVzaChsaW5lR3JhcGhpY3MpO1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHRoaXMuYWRkQ2hpbGQoY2hpbGQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZyb20gc2NyZWVuIHNwYWNlIHRvIGdyaWQgc3BhY2VcclxuICAgICAqIEBwYXJhbSB4IFggaW4gc2NyZWVuIHNwYWNlXHJcbiAgICAgKiBAcGFyYW0geSBZIGluIHNjcmVlbiBzcGFjZVxyXG4gICAgICogQHJldHVybnMgQ29vcmRpbmF0ZXMgaW4gZ3JpZCBzcGFjZVxyXG4gICAgICovXHJcbiAgICBzY3JlZW5Ub0dyaWQgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+ICh7XHJcbiAgICAgICAgeDogKC10aGlzLnggKyB4KSAvIHRoaXMuc2l6ZSxcclxuICAgICAgICB5OiAoLXRoaXMueSArIHkpIC8gdGhpcy5zaXplLFxyXG4gICAgfSlcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZyb20gZ3JpZCBzcGFjZSB0byBzY3JlZW4gc3BhY2UgKFRvcCBMZWZ0IGNvcm5lcilcclxuICAgICAqIEBwYXJhbSB4IFggaW4gZ3JpZCBzcGFjZVxyXG4gICAgICogQHBhcmFtIHkgWSBpbiBncmlkIHNwYWNlXHJcbiAgICAgKiBAcmV0dXJucyBDb29yZGluYXRlcyBpbiBzY3JlZW4gc3BhY2VcclxuICAgICAqL1xyXG4gICAgZ3JpZFRvU2NyZWVuID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiAoe1xyXG4gICAgICAgIHg6IE1hdGguZmxvb3IoeCkgKiB0aGlzLnNpemUgKyB0aGlzLngsXHJcbiAgICAgICAgeTogTWF0aC5mbG9vcih5KSAqIHRoaXMuc2l6ZSArIHRoaXMueSxcclxuICAgIH0pO1xyXG5cclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQU1BO0FBQ0E7QUFHQTtBQUFBO0FBT0E7QUFBQTtBQThDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBOENBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoSUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFpQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUE2QkE7QUFBQTs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/grid.ts\n'
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
                '\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError("Generator is already executing.");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar grid_1 = __webpack_require__(/*! ./components/grid */ "./src/components/grid.ts");\r\nvar utils_1 = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");\r\nvar config_1 = __webpack_require__(/*! ./config */ "./src/config.ts");\r\nvar gui_window_1 = __webpack_require__(/*! ./components/gui/gui_window */ "./src/components/gui/gui_window.ts");\r\nvar load = function (app) {\r\n    return new Promise(function (resolve) {\r\n        return app.loader\r\n            .add("doge", "assets/sprites/doge-icon.svg")\r\n            .load(function () { return resolve(); });\r\n    });\r\n};\r\nvar main = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    // let velocity = { x: 1, y: 1 };\r\n    function update(delta) {\r\n        // if (sprite.x <= 0 || sprite.x >= width() - sprite.width)\r\n        //     velocity.x = -velocity.x;\r\n        // if (sprite.y <= 0 || sprite.y >= height() - sprite.height)\r\n        //     velocity.y = -velocity.y;\r\n        // sprite.x += velocity.x * delta;\r\n        // sprite.y += velocity.y * delta;\r\n        // grid.x += 0.15 * delta;\r\n        // grid.y += 0.1 * delta;\r\n        grid.update();\r\n        guiTest.draw();\r\n        sprite.x = grid.gridToScreen(0.5, 0.5).x;\r\n        sprite.y = grid.gridToScreen(0.5, 0.5).y;\r\n    }\r\n    var app, grid, sprite, guiTest;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                app = new PIXI.Application();\r\n                document.body.style.margin = "0";\r\n                app.renderer.view.style.position = "absolute";\r\n                app.renderer.view.style.display = "block";\r\n                app.renderer.resize(window.innerWidth, window.innerHeight);\r\n                document.body.appendChild(app.view);\r\n                return [4 /*yield*/, load(app)];\r\n            case 1:\r\n                _a.sent();\r\n                app.renderer.backgroundColor = config_1.default.backgroundColor;\r\n                grid = new grid_1.default(100);\r\n                app.stage.addChild(grid);\r\n                sprite = new PIXI.Sprite(app.loader.resources.doge.texture);\r\n                sprite.width = 20;\r\n                sprite.height = 20;\r\n                sprite.x = utils_1.width() / 2 - sprite.width / 2;\r\n                sprite.y = utils_1.height() / 2 - sprite.height / 2;\r\n                app.stage.addChild(sprite);\r\n                guiTest = new gui_window_1.default(20, 20, 100, 500, 0xff0000);\r\n                guiTest.draw();\r\n                app.stage.addChild(guiTest);\r\n                // onMouseMove((e) => {\r\n                //     // console.log(grid.screenToGrid(e.clientX, e.clientY));\r\n                // });\r\n                utils_1.onResize(function () {\r\n                    var _a;\r\n                    (_a = app.renderer).resize.apply(_a, utils_1.dimensions());\r\n                    sprite.x = utils_1.width() / 2 - sprite.width / 2;\r\n                    sprite.y = utils_1.height() / 2 - sprite.height / 2;\r\n                });\r\n                window.addEventListener("contextmenu", function (e) { return e.preventDefault(); });\r\n                window.addEventListener("wheel", function (e) {\r\n                    var hitObject = app.renderer.plugins.interaction.hitTest(new PIXI.Point(e.pageX, e.pageY), app.stage);\r\n                    // console.log(grid);\r\n                    if (hitObject != null) {\r\n                        utils_1.scrollListeners.forEach(function (eventObj) {\r\n                            if (eventObj.object == hitObject)\r\n                                eventObj.listener(e);\r\n                        });\r\n                    }\r\n                });\r\n                app.ticker.add(update);\r\n                return [2 /*return*/];\r\n        }\r\n    });\r\n}); };\r\nmain();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcclxuaW1wb3J0IEdyaWQgZnJvbSBcIi4vY29tcG9uZW50cy9ncmlkXCI7XHJcbmltcG9ydCB7XHJcbiAgICBkaW1lbnNpb25zLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgb25SZXNpemUsXHJcbiAgICB3aWR0aCxcclxuICAgIHNjcm9sbExpc3RlbmVycyxcclxuICAgIERpc3BsYXlPYmplY3RTY3JvbGxFdmVudCxcclxufSBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQgR1VJV2luZG93IGZyb20gXCIuL2NvbXBvbmVudHMvZ3VpL2d1aV93aW5kb3dcIjtcclxuXHJcbmNvbnN0IGxvYWQgPSAoYXBwOiBQSVhJLkFwcGxpY2F0aW9uKSA9PlxyXG4gICAgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+XHJcbiAgICAgICAgYXBwLmxvYWRlclxyXG4gICAgICAgICAgICAuYWRkKFwiZG9nZVwiLCBcImFzc2V0cy9zcHJpdGVzL2RvZ2UtaWNvbi5zdmdcIilcclxuICAgICAgICAgICAgLmxvYWQoKCkgPT4gcmVzb2x2ZSgpKVxyXG4gICAgKTtcclxuXHJcbmNvbnN0IG1haW4gPSBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgYXBwID0gbmV3IFBJWEkuQXBwbGljYXRpb24oKTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm1hcmdpbiA9IFwiMFwiO1xyXG4gICAgYXBwLnJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICBhcHAucmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgYXBwLnJlbmRlcmVyLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwLnZpZXcpO1xyXG5cclxuICAgIGF3YWl0IGxvYWQoYXBwKTtcclxuXHJcbiAgICBhcHAucmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gY29uZmlnLmJhY2tncm91bmRDb2xvcjtcclxuXHJcbiAgICBsZXQgZ3JpZCA9IG5ldyBHcmlkKDEwMCk7XHJcblxyXG4gICAgYXBwLnN0YWdlLmFkZENoaWxkKGdyaWQpO1xyXG5cclxuICAgIGxldCBzcHJpdGUgPSBuZXcgUElYSS5TcHJpdGUoYXBwLmxvYWRlci5yZXNvdXJjZXMuZG9nZS50ZXh0dXJlKTtcclxuICAgIHNwcml0ZS53aWR0aCA9IDIwO1xyXG4gICAgc3ByaXRlLmhlaWdodCA9IDIwO1xyXG4gICAgc3ByaXRlLnggPSB3aWR0aCgpIC8gMiAtIHNwcml0ZS53aWR0aCAvIDI7XHJcbiAgICBzcHJpdGUueSA9IGhlaWdodCgpIC8gMiAtIHNwcml0ZS5oZWlnaHQgLyAyO1xyXG4gICAgYXBwLnN0YWdlLmFkZENoaWxkKHNwcml0ZSk7XHJcblxyXG4gICAgbGV0IGd1aVRlc3QgPSBuZXcgR1VJV2luZG93KDIwLCAyMCwgMTAwLCA1MDAsIDB4ZmYwMDAwKTtcclxuICAgIGd1aVRlc3QuZHJhdygpO1xyXG5cclxuICAgIGFwcC5zdGFnZS5hZGRDaGlsZChndWlUZXN0KTtcclxuXHJcbiAgICAvLyBvbk1vdXNlTW92ZSgoZSkgPT4ge1xyXG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKGdyaWQuc2NyZWVuVG9HcmlkKGUuY2xpZW50WCwgZS5jbGllbnRZKSk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICBvblJlc2l6ZSgoKSA9PiB7XHJcbiAgICAgICAgYXBwLnJlbmRlcmVyLnJlc2l6ZSguLi5kaW1lbnNpb25zKCkpO1xyXG4gICAgICAgIHNwcml0ZS54ID0gd2lkdGgoKSAvIDIgLSBzcHJpdGUud2lkdGggLyAyO1xyXG4gICAgICAgIHNwcml0ZS55ID0gaGVpZ2h0KCkgLyAyIC0gc3ByaXRlLmhlaWdodCAvIDI7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgKGU6IFdoZWVsRXZlbnQpID0+IHtcclxuICAgICAgICBsZXQgaGl0T2JqZWN0ID0gYXBwLnJlbmRlcmVyLnBsdWdpbnMuaW50ZXJhY3Rpb24uaGl0VGVzdChcclxuICAgICAgICAgICAgbmV3IFBJWEkuUG9pbnQoZS5wYWdlWCwgZS5wYWdlWSksXHJcbiAgICAgICAgICAgIGFwcC5zdGFnZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZ3JpZCk7XHJcbiAgICAgICAgaWYgKGhpdE9iamVjdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbExpc3RlbmVycy5mb3JFYWNoKChldmVudE9iajogRGlzcGxheU9iamVjdFNjcm9sbEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRPYmoub2JqZWN0ID09IGhpdE9iamVjdCkgZXZlbnRPYmoubGlzdGVuZXIoZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGxldCB2ZWxvY2l0eSA9IHsgeDogMSwgeTogMSB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZShkZWx0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gaWYgKHNwcml0ZS54IDw9IDAgfHwgc3ByaXRlLnggPj0gd2lkdGgoKSAtIHNwcml0ZS53aWR0aClcclxuICAgICAgICAvLyAgICAgdmVsb2NpdHkueCA9IC12ZWxvY2l0eS54O1xyXG5cclxuICAgICAgICAvLyBpZiAoc3ByaXRlLnkgPD0gMCB8fCBzcHJpdGUueSA+PSBoZWlnaHQoKSAtIHNwcml0ZS5oZWlnaHQpXHJcbiAgICAgICAgLy8gICAgIHZlbG9jaXR5LnkgPSAtdmVsb2NpdHkueTtcclxuICAgICAgICAvLyBzcHJpdGUueCArPSB2ZWxvY2l0eS54ICogZGVsdGE7XHJcbiAgICAgICAgLy8gc3ByaXRlLnkgKz0gdmVsb2NpdHkueSAqIGRlbHRhO1xyXG5cclxuICAgICAgICAvLyBncmlkLnggKz0gMC4xNSAqIGRlbHRhO1xyXG4gICAgICAgIC8vIGdyaWQueSArPSAwLjEgKiBkZWx0YTtcclxuICAgICAgICBncmlkLnVwZGF0ZSgpO1xyXG4gICAgICAgIGd1aVRlc3QuZHJhdygpO1xyXG4gICAgICAgIHNwcml0ZS54ID0gZ3JpZC5ncmlkVG9TY3JlZW4oMC41LCAwLjUpLng7XHJcbiAgICAgICAgc3ByaXRlLnkgPSBncmlkLmdyaWRUb1NjcmVlbigwLjUsIDAuNSkueTtcclxuICAgIH1cclxuICAgIGFwcC50aWNrZXIuYWRkKHVwZGF0ZSk7XHJcbn07XHJcblxyXG5tYWluKCk7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFNQTtBQXNEQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBdEVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUFBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBb0JBOzs7O0FBQ0E7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.ts\n'
            );

            /***/
        },
});

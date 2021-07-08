webpackHotUpdate("main", {
    /***/ "./src/components/grid.ts":
        /*!********************************!*\
  !*** ./src/components/grid.ts ***!
  \********************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
            "use strict";
            eval(
                '\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== "function" && b !== null)\r\n            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar utils_1 = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");\r\nvar math_1 = __webpack_require__(/*! ../utils/math */ "./src/utils/math.ts");\r\nvar config_1 = __webpack_require__(/*! ../config */ "./src/config.ts");\r\nvar Grid = /** @class */ (function (_super) {\r\n    __extends(Grid, _super);\r\n    function Grid(size) {\r\n        var _this = _super.call(this) || this;\r\n        /**\r\n         * From screen space to grid space\r\n         * @param x X in screen space\r\n         * @param y Y in screen space\r\n         * @returns Coordinates in grid space\r\n         */\r\n        _this.screenToGrid = function (x, y) { return ({\r\n            x: (-_this.x + x) / _this.size,\r\n            y: (-_this.y + y) / _this.size,\r\n        }); };\r\n        /**\r\n         * From grid space to screen space (Top Left corner)\r\n         * @param x X in grid space\r\n         * @param y Y in grid space\r\n         * @returns Coordinates in screen space\r\n         */\r\n        _this.gridToScreen = function (x, y) { return ({\r\n            x: Math.floor(x) * _this.size + _this.x,\r\n            y: Math.floor(y) * _this.size + _this.y,\r\n        }); };\r\n        _this.size = size;\r\n        _this.tiles = [];\r\n        _this.mousePos = [0, 0];\r\n        _this.generateChildren().forEach(function (child) { return _this.addChild(child); });\r\n        utils_1.onResize(_this.update.bind(_this));\r\n        _this.interactive = true;\r\n        // this.on("wheel", (e:PIXI.FederatedEvent) => console.log("scroll"));\r\n        utils_1.onScroll(_this, _this.scroll.bind(_this));\r\n        _this.on("mousemove", _this.mouseMove.bind(_this));\r\n        return _this;\r\n        // onMouseMove(this.mouseMove.bind(this));\r\n    }\r\n    Grid.prototype.addTile = function () {\r\n    };\r\n    Grid.prototype.scroll = function (e) {\r\n        var mult = 1 / (config_1.default.zoomCoeff * e.deltaY);\r\n        if (mult < 0)\r\n            mult = -1 / mult;\r\n        // console.log(mult);\r\n        var prevPos = this.screenToGrid(e.pageX, e.pageY);\r\n        this.size = Math.round(mult * this.size);\r\n        this.size = math_1.clamp(this.size, 20, 350);\r\n        var newPos = this.screenToGrid(e.pageX, e.pageY);\r\n        // console.log(prevPos);\r\n        // console.log(newPos);\r\n        this.x += (newPos.x - prevPos.x) * this.size;\r\n        this.y += (newPos.y - prevPos.y) * this.size;\r\n        // console.log({ size: this.size });\r\n        this.update();\r\n    };\r\n    Grid.prototype.mouseMove = function (event) {\r\n        var e = event.data.originalEvent;\r\n        this.mousePos = [e.pageX, e.pageY];\r\n        // console.log(this.mousePos);\r\n        if (!utils_1.mouseDown.left || !e.shiftKey)\r\n            return;\r\n        this.x += e.movementX;\r\n        this.y += e.movementY;\r\n        // console.log({x: this.x, y: this.y});\r\n        this.update();\r\n    };\r\n    Grid.prototype.generateChildren = function () {\r\n        var width = utils_1.dimensions()[0];\r\n        var height = utils_1.dimensions()[1];\r\n        var tileXCount = Math.floor(width / this.size);\r\n        var tileYCount = Math.floor(height / this.size);\r\n        var lineGraphics = new PIXI.Graphics();\r\n        var output = [];\r\n        for (var x = -Math.ceil(this.x / this.size); x <= tileXCount - Math.floor(this.x / this.size); x++) {\r\n            lineGraphics.beginFill(config_1.default.lineColor);\r\n            lineGraphics.lineStyle(0);\r\n            lineGraphics.drawRect(x * this.size, -this.y, config_1.default.lineWidth, height);\r\n        }\r\n        for (var y = -Math.ceil(this.y / this.size); y <= tileYCount - Math.floor(this.y / this.size); y++) {\r\n            lineGraphics.beginFill(config_1.default.lineColor);\r\n            lineGraphics.lineStyle(0);\r\n            lineGraphics.drawRect(-this.x, y * this.size, width, config_1.default.lineWidth);\r\n        }\r\n        var gridPos = this.screenToGrid(this.mousePos[0], this.mousePos[1]);\r\n        gridPos.x = Math.floor(gridPos.x) * this.size;\r\n        gridPos.y = Math.floor(gridPos.y) * this.size;\r\n        var hlTile = new PIXI.Graphics();\r\n        hlTile.beginFill(config_1.default.highlightTileColor);\r\n        hlTile.lineStyle(0);\r\n        hlTile.drawRect(gridPos.x + (config_1.default.lineWidth / 2), gridPos.y + (config_1.default.lineWidth / 2), this.size, this.size);\r\n        output.push(hlTile);\r\n        output.push(lineGraphics);\r\n        return output;\r\n    };\r\n    Grid.prototype.update = function () {\r\n        var _this = this;\r\n        this.removeChildren();\r\n        this.generateChildren().forEach(function (child) { return _this.addChild(child); });\r\n    };\r\n    return Grid;\r\n}(PIXI.Container));\r\nexports.default = Grid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ncmlkLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL2dyaWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgZGltZW5zaW9ucyxcclxuICAgIG1vdXNlRG93bixcclxuICAgIG9uUmVzaXplLFxyXG4gICAgb25TY3JvbGxcclxufSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgY2xhbXAgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aFwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IFRpbGUgZnJvbSBcIi4vdGlsZXMvdGlsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZCBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcclxuXHJcbiAgICBzaXplOiBudW1iZXI7XHJcbiAgICB0aWxlczogVGlsZVtdO1xyXG5cclxuICAgIG1vdXNlUG9zOiBbeDogbnVtYmVyLCB5OiBudW1iZXJdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgICAgICB0aGlzLnRpbGVzID0gW107XHJcbiAgICAgICAgdGhpcy5tb3VzZVBvcyA9IFswLDBdO1xyXG5cclxuICAgICAgICB0aGlzLmdlbmVyYXRlQ2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4gdGhpcy5hZGRDaGlsZChjaGlsZCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG9uUmVzaXplKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB0aGlzLmludGVyYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5vbihcIndoZWVsXCIsIChlOlBJWEkuRmVkZXJhdGVkRXZlbnQpID0+IGNvbnNvbGUubG9nKFwic2Nyb2xsXCIpKTtcclxuICAgICAgICBvblNjcm9sbCh0aGlzLCAgdGhpcy5zY3JvbGwuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHRoaXMub24oXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZU1vdmUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgLy8gb25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVGlsZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzY3JvbGwoZTogV2hlZWxFdmVudCkge1xyXG4gICAgICAgIGxldCBtdWx0ID0gMS8oY29uZmlnLnpvb21Db2VmZiAqIGUuZGVsdGFZKTtcclxuICAgICAgICBpZiAobXVsdCA8IDApIG11bHQgPSAtMS9tdWx0O1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG11bHQpO1xyXG5cclxuICAgICAgICBsZXQgcHJldlBvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKGUucGFnZVgsIGUucGFnZVkpO1xyXG5cclxuICAgICAgICB0aGlzLnNpemUgPSBNYXRoLnJvdW5kKG11bHQqdGhpcy5zaXplKTtcclxuICAgICAgICB0aGlzLnNpemUgPSBjbGFtcCh0aGlzLnNpemUsIDIwLCAzNTApO1xyXG5cclxuICAgICAgICBsZXQgbmV3UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoZS5wYWdlWCwgZS5wYWdlWSk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByZXZQb3MpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld1Bvcyk7XHJcblxyXG4gICAgICAgIHRoaXMueCArPSAobmV3UG9zLngtcHJldlBvcy54KSAqIHRoaXMuc2l6ZTtcclxuICAgICAgICB0aGlzLnkgKz0gKG5ld1Bvcy55LXByZXZQb3MueSkgKiB0aGlzLnNpemU7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHsgc2l6ZTogdGhpcy5zaXplIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdXNlTW92ZShldmVudDogYW55KSB7XHJcbiAgICAgICAgbGV0IGUgPSBldmVudC5kYXRhLm9yaWdpbmFsRXZlbnQgYXMgUG9pbnRlckV2ZW50O1xyXG4gICAgICAgIHRoaXMubW91c2VQb3MgPSBbZS5wYWdlWCwgZS5wYWdlWV07XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubW91c2VQb3MpO1xyXG4gICAgICAgIGlmICghbW91c2VEb3duLmxlZnQgfHwgIWUuc2hpZnRLZXkpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy54ICs9IGUubW92ZW1lbnRYO1xyXG4gICAgICAgIHRoaXMueSArPSBlLm1vdmVtZW50WTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coe3g6IHRoaXMueCwgeTogdGhpcy55fSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVDaGlsZHJlbigpOiBQSVhJLkdyYXBoaWNzW10ge1xyXG4gICAgICAgIGxldCB3aWR0aCA9IGRpbWVuc2lvbnMoKVswXTtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gZGltZW5zaW9ucygpWzFdO1xyXG4gICAgICAgIGNvbnN0IHRpbGVYQ291bnQgPSBNYXRoLmZsb29yKHdpZHRoIC8gdGhpcy5zaXplKTtcclxuICAgICAgICBjb25zdCB0aWxlWUNvdW50ID0gTWF0aC5mbG9vcihoZWlnaHQgLyB0aGlzLnNpemUpO1xyXG5cclxuICAgICAgICBsZXQgbGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuXHJcbiAgICAgICAgbGV0IG91dHB1dCA9IFtdO1xyXG4gICAgICAgIGZvciAoXHJcbiAgICAgICAgICAgIGxldCB4ID0gLU1hdGguY2VpbCh0aGlzLnggLyB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICB4IDw9IHRpbGVYQ291bnQgLSBNYXRoLmZsb29yKHRoaXMueCAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgIHgrK1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBsaW5lR3JhcGhpY3MuYmVnaW5GaWxsKGNvbmZpZy5saW5lQ29sb3IpO1xyXG4gICAgICAgICAgICBsaW5lR3JhcGhpY3MubGluZVN0eWxlKDApO1xyXG4gICAgICAgICAgICBsaW5lR3JhcGhpY3MuZHJhd1JlY3QoeCAqIHRoaXMuc2l6ZSwgLXRoaXMueSwgY29uZmlnLmxpbmVXaWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoXHJcbiAgICAgICAgICAgIGxldCB5ID0gLU1hdGguY2VpbCh0aGlzLnkgLyB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICB5IDw9IHRpbGVZQ291bnQgLSBNYXRoLmZsb29yKHRoaXMueSAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgIHkrK1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBsaW5lR3JhcGhpY3MuYmVnaW5GaWxsKGNvbmZpZy5saW5lQ29sb3IpO1xyXG4gICAgICAgICAgICBsaW5lR3JhcGhpY3MubGluZVN0eWxlKDApO1xyXG4gICAgICAgICAgICBsaW5lR3JhcGhpY3MuZHJhd1JlY3QoLXRoaXMueCwgeSAqIHRoaXMuc2l6ZSwgd2lkdGgsIGNvbmZpZy5saW5lV2lkdGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGdyaWRQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCh0aGlzLm1vdXNlUG9zWzBdLCB0aGlzLm1vdXNlUG9zWzFdKTtcclxuICAgICAgICBncmlkUG9zLnggPSBNYXRoLmZsb29yKGdyaWRQb3MueCkqdGhpcy5zaXplO1xyXG4gICAgICAgIGdyaWRQb3MueSA9IE1hdGguZmxvb3IoZ3JpZFBvcy55KSp0aGlzLnNpemU7XHJcblxyXG4gICAgICAgIGxldCBobFRpbGUgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgIGhsVGlsZS5iZWdpbkZpbGwoY29uZmlnLmhpZ2hsaWdodFRpbGVDb2xvcik7XHJcbiAgICAgICAgaGxUaWxlLmxpbmVTdHlsZSgwKTtcclxuICAgICAgICBobFRpbGUuZHJhd1JlY3QoZ3JpZFBvcy54ICsgKGNvbmZpZy5saW5lV2lkdGggLyAyKSwgZ3JpZFBvcy55ICsgKGNvbmZpZy5saW5lV2lkdGggLyAyKSwgdGhpcy5zaXplLCB0aGlzLnNpemUpO1xyXG5cclxuICAgICAgICBvdXRwdXQucHVzaChobFRpbGUpO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKGxpbmVHcmFwaGljcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlQ2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4gdGhpcy5hZGRDaGlsZChjaGlsZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnJvbSBzY3JlZW4gc3BhY2UgdG8gZ3JpZCBzcGFjZVxyXG4gICAgICogQHBhcmFtIHggWCBpbiBzY3JlZW4gc3BhY2VcclxuICAgICAqIEBwYXJhbSB5IFkgaW4gc2NyZWVuIHNwYWNlXHJcbiAgICAgKiBAcmV0dXJucyBDb29yZGluYXRlcyBpbiBncmlkIHNwYWNlXHJcbiAgICAgKi9cclxuICAgIHNjcmVlblRvR3JpZCA9ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gKHtcclxuICAgICAgICB4OiAoLXRoaXMueCArIHgpIC8gdGhpcy5zaXplLFxyXG4gICAgICAgIHk6ICgtdGhpcy55ICsgeSkgLyB0aGlzLnNpemUsXHJcbiAgICB9KVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnJvbSBncmlkIHNwYWNlIHRvIHNjcmVlbiBzcGFjZSAoVG9wIExlZnQgY29ybmVyKVxyXG4gICAgICogQHBhcmFtIHggWCBpbiBncmlkIHNwYWNlXHJcbiAgICAgKiBAcGFyYW0geSBZIGluIGdyaWQgc3BhY2VcclxuICAgICAqIEByZXR1cm5zIENvb3JkaW5hdGVzIGluIHNjcmVlbiBzcGFjZVxyXG4gICAgICovXHJcbiAgICBncmlkVG9TY3JlZW4gPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+ICh7XHJcbiAgICAgICAgeDogTWF0aC5mbG9vcih4KSAqIHRoaXMuc2l6ZSArIHRoaXMueCxcclxuICAgICAgICB5OiBNYXRoLmZsb29yKHkpICogdGhpcy5zaXplICsgdGhpcy55LFxyXG4gICAgfSk7XHJcblxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBTUE7QUFDQTtBQUdBO0FBQUE7QUFPQTtBQUFBO0FBOEdBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaElBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQXdCQTtBQUFBOzsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/grid.ts\n'
            );

            /***/
        },
});
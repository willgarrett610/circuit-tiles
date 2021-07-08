webpackHotUpdate("main",{

/***/ "./src/components/grid.ts":
/*!********************************!*\
  !*** ./src/components/grid.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __spreadArray = (this && this.__spreadArray) || function (to, from) {\r\n    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)\r\n        to[j] = from[i];\r\n    return to;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\r\nvar math_1 = __webpack_require__(/*! ../utils/math */ \"./src/utils/math.ts\");\r\nvar config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\r\nvar wire_tile_1 = __webpack_require__(/*! ./tiles/wire-tile */ \"./src/components/tiles/wire-tile.ts\");\r\nvar Grid = /** @class */ (function (_super) {\r\n    __extends(Grid, _super);\r\n    function Grid(size) {\r\n        var _this = _super.call(this) || this;\r\n        _this.keyDown = function (e) {\r\n            if (e.ctrlKey && !e.shiftKey) {\r\n                if (e.code === \"Equal\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * -100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Minus\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * 100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Digit0\") {\r\n                    e.preventDefault();\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = _this.startingSize;\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n            }\r\n            if (!e.ctrlKey && !e.shiftKey && e.code === \"KeyH\") {\r\n                e.preventDefault();\r\n                _this.x = 0;\r\n                _this.y = 0;\r\n                _this.update();\r\n            }\r\n        };\r\n        /**\r\n         * From screen space to grid space\r\n         * @param x X in screen space\r\n         * @param y Y in screen space\r\n         * @returns Coordinates in grid space\r\n         */\r\n        _this.screenToGrid = function (x, y, floored) {\r\n            if (floored === void 0) { floored = false; }\r\n            return floored\r\n                ? {\r\n                    x: Math.floor((-_this.x + x) / _this.size),\r\n                    y: Math.floor((-_this.y + y) / _this.size),\r\n                }\r\n                : {\r\n                    x: (-_this.x + x) / _this.size,\r\n                    y: (-_this.y + y) / _this.size,\r\n                };\r\n        };\r\n        /**\r\n         * From grid space to screen space (Top Left corner)\r\n         * @param x X in grid space\r\n         * @param y Y in grid space\r\n         * @returns Coordinates in screen space\r\n         */\r\n        _this.gridToScreen = function (x, y) { return ({\r\n            x: Math.floor(x) * _this.size + _this.x,\r\n            y: Math.floor(y) * _this.size + _this.y,\r\n        }); };\r\n        _this.startingSize = size;\r\n        _this.size = size;\r\n        _this.tiles = {};\r\n        _this.mousePos = [0, 0];\r\n        _this.generateChildren().forEach(function (child) { return _this.addChild(child); });\r\n        utils_1.onResize(_this.update.bind(_this));\r\n        _this.interactive = true;\r\n        utils_1.onScroll(_this, _this.scroll.bind(_this));\r\n        _this.on(\"mousemove\", _this.mouseMove.bind(_this));\r\n        utils_1.onKeyDown(_this.keyDown);\r\n        return _this;\r\n    }\r\n    Grid.prototype.addTile = function (x, y, tile) {\r\n        if (this.tiles[gridPoint.join()])\r\n            return;\r\n        this.tiles[gridPoint.join()] = new (tile.bind.apply(tile, __spreadArray([void 0], gridPoint)))();\r\n        console.log(this.tiles);\r\n    };\r\n    Grid.prototype.scroll = function (e) {\r\n        if (e.deltaY === 0)\r\n            return;\r\n        var mult = 1 / (config_1.default.zoomCoeff * e.deltaY);\r\n        if (mult < 0)\r\n            mult = -1 / mult;\r\n        var prevPos = this.screenToGrid(e.pageX, e.pageY);\r\n        this.size = Math.round(mult * this.size);\r\n        this.size = math_1.clamp(this.size, 20, 350);\r\n        var newPos = this.screenToGrid(e.pageX, e.pageY);\r\n        this.x += (newPos.x - prevPos.x) * this.size;\r\n        this.y += (newPos.y - prevPos.y) * this.size;\r\n        this.update();\r\n    };\r\n    Grid.prototype.mouseMove = function (event) {\r\n        var e = event.data.originalEvent;\r\n        this.mousePos = [e.pageX, e.pageY];\r\n        if (utils_1.mouseDown.left) {\r\n            if (e.shiftKey || utils_1.pressedKeys[\"Space\"]) {\r\n                this.x += e.movementX;\r\n                this.y += e.movementY;\r\n            }\r\n            else {\r\n                var gridPoint = utils_1.locationToTuple(this.screenToGrid.apply(this, __spreadArray(__spreadArray([], this.mousePos), [true])));\r\n                this.addTile.apply(this, __spreadArray(__spreadArray([], gridPoint), [wire_tile_1.default]));\r\n            }\r\n        }\r\n        this.update();\r\n    };\r\n    Grid.prototype.generateChildren = function () {\r\n        var width = utils_1.dimensions()[0];\r\n        var height = utils_1.dimensions()[1];\r\n        var tileXCount = Math.floor(width / this.size);\r\n        var tileYCount = Math.floor(height / this.size);\r\n        var lineGraphics = new PIXI.Graphics();\r\n        var output = [];\r\n        for (var x = -Math.ceil(this.x / this.size); x <= tileXCount - Math.floor(this.x / this.size); x++) {\r\n            lineGraphics.beginFill(config_1.default.lineColor);\r\n            lineGraphics.lineStyle(0);\r\n            lineGraphics.drawRect(x * this.size, -this.y, config_1.default.lineWidth, height);\r\n        }\r\n        for (var y = -Math.ceil(this.y / this.size); y <= tileYCount - Math.floor(this.y / this.size); y++) {\r\n            lineGraphics.beginFill(config_1.default.lineColor);\r\n            lineGraphics.lineStyle(0);\r\n            lineGraphics.drawRect(-this.x, y * this.size, width, config_1.default.lineWidth);\r\n        }\r\n        var gridPos = this.screenToGrid.apply(this, this.mousePos);\r\n        gridPos.x = Math.floor(gridPos.x) * this.size;\r\n        gridPos.y = Math.floor(gridPos.y) * this.size;\r\n        var hlTile = new PIXI.Graphics();\r\n        hlTile.beginFill(config_1.default.highlightTileColor);\r\n        hlTile.lineStyle(0);\r\n        hlTile.drawRect(gridPos.x + config_1.default.lineWidth / 2, gridPos.y + config_1.default.lineWidth / 2, this.size, this.size);\r\n        output.push(hlTile);\r\n        output.push(lineGraphics);\r\n        return output;\r\n    };\r\n    Grid.prototype.update = function () {\r\n        var _this = this;\r\n        this.removeChildren();\r\n        this.generateChildren().forEach(function (child) { return _this.addChild(child); });\r\n    };\r\n    return Grid;\r\n}(PIXI.Container));\r\nexports.default = Grid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ncmlkLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL2dyaWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xuaW1wb3J0IHtcbiAgICBkaW1lbnNpb25zLFxuICAgIGxvY2F0aW9uVG9UdXBsZSxcbiAgICBtb3VzZURvd24sXG4gICAgb25LZXlEb3duLFxuICAgIG9uUmVzaXplLFxuICAgIG9uU2Nyb2xsLFxuICAgIHByZXNzZWRLZXlzLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7IGNsYW1wIH0gZnJvbSBcIi4uL3V0aWxzL21hdGhcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IFRpbGUgZnJvbSBcIi4vdGlsZXMvdGlsZVwiO1xuaW1wb3J0IFdpcmUgZnJvbSBcIi4vdGlsZXMvd2lyZS10aWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XG4gICAgc3RhcnRpbmdTaXplOiBudW1iZXI7XG4gICAgc2l6ZTogbnVtYmVyO1xuICAgIHRpbGVzOiB7IFtrZXk6IHN0cmluZ106IFRpbGUgfTtcblxuICAgIG1vdXNlUG9zOiBbeDogbnVtYmVyLCB5OiBudW1iZXJdO1xuXG4gICAgY29uc3RydWN0b3Ioc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhcnRpbmdTaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy50aWxlcyA9IHt9O1xuICAgICAgICB0aGlzLm1vdXNlUG9zID0gWzAsIDBdO1xuXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVDaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB0aGlzLmFkZENoaWxkKGNoaWxkKSk7XG5cbiAgICAgICAgb25SZXNpemUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5pbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgb25TY3JvbGwodGhpcywgdGhpcy5zY3JvbGwuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5vbihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICBvbktleURvd24odGhpcy5rZXlEb3duKTtcbiAgICB9XG5cbiAgICBhZGRUaWxlKHg6IG51bWJlciwgeTogbnVtYmVyLCB0aWxlOiBUaWxlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnRpbGVzW2dyaWRQb2ludC5qb2luKCldKSByZXR1cm47XG4gICAgICAgIHRoaXMudGlsZXNbZ3JpZFBvaW50LmpvaW4oKV0gPSBuZXcgdGlsZSguLi5ncmlkUG9pbnQpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRpbGVzKTtcbiAgICB9XG5cbiAgICBzY3JvbGwoZTogV2hlZWxFdmVudCkge1xuICAgICAgICBpZiAoZS5kZWx0YVkgPT09IDApIHJldHVybjtcblxuICAgICAgICBsZXQgbXVsdCA9IDEgLyAoY29uZmlnLnpvb21Db2VmZiAqIGUuZGVsdGFZKTtcbiAgICAgICAgaWYgKG11bHQgPCAwKSBtdWx0ID0gLTEgLyBtdWx0O1xuXG4gICAgICAgIGxldCBwcmV2UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoZS5wYWdlWCwgZS5wYWdlWSk7XG5cbiAgICAgICAgdGhpcy5zaXplID0gTWF0aC5yb3VuZChtdWx0ICogdGhpcy5zaXplKTtcbiAgICAgICAgdGhpcy5zaXplID0gY2xhbXAodGhpcy5zaXplLCAyMCwgMzUwKTtcblxuICAgICAgICBsZXQgbmV3UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoZS5wYWdlWCwgZS5wYWdlWSk7XG5cbiAgICAgICAgdGhpcy54ICs9IChuZXdQb3MueCAtIHByZXZQb3MueCkgKiB0aGlzLnNpemU7XG4gICAgICAgIHRoaXMueSArPSAobmV3UG9zLnkgLSBwcmV2UG9zLnkpICogdGhpcy5zaXplO1xuXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgbW91c2VNb3ZlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgbGV0IGUgPSBldmVudC5kYXRhLm9yaWdpbmFsRXZlbnQgYXMgUG9pbnRlckV2ZW50O1xuICAgICAgICB0aGlzLm1vdXNlUG9zID0gW2UucGFnZVgsIGUucGFnZVldO1xuICAgICAgICBpZiAobW91c2VEb3duLmxlZnQpIHtcbiAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5IHx8IHByZXNzZWRLZXlzW1wiU3BhY2VcIl0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gZS5tb3ZlbWVudFg7XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IGUubW92ZW1lbnRZO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncmlkUG9pbnQgPSBsb2NhdGlvblRvVHVwbGUoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NyZWVuVG9HcmlkKC4uLnRoaXMubW91c2VQb3MsIHRydWUpXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYWRkVGlsZSguLi5ncmlkUG9pbnQsIFdpcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBrZXlEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGUuY3RybEtleSAmJiAhZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gXCJFcXVhbFwiKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IG11bHQgPSAxIC8gKGNvbmZpZy56b29tQ29lZmYgKiAtMTAwKTtcbiAgICAgICAgICAgICAgICBpZiAobXVsdCA8IDApIG11bHQgPSAtMSAvIG11bHQ7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJldlBvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpZHRoIC8gMixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgLyAyXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IE1hdGgucm91bmQobXVsdCAqIHRoaXMuc2l6ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gY2xhbXAodGhpcy5zaXplLCAyMCwgMzUwKTtcblxuICAgICAgICAgICAgICAgIGxldCBuZXdQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcblxuICAgICAgICAgICAgICAgIHRoaXMueCArPSAobmV3UG9zLnggLSBwcmV2UG9zLngpICogdGhpcy5zaXplO1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSAobmV3UG9zLnkgLSBwcmV2UG9zLnkpICogdGhpcy5zaXplO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gXCJNaW51c1wiKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IG11bHQgPSAxIC8gKGNvbmZpZy56b29tQ29lZmYgKiAxMDApO1xuICAgICAgICAgICAgICAgIGlmIChtdWx0IDwgMCkgbXVsdCA9IC0xIC8gbXVsdDtcblxuICAgICAgICAgICAgICAgIGxldCBwcmV2UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2lkdGggLyAyLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCAvIDJcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gTWF0aC5yb3VuZChtdWx0ICogdGhpcy5zaXplKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSBjbGFtcCh0aGlzLnNpemUsIDIwLCAzNTApO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKHRoaXMud2lkdGggLyAyLCB0aGlzLmhlaWdodCAvIDIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IChuZXdQb3MueCAtIHByZXZQb3MueCkgKiB0aGlzLnNpemU7XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IChuZXdQb3MueSAtIHByZXZQb3MueSkgKiB0aGlzLnNpemU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSBcIkRpZ2l0MFwiKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHByZXZQb3MgPSB0aGlzLnNjcmVlblRvR3JpZChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0IC8gMlxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSB0aGlzLnN0YXJ0aW5nU2l6ZTtcblxuICAgICAgICAgICAgICAgIGxldCBuZXdQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcblxuICAgICAgICAgICAgICAgIHRoaXMueCArPSAobmV3UG9zLnggLSBwcmV2UG9zLngpICogdGhpcy5zaXplO1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSAobmV3UG9zLnkgLSBwcmV2UG9zLnkpICogdGhpcy5zaXplO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZS5jdHJsS2V5ICYmICFlLnNoaWZ0S2V5ICYmIGUuY29kZSA9PT0gXCJLZXlIXCIpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBnZW5lcmF0ZUNoaWxkcmVuKCk6IFBJWEkuR3JhcGhpY3NbXSB7XG4gICAgICAgIGxldCB3aWR0aCA9IGRpbWVuc2lvbnMoKVswXTtcbiAgICAgICAgbGV0IGhlaWdodCA9IGRpbWVuc2lvbnMoKVsxXTtcbiAgICAgICAgY29uc3QgdGlsZVhDb3VudCA9IE1hdGguZmxvb3Iod2lkdGggLyB0aGlzLnNpemUpO1xuICAgICAgICBjb25zdCB0aWxlWUNvdW50ID0gTWF0aC5mbG9vcihoZWlnaHQgLyB0aGlzLnNpemUpO1xuXG4gICAgICAgIGxldCBsaW5lR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuXG4gICAgICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCB4ID0gLU1hdGguY2VpbCh0aGlzLnggLyB0aGlzLnNpemUpO1xuICAgICAgICAgICAgeCA8PSB0aWxlWENvdW50IC0gTWF0aC5mbG9vcih0aGlzLnggLyB0aGlzLnNpemUpO1xuICAgICAgICAgICAgeCsrXG4gICAgICAgICkge1xuICAgICAgICAgICAgbGluZUdyYXBoaWNzLmJlZ2luRmlsbChjb25maWcubGluZUNvbG9yKTtcbiAgICAgICAgICAgIGxpbmVHcmFwaGljcy5saW5lU3R5bGUoMCk7XG4gICAgICAgICAgICBsaW5lR3JhcGhpY3MuZHJhd1JlY3QoXG4gICAgICAgICAgICAgICAgeCAqIHRoaXMuc2l6ZSxcbiAgICAgICAgICAgICAgICAtdGhpcy55LFxuICAgICAgICAgICAgICAgIGNvbmZpZy5saW5lV2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCB5ID0gLU1hdGguY2VpbCh0aGlzLnkgLyB0aGlzLnNpemUpO1xuICAgICAgICAgICAgeSA8PSB0aWxlWUNvdW50IC0gTWF0aC5mbG9vcih0aGlzLnkgLyB0aGlzLnNpemUpO1xuICAgICAgICAgICAgeSsrXG4gICAgICAgICkge1xuICAgICAgICAgICAgbGluZUdyYXBoaWNzLmJlZ2luRmlsbChjb25maWcubGluZUNvbG9yKTtcbiAgICAgICAgICAgIGxpbmVHcmFwaGljcy5saW5lU3R5bGUoMCk7XG4gICAgICAgICAgICBsaW5lR3JhcGhpY3MuZHJhd1JlY3QoXG4gICAgICAgICAgICAgICAgLXRoaXMueCxcbiAgICAgICAgICAgICAgICB5ICogdGhpcy5zaXplLFxuICAgICAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5saW5lV2lkdGhcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZ3JpZFBvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKC4uLnRoaXMubW91c2VQb3MpO1xuICAgICAgICBncmlkUG9zLnggPSBNYXRoLmZsb29yKGdyaWRQb3MueCkgKiB0aGlzLnNpemU7XG4gICAgICAgIGdyaWRQb3MueSA9IE1hdGguZmxvb3IoZ3JpZFBvcy55KSAqIHRoaXMuc2l6ZTtcblxuICAgICAgICBsZXQgaGxUaWxlID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICAgICAgaGxUaWxlLmJlZ2luRmlsbChjb25maWcuaGlnaGxpZ2h0VGlsZUNvbG9yKTtcbiAgICAgICAgaGxUaWxlLmxpbmVTdHlsZSgwKTtcbiAgICAgICAgaGxUaWxlLmRyYXdSZWN0KFxuICAgICAgICAgICAgZ3JpZFBvcy54ICsgY29uZmlnLmxpbmVXaWR0aCAvIDIsXG4gICAgICAgICAgICBncmlkUG9zLnkgKyBjb25maWcubGluZVdpZHRoIC8gMixcbiAgICAgICAgICAgIHRoaXMuc2l6ZSxcbiAgICAgICAgICAgIHRoaXMuc2l6ZVxuICAgICAgICApO1xuXG4gICAgICAgIG91dHB1dC5wdXNoKGhsVGlsZSk7XG4gICAgICAgIG91dHB1dC5wdXNoKGxpbmVHcmFwaGljcyk7XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHRoaXMuYWRkQ2hpbGQoY2hpbGQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGcm9tIHNjcmVlbiBzcGFjZSB0byBncmlkIHNwYWNlXG4gICAgICogQHBhcmFtIHggWCBpbiBzY3JlZW4gc3BhY2VcbiAgICAgKiBAcGFyYW0geSBZIGluIHNjcmVlbiBzcGFjZVxuICAgICAqIEByZXR1cm5zIENvb3JkaW5hdGVzIGluIGdyaWQgc3BhY2VcbiAgICAgKi9cbiAgICBzY3JlZW5Ub0dyaWQgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIsIGZsb29yZWQgPSBmYWxzZSkgPT5cbiAgICAgICAgZmxvb3JlZFxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICB4OiBNYXRoLmZsb29yKCgtdGhpcy54ICsgeCkgLyB0aGlzLnNpemUpLFxuICAgICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcigoLXRoaXMueSArIHkpIC8gdGhpcy5zaXplKSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICB4OiAoLXRoaXMueCArIHgpIC8gdGhpcy5zaXplLFxuICAgICAgICAgICAgICAgICAgeTogKC10aGlzLnkgKyB5KSAvIHRoaXMuc2l6ZSxcbiAgICAgICAgICAgICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZyb20gZ3JpZCBzcGFjZSB0byBzY3JlZW4gc3BhY2UgKFRvcCBMZWZ0IGNvcm5lcilcbiAgICAgKiBAcGFyYW0geCBYIGluIGdyaWQgc3BhY2VcbiAgICAgKiBAcGFyYW0geSBZIGluIGdyaWQgc3BhY2VcbiAgICAgKiBAcmV0dXJucyBDb29yZGluYXRlcyBpbiBzY3JlZW4gc3BhY2VcbiAgICAgKi9cbiAgICBncmlkVG9TY3JlZW4gPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+ICh7XG4gICAgICAgIHg6IE1hdGguZmxvb3IoeCkgKiB0aGlzLnNpemUgKyB0aGlzLngsXG4gICAgICAgIHk6IE1hdGguZmxvb3IoeSkgKiB0aGlzLnNpemUgKyB0aGlzLnksXG4gICAgfSk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBU0E7QUFDQTtBQUVBO0FBRUE7QUFBQTtBQU9BO0FBQUE7QUFnRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUtBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBS0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFLQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBa0VBOzs7OztBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpPQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTs7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUEyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQU1BO0FBRUE7QUFLQTtBQUNBO0FBQ0E7QUFNQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBNkJBO0FBQUE7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/grid.ts\n");

/***/ }),

/***/ "./src/components/tiles/tile.ts":
/*!**************************************!*\
  !*** ./src/components/tiles/tile.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.TileType = void 0;\r\nvar TileType;\r\n(function (TileType) {\r\n    TileType[TileType[\"INPUT\"] = 0] = \"INPUT\";\r\n    TileType[TileType[\"OUTPUT\"] = 1] = \"OUTPUT\";\r\n    TileType[TileType[\"PRIMITIVE\"] = 2] = \"PRIMITIVE\";\r\n})(TileType = exports.TileType || (exports.TileType = {}));\r\nvar Tile = /** @class */ (function () {\r\n    function Tile() {\r\n    }\r\n    return Tile;\r\n}());\r\nexports.default = Tile;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90aWxlcy90aWxlLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL3RpbGVzL3RpbGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2RpcmVjdGlvbnNcIjtcblxuZXhwb3J0IGVudW0gVGlsZVR5cGUge1xuICAgIElOUFVULFxuICAgIE9VVFBVVCxcbiAgICBQUklNSVRJVkUsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBUaWxlIHtcbiAgICBsYWJlbD86IHN0cmluZztcbiAgICB0eXBlOiBUaWxlVHlwZTtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIGRpcmVjdGlvbjogRGlyZWN0aW9uO1xuICAgIHRleHR1cmU6IFBJWEkuVGV4dHVyZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZSB7XG4gICAgbGFiZWw/OiBzdHJpbmc7XG4gICAgdHlwZTogVGlsZVR5cGU7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICBkaXJlY3Rpb246IERpcmVjdGlvbjtcbiAgICB0ZXh0dXJlOiBQSVhJLlRleHR1cmU7XG59XG4iXSwibWFwcGluZ3MiOiI7OztBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVdBO0FBQUE7QUFPQTtBQUFBO0FBQUE7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/tiles/tile.ts\n");

/***/ }),

/***/ "./src/components/tiles/wire-tile.ts":
/*!*******************************************!*\
  !*** ./src/components/tiles/wire-tile.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar directions_1 = __webpack_require__(/*! ../../utils/directions */ \"./src/utils/directions.ts\");\r\nvar tile_1 = __webpack_require__(/*! ./tile */ \"./src/components/tiles/tile.ts\");\r\nvar Wire = /** @class */ (function () {\r\n    function Wire(x, y) {\r\n        this.label = undefined;\r\n        this.direction = directions_1.Direction.NORMAL;\r\n        this.type = tile_1.TileType.PRIMITIVE;\r\n        this.connect = {\r\n            up: false,\r\n            down: false,\r\n            left: false,\r\n            right: false,\r\n        };\r\n        this.texture = PIXI.Texture.from(\"assets/sprites/doge-icon.svg\");\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    return Wire;\r\n}());\r\nexports.default = Wire;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90aWxlcy93aXJlLXRpbGUudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2NvbXBvbmVudHMvdGlsZXMvd2lyZS10aWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy9kaXJlY3Rpb25zXCI7XHJcbmltcG9ydCBUaWxlLCB7IFRpbGVUeXBlIH0gZnJvbSBcIi4vdGlsZVwiO1xyXG5cclxuY2xhc3MgV2lyZSBpbXBsZW1lbnRzIFRpbGUge1xyXG4gICAgbGFiZWwgPSB1bmRlZmluZWQ7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICBkaXJlY3Rpb24gPSBEaXJlY3Rpb24uTk9STUFMO1xyXG4gICAgdHlwZSA9IFRpbGVUeXBlLlBSSU1JVElWRTtcclxuICAgIGNvbm5lY3QgPSB7XHJcbiAgICAgICAgdXA6IGZhbHNlLFxyXG4gICAgICAgIGRvd246IGZhbHNlLFxyXG4gICAgICAgIGxlZnQ6IGZhbHNlLFxyXG4gICAgICAgIHJpZ2h0OiBmYWxzZSxcclxuICAgIH07XHJcbiAgICB0ZXh0dXJlID0gUElYSS5UZXh0dXJlLmZyb20oXCJhc3NldHMvc3ByaXRlcy9kb2dlLWljb24uc3ZnXCIpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXaXJlO1xyXG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUVBO0FBY0E7QUFiQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/tiles/wire-tile.ts\n");

/***/ })

})
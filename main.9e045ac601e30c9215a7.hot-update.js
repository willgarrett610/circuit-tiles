webpackHotUpdate("main",{

/***/ "./src/components/grid.ts":
/*!********************************!*\
  !*** ./src/components/grid.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __spreadArray = (this && this.__spreadArray) || function (to, from) {\r\n    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)\r\n        to[j] = from[i];\r\n    return to;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\r\nvar math_1 = __webpack_require__(/*! ../utils/math */ \"./src/utils/math.ts\");\r\nvar config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\r\nvar wire_tile_1 = __webpack_require__(/*! ./tiles/wire-tile */ \"./src/components/tiles/wire-tile.ts\");\r\nvar Grid = /** @class */ (function (_super) {\r\n    __extends(Grid, _super);\r\n    function Grid(size) {\r\n        var _this = _super.call(this) || this;\r\n        _this.keyDown = function (e) {\r\n            if (e.ctrlKey && !e.shiftKey) {\r\n                if (e.code === \"Equal\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * -100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Minus\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * 100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Digit0\") {\r\n                    e.preventDefault();\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = _this.startingSize;\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n            }\r\n            if (!e.ctrlKey && !e.shiftKey && e.code === \"KeyH\") {\r\n                e.preventDefault();\r\n                _this.x = 0;\r\n                _this.y = 0;\r\n                _this.update();\r\n            }\r\n        };\r\n        /**\r\n         * From screen space to grid space\r\n         * @param x X in screen space\r\n         * @param y Y in screen space\r\n         * @returns Coordinates in grid space\r\n         */\r\n        _this.screenToGrid = function (x, y, floored) {\r\n            if (floored === void 0) { floored = false; }\r\n            return floored\r\n                ? {\r\n                    x: Math.floor((-_this.x + x) / _this.size),\r\n                    y: Math.floor((-_this.y + y) / _this.size),\r\n                }\r\n                : {\r\n                    x: (-_this.x + x) / _this.size,\r\n                    y: (-_this.y + y) / _this.size,\r\n                };\r\n        };\r\n        /**\r\n         * From grid space to screen space (Top Left corner)\r\n         * @param x X in grid space\r\n         * @param y Y in grid space\r\n         * @returns Coordinates in screen space\r\n         */\r\n        _this.gridToScreen = function (x, y) { return ({\r\n            x: Math.floor(x) * _this.size + _this.x,\r\n            y: Math.floor(y) * _this.size + _this.y,\r\n        }); };\r\n        _this.startingSize = size;\r\n        _this.size = size;\r\n        _this.tiles = {};\r\n        _this.mousePos = [0, 0];\r\n        _this.generateChildren().forEach(function (child) { return _this.addChild(child); });\r\n        utils_1.onResize(_this.update.bind(_this));\r\n        _this.interactive = true;\r\n        utils_1.onScroll(_this, _this.scroll.bind(_this));\r\n        _this.on(\"mousemove\", _this.mouseMove.bind(_this));\r\n        utils_1.onKeyDown(_this.keyDown);\r\n        return _this;\r\n    }\r\n    Grid.prototype.addTile = function (x, y, tile) {\r\n        if (this.tiles[x + \",\" + y])\r\n            return false;\r\n        this.tiles[x + \",\" + y] = new tile(x, y);\r\n        console.log(this.tiles);\r\n        return true;\r\n    };\r\n    Grid.prototype.scroll = function (e) {\r\n        if (e.deltaY === 0)\r\n            return;\r\n        var mult = 1 / (config_1.default.zoomCoeff * e.deltaY);\r\n        if (mult < 0)\r\n            mult = -1 / mult;\r\n        var prevPos = this.screenToGrid(e.pageX, e.pageY);\r\n        this.size = Math.round(mult * this.size);\r\n        this.size = math_1.clamp(this.size, 20, 350);\r\n        var newPos = this.screenToGrid(e.pageX, e.pageY);\r\n        this.x += (newPos.x - prevPos.x) * this.size;\r\n        this.y += (newPos.y - prevPos.y) * this.size;\r\n        this.update();\r\n    };\r\n    Grid.prototype.mouseMove = function (event) {\r\n        var e = event.data.originalEvent;\r\n        this.mousePos = [e.pageX, e.pageY];\r\n        if (utils_1.mouseDown.left) {\r\n            if (e.shiftKey || utils_1.pressedKeys[\"Space\"]) {\r\n                this.x += e.movementX;\r\n                this.y += e.movementY;\r\n            }\r\n            else {\r\n                var gridPoint = utils_1.locationToTuple(this.screenToGrid.apply(this, __spreadArray(__spreadArray([], this.mousePos), [true])));\r\n                this.addTile.apply(this, __spreadArray(__spreadArray([], gridPoint), [wire_tile_1.default]));\r\n            }\r\n        }\r\n        this.update();\r\n    };\r\n    Grid.prototype.generateChildren = function () {\r\n        var width = utils_1.dimensions()[0];\r\n        var height = utils_1.dimensions()[1];\r\n        var tileXCount = Math.floor(width / this.size);\r\n        var tileYCount = Math.floor(height / this.size);\r\n        var lineGraphics = new PIXI.Graphics();\r\n        var output = [];\r\n        for (var x = -Math.ceil(this.x / this.size); x <= tileXCount - Math.floor(this.x / this.size); x++) {\r\n            lineGraphics.beginFill(config_1.default.lineColor);\r\n            lineGraphics.lineStyle(0);\r\n            lineGraphics.drawRect(x * this.size, -this.y, config_1.default.lineWidth, height);\r\n        }\r\n        for (var y = -Math.ceil(this.y / this.size); y <= tileYCount - Math.floor(this.y / this.size); y++) {\r\n            lineGraphics.beginFill(config_1.default.lineColor);\r\n            lineGraphics.lineStyle(0);\r\n            lineGraphics.drawRect(-this.x, y * this.size, width, config_1.default.lineWidth);\r\n        }\r\n        var gridPos = this.screenToGrid.apply(this, this.mousePos);\r\n        gridPos.x = Math.floor(gridPos.x) * this.size;\r\n        gridPos.y = Math.floor(gridPos.y) * this.size;\r\n        var hlTile = new PIXI.Graphics();\r\n        hlTile.beginFill(config_1.default.highlightTileColor);\r\n        hlTile.lineStyle(0);\r\n        hlTile.drawRect(gridPos.x + config_1.default.lineWidth / 2, gridPos.y + config_1.default.lineWidth / 2, this.size, this.size);\r\n        output.push(hlTile);\r\n        output.push(lineGraphics);\r\n        return output;\r\n    };\r\n    Grid.prototype.renderTiles = function () {\r\n        for (var _i = 0, _a = Object.entries(this.tiles); _i < _a.length; _i++) {\r\n            var _b = _a[_i], key = _b[0], tile = _b[1];\r\n        }\r\n    };\r\n    Grid.prototype.update = function () {\r\n        var _this = this;\r\n        this.removeChildren();\r\n        this.generateChildren().forEach(function (child) { return _this.addChild(child); });\r\n        this.renderTiles();\r\n    };\r\n    return Grid;\r\n}(PIXI.Container));\r\nexports.default = Grid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ncmlkLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL2dyaWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xuaW1wb3J0IHtcbiAgICBkaW1lbnNpb25zLFxuICAgIGxvY2F0aW9uVG9UdXBsZSxcbiAgICBtb3VzZURvd24sXG4gICAgb25LZXlEb3duLFxuICAgIG9uUmVzaXplLFxuICAgIG9uU2Nyb2xsLFxuICAgIHByZXNzZWRLZXlzLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7IGNsYW1wIH0gZnJvbSBcIi4uL3V0aWxzL21hdGhcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IFdpcmUgZnJvbSBcIi4vdGlsZXMvd2lyZS10aWxlXCI7XG5pbXBvcnQgVGlsZSBmcm9tIFwiLi90aWxlcy90aWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XG4gICAgc3RhcnRpbmdTaXplOiBudW1iZXI7XG4gICAgc2l6ZTogbnVtYmVyO1xuICAgIHRpbGVzOiB7IFtrZXk6IHN0cmluZ106IFRpbGUgfTtcblxuICAgIG1vdXNlUG9zOiBbeDogbnVtYmVyLCB5OiBudW1iZXJdO1xuXG4gICAgY29uc3RydWN0b3Ioc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhcnRpbmdTaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy50aWxlcyA9IHt9O1xuICAgICAgICB0aGlzLm1vdXNlUG9zID0gWzAsIDBdO1xuXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVDaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB0aGlzLmFkZENoaWxkKGNoaWxkKSk7XG5cbiAgICAgICAgb25SZXNpemUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5pbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgb25TY3JvbGwodGhpcywgdGhpcy5zY3JvbGwuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5vbihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICBvbktleURvd24odGhpcy5rZXlEb3duKTtcbiAgICB9XG5cbiAgICBhZGRUaWxlKHg6IG51bWJlciwgeTogbnVtYmVyLCB0aWxlOiB0eXBlb2YgVGlsZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy50aWxlc1tgJHt4fSwke3l9YF0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy50aWxlc1tgJHt4fSwke3l9YF0gPSBuZXcgdGlsZSh4LCB5KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50aWxlcyk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc2Nyb2xsKGU6IFdoZWVsRXZlbnQpIHtcbiAgICAgICAgaWYgKGUuZGVsdGFZID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgbGV0IG11bHQgPSAxIC8gKGNvbmZpZy56b29tQ29lZmYgKiBlLmRlbHRhWSk7XG4gICAgICAgIGlmIChtdWx0IDwgMCkgbXVsdCA9IC0xIC8gbXVsdDtcblxuICAgICAgICBsZXQgcHJldlBvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKGUucGFnZVgsIGUucGFnZVkpO1xuXG4gICAgICAgIHRoaXMuc2l6ZSA9IE1hdGgucm91bmQobXVsdCAqIHRoaXMuc2l6ZSk7XG4gICAgICAgIHRoaXMuc2l6ZSA9IGNsYW1wKHRoaXMuc2l6ZSwgMjAsIDM1MCk7XG5cbiAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKGUucGFnZVgsIGUucGFnZVkpO1xuXG4gICAgICAgIHRoaXMueCArPSAobmV3UG9zLnggLSBwcmV2UG9zLngpICogdGhpcy5zaXplO1xuICAgICAgICB0aGlzLnkgKz0gKG5ld1Bvcy55IC0gcHJldlBvcy55KSAqIHRoaXMuc2l6ZTtcblxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIG1vdXNlTW92ZShldmVudDogYW55KSB7XG4gICAgICAgIGxldCBlID0gZXZlbnQuZGF0YS5vcmlnaW5hbEV2ZW50IGFzIFBvaW50ZXJFdmVudDtcbiAgICAgICAgdGhpcy5tb3VzZVBvcyA9IFtlLnBhZ2VYLCBlLnBhZ2VZXTtcbiAgICAgICAgaWYgKG1vdXNlRG93bi5sZWZ0KSB7XG4gICAgICAgICAgICBpZiAoZS5zaGlmdEtleSB8fCBwcmVzc2VkS2V5c1tcIlNwYWNlXCJdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IGUubW92ZW1lbnRYO1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSBlLm1vdmVtZW50WTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JpZFBvaW50ID0gbG9jYXRpb25Ub1R1cGxlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcmVlblRvR3JpZCguLi50aGlzLm1vdXNlUG9zLCB0cnVlKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRpbGUoLi4uZ3JpZFBvaW50LCBXaXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAga2V5RG93biA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChlLmN0cmxLZXkgJiYgIWUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT09IFwiRXF1YWxcIikge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBtdWx0ID0gMSAvIChjb25maWcuem9vbUNvZWZmICogLTEwMCk7XG4gICAgICAgICAgICAgICAgaWYgKG11bHQgPCAwKSBtdWx0ID0gLTEgLyBtdWx0O1xuXG4gICAgICAgICAgICAgICAgbGV0IHByZXZQb3MgPSB0aGlzLnNjcmVlblRvR3JpZChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0IC8gMlxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSBNYXRoLnJvdW5kKG11bHQgKiB0aGlzLnNpemUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IGNsYW1wKHRoaXMuc2l6ZSwgMjAsIDM1MCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbmV3UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gKG5ld1Bvcy54IC0gcHJldlBvcy54KSAqIHRoaXMuc2l6ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKG5ld1Bvcy55IC0gcHJldlBvcy55KSAqIHRoaXMuc2l6ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT09IFwiTWludXNcIikge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBtdWx0ID0gMSAvIChjb25maWcuem9vbUNvZWZmICogMTAwKTtcbiAgICAgICAgICAgICAgICBpZiAobXVsdCA8IDApIG11bHQgPSAtMSAvIG11bHQ7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJldlBvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpZHRoIC8gMixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgLyAyXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IE1hdGgucm91bmQobXVsdCAqIHRoaXMuc2l6ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gY2xhbXAodGhpcy5zaXplLCAyMCwgMzUwKTtcblxuICAgICAgICAgICAgICAgIGxldCBuZXdQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcblxuICAgICAgICAgICAgICAgIHRoaXMueCArPSAobmV3UG9zLnggLSBwcmV2UG9zLngpICogdGhpcy5zaXplO1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSAobmV3UG9zLnkgLSBwcmV2UG9zLnkpICogdGhpcy5zaXplO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gXCJEaWdpdDBcIikge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBwcmV2UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2lkdGggLyAyLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCAvIDJcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gdGhpcy5zdGFydGluZ1NpemU7XG5cbiAgICAgICAgICAgICAgICBsZXQgbmV3UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gKG5ld1Bvcy54IC0gcHJldlBvcy54KSAqIHRoaXMuc2l6ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKG5ld1Bvcy55IC0gcHJldlBvcy55KSAqIHRoaXMuc2l6ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWUuY3RybEtleSAmJiAhZS5zaGlmdEtleSAmJiBlLmNvZGUgPT09IFwiS2V5SFwiKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZ2VuZXJhdGVDaGlsZHJlbigpOiBQSVhJLkdyYXBoaWNzW10ge1xuICAgICAgICBsZXQgd2lkdGggPSBkaW1lbnNpb25zKClbMF07XG4gICAgICAgIGxldCBoZWlnaHQgPSBkaW1lbnNpb25zKClbMV07XG4gICAgICAgIGNvbnN0IHRpbGVYQ291bnQgPSBNYXRoLmZsb29yKHdpZHRoIC8gdGhpcy5zaXplKTtcbiAgICAgICAgY29uc3QgdGlsZVlDb3VudCA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gdGhpcy5zaXplKTtcblxuICAgICAgICBsZXQgbGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcblxuICAgICAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgeCA9IC1NYXRoLmNlaWwodGhpcy54IC8gdGhpcy5zaXplKTtcbiAgICAgICAgICAgIHggPD0gdGlsZVhDb3VudCAtIE1hdGguZmxvb3IodGhpcy54IC8gdGhpcy5zaXplKTtcbiAgICAgICAgICAgIHgrK1xuICAgICAgICApIHtcbiAgICAgICAgICAgIGxpbmVHcmFwaGljcy5iZWdpbkZpbGwoY29uZmlnLmxpbmVDb2xvcik7XG4gICAgICAgICAgICBsaW5lR3JhcGhpY3MubGluZVN0eWxlKDApO1xuICAgICAgICAgICAgbGluZUdyYXBoaWNzLmRyYXdSZWN0KFxuICAgICAgICAgICAgICAgIHggKiB0aGlzLnNpemUsXG4gICAgICAgICAgICAgICAgLXRoaXMueSxcbiAgICAgICAgICAgICAgICBjb25maWcubGluZVdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgeSA9IC1NYXRoLmNlaWwodGhpcy55IC8gdGhpcy5zaXplKTtcbiAgICAgICAgICAgIHkgPD0gdGlsZVlDb3VudCAtIE1hdGguZmxvb3IodGhpcy55IC8gdGhpcy5zaXplKTtcbiAgICAgICAgICAgIHkrK1xuICAgICAgICApIHtcbiAgICAgICAgICAgIGxpbmVHcmFwaGljcy5iZWdpbkZpbGwoY29uZmlnLmxpbmVDb2xvcik7XG4gICAgICAgICAgICBsaW5lR3JhcGhpY3MubGluZVN0eWxlKDApO1xuICAgICAgICAgICAgbGluZUdyYXBoaWNzLmRyYXdSZWN0KFxuICAgICAgICAgICAgICAgIC10aGlzLngsXG4gICAgICAgICAgICAgICAgeSAqIHRoaXMuc2l6ZSxcbiAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICBjb25maWcubGluZVdpZHRoXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGdyaWRQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCguLi50aGlzLm1vdXNlUG9zKTtcbiAgICAgICAgZ3JpZFBvcy54ID0gTWF0aC5mbG9vcihncmlkUG9zLngpICogdGhpcy5zaXplO1xuICAgICAgICBncmlkUG9zLnkgPSBNYXRoLmZsb29yKGdyaWRQb3MueSkgKiB0aGlzLnNpemU7XG5cbiAgICAgICAgbGV0IGhsVGlsZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgICAgIGhsVGlsZS5iZWdpbkZpbGwoY29uZmlnLmhpZ2hsaWdodFRpbGVDb2xvcik7XG4gICAgICAgIGhsVGlsZS5saW5lU3R5bGUoMCk7XG4gICAgICAgIGhsVGlsZS5kcmF3UmVjdChcbiAgICAgICAgICAgIGdyaWRQb3MueCArIGNvbmZpZy5saW5lV2lkdGggLyAyLFxuICAgICAgICAgICAgZ3JpZFBvcy55ICsgY29uZmlnLmxpbmVXaWR0aCAvIDIsXG4gICAgICAgICAgICB0aGlzLnNpemUsXG4gICAgICAgICAgICB0aGlzLnNpemVcbiAgICAgICAgKTtcblxuICAgICAgICBvdXRwdXQucHVzaChobFRpbGUpO1xuICAgICAgICBvdXRwdXQucHVzaChsaW5lR3JhcGhpY3MpO1xuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgcmVuZGVyVGlsZXMoKSB7XG4gICAgICAgIGZvciAobGV0IFtrZXksIHRpbGVdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMudGlsZXMpKSB7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHRoaXMuYWRkQ2hpbGQoY2hpbGQpKTtcbiAgICAgICAgdGhpcy5yZW5kZXJUaWxlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZyb20gc2NyZWVuIHNwYWNlIHRvIGdyaWQgc3BhY2VcbiAgICAgKiBAcGFyYW0geCBYIGluIHNjcmVlbiBzcGFjZVxuICAgICAqIEBwYXJhbSB5IFkgaW4gc2NyZWVuIHNwYWNlXG4gICAgICogQHJldHVybnMgQ29vcmRpbmF0ZXMgaW4gZ3JpZCBzcGFjZVxuICAgICAqL1xuICAgIHNjcmVlblRvR3JpZCA9ICh4OiBudW1iZXIsIHk6IG51bWJlciwgZmxvb3JlZCA9IGZhbHNlKSA9PlxuICAgICAgICBmbG9vcmVkXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoKC10aGlzLnggKyB4KSAvIHRoaXMuc2l6ZSksXG4gICAgICAgICAgICAgICAgICB5OiBNYXRoLmZsb29yKCgtdGhpcy55ICsgeSkgLyB0aGlzLnNpemUpLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgIHg6ICgtdGhpcy54ICsgeCkgLyB0aGlzLnNpemUsXG4gICAgICAgICAgICAgICAgICB5OiAoLXRoaXMueSArIHkpIC8gdGhpcy5zaXplLFxuICAgICAgICAgICAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnJvbSBncmlkIHNwYWNlIHRvIHNjcmVlbiBzcGFjZSAoVG9wIExlZnQgY29ybmVyKVxuICAgICAqIEBwYXJhbSB4IFggaW4gZ3JpZCBzcGFjZVxuICAgICAqIEBwYXJhbSB5IFkgaW4gZ3JpZCBzcGFjZVxuICAgICAqIEByZXR1cm5zIENvb3JkaW5hdGVzIGluIHNjcmVlbiBzcGFjZVxuICAgICAqL1xuICAgIGdyaWRUb1NjcmVlbiA9ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gKHtcbiAgICAgICAgeDogTWF0aC5mbG9vcih4KSAqIHRoaXMuc2l6ZSArIHRoaXMueCxcbiAgICAgICAgeTogTWF0aC5mbG9vcih5KSAqIHRoaXMuc2l6ZSArIHRoaXMueSxcbiAgICB9KTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBT0E7QUFBQTtBQWtFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBS0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFLQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUtBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF3RUE7Ozs7O0FBS0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFVQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBek9BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBOztBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBMkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFNQTtBQUVBO0FBS0E7QUFDQTtBQUNBO0FBTUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTZCQTtBQUFBOzsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/grid.ts\n");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar grid_1 = __webpack_require__(/*! ./components/grid */ \"./src/components/grid.ts\");\r\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils/index.ts\");\r\nvar config_1 = __webpack_require__(/*! ./config */ \"./src/config.ts\");\r\nvar gui_window_1 = __webpack_require__(/*! ./components/gui/gui_window */ \"./src/components/gui/gui_window.ts\");\r\nPIXI.utils.skipHello();\r\nvar load = function (app) {\r\n    return new Promise(function (resolve) {\r\n        return app.loader\r\n            .add(\"doge\", \"assets/sprites/doge-icon.svg\")\r\n            .load(function () { return resolve(); });\r\n    });\r\n};\r\nvar main = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    function update(delta) {\r\n        guiTest.draw(delta);\r\n        sprite.x = grid.gridToScreen(0.5, 0.5).x;\r\n        sprite.y = grid.gridToScreen(0.5, 0.5).y;\r\n    }\r\n    var app, grid, sprite, guiTest;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                app = new PIXI.Application();\r\n                document.body.style.margin = \"0\";\r\n                app.renderer.view.style.position = \"absolute\";\r\n                app.renderer.view.style.display = \"block\";\r\n                app.renderer.resize(window.innerWidth, window.innerHeight);\r\n                document.body.appendChild(app.view);\r\n                return [4 /*yield*/, load(app)];\r\n            case 1:\r\n                _a.sent();\r\n                app.renderer.backgroundColor = config_1.default.backgroundColor;\r\n                grid = new grid_1.default(100);\r\n                app.stage.addChild(grid);\r\n                sprite = new PIXI.Sprite(app.loader.resources.doge.texture);\r\n                sprite.width = 20;\r\n                sprite.height = 20;\r\n                sprite.x = utils_1.width() / 2 - sprite.width / 2;\r\n                sprite.y = utils_1.height() / 2 - sprite.height / 2;\r\n                app.stage.addChild(sprite);\r\n                guiTest = new gui_window_1.default(20, 20, 100, 500, 0xff0000);\r\n                guiTest.draw(0);\r\n                app.stage.addChild(guiTest);\r\n                utils_1.onResize(function () {\r\n                    var _a;\r\n                    (_a = app.renderer).resize.apply(_a, utils_1.dimensions());\r\n                });\r\n                window.addEventListener(\"contextmenu\", function (e) { return e.preventDefault(); });\r\n                window.addEventListener(\"wheel\", function (e) {\r\n                    var hitObject = app.renderer.plugins.interaction.hitTest(new PIXI.Point(e.pageX, e.pageY), app.stage);\r\n                    if (hitObject != null) {\r\n                        utils_1.scrollListeners.forEach(function (eventObj) {\r\n                            if (eventObj.object == hitObject)\r\n                                eventObj.listener(e);\r\n                        });\r\n                    }\r\n                });\r\n                app.ticker.add(update);\r\n                return [2 /*return*/];\r\n        }\r\n    });\r\n}); };\r\nmain();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCBHcmlkIGZyb20gXCIuL2NvbXBvbmVudHMvZ3JpZFwiO1xuaW1wb3J0IHtcbiAgICBkaW1lbnNpb25zLFxuICAgIGhlaWdodCxcbiAgICBvblJlc2l6ZSxcbiAgICB3aWR0aCxcbiAgICBzY3JvbGxMaXN0ZW5lcnMsXG4gICAgRGlzcGxheU9iamVjdFNjcm9sbEV2ZW50LFxufSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCBHVUlXaW5kb3cgZnJvbSBcIi4vY29tcG9uZW50cy9ndWkvZ3VpX3dpbmRvd1wiO1xuXG5QSVhJLnV0aWxzLnNraXBIZWxsbygpO1xuXG5jb25zdCBsb2FkID0gKGFwcDogUElYSS5BcHBsaWNhdGlvbikgPT5cbiAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT5cbiAgICAgICAgYXBwLmxvYWRlclxuICAgICAgICAgICAgLmFkZChcImRvZ2VcIiwgXCJhc3NldHMvc3ByaXRlcy9kb2dlLWljb24uc3ZnXCIpXG4gICAgICAgICAgICAubG9hZCgoKSA9PiByZXNvbHZlKCkpXG4gICAgKTtcblxuY29uc3QgbWFpbiA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgYXBwID0gbmV3IFBJWEkuQXBwbGljYXRpb24oKTtcblxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUubWFyZ2luID0gXCIwXCI7XG4gICAgYXBwLnJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgYXBwLnJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBhcHAucmVuZGVyZXIucmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwLnZpZXcpO1xuXG4gICAgYXdhaXQgbG9hZChhcHApO1xuXG4gICAgYXBwLnJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGNvbmZpZy5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICBsZXQgZ3JpZCA9IG5ldyBHcmlkKDEwMCk7XG5cbiAgICBhcHAuc3RhZ2UuYWRkQ2hpbGQoZ3JpZCk7XG5cbiAgICBsZXQgc3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKGFwcC5sb2FkZXIucmVzb3VyY2VzLmRvZ2UudGV4dHVyZSk7XG4gICAgc3ByaXRlLndpZHRoID0gMjA7XG4gICAgc3ByaXRlLmhlaWdodCA9IDIwO1xuICAgIHNwcml0ZS54ID0gd2lkdGgoKSAvIDIgLSBzcHJpdGUud2lkdGggLyAyO1xuICAgIHNwcml0ZS55ID0gaGVpZ2h0KCkgLyAyIC0gc3ByaXRlLmhlaWdodCAvIDI7XG4gICAgYXBwLnN0YWdlLmFkZENoaWxkKHNwcml0ZSk7XG5cbiAgICBsZXQgZ3VpVGVzdCA9IG5ldyBHVUlXaW5kb3coMjAsIDIwLCAxMDAsIDUwMCwgMHhmZjAwMDApO1xuICAgIGd1aVRlc3QuZHJhdygwKTtcblxuICAgIGFwcC5zdGFnZS5hZGRDaGlsZChndWlUZXN0KTtcblxuICAgIG9uUmVzaXplKCgpID0+IHtcbiAgICAgICAgYXBwLnJlbmRlcmVyLnJlc2l6ZSguLi5kaW1lbnNpb25zKCkpO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgKGU6IFdoZWVsRXZlbnQpID0+IHtcbiAgICAgICAgbGV0IGhpdE9iamVjdCA9IGFwcC5yZW5kZXJlci5wbHVnaW5zLmludGVyYWN0aW9uLmhpdFRlc3QoXG4gICAgICAgICAgICBuZXcgUElYSS5Qb2ludChlLnBhZ2VYLCBlLnBhZ2VZKSxcbiAgICAgICAgICAgIGFwcC5zdGFnZVxuICAgICAgICApO1xuICAgICAgICBpZiAoaGl0T2JqZWN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHNjcm9sbExpc3RlbmVycy5mb3JFYWNoKChldmVudE9iajogRGlzcGxheU9iamVjdFNjcm9sbEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50T2JqLm9iamVjdCA9PSBoaXRPYmplY3QpIGV2ZW50T2JqLmxpc3RlbmVyKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZShkZWx0YTogbnVtYmVyKSB7XG4gICAgICAgIGd1aVRlc3QuZHJhdyhkZWx0YSk7XG4gICAgICAgIHNwcml0ZS54ID0gZ3JpZC5ncmlkVG9TY3JlZW4oMC41LCAwLjUpLng7XG4gICAgICAgIHNwcml0ZS55ID0gZ3JpZC5ncmlkVG9TY3JlZW4oMC41LCAwLjUpLnk7XG4gICAgfVxuXG4gICAgYXBwLnRpY2tlci5hZGQodXBkYXRlKTtcbn07XG5cbm1haW4oKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFEQTtBQU1BO0FBK0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBbERBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUFBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7O0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBUUE7Ozs7QUFDQTtBQUVBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.ts\n");

/***/ })

})
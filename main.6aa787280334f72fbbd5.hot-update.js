webpackHotUpdate("main",{

/***/ "./src/components/grid.ts":
/*!********************************!*\
  !*** ./src/components/grid.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __spreadArray = (this && this.__spreadArray) || function (to, from) {\r\n    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)\r\n        to[j] = from[i];\r\n    return to;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\r\nvar math_1 = __webpack_require__(/*! ../utils/math */ \"./src/utils/math.ts\");\r\nvar config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\r\nvar wire_tile_1 = __webpack_require__(/*! ./tiles/wire-tile */ \"./src/components/tiles/wire-tile.ts\");\r\nvar Grid = /** @class */ (function (_super) {\r\n    __extends(Grid, _super);\r\n    function Grid(size) {\r\n        var _this = _super.call(this) || this;\r\n        _this.keyDown = function (e) {\r\n            if (e.ctrlKey && !e.shiftKey) {\r\n                if (e.code === \"Equal\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * -100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Minus\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * 100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Digit0\") {\r\n                    e.preventDefault();\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = _this.startingSize;\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n            }\r\n            if (!e.ctrlKey && !e.shiftKey && e.code === \"KeyH\") {\r\n                e.preventDefault();\r\n                _this.x = 0;\r\n                _this.y = 0;\r\n                _this.update();\r\n            }\r\n        };\r\n        /**\r\n         * From screen space to grid space\r\n         * @param x X in screen space\r\n         * @param y Y in screen space\r\n         * @returns Coordinates in grid space\r\n         */\r\n        _this.screenToGrid = function (x, y, floored) {\r\n            if (floored === void 0) { floored = false; }\r\n            return ({\r\n                x: (-_this.x + x) / _this.size,\r\n                y: (-_this.y + y) / _this.size,\r\n            });\r\n        };\r\n        /**\r\n         * From grid space to screen space (Top Left corner)\r\n         * @param x X in grid space\r\n         * @param y Y in grid space\r\n         * @returns Coordinates in screen space\r\n         */\r\n        _this.gridToScreen = function (x, y) { return ({\r\n            x: Math.floor(x) * _this.size + _this.x,\r\n            y: Math.floor(y) * _this.size + _this.y,\r\n        }); };\r\n        _this.startingSize = size;\r\n        _this.size = size;\r\n        _this.tiles = {};\r\n        _this.mousePos = [0, 0];\r\n        _this.generateChildren().forEach(function (child) { return _this.addChild(child); });\r\n        utils_1.onResize(_this.update.bind(_this));\r\n        _this.interactive = true;\r\n        utils_1.onScroll(_this, _this.scroll.bind(_this));\r\n        _this.on(\"mousemove\", _this.mouseMove.bind(_this));\r\n        utils_1.onKeyDown(_this.keyDown);\r\n        return _this;\r\n    }\r\n    Grid.prototype.addTile = function () { };\r\n    Grid.prototype.scroll = function (e) {\r\n        if (e.deltaY === 0)\r\n            return;\r\n        var mult = 1 / (config_1.default.zoomCoeff * e.deltaY);\r\n        if (mult < 0)\r\n            mult = -1 / mult;\r\n        var prevPos = this.screenToGrid(e.pageX, e.pageY);\r\n        this.size = Math.round(mult * this.size);\r\n        this.size = math_1.clamp(this.size, 20, 350);\r\n        var newPos = this.screenToGrid(e.pageX, e.pageY);\r\n        this.x += (newPos.x - prevPos.x) * this.size;\r\n        this.y += (newPos.y - prevPos.y) * this.size;\r\n        this.update();\r\n    };\r\n    Grid.prototype.mouseMove = function (event) {\r\n        var e = event.data.originalEvent;\r\n        this.mousePos = [e.pageX, e.pageY];\r\n        if (utils_1.mouseDown.left) {\r\n            if (e.shiftKey || utils_1.pressedKeys[\"Space\"]) {\r\n                this.x += e.movementX;\r\n                this.y += e.movementY;\r\n            }\r\n            else {\r\n                var gridPoint = utils_1.locationToTuple(this.screenToGrid.apply(this, this.mousePos));\r\n                if (this.tiles[gridPoint.join()])\r\n                    return;\r\n                this.tiles[gridPoint.join()] = new (wire_tile_1.default.bind.apply(wire_tile_1.default, __spreadArray([void 0], utils_1.locationToTuple(this.screenToGrid.apply(this, this.mousePos)))))();\r\n                console.log(this.tiles);\r\n            }\r\n        }\r\n        this.update();\r\n    };\r\n    Grid.prototype.generateChildren = function () {\r\n        var width = utils_1.dimensions()[0];\r\n        var height = utils_1.dimensions()[1];\r\n        var tileXCount = Math.floor(width / this.size);\r\n        var tileYCount = Math.floor(height / this.size);\r\n        var lineGraphics = new PIXI.Graphics();\r\n        var output = [];\r\n        for (var x = -Math.ceil(this.x / this.size); x <= tileXCount - Math.floor(this.x / this.size); x++) {\r\n            lineGraphics.beginFill(config_1.default.lineColor);\r\n            lineGraphics.lineStyle(0);\r\n            lineGraphics.drawRect(x * this.size, -this.y, config_1.default.lineWidth, height);\r\n        }\r\n        for (var y = -Math.ceil(this.y / this.size); y <= tileYCount - Math.floor(this.y / this.size); y++) {\r\n            lineGraphics.beginFill(config_1.default.lineColor);\r\n            lineGraphics.lineStyle(0);\r\n            lineGraphics.drawRect(-this.x, y * this.size, width, config_1.default.lineWidth);\r\n        }\r\n        var gridPos = this.screenToGrid.apply(this, this.mousePos);\r\n        gridPos.x = Math.floor(gridPos.x) * this.size;\r\n        gridPos.y = Math.floor(gridPos.y) * this.size;\r\n        var hlTile = new PIXI.Graphics();\r\n        hlTile.beginFill(config_1.default.highlightTileColor);\r\n        hlTile.lineStyle(0);\r\n        hlTile.drawRect(gridPos.x + config_1.default.lineWidth / 2, gridPos.y + config_1.default.lineWidth / 2, this.size, this.size);\r\n        output.push(hlTile);\r\n        output.push(lineGraphics);\r\n        return output;\r\n    };\r\n    Grid.prototype.update = function () {\r\n        var _this = this;\r\n        this.removeChildren();\r\n        this.generateChildren().forEach(function (child) { return _this.addChild(child); });\r\n    };\r\n    return Grid;\r\n}(PIXI.Container));\r\nexports.default = Grid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ncmlkLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL2dyaWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xuaW1wb3J0IHtcbiAgICBkaW1lbnNpb25zLFxuICAgIGxvY2F0aW9uVG9UdXBsZSxcbiAgICBtb3VzZURvd24sXG4gICAgb25LZXlEb3duLFxuICAgIG9uUmVzaXplLFxuICAgIG9uU2Nyb2xsLFxuICAgIHByZXNzZWRLZXlzLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7IGNsYW1wIH0gZnJvbSBcIi4uL3V0aWxzL21hdGhcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IFRpbGUgZnJvbSBcIi4vdGlsZXMvdGlsZVwiO1xuaW1wb3J0IFdpcmUgZnJvbSBcIi4vdGlsZXMvd2lyZS10aWxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XG4gICAgc3RhcnRpbmdTaXplOiBudW1iZXI7XG4gICAgc2l6ZTogbnVtYmVyO1xuICAgIHRpbGVzOiB7IFtrZXk6IHN0cmluZ106IFRpbGUgfTtcblxuICAgIG1vdXNlUG9zOiBbeDogbnVtYmVyLCB5OiBudW1iZXJdO1xuXG4gICAgY29uc3RydWN0b3Ioc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhcnRpbmdTaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy50aWxlcyA9IHt9O1xuICAgICAgICB0aGlzLm1vdXNlUG9zID0gWzAsIDBdO1xuXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVDaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB0aGlzLmFkZENoaWxkKGNoaWxkKSk7XG5cbiAgICAgICAgb25SZXNpemUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5pbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgb25TY3JvbGwodGhpcywgdGhpcy5zY3JvbGwuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5vbihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICBvbktleURvd24odGhpcy5rZXlEb3duKTtcbiAgICB9XG5cbiAgICBhZGRUaWxlKCkge31cblxuICAgIHNjcm9sbChlOiBXaGVlbEV2ZW50KSB7XG4gICAgICAgIGlmIChlLmRlbHRhWSA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBtdWx0ID0gMSAvIChjb25maWcuem9vbUNvZWZmICogZS5kZWx0YVkpO1xuICAgICAgICBpZiAobXVsdCA8IDApIG11bHQgPSAtMSAvIG11bHQ7XG5cbiAgICAgICAgbGV0IHByZXZQb3MgPSB0aGlzLnNjcmVlblRvR3JpZChlLnBhZ2VYLCBlLnBhZ2VZKTtcblxuICAgICAgICB0aGlzLnNpemUgPSBNYXRoLnJvdW5kKG11bHQgKiB0aGlzLnNpemUpO1xuICAgICAgICB0aGlzLnNpemUgPSBjbGFtcCh0aGlzLnNpemUsIDIwLCAzNTApO1xuXG4gICAgICAgIGxldCBuZXdQb3MgPSB0aGlzLnNjcmVlblRvR3JpZChlLnBhZ2VYLCBlLnBhZ2VZKTtcblxuICAgICAgICB0aGlzLnggKz0gKG5ld1Bvcy54IC0gcHJldlBvcy54KSAqIHRoaXMuc2l6ZTtcbiAgICAgICAgdGhpcy55ICs9IChuZXdQb3MueSAtIHByZXZQb3MueSkgKiB0aGlzLnNpemU7XG5cbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBtb3VzZU1vdmUoZXZlbnQ6IGFueSkge1xuICAgICAgICBsZXQgZSA9IGV2ZW50LmRhdGEub3JpZ2luYWxFdmVudCBhcyBQb2ludGVyRXZlbnQ7XG4gICAgICAgIHRoaXMubW91c2VQb3MgPSBbZS5wYWdlWCwgZS5wYWdlWV07XG4gICAgICAgIGlmIChtb3VzZURvd24ubGVmdCkge1xuICAgICAgICAgICAgaWYgKGUuc2hpZnRLZXkgfHwgcHJlc3NlZEtleXNbXCJTcGFjZVwiXSkge1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSBlLm1vdmVtZW50WDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gZS5tb3ZlbWVudFk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyaWRQb2ludCA9IGxvY2F0aW9uVG9UdXBsZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JlZW5Ub0dyaWQoLi4udGhpcy5tb3VzZVBvcylcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbGVzW2dyaWRQb2ludC5qb2luKCldKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy50aWxlc1tncmlkUG9pbnQuam9pbigpXSA9IG5ldyBXaXJlKFxuICAgICAgICAgICAgICAgICAgICAuLi5sb2NhdGlvblRvVHVwbGUodGhpcy5zY3JlZW5Ub0dyaWQoLi4udGhpcy5tb3VzZVBvcykpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRpbGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAga2V5RG93biA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChlLmN0cmxLZXkgJiYgIWUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT09IFwiRXF1YWxcIikge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBtdWx0ID0gMSAvIChjb25maWcuem9vbUNvZWZmICogLTEwMCk7XG4gICAgICAgICAgICAgICAgaWYgKG11bHQgPCAwKSBtdWx0ID0gLTEgLyBtdWx0O1xuXG4gICAgICAgICAgICAgICAgbGV0IHByZXZQb3MgPSB0aGlzLnNjcmVlblRvR3JpZChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0IC8gMlxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSBNYXRoLnJvdW5kKG11bHQgKiB0aGlzLnNpemUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IGNsYW1wKHRoaXMuc2l6ZSwgMjAsIDM1MCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbmV3UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gKG5ld1Bvcy54IC0gcHJldlBvcy54KSAqIHRoaXMuc2l6ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKG5ld1Bvcy55IC0gcHJldlBvcy55KSAqIHRoaXMuc2l6ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT09IFwiTWludXNcIikge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBtdWx0ID0gMSAvIChjb25maWcuem9vbUNvZWZmICogMTAwKTtcbiAgICAgICAgICAgICAgICBpZiAobXVsdCA8IDApIG11bHQgPSAtMSAvIG11bHQ7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJldlBvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpZHRoIC8gMixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgLyAyXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IE1hdGgucm91bmQobXVsdCAqIHRoaXMuc2l6ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gY2xhbXAodGhpcy5zaXplLCAyMCwgMzUwKTtcblxuICAgICAgICAgICAgICAgIGxldCBuZXdQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcblxuICAgICAgICAgICAgICAgIHRoaXMueCArPSAobmV3UG9zLnggLSBwcmV2UG9zLngpICogdGhpcy5zaXplO1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSAobmV3UG9zLnkgLSBwcmV2UG9zLnkpICogdGhpcy5zaXplO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gXCJEaWdpdDBcIikge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBwcmV2UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2lkdGggLyAyLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCAvIDJcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gdGhpcy5zdGFydGluZ1NpemU7XG5cbiAgICAgICAgICAgICAgICBsZXQgbmV3UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gKG5ld1Bvcy54IC0gcHJldlBvcy54KSAqIHRoaXMuc2l6ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKG5ld1Bvcy55IC0gcHJldlBvcy55KSAqIHRoaXMuc2l6ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWUuY3RybEtleSAmJiAhZS5zaGlmdEtleSAmJiBlLmNvZGUgPT09IFwiS2V5SFwiKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZ2VuZXJhdGVDaGlsZHJlbigpOiBQSVhJLkdyYXBoaWNzW10ge1xuICAgICAgICBsZXQgd2lkdGggPSBkaW1lbnNpb25zKClbMF07XG4gICAgICAgIGxldCBoZWlnaHQgPSBkaW1lbnNpb25zKClbMV07XG4gICAgICAgIGNvbnN0IHRpbGVYQ291bnQgPSBNYXRoLmZsb29yKHdpZHRoIC8gdGhpcy5zaXplKTtcbiAgICAgICAgY29uc3QgdGlsZVlDb3VudCA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gdGhpcy5zaXplKTtcblxuICAgICAgICBsZXQgbGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcblxuICAgICAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgeCA9IC1NYXRoLmNlaWwodGhpcy54IC8gdGhpcy5zaXplKTtcbiAgICAgICAgICAgIHggPD0gdGlsZVhDb3VudCAtIE1hdGguZmxvb3IodGhpcy54IC8gdGhpcy5zaXplKTtcbiAgICAgICAgICAgIHgrK1xuICAgICAgICApIHtcbiAgICAgICAgICAgIGxpbmVHcmFwaGljcy5iZWdpbkZpbGwoY29uZmlnLmxpbmVDb2xvcik7XG4gICAgICAgICAgICBsaW5lR3JhcGhpY3MubGluZVN0eWxlKDApO1xuICAgICAgICAgICAgbGluZUdyYXBoaWNzLmRyYXdSZWN0KFxuICAgICAgICAgICAgICAgIHggKiB0aGlzLnNpemUsXG4gICAgICAgICAgICAgICAgLXRoaXMueSxcbiAgICAgICAgICAgICAgICBjb25maWcubGluZVdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgeSA9IC1NYXRoLmNlaWwodGhpcy55IC8gdGhpcy5zaXplKTtcbiAgICAgICAgICAgIHkgPD0gdGlsZVlDb3VudCAtIE1hdGguZmxvb3IodGhpcy55IC8gdGhpcy5zaXplKTtcbiAgICAgICAgICAgIHkrK1xuICAgICAgICApIHtcbiAgICAgICAgICAgIGxpbmVHcmFwaGljcy5iZWdpbkZpbGwoY29uZmlnLmxpbmVDb2xvcik7XG4gICAgICAgICAgICBsaW5lR3JhcGhpY3MubGluZVN0eWxlKDApO1xuICAgICAgICAgICAgbGluZUdyYXBoaWNzLmRyYXdSZWN0KFxuICAgICAgICAgICAgICAgIC10aGlzLngsXG4gICAgICAgICAgICAgICAgeSAqIHRoaXMuc2l6ZSxcbiAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICBjb25maWcubGluZVdpZHRoXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGdyaWRQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCguLi50aGlzLm1vdXNlUG9zKTtcbiAgICAgICAgZ3JpZFBvcy54ID0gTWF0aC5mbG9vcihncmlkUG9zLngpICogdGhpcy5zaXplO1xuICAgICAgICBncmlkUG9zLnkgPSBNYXRoLmZsb29yKGdyaWRQb3MueSkgKiB0aGlzLnNpemU7XG5cbiAgICAgICAgbGV0IGhsVGlsZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgICAgIGhsVGlsZS5iZWdpbkZpbGwoY29uZmlnLmhpZ2hsaWdodFRpbGVDb2xvcik7XG4gICAgICAgIGhsVGlsZS5saW5lU3R5bGUoMCk7XG4gICAgICAgIGhsVGlsZS5kcmF3UmVjdChcbiAgICAgICAgICAgIGdyaWRQb3MueCArIGNvbmZpZy5saW5lV2lkdGggLyAyLFxuICAgICAgICAgICAgZ3JpZFBvcy55ICsgY29uZmlnLmxpbmVXaWR0aCAvIDIsXG4gICAgICAgICAgICB0aGlzLnNpemUsXG4gICAgICAgICAgICB0aGlzLnNpemVcbiAgICAgICAgKTtcblxuICAgICAgICBvdXRwdXQucHVzaChobFRpbGUpO1xuICAgICAgICBvdXRwdXQucHVzaChsaW5lR3JhcGhpY3MpO1xuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkcmVuKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVDaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB0aGlzLmFkZENoaWxkKGNoaWxkKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnJvbSBzY3JlZW4gc3BhY2UgdG8gZ3JpZCBzcGFjZVxuICAgICAqIEBwYXJhbSB4IFggaW4gc2NyZWVuIHNwYWNlXG4gICAgICogQHBhcmFtIHkgWSBpbiBzY3JlZW4gc3BhY2VcbiAgICAgKiBAcmV0dXJucyBDb29yZGluYXRlcyBpbiBncmlkIHNwYWNlXG4gICAgICovXG4gICAgc2NyZWVuVG9HcmlkID0gKHg6IG51bWJlciwgeTogbnVtYmVyLCBmbG9vcmVkID0gZmFsc2UpID0+ICh7XG4gICAgICAgIHg6ICgtdGhpcy54ICsgeCkgLyB0aGlzLnNpemUsXG4gICAgICAgIHk6ICgtdGhpcy55ICsgeSkgLyB0aGlzLnNpemUsXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBGcm9tIGdyaWQgc3BhY2UgdG8gc2NyZWVuIHNwYWNlIChUb3AgTGVmdCBjb3JuZXIpXG4gICAgICogQHBhcmFtIHggWCBpbiBncmlkIHNwYWNlXG4gICAgICogQHBhcmFtIHkgWSBpbiBncmlkIHNwYWNlXG4gICAgICogQHJldHVybnMgQ29vcmRpbmF0ZXMgaW4gc2NyZWVuIHNwYWNlXG4gICAgICovXG4gICAgZ3JpZFRvU2NyZWVuID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiAoe1xuICAgICAgICB4OiBNYXRoLmZsb29yKHgpICogdGhpcy5zaXplICsgdGhpcy54LFxuICAgICAgICB5OiBNYXRoLmZsb29yKHkpICogdGhpcy5zaXplICsgdGhpcy55LFxuICAgIH0pO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQVNBO0FBQ0E7QUFFQTtBQUVBO0FBQUE7QUFPQTtBQUFBO0FBK0RBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFLQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUtBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBS0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWtFQTs7Ozs7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTFOQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTs7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQTJFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBTUE7QUFFQTtBQUtBO0FBQ0E7QUFDQTtBQU1BO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUF1QkE7QUFBQTs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/grid.ts\n");

/***/ })

})
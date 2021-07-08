webpackHotUpdate("main",{

/***/ "./src/components/grid.ts":
/*!********************************!*\
  !*** ./src/components/grid.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __spreadArray = (this && this.__spreadArray) || function (to, from) {\r\n    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)\r\n        to[j] = from[i];\r\n    return to;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\r\nvar math_1 = __webpack_require__(/*! ../utils/math */ \"./src/utils/math.ts\");\r\nvar config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\r\nvar wire_tile_1 = __webpack_require__(/*! ./tiles/wire-tile */ \"./src/components/tiles/wire-tile.ts\");\r\nvar Grid = /** @class */ (function (_super) {\r\n    __extends(Grid, _super);\r\n    function Grid(size) {\r\n        var _this = _super.call(this) || this;\r\n        _this.scroll = function (e) {\r\n            if (e.deltaY === 0)\r\n                return;\r\n            var mult = 1 / (config_1.default.zoomCoeff * e.deltaY);\r\n            if (mult < 0)\r\n                mult = -1 / mult;\r\n            var prevPos = _this.screenToGrid(e.pageX, e.pageY);\r\n            _this.size = Math.round(mult * _this.size);\r\n            _this.size = math_1.clamp(_this.size, 20, 350);\r\n            var newPos = _this.screenToGrid(e.pageX, e.pageY);\r\n            _this.x += (newPos.x - prevPos.x) * _this.size;\r\n            _this.y += (newPos.y - prevPos.y) * _this.size;\r\n            _this.update();\r\n        };\r\n        _this.mouseMove = function (event) {\r\n            var e = event.data.originalEvent;\r\n            _this.mousePos = [e.pageX, e.pageY];\r\n            if (utils_1.mouseDown.left) {\r\n                if (e.shiftKey || utils_1.pressedKeys[\"Space\"]) {\r\n                    _this.x += e.movementX;\r\n                    _this.y += e.movementY;\r\n                }\r\n                else {\r\n                    var gridPoint = utils_1.locationToTuple(_this.screenToGrid.apply(_this, __spreadArray(__spreadArray([], _this.mousePos), [true])));\r\n                    _this.addTile.apply(_this, __spreadArray(__spreadArray([], gridPoint), [wire_tile_1.default]));\r\n                }\r\n            }\r\n            _this.update();\r\n        };\r\n        _this.click = function (event) {\r\n            if (event.data.button == 0 && !event.data.originalEvent.shiftKey) {\r\n                var gridPoint = utils_1.locationToTuple(_this.screenToGrid.apply(_this, __spreadArray(__spreadArray([], _this.mousePos), [true])));\r\n                _this.addTile.apply(_this, __spreadArray(__spreadArray([], gridPoint), [wire_tile_1.default]));\r\n                _this.update();\r\n            }\r\n        };\r\n        _this.keyDown = function (e) {\r\n            if (e.ctrlKey && !e.shiftKey) {\r\n                if (e.code === \"Equal\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * -100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Minus\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * 100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Digit0\") {\r\n                    e.preventDefault();\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = _this.startingSize;\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n            }\r\n            if (!e.ctrlKey && !e.shiftKey && e.code === \"KeyH\") {\r\n                e.preventDefault();\r\n                _this.x = 0;\r\n                _this.y = 0;\r\n                _this.update();\r\n            }\r\n        };\r\n        _this.update = function () {\r\n            // this.removeChildren();\r\n            _this.renderGrid();\r\n            // this.generateChildren().forEach((child) => this.addChild(child));\r\n            _this.renderTiles();\r\n        };\r\n        /**\r\n         * From screen space to grid space\r\n         * @param x X in screen space\r\n         * @param y Y in screen space\r\n         * @returns Coordinates in grid space\r\n         */\r\n        _this.screenToGrid = function (x, y, floored) {\r\n            if (floored === void 0) { floored = false; }\r\n            return floored\r\n                ? {\r\n                    x: Math.floor((-_this.x + x) / _this.size),\r\n                    y: Math.floor((-_this.y + y) / _this.size),\r\n                }\r\n                : {\r\n                    x: (-_this.x + x) / _this.size,\r\n                    y: (-_this.y + y) / _this.size,\r\n                };\r\n        };\r\n        /**\r\n         * From grid space to screen space (Top Left corner)\r\n         * @param x X in grid space\r\n         * @param y Y in grid space\r\n         * @returns Coordinates in screen space\r\n         */\r\n        _this.gridToScreen = function (x, y) { return ({\r\n            x: Math.floor(x) * _this.size + _this.x,\r\n            y: Math.floor(y) * _this.size + _this.y,\r\n        }); };\r\n        _this.startingSize = size;\r\n        _this.size = size;\r\n        _this.tiles = {};\r\n        _this.mousePos = [0, 0];\r\n        _this.lineGraphics = new PIXI.Graphics();\r\n        _this.hlTile = new PIXI.Graphics();\r\n        _this.addChild(_this.lineGraphics);\r\n        _this.addChild(_this.hlTile);\r\n        // this.generateChildren().forEach((child) => this.addChild(child));\r\n        _this.renderGrid();\r\n        utils_1.onResize(_this.update);\r\n        _this.interactive = true;\r\n        utils_1.onScroll(_this, _this.scroll);\r\n        _this.on(\"mousemove\", _this.mouseMove);\r\n        utils_1.onKeyDown(_this.keyDown);\r\n        return _this;\r\n    }\r\n    Grid.prototype.addTile = function (x, y, tile) {\r\n        if (this.tiles[x + \",\" + y])\r\n            return false;\r\n        var tileObj = new tile(x, y);\r\n        this.tiles[x + \",\" + y] = tileObj;\r\n        console.log(this.tiles);\r\n        var tileGraphics = tileObj.getContainer(this.size);\r\n        // const screenPoint = this.gridToScreen(tile.x, tile.y);\r\n        this.addChild(tileGraphics);\r\n        return true;\r\n    };\r\n    Grid.prototype.renderGrid = function () {\r\n        var width = utils_1.dimensions()[0];\r\n        var height = utils_1.dimensions()[1];\r\n        var tileXCount = Math.floor(width / this.size);\r\n        var tileYCount = Math.floor(height / this.size);\r\n        this.lineGraphics.clear();\r\n        var output = [];\r\n        for (var x = -Math.ceil(this.x / this.size); x <= tileXCount - Math.floor(this.x / this.size); x++) {\r\n            this.lineGraphics.beginFill(config_1.default.lineColor);\r\n            this.lineGraphics.lineStyle(0);\r\n            this.lineGraphics.drawRect(x * this.size, -this.y, config_1.default.lineWidth, height);\r\n        }\r\n        for (var y = -Math.ceil(this.y / this.size); y <= tileYCount - Math.floor(this.y / this.size); y++) {\r\n            this.lineGraphics.beginFill(config_1.default.lineColor);\r\n            this.lineGraphics.lineStyle(0);\r\n            this.lineGraphics.drawRect(-this.x, y * this.size, width, config_1.default.lineWidth);\r\n        }\r\n        var gridPos = this.screenToGrid.apply(this, this.mousePos);\r\n        gridPos.x = Math.floor(gridPos.x) * this.size;\r\n        gridPos.y = Math.floor(gridPos.y) * this.size;\r\n        this.hlTile.clear();\r\n        this.hlTile.beginFill(config_1.default.highlightTileColor);\r\n        this.hlTile.lineStyle(0);\r\n        this.hlTile.drawRect(gridPos.x + config_1.default.lineWidth / 2, gridPos.y + config_1.default.lineWidth / 2, this.size, this.size);\r\n    };\r\n    Grid.prototype.renderTiles = function () {\r\n        for (var _i = 0, _a = Object.entries(this.tiles); _i < _a.length; _i++) {\r\n            var _b = _a[_i], key = _b[0], tile = _b[1];\r\n            // const tileGraphics: PIXI.Container = tile.draw(this.size);\r\n            // tileGraphics.x += tile.x * this.size;\r\n            // tileGraphics.y += tile.y * this.size;\r\n            // this.addChild(tileGraphics);\r\n            tile.update(this.size);\r\n        }\r\n    };\r\n    return Grid;\r\n}(PIXI.Container));\r\nexports.default = Grid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ncmlkLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL2dyaWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgZGltZW5zaW9ucyxcclxuICAgIGxvY2F0aW9uVG9UdXBsZSxcclxuICAgIG1vdXNlRG93bixcclxuICAgIG9uS2V5RG93bixcclxuICAgIG9uUmVzaXplLFxyXG4gICAgb25TY3JvbGwsXHJcbiAgICBwcmVzc2VkS2V5cyxcclxufSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgY2xhbXAgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aFwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IFdpcmUgZnJvbSBcIi4vdGlsZXMvd2lyZS10aWxlXCI7XHJcbmltcG9ydCB7IFRpbGUgfSBmcm9tIFwiLi90aWxlcy90aWxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xyXG4gICAgc3RhcnRpbmdTaXplOiBudW1iZXI7XHJcbiAgICBzaXplOiBudW1iZXI7XHJcbiAgICB0aWxlczogeyBba2V5OiBzdHJpbmddOiBUaWxlIH07XHJcblxyXG4gICAgbW91c2VQb3M6IFt4OiBudW1iZXIsIHk6IG51bWJlcl07XHJcblxyXG4gICAgbGluZUdyYXBoaWNzOiBQSVhJLkdyYXBoaWNzO1xyXG4gICAgaGxUaWxlOiBQSVhJLkdyYXBoaWNzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydGluZ1NpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy50aWxlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMubW91c2VQb3MgPSBbMCwgMF07XHJcblxyXG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICB0aGlzLmhsVGlsZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5saW5lR3JhcGhpY3MpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5obFRpbGUpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmdlbmVyYXRlQ2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4gdGhpcy5hZGRDaGlsZChjaGlsZCkpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyR3JpZCgpO1xyXG5cclxuICAgICAgICBvblJlc2l6ZSh0aGlzLnVwZGF0ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICBvblNjcm9sbCh0aGlzLCB0aGlzLnNjcm9sbCk7XHJcblxyXG4gICAgICAgIHRoaXMub24oXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZU1vdmUpO1xyXG5cclxuICAgICAgICBvbktleURvd24odGhpcy5rZXlEb3duKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUaWxlPFQgZXh0ZW5kcyBUaWxlPihcclxuICAgICAgICB4OiBudW1iZXIsXHJcbiAgICAgICAgeTogbnVtYmVyLFxyXG4gICAgICAgIHRpbGU6IHsgbmV3ICh4OiBudW1iZXIsIHk6IG51bWJlcik6IFQgfVxyXG4gICAgKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMudGlsZXNbYCR7eH0sJHt5fWBdKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgbGV0IHRpbGVPYmogPSBuZXcgdGlsZSh4LCB5KTtcclxuICAgICAgICB0aGlzLnRpbGVzW2Ake3h9LCR7eX1gXSA9IHRpbGVPYmo7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50aWxlcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRpbGVHcmFwaGljczogUElYSS5Db250YWluZXIgPSB0aWxlT2JqLmdldENvbnRhaW5lcih0aGlzLnNpemUpO1xyXG4gICAgICAgIC8vIGNvbnN0IHNjcmVlblBvaW50ID0gdGhpcy5ncmlkVG9TY3JlZW4odGlsZS54LCB0aWxlLnkpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGlsZUdyYXBoaWNzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2Nyb2xsID0gKGU6IFdoZWVsRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZS5kZWx0YVkgPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG11bHQgPSAxIC8gKGNvbmZpZy56b29tQ29lZmYgKiBlLmRlbHRhWSk7XHJcbiAgICAgICAgaWYgKG11bHQgPCAwKSBtdWx0ID0gLTEgLyBtdWx0O1xyXG5cclxuICAgICAgICBsZXQgcHJldlBvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKGUucGFnZVgsIGUucGFnZVkpO1xyXG5cclxuICAgICAgICB0aGlzLnNpemUgPSBNYXRoLnJvdW5kKG11bHQgKiB0aGlzLnNpemUpO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IGNsYW1wKHRoaXMuc2l6ZSwgMjAsIDM1MCk7XHJcblxyXG4gICAgICAgIGxldCBuZXdQb3MgPSB0aGlzLnNjcmVlblRvR3JpZChlLnBhZ2VYLCBlLnBhZ2VZKTtcclxuXHJcbiAgICAgICAgdGhpcy54ICs9IChuZXdQb3MueCAtIHByZXZQb3MueCkgKiB0aGlzLnNpemU7XHJcbiAgICAgICAgdGhpcy55ICs9IChuZXdQb3MueSAtIHByZXZQb3MueSkgKiB0aGlzLnNpemU7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIG1vdXNlTW92ZSA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgbGV0IGUgPSBldmVudC5kYXRhLm9yaWdpbmFsRXZlbnQgYXMgUG9pbnRlckV2ZW50O1xyXG4gICAgICAgIHRoaXMubW91c2VQb3MgPSBbZS5wYWdlWCwgZS5wYWdlWV07XHJcbiAgICAgICAgaWYgKG1vdXNlRG93bi5sZWZ0KSB7XHJcbiAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5IHx8IHByZXNzZWRLZXlzW1wiU3BhY2VcIl0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueCArPSBlLm1vdmVtZW50WDtcclxuICAgICAgICAgICAgICAgIHRoaXMueSArPSBlLm1vdmVtZW50WTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdyaWRQb2ludCA9IGxvY2F0aW9uVG9UdXBsZShcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcmVlblRvR3JpZCguLi50aGlzLm1vdXNlUG9zLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRpbGUoLi4uZ3JpZFBvaW50LCBXaXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgY2xpY2sgPSAoZXZlbnQ6IFBJWEkuaW50ZXJhY3Rpb24uSW50ZXJhY3Rpb25FdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC5kYXRhLmJ1dHRvbiA9PSAwICYmICFldmVudC5kYXRhLm9yaWdpbmFsRXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZFBvaW50ID0gbG9jYXRpb25Ub1R1cGxlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JlZW5Ub0dyaWQoLi4udGhpcy5tb3VzZVBvcywgdHJ1ZSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkVGlsZSguLi5ncmlkUG9pbnQsIFdpcmUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGtleURvd24gPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChlLmN0cmxLZXkgJiYgIWUuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gXCJFcXVhbFwiKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG11bHQgPSAxIC8gKGNvbmZpZy56b29tQ29lZmYgKiAtMTAwKTtcclxuICAgICAgICAgICAgICAgIGlmIChtdWx0IDwgMCkgbXVsdCA9IC0xIC8gbXVsdDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldlBvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0IC8gMlxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSBNYXRoLnJvdW5kKG11bHQgKiB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gY2xhbXAodGhpcy5zaXplLCAyMCwgMzUwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IChuZXdQb3MueCAtIHByZXZQb3MueCkgKiB0aGlzLnNpemU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKG5ld1Bvcy55IC0gcHJldlBvcy55KSAqIHRoaXMuc2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSBcIk1pbnVzXCIpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbXVsdCA9IDEgLyAoY29uZmlnLnpvb21Db2VmZiAqIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobXVsdCA8IDApIG11bHQgPSAtMSAvIG11bHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHByZXZQb3MgPSB0aGlzLnNjcmVlblRvR3JpZChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpZHRoIC8gMixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCAvIDJcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gTWF0aC5yb3VuZChtdWx0ICogdGhpcy5zaXplKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IGNsYW1wKHRoaXMuc2l6ZSwgMjAsIDM1MCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKHRoaXMud2lkdGggLyAyLCB0aGlzLmhlaWdodCAvIDIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMueCArPSAobmV3UG9zLnggLSBwcmV2UG9zLngpICogdGhpcy5zaXplO1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IChuZXdQb3MueSAtIHByZXZQb3MueSkgKiB0aGlzLnNpemU7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gXCJEaWdpdDBcIikge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcmV2UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgLyAyXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuc3RhcnRpbmdTaXplO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuZXdQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gKG5ld1Bvcy54IC0gcHJldlBvcy54KSAqIHRoaXMuc2l6ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMueSArPSAobmV3UG9zLnkgLSBwcmV2UG9zLnkpICogdGhpcy5zaXplO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZS5jdHJsS2V5ICYmICFlLnNoaWZ0S2V5ICYmIGUuY29kZSA9PT0gXCJLZXlIXCIpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyR3JpZCgpIHtcclxuICAgICAgICBsZXQgd2lkdGggPSBkaW1lbnNpb25zKClbMF07XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IGRpbWVuc2lvbnMoKVsxXTtcclxuICAgICAgICBjb25zdCB0aWxlWENvdW50ID0gTWF0aC5mbG9vcih3aWR0aCAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgY29uc3QgdGlsZVlDb3VudCA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gdGhpcy5zaXplKTtcclxuXHJcbiAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgbGV0IG91dHB1dCA9IFtdO1xyXG4gICAgICAgIGZvciAoXHJcbiAgICAgICAgICAgIGxldCB4ID0gLU1hdGguY2VpbCh0aGlzLnggLyB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICB4IDw9IHRpbGVYQ291bnQgLSBNYXRoLmZsb29yKHRoaXMueCAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgIHgrK1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5iZWdpbkZpbGwoY29uZmlnLmxpbmVDb2xvcik7XHJcbiAgICAgICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVTdHlsZSgwKTtcclxuICAgICAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MuZHJhd1JlY3QoXHJcbiAgICAgICAgICAgICAgICB4ICogdGhpcy5zaXplLFxyXG4gICAgICAgICAgICAgICAgLXRoaXMueSxcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5saW5lV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoXHJcbiAgICAgICAgICAgIGxldCB5ID0gLU1hdGguY2VpbCh0aGlzLnkgLyB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICB5IDw9IHRpbGVZQ291bnQgLSBNYXRoLmZsb29yKHRoaXMueSAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgIHkrK1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5iZWdpbkZpbGwoY29uZmlnLmxpbmVDb2xvcik7XHJcbiAgICAgICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVTdHlsZSgwKTtcclxuICAgICAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MuZHJhd1JlY3QoXHJcbiAgICAgICAgICAgICAgICAtdGhpcy54LFxyXG4gICAgICAgICAgICAgICAgeSAqIHRoaXMuc2l6ZSxcclxuICAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgY29uZmlnLmxpbmVXaWR0aFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGdyaWRQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCguLi50aGlzLm1vdXNlUG9zKTtcclxuICAgICAgICBncmlkUG9zLnggPSBNYXRoLmZsb29yKGdyaWRQb3MueCkgKiB0aGlzLnNpemU7XHJcbiAgICAgICAgZ3JpZFBvcy55ID0gTWF0aC5mbG9vcihncmlkUG9zLnkpICogdGhpcy5zaXplO1xyXG5cclxuICAgICAgICB0aGlzLmhsVGlsZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuaGxUaWxlLmJlZ2luRmlsbChjb25maWcuaGlnaGxpZ2h0VGlsZUNvbG9yKTtcclxuICAgICAgICB0aGlzLmhsVGlsZS5saW5lU3R5bGUoMCk7XHJcbiAgICAgICAgdGhpcy5obFRpbGUuZHJhd1JlY3QoXHJcbiAgICAgICAgICAgIGdyaWRQb3MueCArIGNvbmZpZy5saW5lV2lkdGggLyAyLFxyXG4gICAgICAgICAgICBncmlkUG9zLnkgKyBjb25maWcubGluZVdpZHRoIC8gMixcclxuICAgICAgICAgICAgdGhpcy5zaXplLFxyXG4gICAgICAgICAgICB0aGlzLnNpemVcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclRpbGVzKCkge1xyXG4gICAgICAgIGZvciAobGV0IFtrZXksIHRpbGVdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMudGlsZXMpKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IHRpbGVHcmFwaGljczogUElYSS5Db250YWluZXIgPSB0aWxlLmRyYXcodGhpcy5zaXplKTtcclxuICAgICAgICAgICAgLy8gdGlsZUdyYXBoaWNzLnggKz0gdGlsZS54ICogdGhpcy5zaXplO1xyXG4gICAgICAgICAgICAvLyB0aWxlR3JhcGhpY3MueSArPSB0aWxlLnkgKiB0aGlzLnNpemU7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuYWRkQ2hpbGQodGlsZUdyYXBoaWNzKTtcclxuICAgICAgICAgICAgdGlsZS51cGRhdGUodGhpcy5zaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIC8vIHRoaXMucmVtb3ZlQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLnJlbmRlckdyaWQoKTtcclxuICAgICAgICAvLyB0aGlzLmdlbmVyYXRlQ2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4gdGhpcy5hZGRDaGlsZChjaGlsZCkpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyVGlsZXMoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGcm9tIHNjcmVlbiBzcGFjZSB0byBncmlkIHNwYWNlXHJcbiAgICAgKiBAcGFyYW0geCBYIGluIHNjcmVlbiBzcGFjZVxyXG4gICAgICogQHBhcmFtIHkgWSBpbiBzY3JlZW4gc3BhY2VcclxuICAgICAqIEByZXR1cm5zIENvb3JkaW5hdGVzIGluIGdyaWQgc3BhY2VcclxuICAgICAqL1xyXG4gICAgc2NyZWVuVG9HcmlkID0gKHg6IG51bWJlciwgeTogbnVtYmVyLCBmbG9vcmVkID0gZmFsc2UpID0+XHJcbiAgICAgICAgZmxvb3JlZFxyXG4gICAgICAgICAgICA/IHtcclxuICAgICAgICAgICAgICAgICAgeDogTWF0aC5mbG9vcigoLXRoaXMueCArIHgpIC8gdGhpcy5zaXplKSxcclxuICAgICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcigoLXRoaXMueSArIHkpIC8gdGhpcy5zaXplKSxcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDoge1xyXG4gICAgICAgICAgICAgICAgICB4OiAoLXRoaXMueCArIHgpIC8gdGhpcy5zaXplLFxyXG4gICAgICAgICAgICAgICAgICB5OiAoLXRoaXMueSArIHkpIC8gdGhpcy5zaXplLFxyXG4gICAgICAgICAgICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGcm9tIGdyaWQgc3BhY2UgdG8gc2NyZWVuIHNwYWNlIChUb3AgTGVmdCBjb3JuZXIpXHJcbiAgICAgKiBAcGFyYW0geCBYIGluIGdyaWQgc3BhY2VcclxuICAgICAqIEBwYXJhbSB5IFkgaW4gZ3JpZCBzcGFjZVxyXG4gICAgICogQHJldHVybnMgQ29vcmRpbmF0ZXMgaW4gc2NyZWVuIHNwYWNlXHJcbiAgICAgKi9cclxuICAgIGdyaWRUb1NjcmVlbiA9ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gKHtcclxuICAgICAgICB4OiBNYXRoLmZsb29yKHgpICogdGhpcy5zaXplICsgdGhpcy54LFxyXG4gICAgICAgIHk6IE1hdGguZmxvb3IoeSkgKiB0aGlzLnNpemUgKyB0aGlzLnksXHJcbiAgICB9KTtcclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBU0E7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQVVBO0FBQUE7QUE0Q0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUtBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBS0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFLQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBa0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXRRQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7O0FBQ0E7QUFFQTtBQUtBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBNkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFNQTtBQUVBO0FBS0E7QUFDQTtBQUNBO0FBTUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFvQ0E7QUFBQTs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/grid.ts\n");

/***/ }),

/***/ "./src/components/tiles/wire-tile.ts":
/*!*******************************************!*\
  !*** ./src/components/tiles/wire-tile.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar tile_1 = __webpack_require__(/*! ./tile */ \"./src/components/tiles/tile.ts\");\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar Wire = /** @class */ (function (_super) {\r\n    __extends(Wire, _super);\r\n    function Wire() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.connect = {\r\n            up: false,\r\n            down: false,\r\n            left: false,\r\n            right: false,\r\n        };\r\n        return _this;\r\n    }\r\n    Wire.prototype.generateContainer = function () {\r\n        var graphics = new PIXI.Graphics();\r\n        // have to do this to set size to draw in the center\r\n        graphics.beginFill(0, 0);\r\n        graphics.drawRect(0, 0, 120, 120);\r\n        graphics.endFill();\r\n        graphics.beginFill(0x00ff00);\r\n        graphics.drawRect(40, 40, 40, 40);\r\n        graphics.endFill();\r\n        return graphics;\r\n    };\r\n    return Wire;\r\n}(tile_1.Tile));\r\nexports.default = Wire;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90aWxlcy93aXJlLXRpbGUudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2NvbXBvbmVudHMvdGlsZXMvd2lyZS10aWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy9kaXJlY3Rpb25zXCI7XHJcbmltcG9ydCB7IENvbm5lY3RhYmxlLCBTcHJpdGVUaWxlLCBUaWxlIH0gZnJvbSBcIi4vdGlsZVwiO1xyXG5pbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XHJcblxyXG5jbGFzcyBXaXJlIGV4dGVuZHMgVGlsZSBpbXBsZW1lbnRzIENvbm5lY3RhYmxlIHtcclxuICAgIGNvbm5lY3QgPSB7XHJcbiAgICAgICAgdXA6IGZhbHNlLFxyXG4gICAgICAgIGRvd246IGZhbHNlLFxyXG4gICAgICAgIGxlZnQ6IGZhbHNlLFxyXG4gICAgICAgIHJpZ2h0OiBmYWxzZSxcclxuICAgIH07XHJcblxyXG4gICAgZ2VuZXJhdGVDb250YWluZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZ3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG5cclxuICAgICAgICAvLyBoYXZlIHRvIGRvIHRoaXMgdG8gc2V0IHNpemUgdG8gZHJhdyBpbiB0aGUgY2VudGVyXHJcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5GaWxsKDAsIDApO1xyXG4gICAgICAgIGdyYXBoaWNzLmRyYXdSZWN0KDAsIDAsIDEyMCwgMTIwKTtcclxuICAgICAgICBncmFwaGljcy5lbmRGaWxsKCk7XHJcblxyXG4gICAgICAgIGdyYXBoaWNzLmJlZ2luRmlsbCgweDAwZmYwMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZHJhd1JlY3QoNDAsIDQwLCA0MCwgNDApO1xyXG4gICAgICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcclxuICAgICAgICByZXR1cm4gZ3JhcGhpY3M7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdpcmU7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBZUE7QUFiQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/tiles/wire-tile.ts\n");

/***/ })

})
webpackHotUpdate("main",{

/***/ "./src/components/grid.ts":
/*!********************************!*\
  !*** ./src/components/grid.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __spreadArray = (this && this.__spreadArray) || function (to, from) {\r\n    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)\r\n        to[j] = from[i];\r\n    return to;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\r\nvar math_1 = __webpack_require__(/*! ../utils/math */ \"./src/utils/math.ts\");\r\nvar config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\r\nvar wire_tile_1 = __webpack_require__(/*! ./tiles/wire-tile */ \"./src/components/tiles/wire-tile.ts\");\r\nvar Grid = /** @class */ (function (_super) {\r\n    __extends(Grid, _super);\r\n    function Grid(size) {\r\n        var _this = _super.call(this) || this;\r\n        _this.scroll = function (e) {\r\n            if (e.deltaY === 0)\r\n                return;\r\n            var mult = 1 / (config_1.default.zoomCoeff * e.deltaY);\r\n            if (mult < 0)\r\n                mult = -1 / mult;\r\n            var prevPos = _this.screenToGrid(e.pageX, e.pageY);\r\n            _this.size = Math.round(mult * _this.size);\r\n            _this.size = math_1.clamp(_this.size, 20, 350);\r\n            var newPos = _this.screenToGrid(e.pageX, e.pageY);\r\n            _this.x += (newPos.x - prevPos.x) * _this.size;\r\n            _this.y += (newPos.y - prevPos.y) * _this.size;\r\n            _this.update();\r\n        };\r\n        _this.mouseDown = function (e) { };\r\n        _this.mouseUp = function (e) { };\r\n        _this.mouseMove = function (event) {\r\n            var e = event.data.originalEvent;\r\n            _this.mousePos = [e.pageX, e.pageY];\r\n            if (utils_1.mouseDown.left) {\r\n                if (e.shiftKey || utils_1.pressedKeys[\"Space\"]) {\r\n                    _this.x += e.movementX;\r\n                    _this.y += e.movementY;\r\n                }\r\n                else {\r\n                    var gridPoint = utils_1.locationToTuple(_this.screenToGrid.apply(_this, __spreadArray(__spreadArray([], _this.mousePos), [true])));\r\n                    _this.addTile.apply(_this, __spreadArray(__spreadArray([], gridPoint), [wire_tile_1.default]));\r\n                }\r\n            }\r\n            _this.update();\r\n        };\r\n        _this.click = function (event) {\r\n            if (event.data.button == 0 && !event.data.originalEvent.shiftKey) {\r\n                var gridPoint = utils_1.locationToTuple(_this.screenToGrid.apply(_this, __spreadArray(__spreadArray([], _this.mousePos), [true])));\r\n                _this.addTile.apply(_this, __spreadArray(__spreadArray([], gridPoint), [wire_tile_1.default]));\r\n                _this.update();\r\n            }\r\n        };\r\n        _this.keyDown = function (e) {\r\n            if (e.ctrlKey && !e.shiftKey) {\r\n                if (e.code === \"Equal\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * -100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Minus\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * 100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Digit0\") {\r\n                    e.preventDefault();\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = _this.startingSize;\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n            }\r\n            if (!e.ctrlKey && !e.shiftKey && e.code === \"KeyH\") {\r\n                e.preventDefault();\r\n                _this.x = 0;\r\n                _this.y = 0;\r\n                _this.update();\r\n            }\r\n        };\r\n        _this.update = function () {\r\n            // this.removeChildren();\r\n            _this.renderGrid();\r\n            // this.generateChildren().forEach((child) => this.addChild(child));\r\n            _this.renderTiles();\r\n        };\r\n        /**\r\n         * From screen space to grid space\r\n         * @param x X in screen space\r\n         * @param y Y in screen space\r\n         * @returns Coordinates in grid space\r\n         */\r\n        _this.screenToGrid = function (x, y, floored) {\r\n            if (floored === void 0) { floored = false; }\r\n            return floored\r\n                ? {\r\n                    x: Math.floor((-_this.x + x) / _this.size),\r\n                    y: Math.floor((-_this.y + y) / _this.size),\r\n                }\r\n                : {\r\n                    x: (-_this.x + x) / _this.size,\r\n                    y: (-_this.y + y) / _this.size,\r\n                };\r\n        };\r\n        /**\r\n         * From grid space to screen space (Top Left corner)\r\n         * @param x X in grid space\r\n         * @param y Y in grid space\r\n         * @returns Coordinates in screen space\r\n         */\r\n        _this.gridToScreen = function (x, y) { return ({\r\n            x: Math.floor(x) * _this.size + _this.x,\r\n            y: Math.floor(y) * _this.size + _this.y,\r\n        }); };\r\n        _this.startingSize = size;\r\n        _this.size = size;\r\n        _this.tiles = {};\r\n        _this.mousePos = [0, 0];\r\n        _this.lineGraphics = new PIXI.Graphics();\r\n        _this.hlTile = new PIXI.Graphics();\r\n        _this.addChild(_this.lineGraphics);\r\n        _this.addChild(_this.hlTile);\r\n        // this.generateChildren().forEach((child) => this.addChild(child));\r\n        _this.renderGrid();\r\n        utils_1.onResize(_this.update);\r\n        _this.interactive = true;\r\n        utils_1.onScroll(_this, _this.scroll);\r\n        _this.on(\"mousedown\", _this.mouseDown);\r\n        _this.on(\"mouseup\", _this.mouseUp);\r\n        _this.on(\"mousemove\", _this.mouseMove);\r\n        utils_1.onKeyDown(_this.keyDown);\r\n        return _this;\r\n    }\r\n    Grid.prototype.addTile = function (x, y, tile) {\r\n        if (this.tiles[x + \",\" + y])\r\n            return false;\r\n        var tileObj = new tile(x, y);\r\n        this.tiles[x + \",\" + y] = tileObj;\r\n        console.log(this.tiles);\r\n        var tileGraphics = tileObj.getContainer(this.size);\r\n        // const screenPoint = this.gridToScreen(tile.x, tile.y);\r\n        this.addChild(tileGraphics);\r\n        return true;\r\n    };\r\n    Grid.prototype.renderGrid = function () {\r\n        var width = utils_1.dimensions()[0];\r\n        var height = utils_1.dimensions()[1];\r\n        var tileXCount = Math.floor(width / this.size);\r\n        var tileYCount = Math.floor(height / this.size);\r\n        this.lineGraphics.clear();\r\n        var output = [];\r\n        for (var x = -Math.ceil(this.x / this.size); x <= tileXCount - Math.floor(this.x / this.size); x++) {\r\n            this.lineGraphics.beginFill(config_1.default.lineColor);\r\n            this.lineGraphics.lineStyle(0);\r\n            this.lineGraphics.drawRect(x * this.size, -this.y, config_1.default.lineWidth, height);\r\n        }\r\n        for (var y = -Math.ceil(this.y / this.size); y <= tileYCount - Math.floor(this.y / this.size); y++) {\r\n            this.lineGraphics.beginFill(config_1.default.lineColor);\r\n            this.lineGraphics.lineStyle(0);\r\n            this.lineGraphics.drawRect(-this.x, y * this.size, width, config_1.default.lineWidth);\r\n        }\r\n        var gridPos = this.screenToGrid.apply(this, this.mousePos);\r\n        gridPos.x = Math.floor(gridPos.x) * this.size;\r\n        gridPos.y = Math.floor(gridPos.y) * this.size;\r\n        this.hlTile.clear();\r\n        this.hlTile.beginFill(config_1.default.highlightTileColor);\r\n        this.hlTile.lineStyle(0);\r\n        this.hlTile.drawRect(gridPos.x + config_1.default.lineWidth / 2, gridPos.y + config_1.default.lineWidth / 2, this.size, this.size);\r\n    };\r\n    Grid.prototype.renderTiles = function () {\r\n        for (var _i = 0, _a = Object.entries(this.tiles); _i < _a.length; _i++) {\r\n            var _b = _a[_i], _ = _b[0], tile = _b[1];\r\n            tile.update(this.size);\r\n        }\r\n    };\r\n    return Grid;\r\n}(PIXI.Container));\r\nexports.default = Grid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ncmlkLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL2dyaWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgZGltZW5zaW9ucyxcclxuICAgIGxvY2F0aW9uVG9UdXBsZSxcclxuICAgIG1vdXNlRG93bixcclxuICAgIG9uS2V5RG93bixcclxuICAgIG9uUmVzaXplLFxyXG4gICAgb25TY3JvbGwsXHJcbiAgICBwcmVzc2VkS2V5cyxcclxufSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgY2xhbXAgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aFwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IFdpcmUgZnJvbSBcIi4vdGlsZXMvd2lyZS10aWxlXCI7XHJcbmltcG9ydCB7IFRpbGUgfSBmcm9tIFwiLi90aWxlcy90aWxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xyXG4gICAgc3RhcnRpbmdTaXplOiBudW1iZXI7XHJcbiAgICBzaXplOiBudW1iZXI7XHJcbiAgICB0aWxlczogeyBba2V5OiBzdHJpbmddOiBUaWxlIH07XHJcblxyXG4gICAgbW91c2VQb3M6IFt4OiBudW1iZXIsIHk6IG51bWJlcl07XHJcblxyXG4gICAgbGluZUdyYXBoaWNzOiBQSVhJLkdyYXBoaWNzO1xyXG4gICAgaGxUaWxlOiBQSVhJLkdyYXBoaWNzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydGluZ1NpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy50aWxlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMubW91c2VQb3MgPSBbMCwgMF07XHJcblxyXG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICB0aGlzLmhsVGlsZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5saW5lR3JhcGhpY3MpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5obFRpbGUpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmdlbmVyYXRlQ2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4gdGhpcy5hZGRDaGlsZChjaGlsZCkpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyR3JpZCgpO1xyXG5cclxuICAgICAgICBvblJlc2l6ZSh0aGlzLnVwZGF0ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICBvblNjcm9sbCh0aGlzLCB0aGlzLnNjcm9sbCk7XHJcblxyXG4gICAgICAgIHRoaXMub24oXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZURvd24pO1xyXG4gICAgICAgIHRoaXMub24oXCJtb3VzZXVwXCIsIHRoaXMubW91c2VVcCk7XHJcbiAgICAgICAgdGhpcy5vbihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlTW92ZSk7XHJcblxyXG4gICAgICAgIG9uS2V5RG93bih0aGlzLmtleURvd24pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRpbGU8VCBleHRlbmRzIFRpbGU+KFxyXG4gICAgICAgIHg6IG51bWJlcixcclxuICAgICAgICB5OiBudW1iZXIsXHJcbiAgICAgICAgdGlsZTogeyBuZXcgKHg6IG51bWJlciwgeTogbnVtYmVyKTogVCB9XHJcbiAgICApOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy50aWxlc1tgJHt4fSwke3l9YF0pIHJldHVybiBmYWxzZTtcclxuICAgICAgICBsZXQgdGlsZU9iaiA9IG5ldyB0aWxlKHgsIHkpO1xyXG4gICAgICAgIHRoaXMudGlsZXNbYCR7eH0sJHt5fWBdID0gdGlsZU9iajtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRpbGVzKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGlsZUdyYXBoaWNzOiBQSVhJLkNvbnRhaW5lciA9IHRpbGVPYmouZ2V0Q29udGFpbmVyKHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgLy8gY29uc3Qgc2NyZWVuUG9pbnQgPSB0aGlzLmdyaWRUb1NjcmVlbih0aWxlLngsIHRpbGUueSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aWxlR3JhcGhpY3MpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzY3JvbGwgPSAoZTogV2hlZWxFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChlLmRlbHRhWSA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgbXVsdCA9IDEgLyAoY29uZmlnLnpvb21Db2VmZiAqIGUuZGVsdGFZKTtcclxuICAgICAgICBpZiAobXVsdCA8IDApIG11bHQgPSAtMSAvIG11bHQ7XHJcblxyXG4gICAgICAgIGxldCBwcmV2UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoZS5wYWdlWCwgZS5wYWdlWSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2l6ZSA9IE1hdGgucm91bmQobXVsdCAqIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgdGhpcy5zaXplID0gY2xhbXAodGhpcy5zaXplLCAyMCwgMzUwKTtcclxuXHJcbiAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKGUucGFnZVgsIGUucGFnZVkpO1xyXG5cclxuICAgICAgICB0aGlzLnggKz0gKG5ld1Bvcy54IC0gcHJldlBvcy54KSAqIHRoaXMuc2l6ZTtcclxuICAgICAgICB0aGlzLnkgKz0gKG5ld1Bvcy55IC0gcHJldlBvcy55KSAqIHRoaXMuc2l6ZTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgbW91c2VEb3duID0gKGU6IFBJWEkuaW50ZXJhY3Rpb24uSW50ZXJhY3Rpb25FdmVudCkgPT4ge307XHJcblxyXG4gICAgbW91c2VVcCA9IChlOiBQSVhJLmludGVyYWN0aW9uLkludGVyYWN0aW9uRXZlbnQpID0+IHt9O1xyXG5cclxuICAgIG1vdXNlTW92ZSA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgbGV0IGUgPSBldmVudC5kYXRhLm9yaWdpbmFsRXZlbnQgYXMgUG9pbnRlckV2ZW50O1xyXG4gICAgICAgIHRoaXMubW91c2VQb3MgPSBbZS5wYWdlWCwgZS5wYWdlWV07XHJcbiAgICAgICAgaWYgKG1vdXNlRG93bi5sZWZ0KSB7XHJcbiAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5IHx8IHByZXNzZWRLZXlzW1wiU3BhY2VcIl0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueCArPSBlLm1vdmVtZW50WDtcclxuICAgICAgICAgICAgICAgIHRoaXMueSArPSBlLm1vdmVtZW50WTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdyaWRQb2ludCA9IGxvY2F0aW9uVG9UdXBsZShcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcmVlblRvR3JpZCguLi50aGlzLm1vdXNlUG9zLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRpbGUoLi4uZ3JpZFBvaW50LCBXaXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgY2xpY2sgPSAoZXZlbnQ6IFBJWEkuaW50ZXJhY3Rpb24uSW50ZXJhY3Rpb25FdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC5kYXRhLmJ1dHRvbiA9PSAwICYmICFldmVudC5kYXRhLm9yaWdpbmFsRXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZFBvaW50ID0gbG9jYXRpb25Ub1R1cGxlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JlZW5Ub0dyaWQoLi4udGhpcy5tb3VzZVBvcywgdHJ1ZSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkVGlsZSguLi5ncmlkUG9pbnQsIFdpcmUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGtleURvd24gPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChlLmN0cmxLZXkgJiYgIWUuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gXCJFcXVhbFwiKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG11bHQgPSAxIC8gKGNvbmZpZy56b29tQ29lZmYgKiAtMTAwKTtcclxuICAgICAgICAgICAgICAgIGlmIChtdWx0IDwgMCkgbXVsdCA9IC0xIC8gbXVsdDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldlBvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0IC8gMlxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSBNYXRoLnJvdW5kKG11bHQgKiB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gY2xhbXAodGhpcy5zaXplLCAyMCwgMzUwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IChuZXdQb3MueCAtIHByZXZQb3MueCkgKiB0aGlzLnNpemU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKG5ld1Bvcy55IC0gcHJldlBvcy55KSAqIHRoaXMuc2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSBcIk1pbnVzXCIpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbXVsdCA9IDEgLyAoY29uZmlnLnpvb21Db2VmZiAqIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobXVsdCA8IDApIG11bHQgPSAtMSAvIG11bHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHByZXZQb3MgPSB0aGlzLnNjcmVlblRvR3JpZChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpZHRoIC8gMixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCAvIDJcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gTWF0aC5yb3VuZChtdWx0ICogdGhpcy5zaXplKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IGNsYW1wKHRoaXMuc2l6ZSwgMjAsIDM1MCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKHRoaXMud2lkdGggLyAyLCB0aGlzLmhlaWdodCAvIDIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMueCArPSAobmV3UG9zLnggLSBwcmV2UG9zLngpICogdGhpcy5zaXplO1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IChuZXdQb3MueSAtIHByZXZQb3MueSkgKiB0aGlzLnNpemU7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gXCJEaWdpdDBcIikge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcmV2UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgLyAyXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuc3RhcnRpbmdTaXplO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuZXdQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gKG5ld1Bvcy54IC0gcHJldlBvcy54KSAqIHRoaXMuc2l6ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMueSArPSAobmV3UG9zLnkgLSBwcmV2UG9zLnkpICogdGhpcy5zaXplO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZS5jdHJsS2V5ICYmICFlLnNoaWZ0S2V5ICYmIGUuY29kZSA9PT0gXCJLZXlIXCIpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyR3JpZCgpIHtcclxuICAgICAgICBsZXQgd2lkdGggPSBkaW1lbnNpb25zKClbMF07XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IGRpbWVuc2lvbnMoKVsxXTtcclxuICAgICAgICBjb25zdCB0aWxlWENvdW50ID0gTWF0aC5mbG9vcih3aWR0aCAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgY29uc3QgdGlsZVlDb3VudCA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gdGhpcy5zaXplKTtcclxuXHJcbiAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgbGV0IG91dHB1dCA9IFtdO1xyXG4gICAgICAgIGZvciAoXHJcbiAgICAgICAgICAgIGxldCB4ID0gLU1hdGguY2VpbCh0aGlzLnggLyB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICB4IDw9IHRpbGVYQ291bnQgLSBNYXRoLmZsb29yKHRoaXMueCAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgIHgrK1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5iZWdpbkZpbGwoY29uZmlnLmxpbmVDb2xvcik7XHJcbiAgICAgICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVTdHlsZSgwKTtcclxuICAgICAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MuZHJhd1JlY3QoXHJcbiAgICAgICAgICAgICAgICB4ICogdGhpcy5zaXplLFxyXG4gICAgICAgICAgICAgICAgLXRoaXMueSxcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5saW5lV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoXHJcbiAgICAgICAgICAgIGxldCB5ID0gLU1hdGguY2VpbCh0aGlzLnkgLyB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICB5IDw9IHRpbGVZQ291bnQgLSBNYXRoLmZsb29yKHRoaXMueSAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgIHkrK1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5iZWdpbkZpbGwoY29uZmlnLmxpbmVDb2xvcik7XHJcbiAgICAgICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVTdHlsZSgwKTtcclxuICAgICAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MuZHJhd1JlY3QoXHJcbiAgICAgICAgICAgICAgICAtdGhpcy54LFxyXG4gICAgICAgICAgICAgICAgeSAqIHRoaXMuc2l6ZSxcclxuICAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgY29uZmlnLmxpbmVXaWR0aFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGdyaWRQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCguLi50aGlzLm1vdXNlUG9zKTtcclxuICAgICAgICBncmlkUG9zLnggPSBNYXRoLmZsb29yKGdyaWRQb3MueCkgKiB0aGlzLnNpemU7XHJcbiAgICAgICAgZ3JpZFBvcy55ID0gTWF0aC5mbG9vcihncmlkUG9zLnkpICogdGhpcy5zaXplO1xyXG5cclxuICAgICAgICB0aGlzLmhsVGlsZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuaGxUaWxlLmJlZ2luRmlsbChjb25maWcuaGlnaGxpZ2h0VGlsZUNvbG9yKTtcclxuICAgICAgICB0aGlzLmhsVGlsZS5saW5lU3R5bGUoMCk7XHJcbiAgICAgICAgdGhpcy5obFRpbGUuZHJhd1JlY3QoXHJcbiAgICAgICAgICAgIGdyaWRQb3MueCArIGNvbmZpZy5saW5lV2lkdGggLyAyLFxyXG4gICAgICAgICAgICBncmlkUG9zLnkgKyBjb25maWcubGluZVdpZHRoIC8gMixcclxuICAgICAgICAgICAgdGhpcy5zaXplLFxyXG4gICAgICAgICAgICB0aGlzLnNpemVcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclRpbGVzKCkge1xyXG4gICAgICAgIGZvciAobGV0IFtfLCB0aWxlXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLnRpbGVzKSlcclxuICAgICAgICAgICAgdGlsZS51cGRhdGUodGhpcy5zaXplKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gdGhpcy5yZW1vdmVDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyR3JpZCgpO1xyXG4gICAgICAgIC8vIHRoaXMuZ2VuZXJhdGVDaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB0aGlzLmFkZENoaWxkKGNoaWxkKSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJUaWxlcygpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZyb20gc2NyZWVuIHNwYWNlIHRvIGdyaWQgc3BhY2VcclxuICAgICAqIEBwYXJhbSB4IFggaW4gc2NyZWVuIHNwYWNlXHJcbiAgICAgKiBAcGFyYW0geSBZIGluIHNjcmVlbiBzcGFjZVxyXG4gICAgICogQHJldHVybnMgQ29vcmRpbmF0ZXMgaW4gZ3JpZCBzcGFjZVxyXG4gICAgICovXHJcbiAgICBzY3JlZW5Ub0dyaWQgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIsIGZsb29yZWQgPSBmYWxzZSkgPT5cclxuICAgICAgICBmbG9vcmVkXHJcbiAgICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgICAgICB4OiBNYXRoLmZsb29yKCgtdGhpcy54ICsgeCkgLyB0aGlzLnNpemUpLFxyXG4gICAgICAgICAgICAgICAgICB5OiBNYXRoLmZsb29yKCgtdGhpcy55ICsgeSkgLyB0aGlzLnNpemUpLFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgOiB7XHJcbiAgICAgICAgICAgICAgICAgIHg6ICgtdGhpcy54ICsgeCkgLyB0aGlzLnNpemUsXHJcbiAgICAgICAgICAgICAgICAgIHk6ICgtdGhpcy55ICsgeSkgLyB0aGlzLnNpemUsXHJcbiAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZyb20gZ3JpZCBzcGFjZSB0byBzY3JlZW4gc3BhY2UgKFRvcCBMZWZ0IGNvcm5lcilcclxuICAgICAqIEBwYXJhbSB4IFggaW4gZ3JpZCBzcGFjZVxyXG4gICAgICogQHBhcmFtIHkgWSBpbiBncmlkIHNwYWNlXHJcbiAgICAgKiBAcmV0dXJucyBDb29yZGluYXRlcyBpbiBzY3JlZW4gc3BhY2VcclxuICAgICAqL1xyXG4gICAgZ3JpZFRvU2NyZWVuID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiAoe1xyXG4gICAgICAgIHg6IE1hdGguZmxvb3IoeCkgKiB0aGlzLnNpemUgKyB0aGlzLngsXHJcbiAgICAgICAgeTogTWF0aC5mbG9vcih5KSAqIHRoaXMuc2l6ZSArIHRoaXMueSxcclxuICAgIH0pO1xyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBVUE7QUFBQTtBQThDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUtBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBS0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFLQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBNkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXZRQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBRUE7QUFLQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQWlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBTUE7QUFFQTtBQUtBO0FBQ0E7QUFDQTtBQU1BO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQW9DQTtBQUFBOzsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/grid.ts\n");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar grid_1 = __webpack_require__(/*! ./components/grid */ \"./src/components/grid.ts\");\r\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils/index.ts\");\r\nvar config_1 = __webpack_require__(/*! ./config */ \"./src/config.ts\");\r\nvar gui_window_1 = __webpack_require__(/*! ./components/gui/gui_window */ \"./src/components/gui/gui_window.ts\");\r\nPIXI.utils.skipHello();\r\nvar load = function (app) {\r\n    return new Promise(function (resolve) {\r\n        return app.loader\r\n            .add(\"doge\", \"assets/sprites/doge-icon.svg\")\r\n            .load(function () { return resolve(); });\r\n    });\r\n};\r\nvar main = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    function update(delta) {\r\n        sprite.x = grid.gridToScreen(0.5, 0.5).x;\r\n        sprite.y = grid.gridToScreen(0.5, 0.5).y;\r\n    }\r\n    var app, grid, sprite, guiTest;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                app = new PIXI.Application();\r\n                document.body.style.margin = \"0\";\r\n                app.renderer.view.style.position = \"absolute\";\r\n                app.renderer.view.style.display = \"block\";\r\n                app.renderer.resize(window.innerWidth, window.innerHeight);\r\n                document.body.appendChild(app.view);\r\n                return [4 /*yield*/, load(app)];\r\n            case 1:\r\n                _a.sent();\r\n                app.renderer.backgroundColor = config_1.default.backgroundColor;\r\n                grid = new grid_1.default(100);\r\n                app.stage.addChild(grid);\r\n                sprite = new PIXI.Sprite(app.loader.resources.doge.texture);\r\n                sprite.width = 20;\r\n                sprite.height = 20;\r\n                sprite.x = utils_1.width() / 2 - sprite.width / 2;\r\n                sprite.y = utils_1.height() / 2 - sprite.height / 2;\r\n                app.stage.addChild(sprite);\r\n                guiTest = new gui_window_1.default(20, 20, 100, 500, 0xff0000);\r\n                app.stage.addChild(guiTest);\r\n                utils_1.onResize(function () {\r\n                    var _a;\r\n                    (_a = app.renderer).resize.apply(_a, utils_1.dimensions());\r\n                });\r\n                window.addEventListener(\"contextmenu\", function (e) { return e.preventDefault(); });\r\n                window.addEventListener(\"wheel\", function (e) {\r\n                    var hitObject = app.renderer.plugins.interaction.hitTest(new PIXI.Point(e.pageX, e.pageY), app.stage);\r\n                    if (hitObject != null) {\r\n                        utils_1.scrollListeners.forEach(function (eventObj) {\r\n                            if (eventObj.object == hitObject)\r\n                                eventObj.listener(e);\r\n                        });\r\n                    }\r\n                });\r\n                app.ticker.add(update);\r\n                return [2 /*return*/];\r\n        }\r\n    });\r\n}); };\r\nmain();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcclxuaW1wb3J0IEdyaWQgZnJvbSBcIi4vY29tcG9uZW50cy9ncmlkXCI7XHJcbmltcG9ydCB7XHJcbiAgICBkaW1lbnNpb25zLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgb25SZXNpemUsXHJcbiAgICB3aWR0aCxcclxuICAgIHNjcm9sbExpc3RlbmVycyxcclxuICAgIERpc3BsYXlPYmplY3RTY3JvbGxFdmVudCxcclxufSBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQgR1VJV2luZG93IGZyb20gXCIuL2NvbXBvbmVudHMvZ3VpL2d1aV93aW5kb3dcIjtcclxuXHJcblBJWEkudXRpbHMuc2tpcEhlbGxvKCk7XHJcblxyXG5jb25zdCBsb2FkID0gKGFwcDogUElYSS5BcHBsaWNhdGlvbikgPT5cclxuICAgIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PlxyXG4gICAgICAgIGFwcC5sb2FkZXJcclxuICAgICAgICAgICAgLmFkZChcImRvZ2VcIiwgXCJhc3NldHMvc3ByaXRlcy9kb2dlLWljb24uc3ZnXCIpXHJcbiAgICAgICAgICAgIC5sb2FkKCgpID0+IHJlc29sdmUoKSlcclxuICAgICk7XHJcblxyXG5jb25zdCBtYWluID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGFwcCA9IG5ldyBQSVhJLkFwcGxpY2F0aW9uKCk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW4gPSBcIjBcIjtcclxuICAgIGFwcC5yZW5kZXJlci52aWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgYXBwLnJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIGFwcC5yZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcC52aWV3KTtcclxuXHJcbiAgICBhd2FpdCBsb2FkKGFwcCk7XHJcblxyXG4gICAgYXBwLnJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGNvbmZpZy5iYWNrZ3JvdW5kQ29sb3I7XHJcblxyXG4gICAgbGV0IGdyaWQgPSBuZXcgR3JpZCgxMDApO1xyXG5cclxuICAgIGFwcC5zdGFnZS5hZGRDaGlsZChncmlkKTtcclxuXHJcbiAgICBsZXQgc3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKGFwcC5sb2FkZXIucmVzb3VyY2VzLmRvZ2UudGV4dHVyZSk7XHJcbiAgICBzcHJpdGUud2lkdGggPSAyMDtcclxuICAgIHNwcml0ZS5oZWlnaHQgPSAyMDtcclxuICAgIHNwcml0ZS54ID0gd2lkdGgoKSAvIDIgLSBzcHJpdGUud2lkdGggLyAyO1xyXG4gICAgc3ByaXRlLnkgPSBoZWlnaHQoKSAvIDIgLSBzcHJpdGUuaGVpZ2h0IC8gMjtcclxuICAgIGFwcC5zdGFnZS5hZGRDaGlsZChzcHJpdGUpO1xyXG5cclxuICAgIGxldCBndWlUZXN0ID0gbmV3IEdVSVdpbmRvdygyMCwgMjAsIDEwMCwgNTAwLCAweGZmMDAwMCk7XHJcblxyXG4gICAgYXBwLnN0YWdlLmFkZENoaWxkKGd1aVRlc3QpO1xyXG5cclxuICAgIG9uUmVzaXplKCgpID0+IHtcclxuICAgICAgICBhcHAucmVuZGVyZXIucmVzaXplKC4uLmRpbWVuc2lvbnMoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgKGU6IFdoZWVsRXZlbnQpID0+IHtcclxuICAgICAgICBsZXQgaGl0T2JqZWN0ID0gYXBwLnJlbmRlcmVyLnBsdWdpbnMuaW50ZXJhY3Rpb24uaGl0VGVzdChcclxuICAgICAgICAgICAgbmV3IFBJWEkuUG9pbnQoZS5wYWdlWCwgZS5wYWdlWSksXHJcbiAgICAgICAgICAgIGFwcC5zdGFnZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGhpdE9iamVjdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbExpc3RlbmVycy5mb3JFYWNoKChldmVudE9iajogRGlzcGxheU9iamVjdFNjcm9sbEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRPYmoub2JqZWN0ID09IGhpdE9iamVjdCkgZXZlbnRPYmoubGlzdGVuZXIoZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZShkZWx0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3ByaXRlLnggPSBncmlkLmdyaWRUb1NjcmVlbigwLjUsIDAuNSkueDtcclxuICAgICAgICBzcHJpdGUueSA9IGdyaWQuZ3JpZFRvU2NyZWVuKDAuNSwgMC41KS55O1xyXG4gICAgfVxyXG5cclxuICAgIGFwcC50aWNrZXIuYWRkKHVwZGF0ZSk7XHJcbn07XHJcblxyXG5tYWluKCk7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFEQTtBQU1BO0FBOENBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQWhEQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFBQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTs7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFPQTs7OztBQUNBO0FBRUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.ts\n");

/***/ })

})
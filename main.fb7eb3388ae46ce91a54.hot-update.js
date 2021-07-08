webpackHotUpdate("main",{

/***/ "./src/components/grid.ts":
/*!********************************!*\
  !*** ./src/components/grid.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __spreadArray = (this && this.__spreadArray) || function (to, from) {\r\n    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)\r\n        to[j] = from[i];\r\n    return to;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\r\nvar math_1 = __webpack_require__(/*! ../utils/math */ \"./src/utils/math.ts\");\r\nvar config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\r\nvar wire_tile_1 = __webpack_require__(/*! ./tiles/wire-tile */ \"./src/components/tiles/wire-tile.ts\");\r\nvar Grid = /** @class */ (function (_super) {\r\n    __extends(Grid, _super);\r\n    function Grid(size) {\r\n        var _this = _super.call(this) || this;\r\n        _this.scroll = function (e) {\r\n            if (e.deltaY === 0)\r\n                return;\r\n            var mult = 1 / (config_1.default.zoomCoeff * e.deltaY);\r\n            if (mult < 0)\r\n                mult = -1 / mult;\r\n            var prevPos = _this.screenToGrid(e.pageX, e.pageY);\r\n            _this.size = Math.round(mult * _this.size);\r\n            _this.size = math_1.clamp(_this.size, 20, 350);\r\n            var newPos = _this.screenToGrid(e.pageX, e.pageY);\r\n            _this.x += (newPos.x - prevPos.x) * _this.size;\r\n            _this.y += (newPos.y - prevPos.y) * _this.size;\r\n            _this.update();\r\n        };\r\n        _this.mouseMove = function (event) {\r\n            var e = event.data.originalEvent;\r\n            _this.mousePos = [e.pageX, e.pageY];\r\n            if (utils_1.mouseDown.left) {\r\n                if (e.shiftKey || utils_1.pressedKeys[\"Space\"]) {\r\n                    _this.x += e.movementX;\r\n                    _this.y += e.movementY;\r\n                }\r\n                else {\r\n                    var gridPoint = utils_1.locationToTuple(_this.screenToGrid.apply(_this, __spreadArray(__spreadArray([], _this.mousePos), [true])));\r\n                    _this.addTile.apply(_this, __spreadArray(__spreadArray([], gridPoint), [wire_tile_1.default]));\r\n                }\r\n            }\r\n            _this.update();\r\n        };\r\n        _this.click = function (event) {\r\n            if (event.data.button == 0 && !event.data.originalEvent.shiftKey) {\r\n                var gridPoint = utils_1.locationToTuple(_this.screenToGrid.apply(_this, __spreadArray(__spreadArray([], _this.mousePos), [true])));\r\n                _this.addTile.apply(_this, __spreadArray(__spreadArray([], gridPoint), [wire_tile_1.default]));\r\n                _this.update();\r\n            }\r\n        };\r\n        _this.keyDown = function (e) {\r\n            if (e.ctrlKey && !e.shiftKey) {\r\n                if (e.code === \"Equal\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * -100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Minus\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * 100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Digit0\") {\r\n                    e.preventDefault();\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = _this.startingSize;\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n            }\r\n            if (!e.ctrlKey && !e.shiftKey && e.code === \"KeyH\") {\r\n                e.preventDefault();\r\n                _this.x = 0;\r\n                _this.y = 0;\r\n                _this.update();\r\n            }\r\n        };\r\n        _this.update = function () {\r\n            // this.removeChildren();\r\n            _this.renderGrid();\r\n            // this.generateChildren().forEach((child) => this.addChild(child));\r\n            _this.renderTiles();\r\n        };\r\n        /**\r\n         * From screen space to grid space\r\n         * @param x X in screen space\r\n         * @param y Y in screen space\r\n         * @returns Coordinates in grid space\r\n         */\r\n        _this.screenToGrid = function (x, y, floored) {\r\n            if (floored === void 0) { floored = false; }\r\n            return floored\r\n                ? {\r\n                    x: Math.floor((-_this.x + x) / _this.size),\r\n                    y: Math.floor((-_this.y + y) / _this.size),\r\n                }\r\n                : {\r\n                    x: (-_this.x + x) / _this.size,\r\n                    y: (-_this.y + y) / _this.size,\r\n                };\r\n        };\r\n        /**\r\n         * From grid space to screen space (Top Left corner)\r\n         * @param x X in grid space\r\n         * @param y Y in grid space\r\n         * @returns Coordinates in screen space\r\n         */\r\n        _this.gridToScreen = function (x, y) { return ({\r\n            x: Math.floor(x) * _this.size + _this.x,\r\n            y: Math.floor(y) * _this.size + _this.y,\r\n        }); };\r\n        _this.startingSize = size;\r\n        _this.size = size;\r\n        _this.tiles = {};\r\n        _this.mousePos = [0, 0];\r\n        _this.lineGraphics = new PIXI.Graphics();\r\n        _this.hlTile = new PIXI.Graphics();\r\n        _this.addChild(_this.lineGraphics);\r\n        _this.addChild(_this.hlTile);\r\n        // this.generateChildren().forEach((child) => this.addChild(child));\r\n        _this.renderGrid();\r\n        utils_1.onResize(_this.update);\r\n        _this.interactive = true;\r\n        utils_1.onScroll(_this, _this.scroll);\r\n        _this.on(\"mousemove\", _this.mouseMove);\r\n        utils_1.onKeyDown(_this.keyDown);\r\n        return _this;\r\n    }\r\n    Grid.prototype.addTile = function (x, y, tile) {\r\n        if (this.tiles[x + \",\" + y])\r\n            return false;\r\n        var tileObj = new tile(x, y);\r\n        this.tiles[x + \",\" + y] = tileObj;\r\n        console.log(this.tiles);\r\n        var tileGraphics = tileObj.getContainer(this.size);\r\n        // const screenPoint = this.gridToScreen(tile.x, tile.y);\r\n        this.addChild(tileGraphics);\r\n        return true;\r\n    };\r\n    Grid.prototype.renderGrid = function () {\r\n        var width = utils_1.dimensions()[0];\r\n        var height = utils_1.dimensions()[1];\r\n        var tileXCount = Math.floor(width / this.size);\r\n        var tileYCount = Math.floor(height / this.size);\r\n        this.lineGraphics.clear();\r\n        var output = [];\r\n        for (var x = -Math.ceil(this.x / this.size); x <= tileXCount - Math.floor(this.x / this.size); x++) {\r\n            this.lineGraphics.beginFill(config_1.default.lineColor);\r\n            this.lineGraphics.lineStyle(0);\r\n            this.lineGraphics.drawRect(x * this.size, -this.y, config_1.default.lineWidth, height);\r\n        }\r\n        for (var y = -Math.ceil(this.y / this.size); y <= tileYCount - Math.floor(this.y / this.size); y++) {\r\n            this.lineGraphics.beginFill(config_1.default.lineColor);\r\n            this.lineGraphics.lineStyle(0);\r\n            this.lineGraphics.drawRect(-this.x, y * this.size, width, config_1.default.lineWidth);\r\n        }\r\n        var gridPos = this.screenToGrid.apply(this, this.mousePos);\r\n        gridPos.x = Math.floor(gridPos.x) * this.size;\r\n        gridPos.y = Math.floor(gridPos.y) * this.size;\r\n        this.hlTile.clear();\r\n        this.hlTile.beginFill(config_1.default.highlightTileColor);\r\n        this.hlTile.lineStyle(0);\r\n        this.hlTile.drawRect(gridPos.x + config_1.default.lineWidth / 2, gridPos.y + config_1.default.lineWidth / 2, this.size, this.size);\r\n    };\r\n    Grid.prototype.renderTiles = function () {\r\n        for (var _i = 0, _a = Object.entries(this.tiles); _i < _a.length; _i++) {\r\n            var _b = _a[_i], key = _b[0], tile = _b[1];\r\n            // const tileGraphics: PIXI.Container = tile.draw(this.size);\r\n            // tileGraphics.x += tile.x * this.size;\r\n            // tileGraphics.y += tile.y * this.size;\r\n            // this.addChild(tileGraphics);\r\n            tile.update(this.size);\r\n        }\r\n    };\r\n    return Grid;\r\n}(PIXI.Container));\r\nexports.default = Grid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ncmlkLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL2dyaWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgZGltZW5zaW9ucyxcclxuICAgIGxvY2F0aW9uVG9UdXBsZSxcclxuICAgIG1vdXNlRG93bixcclxuICAgIG9uS2V5RG93bixcclxuICAgIG9uUmVzaXplLFxyXG4gICAgb25TY3JvbGwsXHJcbiAgICBwcmVzc2VkS2V5cyxcclxufSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgY2xhbXAgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aFwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IFdpcmUgZnJvbSBcIi4vdGlsZXMvd2lyZS10aWxlXCI7XHJcbmltcG9ydCB7IFRpbGUgfSBmcm9tIFwiLi90aWxlcy90aWxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xyXG4gICAgc3RhcnRpbmdTaXplOiBudW1iZXI7XHJcbiAgICBzaXplOiBudW1iZXI7XHJcbiAgICB0aWxlczogeyBba2V5OiBzdHJpbmddOiBUaWxlIH07XHJcblxyXG4gICAgbW91c2VQb3M6IFt4OiBudW1iZXIsIHk6IG51bWJlcl07XHJcblxyXG4gICAgbGluZUdyYXBoaWNzOiBQSVhJLkdyYXBoaWNzO1xyXG4gICAgaGxUaWxlOiBQSVhJLkdyYXBoaWNzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydGluZ1NpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy50aWxlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMubW91c2VQb3MgPSBbMCwgMF07XHJcblxyXG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICB0aGlzLmhsVGlsZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5saW5lR3JhcGhpY3MpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5obFRpbGUpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmdlbmVyYXRlQ2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4gdGhpcy5hZGRDaGlsZChjaGlsZCkpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyR3JpZCgpO1xyXG5cclxuICAgICAgICBvblJlc2l6ZSh0aGlzLnVwZGF0ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICBvblNjcm9sbCh0aGlzLCB0aGlzLnNjcm9sbCk7XHJcblxyXG4gICAgICAgIHRoaXMub24oXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZU1vdmUpO1xyXG5cclxuICAgICAgICBvbktleURvd24odGhpcy5rZXlEb3duKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUaWxlPFQgZXh0ZW5kcyBUaWxlPih4OiBudW1iZXIsIHk6IG51bWJlciwgdGlsZToge25ldyh4Om51bWJlcix5Om51bWJlcik6IFR9KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMudGlsZXNbYCR7eH0sJHt5fWBdKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgbGV0IHRpbGVPYmogPSBuZXcgdGlsZSh4LCB5KTtcclxuICAgICAgICB0aGlzLnRpbGVzW2Ake3h9LCR7eX1gXSA9IHRpbGVPYmo7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50aWxlcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgdGlsZUdyYXBoaWNzOiBQSVhJLkNvbnRhaW5lciA9IHRpbGVPYmouZ2V0Q29udGFpbmVyKHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgLy8gY29uc3Qgc2NyZWVuUG9pbnQgPSB0aGlzLmdyaWRUb1NjcmVlbih0aWxlLngsIHRpbGUueSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aWxlR3JhcGhpY3MpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzY3JvbGwgPSAoZTogV2hlZWxFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChlLmRlbHRhWSA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgbXVsdCA9IDEgLyAoY29uZmlnLnpvb21Db2VmZiAqIGUuZGVsdGFZKTtcclxuICAgICAgICBpZiAobXVsdCA8IDApIG11bHQgPSAtMSAvIG11bHQ7XHJcblxyXG4gICAgICAgIGxldCBwcmV2UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoZS5wYWdlWCwgZS5wYWdlWSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2l6ZSA9IE1hdGgucm91bmQobXVsdCAqIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgdGhpcy5zaXplID0gY2xhbXAodGhpcy5zaXplLCAyMCwgMzUwKTtcclxuXHJcbiAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKGUucGFnZVgsIGUucGFnZVkpO1xyXG5cclxuICAgICAgICB0aGlzLnggKz0gKG5ld1Bvcy54IC0gcHJldlBvcy54KSAqIHRoaXMuc2l6ZTtcclxuICAgICAgICB0aGlzLnkgKz0gKG5ld1Bvcy55IC0gcHJldlBvcy55KSAqIHRoaXMuc2l6ZTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3VzZU1vdmUgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGxldCBlID0gZXZlbnQuZGF0YS5vcmlnaW5hbEV2ZW50IGFzIFBvaW50ZXJFdmVudDtcclxuICAgICAgICB0aGlzLm1vdXNlUG9zID0gW2UucGFnZVgsIGUucGFnZVldO1xyXG4gICAgICAgIGlmIChtb3VzZURvd24ubGVmdCkge1xyXG4gICAgICAgICAgICBpZiAoZS5zaGlmdEtleSB8fCBwcmVzc2VkS2V5c1tcIlNwYWNlXCJdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gZS5tb3ZlbWVudFg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gZS5tb3ZlbWVudFk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBncmlkUG9pbnQgPSBsb2NhdGlvblRvVHVwbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JlZW5Ub0dyaWQoLi4udGhpcy5tb3VzZVBvcywgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUaWxlKC4uLmdyaWRQb2ludCwgV2lyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2sgPSAoZXZlbnQ6IFBJWEkuaW50ZXJhY3Rpb24uSW50ZXJhY3Rpb25FdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC5kYXRhLmJ1dHRvbiA9PSAwICYmICFldmVudC5kYXRhLm9yaWdpbmFsRXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZFBvaW50ID0gbG9jYXRpb25Ub1R1cGxlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JlZW5Ub0dyaWQoLi4udGhpcy5tb3VzZVBvcywgdHJ1ZSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkVGlsZSguLi5ncmlkUG9pbnQsIFdpcmUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAga2V5RG93biA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGUuY3RybEtleSAmJiAhZS5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSBcIkVxdWFsXCIpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbXVsdCA9IDEgLyAoY29uZmlnLnpvb21Db2VmZiAqIC0xMDApO1xyXG4gICAgICAgICAgICAgICAgaWYgKG11bHQgPCAwKSBtdWx0ID0gLTEgLyBtdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcmV2UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgLyAyXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IE1hdGgucm91bmQobXVsdCAqIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSBjbGFtcCh0aGlzLnNpemUsIDIwLCAzNTApO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuZXdQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gKG5ld1Bvcy54IC0gcHJldlBvcy54KSAqIHRoaXMuc2l6ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMueSArPSAobmV3UG9zLnkgLSBwcmV2UG9zLnkpICogdGhpcy5zaXplO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT09IFwiTWludXNcIikge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtdWx0ID0gMSAvIChjb25maWcuem9vbUNvZWZmICogMTAwKTtcclxuICAgICAgICAgICAgICAgIGlmIChtdWx0IDwgMCkgbXVsdCA9IC0xIC8gbXVsdDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldlBvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0IC8gMlxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSBNYXRoLnJvdW5kKG11bHQgKiB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gY2xhbXAodGhpcy5zaXplLCAyMCwgMzUwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IChuZXdQb3MueCAtIHByZXZQb3MueCkgKiB0aGlzLnNpemU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKG5ld1Bvcy55IC0gcHJldlBvcy55KSAqIHRoaXMuc2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSBcIkRpZ2l0MFwiKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHByZXZQb3MgPSB0aGlzLnNjcmVlblRvR3JpZChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpZHRoIC8gMixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCAvIDJcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gdGhpcy5zdGFydGluZ1NpemU7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKHRoaXMud2lkdGggLyAyLCB0aGlzLmhlaWdodCAvIDIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMueCArPSAobmV3UG9zLnggLSBwcmV2UG9zLngpICogdGhpcy5zaXplO1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IChuZXdQb3MueSAtIHByZXZQb3MueSkgKiB0aGlzLnNpemU7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFlLmN0cmxLZXkgJiYgIWUuc2hpZnRLZXkgJiYgZS5jb2RlID09PSBcIktleUhcIikge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXJHcmlkKCkge1xyXG4gICAgICAgIGxldCB3aWR0aCA9IGRpbWVuc2lvbnMoKVswXTtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gZGltZW5zaW9ucygpWzFdO1xyXG4gICAgICAgIGNvbnN0IHRpbGVYQ291bnQgPSBNYXRoLmZsb29yKHdpZHRoIC8gdGhpcy5zaXplKTtcclxuICAgICAgICBjb25zdCB0aWxlWUNvdW50ID0gTWF0aC5mbG9vcihoZWlnaHQgLyB0aGlzLnNpemUpO1xyXG5cclxuICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5jbGVhcigpO1xyXG5cclxuICAgICAgICBsZXQgb3V0cHV0ID0gW107XHJcbiAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgbGV0IHggPSAtTWF0aC5jZWlsKHRoaXMueCAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgIHggPD0gdGlsZVhDb3VudCAtIE1hdGguZmxvb3IodGhpcy54IC8gdGhpcy5zaXplKTtcclxuICAgICAgICAgICAgeCsrXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmJlZ2luRmlsbChjb25maWcubGluZUNvbG9yKTtcclxuICAgICAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MubGluZVN0eWxlKDApO1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5kcmF3UmVjdChcclxuICAgICAgICAgICAgICAgIHggKiB0aGlzLnNpemUsXHJcbiAgICAgICAgICAgICAgICAtdGhpcy55LFxyXG4gICAgICAgICAgICAgICAgY29uZmlnLmxpbmVXaWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgbGV0IHkgPSAtTWF0aC5jZWlsKHRoaXMueSAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgIHkgPD0gdGlsZVlDb3VudCAtIE1hdGguZmxvb3IodGhpcy55IC8gdGhpcy5zaXplKTtcclxuICAgICAgICAgICAgeSsrXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmJlZ2luRmlsbChjb25maWcubGluZUNvbG9yKTtcclxuICAgICAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MubGluZVN0eWxlKDApO1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5kcmF3UmVjdChcclxuICAgICAgICAgICAgICAgIC10aGlzLngsXHJcbiAgICAgICAgICAgICAgICB5ICogdGhpcy5zaXplLFxyXG4gICAgICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgICAgICBjb25maWcubGluZVdpZHRoXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZ3JpZFBvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKC4uLnRoaXMubW91c2VQb3MpO1xyXG4gICAgICAgIGdyaWRQb3MueCA9IE1hdGguZmxvb3IoZ3JpZFBvcy54KSAqIHRoaXMuc2l6ZTtcclxuICAgICAgICBncmlkUG9zLnkgPSBNYXRoLmZsb29yKGdyaWRQb3MueSkgKiB0aGlzLnNpemU7XHJcblxyXG4gICAgICAgIHRoaXMuaGxUaWxlLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5obFRpbGUuYmVnaW5GaWxsKGNvbmZpZy5oaWdobGlnaHRUaWxlQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuaGxUaWxlLmxpbmVTdHlsZSgwKTtcclxuICAgICAgICB0aGlzLmhsVGlsZS5kcmF3UmVjdChcclxuICAgICAgICAgICAgZ3JpZFBvcy54ICsgY29uZmlnLmxpbmVXaWR0aCAvIDIsXHJcbiAgICAgICAgICAgIGdyaWRQb3MueSArIGNvbmZpZy5saW5lV2lkdGggLyAyLFxyXG4gICAgICAgICAgICB0aGlzLnNpemUsXHJcbiAgICAgICAgICAgIHRoaXMuc2l6ZVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyVGlsZXMoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgW2tleSwgdGlsZV0gb2YgT2JqZWN0LmVudHJpZXModGhpcy50aWxlcykpIHtcclxuICAgICAgICAgICAgLy8gY29uc3QgdGlsZUdyYXBoaWNzOiBQSVhJLkNvbnRhaW5lciA9IHRpbGUuZHJhdyh0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICAvLyB0aWxlR3JhcGhpY3MueCArPSB0aWxlLnggKiB0aGlzLnNpemU7XHJcbiAgICAgICAgICAgIC8vIHRpbGVHcmFwaGljcy55ICs9IHRpbGUueSAqIHRoaXMuc2l6ZTtcclxuICAgICAgICAgICAgLy8gdGhpcy5hZGRDaGlsZCh0aWxlR3JhcGhpY3MpO1xyXG4gICAgICAgICAgICB0aWxlLnVwZGF0ZSh0aGlzLnNpemUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gdGhpcy5yZW1vdmVDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyR3JpZCgpO1xyXG4gICAgICAgIC8vIHRoaXMuZ2VuZXJhdGVDaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB0aGlzLmFkZENoaWxkKGNoaWxkKSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJUaWxlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnJvbSBzY3JlZW4gc3BhY2UgdG8gZ3JpZCBzcGFjZVxyXG4gICAgICogQHBhcmFtIHggWCBpbiBzY3JlZW4gc3BhY2VcclxuICAgICAqIEBwYXJhbSB5IFkgaW4gc2NyZWVuIHNwYWNlXHJcbiAgICAgKiBAcmV0dXJucyBDb29yZGluYXRlcyBpbiBncmlkIHNwYWNlXHJcbiAgICAgKi9cclxuICAgIHNjcmVlblRvR3JpZCA9ICh4OiBudW1iZXIsIHk6IG51bWJlciwgZmxvb3JlZCA9IGZhbHNlKSA9PlxyXG4gICAgICAgIGZsb29yZWRcclxuICAgICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoKC10aGlzLnggKyB4KSAvIHRoaXMuc2l6ZSksXHJcbiAgICAgICAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoKC10aGlzLnkgKyB5KSAvIHRoaXMuc2l6ZSksXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA6IHtcclxuICAgICAgICAgICAgICAgICAgeDogKC10aGlzLnggKyB4KSAvIHRoaXMuc2l6ZSxcclxuICAgICAgICAgICAgICAgICAgeTogKC10aGlzLnkgKyB5KSAvIHRoaXMuc2l6ZSxcclxuICAgICAgICAgICAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnJvbSBncmlkIHNwYWNlIHRvIHNjcmVlbiBzcGFjZSAoVG9wIExlZnQgY29ybmVyKVxyXG4gICAgICogQHBhcmFtIHggWCBpbiBncmlkIHNwYWNlXHJcbiAgICAgKiBAcGFyYW0geSBZIGluIGdyaWQgc3BhY2VcclxuICAgICAqIEByZXR1cm5zIENvb3JkaW5hdGVzIGluIHNjcmVlbiBzcGFjZVxyXG4gICAgICovXHJcbiAgICBncmlkVG9TY3JlZW4gPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+ICh7XHJcbiAgICAgICAgeDogTWF0aC5mbG9vcih4KSAqIHRoaXMuc2l6ZSArIHRoaXMueCxcclxuICAgICAgICB5OiBNYXRoLmZsb29yKHkpICogdGhpcy5zaXplICsgdGhpcy55LFxyXG4gICAgfSk7XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFVQTtBQUFBO0FBd0NBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFLQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUtBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBS0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWtFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFsUUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBOztBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQTZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBTUE7QUFFQTtBQUtBO0FBQ0E7QUFDQTtBQU1BO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBb0NBO0FBQUE7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/grid.ts\n");

/***/ }),

/***/ "./src/components/tiles/tile.ts":
/*!**************************************!*\
  !*** ./src/components/tiles/tile.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.SpriteTile = exports.Tile = void 0;\r\nvar directions_1 = __webpack_require__(/*! ../../utils/directions */ \"./src/utils/directions.ts\");\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar Tile = /** @class */ (function () {\r\n    function Tile(x, y) {\r\n        this.label = undefined;\r\n        this.x = 0;\r\n        this.y = 0;\r\n        this.direction = directions_1.Direction.NORMAL;\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    Tile.prototype.getContainer = function (size) {\r\n        if (this.container == null)\r\n            this.container = this.generateContainer();\r\n        this.container.width = size;\r\n        this.container.height = size;\r\n        this.container.pivot.x =\r\n            this.container.width / (this.container.scale.x * 2);\r\n        this.container.pivot.y =\r\n            this.container.height / (this.container.scale.y * 2);\r\n        this.container.x = this.x * size + size / 2;\r\n        this.container.y = this.y * size + size / 2;\r\n        this.container.rotation = (this.direction.valueOf() * Math.PI) / 2;\r\n        return this.container;\r\n    };\r\n    Tile.prototype.update = function (size) {\r\n        if (this.container) {\r\n            this.container.width = size;\r\n            this.container.height = size;\r\n            this.container.pivot.x =\r\n                this.container.width / (this.container.scale.x * 2);\r\n            this.container.pivot.y =\r\n                this.container.height / (this.container.scale.y * 2);\r\n            this.container.x = this.x * size + size / 2;\r\n            this.container.y = this.y * size + size / 2;\r\n            this.container.rotation = (this.direction.valueOf() * Math.PI) / 2;\r\n        }\r\n    };\r\n    return Tile;\r\n}());\r\nexports.Tile = Tile;\r\nvar SpriteTile = /** @class */ (function (_super) {\r\n    __extends(SpriteTile, _super);\r\n    function SpriteTile() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    SpriteTile.prototype.generateContainer = function () {\r\n        return new PIXI.Sprite(this.texture);\r\n    };\r\n    return SpriteTile;\r\n}(Tile));\r\nexports.SpriteTile = SpriteTile;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90aWxlcy90aWxlLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL3RpbGVzL3RpbGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2RpcmVjdGlvbnNcIjtcclxuaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb25uZWN0YWJsZSB7XHJcbiAgICBjb25uZWN0OiB7XHJcbiAgICAgICAgdXA6IGJvb2xlYW47XHJcbiAgICAgICAgZG93bjogYm9vbGVhbjtcclxuICAgICAgICBsZWZ0OiBib29sZWFuO1xyXG4gICAgICAgIHJpZ2h0OiBib29sZWFuO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRpbGUge1xyXG4gICAgbGFiZWw/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgICB4ID0gMDtcclxuICAgIHkgPSAwO1xyXG4gICAgZGlyZWN0aW9uID0gRGlyZWN0aW9uLk5PUk1BTDtcclxuICAgIGNvbnRhaW5lcj86IFBJWEkuQ29udGFpbmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIGFic3RyYWN0IGdlbmVyYXRlQ29udGFpbmVyKCk6IFBJWEkuQ29udGFpbmVyO1xyXG5cclxuICAgIGdldENvbnRhaW5lcihzaXplOiBudW1iZXIpOiBQSVhJLkNvbnRhaW5lciB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09IG51bGwpIHRoaXMuY29udGFpbmVyID0gdGhpcy5nZW5lcmF0ZUNvbnRhaW5lcigpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLndpZHRoID0gc2l6ZTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5oZWlnaHQgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnBpdm90LnggPVxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci53aWR0aCAvICh0aGlzLmNvbnRhaW5lci5zY2FsZS54ICogMik7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucGl2b3QueSA9XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmhlaWdodCAvICh0aGlzLmNvbnRhaW5lci5zY2FsZS55ICogMik7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIueCA9IHRoaXMueCAqIHNpemUgKyBzaXplIC8gMjtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci55ID0gdGhpcy55ICogc2l6ZSArIHNpemUgLyAyO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJvdGF0aW9uID0gKHRoaXMuZGlyZWN0aW9uLnZhbHVlT2YoKSAqIE1hdGguUEkpIC8gMjtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHNpemU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci53aWR0aCA9IHNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmhlaWdodCA9IHNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnBpdm90LnggPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIud2lkdGggLyAodGhpcy5jb250YWluZXIuc2NhbGUueCAqIDIpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5waXZvdC55ID1cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmhlaWdodCAvICh0aGlzLmNvbnRhaW5lci5zY2FsZS55ICogMik7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnggPSB0aGlzLnggKiBzaXplICsgc2l6ZSAvIDI7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnkgPSB0aGlzLnkgKiBzaXplICsgc2l6ZSAvIDI7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnJvdGF0aW9uID0gKHRoaXMuZGlyZWN0aW9uLnZhbHVlT2YoKSAqIE1hdGguUEkpIC8gMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTcHJpdGVUaWxlIGV4dGVuZHMgVGlsZSB7XHJcbiAgICBhYnN0cmFjdCB0ZXh0dXJlOiBQSVhJLlRleHR1cmU7XHJcblxyXG4gICAgZ2VuZXJhdGVDb250YWluZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQSVhJLlNwcml0ZSh0aGlzLnRleHR1cmUpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQVdBO0FBT0E7QUFOQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUF6Q0E7QUEyQ0E7QUFBQTtBQUFBOztBQU1BO0FBSEE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQU5BOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/tiles/tile.ts\n");

/***/ }),

/***/ "./src/components/tiles/wire-tile.ts":
/*!*******************************************!*\
  !*** ./src/components/tiles/wire-tile.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar tile_1 = __webpack_require__(/*! ./tile */ \"./src/components/tiles/tile.ts\");\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar Wire = /** @class */ (function (_super) {\r\n    __extends(Wire, _super);\r\n    function Wire() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.connect = {\r\n            up: false,\r\n            down: false,\r\n            left: false,\r\n            right: false,\r\n        };\r\n        return _this;\r\n    }\r\n    Wire.prototype.generateContainer = function () {\r\n        return new PIXI.Graphics();\r\n    };\r\n    return Wire;\r\n}(tile_1.Tile));\r\nexports.default = Wire;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90aWxlcy93aXJlLXRpbGUudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2NvbXBvbmVudHMvdGlsZXMvd2lyZS10aWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy9kaXJlY3Rpb25zXCI7XHJcbmltcG9ydCB7IFNwcml0ZVRpbGUsIFRpbGUgfSBmcm9tIFwiLi90aWxlXCI7XHJcbmltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcclxuXHJcbmNsYXNzIFdpcmUgZXh0ZW5kcyBUaWxlIHtcclxuICAgIGNvbm5lY3QgPSB7XHJcbiAgICAgICAgdXA6IGZhbHNlLFxyXG4gICAgICAgIGRvd246IGZhbHNlLFxyXG4gICAgICAgIGxlZnQ6IGZhbHNlLFxyXG4gICAgICAgIHJpZ2h0OiBmYWxzZSxcclxuICAgIH07XHJcblxyXG4gICAgZ2VuZXJhdGVDb250YWluZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXaXJlO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQU1BO0FBSkE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUVBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/tiles/wire-tile.ts\n");

/***/ })

})
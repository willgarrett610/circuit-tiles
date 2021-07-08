webpackHotUpdate("main",{

/***/ "./src/components/grid.ts":
/*!********************************!*\
  !*** ./src/components/grid.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __spreadArray = (this && this.__spreadArray) || function (to, from) {\r\n    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)\r\n        to[j] = from[i];\r\n    return to;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\r\nvar math_1 = __webpack_require__(/*! ../utils/math */ \"./src/utils/math.ts\");\r\nvar config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\r\nvar wire_tile_1 = __webpack_require__(/*! ./tiles/wire_tile */ \"./src/components/tiles/wire_tile.ts\");\r\nvar directions_1 = __webpack_require__(/*! ../utils/directions */ \"./src/utils/directions.ts\");\r\nvar lever_tile_1 = __webpack_require__(/*! ./tiles/lever_tile */ \"./src/components/tiles/lever_tile.ts\");\r\nvar Grid = /** @class */ (function (_super) {\r\n    __extends(Grid, _super);\r\n    function Grid(size) {\r\n        var _this = _super.call(this) || this;\r\n        _this.scroll = function (e) {\r\n            if (e.deltaY === 0)\r\n                return;\r\n            var mult = 1 / (config_1.default.zoomCoeff * e.deltaY);\r\n            if (mult < 0)\r\n                mult = -1 / mult;\r\n            var prevPos = _this.screenToGrid(e.pageX, e.pageY);\r\n            _this.size = Math.round(mult * _this.size);\r\n            _this.size = math_1.clamp(_this.size, 20, 350);\r\n            var newPos = _this.screenToGrid(e.pageX, e.pageY);\r\n            _this.x += (newPos.x - prevPos.x) * _this.size;\r\n            _this.y += (newPos.y - prevPos.y) * _this.size;\r\n            _this.update();\r\n        };\r\n        _this.mouseDown = function (e) { };\r\n        _this.mouseUp = function (e) { };\r\n        _this.mouseMove = function (event) {\r\n            var _a, _b;\r\n            var e = event.data.originalEvent;\r\n            _this.prevMousePos = __spreadArray([], _this.mousePos);\r\n            _this.mousePos = [e.pageX, e.pageY];\r\n            if (utils_1.mouseDown.left) {\r\n                if (e.shiftKey || utils_1.pressedKeys[\"Space\"]) {\r\n                    _this.x += e.movementX;\r\n                    _this.y += e.movementY;\r\n                }\r\n                else {\r\n                    var gridPoints = _this.gridPointsBetween.apply(_this, __spreadArray(__spreadArray([], utils_1.locationToTuple(_this.screenToGrid.apply(_this, __spreadArray(__spreadArray([], _this.prevMousePos), [true])))), utils_1.locationToTuple(_this.screenToGrid.apply(_this, __spreadArray(__spreadArray([], _this.mousePos), [true])))));\r\n                    var prevTile = undefined;\r\n                    for (var i = 0; i < gridPoints.length; i++) {\r\n                        var gridPoint = gridPoints[i];\r\n                        var _c = _this.addTile.apply(_this, __spreadArray(__spreadArray([], utils_1.locationToTuple(gridPoint)), [lever_tile_1.default])), placed = _c[0], newTile = _c[1];\r\n                        if (gridPoint.direction != undefined &&\r\n                            newTile instanceof wire_tile_1.default) {\r\n                            if (prevTile && prevTile instanceof wire_tile_1.default)\r\n                                prevTile.connect[[\"down\", \"right\", \"up\", \"left\"][gridPoint.direction.valueOf()]] = true;\r\n                            newTile.connect[[\"up\", \"left\", \"down\", \"right\"][gridPoint.direction.valueOf()]] = true;\r\n                            (_a = prevTile === null || prevTile === void 0 ? void 0 : prevTile.updateContainer) === null || _a === void 0 ? void 0 : _a.call(prevTile);\r\n                            (_b = newTile === null || newTile === void 0 ? void 0 : newTile.updateContainer) === null || _b === void 0 ? void 0 : _b.call(newTile);\r\n                            // newTile.updateContainer();\r\n                            // newTile.getContainer(this.size);\r\n                        }\r\n                        prevTile = newTile;\r\n                    }\r\n                }\r\n            }\r\n            _this.update();\r\n        };\r\n        _this.click = function (event) {\r\n            if (event.data.button == 0 &&\r\n                !event.data.originalEvent.shiftKey &&\r\n                !utils_1.pressedKeys[\"Space\"]) {\r\n                var gridPoint = utils_1.locationToTuple(_this.screenToGrid.apply(_this, __spreadArray(__spreadArray([], _this.mousePos), [true])));\r\n                _this.addTile.apply(_this, __spreadArray(__spreadArray([], gridPoint), [wire_tile_1.default]));\r\n                _this.update();\r\n            }\r\n        };\r\n        _this.keyDown = function (e) {\r\n            if (e.ctrlKey && !e.shiftKey) {\r\n                if (e.code === \"Equal\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * -100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Minus\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * 100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Digit0\") {\r\n                    e.preventDefault();\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = _this.startingSize;\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n            }\r\n            if (!e.ctrlKey && !e.shiftKey && e.code === \"KeyH\") {\r\n                e.preventDefault();\r\n                _this.x = 0;\r\n                _this.y = 0;\r\n                _this.update();\r\n            }\r\n        };\r\n        _this.update = function () {\r\n            _this.renderGrid();\r\n            _this.renderTiles();\r\n        };\r\n        _this.gridPointsBetween = function (x0, y0, x1, y1) {\r\n            var dx = x1 - x0;\r\n            var dy = y1 - y0;\r\n            var nx = Math.abs(dx);\r\n            var ny = Math.abs(dy);\r\n            var signX = Math.sign(dx);\r\n            var signY = Math.sign(dy);\r\n            var point = {\r\n                x: x0,\r\n                y: y0,\r\n                direction: undefined,\r\n            };\r\n            var points = [__assign({}, point)];\r\n            for (var ix = 0, iy = 0; ix < nx || iy < ny;) {\r\n                if ((1 + 2 * ix) * ny < (1 + 2 * iy) * nx) {\r\n                    point.x += signX;\r\n                    point.direction = signX < 0 ? directions_1.Direction.LEFT : directions_1.Direction.RIGHT;\r\n                    ix++;\r\n                }\r\n                else {\r\n                    point.y += signY;\r\n                    point.direction = signY < 0 ? directions_1.Direction.DOWN : directions_1.Direction.UP;\r\n                    iy++;\r\n                }\r\n                points.push(__assign({}, point));\r\n            }\r\n            return points;\r\n        };\r\n        /**\r\n         * From screen space to grid space\r\n         * @param x X in screen space\r\n         * @param y Y in screen space\r\n         * @returns Coordinates in grid space\r\n         */\r\n        _this.screenToGrid = function (x, y, floored) {\r\n            if (floored === void 0) { floored = false; }\r\n            return floored\r\n                ? {\r\n                    x: Math.floor((-_this.x + x) / _this.size),\r\n                    y: Math.floor((-_this.y + y) / _this.size),\r\n                }\r\n                : {\r\n                    x: (-_this.x + x) / _this.size,\r\n                    y: (-_this.y + y) / _this.size,\r\n                };\r\n        };\r\n        /**\r\n         * From grid space to screen space (Top Left corner)\r\n         * @param x X in grid space\r\n         * @param y Y in grid space\r\n         * @returns Coordinates in screen space\r\n         */\r\n        _this.gridToScreen = function (x, y) { return ({\r\n            x: Math.floor(x) * _this.size + _this.x,\r\n            y: Math.floor(y) * _this.size + _this.y,\r\n        }); };\r\n        _this.startingSize = size;\r\n        _this.size = size;\r\n        _this.tiles = {};\r\n        _this.prevMousePos = [0, 0];\r\n        _this.mousePos = [0, 0];\r\n        _this.lineGraphics = new PIXI.Graphics();\r\n        _this.lineGraphics.zIndex = 1000;\r\n        _this.hlTile = new PIXI.Graphics();\r\n        _this.addChild(_this.lineGraphics);\r\n        _this.addChild(_this.hlTile);\r\n        _this.renderGrid();\r\n        utils_1.onResize(_this.update);\r\n        _this.interactive = true;\r\n        _this.sortableChildren = true;\r\n        _this.zIndex = 1000;\r\n        utils_1.onScroll(_this, _this.scroll);\r\n        _this.on(\"mousedown\", _this.mouseDown);\r\n        _this.on(\"mouseup\", _this.mouseUp);\r\n        _this.on(\"mousemove\", _this.mouseMove);\r\n        utils_1.onKeyDown(_this.keyDown);\r\n        return _this;\r\n    }\r\n    Grid.prototype.addTile = function (x, y, tile) {\r\n        if (this.tiles[x + \",\" + y])\r\n            return [false, this.tiles[x + \",\" + y]];\r\n        var tileObj = new tile(x, y);\r\n        this.tiles[x + \",\" + y] = tileObj;\r\n        var tileGraphics = tileObj.getContainer(this.size);\r\n        this.addChild(tileGraphics);\r\n        return [true, tileObj];\r\n    };\r\n    Grid.prototype.renderGrid = function () {\r\n        var width = utils_1.dimensions()[0];\r\n        var height = utils_1.dimensions()[1];\r\n        var tileXCount = Math.floor(width / this.size);\r\n        var tileYCount = Math.floor(height / this.size);\r\n        this.lineGraphics.clear();\r\n        for (var x = -Math.ceil(this.x / this.size); x <= tileXCount - Math.floor(this.x / this.size); x++) {\r\n            this.lineGraphics.beginFill(config_1.default.lineColor);\r\n            this.lineGraphics.lineStyle(0);\r\n            this.lineGraphics.drawRect(x * this.size, -this.y, config_1.default.lineWidth *\r\n                (x % Math.floor(math_1.clamp(200 / this.size, 3, 8)) === 0\r\n                    ? 2\r\n                    : 1), height);\r\n        }\r\n        for (var y = -Math.ceil(this.y / this.size); y <= tileYCount - Math.floor(this.y / this.size); y++) {\r\n            this.lineGraphics.beginFill(config_1.default.lineColor);\r\n            this.lineGraphics.lineStyle(0);\r\n            this.lineGraphics.drawRect(-this.x, y * this.size, width, config_1.default.lineWidth *\r\n                (y % Math.floor(math_1.clamp(200 / this.size, 3, 8)) === 0 ? 2 : 1));\r\n        }\r\n        var gridPos = this.screenToGrid.apply(this, this.mousePos);\r\n        gridPos.x = Math.floor(gridPos.x) * this.size;\r\n        gridPos.y = Math.floor(gridPos.y) * this.size;\r\n        this.hlTile.clear();\r\n        this.hlTile.beginFill(config_1.default.highlightTileColor);\r\n        this.hlTile.lineStyle(0);\r\n        this.hlTile.drawRect(gridPos.x + config_1.default.lineWidth / 2, gridPos.y + config_1.default.lineWidth / 2, this.size, this.size);\r\n    };\r\n    Grid.prototype.renderTiles = function () {\r\n        for (var _i = 0, _a = Object.entries(this.tiles); _i < _a.length; _i++) {\r\n            var _b = _a[_i], _ = _b[0], tile = _b[1];\r\n            tile.update(this.size);\r\n        }\r\n    };\r\n    return Grid;\r\n}(PIXI.Container));\r\nexports.default = Grid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ncmlkLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL2dyaWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgZGltZW5zaW9ucyxcclxuICAgIGxvY2F0aW9uVG9UdXBsZSxcclxuICAgIG1vdXNlRG93bixcclxuICAgIG9uS2V5RG93bixcclxuICAgIG9uUmVzaXplLFxyXG4gICAgb25TY3JvbGwsXHJcbiAgICBwcmVzc2VkS2V5cyxcclxufSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgY2xhbXAgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aFwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IFdpcmUgZnJvbSBcIi4vdGlsZXMvd2lyZV90aWxlXCI7XHJcbmltcG9ydCB7IFRpbGUgfSBmcm9tIFwiLi90aWxlcy90aWxlXCI7XHJcbmltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gXCIuLi91dGlscy9kaXJlY3Rpb25zXCI7XHJcbmltcG9ydCBMZXZlciBmcm9tIFwiLi90aWxlcy9sZXZlcl90aWxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xyXG4gICAgc3RhcnRpbmdTaXplOiBudW1iZXI7XHJcbiAgICBzaXplOiBudW1iZXI7XHJcbiAgICB0aWxlczogeyBba2V5OiBzdHJpbmddOiBUaWxlIH07XHJcblxyXG4gICAgbW91c2VQb3M6IFt4OiBudW1iZXIsIHk6IG51bWJlcl07XHJcbiAgICBwcmV2TW91c2VQb3M6IFt4OiBudW1iZXIsIHk6IG51bWJlcl07XHJcblxyXG4gICAgbGluZUdyYXBoaWNzOiBQSVhJLkdyYXBoaWNzO1xyXG4gICAgaGxUaWxlOiBQSVhJLkdyYXBoaWNzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydGluZ1NpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy50aWxlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMucHJldk1vdXNlUG9zID0gWzAsIDBdO1xyXG4gICAgICAgIHRoaXMubW91c2VQb3MgPSBbMCwgMF07XHJcblxyXG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgIHRoaXMuaGxUaWxlID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmxpbmVHcmFwaGljcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmhsVGlsZSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyR3JpZCgpO1xyXG5cclxuICAgICAgICBvblJlc2l6ZSh0aGlzLnVwZGF0ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc29ydGFibGVDaGlsZHJlbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy56SW5kZXggPSAxMDAwO1xyXG5cclxuICAgICAgICBvblNjcm9sbCh0aGlzLCB0aGlzLnNjcm9sbCk7XHJcblxyXG4gICAgICAgIHRoaXMub24oXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZURvd24pO1xyXG4gICAgICAgIHRoaXMub24oXCJtb3VzZXVwXCIsIHRoaXMubW91c2VVcCk7XHJcbiAgICAgICAgdGhpcy5vbihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlTW92ZSk7XHJcblxyXG4gICAgICAgIG9uS2V5RG93bih0aGlzLmtleURvd24pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRpbGU8VCBleHRlbmRzIFRpbGU+KFxyXG4gICAgICAgIHg6IG51bWJlcixcclxuICAgICAgICB5OiBudW1iZXIsXHJcbiAgICAgICAgdGlsZTogeyBuZXcgKHg6IG51bWJlciwgeTogbnVtYmVyKTogVCB9XHJcbiAgICApOiBbcGxhY2VkOiBib29sZWFuLCB0aWxlOiBUaWxlXSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGlsZXNbYCR7eH0sJHt5fWBdKSByZXR1cm4gW2ZhbHNlLCB0aGlzLnRpbGVzW2Ake3h9LCR7eX1gXV07XHJcbiAgICAgICAgbGV0IHRpbGVPYmogPSBuZXcgdGlsZSh4LCB5KTtcclxuICAgICAgICB0aGlzLnRpbGVzW2Ake3h9LCR7eX1gXSA9IHRpbGVPYmo7XHJcbiAgICAgICAgY29uc3QgdGlsZUdyYXBoaWNzOiBQSVhJLkNvbnRhaW5lciA9IHRpbGVPYmouZ2V0Q29udGFpbmVyKHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aWxlR3JhcGhpY3MpO1xyXG5cclxuICAgICAgICByZXR1cm4gW3RydWUsIHRpbGVPYmpdO1xyXG4gICAgfVxyXG5cclxuICAgIHNjcm9sbCA9IChlOiBXaGVlbEV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGUuZGVsdGFZID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBtdWx0ID0gMSAvIChjb25maWcuem9vbUNvZWZmICogZS5kZWx0YVkpO1xyXG4gICAgICAgIGlmIChtdWx0IDwgMCkgbXVsdCA9IC0xIC8gbXVsdDtcclxuXHJcbiAgICAgICAgbGV0IHByZXZQb3MgPSB0aGlzLnNjcmVlblRvR3JpZChlLnBhZ2VYLCBlLnBhZ2VZKTtcclxuXHJcbiAgICAgICAgdGhpcy5zaXplID0gTWF0aC5yb3VuZChtdWx0ICogdGhpcy5zaXplKTtcclxuICAgICAgICB0aGlzLnNpemUgPSBjbGFtcCh0aGlzLnNpemUsIDIwLCAzNTApO1xyXG5cclxuICAgICAgICBsZXQgbmV3UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoZS5wYWdlWCwgZS5wYWdlWSk7XHJcblxyXG4gICAgICAgIHRoaXMueCArPSAobmV3UG9zLnggLSBwcmV2UG9zLngpICogdGhpcy5zaXplO1xyXG4gICAgICAgIHRoaXMueSArPSAobmV3UG9zLnkgLSBwcmV2UG9zLnkpICogdGhpcy5zaXplO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBtb3VzZURvd24gPSAoZTogUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50KSA9PiB7fTtcclxuXHJcbiAgICBtb3VzZVVwID0gKGU6IFBJWEkuaW50ZXJhY3Rpb24uSW50ZXJhY3Rpb25FdmVudCkgPT4ge307XHJcblxyXG4gICAgbW91c2VNb3ZlID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICBsZXQgZSA9IGV2ZW50LmRhdGEub3JpZ2luYWxFdmVudCBhcyBQb2ludGVyRXZlbnQ7XHJcbiAgICAgICAgdGhpcy5wcmV2TW91c2VQb3MgPSBbLi4udGhpcy5tb3VzZVBvc107XHJcbiAgICAgICAgdGhpcy5tb3VzZVBvcyA9IFtlLnBhZ2VYLCBlLnBhZ2VZXTtcclxuICAgICAgICBpZiAobW91c2VEb3duLmxlZnQpIHtcclxuICAgICAgICAgICAgaWYgKGUuc2hpZnRLZXkgfHwgcHJlc3NlZEtleXNbXCJTcGFjZVwiXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IGUubW92ZW1lbnRYO1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IGUubW92ZW1lbnRZO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3JpZFBvaW50cyA9IHRoaXMuZ3JpZFBvaW50c0JldHdlZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubG9jYXRpb25Ub1R1cGxlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcmVlblRvR3JpZCguLi50aGlzLnByZXZNb3VzZVBvcywgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLmxvY2F0aW9uVG9UdXBsZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JlZW5Ub0dyaWQoLi4udGhpcy5tb3VzZVBvcywgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcmV2VGlsZTogVGlsZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZFBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyaWRQb2ludCA9IGdyaWRQb2ludHNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFtwbGFjZWQsIG5ld1RpbGVdID0gdGhpcy5hZGRUaWxlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5sb2NhdGlvblRvVHVwbGUoZ3JpZFBvaW50KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTGV2ZXJcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRQb2ludC5kaXJlY3Rpb24gIT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RpbGUgaW5zdGFuY2VvZiBXaXJlXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2VGlsZSAmJiBwcmV2VGlsZSBpbnN0YW5jZW9mIFdpcmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJldlRpbGUuY29ubmVjdCBhcyBhbnkpW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcImRvd25cIiwgXCJyaWdodFwiLCBcInVwXCIsIFwibGVmdFwiXVtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFBvaW50LmRpcmVjdGlvbi52YWx1ZU9mKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKChuZXdUaWxlIGFzIFdpcmUpLmNvbm5lY3QgYXMgYW55KVtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcInVwXCIsIFwibGVmdFwiLCBcImRvd25cIiwgXCJyaWdodFwiXVtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkUG9pbnQuZGlyZWN0aW9uLnZhbHVlT2YoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZUaWxlPy51cGRhdGVDb250YWluZXI/LigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdUaWxlPy51cGRhdGVDb250YWluZXI/LigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXdUaWxlLnVwZGF0ZUNvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXdUaWxlLmdldENvbnRhaW5lcih0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldlRpbGUgPSBuZXdUaWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjbGljayA9IChldmVudDogUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBldmVudC5kYXRhLmJ1dHRvbiA9PSAwICYmXHJcbiAgICAgICAgICAgICFldmVudC5kYXRhLm9yaWdpbmFsRXZlbnQuc2hpZnRLZXkgJiZcclxuICAgICAgICAgICAgIXByZXNzZWRLZXlzW1wiU3BhY2VcIl1cclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZFBvaW50ID0gbG9jYXRpb25Ub1R1cGxlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JlZW5Ub0dyaWQoLi4udGhpcy5tb3VzZVBvcywgdHJ1ZSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkVGlsZSguLi5ncmlkUG9pbnQsIFdpcmUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGtleURvd24gPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChlLmN0cmxLZXkgJiYgIWUuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gXCJFcXVhbFwiKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG11bHQgPSAxIC8gKGNvbmZpZy56b29tQ29lZmYgKiAtMTAwKTtcclxuICAgICAgICAgICAgICAgIGlmIChtdWx0IDwgMCkgbXVsdCA9IC0xIC8gbXVsdDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldlBvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0IC8gMlxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSBNYXRoLnJvdW5kKG11bHQgKiB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gY2xhbXAodGhpcy5zaXplLCAyMCwgMzUwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IChuZXdQb3MueCAtIHByZXZQb3MueCkgKiB0aGlzLnNpemU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKG5ld1Bvcy55IC0gcHJldlBvcy55KSAqIHRoaXMuc2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSBcIk1pbnVzXCIpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbXVsdCA9IDEgLyAoY29uZmlnLnpvb21Db2VmZiAqIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobXVsdCA8IDApIG11bHQgPSAtMSAvIG11bHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHByZXZQb3MgPSB0aGlzLnNjcmVlblRvR3JpZChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpZHRoIC8gMixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCAvIDJcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gTWF0aC5yb3VuZChtdWx0ICogdGhpcy5zaXplKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IGNsYW1wKHRoaXMuc2l6ZSwgMjAsIDM1MCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKHRoaXMud2lkdGggLyAyLCB0aGlzLmhlaWdodCAvIDIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMueCArPSAobmV3UG9zLnggLSBwcmV2UG9zLngpICogdGhpcy5zaXplO1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IChuZXdQb3MueSAtIHByZXZQb3MueSkgKiB0aGlzLnNpemU7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gXCJEaWdpdDBcIikge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcmV2UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgLyAyXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuc3RhcnRpbmdTaXplO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuZXdQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gKG5ld1Bvcy54IC0gcHJldlBvcy54KSAqIHRoaXMuc2l6ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMueSArPSAobmV3UG9zLnkgLSBwcmV2UG9zLnkpICogdGhpcy5zaXplO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZS5jdHJsS2V5ICYmICFlLnNoaWZ0S2V5ICYmIGUuY29kZSA9PT0gXCJLZXlIXCIpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyR3JpZCgpIHtcclxuICAgICAgICBsZXQgd2lkdGggPSBkaW1lbnNpb25zKClbMF07XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IGRpbWVuc2lvbnMoKVsxXTtcclxuICAgICAgICBjb25zdCB0aWxlWENvdW50ID0gTWF0aC5mbG9vcih3aWR0aCAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgY29uc3QgdGlsZVlDb3VudCA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gdGhpcy5zaXplKTtcclxuXHJcbiAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgbGV0IHggPSAtTWF0aC5jZWlsKHRoaXMueCAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgIHggPD0gdGlsZVhDb3VudCAtIE1hdGguZmxvb3IodGhpcy54IC8gdGhpcy5zaXplKTtcclxuICAgICAgICAgICAgeCsrXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmJlZ2luRmlsbChjb25maWcubGluZUNvbG9yKTtcclxuICAgICAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MubGluZVN0eWxlKDApO1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5kcmF3UmVjdChcclxuICAgICAgICAgICAgICAgIHggKiB0aGlzLnNpemUsXHJcbiAgICAgICAgICAgICAgICAtdGhpcy55LFxyXG4gICAgICAgICAgICAgICAgY29uZmlnLmxpbmVXaWR0aCAqXHJcbiAgICAgICAgICAgICAgICAgICAgKHggJSBNYXRoLmZsb29yKGNsYW1wKDIwMCAvIHRoaXMuc2l6ZSwgMywgOCkpID09PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IDEpLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKFxyXG4gICAgICAgICAgICBsZXQgeSA9IC1NYXRoLmNlaWwodGhpcy55IC8gdGhpcy5zaXplKTtcclxuICAgICAgICAgICAgeSA8PSB0aWxlWUNvdW50IC0gTWF0aC5mbG9vcih0aGlzLnkgLyB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICB5KytcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MuYmVnaW5GaWxsKGNvbmZpZy5saW5lQ29sb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5saW5lU3R5bGUoMCk7XHJcbiAgICAgICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmRyYXdSZWN0KFxyXG4gICAgICAgICAgICAgICAgLXRoaXMueCxcclxuICAgICAgICAgICAgICAgIHkgKiB0aGlzLnNpemUsXHJcbiAgICAgICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5saW5lV2lkdGggKlxyXG4gICAgICAgICAgICAgICAgICAgICh5ICUgTWF0aC5mbG9vcihjbGFtcCgyMDAgLyB0aGlzLnNpemUsIDMsIDgpKSA9PT0gMCA/IDIgOiAxKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGdyaWRQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCguLi50aGlzLm1vdXNlUG9zKTtcclxuICAgICAgICBncmlkUG9zLnggPSBNYXRoLmZsb29yKGdyaWRQb3MueCkgKiB0aGlzLnNpemU7XHJcbiAgICAgICAgZ3JpZFBvcy55ID0gTWF0aC5mbG9vcihncmlkUG9zLnkpICogdGhpcy5zaXplO1xyXG5cclxuICAgICAgICB0aGlzLmhsVGlsZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuaGxUaWxlLmJlZ2luRmlsbChjb25maWcuaGlnaGxpZ2h0VGlsZUNvbG9yKTtcclxuICAgICAgICB0aGlzLmhsVGlsZS5saW5lU3R5bGUoMCk7XHJcbiAgICAgICAgdGhpcy5obFRpbGUuZHJhd1JlY3QoXHJcbiAgICAgICAgICAgIGdyaWRQb3MueCArIGNvbmZpZy5saW5lV2lkdGggLyAyLFxyXG4gICAgICAgICAgICBncmlkUG9zLnkgKyBjb25maWcubGluZVdpZHRoIC8gMixcclxuICAgICAgICAgICAgdGhpcy5zaXplLFxyXG4gICAgICAgICAgICB0aGlzLnNpemVcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclRpbGVzKCkge1xyXG4gICAgICAgIGZvciAobGV0IFtfLCB0aWxlXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLnRpbGVzKSlcclxuICAgICAgICAgICAgdGlsZS51cGRhdGUodGhpcy5zaXplKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJHcmlkKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJUaWxlcygpO1xyXG4gICAgfTtcclxuXHJcbiAgICBncmlkUG9pbnRzQmV0d2VlbiA9ICh4MDogbnVtYmVyLCB5MDogbnVtYmVyLCB4MTogbnVtYmVyLCB5MTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZHggPSB4MSAtIHgwO1xyXG4gICAgICAgIGNvbnN0IGR5ID0geTEgLSB5MDtcclxuICAgICAgICBjb25zdCBueCA9IE1hdGguYWJzKGR4KTtcclxuICAgICAgICBjb25zdCBueSA9IE1hdGguYWJzKGR5KTtcclxuICAgICAgICBjb25zdCBzaWduWCA9IE1hdGguc2lnbihkeCk7XHJcbiAgICAgICAgY29uc3Qgc2lnblkgPSBNYXRoLnNpZ24oZHkpO1xyXG5cclxuICAgICAgICBjb25zdCBwb2ludDogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgZGlyZWN0aW9uPzogRGlyZWN0aW9uIH0gPSB7XHJcbiAgICAgICAgICAgIHg6IHgwLFxyXG4gICAgICAgICAgICB5OiB5MCxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiB1bmRlZmluZWQsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBwb2ludHMgPSBbeyAuLi5wb2ludCB9XTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaXggPSAwLCBpeSA9IDA7IGl4IDwgbnggfHwgaXkgPCBueTsgKSB7XHJcbiAgICAgICAgICAgIGlmICgoMSArIDIgKiBpeCkgKiBueSA8ICgxICsgMiAqIGl5KSAqIG54KSB7XHJcbiAgICAgICAgICAgICAgICBwb2ludC54ICs9IHNpZ25YO1xyXG4gICAgICAgICAgICAgICAgcG9pbnQuZGlyZWN0aW9uID0gc2lnblggPCAwID8gRGlyZWN0aW9uLkxFRlQgOiBEaXJlY3Rpb24uUklHSFQ7XHJcbiAgICAgICAgICAgICAgICBpeCsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcG9pbnQueSArPSBzaWduWTtcclxuICAgICAgICAgICAgICAgIHBvaW50LmRpcmVjdGlvbiA9IHNpZ25ZIDwgMCA/IERpcmVjdGlvbi5ET1dOIDogRGlyZWN0aW9uLlVQO1xyXG4gICAgICAgICAgICAgICAgaXkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwb2ludHMucHVzaCh7IC4uLnBvaW50IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGcm9tIHNjcmVlbiBzcGFjZSB0byBncmlkIHNwYWNlXHJcbiAgICAgKiBAcGFyYW0geCBYIGluIHNjcmVlbiBzcGFjZVxyXG4gICAgICogQHBhcmFtIHkgWSBpbiBzY3JlZW4gc3BhY2VcclxuICAgICAqIEByZXR1cm5zIENvb3JkaW5hdGVzIGluIGdyaWQgc3BhY2VcclxuICAgICAqL1xyXG4gICAgc2NyZWVuVG9HcmlkID0gKHg6IG51bWJlciwgeTogbnVtYmVyLCBmbG9vcmVkID0gZmFsc2UpID0+XHJcbiAgICAgICAgZmxvb3JlZFxyXG4gICAgICAgICAgICA/IHtcclxuICAgICAgICAgICAgICAgICAgeDogTWF0aC5mbG9vcigoLXRoaXMueCArIHgpIC8gdGhpcy5zaXplKSxcclxuICAgICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcigoLXRoaXMueSArIHkpIC8gdGhpcy5zaXplKSxcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDoge1xyXG4gICAgICAgICAgICAgICAgICB4OiAoLXRoaXMueCArIHgpIC8gdGhpcy5zaXplLFxyXG4gICAgICAgICAgICAgICAgICB5OiAoLXRoaXMueSArIHkpIC8gdGhpcy5zaXplLFxyXG4gICAgICAgICAgICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGcm9tIGdyaWQgc3BhY2UgdG8gc2NyZWVuIHNwYWNlIChUb3AgTGVmdCBjb3JuZXIpXHJcbiAgICAgKiBAcGFyYW0geCBYIGluIGdyaWQgc3BhY2VcclxuICAgICAqIEBwYXJhbSB5IFkgaW4gZ3JpZCBzcGFjZVxyXG4gICAgICogQHJldHVybnMgQ29vcmRpbmF0ZXMgaW4gc2NyZWVuIHNwYWNlXHJcbiAgICAgKi9cclxuICAgIGdyaWRUb1NjcmVlbiA9ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gKHtcclxuICAgICAgICB4OiBNYXRoLmZsb29yKHgpICogdGhpcy5zaXplICsgdGhpcy54LFxyXG4gICAgICAgIHk6IE1hdGguZmxvb3IoeSkgKiB0aGlzLnNpemUgKyB0aGlzLnksXHJcbiAgICB9KTtcclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQVdBO0FBQUE7QUE4Q0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUVBO0FBS0E7QUFFQTtBQUVBO0FBQ0E7QUFLQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBS0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFLQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUtBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFnRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBRUE7QUFLQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBMktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBS0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUtBO0FBQ0E7QUFDQTtBQUtBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBaUVBO0FBQUE7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/grid.ts\n");

/***/ }),

/***/ "./src/components/tiles/lever_tile.ts":
/*!********************************************!*\
  !*** ./src/components/tiles/lever_tile.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar tile_1 = __webpack_require__(/*! ./tile */ \"./src/components/tiles/tile.ts\");\r\nvar Lever = /** @class */ (function (_super) {\r\n    __extends(Lever, _super);\r\n    function Lever(x, y) {\r\n        var _this = _super.call(this, x, y) || this;\r\n        _this.onColor = 0xff0000;\r\n        _this.offColor = 0x222222;\r\n        return _this;\r\n    }\r\n    Lever.prototype.postGenerate = function () {\r\n        var _this = this;\r\n        if (!this.container)\r\n            return;\r\n        this.container.interactive = true;\r\n        this.container.on(\"click\", function (e) {\r\n            _this.signalActive = !_this.signalActive;\r\n            _this.updateContainer();\r\n        });\r\n    };\r\n    Lever.prototype.drawGraphics = function () {\r\n        if (!this.graphics)\r\n            return;\r\n        this.graphics.clear();\r\n        // have to do this to set size to draw in the center\r\n        this.graphics.beginFill(0, 0);\r\n        this.graphics.drawRect(0, 0, 120, 120);\r\n        this.graphics.endFill();\r\n        this.graphics.beginFill(this.signalActive ? this.onColor : this.offColor);\r\n        this.graphics.drawRect(35, 35, 50, 50);\r\n        this.graphics.endFill();\r\n    };\r\n    return Lever;\r\n}(tile_1.GraphicsTile));\r\nexports.default = Lever;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90aWxlcy9sZXZlcl90aWxlLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL3RpbGVzL2xldmVyX3RpbGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JhcGhpY3NUaWxlIH0gZnJvbSBcIi4vdGlsZVwiO1xyXG5cclxuY2xhc3MgTGV2ZXIgZXh0ZW5kcyBHcmFwaGljc1RpbGUge1xyXG4gICAgb25Db2xvciA9IDB4ZmYwMDAwO1xyXG4gICAgb2ZmQ29sb3IgPSAweDIyMjIyMjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3RHZW5lcmF0ZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY29udGFpbmVyKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLm9uKFwiY2xpY2tcIiwgKGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNpZ25hbEFjdGl2ZSA9ICF0aGlzLnNpZ25hbEFjdGl2ZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDb250YWluZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3R3JhcGhpY3MoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdyYXBoaWNzKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgLy8gaGF2ZSB0byBkbyB0aGlzIHRvIHNldCBzaXplIHRvIGRyYXcgaW4gdGhlIGNlbnRlclxyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuYmVnaW5GaWxsKDAsIDApO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd1JlY3QoMCwgMCwgMTIwLCAxMjApO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZW5kRmlsbCgpO1xyXG5cclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmJlZ2luRmlsbChcclxuICAgICAgICAgICAgdGhpcy5zaWduYWxBY3RpdmUgPyB0aGlzLm9uQ29sb3IgOiB0aGlzLm9mZkNvbG9yXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KDM1LCAzNSwgNTAsIDUwKTtcclxuXHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5lbmRGaWxsKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExldmVyO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUFBO0FBSUE7QUFBQTtBQUhBO0FBQ0E7O0FBSUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/tiles/lever_tile.ts\n");

/***/ })

})
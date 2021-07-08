webpackHotUpdate("main",{

/***/ "./src/components/grid.ts":
/*!********************************!*\
  !*** ./src/components/grid.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __spreadArray = (this && this.__spreadArray) || function (to, from) {\r\n    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)\r\n        to[j] = from[i];\r\n    return to;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\r\nvar math_1 = __webpack_require__(/*! ../utils/math */ \"./src/utils/math.ts\");\r\nvar config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\r\nvar wire_tile_1 = __webpack_require__(/*! ./tiles/wire_tile */ \"./src/components/tiles/wire_tile.ts\");\r\nvar directions_1 = __webpack_require__(/*! ../utils/directions */ \"./src/utils/directions.ts\");\r\nvar Grid = /** @class */ (function (_super) {\r\n    __extends(Grid, _super);\r\n    function Grid(size) {\r\n        var _this = _super.call(this) || this;\r\n        _this.scroll = function (e) {\r\n            if (e.deltaY === 0)\r\n                return;\r\n            var mult = 1 / (config_1.default.zoomCoeff * e.deltaY);\r\n            if (mult < 0)\r\n                mult = -1 / mult;\r\n            var prevPos = _this.screenToGrid(e.pageX, e.pageY);\r\n            _this.size = Math.round(mult * _this.size);\r\n            _this.size = math_1.clamp(_this.size, 20, 350);\r\n            var newPos = _this.screenToGrid(e.pageX, e.pageY);\r\n            _this.x += (newPos.x - prevPos.x) * _this.size;\r\n            _this.y += (newPos.y - prevPos.y) * _this.size;\r\n            _this.update();\r\n        };\r\n        _this.mouseDown = function (e) { };\r\n        _this.mouseUp = function (e) { };\r\n        _this.mouseMove = function (event) {\r\n            var _a, _b;\r\n            var e = event.data.originalEvent;\r\n            _this.prevMousePos = __spreadArray([], _this.mousePos);\r\n            _this.mousePos = [e.pageX, e.pageY];\r\n            if (utils_1.mouseDown.left) {\r\n                if (e.shiftKey || utils_1.pressedKeys[\"Space\"]) {\r\n                    _this.x += e.movementX;\r\n                    _this.y += e.movementY;\r\n                }\r\n                else {\r\n                    var gridPoints = _this.gridPointsBetween.apply(_this, __spreadArray(__spreadArray([], utils_1.locationToTuple(_this.screenToGrid.apply(_this, __spreadArray(__spreadArray([], _this.prevMousePos), [true])))), utils_1.locationToTuple(_this.screenToGrid.apply(_this, __spreadArray(__spreadArray([], _this.mousePos), [true])))));\r\n                    var prevTile = undefined;\r\n                    for (var i = 0; i < gridPoints.length; i++) {\r\n                        var gridPoint = gridPoints[i];\r\n                        var _c = _this.addTile.apply(_this, __spreadArray(__spreadArray([], utils_1.locationToTuple(gridPoint)), [wire_tile_1.default])), placed = _c[0], newTile = _c[1];\r\n                        if (gridPoint.direction != undefined &&\r\n                            newTile instanceof wire_tile_1.default) {\r\n                            if (prevTile && prevTile instanceof wire_tile_1.default)\r\n                                prevTile.connect[[\"down\", \"right\", \"up\", \"left\"][gridPoint.direction.valueOf()]] = true;\r\n                            newTile.connect[[\"up\", \"left\", \"down\", \"right\"][gridPoint.direction.valueOf()]] = true;\r\n                            (_a = prevTile === null || prevTile === void 0 ? void 0 : prevTile.updateContainer) === null || _a === void 0 ? void 0 : _a.call(prevTile);\r\n                            (_b = newTile === null || newTile === void 0 ? void 0 : newTile.updateContainer) === null || _b === void 0 ? void 0 : _b.call(newTile);\r\n                            // newTile.updateContainer();\r\n                            // newTile.getContainer(this.size);\r\n                        }\r\n                        prevTile = newTile;\r\n                    }\r\n                }\r\n            }\r\n            _this.update();\r\n        };\r\n        _this.click = function (event) {\r\n            if (event.data.button == 0 &&\r\n                !event.data.originalEvent.shiftKey &&\r\n                !utils_1.pressedKeys[\"Space\"]) {\r\n                var gridPoint = utils_1.locationToTuple(_this.screenToGrid.apply(_this, __spreadArray(__spreadArray([], _this.mousePos), [true])));\r\n                _this.addTile.apply(_this, __spreadArray(__spreadArray([], gridPoint), [wire_tile_1.default]));\r\n                _this.update();\r\n            }\r\n        };\r\n        _this.keyDown = function (e) {\r\n            if (e.ctrlKey && !e.shiftKey) {\r\n                if (e.code === \"Equal\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * -100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Minus\") {\r\n                    e.preventDefault();\r\n                    var mult = 1 / (config_1.default.zoomCoeff * 100);\r\n                    if (mult < 0)\r\n                        mult = -1 / mult;\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = Math.round(mult * _this.size);\r\n                    _this.size = math_1.clamp(_this.size, 20, 350);\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n                if (e.code === \"Digit0\") {\r\n                    e.preventDefault();\r\n                    var prevPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.size = _this.startingSize;\r\n                    var newPos = _this.screenToGrid(_this.width / 2, _this.height / 2);\r\n                    _this.x += (newPos.x - prevPos.x) * _this.size;\r\n                    _this.y += (newPos.y - prevPos.y) * _this.size;\r\n                    _this.update();\r\n                }\r\n            }\r\n            if (!e.ctrlKey && !e.shiftKey && e.code === \"KeyH\") {\r\n                e.preventDefault();\r\n                _this.x = 0;\r\n                _this.y = 0;\r\n                _this.update();\r\n            }\r\n        };\r\n        _this.update = function () {\r\n            _this.renderGrid();\r\n            _this.renderTiles();\r\n        };\r\n        _this.gridPointsBetween = function (x0, y0, x1, y1) {\r\n            var dx = x1 - x0;\r\n            var dy = y1 - y0;\r\n            var nx = Math.abs(dx);\r\n            var ny = Math.abs(dy);\r\n            var signX = Math.sign(dx);\r\n            var signY = Math.sign(dy);\r\n            var point = {\r\n                x: x0,\r\n                y: y0,\r\n                direction: undefined,\r\n            };\r\n            var points = [__assign({}, point)];\r\n            for (var ix = 0, iy = 0; ix < nx || iy < ny;) {\r\n                if ((1 + 2 * ix) * ny < (1 + 2 * iy) * nx) {\r\n                    point.x += signX;\r\n                    point.direction = signX < 0 ? directions_1.Direction.LEFT : directions_1.Direction.RIGHT;\r\n                    ix++;\r\n                }\r\n                else {\r\n                    point.y += signY;\r\n                    point.direction = signY < 0 ? directions_1.Direction.DOWN : directions_1.Direction.UP;\r\n                    iy++;\r\n                }\r\n                points.push(__assign({}, point));\r\n            }\r\n            return points;\r\n        };\r\n        /**\r\n         * From screen space to grid space\r\n         * @param x X in screen space\r\n         * @param y Y in screen space\r\n         * @returns Coordinates in grid space\r\n         */\r\n        _this.screenToGrid = function (x, y, floored) {\r\n            if (floored === void 0) { floored = false; }\r\n            return floored\r\n                ? {\r\n                    x: Math.floor((-_this.x + x) / _this.size),\r\n                    y: Math.floor((-_this.y + y) / _this.size),\r\n                }\r\n                : {\r\n                    x: (-_this.x + x) / _this.size,\r\n                    y: (-_this.y + y) / _this.size,\r\n                };\r\n        };\r\n        /**\r\n         * From grid space to screen space (Top Left corner)\r\n         * @param x X in grid space\r\n         * @param y Y in grid space\r\n         * @returns Coordinates in screen space\r\n         */\r\n        _this.gridToScreen = function (x, y) { return ({\r\n            x: Math.floor(x) * _this.size + _this.x,\r\n            y: Math.floor(y) * _this.size + _this.y,\r\n        }); };\r\n        _this.startingSize = size;\r\n        _this.size = size;\r\n        _this.tiles = {};\r\n        _this.prevMousePos = [0, 0];\r\n        _this.mousePos = [0, 0];\r\n        _this.lineGraphics = new PIXI.Graphics();\r\n        _this.hlTile = new PIXI.Graphics();\r\n        _this.addChild(_this.lineGraphics);\r\n        _this.addChild(_this.hlTile);\r\n        _this.renderGrid();\r\n        utils_1.onResize(_this.update);\r\n        _this.interactive = true;\r\n        utils_1.onScroll(_this, _this.scroll);\r\n        _this.on(\"mousedown\", _this.mouseDown);\r\n        _this.on(\"mouseup\", _this.mouseUp);\r\n        _this.on(\"mousemove\", _this.mouseMove);\r\n        utils_1.onKeyDown(_this.keyDown);\r\n        return _this;\r\n    }\r\n    Grid.prototype.addTile = function (x, y, tile) {\r\n        if (this.tiles[x + \",\" + y])\r\n            return [false, this.tiles[x + \",\" + y]];\r\n        var tileObj = new tile(x, y);\r\n        this.tiles[x + \",\" + y] = tileObj;\r\n        var tileGraphics = tileObj.getContainer(this.size);\r\n        this.addChild(tileGraphics);\r\n        return [true, tileObj];\r\n    };\r\n    Grid.prototype.renderGrid = function () {\r\n        var width = utils_1.dimensions()[0];\r\n        var height = utils_1.dimensions()[1];\r\n        var tileXCount = Math.floor(width / this.size);\r\n        var tileYCount = Math.floor(height / this.size);\r\n        this.lineGraphics.clear();\r\n        for (var x = -Math.ceil(this.x / this.size); x <= tileXCount - Math.floor(this.x / this.size); x++) {\r\n            this.lineGraphics.beginFill(config_1.default.lineColor);\r\n            this.lineGraphics.lineStyle(0);\r\n            this.lineGraphics.drawRect(x * this.size, -this.y, config_1.default.lineWidth * 2, height);\r\n        }\r\n        for (var y = -Math.ceil(this.y / this.size); y <= tileYCount - Math.floor(this.y / this.size); y++) {\r\n            this.lineGraphics.beginFill(config_1.default.lineColor);\r\n            this.lineGraphics.lineStyle(0);\r\n            this.lineGraphics.drawRect(-this.x, y * this.size, width, config_1.default.lineWidth);\r\n        }\r\n        var gridPos = this.screenToGrid.apply(this, this.mousePos);\r\n        gridPos.x = Math.floor(gridPos.x) * this.size;\r\n        gridPos.y = Math.floor(gridPos.y) * this.size;\r\n        this.hlTile.clear();\r\n        this.hlTile.beginFill(config_1.default.highlightTileColor);\r\n        this.hlTile.lineStyle(0);\r\n        this.hlTile.drawRect(gridPos.x + config_1.default.lineWidth / 2, gridPos.y + config_1.default.lineWidth / 2, this.size, this.size);\r\n    };\r\n    Grid.prototype.renderTiles = function () {\r\n        for (var _i = 0, _a = Object.entries(this.tiles); _i < _a.length; _i++) {\r\n            var _b = _a[_i], _ = _b[0], tile = _b[1];\r\n            tile.update(this.size);\r\n        }\r\n    };\r\n    return Grid;\r\n}(PIXI.Container));\r\nexports.default = Grid;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ncmlkLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL2dyaWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgZGltZW5zaW9ucyxcclxuICAgIGxvY2F0aW9uVG9UdXBsZSxcclxuICAgIG1vdXNlRG93bixcclxuICAgIG9uS2V5RG93bixcclxuICAgIG9uUmVzaXplLFxyXG4gICAgb25TY3JvbGwsXHJcbiAgICBwcmVzc2VkS2V5cyxcclxufSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgY2xhbXAgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aFwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IFdpcmUgZnJvbSBcIi4vdGlsZXMvd2lyZV90aWxlXCI7XHJcbmltcG9ydCB7IFRpbGUgfSBmcm9tIFwiLi90aWxlcy90aWxlXCI7XHJcbmltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gXCIuLi91dGlscy9kaXJlY3Rpb25zXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xyXG4gICAgc3RhcnRpbmdTaXplOiBudW1iZXI7XHJcbiAgICBzaXplOiBudW1iZXI7XHJcbiAgICB0aWxlczogeyBba2V5OiBzdHJpbmddOiBUaWxlIH07XHJcblxyXG4gICAgbW91c2VQb3M6IFt4OiBudW1iZXIsIHk6IG51bWJlcl07XHJcbiAgICBwcmV2TW91c2VQb3M6IFt4OiBudW1iZXIsIHk6IG51bWJlcl07XHJcblxyXG4gICAgbGluZUdyYXBoaWNzOiBQSVhJLkdyYXBoaWNzO1xyXG4gICAgaGxUaWxlOiBQSVhJLkdyYXBoaWNzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydGluZ1NpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy50aWxlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMucHJldk1vdXNlUG9zID0gWzAsIDBdO1xyXG4gICAgICAgIHRoaXMubW91c2VQb3MgPSBbMCwgMF07XHJcblxyXG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICB0aGlzLmhsVGlsZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5saW5lR3JhcGhpY3MpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5obFRpbGUpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckdyaWQoKTtcclxuXHJcbiAgICAgICAgb25SZXNpemUodGhpcy51cGRhdGUpO1xyXG5cclxuICAgICAgICB0aGlzLmludGVyYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgb25TY3JvbGwodGhpcywgdGhpcy5zY3JvbGwpO1xyXG5cclxuICAgICAgICB0aGlzLm9uKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2VEb3duKTtcclxuICAgICAgICB0aGlzLm9uKFwibW91c2V1cFwiLCB0aGlzLm1vdXNlVXApO1xyXG4gICAgICAgIHRoaXMub24oXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZU1vdmUpO1xyXG5cclxuICAgICAgICBvbktleURvd24odGhpcy5rZXlEb3duKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUaWxlPFQgZXh0ZW5kcyBUaWxlPihcclxuICAgICAgICB4OiBudW1iZXIsXHJcbiAgICAgICAgeTogbnVtYmVyLFxyXG4gICAgICAgIHRpbGU6IHsgbmV3ICh4OiBudW1iZXIsIHk6IG51bWJlcik6IFQgfVxyXG4gICAgKTogW3BsYWNlZDogYm9vbGVhbiwgdGlsZTogVGlsZV0ge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbGVzW2Ake3h9LCR7eX1gXSkgcmV0dXJuIFtmYWxzZSwgdGhpcy50aWxlc1tgJHt4fSwke3l9YF1dO1xyXG4gICAgICAgIGxldCB0aWxlT2JqID0gbmV3IHRpbGUoeCwgeSk7XHJcbiAgICAgICAgdGhpcy50aWxlc1tgJHt4fSwke3l9YF0gPSB0aWxlT2JqO1xyXG4gICAgICAgIGNvbnN0IHRpbGVHcmFwaGljczogUElYSS5Db250YWluZXIgPSB0aWxlT2JqLmdldENvbnRhaW5lcih0aGlzLnNpemUpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGlsZUdyYXBoaWNzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFt0cnVlLCB0aWxlT2JqXTtcclxuICAgIH1cclxuXHJcbiAgICBzY3JvbGwgPSAoZTogV2hlZWxFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChlLmRlbHRhWSA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgbXVsdCA9IDEgLyAoY29uZmlnLnpvb21Db2VmZiAqIGUuZGVsdGFZKTtcclxuICAgICAgICBpZiAobXVsdCA8IDApIG11bHQgPSAtMSAvIG11bHQ7XHJcblxyXG4gICAgICAgIGxldCBwcmV2UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoZS5wYWdlWCwgZS5wYWdlWSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2l6ZSA9IE1hdGgucm91bmQobXVsdCAqIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgdGhpcy5zaXplID0gY2xhbXAodGhpcy5zaXplLCAyMCwgMzUwKTtcclxuXHJcbiAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKGUucGFnZVgsIGUucGFnZVkpO1xyXG5cclxuICAgICAgICB0aGlzLnggKz0gKG5ld1Bvcy54IC0gcHJldlBvcy54KSAqIHRoaXMuc2l6ZTtcclxuICAgICAgICB0aGlzLnkgKz0gKG5ld1Bvcy55IC0gcHJldlBvcy55KSAqIHRoaXMuc2l6ZTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgbW91c2VEb3duID0gKGU6IFBJWEkuaW50ZXJhY3Rpb24uSW50ZXJhY3Rpb25FdmVudCkgPT4ge307XHJcblxyXG4gICAgbW91c2VVcCA9IChlOiBQSVhJLmludGVyYWN0aW9uLkludGVyYWN0aW9uRXZlbnQpID0+IHt9O1xyXG5cclxuICAgIG1vdXNlTW92ZSA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgbGV0IGUgPSBldmVudC5kYXRhLm9yaWdpbmFsRXZlbnQgYXMgUG9pbnRlckV2ZW50O1xyXG4gICAgICAgIHRoaXMucHJldk1vdXNlUG9zID0gWy4uLnRoaXMubW91c2VQb3NdO1xyXG4gICAgICAgIHRoaXMubW91c2VQb3MgPSBbZS5wYWdlWCwgZS5wYWdlWV07XHJcbiAgICAgICAgaWYgKG1vdXNlRG93bi5sZWZ0KSB7XHJcbiAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5IHx8IHByZXNzZWRLZXlzW1wiU3BhY2VcIl0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueCArPSBlLm1vdmVtZW50WDtcclxuICAgICAgICAgICAgICAgIHRoaXMueSArPSBlLm1vdmVtZW50WTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdyaWRQb2ludHMgPSB0aGlzLmdyaWRQb2ludHNCZXR3ZWVuKFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLmxvY2F0aW9uVG9UdXBsZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JlZW5Ub0dyaWQoLi4udGhpcy5wcmV2TW91c2VQb3MsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICAuLi5sb2NhdGlvblRvVHVwbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NyZWVuVG9HcmlkKC4uLnRoaXMubW91c2VQb3MsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldlRpbGU6IFRpbGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRQb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncmlkUG9pbnQgPSBncmlkUG9pbnRzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBbcGxhY2VkLCBuZXdUaWxlXSA9IHRoaXMuYWRkVGlsZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubG9jYXRpb25Ub1R1cGxlKGdyaWRQb2ludCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFdpcmVcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRQb2ludC5kaXJlY3Rpb24gIT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RpbGUgaW5zdGFuY2VvZiBXaXJlXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2VGlsZSAmJiBwcmV2VGlsZSBpbnN0YW5jZW9mIFdpcmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJldlRpbGUuY29ubmVjdCBhcyBhbnkpW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcImRvd25cIiwgXCJyaWdodFwiLCBcInVwXCIsIFwibGVmdFwiXVtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFBvaW50LmRpcmVjdGlvbi52YWx1ZU9mKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKChuZXdUaWxlIGFzIFdpcmUpLmNvbm5lY3QgYXMgYW55KVtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcInVwXCIsIFwibGVmdFwiLCBcImRvd25cIiwgXCJyaWdodFwiXVtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkUG9pbnQuZGlyZWN0aW9uLnZhbHVlT2YoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZUaWxlPy51cGRhdGVDb250YWluZXI/LigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdUaWxlPy51cGRhdGVDb250YWluZXI/LigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXdUaWxlLnVwZGF0ZUNvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXdUaWxlLmdldENvbnRhaW5lcih0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldlRpbGUgPSBuZXdUaWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjbGljayA9IChldmVudDogUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBldmVudC5kYXRhLmJ1dHRvbiA9PSAwICYmXHJcbiAgICAgICAgICAgICFldmVudC5kYXRhLm9yaWdpbmFsRXZlbnQuc2hpZnRLZXkgJiZcclxuICAgICAgICAgICAgIXByZXNzZWRLZXlzW1wiU3BhY2VcIl1cclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZFBvaW50ID0gbG9jYXRpb25Ub1R1cGxlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JlZW5Ub0dyaWQoLi4udGhpcy5tb3VzZVBvcywgdHJ1ZSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkVGlsZSguLi5ncmlkUG9pbnQsIFdpcmUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGtleURvd24gPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChlLmN0cmxLZXkgJiYgIWUuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gXCJFcXVhbFwiKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG11bHQgPSAxIC8gKGNvbmZpZy56b29tQ29lZmYgKiAtMTAwKTtcclxuICAgICAgICAgICAgICAgIGlmIChtdWx0IDwgMCkgbXVsdCA9IC0xIC8gbXVsdDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldlBvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0IC8gMlxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSBNYXRoLnJvdW5kKG11bHQgKiB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gY2xhbXAodGhpcy5zaXplLCAyMCwgMzUwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IChuZXdQb3MueCAtIHByZXZQb3MueCkgKiB0aGlzLnNpemU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKG5ld1Bvcy55IC0gcHJldlBvcy55KSAqIHRoaXMuc2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSBcIk1pbnVzXCIpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbXVsdCA9IDEgLyAoY29uZmlnLnpvb21Db2VmZiAqIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobXVsdCA8IDApIG11bHQgPSAtMSAvIG11bHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHByZXZQb3MgPSB0aGlzLnNjcmVlblRvR3JpZChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpZHRoIC8gMixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCAvIDJcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gTWF0aC5yb3VuZChtdWx0ICogdGhpcy5zaXplKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IGNsYW1wKHRoaXMuc2l6ZSwgMjAsIDM1MCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMuc2NyZWVuVG9HcmlkKHRoaXMud2lkdGggLyAyLCB0aGlzLmhlaWdodCAvIDIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMueCArPSAobmV3UG9zLnggLSBwcmV2UG9zLngpICogdGhpcy5zaXplO1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IChuZXdQb3MueSAtIHByZXZQb3MueSkgKiB0aGlzLnNpemU7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gXCJEaWdpdDBcIikge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcmV2UG9zID0gdGhpcy5zY3JlZW5Ub0dyaWQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgLyAyXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuc3RhcnRpbmdTaXplO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuZXdQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gKG5ld1Bvcy54IC0gcHJldlBvcy54KSAqIHRoaXMuc2l6ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMueSArPSAobmV3UG9zLnkgLSBwcmV2UG9zLnkpICogdGhpcy5zaXplO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZS5jdHJsS2V5ICYmICFlLnNoaWZ0S2V5ICYmIGUuY29kZSA9PT0gXCJLZXlIXCIpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyR3JpZCgpIHtcclxuICAgICAgICBsZXQgd2lkdGggPSBkaW1lbnNpb25zKClbMF07XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IGRpbWVuc2lvbnMoKVsxXTtcclxuICAgICAgICBjb25zdCB0aWxlWENvdW50ID0gTWF0aC5mbG9vcih3aWR0aCAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgY29uc3QgdGlsZVlDb3VudCA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gdGhpcy5zaXplKTtcclxuXHJcbiAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgbGV0IHggPSAtTWF0aC5jZWlsKHRoaXMueCAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgIHggPD0gdGlsZVhDb3VudCAtIE1hdGguZmxvb3IodGhpcy54IC8gdGhpcy5zaXplKTtcclxuICAgICAgICAgICAgeCsrXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmJlZ2luRmlsbChjb25maWcubGluZUNvbG9yKTtcclxuICAgICAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MubGluZVN0eWxlKDApO1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5kcmF3UmVjdChcclxuICAgICAgICAgICAgICAgIHggKiB0aGlzLnNpemUsXHJcbiAgICAgICAgICAgICAgICAtdGhpcy55LFxyXG4gICAgICAgICAgICAgICAgY29uZmlnLmxpbmVXaWR0aCAqIDIsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoXHJcbiAgICAgICAgICAgIGxldCB5ID0gLU1hdGguY2VpbCh0aGlzLnkgLyB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICB5IDw9IHRpbGVZQ291bnQgLSBNYXRoLmZsb29yKHRoaXMueSAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgIHkrK1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5iZWdpbkZpbGwoY29uZmlnLmxpbmVDb2xvcik7XHJcbiAgICAgICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVTdHlsZSgwKTtcclxuICAgICAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MuZHJhd1JlY3QoXHJcbiAgICAgICAgICAgICAgICAtdGhpcy54LFxyXG4gICAgICAgICAgICAgICAgeSAqIHRoaXMuc2l6ZSxcclxuICAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgY29uZmlnLmxpbmVXaWR0aFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGdyaWRQb3MgPSB0aGlzLnNjcmVlblRvR3JpZCguLi50aGlzLm1vdXNlUG9zKTtcclxuICAgICAgICBncmlkUG9zLnggPSBNYXRoLmZsb29yKGdyaWRQb3MueCkgKiB0aGlzLnNpemU7XHJcbiAgICAgICAgZ3JpZFBvcy55ID0gTWF0aC5mbG9vcihncmlkUG9zLnkpICogdGhpcy5zaXplO1xyXG5cclxuICAgICAgICB0aGlzLmhsVGlsZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuaGxUaWxlLmJlZ2luRmlsbChjb25maWcuaGlnaGxpZ2h0VGlsZUNvbG9yKTtcclxuICAgICAgICB0aGlzLmhsVGlsZS5saW5lU3R5bGUoMCk7XHJcbiAgICAgICAgdGhpcy5obFRpbGUuZHJhd1JlY3QoXHJcbiAgICAgICAgICAgIGdyaWRQb3MueCArIGNvbmZpZy5saW5lV2lkdGggLyAyLFxyXG4gICAgICAgICAgICBncmlkUG9zLnkgKyBjb25maWcubGluZVdpZHRoIC8gMixcclxuICAgICAgICAgICAgdGhpcy5zaXplLFxyXG4gICAgICAgICAgICB0aGlzLnNpemVcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclRpbGVzKCkge1xyXG4gICAgICAgIGZvciAobGV0IFtfLCB0aWxlXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLnRpbGVzKSlcclxuICAgICAgICAgICAgdGlsZS51cGRhdGUodGhpcy5zaXplKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJHcmlkKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJUaWxlcygpO1xyXG4gICAgfTtcclxuXHJcbiAgICBncmlkUG9pbnRzQmV0d2VlbiA9ICh4MDogbnVtYmVyLCB5MDogbnVtYmVyLCB4MTogbnVtYmVyLCB5MTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZHggPSB4MSAtIHgwO1xyXG4gICAgICAgIGNvbnN0IGR5ID0geTEgLSB5MDtcclxuICAgICAgICBjb25zdCBueCA9IE1hdGguYWJzKGR4KTtcclxuICAgICAgICBjb25zdCBueSA9IE1hdGguYWJzKGR5KTtcclxuICAgICAgICBjb25zdCBzaWduWCA9IE1hdGguc2lnbihkeCk7XHJcbiAgICAgICAgY29uc3Qgc2lnblkgPSBNYXRoLnNpZ24oZHkpO1xyXG5cclxuICAgICAgICBjb25zdCBwb2ludDogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgZGlyZWN0aW9uPzogRGlyZWN0aW9uIH0gPSB7XHJcbiAgICAgICAgICAgIHg6IHgwLFxyXG4gICAgICAgICAgICB5OiB5MCxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiB1bmRlZmluZWQsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBwb2ludHMgPSBbeyAuLi5wb2ludCB9XTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaXggPSAwLCBpeSA9IDA7IGl4IDwgbnggfHwgaXkgPCBueTsgKSB7XHJcbiAgICAgICAgICAgIGlmICgoMSArIDIgKiBpeCkgKiBueSA8ICgxICsgMiAqIGl5KSAqIG54KSB7XHJcbiAgICAgICAgICAgICAgICBwb2ludC54ICs9IHNpZ25YO1xyXG4gICAgICAgICAgICAgICAgcG9pbnQuZGlyZWN0aW9uID0gc2lnblggPCAwID8gRGlyZWN0aW9uLkxFRlQgOiBEaXJlY3Rpb24uUklHSFQ7XHJcbiAgICAgICAgICAgICAgICBpeCsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcG9pbnQueSArPSBzaWduWTtcclxuICAgICAgICAgICAgICAgIHBvaW50LmRpcmVjdGlvbiA9IHNpZ25ZIDwgMCA/IERpcmVjdGlvbi5ET1dOIDogRGlyZWN0aW9uLlVQO1xyXG4gICAgICAgICAgICAgICAgaXkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwb2ludHMucHVzaCh7IC4uLnBvaW50IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGcm9tIHNjcmVlbiBzcGFjZSB0byBncmlkIHNwYWNlXHJcbiAgICAgKiBAcGFyYW0geCBYIGluIHNjcmVlbiBzcGFjZVxyXG4gICAgICogQHBhcmFtIHkgWSBpbiBzY3JlZW4gc3BhY2VcclxuICAgICAqIEByZXR1cm5zIENvb3JkaW5hdGVzIGluIGdyaWQgc3BhY2VcclxuICAgICAqL1xyXG4gICAgc2NyZWVuVG9HcmlkID0gKHg6IG51bWJlciwgeTogbnVtYmVyLCBmbG9vcmVkID0gZmFsc2UpID0+XHJcbiAgICAgICAgZmxvb3JlZFxyXG4gICAgICAgICAgICA/IHtcclxuICAgICAgICAgICAgICAgICAgeDogTWF0aC5mbG9vcigoLXRoaXMueCArIHgpIC8gdGhpcy5zaXplKSxcclxuICAgICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcigoLXRoaXMueSArIHkpIC8gdGhpcy5zaXplKSxcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDoge1xyXG4gICAgICAgICAgICAgICAgICB4OiAoLXRoaXMueCArIHgpIC8gdGhpcy5zaXplLFxyXG4gICAgICAgICAgICAgICAgICB5OiAoLXRoaXMueSArIHkpIC8gdGhpcy5zaXplLFxyXG4gICAgICAgICAgICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGcm9tIGdyaWQgc3BhY2UgdG8gc2NyZWVuIHNwYWNlIChUb3AgTGVmdCBjb3JuZXIpXHJcbiAgICAgKiBAcGFyYW0geCBYIGluIGdyaWQgc3BhY2VcclxuICAgICAqIEBwYXJhbSB5IFkgaW4gZ3JpZCBzcGFjZVxyXG4gICAgICogQHJldHVybnMgQ29vcmRpbmF0ZXMgaW4gc2NyZWVuIHNwYWNlXHJcbiAgICAgKi9cclxuICAgIGdyaWRUb1NjcmVlbiA9ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gKHtcclxuICAgICAgICB4OiBNYXRoLmZsb29yKHgpICogdGhpcy5zaXplICsgdGhpcy54LFxyXG4gICAgICAgIHk6IE1hdGguZmxvb3IoeSkgKiB0aGlzLnNpemUgKyB0aGlzLnksXHJcbiAgICB9KTtcclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQUE7QUFXQTtBQUFBO0FBMkNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFFQTtBQUtBO0FBRUE7QUFFQTtBQUNBO0FBS0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUtBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBS0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFLQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBNERBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUExVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUVBO0FBS0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQTJLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUtBO0FBQ0E7QUFDQTtBQU1BO0FBRUE7QUFLQTtBQUNBO0FBQ0E7QUFNQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFpRUE7QUFBQTs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/grid.ts\n");

/***/ })

})
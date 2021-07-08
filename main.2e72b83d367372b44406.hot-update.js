webpackHotUpdate("main",{

/***/ "./src/components/gui/gui_window.ts":
/*!******************************************!*\
  !*** ./src/components/gui/gui_window.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar button_1 = __webpack_require__(/*! ./button */ \"./src/components/gui/button.ts\");\r\nvar gui_component_1 = __webpack_require__(/*! ./gui_component */ \"./src/components/gui/gui_component.ts\");\r\nvar GUIWindow = /** @class */ (function (_super) {\r\n    __extends(GUIWindow, _super);\r\n    function GUIWindow(x, y, width, height, backgroundColor) {\r\n        if (backgroundColor === void 0) { backgroundColor = 0xffffff; }\r\n        var _this = _super.call(this) || this;\r\n        _this.x = x;\r\n        _this.y = y;\r\n        _this.cWidth = width;\r\n        _this.cHeight = height;\r\n        _this.components = [];\r\n        _this.backgroundColor = backgroundColor;\r\n        _this.interactive = true;\r\n        _this.backgroundRect = PIXI.Sprite.from(PIXI.Texture.WHITE);\r\n        _this.backgroundRect.width = width;\r\n        _this.backgroundRect.height = height;\r\n        _this.backgroundRect.tint = backgroundColor;\r\n        _this.backgroundRect.interactive = true;\r\n        _this.addChild(_this.backgroundRect);\r\n        _this.on(\"click\", function (e) {\r\n            e.stopPropagation();\r\n        });\r\n        _this.on(\"mousemove\", function (e) {\r\n            var point = e.data.global;\r\n            if (point.x >= _this.x &&\r\n                point.x < _this.x + _this.cWidth &&\r\n                point.y >= _this.y &&\r\n                point.y < _this.y + _this.cHeight) {\r\n                e.stopPropagation();\r\n            }\r\n        });\r\n        var btn = new button_1.default(10, 10, 20, 20);\r\n        btn.onClick = function (e) {\r\n            console.log(\"test\");\r\n        };\r\n        _this.addChild(btn);\r\n        _this.draw();\r\n        return _this;\r\n    }\r\n    GUIWindow.prototype.addChild = function () {\r\n        var child = [];\r\n        for (var _i = 0; _i < arguments.length; _i++) {\r\n            child[_i] = arguments[_i];\r\n        }\r\n        for (var c in child) {\r\n            if (c.__proto__ instanceof gui_component_1.default)\r\n                this.components.push(c);\r\n        }\r\n        return _super.prototype.addChild.apply(this, child);\r\n    };\r\n    GUIWindow.prototype.addChildAt = function (child, index) {\r\n        if (child.__proto__ instanceof gui_component_1.default) {\r\n            this.components.push(child);\r\n        }\r\n        return _super.prototype.addChildAt.call(this, child, index);\r\n    };\r\n    GUIWindow.prototype.removeChild = function () {\r\n        var child = [];\r\n        for (var _i = 0; _i < arguments.length; _i++) {\r\n            child[_i] = arguments[_i];\r\n        }\r\n        for (var c in child) {\r\n            if (c.__proto__ instanceof gui_component_1.default) {\r\n                var index = this.components.indexOf(c);\r\n                if (index > -1)\r\n                    this.components.splice(index, 1);\r\n            }\r\n        }\r\n        return _super.prototype.removeChild.apply(this, child);\r\n    };\r\n    GUIWindow.prototype.removeChildAt = function (index) {\r\n        var child = _super.prototype.removeChildAt.call(this, index);\r\n        if (child.__proto__ instanceof gui_component_1.default) {\r\n            var index_1 = this.components.indexOf(child);\r\n            if (index_1 > -1)\r\n                this.components.splice(index_1, 1);\r\n        }\r\n        return child;\r\n    };\r\n    GUIWindow.prototype.removeChildren = function (beginIndex, endIndex) {\r\n        var children = _super.prototype.removeChildren.call(this, beginIndex, endIndex);\r\n        for (var child in children) {\r\n            if (child.__proto__ instanceof gui_component_1.default) {\r\n                var index = this.components.indexOf(child);\r\n                if (index > -1)\r\n                    this.components.splice(index, 1);\r\n            }\r\n        }\r\n        return children;\r\n    };\r\n    GUIWindow.prototype.draw = function () {\r\n        console.log(this.components);\r\n        this.components.forEach(function (comp) { return comp.drawComponent(); });\r\n    };\r\n    return GUIWindow;\r\n}(PIXI.Container));\r\nexports.default = GUIWindow;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ndWkvZ3VpX3dpbmRvdy50cy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi9zcmMvY29tcG9uZW50cy9ndWkvZ3VpX3dpbmRvdy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XG5pbXBvcnQgQnV0dG9uIGZyb20gXCIuL2J1dHRvblwiO1xuaW1wb3J0IEdVSUNvbXBvbmVudCBmcm9tIFwiLi9ndWlfY29tcG9uZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdVSVdpbmRvdyBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcbiAgICBjb21wb25lbnRzOiBHVUlDb21wb25lbnRbXTtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IG51bWJlcjtcbiAgICBjV2lkdGg6IG51bWJlcjtcbiAgICBjSGVpZ2h0OiBudW1iZXI7XG4gICAgYmFja2dyb3VuZFJlY3Q6IFBJWEkuU3ByaXRlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHg6IG51bWJlcixcbiAgICAgICAgeTogbnVtYmVyLFxuICAgICAgICB3aWR0aDogbnVtYmVyLFxuICAgICAgICBoZWlnaHQ6IG51bWJlcixcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBudW1iZXIgPSAweGZmZmZmZlxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuY1dpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuY0hlaWdodCA9IGhlaWdodDtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICAgICAgdGhpcy5pbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVjdCA9IFBJWEkuU3ByaXRlLmZyb20oUElYSS5UZXh0dXJlLldISVRFKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVjdC53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRSZWN0LmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVjdC50aW50ID0gYmFja2dyb3VuZENvbG9yO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRSZWN0LmludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmFja2dyb3VuZFJlY3QpO1xuXG4gICAgICAgIHRoaXMub24oXCJjbGlja1wiLCAoZTogUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50KSA9PiB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9uKFwibW91c2Vtb3ZlXCIsIChlOiBQSVhJLmludGVyYWN0aW9uLkludGVyYWN0aW9uRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGxldCBwb2ludCA9IGUuZGF0YS5nbG9iYWw7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgcG9pbnQueCA+PSB0aGlzLnggJiZcbiAgICAgICAgICAgICAgICBwb2ludC54IDwgdGhpcy54ICsgdGhpcy5jV2lkdGggJiZcbiAgICAgICAgICAgICAgICBwb2ludC55ID49IHRoaXMueSAmJlxuICAgICAgICAgICAgICAgIHBvaW50LnkgPCB0aGlzLnkgKyB0aGlzLmNIZWlnaHRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBidG4gPSBuZXcgQnV0dG9uKDEwLCAxMCwgMjAsIDIwKTtcbiAgICAgICAgYnRuLm9uQ2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0ZXN0XCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoYnRuKTtcblxuICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICB9XG5cbiAgICBhZGRDaGlsZDxUQ2hpbGRyZW4gZXh0ZW5kcyBQSVhJLkRpc3BsYXlPYmplY3RbXT4oXG4gICAgICAgIC4uLmNoaWxkOiBUQ2hpbGRyZW5cbiAgICApOiBUQ2hpbGRyZW5bMF0ge1xuICAgICAgICBmb3IgKGxldCBjIGluIGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAoKGMgYXMgYW55KS5fX3Byb3RvX18gaW5zdGFuY2VvZiBHVUlDb21wb25lbnQpXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2goYyBhcyBhbnkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5hZGRDaGlsZCguLi5jaGlsZCk7XG4gICAgfVxuXG4gICAgYWRkQ2hpbGRBdDxUIGV4dGVuZHMgUElYSS5EaXNwbGF5T2JqZWN0PihjaGlsZDogVCwgaW5kZXg6IG51bWJlcik6IFQge1xuICAgICAgICBpZiAoKGNoaWxkIGFzIGFueSkuX19wcm90b19fIGluc3RhbmNlb2YgR1VJQ29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChjaGlsZCBhcyBhbnkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5hZGRDaGlsZEF0KGNoaWxkLCBpbmRleCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2hpbGQ8VENoaWxkcmVuIGV4dGVuZHMgUElYSS5EaXNwbGF5T2JqZWN0W10+KFxuICAgICAgICAuLi5jaGlsZDogVENoaWxkcmVuXG4gICAgKTogVENoaWxkcmVuWzBdIHtcbiAgICAgICAgZm9yIChsZXQgYyBpbiBjaGlsZCkge1xuICAgICAgICAgICAgaWYgKChjIGFzIGFueSkuX19wcm90b19fIGluc3RhbmNlb2YgR1VJQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNvbXBvbmVudHMuaW5kZXhPZihjIGFzIGFueSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuY29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5yZW1vdmVDaGlsZCguLi5jaGlsZCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2hpbGRBdChpbmRleDogbnVtYmVyKTogUElYSS5EaXNwbGF5T2JqZWN0IHtcbiAgICAgICAgbGV0IGNoaWxkID0gc3VwZXIucmVtb3ZlQ2hpbGRBdChpbmRleCk7XG4gICAgICAgIGlmICgoY2hpbGQgYXMgYW55KS5fX3Byb3RvX18gaW5zdGFuY2VvZiBHVUlDb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jb21wb25lbnRzLmluZGV4T2YoY2hpbGQgYXMgYW55KTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB0aGlzLmNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2hpbGRyZW4oXG4gICAgICAgIGJlZ2luSW5kZXg/OiBudW1iZXIsXG4gICAgICAgIGVuZEluZGV4PzogbnVtYmVyXG4gICAgKTogUElYSS5EaXNwbGF5T2JqZWN0W10ge1xuICAgICAgICBsZXQgY2hpbGRyZW4gPSBzdXBlci5yZW1vdmVDaGlsZHJlbihiZWdpbkluZGV4LCBlbmRJbmRleCk7XG4gICAgICAgIGZvciAobGV0IGNoaWxkIGluIGNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoKGNoaWxkIGFzIGFueSkuX19wcm90b19fIGluc3RhbmNlb2YgR1VJQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNvbXBvbmVudHMuaW5kZXhPZihjaGlsZCBhcyBhbnkpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB0aGlzLmNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hpbGRyZW47XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb21wb25lbnRzKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goKGNvbXApID0+IGNvbXAuZHJhd0NvbXBvbmVudCgpKTtcbiAgICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQU9BO0FBS0E7QUFMQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBOztBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/gui/gui_window.ts\n");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar grid_1 = __webpack_require__(/*! ./components/grid */ \"./src/components/grid.ts\");\r\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils/index.ts\");\r\nvar config_1 = __webpack_require__(/*! ./config */ \"./src/config.ts\");\r\nvar gui_window_1 = __webpack_require__(/*! ./components/gui/gui_window */ \"./src/components/gui/gui_window.ts\");\r\nPIXI.utils.skipHello();\r\nvar load = function (app) {\r\n    return new Promise(function (resolve) {\r\n        return app.loader\r\n            .add(\"doge\", \"assets/sprites/doge-icon.svg\")\r\n            .load(function () { return resolve(); });\r\n    });\r\n};\r\nvar main = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    function update(delta) {\r\n        guiTest.draw();\r\n        sprite.x = grid.gridToScreen(0.5, 0.5).x;\r\n        sprite.y = grid.gridToScreen(0.5, 0.5).y;\r\n    }\r\n    var app, grid, sprite, guiTest;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                app = new PIXI.Application();\r\n                document.body.style.margin = \"0\";\r\n                app.renderer.view.style.position = \"absolute\";\r\n                app.renderer.view.style.display = \"block\";\r\n                app.renderer.resize(window.innerWidth, window.innerHeight);\r\n                document.body.appendChild(app.view);\r\n                return [4 /*yield*/, load(app)];\r\n            case 1:\r\n                _a.sent();\r\n                app.renderer.backgroundColor = config_1.default.backgroundColor;\r\n                grid = new grid_1.default(100);\r\n                app.stage.addChild(grid);\r\n                sprite = new PIXI.Sprite(app.loader.resources.doge.texture);\r\n                sprite.width = 20;\r\n                sprite.height = 20;\r\n                sprite.x = utils_1.width() / 2 - sprite.width / 2;\r\n                sprite.y = utils_1.height() / 2 - sprite.height / 2;\r\n                app.stage.addChild(sprite);\r\n                guiTest = new gui_window_1.default(20, 20, 100, 500, 0xff0000);\r\n                guiTest.draw();\r\n                app.stage.addChild(guiTest);\r\n                utils_1.onResize(function () {\r\n                    var _a;\r\n                    (_a = app.renderer).resize.apply(_a, utils_1.dimensions());\r\n                });\r\n                window.addEventListener(\"contextmenu\", function (e) { return e.preventDefault(); });\r\n                window.addEventListener(\"wheel\", function (e) {\r\n                    var hitObject = app.renderer.plugins.interaction.hitTest(new PIXI.Point(e.pageX, e.pageY), app.stage);\r\n                    if (hitObject != null) {\r\n                        utils_1.scrollListeners.forEach(function (eventObj) {\r\n                            if (eventObj.object == hitObject)\r\n                                eventObj.listener(e);\r\n                        });\r\n                    }\r\n                });\r\n                app.ticker.add(update);\r\n                return [2 /*return*/];\r\n        }\r\n    });\r\n}); };\r\nmain();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCBHcmlkIGZyb20gXCIuL2NvbXBvbmVudHMvZ3JpZFwiO1xuaW1wb3J0IHtcbiAgICBkaW1lbnNpb25zLFxuICAgIGhlaWdodCxcbiAgICBvblJlc2l6ZSxcbiAgICB3aWR0aCxcbiAgICBzY3JvbGxMaXN0ZW5lcnMsXG4gICAgRGlzcGxheU9iamVjdFNjcm9sbEV2ZW50LFxufSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCBHVUlXaW5kb3cgZnJvbSBcIi4vY29tcG9uZW50cy9ndWkvZ3VpX3dpbmRvd1wiO1xuXG5QSVhJLnV0aWxzLnNraXBIZWxsbygpO1xuXG5jb25zdCBsb2FkID0gKGFwcDogUElYSS5BcHBsaWNhdGlvbikgPT5cbiAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT5cbiAgICAgICAgYXBwLmxvYWRlclxuICAgICAgICAgICAgLmFkZChcImRvZ2VcIiwgXCJhc3NldHMvc3ByaXRlcy9kb2dlLWljb24uc3ZnXCIpXG4gICAgICAgICAgICAubG9hZCgoKSA9PiByZXNvbHZlKCkpXG4gICAgKTtcblxuY29uc3QgbWFpbiA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgYXBwID0gbmV3IFBJWEkuQXBwbGljYXRpb24oKTtcblxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUubWFyZ2luID0gXCIwXCI7XG4gICAgYXBwLnJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgYXBwLnJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBhcHAucmVuZGVyZXIucmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwLnZpZXcpO1xuXG4gICAgYXdhaXQgbG9hZChhcHApO1xuXG4gICAgYXBwLnJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGNvbmZpZy5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICBsZXQgZ3JpZCA9IG5ldyBHcmlkKDEwMCk7XG5cbiAgICBhcHAuc3RhZ2UuYWRkQ2hpbGQoZ3JpZCk7XG5cbiAgICBsZXQgc3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKGFwcC5sb2FkZXIucmVzb3VyY2VzLmRvZ2UudGV4dHVyZSk7XG4gICAgc3ByaXRlLndpZHRoID0gMjA7XG4gICAgc3ByaXRlLmhlaWdodCA9IDIwO1xuICAgIHNwcml0ZS54ID0gd2lkdGgoKSAvIDIgLSBzcHJpdGUud2lkdGggLyAyO1xuICAgIHNwcml0ZS55ID0gaGVpZ2h0KCkgLyAyIC0gc3ByaXRlLmhlaWdodCAvIDI7XG4gICAgYXBwLnN0YWdlLmFkZENoaWxkKHNwcml0ZSk7XG5cbiAgICBsZXQgZ3VpVGVzdCA9IG5ldyBHVUlXaW5kb3coMjAsIDIwLCAxMDAsIDUwMCwgMHhmZjAwMDApO1xuICAgIGd1aVRlc3QuZHJhdygpO1xuXG4gICAgYXBwLnN0YWdlLmFkZENoaWxkKGd1aVRlc3QpO1xuXG4gICAgb25SZXNpemUoKCkgPT4ge1xuICAgICAgICBhcHAucmVuZGVyZXIucmVzaXplKC4uLmRpbWVuc2lvbnMoKSk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCAoZTogV2hlZWxFdmVudCkgPT4ge1xuICAgICAgICBsZXQgaGl0T2JqZWN0ID0gYXBwLnJlbmRlcmVyLnBsdWdpbnMuaW50ZXJhY3Rpb24uaGl0VGVzdChcbiAgICAgICAgICAgIG5ldyBQSVhJLlBvaW50KGUucGFnZVgsIGUucGFnZVkpLFxuICAgICAgICAgICAgYXBwLnN0YWdlXG4gICAgICAgICk7XG4gICAgICAgIGlmIChoaXRPYmplY3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgc2Nyb2xsTGlzdGVuZXJzLmZvckVhY2goKGV2ZW50T2JqOiBEaXNwbGF5T2JqZWN0U2Nyb2xsRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRPYmoub2JqZWN0ID09IGhpdE9iamVjdCkgZXZlbnRPYmoubGlzdGVuZXIoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlKGRlbHRhOiBudW1iZXIpIHtcbiAgICAgICAgZ3VpVGVzdC5kcmF3KCk7XG4gICAgICAgIHNwcml0ZS54ID0gZ3JpZC5ncmlkVG9TY3JlZW4oMC41LCAwLjUpLng7XG4gICAgICAgIHNwcml0ZS55ID0gZ3JpZC5ncmlkVG9TY3JlZW4oMC41LCAwLjUpLnk7XG4gICAgfVxuICAgIGFwcC50aWNrZXIuYWRkKHVwZGF0ZSk7XG59O1xuXG5tYWluKCk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBUUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFNQTtBQStDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQWxEQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFBQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBOztBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQU9BOzs7O0FBQ0E7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.ts\n");

/***/ })

})
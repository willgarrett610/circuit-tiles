webpackHotUpdate("main",{

/***/ "./src/components/gui/button.ts":
/*!**************************************!*\
  !*** ./src/components/gui/button.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar gui_component_1 = __webpack_require__(/*! ./gui_component */ \"./src/components/gui/gui_component.ts\");\r\nvar Button = /** @class */ (function (_super) {\r\n    __extends(Button, _super);\r\n    function Button() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    Button.prototype.draw = function () {\r\n        console.log(\"hover:\", this.hovered);\r\n        console.log(\"active:\", this.active);\r\n    };\r\n    return Button;\r\n}(gui_component_1.default));\r\nexports.default = Button;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ndWkvYnV0dG9uLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL2d1aS9idXR0b24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdVSUNvbXBvbmVudCBmcm9tIFwiLi9ndWlfY29tcG9uZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIEdVSUNvbXBvbmVudCB7XG4gICAgZHJhdygpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJob3ZlcjpcIiwgdGhpcy5ob3ZlcmVkKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJhY3RpdmU6XCIsIHRoaXMuYWN0aXZlKTtcbiAgICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUFBO0FBQUE7O0FBS0E7QUFKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/gui/button.ts\n");

/***/ }),

/***/ "./src/components/gui/gui_component.ts":
/*!*********************************************!*\
  !*** ./src/components/gui/gui_component.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar GUIComponent = /** @class */ (function (_super) {\r\n    __extends(GUIComponent, _super);\r\n    function GUIComponent(x, y, width, height, backgroundColor) {\r\n        if (backgroundColor === void 0) { backgroundColor = 0xffffff; }\r\n        var _this = _super.call(this) || this;\r\n        _this.hovered = false;\r\n        _this.active = false;\r\n        _this.x = x;\r\n        _this.y = y;\r\n        _this.cWidth = width;\r\n        _this.cHeight = height;\r\n        _this.backgroundColor = backgroundColor;\r\n        _this.interactive = true;\r\n        _this.backgroundSprite = PIXI.Sprite.from(PIXI.Texture.WHITE);\r\n        _this.backgroundSprite.width = width;\r\n        _this.backgroundSprite.height = height;\r\n        _this.backgroundSprite.tint = backgroundColor;\r\n        _this.backgroundSprite.interactive = true;\r\n        _this.addChild(_this.backgroundSprite);\r\n        _this.graphics = new PIXI.Graphics();\r\n        _this.on(\"click\", function (e) {\r\n            var _a;\r\n            e.stopPropagation();\r\n            (_a = _this.onClick) === null || _a === void 0 ? void 0 : _a.call(_this, e);\r\n        });\r\n        _this.on(\"rightclick\", function (e) {\r\n            var _a;\r\n            e.stopPropagation();\r\n            (_a = _this.onRightClick) === null || _a === void 0 ? void 0 : _a.call(_this, e);\r\n        });\r\n        _this.on(\"mouseover\", function () {\r\n            var _a;\r\n            (_a = _this.onHover) === null || _a === void 0 ? void 0 : _a.call(_this);\r\n            _this.hovered = true;\r\n        });\r\n        _this.on(\"mouseout\", function () {\r\n            var _a;\r\n            (_a = _this.onEndHover) === null || _a === void 0 ? void 0 : _a.call(_this);\r\n            _this.hovered = false;\r\n        });\r\n        _this.on(\"mousedown\", function () { return (_this.active = true); });\r\n        _this.on(\"mouseup\", function () { return (_this.active = false); });\r\n        _this.on(\"mouseupoutside\", function () { return (_this.active = false); });\r\n        return _this;\r\n    }\r\n    GUIComponent.prototype.setBackgroundSprite = function (backgroundSprite) {\r\n        this.removeChild(this.backgroundSprite);\r\n        this.backgroundSprite = backgroundSprite;\r\n        this.addChild(this.backgroundSprite);\r\n    };\r\n    GUIComponent.prototype.drawComponent = function (delta) {\r\n        this.draw();\r\n    };\r\n    return GUIComponent;\r\n}(PIXI.Container));\r\nexports.default = GUIComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ndWkvZ3VpX2NvbXBvbmVudC50cy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi9zcmMvY29tcG9uZW50cy9ndWkvZ3VpX2NvbXBvbmVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XG5hYnN0cmFjdCBjbGFzcyBHVUlDb21wb25lbnQgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBudW1iZXI7XG4gICAgZ3JhcGhpY3M6IFBJWEkuR3JhcGhpY3M7XG4gICAgY1dpZHRoOiBudW1iZXI7XG4gICAgY0hlaWdodDogbnVtYmVyO1xuICAgIGJhY2tncm91bmRTcHJpdGU6IFBJWEkuU3ByaXRlO1xuICAgIG9uSG92ZXI/KCk6IHZvaWQ7XG4gICAgb25FbmRIb3Zlcj8oKTogdm9pZDtcbiAgICBvbkNsaWNrPyhlOiBQSVhJLmludGVyYWN0aW9uLkludGVyYWN0aW9uRXZlbnQpOiB2b2lkO1xuICAgIG9uUmlnaHRDbGljaz8oZTogUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50KTogdm9pZDtcbiAgICBob3ZlcmVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgeDogbnVtYmVyLFxuICAgICAgICB5OiBudW1iZXIsXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG51bWJlciA9IDB4ZmZmZmZmXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5jV2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5jSGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yO1xuXG4gICAgICAgIHRoaXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFNwcml0ZSA9IFBJWEkuU3ByaXRlLmZyb20oUElYSS5UZXh0dXJlLldISVRFKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kU3ByaXRlLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFNwcml0ZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFNwcml0ZS50aW50ID0gYmFja2dyb3VuZENvbG9yO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRTcHJpdGUuaW50ZXJhY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iYWNrZ3JvdW5kU3ByaXRlKTtcblxuICAgICAgICB0aGlzLmdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcblxuICAgICAgICB0aGlzLm9uKFwiY2xpY2tcIiwgKGU6IFBJWEkuaW50ZXJhY3Rpb24uSW50ZXJhY3Rpb25FdmVudCkgPT4ge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMub25DbGljaz8uKGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9uKFwicmlnaHRjbGlja1wiLCAoZTogUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50KSA9PiB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5vblJpZ2h0Q2xpY2s/LihlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vbihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uSG92ZXI/LigpO1xuICAgICAgICAgICAgdGhpcy5ob3ZlcmVkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub24oXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRW5kSG92ZXI/LigpO1xuICAgICAgICAgICAgdGhpcy5ob3ZlcmVkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub24oXCJtb3VzZWRvd25cIiwgKCkgPT4gKHRoaXMuYWN0aXZlID0gdHJ1ZSkpO1xuICAgICAgICB0aGlzLm9uKFwibW91c2V1cFwiLCAoKSA9PiAodGhpcy5hY3RpdmUgPSBmYWxzZSkpO1xuICAgICAgICB0aGlzLm9uKFwibW91c2V1cG91dHNpZGVcIiwgKCkgPT4gKHRoaXMuYWN0aXZlID0gZmFsc2UpKTtcbiAgICB9XG5cbiAgICBzZXRCYWNrZ3JvdW5kU3ByaXRlKGJhY2tncm91bmRTcHJpdGU6IFBJWEkuU3ByaXRlKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5iYWNrZ3JvdW5kU3ByaXRlKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kU3ByaXRlID0gYmFja2dyb3VuZFNwcml0ZTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJhY2tncm91bmRTcHJpdGUpO1xuICAgIH1cblxuICAgIGRyYXdDb21wb25lbnQoZGVsdGE/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgZHJhdygpOiB2b2lkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBHVUlDb21wb25lbnQ7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUFBO0FBYUE7QUFLQTtBQUxBO0FBSEE7QUFDQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/gui/gui_component.ts\n");

/***/ })

})
webpackHotUpdate("main",{

/***/ "./src/components/gui/button.ts":
/*!**************************************!*\
  !*** ./src/components/gui/button.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar gui_component_1 = __webpack_require__(/*! ./gui_component */ \"./src/components/gui/gui_component.ts\");\r\nvar Button = /** @class */ (function (_super) {\r\n    __extends(Button, _super);\r\n    function Button() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    Button.prototype.draw = function () { };\r\n    return Button;\r\n}(gui_component_1.default));\r\nexports.default = Button;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ndWkvYnV0dG9uLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL2d1aS9idXR0b24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGlja2VyIH0gZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCBHVUlDb21wb25lbnQgZnJvbSBcIi4vZ3VpX2NvbXBvbmVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBHVUlDb21wb25lbnQge1xuICAgIGRyYXcoKTogdm9pZCB7fVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBRUE7QUFBQTtBQUFBOztBQUVBO0FBREE7QUFDQTtBQUFBOzsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/gui/button.ts\n");

/***/ }),

/***/ "./src/components/gui/gui_window.ts":
/*!******************************************!*\
  !*** ./src/components/gui/gui_window.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar button_1 = __webpack_require__(/*! ./button */ \"./src/components/gui/button.ts\");\r\nvar gui_component_1 = __webpack_require__(/*! ./gui_component */ \"./src/components/gui/gui_component.ts\");\r\nvar GUIWindow = /** @class */ (function (_super) {\r\n    __extends(GUIWindow, _super);\r\n    function GUIWindow(x, y, width, height, backgroundColor) {\r\n        if (backgroundColor === void 0) { backgroundColor = 0xffffff; }\r\n        var _this = _super.call(this) || this;\r\n        _this.x = x;\r\n        _this.y = y;\r\n        _this.cWidth = width;\r\n        _this.cHeight = height;\r\n        _this.components = [];\r\n        _this.backgroundColor = backgroundColor;\r\n        _this.interactive = true;\r\n        _this.backgroundRect = PIXI.Sprite.from(PIXI.Texture.WHITE);\r\n        _this.backgroundRect.width = width;\r\n        _this.backgroundRect.height = height;\r\n        _this.backgroundRect.tint = backgroundColor;\r\n        _this.backgroundRect.interactive = true;\r\n        _this.addChild(_this.backgroundRect);\r\n        _this.on(\"click\", function (e) {\r\n            e.stopPropagation();\r\n        });\r\n        _this.on(\"mousemove\", function (e) {\r\n            var point = e.data.global;\r\n            if (point.x >= _this.x &&\r\n                point.x < _this.x + _this.cWidth &&\r\n                point.y >= _this.y &&\r\n                point.y < _this.y + _this.cHeight) {\r\n                e.stopPropagation();\r\n            }\r\n        });\r\n        var btn = new button_1.default(10, 10, 20, 20);\r\n        btn.onClick = function (e) {\r\n            console.log(\"test\");\r\n        };\r\n        _this.addChild(btn);\r\n        _this.draw();\r\n        return _this;\r\n    }\r\n    GUIWindow.prototype.addChild = function () {\r\n        var child = [];\r\n        for (var _i = 0; _i < arguments.length; _i++) {\r\n            child[_i] = arguments[_i];\r\n        }\r\n        for (var c in child) {\r\n            if (c.__proto__ instanceof gui_component_1.default) {\r\n                this.components.push(c);\r\n            }\r\n        }\r\n        return _super.prototype.addChild.apply(this, child);\r\n    };\r\n    GUIWindow.prototype.addChildAt = function (child, index) {\r\n        if (child.__proto__ instanceof gui_component_1.default) {\r\n            this.components.push(child);\r\n        }\r\n        return _super.prototype.addChildAt.call(this, child, index);\r\n    };\r\n    GUIWindow.prototype.removeChild = function () {\r\n        var child = [];\r\n        for (var _i = 0; _i < arguments.length; _i++) {\r\n            child[_i] = arguments[_i];\r\n        }\r\n        for (var c in child) {\r\n            if (c.__proto__ instanceof gui_component_1.default) {\r\n                var index = this.components.indexOf(c);\r\n                if (index > -1)\r\n                    this.components.splice(index, 1);\r\n            }\r\n        }\r\n        return _super.prototype.removeChild.apply(this, child);\r\n    };\r\n    GUIWindow.prototype.removeChildAt = function (index) {\r\n        var child = _super.prototype.removeChildAt.call(this, index);\r\n        if (child.__proto__ instanceof gui_component_1.default) {\r\n            var index_1 = this.components.indexOf(child);\r\n            if (index_1 > -1)\r\n                this.components.splice(index_1, 1);\r\n        }\r\n        return child;\r\n    };\r\n    GUIWindow.prototype.removeChildren = function (beginIndex, endIndex) {\r\n        var children = _super.prototype.removeChildren.call(this, beginIndex, endIndex);\r\n        for (var child in children) {\r\n            if (child.__proto__ instanceof gui_component_1.default) {\r\n                var index = this.components.indexOf(child);\r\n                if (index > -1)\r\n                    this.components.splice(index, 1);\r\n            }\r\n        }\r\n        return children;\r\n    };\r\n    GUIWindow.prototype.draw = function () {\r\n        this.components.forEach(function (comp) { return comp.drawComponent(); });\r\n    };\r\n    return GUIWindow;\r\n}(PIXI.Container));\r\nexports.default = GUIWindow;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ndWkvZ3VpX3dpbmRvdy50cy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi9zcmMvY29tcG9uZW50cy9ndWkvZ3VpX3dpbmRvdy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XG5pbXBvcnQgQnV0dG9uIGZyb20gXCIuL2J1dHRvblwiO1xuaW1wb3J0IEdVSUNvbXBvbmVudCBmcm9tIFwiLi9ndWlfY29tcG9uZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdVSVdpbmRvdyBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcbiAgICBjb21wb25lbnRzOiBBcnJheTxHVUlDb21wb25lbnQ+O1xuICAgIGJhY2tncm91bmRDb2xvcjogbnVtYmVyO1xuICAgIGNXaWR0aDogbnVtYmVyO1xuICAgIGNIZWlnaHQ6IG51bWJlcjtcbiAgICBiYWNrZ3JvdW5kUmVjdDogUElYSS5TcHJpdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgeDogbnVtYmVyLFxuICAgICAgICB5OiBudW1iZXIsXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG51bWJlciA9IDB4ZmZmZmZmXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5jV2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5jSGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFtdO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvcjtcblxuICAgICAgICB0aGlzLmludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmJhY2tncm91bmRSZWN0ID0gUElYSS5TcHJpdGUuZnJvbShQSVhJLlRleHR1cmUuV0hJVEUpO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRSZWN0LndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFJlY3QuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmJhY2tncm91bmRSZWN0LnRpbnQgPSBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFJlY3QuaW50ZXJhY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iYWNrZ3JvdW5kUmVjdCk7XG5cbiAgICAgICAgdGhpcy5vbihcImNsaWNrXCIsIChlOiBQSVhJLmludGVyYWN0aW9uLkludGVyYWN0aW9uRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub24oXCJtb3VzZW1vdmVcIiwgKGU6IFBJWEkuaW50ZXJhY3Rpb24uSW50ZXJhY3Rpb25FdmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBvaW50ID0gZS5kYXRhLmdsb2JhbDtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBwb2ludC54ID49IHRoaXMueCAmJlxuICAgICAgICAgICAgICAgIHBvaW50LnggPCB0aGlzLnggKyB0aGlzLmNXaWR0aCAmJlxuICAgICAgICAgICAgICAgIHBvaW50LnkgPj0gdGhpcy55ICYmXG4gICAgICAgICAgICAgICAgcG9pbnQueSA8IHRoaXMueSArIHRoaXMuY0hlaWdodFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJ0biA9IG5ldyBCdXR0b24oMTAsIDEwLCAyMCwgMjApO1xuICAgICAgICBidG4ub25DbGljayA9IChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRlc3RcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGRDaGlsZChidG4pO1xuXG4gICAgICAgIHRoaXMuZHJhdygpO1xuICAgIH1cblxuICAgIGFkZENoaWxkPFRDaGlsZHJlbiBleHRlbmRzIFBJWEkuRGlzcGxheU9iamVjdFtdPihcbiAgICAgICAgLi4uY2hpbGQ6IFRDaGlsZHJlblxuICAgICk6IFRDaGlsZHJlblswXSB7XG4gICAgICAgIGZvciAobGV0IGMgaW4gY2hpbGQpIHtcbiAgICAgICAgICAgIGlmICgoYyBhcyBhbnkpLl9fcHJvdG9fXyBpbnN0YW5jZW9mIEdVSUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKGMgYXMgYW55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIuYWRkQ2hpbGQoLi4uY2hpbGQpO1xuICAgIH1cblxuICAgIGFkZENoaWxkQXQ8VCBleHRlbmRzIFBJWEkuRGlzcGxheU9iamVjdD4oY2hpbGQ6IFQsIGluZGV4OiBudW1iZXIpOiBUIHtcbiAgICAgICAgaWYgKChjaGlsZCBhcyBhbnkpLl9fcHJvdG9fXyBpbnN0YW5jZW9mIEdVSUNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2goY2hpbGQgYXMgYW55KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIuYWRkQ2hpbGRBdChjaGlsZCwgaW5kZXgpO1xuICAgIH1cblxuICAgIHJlbW92ZUNoaWxkPFRDaGlsZHJlbiBleHRlbmRzIFBJWEkuRGlzcGxheU9iamVjdFtdPihcbiAgICAgICAgLi4uY2hpbGQ6IFRDaGlsZHJlblxuICAgICk6IFRDaGlsZHJlblswXSB7XG4gICAgICAgIGZvciAobGV0IGMgaW4gY2hpbGQpIHtcbiAgICAgICAgICAgIGlmICgoYyBhcyBhbnkpLl9fcHJvdG9fXyBpbnN0YW5jZW9mIEdVSUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jb21wb25lbnRzLmluZGV4T2YoYyBhcyBhbnkpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB0aGlzLmNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIucmVtb3ZlQ2hpbGQoLi4uY2hpbGQpO1xuICAgIH1cblxuICAgIHJlbW92ZUNoaWxkQXQoaW5kZXg6IG51bWJlcik6IFBJWEkuRGlzcGxheU9iamVjdCB7XG4gICAgICAgIGxldCBjaGlsZCA9IHN1cGVyLnJlbW92ZUNoaWxkQXQoaW5kZXgpO1xuICAgICAgICBpZiAoKGNoaWxkIGFzIGFueSkuX19wcm90b19fIGluc3RhbmNlb2YgR1VJQ29tcG9uZW50KSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY29tcG9uZW50cy5pbmRleE9mKGNoaWxkIGFzIGFueSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5jb21wb25lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH1cblxuICAgIHJlbW92ZUNoaWxkcmVuKFxuICAgICAgICBiZWdpbkluZGV4PzogbnVtYmVyLFxuICAgICAgICBlbmRJbmRleD86IG51bWJlclxuICAgICk6IFBJWEkuRGlzcGxheU9iamVjdFtdIHtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gc3VwZXIucmVtb3ZlQ2hpbGRyZW4oYmVnaW5JbmRleCwgZW5kSW5kZXgpO1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBpbiBjaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKChjaGlsZCBhcyBhbnkpLl9fcHJvdG9fXyBpbnN0YW5jZW9mIEdVSUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jb21wb25lbnRzLmluZGV4T2YoY2hpbGQgYXMgYW55KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5jb21wb25lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH1cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKChjb21wKSA9PiBjb21wLmRyYXdDb21wb25lbnQoKSk7XG4gICAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFPQTtBQUtBO0FBTEE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/gui/gui_window.ts\n");

/***/ })

})
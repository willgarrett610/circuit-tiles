webpackHotUpdate("main",{

/***/ "./src/components/gui/button.ts":
/*!**************************************!*\
  !*** ./src/components/gui/button.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar gui_component_1 = __webpack_require__(/*! ./gui_component */ \"./src/components/gui/gui_component.ts\");\r\nvar Button = /** @class */ (function (_super) {\r\n    __extends(Button, _super);\r\n    function Button() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    Button.prototype.draw = function () {\r\n        new pixi_js_1.Ticker().add(function (delta) {\r\n            console.log(delta);\r\n        });\r\n    };\r\n    return Button;\r\n}(gui_component_1.default));\r\nexports.default = Button;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ndWkvYnV0dG9uLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL2d1aS9idXR0b24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGlja2VyIH0gZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCBHVUlDb21wb25lbnQgZnJvbSBcIi4vZ3VpX2NvbXBvbmVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBHVUlDb21wb25lbnQge1xuICAgIGRyYXcoKTogdm9pZCB7XG4gICAgICAgIG5ldyBUaWNrZXIoKS5hZGQoKGRlbHRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkZWx0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFBQTtBQUFBOztBQU1BO0FBTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/gui/button.ts\n");

/***/ })

})
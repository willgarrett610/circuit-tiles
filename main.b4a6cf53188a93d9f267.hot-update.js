webpackHotUpdate("main",{

/***/ "./src/components/tiles/wire-tile.ts":
/*!*******************************************!*\
  !*** ./src/components/tiles/wire-tile.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar tile_1 = __webpack_require__(/*! ./tile */ \"./src/components/tiles/tile.ts\");\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar Wire = /** @class */ (function (_super) {\r\n    __extends(Wire, _super);\r\n    function Wire() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.connect = {\r\n            up: false,\r\n            down: false,\r\n            left: false,\r\n            right: false,\r\n        };\r\n        return _this;\r\n    }\r\n    Wire.prototype.generateContainer = function () {\r\n        var graphics = new PIXI.Graphics();\r\n        return graphics;\r\n    };\r\n    return Wire;\r\n}(tile_1.Tile));\r\nexports.default = Wire;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90aWxlcy93aXJlLXRpbGUudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2NvbXBvbmVudHMvdGlsZXMvd2lyZS10aWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy9kaXJlY3Rpb25zXCI7XHJcbmltcG9ydCB7IENvbm5lY3RhYmxlLCBTcHJpdGVUaWxlLCBUaWxlIH0gZnJvbSBcIi4vdGlsZVwiO1xyXG5pbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XHJcblxyXG5jbGFzcyBXaXJlIGV4dGVuZHMgVGlsZSBpbXBsZW1lbnRzIENvbm5lY3RhYmxlIHtcclxuICAgIGNvbm5lY3QgPSB7XHJcbiAgICAgICAgdXA6IGZhbHNlLFxyXG4gICAgICAgIGRvd246IGZhbHNlLFxyXG4gICAgICAgIGxlZnQ6IGZhbHNlLFxyXG4gICAgICAgIHJpZ2h0OiBmYWxzZSxcclxuICAgIH07XHJcblxyXG4gICAgZ2VuZXJhdGVDb250YWluZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZ3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG5cclxuICAgICAgICByZXR1cm4gZ3JhcGhpY3M7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdpcmU7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBT0E7QUFMQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/tiles/wire-tile.ts\n");

/***/ })

})
webpackHotUpdate("main",{

/***/ "./src/components/tiles/wire-tile.ts":
/*!*******************************************!*\
  !*** ./src/components/tiles/wire-tile.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar directions_1 = __webpack_require__(/*! ../../utils/directions */ \"./src/utils/directions.ts\");\r\nvar tile_1 = __webpack_require__(/*! ./tile */ \"./src/components/tiles/tile.ts\");\r\nvar tile_2 = __webpack_require__(/*! ./tile */ \"./src/components/tiles/tile.ts\");\r\nvar Wire = /** @class */ (function (_super) {\r\n    __extends(Wire, _super);\r\n    function Wire(x, y) {\r\n        var _this = this;\r\n        _this.label = undefined;\r\n        _this.direction = directions_1.Direction.NORMAL;\r\n        _this.type = tile_2.TileType.PRIMITIVE;\r\n        _this.connect = {\r\n            up: false,\r\n            down: false,\r\n            left: false,\r\n            right: false,\r\n        };\r\n        _this.texture = PIXI.Texture.from(\"assets/sprites/doge-icon.svg\");\r\n        _this.x = x;\r\n        _this.y = y;\r\n        return _this;\r\n    }\r\n    return Wire;\r\n}(tile_1.default));\r\nexports.default = Wire;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90aWxlcy93aXJlLXRpbGUudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2NvbXBvbmVudHMvdGlsZXMvd2lyZS10aWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy9kaXJlY3Rpb25zXCI7XHJcbmltcG9ydCBUaWxlIGZyb20gXCIuL3RpbGVcIjtcclxuaW1wb3J0IHsgVGlsZVR5cGUgfSBmcm9tIFwiLi90aWxlXCI7XHJcblxyXG5jbGFzcyBXaXJlIGV4dGVuZHMgVGlsZSB7XHJcbiAgICBsYWJlbCA9IHVuZGVmaW5lZDtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIGRpcmVjdGlvbiA9IERpcmVjdGlvbi5OT1JNQUw7XHJcbiAgICB0eXBlID0gVGlsZVR5cGUuUFJJTUlUSVZFO1xyXG4gICAgY29ubmVjdCA9IHtcclxuICAgICAgICB1cDogZmFsc2UsXHJcbiAgICAgICAgZG93bjogZmFsc2UsXHJcbiAgICAgICAgbGVmdDogZmFsc2UsXHJcbiAgICAgICAgcmlnaHQ6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIHRleHR1cmUgPSBQSVhJLlRleHR1cmUuZnJvbShcImFzc2V0cy9zcHJpdGVzL2RvZ2UtaWNvbi5zdmdcIik7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdpcmU7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBY0E7QUFBQTtBQWJBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTs7QUFDQTtBQUNBO0FBQUE7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/tiles/wire-tile.ts\n");

/***/ })

})
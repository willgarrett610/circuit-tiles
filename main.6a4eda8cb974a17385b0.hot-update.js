webpackHotUpdate("main",{

/***/ "./src/components/tiles/wire-tile.ts":
/*!*******************************************!*\
  !*** ./src/components/tiles/wire-tile.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar directions_1 = __webpack_require__(/*! ../../utils/directions */ \"./src/utils/directions.ts\");\r\nvar tile_1 = __webpack_require__(/*! ./tile */ \"./src/components/tiles/tile.ts\");\r\nvar Wire = /** @class */ (function () {\r\n    function Wire(x, y) {\r\n        this.label = undefined;\r\n        this.direction = directions_1.Direction.NORMAL;\r\n        this.type = tile_1.TileType.PRIMITIVE;\r\n        this.connect = {\r\n            up: false,\r\n            down: false,\r\n            left: false,\r\n            right: false,\r\n        };\r\n        this.texture = PIXI.Texture.from(\"assets/sprites/doge-icon.svg\");\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    return Wire;\r\n}());\r\nexports.default = Wire;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90aWxlcy93aXJlLXRpbGUudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2NvbXBvbmVudHMvdGlsZXMvd2lyZS10aWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy9kaXJlY3Rpb25zXCI7XHJcbmltcG9ydCBUaWxlIGZyb20gXCIuL3RpbGVcIjtcclxuaW1wb3J0IFRpbGVJbnRlcmZhY2UsIHsgVGlsZVR5cGUgfSBmcm9tIFwiLi90aWxlXCI7XHJcblxyXG5jbGFzcyBXaXJlIGltcGxlbWVudHMgVGlsZSB7XHJcbiAgICBsYWJlbCA9IHVuZGVmaW5lZDtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIGRpcmVjdGlvbiA9IERpcmVjdGlvbi5OT1JNQUw7XHJcbiAgICB0eXBlID0gVGlsZVR5cGUuUFJJTUlUSVZFO1xyXG4gICAgY29ubmVjdCA9IHtcclxuICAgICAgICB1cDogZmFsc2UsXHJcbiAgICAgICAgZG93bjogZmFsc2UsXHJcbiAgICAgICAgbGVmdDogZmFsc2UsXHJcbiAgICAgICAgcmlnaHQ6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIHRleHR1cmUgPSBQSVhJLlRleHR1cmUuZnJvbShcImFzc2V0cy9zcHJpdGVzL2RvZ2UtaWNvbi5zdmdcIik7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdpcmU7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUVBO0FBRUE7QUFjQTtBQWJBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/tiles/wire-tile.ts\n");

/***/ })

})
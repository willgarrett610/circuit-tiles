webpackHotUpdate("main",{

/***/ "./src/components/tiles/tile.ts":
/*!**************************************!*\
  !*** ./src/components/tiles/tile.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.SpriteTile = exports.Tile = void 0;\r\nvar directions_1 = __webpack_require__(/*! ../../utils/directions */ \"./src/utils/directions.ts\");\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar Tile = /** @class */ (function () {\r\n    function Tile(x, y) {\r\n        this.label = undefined;\r\n        this.x = 0;\r\n        this.y = 0;\r\n        this.direction = directions_1.Rotation.NORMAL;\r\n        this.signalActive = false;\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    Tile.prototype.getContainer = function (size) {\r\n        if (!this.container)\r\n            this.container = this.generateContainer();\r\n        this.container.width = size;\r\n        this.container.height = size;\r\n        this.container.pivot.x =\r\n            this.container.width / (this.container.scale.x * 2);\r\n        this.container.pivot.y =\r\n            this.container.height / (this.container.scale.y * 2);\r\n        this.container.x = this.x * size + size / 2;\r\n        this.container.y = this.y * size + size / 2;\r\n        this.container.rotation = (this.direction.valueOf() * Math.PI) / 2;\r\n        return this.container;\r\n    };\r\n    Tile.prototype.update = function (size) {\r\n        if (this.container) {\r\n            this.container.width = size;\r\n            this.container.height = size;\r\n            this.container.pivot.x =\r\n                this.container.width / (this.container.scale.x * 2);\r\n            this.container.pivot.y =\r\n                this.container.height / (this.container.scale.y * 2);\r\n            this.container.x = this.x * size + size / 2;\r\n            this.container.y = this.y * size + size / 2;\r\n            this.container.rotation = (this.direction.valueOf() * Math.PI) / 2;\r\n        }\r\n    };\r\n    return Tile;\r\n}());\r\nexports.Tile = Tile;\r\nvar SpriteTile = /** @class */ (function (_super) {\r\n    __extends(SpriteTile, _super);\r\n    function SpriteTile() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    SpriteTile.prototype.generateContainer = function () {\r\n        return new PIXI.Sprite(this.texture);\r\n    };\r\n    return SpriteTile;\r\n}(Tile));\r\nexports.SpriteTile = SpriteTile;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90aWxlcy90aWxlLnRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uL3NyYy9jb21wb25lbnRzL3RpbGVzL3RpbGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm90YXRpb24gfSBmcm9tIFwiLi4vLi4vdXRpbHMvZGlyZWN0aW9uc1wiO1xyXG5pbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbm5lY3RhYmxlIHtcclxuICAgIGNvbm5lY3Q6IHtcclxuICAgICAgICB1cDogYm9vbGVhbjtcclxuICAgICAgICBkb3duOiBib29sZWFuO1xyXG4gICAgICAgIGxlZnQ6IGJvb2xlYW47XHJcbiAgICAgICAgcmlnaHQ6IGJvb2xlYW47XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVGlsZSB7XHJcbiAgICBsYWJlbD86IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICAgIHggPSAwO1xyXG4gICAgeSA9IDA7XHJcbiAgICBkaXJlY3Rpb24gPSBSb3RhdGlvbi5OT1JNQUw7XHJcbiAgICBjb250YWluZXI/OiBQSVhJLkNvbnRhaW5lcjtcclxuICAgIHNpZ25hbEFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIGFic3RyYWN0IGdlbmVyYXRlQ29udGFpbmVyKCk6IFBJWEkuQ29udGFpbmVyO1xyXG5cclxuICAgIGdldENvbnRhaW5lcihzaXplOiBudW1iZXIpOiBQSVhJLkNvbnRhaW5lciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lcikgdGhpcy5jb250YWluZXIgPSB0aGlzLmdlbmVyYXRlQ29udGFpbmVyKCk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIud2lkdGggPSBzaXplO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmhlaWdodCA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucGl2b3QueCA9XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLndpZHRoIC8gKHRoaXMuY29udGFpbmVyLnNjYWxlLnggKiAyKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5waXZvdC55ID1cclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuaGVpZ2h0IC8gKHRoaXMuY29udGFpbmVyLnNjYWxlLnkgKiAyKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci54ID0gdGhpcy54ICogc2l6ZSArIHNpemUgLyAyO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnkgPSB0aGlzLnkgKiBzaXplICsgc2l6ZSAvIDI7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucm90YXRpb24gPSAodGhpcy5kaXJlY3Rpb24udmFsdWVPZigpICogTWF0aC5QSSkgLyAyO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoc2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLndpZHRoID0gc2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuaGVpZ2h0ID0gc2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIucGl2b3QueCA9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci53aWR0aCAvICh0aGlzLmNvbnRhaW5lci5zY2FsZS54ICogMik7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnBpdm90LnkgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuaGVpZ2h0IC8gKHRoaXMuY29udGFpbmVyLnNjYWxlLnkgKiAyKTtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIueCA9IHRoaXMueCAqIHNpemUgKyBzaXplIC8gMjtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIueSA9IHRoaXMueSAqIHNpemUgKyBzaXplIC8gMjtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIucm90YXRpb24gPSAodGhpcy5kaXJlY3Rpb24udmFsdWVPZigpICogTWF0aC5QSSkgLyAyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNwcml0ZVRpbGUgZXh0ZW5kcyBUaWxlIHtcclxuICAgIGFic3RyYWN0IHRleHR1cmU6IFBJWEkuVGV4dHVyZTtcclxuXHJcbiAgICBnZW5lcmF0ZUNvbnRhaW5lcigpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFBJWEkuU3ByaXRlKHRoaXMudGV4dHVyZSk7XHJcbiAgICB9XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBV0E7QUFRQTtBQVBBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBMUNBO0FBNENBO0FBQUE7QUFBQTs7QUFNQTtBQUhBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFOQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/tiles/tile.ts\n");

/***/ }),

/***/ "./src/components/tiles/wire-tile.ts":
/*!*******************************************!*\
  !*** ./src/components/tiles/wire-tile.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar tile_1 = __webpack_require__(/*! ./tile */ \"./src/components/tiles/tile.ts\");\r\nvar PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\r\nvar Wire = /** @class */ (function (_super) {\r\n    __extends(Wire, _super);\r\n    function Wire() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.connect = {\r\n            up: false,\r\n            down: false,\r\n            left: false,\r\n            right: false,\r\n        };\r\n        _this.color = 0xd9514c;\r\n        return _this;\r\n    }\r\n    Wire.prototype.generateContainer = function () {\r\n        var graphics = new PIXI.Graphics();\r\n        // have to do this to set size to draw in the center\r\n        graphics.beginFill(0, 0);\r\n        graphics.drawRect(0, 0, 120, 120);\r\n        graphics.endFill();\r\n        graphics.beginFill(this.color);\r\n        if (Object.entries(this.connect).some(function (_a) {\r\n            var _ = _a[0], value = _a[1];\r\n            return value;\r\n        }))\r\n            graphics.drawRect(40, 40, 40, 40);\r\n        else\r\n            graphics.drawRect(35, 35, 50, 50);\r\n        if (this.connect.up)\r\n            graphics.drawRect(40, 0, 40, 40);\r\n        if (this.connect.down)\r\n            graphics.drawRect(40, 80, 40, 40);\r\n        if (this.connect.left)\r\n            graphics.drawRect(0, 40, 40, 40);\r\n        if (this.connect.right)\r\n            graphics.drawRect(80, 40, 40, 40);\r\n        graphics.endFill();\r\n        return graphics;\r\n    };\r\n    return Wire;\r\n}(tile_1.Tile));\r\nexports.default = Wire;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90aWxlcy93aXJlLXRpbGUudHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4vc3JjL2NvbXBvbmVudHMvdGlsZXMvd2lyZS10aWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy9kaXJlY3Rpb25zXCI7XHJcbmltcG9ydCB7IENvbm5lY3RhYmxlLCBTcHJpdGVUaWxlLCBUaWxlIH0gZnJvbSBcIi4vdGlsZVwiO1xyXG5pbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XHJcblxyXG5jbGFzcyBXaXJlIGV4dGVuZHMgVGlsZSBpbXBsZW1lbnRzIENvbm5lY3RhYmxlIHtcclxuICAgIGNvbm5lY3QgPSB7XHJcbiAgICAgICAgdXA6IGZhbHNlLFxyXG4gICAgICAgIGRvd246IGZhbHNlLFxyXG4gICAgICAgIGxlZnQ6IGZhbHNlLFxyXG4gICAgICAgIHJpZ2h0OiBmYWxzZSxcclxuICAgIH07XHJcblxyXG4gICAgY29sb3IgPSAweGQ5NTE0YztcclxuXHJcbiAgICBnZW5lcmF0ZUNvbnRhaW5lcigpIHtcclxuICAgICAgICBjb25zdCBncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcblxyXG4gICAgICAgIC8vIGhhdmUgdG8gZG8gdGhpcyB0byBzZXQgc2l6ZSB0byBkcmF3IGluIHRoZSBjZW50ZXJcclxuICAgICAgICBncmFwaGljcy5iZWdpbkZpbGwoMCwgMCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZHJhd1JlY3QoMCwgMCwgMTIwLCAxMjApO1xyXG4gICAgICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcclxuXHJcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5GaWxsKHRoaXMuY29sb3IpO1xyXG4gICAgICAgIGlmIChPYmplY3QuZW50cmllcyh0aGlzLmNvbm5lY3QpLnNvbWUoKFtfLCB2YWx1ZV0pID0+IHZhbHVlKSlcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZHJhd1JlY3QoNDAsIDQwLCA0MCwgNDApO1xyXG4gICAgICAgIGVsc2UgZ3JhcGhpY3MuZHJhd1JlY3QoMzUsIDM1LCA1MCwgNTApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0LnVwKSBncmFwaGljcy5kcmF3UmVjdCg0MCwgMCwgNDAsIDQwKTtcclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0LmRvd24pIGdyYXBoaWNzLmRyYXdSZWN0KDQwLCA4MCwgNDAsIDQwKTtcclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0LmxlZnQpIGdyYXBoaWNzLmRyYXdSZWN0KDAsIDQwLCA0MCwgNDApO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3QucmlnaHQpIGdyYXBoaWNzLmRyYXdSZWN0KDgwLCA0MCwgNDAsIDQwKTtcclxuICAgICAgICBncmFwaGljcy5lbmRGaWxsKCk7XHJcbiAgICAgICAgcmV0dXJuIGdyYXBoaWNzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXaXJlO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBc0JBO0FBcEJBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/tiles/wire-tile.ts\n");

/***/ })

})
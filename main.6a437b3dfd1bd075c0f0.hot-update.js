webpackHotUpdate("main", {
    /***/ "./src/components/gui/gui_component.ts":
        /*!*********************************************!*\
  !*** ./src/components/gui/gui_component.ts ***!
  \*********************************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
            "use strict";
            eval(
                '\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== "function" && b !== null)\r\n            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\nvar PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");\r\nvar GUIComponent = /** @class */ (function (_super) {\r\n    __extends(GUIComponent, _super);\r\n    function GUIComponent(x, y, width, height, backgroundColor) {\r\n        if (backgroundColor === void 0) { backgroundColor = 0xffffff; }\r\n        var _this = _super.call(this) || this;\r\n        _this.x = x;\r\n        _this.y = y;\r\n        _this.cWidth = width;\r\n        _this.cHeight = height;\r\n        _this.backgroundColor = backgroundColor;\r\n        _this.interactive = true;\r\n        _this.backgroundSprite = PIXI.Sprite.from(PIXI.Texture.WHITE);\r\n        _this.backgroundSprite.width = width;\r\n        _this.backgroundSprite.height = height;\r\n        _this.backgroundSprite.tint = backgroundColor;\r\n        _this.backgroundSprite.interactive = true;\r\n        _this.addChild(_this.backgroundSprite);\r\n        _this.graphics = new PIXI.Graphics();\r\n        _this.on("click", function (e) {\r\n            e.stopPropagation();\r\n            if (_this.onClick != undefined) {\r\n                _this.onClick(e);\r\n            }\r\n        });\r\n        return _this;\r\n    }\r\n    GUIComponent.prototype.setBackgroundSprite = function (backgroundSprite) {\r\n        this.removeChild(this.backgroundSprite);\r\n        this.backgroundSprite = backgroundSprite;\r\n        this.addChild(this.backgroundSprite);\r\n    };\r\n    GUIComponent.prototype.drawComponent = function () {\r\n        this.draw();\r\n    };\r\n    return GUIComponent;\r\n}(PIXI.Container));\r\nexports.default = GUIComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9ndWkvZ3VpX2NvbXBvbmVudC50cy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi9zcmMvY29tcG9uZW50cy9ndWkvZ3VpX2NvbXBvbmVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XHJcblxyXG5pbnRlcmZhY2UgR1VJQ29tcG9uZW50IHtcclxuICAgIG9uSG92ZXI/KCk6IHZvaWQ7XHJcbiAgICBvbkNsaWNrPyhlOiBQSVhJLmludGVyYWN0aW9uLkludGVyYWN0aW9uRXZlbnQpOiB2b2lkO1xyXG59XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBHVUlDb21wb25lbnQgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IG51bWJlcjtcclxuICAgIGdyYXBoaWNzOiBQSVhJLkdyYXBoaWNzO1xyXG4gICAgY1dpZHRoOiBudW1iZXI7XHJcbiAgICBjSGVpZ2h0OiBudW1iZXI7XHJcbiAgICBiYWNrZ3JvdW5kU3ByaXRlOiBQSVhJLlNwcml0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICB4OiBudW1iZXIsXHJcbiAgICAgICAgeTogbnVtYmVyLFxyXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBudW1iZXIgPSAweGZmZmZmZlxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuY1dpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5jSGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvcjtcclxuXHJcbiAgICAgICAgdGhpcy5pbnRlcmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFNwcml0ZSA9IFBJWEkuU3ByaXRlLmZyb20oUElYSS5UZXh0dXJlLldISVRFKTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmRTcHJpdGUud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmRTcHJpdGUuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFNwcml0ZS50aW50ID0gYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFNwcml0ZS5pbnRlcmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iYWNrZ3JvdW5kU3ByaXRlKTtcclxuXHJcbiAgICAgICAgdGhpcy5ncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcblxyXG4gICAgICAgIHRoaXMub24oXCJjbGlja1wiLCAoZTogUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9uQ2xpY2sgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2soZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRCYWNrZ3JvdW5kU3ByaXRlKGJhY2tncm91bmRTcHJpdGU6IFBJWEkuU3ByaXRlKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmJhY2tncm91bmRTcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFNwcml0ZSA9IGJhY2tncm91bmRTcHJpdGU7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJhY2tncm91bmRTcHJpdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdDb21wb25lbnQoKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgZHJhdygpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHVUlDb21wb25lbnQ7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQU9BO0FBQUE7QUFPQTtBQUtBO0FBTEE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBRUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/gui/gui_component.ts\n'
            );

            /***/
        },
});

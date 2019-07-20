"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var RhineError = /** @class */ (function (_super) {
    __extends(RhineError, _super);
    function RhineError(message, config, code, request, response) {
        var _this = _super.call(this, message) || this;
        _this.config = config;
        _this.code = code;
        _this.request = request;
        _this.response = response;
        _this.isRhineError = true;
        Object.setPrototypeOf(_this, RhineError.prototype);
        return _this;
    }
    return RhineError;
}(Error));
function createError(message, config, code, request, response) {
    return new RhineError(message, config, code, request, response);
}
exports.createError = createError;
//# sourceMappingURL=error.js.map
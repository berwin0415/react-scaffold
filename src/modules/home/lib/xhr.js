"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function xhr(config) {
    var _a = config.method, method = _a === void 0 ? 'get' : _a, url = config.url, _b = config.data, data = _b === void 0 ? null : _b;
    var request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url, true);
    request.send(data);
}
exports.default = xhr;
//# sourceMappingURL=xhr.js.map
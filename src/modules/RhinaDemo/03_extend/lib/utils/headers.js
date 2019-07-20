"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function normalizedHeaderName(headers, normalizedName) {
    if (!headers)
        return;
    Object.keys(headers).forEach(function (name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[name];
            delete headers[name];
        }
    });
}
function processHeaders(headers, data) {
    normalizedHeaderName(headers, 'Content-Type');
    if (util_1.isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8';
        }
    }
    return headers;
}
exports.processHeaders = processHeaders;
function parseHeaders(headers) {
    var parsed = {};
    if (!headers) {
        return parsed;
    }
    headers.split('\r\n').forEach(function (item) {
        var _a = item.split(':'), key = _a[0], value = _a[1];
        if (!key) {
            return;
        }
        if (value) {
            parsed[key] = value.trim();
        }
    });
    return parsed;
}
exports.parseHeaders = parseHeaders;
//# sourceMappingURL=headers.js.map
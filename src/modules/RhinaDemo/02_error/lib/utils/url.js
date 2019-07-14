"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function buildURL(url, params) {
    if (!params) {
        return url;
    }
    var parts = [];
    Object.keys(params).forEach(function (key) {
        var val = params[key];
        if (val === null || typeof val === 'undefined') {
            return;
        }
        var values = [];
        if (Array.isArray(val)) {
            values = val;
            key += '[]';
        }
        else {
            values = [val];
        }
        values.forEach(function (item) {
            if (util_1.isDate(item)) {
                item = item.toISOString();
            }
            else if (util_1.isPlainObject(item)) {
                item = JSON.stringify(item);
            }
            parts.push(util_1.encode(key) + "=" + util_1.encode(item));
        });
    });
    var serializedParams = parts.join('&');
    if (serializedParams) {
        var markIndex = url.indexOf('#');
        if (markIndex !== -1) {
            url = url.slice(0, markIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
}
exports.buildURL = buildURL;
//# sourceMappingURL=url.js.map
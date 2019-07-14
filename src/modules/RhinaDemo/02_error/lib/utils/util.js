"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = Object.prototype.toString;
exports.isDate = function (value) { return exports.toString.call(value) === '[object Date]'; };
// export const isObject = (value: any): value is Object => value !== null && typeof value === "object"
exports.encode = function (values) {
    return encodeURIComponent(values)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
};
exports.isPlainObject = function (value) {
    return exports.toString.call(value) === '[object Object]';
};
//# sourceMappingURL=util.js.map
export var toString = Object.prototype.toString;
export var isDate = function (value) { return toString.call(value) === '[object Date]'; };
// export const isObject = (value: any): value is Object => value !== null && typeof value === "object"
export var encode = function (values) {
    return encodeURIComponent(values)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
};
export var isPlainObject = function (value) {
    return toString.call(value) === '[object Object]';
};
export var isString = function (value) { return typeof value === 'string'; };
export var isUndefined = function (value) { return typeof value === 'undefined'; };
export function extend(to, from) {
    for (var key in from) {
        ;
        to[key] = from[key];
    }
    return to;
}
export function deepMerge() {
    var objs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objs[_i] = arguments[_i];
    }
    var result = Object.create(null);
    objs.forEach(function (obj) {
        if (obj) {
            Object.keys(obj).forEach(function (key) {
                var value = obj[key];
                result[key] = isPlainObject(value)
                    ? isPlainObject(result[key])
                        ? deepMerge(result[key], value)
                        : deepMerge(value)
                    : value;
            });
        }
    });
    return result;
}
//# sourceMappingURL=util.js.map
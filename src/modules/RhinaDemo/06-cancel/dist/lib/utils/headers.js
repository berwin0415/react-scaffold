import { isPlainObject, deepMerge } from './util';
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
export function processHeaders(headers, data) {
    normalizedHeaderName(headers, 'Content-Type');
    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8';
        }
    }
    return headers;
}
export function parseHeaders(headers) {
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
export function flattenHeaders(headers, method) {
    if (!headers) {
        return headers;
    }
    headers = deepMerge(headers.common, headers[method], headers);
    var methodToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common'];
    methodToDelete.forEach(function (method) { return delete headers[method]; });
    return headers;
}
//# sourceMappingURL=headers.js.map
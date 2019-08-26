import { isDate, isPlainObject, encode } from './util';
export function buildURL(url, params) {
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
            if (isDate(item)) {
                item = item.toISOString();
            }
            else if (isPlainObject(item)) {
                item = JSON.stringify(item);
            }
            parts.push(encode(key) + "=" + encode(item));
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
//# sourceMappingURL=url.js.map
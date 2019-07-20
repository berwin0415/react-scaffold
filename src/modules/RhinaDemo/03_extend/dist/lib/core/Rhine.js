"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dispatchRequest_1 = require("./dispatchRequest");
var util_1 = require("../utils/util");
var Rhine = /** @class */ (function () {
    function Rhine() {
    }
    Rhine.prototype.request = function (url, config) {
        if (util_1.isString(url)) {
            if (!config) {
                config = {};
            }
            config.url = url;
        }
        else {
            config = url;
        }
        return dispatchRequest_1.default(config);
    };
    Rhine.prototype.get = function (url, config) {
        return this._requestMethodWithoutData('get', url, config);
    };
    Rhine.prototype.delete = function (url, config) {
        return this._requestMethodWithoutData('delete', url, config);
    };
    Rhine.prototype.head = function (url, config) {
        return this._requestMethodWithoutData('head', url, config);
    };
    Rhine.prototype.options = function (url, config) {
        return this._requestMethodWithoutData('options', url, config);
    };
    Rhine.prototype.post = function (url, data, config) {
        return this._requestMethodWithData('post', url, data, config);
    };
    Rhine.prototype.put = function (url, data, config) {
        return this._requestMethodWithData('put', url, data, config);
    };
    Rhine.prototype.patch = function (url, data, config) {
        return this._requestMethodWithData('patch', url, data, config);
    };
    Rhine.prototype._requestMethodWithoutData = function (method, url, config) {
        return this.request(Object.assign(config || {}, {
            method: method,
            url: url
        }));
    };
    Rhine.prototype._requestMethodWithData = function (method, url, data, config) {
        return this.request(Object.assign(config || {}, {
            method: method,
            url: url,
            data: data
        }));
    };
    return Rhine;
}());
exports.default = Rhine;
//# sourceMappingURL=Rhine.js.map
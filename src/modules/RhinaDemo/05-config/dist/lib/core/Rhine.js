import dispatchRequest from './dispatchRequest';
import { isString } from '../utils/util';
import InterceporManager from './InterceporManager';
import mergeConfig from './ mergeConfig';
var Rhine = /** @class */ (function () {
    function Rhine(initConfig) {
        this.defaults = initConfig;
        this.interceptors = {
            request: new InterceporManager(),
            response: new InterceporManager()
        };
    }
    Rhine.prototype.request = function (url, config) {
        if (isString(url)) {
            if (!config) {
                config = {};
            }
            config.url = url;
        }
        else {
            config = url;
        }
        config = mergeConfig(this.defaults, config);
        var chain = [
            {
                resolved: dispatchRequest,
                rejected: undefined
            }
        ];
        this.interceptors.request.forEach(function (interceptor) {
            chain.unshift(interceptor);
        });
        this.interceptors.response.forEach(function (interceptor) {
            chain.push(interceptor);
        });
        var promise = Promise.resolve(config);
        while (chain.length) {
            var _a = chain.shift(), resolved = _a.resolved, rejected = _a.rejected;
            promise = promise.then(resolved, rejected);
        }
        return promise;
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
export default Rhine;
//# sourceMappingURL=Rhine.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xhr_1 = require("./xhr");
var url_1 = require("./utils/url");
var data_1 = require("./utils/data");
var headers_1 = require("./utils/headers");
function rhine(config) {
    processConfig(config);
    return xhr_1.default(config).then(function (res) { return transformResponseData(res); });
}
function processConfig(config) {
    config.url = transformURL(config);
    config.headers = transformHeaders(config);
    config.data = transformRequestData(config);
}
function transformRequestData(config) {
    return data_1.transformRequest(config.data);
}
function transformURL(config) {
    var url = config.url, params = config.params;
    return url_1.buildURL(url, params);
}
function transformHeaders(config) {
    var _a = config.headers, headers = _a === void 0 ? {} : _a, data = config.data;
    return headers_1.processHeaders(headers, data);
}
function transformResponseData(res) {
    res.data = data_1.transformResponse(res.data);
    return res;
}
exports.default = rhine;
//# sourceMappingURL=index.js.map
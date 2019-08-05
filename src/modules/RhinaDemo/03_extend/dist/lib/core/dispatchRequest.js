import xhr from './xhr';
import { buildURL } from '../utils/url';
import { transformRequest, transformResponse } from '../utils/data';
import { processHeaders, flattenHeaders } from '../utils/headers';
function rhine(config) {
    processConfig(config);
    return xhr(config).then(function (res) { return transformResponseData(res); });
}
function processConfig(config) {
    config.url = transformURL(config);
    config.headers = transformHeaders(config);
    config.data = transformRequestData(config);
    config.headers = flattenHeaders(config.headers, config.method);
}
function transformRequestData(config) {
    return transformRequest(config.data);
}
function transformURL(config) {
    var url = config.url, params = config.params;
    return buildURL(url, params);
}
function transformHeaders(config) {
    var _a = config.headers, headers = _a === void 0 ? {} : _a, data = config.data;
    return processHeaders(headers, data);
}
function transformResponseData(res) {
    res.data = transformResponse(res.data);
    return res;
}
export default rhine;
//# sourceMappingURL=dispatchRequest.js.map
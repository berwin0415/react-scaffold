import xhr from './xhr';
import { buildURL } from '../utils/url';
import { flattenHeaders } from '../utils/headers';
import transform from './transform';
function rhine(config) {
    processConfig(config);
    return xhr(config).then(function (res) { return transformResponseData(res); });
}
function processConfig(config) {
    config.url = transformURL(config);
    config.data = transform(config.data, config.headers, config.transformRequest);
    config.headers = flattenHeaders(config.headers, config.method);
}
function transformURL(config) {
    var url = config.url, params = config.params;
    return buildURL(url, params);
}
function transformResponseData(res) {
    res.data = transform(res.data, res.headers, res.config.transformResponse);
    return res;
}
export default rhine;
//# sourceMappingURL=dispatchRequest.js.map
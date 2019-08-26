import { processHeaders } from './utils/headers';
import { transformRequest, transformResponse } from './utils/data';
var defaults = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*'
        }
    },
    transformRequest: [
        function (data, headers) {
            processHeaders(headers, data);
            return transformRequest(data);
        }
    ],
    transformResponse: [function (data) { return transformResponse(data); }]
};
var methodNoData = ['delete', 'get', 'head', 'options'];
methodNoData.forEach(function (method) { return (defaults.headers[method] = {}); });
var methodWithData = ['post', 'put', 'patch'];
methodWithData.forEach(function (method) {
    return (defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    });
});
export default defaults;
//# sourceMappingURL=defaults.js.map
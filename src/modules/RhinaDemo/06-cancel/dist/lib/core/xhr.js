import { parseHeaders } from '../utils/headers';
import { createError } from '../utils/error';
export default function xhr(config) {
    return new Promise(function (resole, reject) {
        try {
            var _a = config.method, method = _a === void 0 ? 'get' : _a, url = config.url, _b = config.data, data_1 = _b === void 0 ? null : _b, headers_1 = config.headers, responseType_1 = config.responseType, timeout_1 = config.timeout;
            var request_1 = new XMLHttpRequest();
            if (responseType_1) {
                request_1.responseType = responseType_1;
            }
            if (timeout_1) {
                request_1.timeout = timeout_1;
            }
            request_1.open(method.toUpperCase(), url, true);
            request_1.onreadystatechange = function () {
                if (request_1.readyState === 4) {
                    var responseHearder = parseHeaders(request_1.getAllResponseHeaders());
                    var responseData = responseType_1 === 'text' ? request_1.responseText : request_1.response;
                    var response = {
                        data: responseData,
                        status: request_1.status,
                        statusText: request_1.statusText,
                        headers: responseHearder,
                        config: config,
                        request: request_1
                    };
                    handleResponse(response, request_1);
                }
            };
            request_1.onerror = function () { return reject(createError('Network Error', config, null, request_1)); };
            request_1.ontimeout = function () {
                return reject(createError("Timeout of " + timeout_1 + " ms exceeded", config, 'ECONNABORTED', request_1));
            };
            Object.keys(headers_1).forEach(function (name) {
                if (data_1 === null && name.toLowerCase() === 'content-type') {
                    delete headers_1[name];
                }
                else {
                    request_1.setRequestHeader(name, headers_1[name]);
                }
            });
            request_1.send(data_1);
        }
        catch (error) {
            reject(error);
        }
        function handleResponse(res, req) {
            if (res.status >= 200 && res.status < 300) {
                resole(res);
            }
            else {
                reject(createError("Request failed with status code " + res.status, config, null, req, res));
            }
        }
    });
}
//# sourceMappingURL=xhr.js.map
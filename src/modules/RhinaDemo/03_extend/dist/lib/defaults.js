var defaults = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*'
        }
    }
};
var methodNoData = ['delete', 'get', 'head', 'options'];
methodNoData.forEach(function (method) { return (defaults.headers[method] = {}); });
var methodWithData = ['post', 'put', 'patch'];
methodWithData.forEach(function (method) {
    return (defaults.headers[method] = {
    // 'Content-Type': 'applecation/x-www-form-urlencoded'
    });
});
export default defaults;
//# sourceMappingURL=defaults.js.map
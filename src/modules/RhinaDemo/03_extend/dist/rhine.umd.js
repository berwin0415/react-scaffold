(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.index = factory());
}(this, (function () { 'use strict';

  var toString = Object.prototype.toString;
  var isDate = function (value) { return toString.call(value) === '[object Date]'; };
  // export const isObject = (value: any): value is Object => value !== null && typeof value === "object"
  var encode = function (values) {
      return encodeURIComponent(values)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',')
          .replace(/%20/g, '+')
          .replace(/%5B/gi, '[')
          .replace(/%5D/gi, ']');
  };
  var isPlainObject = function (value) {
      return toString.call(value) === '[object Object]';
  };
  var isString = function (value) { return typeof value === 'string'; };
  function extend(to, from) {
      for (var key in from) {
          to[key] = from[key];
      }
      return to;
  }

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
  function processHeaders(headers, data) {
      normalizedHeaderName(headers, 'Content-Type');
      if (isPlainObject(data)) {
          if (headers && !headers['Content-Type']) {
              headers['Content-Type'] = 'application/json;charset=utf-8';
          }
      }
      return headers;
  }
  function parseHeaders(headers) {
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

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var RhineError = /** @class */ (function (_super) {
      __extends(RhineError, _super);
      function RhineError(message, config, code, request, response) {
          var _this = _super.call(this, message) || this;
          _this.config = config;
          _this.code = code;
          _this.request = request;
          _this.response = response;
          _this.isRhineError = true;
          Object.setPrototypeOf(_this, RhineError.prototype);
          return _this;
      }
      return RhineError;
  }(Error));
  function createError(message, config, code, request, response) {
      return new RhineError(message, config, code, request, response);
  }

  function xhr(config) {
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

  function buildURL(url, params) {
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

  function transformRequest(data) {
      if (isPlainObject(data)) {
          return JSON.stringify(data);
      }
      return data;
  }
  function transformResponse(data) {
      if (typeof data === 'string') {
          try {
              data = JSON.parse(data);
          }
          catch (error) {
              // do nothing
          }
      }
      return data;
  }

  function rhine(config) {
      processConfig(config);
      return xhr(config).then(function (res) { return transformResponseData(res); });
  }
  function processConfig(config) {
      config.url = transformURL(config);
      config.headers = transformHeaders(config);
      config.data = transformRequestData(config);
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

  var Rhine = /** @class */ (function () {
      function Rhine() {
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
          return rhine(config);
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

  function createInstance() {
      var context = new Rhine();
      var instance = Rhine.prototype.request.bind(context);
      extend(instance, context);
      return instance;
  }
  var rhine$1 = createInstance();

  return rhine$1;

})));
//# sourceMappingURL=rhine.umd.js.map

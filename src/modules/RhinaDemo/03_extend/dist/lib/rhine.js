"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rhine_1 = require("./core/Rhine");
var util_1 = require("./utils/util");
function createInstance() {
    var context = new Rhine_1.default();
    var instance = Rhine_1.default.prototype.request.bind(context);
    util_1.extend(instance, context);
    return instance;
}
var rhine = createInstance();
exports.default = rhine;
//# sourceMappingURL=rhine.js.map
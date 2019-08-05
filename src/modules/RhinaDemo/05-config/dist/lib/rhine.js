import Rhine from './core/Rhine';
import { extend } from './utils/util';
import defaults from './defaults';
import mergeConfig from './core/ mergeConfig';
function createInstance(config) {
    var context = new Rhine(config);
    var instance = Rhine.prototype.request.bind(context);
    extend(instance, context);
    return instance;
}
var rhine = createInstance(defaults);
rhine.create = function (config) {
    return createInstance(mergeConfig(defaults, config));
};
export default rhine;
//# sourceMappingURL=rhine.js.map
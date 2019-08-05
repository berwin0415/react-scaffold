import Rhine from './core/Rhine';
import { extend } from './utils/util';
import defaults from './defaults';
function createInstance(config) {
    var context = new Rhine(config);
    var instance = Rhine.prototype.request.bind(context);
    extend(instance, context);
    return instance;
}
var rhine = createInstance(defaults);
export default rhine;
//# sourceMappingURL=rhine.js.map
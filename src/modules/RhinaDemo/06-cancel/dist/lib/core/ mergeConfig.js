import { isPlainObject, isUndefined, deepMerge } from '../utils/util';
var strats = Object.create(null);
var defaultStrat = function (value1, value2) {
    return typeof value2 === 'undefined' ? value1 : value2;
};
var fromVal2Strat = function (value1, value2) {
    if (typeof value2 !== 'undefined') {
        return value2;
    }
};
var deepMergeStrat = function (value1, value2) {
    if (isPlainObject(value2)) {
        return deepMerge(value1, value2);
    }
    else if (!isUndefined(value2)) {
        return value2;
    }
    else if (isPlainObject(value1)) {
        return deepMerge(value1, value2);
    }
    else if (!isUndefined(value1)) {
        return value1;
    }
};
var stratKeysDeepMerge = ['headers'];
var stratKeysFromVal2 = ['url', 'params', 'data'];
stratKeysDeepMerge.forEach(function (key) { return (strats[key] = deepMergeStrat); });
stratKeysFromVal2.forEach(function (key) { return (strats[key] = fromVal2Strat); });
export default function mergeConfig(config1, config2) {
    if (!config2) {
        config2 = {};
    }
    var config = Object.create(null);
    var mergeField = function (key) {
        var strat = strats[key] || defaultStrat;
        config[key] = strat(config1[key], config2[key]);
    };
    for (var key in config2) {
        mergeField(key);
    }
    for (var key in config1) {
        if (!config2[key]) {
            mergeField(key);
        }
    }
    return config;
}
//# sourceMappingURL= mergeConfig.js.map
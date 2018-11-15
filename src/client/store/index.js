import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

const context = require.context('./../../modules', true, /\/*\/reducers\/index.js$/);

const keys = context.keys() || []
const reducers = {}
for (let index = 0; index < keys.length; index++) {
    const element = context(keys[index])
    for (const fn in element) {
        if (element.hasOwnProperty(fn)) {
            reducers[fn]= element[fn];
        }
    }
    
}

console.log(reducers);
const rootReducer = combineReducers({
    router: routerReducer,
    ...reducers
})

export default rootReducer;
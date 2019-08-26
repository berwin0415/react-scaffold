import { combineReducers } from "redux";
import {routerReducer} from 'react-router-redux'

const context = require.context('$modules',true, /\/*\/reducers\/index.ts$/)
const keys = context.keys() || []

const reducers = Object.create(null)
keys.forEach(item => {
    let exp = context(item)
    for (const fn in exp) {
        reducers[fn] = exp[fn]
    }
})

const rootReducer = combineReducers({
    router: routerReducer,
    ...reducers
})

export default rootReducer
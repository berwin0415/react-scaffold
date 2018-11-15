import { combineReducers } from "redux";
import  todos from './detail'

export function demoReducer(state, action) {
  return combineReducers({
    todos
  })(state,action)
}
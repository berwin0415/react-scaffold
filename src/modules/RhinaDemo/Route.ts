
import Index from './index'
import Base from './01_base'
import ErrorModule from './02_error'
import Extend from './03_extend'

export default [{
    title: "rhine base",
    path: "/rhine/base",
    component: Base
}, {
    title: "rhine error",
    path: "/rhine/error",
    component: ErrorModule
}, {
    title: "rhine demo",
    path: "/rhine/error",
    component: Error
}, {
    title: "rhine demo",
    path: "/rhine/extend",
    component: Extend
}, {
    title: "rhine demo",
    path: "/rhine",
    component: Index
}]
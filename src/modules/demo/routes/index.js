import * as _ from 'lodash'

const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js')
const routes =  {
    title: '',
    path: '/demo',
    exact: false,
    children:[]
}
for (let index = 0; index < keys.length; index++) {
    const element = context(keys[index]);
    const defaultRoute = _.get(element,'default', {})
    routes.children.push(defaultRoute)
}
export default routes;
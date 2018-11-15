import * as _ from 'lodash';
import CommonIndex from 'Modules/common';
const context = require.context('./../../modules', true, /\/*\/routes\/index.js$/);

const keys = context.keys()

const routes = [
    {
        title: 'index',
        path: '/',
        exact: true,
        component: CommonIndex,
    }
]

keys.forEach(item => routes.push(_.get(context(item), 'default', {})))

const dealRoute = (routes,...routePath) => {
    const routers = []
    routes.forEach(item => {
        if(item.children && !item.component){
            dealRoute(item.children, ...routePath, item.path).forEach(element => routers.push(element));
        }else {
            routers.push(routePath.length > 0 ? {
                ...item,
                path: routePath.join('') + item.path
            }: item)
        }
    });
    return routers;
}
const routers = dealRoute(routes)
export default routers;
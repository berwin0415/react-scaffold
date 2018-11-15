import CommonIndex from 'Modules/common'
const context = require.context('./../../modules', true, /\/*\/routes\/index.js$/);

const keys = context.keys()

const routes = [
    {
        title: '',
        path: '/',
        exact: true,
        component: CommonIndex
    }
]
const a = context(keys[0])
export default routes;

const context = require.context('./', true, /.js$/);

const keys = context.keys().filter(item => item !== './index.js')

const routes =  {
    title: '',
    path: '/demo',
    exact: true,
    children:[]
}
console.log(keys);


export default routes;
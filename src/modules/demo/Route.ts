import Loadable from 'react-loadable'
import Page1 from './page1'
import { Spin } from 'antd';

// const Page1 = Loadable({
//     loader: () => import('./page1'),

// })

export default {
    title:"page1",
    path:'/demo/page1',
    component:Page1
}
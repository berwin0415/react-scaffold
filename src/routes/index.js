import Root from '../components/Root'
import Bundle from '../components/Bundle'

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Bundle(() => import('../pages/Home')),
      },
    ],
  },
]

export default routes

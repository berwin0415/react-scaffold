
import Home from '$modules/home';

interface Route {
    path: string
    component: any
    exact?: boolean
    title?: string

}

const context = (require as any).context('$modules', true, /\/*\/Route\.ts/)

const keys: [] = context.keys();

let routes: Route[] = [{
    title: '',
    path: '/',
    exact: true,
    component: Home
}]

for (const key of keys) {
    const routeContext = context(key)
    const route = routeContext.default ? routeContext.default : routeContext

    routes = Array.isArray(route) ? [...routes, ...route] : [...routes, route]
}

export default routes
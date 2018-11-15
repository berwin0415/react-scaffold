
import React from 'react';
import {Route, Redirect,Switch} from 'react-router';

export default function LayoutRoute({routes}){
    const routers = routes.map(item => (<Route key={item.path} {...item} />))
    return (
        <Switch>
            {routers}
            <Redirect from="*" to="/"></Redirect>
        </Switch>
    )
}
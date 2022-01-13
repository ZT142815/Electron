import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './containerWang/login';

const RouterWang = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path='/' component={Login} exact />
            </Switch>
            <Redirect to="/" />
        </HashRouter>
    )
}

export default RouterWang;
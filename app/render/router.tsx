import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Root from './container/root';
import Resume from './container/resume';

const Router = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path='/' component={Root} exact />
                <Route path='/resume' component={Resume} />
            </Switch>
            <Redirect to="/resume" />
        </HashRouter>
    )
}

export default Router;
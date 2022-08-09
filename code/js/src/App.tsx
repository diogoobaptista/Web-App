import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PublicAppRoute from './router/PublicAppRoute';
import PrivateRoute from './router/PrivateRoutes';
import appRoutes from './router/AppRoutes';
import publicRoutes from './router/PublicRoutes';
import NotFound from './pages/notFound'
import {
    Route,
} from "react-router-dom";


const App: React.FC = () => {

    return (
        <BrowserRouter>
            <div>
                <Switch>
                    {appRoutes.map(({ path, exact, component: C, ...rest }) => (
                        <PrivateRoute key={path.length} path={path} exact={exact} component={C} {...rest} />
                    ))}
                    {publicRoutes.map(({ path, exact, component: C, ...rest }) => (
                        <PublicAppRoute key={path.length} path={path} exact={exact} component={C} {...rest} />
                    ))}
                    <Route path='*' exact component={NotFound} />
                </Switch >
            </div>
        </BrowserRouter>
    );
};
export default App;
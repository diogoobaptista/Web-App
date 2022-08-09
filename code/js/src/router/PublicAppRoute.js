import React from "react";
import {
    Route,
    Redirect
} from "react-router-dom";
import { logged } from '../utils'

const PublicRoute = ({ component: Component, ...rest }) => {
    const loggedIn = logged();
    return (
        <>
            <Route {...rest} render={props =>
            (!loggedIn ?
                <div>
                    <Component {...props} />
                </div>

                : <Redirect to={'/home'} />)} />
        </>
    );
}


export default PublicRoute;
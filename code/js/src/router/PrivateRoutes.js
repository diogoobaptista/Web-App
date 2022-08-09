import React from "react";
import {
    Route,
    Redirect
} from "react-router-dom";
import { logged } from '../utils'
import Login from '../pages/login';
import Header from "../components/Header";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const loggedIn = logged();
    return (
        <>
            <Route {...rest} render={props =>
            (loggedIn ?
                <div>
                    <Header />
                    <Component {...props} />
                </div>

                : <Redirect to={Login} />)} />
        </>
    );
};
export default PrivateRoute;
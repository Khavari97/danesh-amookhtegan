import React from "react";
import {Redirect, Route, RouteProps} from 'react-router-dom'
import {isAuthenticated} from "../api/storage";
import {AuthRoutesEnum, HomeRoutesEnum} from "./RoutesEnum";
import Navbar from "../layouts/navbar/navbar";
import PublicNavbar from "../layouts/PublicNavbar/PublicNavbar";

export const ProtectedRoute: React.FC<RouteProps> = ({component: Component, ...rest}) => {
    return (
        (isAuthenticated()) ? <Navbar><Route {...rest} component={Component}/></Navbar>
            : <Route {...rest}><Redirect to={AuthRoutesEnum.SIGN_IN}/></Route>
    )
}

export const AuthRoute: React.FC<RouteProps> = ({component: Component, ...rest}) => {
    return (
        (isAuthenticated()) ? <Route {...rest}><Redirect to={HomeRoutesEnum.HOME}/></Route>
            : <Route {...rest} component={Component}/>
    )
}

// custom navbar that contain in public & protected Route
export const CombinedRoute: React.FC<RouteProps> = ({component: Component, ...rest}) => {
    return (
        (isAuthenticated()) ? <Navbar><Route {...rest} component={Component}/></Navbar>
            : <PublicNavbar><Route {...rest} component={Component}/></PublicNavbar>
    )
}
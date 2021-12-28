import React from 'react';
import {Redirect, Route, RouteProps, Switch} from 'react-router-dom';
import {Pages} from "../pages/Pages";
import {AuthRoute} from "./Routes";
import {AuthRoutesEnum, HomeRoutesEnum} from "./RoutesEnum";
import {handleSignOut} from "../api/storage";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Snackbar from "../components/material-ui/Snackbar/SnackbarUtils"

interface IRoute extends RouteProps {
    key: string,
    title?: string
}

const authRoutes: IRoute[] = [
    {key: 'SIGN_IN', path: AuthRoutesEnum.SIGN_IN, component: Pages.Auth.SignIn, title: "ورود"},
    {key: 'SIGN_UP', exact: true, path: AuthRoutesEnum.SIGN_UP, component: Pages.Auth.SignUp, title: "ورود"},
    {key: 'SIGN_UP_VERIFY', exact: true, path: AuthRoutesEnum.SIGN_UP_VERIFY, component: Pages.Auth.SetUserPassword},
    {key: 'SIGN_UP_SET_PROFILE', path: AuthRoutesEnum.SIGN_UP_SET_PROFILE, component: Pages.Auth.SetUserProfile},
    {key: 'FORGET_PASSWORD', path: AuthRoutesEnum.FORGET_PASSWORD, component: Pages.Auth.ForgetPassword},
    {key: 'RESET_PASSWORD', path: AuthRoutesEnum.RESET_PASSWORD, component: Pages.Auth.ResetPassword}
]

const AuthRouter = () => {
    return (
        <Switch>
            {authRoutes.map((route) => {
                return (<AuthRoute {...route}/>)
            })}
            <Route path={AuthRoutesEnum.SIGN_OUT}
                   render={() => {
                       handleSignOut()
                       Snackbar.success("خروج با موفقیت انجام شد")
                       return <Redirect to={HomeRoutesEnum.HOME}/>
                   }}
            />
            <Route path={"*"}><PageNotFound/></Route>
        </Switch>
    );
};

export default AuthRouter;
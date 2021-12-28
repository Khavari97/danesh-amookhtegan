import React from 'react';
import {RouteProps, Switch} from 'react-router-dom';
import UserProfile from "../pages/UserProfile/UserProfile";
import Profile from "../pages/UserProfile/PublicProfile/memberShip";
import {UserRoutesEnum} from "./RoutesEnum";
import {CombinedRoute, ProtectedRoute} from "./Routes";

interface IRoute extends RouteProps {
    key: string,
}

const UserRoutes: IRoute[] = [
    {key: 'USER_PROFILE', path: UserRoutesEnum.USER_PROFILE, component: UserProfile, exact: true},
]

const UserRouter = () => {
    return (
        <>
            <Switch>
                {UserRoutes.map((route) => {
                    return (<ProtectedRoute {...route} />)
                })}
                <CombinedRoute path={UserRoutesEnum.PUBLIC_PROFILE} component={Profile} exact/>
            </Switch>
        </>
    );
};

export default UserRouter;
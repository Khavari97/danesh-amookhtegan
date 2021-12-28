import React from 'react';
import {Route, RouteProps, Switch} from 'react-router-dom';
import {ProtectedRoute} from "./Routes";
import {DashboardRoutesEnum} from "./RoutesEnum";
import {Pages} from "../pages/Pages";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import { isAuthenticated } from '../api/storage';
import { PublicNavbar } from '../layouts/PublicNavbar/PublicNavbar';
import Navbar from '../layouts/navbar/navbar';

interface IRoute extends RouteProps {
    key: string,
}

const dashBoardRoutes: IRoute[] = [
    {key: 'DASHBOARD', path: DashboardRoutesEnum.DASHBOARD, component: DashboardHome, exact: true},
    {key: 'DESK_PROJECTS', path: DashboardRoutesEnum.DESK_PROJECTS, component: Pages.Dashboard.Desk, exact: true},
    {
        key: 'CREATE_PROJECT',
        path: DashboardRoutesEnum.CREATE_PROJECT,
        component: Pages.Dashboard.CreateProject,
        exact: true
    },
]

const DashboardRouter = () => {
    return (
        <Switch>
            {isAuthenticated() ?
                <Navbar>
                    {dashBoardRoutes.map((route) => {
                        return (<Route {...route}/>)
                    })}
                </Navbar>
                :
                <PublicNavbar>
                    {dashBoardRoutes.map((route) => {
                        return (<Route {...route}/>)
                    })}
                </PublicNavbar>
            }
            <Route path={"*"}><PageNotFound/></Route>
        </Switch>
    );
};

export default DashboardRouter;
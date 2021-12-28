import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom"
import AuthRouter from "./AuthRouter";
import HomeRouter from './HomeRouter'
import UserRouter from './UserRouter';
import DashboardRouter from "./DashboardRouter";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import ProjectRouter from "./ProjectRouter";
import {isAuthenticated} from "../api/storage";

const AppRouter = () => {
    return (
        <Switch>
            {
                isAuthenticated() ? <Redirect from={"/"} to={"/dashboard"} exact/>
                    : <Redirect from={"/"} to={"/home"} exact/>
            }
            <Route path={"/home"} strict><HomeRouter/></Route>
            <Route path={"/dashboard"} strict><DashboardRouter/></Route>
            <Route path={"/users"} strict><UserRouter/></Route>
            <Route path={"/auth"} strict><AuthRouter/></Route>
            <Route path={"/projects"} strict><ProjectRouter/></Route>
            <Route path={"*"}><PageNotFound/></Route>
        </Switch>
    );
};

export default AppRouter;

import React from "react";
import {Route, RouteProps, Switch} from 'react-router-dom';
import Project from "../pages/Project/Project";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import {CombinedRoute} from "./Routes";

interface IRoute extends RouteProps {
    key: string,
}

const projectRoutes: IRoute[] = [
    {key: 'project', path: '/projects/:slug', component: Project, exact: true},
]

const ProjectRouter = () => {
    return (
        <Switch>
            {projectRoutes.map((route) => {
                return (
                    <CombinedRoute {...route}/>
                )
            })}
            <Route path={"*"}><PageNotFound/></Route>
        </Switch>
    );
};

export default ProjectRouter;
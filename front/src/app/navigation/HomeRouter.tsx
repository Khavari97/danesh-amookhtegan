import React from 'react';
import {Route, RouteProps, Switch} from 'react-router-dom';
import {Pages} from "../pages/Pages";
import {HomeRoutesEnum} from "./RoutesEnum";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import PublicNavbar from "../layouts/PublicNavbar/PublicNavbar";
import Search from "../pages/Search/Search";
import {isAuthenticated} from "../api/storage";
import Navbar from "../layouts/navbar/navbar";

interface IRoute extends RouteProps {
    key: string,
}

const homeRoutes: IRoute[] = [
    {key: 'Home', path: HomeRoutesEnum.HOME, component: Pages.Home, exact: true},
    {key: 'Search', path: HomeRoutesEnum.SEARCH, component: Search, exact: true},
]

const HomeRouter = () => {
    return (
        <Switch>
            {isAuthenticated() ?
                <Navbar>
                    {homeRoutes.map((route) => {
                        return (<Route {...route}/>)
                    })}
                </Navbar>
                :
                <PublicNavbar>
                    {homeRoutes.map((route) => {
                        return (<Route {...route}/>)
                    })}
                </PublicNavbar>
            }

            <Route path={"*"}><PageNotFound/></Route>
        </Switch>
    );
};

export default HomeRouter;
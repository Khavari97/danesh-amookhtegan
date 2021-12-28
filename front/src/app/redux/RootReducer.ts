import {combineReducers} from "redux";
import {AuthReducer} from "./User/Auth/AuthReducer";
import {ProfileReducers} from "./User/Profile/ProfileReducer"
import {DashboardReducer, IDashboardState} from "./Dashboard/DashboardReducer";
import {ProjectReducer} from "./Project/ProjectReducer";
import {IProjectState} from "./Project/ActionTypes";
import {UsersReducers} from "./Users/UsersReducer";
import {ProjectsReducers} from "./Projects/ProjectsReducer";
import {ISearchState} from "./Search/ActionTypes";
import {SearchReducer} from "./Search/SearchReducer";


export const rootReducer = combineReducers({
    userAuthSignIn: AuthReducer.ReducerSignIn,
    userAuthSignUp: AuthReducer.ReducerSignup,
    userProfile: ProfileReducers.ProfileReducer,
    dashboard: DashboardReducer,
    project: ProjectReducer,
    Users: UsersReducers.UsersReducer,
    Projects: ProjectsReducers.ProjectsReducer,
    search: SearchReducer,
    page:SearchReducer
})

export type rootState = ReturnType<typeof rootReducer>

export interface IRootState {
    userAuthSignIn: any,
    userAuthSignUp: any,
    userProfile: any,
    dashboard: IDashboardState,
    project: IProjectState,
    Users: any,
    Projects: any,
    search: ISearchState,

}
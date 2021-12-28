import {combineReducers} from "redux";
import {DeskReducer} from "./Desk/DeskReducer";
import {DeskState} from "./Desk/ActionTypes";

export interface IDashboardState {
    desk: DeskState,
}

export const DashboardReducer = combineReducers({
    desk: DeskReducer,
})
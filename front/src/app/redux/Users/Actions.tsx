import {GET_Employers, GET_Users} from './ActionTypes'
import {Dispatch} from "redux";
import {apiClient} from "../../api/_api";

export const GetUsers = () =>
    (dispatch: Dispatch) => {
        try {
            apiClient.get("dashboard/users/?status=OTHER", {
                consoleMessage: true,
            })
                .then((response) => {
                    dispatch({
                        type: GET_Users,
                        users: response.results
                    })
                }).catch((error) => {

            });

        } catch {

        }

    }
export const GetEmployers = () =>
    (dispatch: Dispatch) => {
        try {
            apiClient.get("dashboard/users/?status=CREATOR", {
                consoleMessage: true,
            })
                .then((response) => {
                    dispatch({
                        type: GET_Employers,
                        employers: response.results
                    })
                }).catch((error) => {

            });

        } catch {

        }

    }
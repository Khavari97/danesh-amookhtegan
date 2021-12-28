import {Dispatch} from "redux";
import {apiClient} from "../../api/_api";
import {Get_Projects} from "./ActionTypes";

export const GetProjects = () =>

    (dispatch: Dispatch) => {
        try {
            apiClient.get("dashboard/projects/", {consoleMessage: true})
                .then((response => {
                    dispatch({
                        type: Get_Projects,
                        projects: response.results
                    })

                })).catch((error => {

            }))

        } catch {

        }


    }



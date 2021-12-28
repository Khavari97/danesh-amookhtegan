import {FETCH_FAIL, FETCH_SUCCESS, FetchDispatchTypes, IRequest, ISuccess, REQUEST,} from "./ActionTypes";
import {Dispatch} from "redux";
import {apiClient} from "../../../../api/_api";
import Snackbar from "../../../../components/material-ui/Snackbar/SnackbarUtils";

export const Request = (): IRequest => {
    return {
        type: REQUEST,
    };
};

export const FetchSuccess = (data: string): ISuccess => {
    return {
        type: FETCH_SUCCESS,
        payload: data,
    };
};

// if this works we should add user and pass
export const Api = (username: string, password: string) => (
    dispatch: Dispatch<FetchDispatchTypes>
) => {
    try {

        dispatch({
            type: REQUEST,
        });

        return apiClient
            .post("api/token/", {
                data: {
                    username: username,
                    password: password,
                },
            })
            .then((response) => {
                dispatch({
                    type: FETCH_SUCCESS,
                    payload: response.access,
                });
                localStorage.setItem("access", response.access);
                window.location.href = "/"
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_FAIL,
                    payload: error.data.detail,
                });
                Snackbar.error("رمز عبور یا نام کاربری اشتباه است.")
            });


    } catch (e) {
    }
};

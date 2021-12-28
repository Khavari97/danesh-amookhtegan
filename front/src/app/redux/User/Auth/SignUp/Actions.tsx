import {IPassword, SET_PASSWORD} from "./ActionTypes";

export const FetchSuccess = (password: string): IPassword => {
    return {
        type: SET_PASSWORD,
        payload: password
    }
}
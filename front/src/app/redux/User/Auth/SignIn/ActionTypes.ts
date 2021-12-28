export const REQUEST = 'REQUEST';
export let FETCH_SUCCESS = 'FETCH_SUCCESS';
export let FETCH_FAIL = 'FETCH_FAIL';

export interface IRequest {
    type: typeof REQUEST,
}

export interface ISuccess {
    type: typeof FETCH_SUCCESS,
    payload: string
}

export interface IFail {
    type: typeof FETCH_FAIL,
    payload: string
}


export interface IState {
    loading: boolean,
    res: string,
    error: string
}

export const INITIAL_STATE: IState = {
    loading: true,
    res: "",
    error: ""
}
export type FetchDispatchTypes = IFail | ISuccess | IRequest
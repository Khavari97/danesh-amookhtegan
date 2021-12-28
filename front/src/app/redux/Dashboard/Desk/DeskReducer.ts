import {DESK_LOADING, DESK_USER_PROJECTS, DESK_USER_REQUESTS, DeskActionTypes, DeskState} from "./ActionTypes";

const initialState: DeskState = {
    loading: true,
    projects: [],
    requests: [],
}

export const DeskReducer = (state = initialState, action: DeskActionTypes): DeskState => {
    switch (action.type) {
        case DESK_LOADING:
            return {
                ...state,
                loading: true
            }
        case DESK_USER_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                loading: false
            }
        case DESK_USER_REQUESTS :
            return {
                ...state,
                requests: action.payload,
                loading: false,
            }
        default:
            return {
                ...state
            }
    }
}
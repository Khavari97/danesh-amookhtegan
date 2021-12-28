import {IProjectActions, IProjectState, SET_PROJECT_SLUG} from "./ActionTypes";

const initialState: IProjectState = {
    loading: true,
    slug: "",
}

export const ProjectReducer = (state = initialState, action: IProjectActions): IProjectState => {
    switch (action.type) {
        case SET_PROJECT_SLUG:
            return {
                ...state,
                loading: false,
                slug: action.payload.slug,
                status: action.payload.status
            }
        default:
            return {
                ...state
            }
    }
}
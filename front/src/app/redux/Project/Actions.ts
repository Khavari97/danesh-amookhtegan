import {IProjectStatus, SET_PROJECT_SLUG} from "./ActionTypes";

export const setProjectAction = (slug: string, status: IProjectStatus) => {
    return {
        type: SET_PROJECT_SLUG,
        payload: {
            slug,
            status
        }
    }
}
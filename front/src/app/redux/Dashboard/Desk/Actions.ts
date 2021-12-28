import {DESK_LOADING, DESK_USER_PROJECTS, DESK_USER_REQUESTS, IProjectCard, IRequestedCard} from "./ActionTypes";

export const userProjectAction = (projects: IProjectCard[]) => {
    return {
        type: DESK_USER_PROJECTS,
        payload: projects,
        loading: false,
    }
}

export const userRequestAction = (requests: IRequestedCard[]) => {
    return {
        type: DESK_USER_REQUESTS,
        payload: requests,
        loading: false,
    }
}

export const deskLoading = () => {
    return {
        type: DESK_LOADING,
    }
}
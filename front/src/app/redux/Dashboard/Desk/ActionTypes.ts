export const DESK_USER_PROJECTS = "DESK_USER_PROJECTS";
export const DESK_USER_REQUESTS = "DESK_USER_REQUESTS";
export const DESK_LOADING = "DESK_LOADING";

export enum ProjectsStatus {
    WAITING = "WAITING",
    STARTED = "STARTED",
    ENDED = "ENDED",
    DELETED = "DELETED"
}

export interface IProjectCard {
    status: {
        code: ProjectsStatus,
        label: string
    },
    name: string,
    description: string,
    role: string,
    project?: number,
    url: string
}

export enum RequestsStatus {
    PENDING = "PENDING",
    DECLINED = "DECLINED"
}

export interface IRequestedCard {
    status: {
        code: RequestsStatus,
        label: string,
    },
    name: string,
    description: string,
    project?: number,
    url: string
}

export interface DeskState {
    loading: boolean,
    projects: IProjectCard[],
    requests: IRequestedCard[],
}


export interface IUserProjects {
    type: typeof DESK_USER_PROJECTS,
    payload: IProjectCard[],
}

export interface IUserRequests {
    type: typeof DESK_USER_REQUESTS,
    payload: IRequestedCard[],
}

export interface IDeskLoading {
    type: typeof DESK_LOADING,
    payload: boolean
}

export type DeskActionTypes = IUserProjects | IUserRequests | IDeskLoading;
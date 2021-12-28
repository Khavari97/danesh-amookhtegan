export const SET_PROJECT_SLUG = "SET_PROJECT_SLUG"

export interface IProjectState {
    loading: boolean,
    slug: string,
    status?: IProjectStatus,
}

export interface IProjectStatus {
    name: string,
    status: {
        code: string;
        label: string;
    },
    role: {
        code: string;
        label: string;
    }
}

export interface ISetProjectSlug {
    type: typeof SET_PROJECT_SLUG,
    payload: {
        slug: string,
        status: IProjectStatus
    }
}

export type IProjectActions = ISetProjectSlug
export const Get_Projects = 'Get_Projects'

export interface IGetProjects {
    type: typeof Get_Projects,
    projects: any
}

interface IState {
    projects: any;
}

export const INITIAL_STATE: IState = {
    projects: [],

}

export type ProjectsTypes = IGetProjects
export const GET_Users = 'GET_Users'
export const GET_Employers = 'GET_Employers'

export interface IGetUsers {
    type: typeof GET_Users,
    users: any
}

export interface IGetEmployer {
    type: typeof GET_Employers,
    employers: any
}

interface IState {
    users: any;
    employers: any;
    loading: boolean
}

export const INITIAL_STATE: IState = {
    users: [],
    employers: [],
    loading: true,


}
export type UsersTypes = IGetUsers | IGetEmployer;
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_PROFILE = 'SET_PROFILE';

export interface IState {
    password: string,
    profile: object,
}

export interface IPassword {
    type: typeof SET_PASSWORD;
    payload: string;
}

export interface IProfile {
    type: typeof SET_PROFILE;
    payload: object;
}

export const INITIAL_STATE: IState = {
    password: '',
    profile: {},
}

export type SignUpTypes = IPassword | IProfile
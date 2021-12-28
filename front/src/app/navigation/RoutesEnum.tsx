export enum AuthRoutesEnum {
    SIGN_IN = '/auth/signin',
    SIGN_UP = '/auth/signup',
    SIGN_UP_SET_PROFILE = '/auth/signup/verify/set-profile',
    SIGN_UP_VERIFY = '/auth/signup/verify',
    SIGN_OUT = '/auth/signout',
    FORGET_PASSWORD = '/auth/forget-password',
    RESET_PASSWORD = '/auth/reset-password'
}


export enum DashboardRoutesEnum {
    DASHBOARD = "/dashboard",
    DESK_PROJECTS = '/dashboard/desk/projects/',
    CREATE_PROJECT = '/dashboard/project/create'
}


export enum HomeRoutesEnum {
    HOME = '/home',
    SEARCH = "/home/search"
}

export enum UserRoutesEnum {
    USER_PROFILE = '/users/profile',
    PUBLIC_PROFILE = '/users/:slug',
}
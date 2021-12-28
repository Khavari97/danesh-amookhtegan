import {
    ISearchActions,
    ISearchState,
    SEARCH_PAGE,
    SET_SEARCH_LOADING,
    SET_SEARCH_PROJECTS,
    SET_SEARCH_TEXT,
    SET_SEARCH_USERS,
    SET_FILTER_CATEGORY_PROJECTS,
    SET_PROJECT_CATAGORY,
    SET_PROJECT_STATUS,
    SET_FILTER_USERS,
    SEARCH_USERS_PAGE,
    SET_USER_UNIVERSITY,
    SET_USER_PROVINCE,
    SET_USER_CITY,
    GET_ALL_SKILLS,
    SET_USER_SKILL,
    SET_PROJECT_SKILL
} from "./ActionTypes";

const initialState: ISearchState = {
    text: "",
    page: 1,
    allSkills: [],
    countPages: 0,
    loading: true,
    projects: [],
    users: [],
    project_category: '',
    project_status: '',
    project_skill: '',
    pageUsers: 1,
    countUserPages: 0,
    user_university: '',
    user_province: '',
    user_city: '',
    user_skill: ''
}

export const SearchReducer = (state = initialState, action: ISearchActions): ISearchState => {
    switch (action.type) {
        case SET_SEARCH_TEXT:
            return {
                ...state,
                text: action.text,
                page:1,
                pageUsers:1
            }
        case SET_SEARCH_PROJECTS:
            return {
                ...state,
                loading: false,
                projects: action.payload.projects
            }
        case SET_SEARCH_USERS:
            return {
                ...state,
                loading: false,
                users: action.payload.users
            }
        case SET_SEARCH_LOADING:
            return {
                ...state,
                loading: true
            }
        case SEARCH_PAGE:
            return {
                ...state,
                loading: false,
                page: action.page
            }
        case GET_ALL_SKILLS:
            return {
                ...state,
                allSkills: action.allSkills,
            }
        case SET_FILTER_CATEGORY_PROJECTS:
            return {
                ...state,
                loading: false,
                projects: action.projects,
                countPages: action.countPages
            }
        case SET_PROJECT_CATAGORY:
            return {
                ...state,
                loading: false,
                project_category: action.project_category,
                page: 1
            }
        case SET_PROJECT_STATUS:
            return {
                ...state,
                loading: false,
                project_status: action.project_status,
                page: 1
            }
        case SET_FILTER_USERS:
            return {
                ...state,
                loading: false,
                users: action.users,
                countUserPages: action.countUserPages
            }
        case SEARCH_USERS_PAGE:
            return {
                ...state,
                loading: false,
                pageUsers: action.pageUsers
            }
        case SET_USER_UNIVERSITY:
            return {
                ...state,
                loading: false,
                user_university: action.user_university,
                pageUsers: 1
            }
        case SET_USER_PROVINCE:
            return {
                ...state,
                loading: false,
                user_province: action.user_province,
                pageUsers: 1
            }
        case SET_USER_CITY:
            return {
                ...state,
                loading: false,
                user_city: action.user_city,
                pageUsers: 1
            }
        case SET_USER_SKILL:
            return {
                ...state,
                loading: false,
                user_skill: action.user_skill,
                pageUsers: 1
            }
        case SET_PROJECT_SKILL:
            return {
                ...state,
                loading: false,
                project_skill: action.project_skill,
                page: 1
            }
        default:
            return {
                ...state
            }
    }
}
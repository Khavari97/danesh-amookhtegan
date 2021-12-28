export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT"
export const SET_SEARCH_LOADING = "SET_SEARCH_LOADING"
export const SET_SEARCH_PROJECTS = "SET_SEARCH_PROJECTS"
export const SET_SEARCH_USERS = "SET_SEARCH_USERS"
export const SEARCH_PAGE = "SEARCH_PAGE"
export const SET_FILTER_CATEGORY_PROJECTS = "SET_FILTER_CATEGORY_PROJECTS"
export const SET_PROJECT_CATAGORY = "SET_PROJECT_CATAGORY"
export const SET_PROJECT_SKILL = "SET_PROJECT_SKILL"
export const SET_PROJECT_STATUS = "SET_PROJECT_STATUS"
export const SET_FILTER_USERS = "SET_FILTER__USERS"
export const SEARCH_USERS_PAGE = "SEARCH_USERS_PAGE"
export const SET_USER_UNIVERSITY = "SET_USER_UNIVERSITY"
export const SET_USER_PROVINCE = "SET_USER_PROVINCE"
export const SET_USER_CITY = "SET_USER_CITY"
export const SET_USER_SKILL = "SET_USER_SKILL"
export const GET_ALL_SKILLS = "GET_ALL_SKILLS"

export interface ISearchState {
    text: string,
    page: number,
    allSkills: [],
    countPages: number,
    loading: boolean,
    projects: [],
    users: [],
    project_category: string,
    project_status: string,
    project_skill: string,
    pageUsers: number,
    countUserPages: number,
    user_university: string,
    user_province: string,
    user_city: string,
    user_skill: string
}
export interface IGetAllSkills {
    type: typeof GET_ALL_SKILLS,
    allSkills: []
}

export interface ISetUserSkill {
    type: typeof SET_USER_SKILL,
    user_skill: string
}
export interface ISetUserCity {
    type: typeof SET_USER_CITY,
    user_city: string
}

export interface ISetUserProvince {
    type: typeof SET_USER_PROVINCE,
    user_province: string
}

export interface ISetUserUniversity {
    type: typeof SET_USER_UNIVERSITY,
    user_university: string
}

export interface ISetProjectCategory {
    type: typeof SET_PROJECT_CATAGORY,
    project_category: string
}
export interface ISetProjectSkill {
    type: typeof SET_PROJECT_SKILL,
    project_skill: string
}

export interface ISetProjectStatus {
    type: typeof SET_PROJECT_STATUS,
    project_status: string
}

export interface ISetSearchText {
    type: typeof SET_SEARCH_TEXT,
    text: string
}

export interface ISearchLoading {
    type: typeof SET_SEARCH_LOADING,
}

export interface ISearchProject {
    type: typeof SET_SEARCH_PROJECTS
    payload: {
        projects: []
    }
}

export interface ISearchUsers {
    type: typeof SET_SEARCH_USERS
    payload: {
        users: []
    }
}

export interface ISearchPage {
    type: typeof SEARCH_PAGE
    page: number
}

export interface ISetFilterCategoryProjects {
    type: typeof SET_FILTER_CATEGORY_PROJECTS
    projects: any,
    countPages: number
}

export interface ISetFilterUsers {
    type: typeof SET_FILTER_USERS
    users: any,
    countUserPages: number
}
export interface ISearchUsersPage {
    type: typeof SEARCH_USERS_PAGE
    pageUsers: number
}


export type ISearchActions = ISetSearchText
    | ISearchLoading | ISearchProject | ISearchUsers
    | ISearchPage | ISetFilterCategoryProjects
    | ISetProjectCategory | ISetProjectStatus | ISetFilterUsers
    | ISearchUsersPage | ISetUserUniversity
    | ISetUserProvince | ISetUserCity | IGetAllSkills
    | ISetUserSkill | ISetProjectSkill
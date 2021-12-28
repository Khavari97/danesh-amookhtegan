import { Dispatch } from "redux";
import { apiClient } from "../../api/_api";
import {
    SET_SEARCH_LOADING,
    SET_SEARCH_PROJECTS,
    SET_SEARCH_USERS,
    SET_FILTER_CATEGORY_PROJECTS,
    SEARCH_PAGE,
    SET_SEARCH_TEXT,
    SET_PROJECT_CATAGORY,
    SET_PROJECT_STATUS,
    SET_PROJECT_SKILL,
    SET_FILTER_USERS,
    SEARCH_USERS_PAGE,
    SET_USER_UNIVERSITY,
    SET_USER_PROVINCE,
    SET_USER_CITY,
    GET_ALL_SKILLS,
    SET_USER_SKILL
} from "./ActionTypes";


export const setProjectCategory = (category: string) => {
    return {
        type: SET_PROJECT_CATAGORY,
        project_category: category
    }
}

export const setProjectSkill = (skill: string) => {
    return {
        type: SET_PROJECT_SKILL,
        project_skill: skill
    }
}

export const setUserSkill = (skill: string) => {
    return {
        type: SET_USER_SKILL,
        user_skill: skill
    }
}
export const setUserUniversity = (university: string) => {
    return {
        type: SET_USER_UNIVERSITY,
        user_university: university
    }
}

export const setUserProvince = (province: string) => {
    return {
        type: SET_USER_PROVINCE,
        user_province: province
    }
}
export const setUserCity = (city: string) => {
    return {
        type: SET_USER_CITY,
        user_city: city
    }
}

export const setProjectStatus = (status: string) => {
    return {
        type: SET_PROJECT_STATUS,
        project_status: status
    }
}

export const setSearchText = (text: string) => {
    return {
        type: SET_SEARCH_TEXT,
        text: text
    }
}

export const setSearchLoading = () => {
    return {
        type: SET_SEARCH_LOADING,
    }
}


export const setSearchProjects = (projects: []) => {
    return {
        type: SET_SEARCH_PROJECTS,
        payload: {
            projects: projects
        }
    }
}

export const setSearchUsers = (users: []) => {
    return {
        type: SET_SEARCH_USERS,
        payload: {
            users: users
        }
    }
}


export const searchPage = (page: number) => {
    return {
        type: SEARCH_PAGE,
        page: page
    }
}


export const searchUsersPage = (page: number) => {
    return {
        type: SEARCH_USERS_PAGE,
        pageUsers: page
    }
}

export const Filter = (status: string, category: string, skill: string, text: string, page: number) => (
    dispatch: Dispatch
) => {
    try {
        apiClient
            .get(`dashboard/projects/?search=${text}&category=${category}&skill=${skill}&status=${status}&page=${page}`, {
                consoleMessage: true,
            })
            .then((response) => {
                dispatch({
                    type: SET_FILTER_CATEGORY_PROJECTS,
                    projects: response.results,
                    countPages: Math.ceil(response.count / 6)
                });
            })
            .catch((error) => {
            });
    } catch {
    }
}

export const FilterUsers = (university: string, skill: string, city: string, province: string, searchText: string, page: number) => (
    dispatch: Dispatch
) => {
    try {
        apiClient
            .get(`dashboard/users/?search=${searchText}&university=${university}&skill=${skill}&city=${city}&province=${province}&page=${page}`, {
                consoleMessage: true,
            })
            .then((response) => {
                console.log(Math.ceil(response.count / 6))
                dispatch({
                    type: SET_FILTER_USERS,
                    users: response.results,
                    countUserPages: Math.ceil(response.count / 6)
                });
            })
            .catch((error) => {
            });
    } catch {
    }
}

export const getAllSkills = () => (
    dispatch: Dispatch
) => {
    try {
        apiClient
            .get(`list/skills/?all=true`, {
                consoleMessage: true,
            })
            .then((response) => {
                dispatch({
                    type: GET_ALL_SKILLS,
                    allSkills: response,
                });
            })
            .catch((error) => {
            });
    } catch {
    }
}


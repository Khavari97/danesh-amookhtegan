import {
    GET_AVATAR,
    GET_BRIEF_PROFILE,
    GET_PARENT_SKILLS,
    GET_PROFILE,
    GET_SKILLS,
    SET_CITIES,
    SET_PROVINCES,
    SET_UNIVERSITY
} from "./ActionTypes";
import {Dispatch} from "redux";
import {apiClient, defaultConfig} from "../../../api/_api";
import Snackbar from "./../../../components/material-ui/Snackbar/SnackbarUtils";


export const GetBriefProfile = () => (
    dispatch: Dispatch
) => {
    try {
        return apiClient
            .get("user/brief-profile/", {
                consoleMessage: true,
            })
            .then((response) => {
                dispatch({
                    type: GET_BRIEF_PROFILE,
                    briefprofile: response,
                    avatar: response.avatar
                });
            })
            .catch((error) => {
            });
    } catch {
    }
}


export const GetAvatar = () => (
    dispatch: Dispatch
) => {
    try {
        return apiClient
            .get("user/profile/avatar/", {
                consoleMessage: true,
                headers: {...defaultConfig.headers, 'Content-Type': 'multipart/form-data'}
            })
            .then((response) => {
                dispatch({
                    type: GET_AVATAR,
                    avatar: response.avatar,
                });

            })
            .catch((error) => {
            });
    } catch {
    }
}


export const FilterCity = (code: number | string) => (
    dispatch: Dispatch
) => {
    try {
        return apiClient
            .get("list/cities/?province=" + code, {
                consoleMessage: true,
            })
            .then((response) => {
                dispatch({
                    type: SET_CITIES,
                    payload: response,
                });
            })
            .catch((error) => {
            });
    } catch {
    }
}

export const GetSkills = () =>  (
    dispatch: Dispatch
) => {
    try {
        return apiClient.get("user/profile/skills/").then((response: any) => {
            dispatch({
                type: GET_SKILLS,
                skills: response.skills
            });
        })
            .catch(() => {
                Snackbar.error("خطایی رخ داده لطفا دوباره امتحان کنید")
            })
    } catch {
    }
}


export const GetParentSkills = () => async (
    dispatch: Dispatch
) => {
    try {
        return apiClient.get('list/skills/').then(async (response: any) => {
            response.map((element: any, index: number) => {
                element.isAdd = false
            })
            dispatch({
                type: GET_PARENT_SKILLS,
                parentSkills: response,
            });
        })
            .catch(() => {
                Snackbar.error("خطایی رخ داده لطفا دوباره امتحان کنید")
            })
    } catch {


    }
}


export const GetProfile = () => async (
    dispatch: Dispatch
) => {
    try {
        await apiClient.get("user/profile/", {notifyMessage: true}).then((response: any) => {
            const c = 'description';
            const description = response.description
            const {[c]: _, ...withoutDescripe} = response;
            let data = {
                firstName: withoutDescripe.firstName,
                lastName: withoutDescripe.lastName,
                username: withoutDescripe.username,
                email: withoutDescripe.email,
                province: (withoutDescripe.city) ? (withoutDescripe.city.province) ? withoutDescripe.city.province.name : null : null,
                university: (withoutDescripe.university) ? withoutDescripe.university.name : null,
                city: (withoutDescripe.city) ? withoutDescripe.city.name : null,
                cityObject: (withoutDescripe.city) ? withoutDescripe.city.id : null,
                provinceObject: (withoutDescripe.city) ? (withoutDescripe.city.province) ? withoutDescripe.city.province.id : null : null,
                universityObject: (withoutDescripe.university) ? withoutDescripe.university.id : null,
                phoneNumber: withoutDescripe.phoneNumber,
                genderDisplay: withoutDescripe.genderDisplay,
                gender: (withoutDescripe.gender) ? withoutDescripe.gender : null,
            }
            dispatch({
                type: GET_PROFILE,
                data: data,
                description: description
            });
        })
    } catch {
    }
}

export const ProvinceApi = () => (
    dispatch: Dispatch
) => {

    try {
        apiClient
            .get("list/provinces/", {
                consoleMessage: true,
            })
            .then((response) => {
                dispatch({
                    type: SET_PROVINCES,
                    payload: response,
                });
            })

        apiClient
            .get("list/cities/", {
                consoleMessage: true,
            })
            .then((response) => {
                dispatch({
                    type: SET_CITIES,
                    payload: response,
                });
            })

        apiClient
            .get("list/universities/", {
                consoleMessage: true,
            })
            .then((response) => {
                dispatch({
                    type: SET_UNIVERSITY,
                    payload: response,
                });
            })
    } catch (e) {
    }
};

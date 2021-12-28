import {
    GET_AVATAR,
    GET_BRIEF_PROFILE,
    GET_PARENT_SKILLS,
    GET_PROFILE,
    GET_RESUME,
    GET_SKILLS,
    INITIAL_STATE,
    IState,
    ProfileTypes,
    SET_CITIES,
    SET_DECRIPTION,
    SET_PROVINCES,
    SET_UNIVERSITY
} from "./ActionTypes";


const ReducerProfile = (state = INITIAL_STATE, action: ProfileTypes): IState => {
    switch (action.type) {
        case SET_PROVINCES: {
            return {
                ...state,
                provinces: action.payload
            }
        }
        case SET_CITIES: {
            return {
                ...state,
                cities: action.payload
            }
        }
        case SET_UNIVERSITY: {
            return {
                ...state,
                universities: action.payload
            }
        }
        case SET_DECRIPTION: {
            return {
                ...state,
                description: action.payload
            }
        }
        case GET_PROFILE: {
            return {
                ...state,
                data: action.data,
                description: action.description,
                loading: false
            }
        }
        case GET_PARENT_SKILLS: {
            return {
                ...state,
                parentSkills: action.parentSkills,
            }
        }
        case GET_SKILLS: {
            return {
                ...state,
                skills: action.skills,
            }
        }
        case GET_RESUME: {
            return {
                ...state,
                resume: action.resume,
            }
        }
        case GET_AVATAR: {
            return {
                ...state,
                avatar: action.avatar,
            }
        }
        case GET_BRIEF_PROFILE: {
            return {
                ...state,
                briefprofile: action.briefprofile,
                avatar: action.avatar
            }
        }
        default:
            return state
    }

}

export default ReducerProfile
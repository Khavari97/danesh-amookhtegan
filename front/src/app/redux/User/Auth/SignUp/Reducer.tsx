import {INITIAL_STATE, IState, SET_PASSWORD, SET_PROFILE, SignUpTypes} from "./ActionTypes";


const ReducerSignup = (state = INITIAL_STATE, action: SignUpTypes): IState => {
    switch (action.type) {
        case SET_PASSWORD: {
            return {
                ...state,
                password: action.payload
            }
        }

        case SET_PROFILE: {
            return {
                ...state,
                profile: action.payload
            }
        }
        default:
            return state
    }

}


export default ReducerSignup
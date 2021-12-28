import {FetchDispatchTypes, INITIAL_STATE, IState} from "./ActionTypes";


const ReducerSignIn = (state = INITIAL_STATE, action: FetchDispatchTypes): IState => {
    switch (action.type) {
        case 'REQUEST': {
            return {
                ...state,
                loading: true
            }
        }

        case 'FETCH_SUCCESS': {
            return {
                ...state,
                loading: false,
                res: action.payload
            }
        }
        case 'FETCH_FAIL': {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        default:
            return state
    }

}


export default ReducerSignIn
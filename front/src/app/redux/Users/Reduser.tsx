import {GET_Employers, GET_Users, INITIAL_STATE, UsersTypes} from "./ActionTypes";

const ReduserUsers = (state = INITIAL_STATE, action: UsersTypes) => {

    switch (action.type) {
        case GET_Users: {
            return {
                ...state,
                users: action.users,
                loading: false
            }
        }
        case GET_Employers: {
            return {
                ...state,
                employers: action.employers
            }
        }
        default:
            return state
    }

}
export default ReduserUsers
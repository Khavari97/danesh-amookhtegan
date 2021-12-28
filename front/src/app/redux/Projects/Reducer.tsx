import {Get_Projects, INITIAL_STATE, ProjectsTypes} from "./ActionTypes";

const ReducerProjects = (state = INITIAL_STATE, action: ProjectsTypes) => {
    switch (action.type) {
        case Get_Projects: {
            return {
                ...state,
                projects: action.projects
            }
        }
        default:
            return state
    }
}
export default ReducerProjects
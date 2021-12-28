import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import Reducer from "./SearchReducer";
import { actionsToStateSnapshot } from 'redux-state-snapshot';
import {SET_SEARCH_TEXT,SET_SEARCH_PROJECTS,SET_SEARCH_USERS} from "./ActionTypes";
import {setSearchText,setSearchProjects, setSearchUsers} from "./Actions";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('test redux ',()=>{

    it('should dispatch action of search text',()=>{
        const search = (text) => ({ type: SET_SEARCH_TEXT, payload: text })
        const mock_text = "java";
        const createState = initialState => actions => actions.reduce(Reducer, initialState);
        const initialState = createState({
              text: '',
        });
        const store = mockStore(initialState);
        store.dispatch(setSearchText(mock_text));

        const actions = store.getActions()

        expect(actions[0]).toBeTruthy();
        expect(actions[0]).toEqual(setSearchText(mock_text));

    })

     it('should dispatch action of search projects',()=>{
         const search = (projects) => ({ type: SET_SEARCH_PROJECTS, payload:projects })
         const mock_projects = "java";
         const createState = initialState => actions => actions.reduce(Reducer, initialState);
         const initialState = createState({
              projects: '',
         });
         const store = mockStore(initialState);
         store.dispatch(setSearchProjects(mock_projects));

         const actions = store.getActions()

         expect(actions[0]).toBeTruthy();
         expect(actions[0]).toEqual(setSearchProjects(mock_projects));

   })

     it('should dispatch action of search users',()=>{
         const search = (users) => ({ type: SET_SEARCH_USERS, payload: users })
         const mock_users = "java";
         const createState = initialState => actions => actions.reduce(Reducer, initialState);
         const initialState = createState({
              users: '',
         });
         const store = mockStore(initialState);
         store.dispatch(setSearchUsers(mock_users));

         const actions = store.getActions()

         expect(actions[0]).toBeTruthy();
         expect(actions[0]).toEqual(setSearchUsers(mock_users));

   })

   it('to snapshot on failure', () => {
    const actionStateSnapshot = actionsToStateSnapshot([thunk])

    function fetchDataFailure() {

    }

    actionStateSnapshot(() => fetchDataFailure(), Reducer)
    })

    it('to snapshot on success', () => {
    const actionStateSnapshot = actionsToStateSnapshot();
    actionStateSnapshot(() => setSearchText('java'), Reducer)
     })
})
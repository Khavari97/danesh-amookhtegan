import configureStore from 'redux-mock-store';
import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk";
import Reducer from "./UsersReducer";
import { actionsToStateSnapshot } from 'redux-state-snapshot';
import {GET_Users,INITIAL_STATE} from "./ActionTypes";
import {GetUsers} from "./Actions";
import moxios from 'moxios';
import { apiUrl } from "../../api/_api";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const createState = initialState => actions => actions.reduce(Reducer, initialState);
const initialState = createState(INITIAL_STATE);

describe('redux',()=>{
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('test',()=>{
        const store = mockStore(initialState)
        const mock_res = {
           users : "zahra"
        }
        moxios.stubRequest(apiUrl + `dashboard/users/?status=OTHER`,{
            status: 200, response: mock_res
        });
        const actions = store.getActions();
        store.dispatch(GetUsers(mock_res));
        expect(actions[0]).toBeUndefined();
    })

    it('to snapshot on failure', () => {
       const actionStateSnapshot = actionsToStateSnapshot([thunk])

       function fetchDataFailure() {

    }

       actionStateSnapshot(() => fetchDataFailure(), Reducer)
    })

    it('to snapshot on success', () => {
       const actionStateSnapshot = actionsToStateSnapshot()
       actionStateSnapshot(() => GetUsers('zahra'), Reducer)
    })
})




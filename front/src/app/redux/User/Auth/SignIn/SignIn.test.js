import configureStore from 'redux-mock-store'
import { applyMiddleware, createStore } from 'redux'
import thunk from "redux-thunk";
import Reducer from "./Reducer";
import { actionsToStateSnapshot } from 'redux-state-snapshot'
import { FETCH_SUCCESS, FETCH_FAIL, REQUEST } from "./ActionTypes";
import moxios from 'moxios';
import { apiUrl } from '../../../../api/_api';
import { Api, FetchSuccess } from './Actions';

const mock_access_token = "1234567"
const mock_user_name = "atena"
const mock_password = "456"

const middlewares = [thunk]
const mockStore = configureStore(middlewares)


it('should dispatch action', () => {
    moxios.install();
    moxios.stubRequest(apiUrl + `api/token/`, {
        status: 200, response: {
            access: mock_access_token,
        },
    });
    // Initialize mockstore with empty state
    const createState = initialState => actions => actions.reduce(Reducer, initialState);
    const initialState = createState({
        loading: true,
        res: "",
        error: ""
    });
    const store = mockStore(initialState)
    const actions = store.getActions()


    return store.dispatch(Api(mock_user_name, mock_password)).then(() => {

        let dispatchedActions = actions
        let dispatchedTypes = dispatchedActions.map(action => action.type)
        expect(dispatchedTypes).toEqual([REQUEST,FETCH_SUCCESS])

        expect(actions[0]).toEqual({
            type: REQUEST,
        });
        const state = store.getState()
        expect(actions[1]).toEqual(FetchSuccess(mock_access_token));
        expect(state).toEqual({
            loading: false,
            res: mock_access_token,
            error: ""
        });
    });

})

// it('not dispatch action', () => {
//     moxios.install();
//     moxios.stubRequest(apiUrl + `api/token/`, {
//         status: 400,
//     });
//     // Initialize mockstore with empty state
//     const createState = initialState => actions => actions.reduce(Reducer, initialState);
//     const initialState = createState({
//         loading: true,
//         res: "",
//         error: ""
//     });
//     const store = mockStore(initialState)
//     const actions = store.getActions()


//     return store.dispatch(Api(mock_user_name, mock_password)).then(() => {
        
//         expect(actions[0]).toEqual({
//             type: REQUEST,
//         });
//         const state = store.getState()
 



//         expect(actions[1]).toEqual(FetchSuccess(mock_access_token));
//         expect(state).toEqual({
//             loading: false,
//             res: mock_access_token,
//             error: ""
//         });
//     });

// })

it('to snapshot on failure', () => {
    const actionStateSnapshot = actionsToStateSnapshot([thunk])
    actionStateSnapshot(() => fetchDataFailure(), Reducer)
})
it('to snapshot on success', () => {
    const actionStateSnapshot = actionsToStateSnapshot()
    actionStateSnapshot(() => FetchSuccess('test'), Reducer)
})
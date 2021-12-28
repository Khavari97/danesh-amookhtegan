import configureStore from 'redux-mock-store'
import { applyMiddleware, createStore } from 'redux'
import thunk from "redux-thunk";
import Reducer from "./Reducer";
import { actionsToStateSnapshot } from 'redux-state-snapshot'
import { INITIAL_STATE, IState, SET_PASSWORD, SET_PROFILE, SignUpTypes } from "./ActionTypes";


const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const mock_password = "1234567"

const setPassword = (password) => ({ type: SET_PASSWORD, payload: password })

it('should dispatch action', () => {

    // Initialize mockstore with empty state

    const createState = initialState => actions => actions.reduce(Reducer, initialState);
    const initialState = createState({
        password: '',
        profile: {},
    });
    const store = mockStore(initialState)

    // Dispatch the action
    store.dispatch(setPassword(mock_password))

    const actions = store.getActions()
    const state = store.getState()
    // Test if your store dispatched the expected actions
    expect(actions[0]).toEqual(setPassword(mock_password));
    // Test if your store dispatched the expected states

    expect(state).toEqual({
        password: mock_password,
        profile: {},
    });

})

it('to snapshot on failure', () => {
    const actionStateSnapshot = actionsToStateSnapshot([thunk])
    actionStateSnapshot(() => fetchDataFailure(), Reducer)
})
it('to snapshot on success', () => {
    const actionStateSnapshot = actionsToStateSnapshot()
    actionStateSnapshot(() => setPassword('123456'), Reducer)
})
import configureStore from 'redux-mock-store'
import { applyMiddleware, createStore } from 'redux'
import thunk from "redux-thunk";
import Reducer from "./Reducer";
import { actionsToStateSnapshot } from 'redux-state-snapshot'
import {
    GET_BRIEF_PROFILE, INITIAL_STATE, GET_AVATAR, SET_CITIES, GET_SKILLS,
    GET_PARENT_SKILLS, GET_PROFILE, SET_PROVINCES, SET_UNIVERSITY
} from "./ActionTypes";
import moxios from 'moxios';

import { GetBriefProfile, GetAvatar, FilterCity, GetSkills, GetParentSkills, GetProfile, ProvinceApi } from './Actions';
import { apiUrl } from '../../../api/_api';


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const createState = initialState => actions => actions.reduce(Reducer, initialState);
const initialState = createState(INITIAL_STATE);


describe('test redux state and async actions', () => {
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('GetBriefProfile', () => {
        const store = mockStore(initialState)
        const mock_res = {
            avatar: "http://api.planb.markop.ir/media/defaults/default.png",
            firstName: "آتنا",
            lastName: "گنجی",
            username: "atena",
        }

        moxios.stubRequest(apiUrl + `user/brief-profile/`, {
            status: 200, response: mock_res,
        });


        const actions = store.getActions()

        // Dispatch the action
        return store.dispatch(GetBriefProfile()).then(() => {
            //checked types of actions
            let dispatchedActions = actions
            let dispatchedTypes = dispatchedActions.map(action => action.type)
            expect(dispatchedTypes).toEqual([GET_BRIEF_PROFILE])

            expect(actions[0]).toEqual({
                type: GET_BRIEF_PROFILE,
                briefprofile: mock_res,
                avatar: mock_res.avatar
            });
            const state = store.getState()
            expect(state).toEqual({
                ...INITIAL_STATE,
                briefprofile: mock_res,
                avatar: mock_res.avatar
            });
        })
    })

    it('GetAvatar', () => {

        const store = mockStore(initialState)
        const mock_res = {
            avatar: "http://api.planb.markop.ir/media/defaults/default.png",
        }

        moxios.stubRequest(apiUrl + `user/profile/avatar/`, {
            status: 200, response: mock_res,
        });

        const actions = store.getActions()

        // Dispatch the action

        return store.dispatch(GetAvatar()).then(() => {

            let dispatchedActions = actions
            let dispatchedTypes = dispatchedActions.map(action => action.type)
            expect(dispatchedTypes).toEqual([GET_AVATAR])

            const state = store.getState()
            expect(actions[0]).toEqual({
                type: GET_AVATAR,
                avatar: mock_res.avatar
            });
            expect(state).toEqual({
                ...INITIAL_STATE,
                avatar: mock_res.avatar
            });

        })
    })

    it('FilterCity', () => {
        const store = mockStore(initialState)
        const mock_res = [{
            code: "0584",
            id: 1932,
            name: "بجنورد",
            province: { id: 12, code: "12", name: "خراسان شمالی" }
        }]
        const mock_code = 12

        moxios.stubRequest(apiUrl + `list/cities/?province=` + mock_code, {
            status: 200, response: mock_res,
        });
        const actions = store.getActions()
        // Dispatch the action
        return store.dispatch(FilterCity(mock_code)).then(() => {

            //checked types of actions
            let dispatchedActions = actions
            let dispatchedTypes = dispatchedActions.map(action => action.type)
            expect(dispatchedTypes).toEqual([SET_CITIES])

            const state = store.getState()
            expect(actions[0]).toEqual({
                type: SET_CITIES,
                payload: mock_res,
            });
            expect(state).toEqual({
                ...INITIAL_STATE,
                cities: mock_res
            });

        })
    })


    it('GetSkills', () => {
        const store = mockStore(initialState)
        const mock_res = {
            skills: [{
                code: "1",
                id: 51,
                image: null,
                name: "برنامه نویسی",
                skill: null,
            }]
        }


        moxios.stubRequest(apiUrl + `user/profile/skills/`, {
            status: 200, response: mock_res,
        });

        const actions = store.getActions()

        // Dispatch the action
        return store.dispatch(GetSkills()).then(() => {

            //checked types of actions
            let dispatchedActions = actions
            let dispatchedTypes = dispatchedActions.map(action => action.type)
            expect(dispatchedTypes).toEqual([GET_SKILLS])


            const state = store.getState()

            expect(actions[0]).toEqual({
                type: GET_SKILLS,
                skills: mock_res.skills,
            });
            expect(state).toEqual({
                ...INITIAL_STATE,
                skills: mock_res.skills
            });

        })

    })
    it('GetParentSkills', () => {
        const store = mockStore(initialState)
        const mock_res = [{
            code: "21",
            id: 71,
            image: null,
            name: "css",
            skill: 51
        }]


        moxios.stubRequest(apiUrl + `list/skills/`, {
            status: 200, response: mock_res,
        });


        const actions = store.getActions()

        // Dispatch the action
        return store.dispatch(GetParentSkills()).then(() => {

            //checked types of actions
            let dispatchedActions = actions
            let dispatchedTypes = dispatchedActions.map(action => action.type)
            expect(dispatchedTypes).toEqual([GET_PARENT_SKILLS])


            const state = store.getState()

            expect(actions[0]).toEqual({
                type: GET_PARENT_SKILLS,
                parentSkills: mock_res,
            });
            expect(state).toEqual({
                ...INITIAL_STATE,
                parentSkills: mock_res
            });

        })
    })

    it('GetProfile', () => {
        const store = mockStore(initialState)
        const mock_res = {
            city: { id: 1924, code: "1300", name: "تهران", province: { id: 8, code: "8", name: "تهران" } },
            description: "دانشجوی دانشگاه خوارزمی",
            email: "atena.ganji.ag@gmail.com",
            firstName: "آتنا",
            gender: "FEMALE",
            genderDisplay: "زن",
            lastName: "گنجی",
            phoneNumber: "+989011625458",
            university: { id: 1, code: "1", name: "خوارزمی", city: 1924 },
            username: "atena",
        }

        moxios.stubRequest(apiUrl + `user/profile/`, {
            status: 200, response: mock_res,
        });

        return store.dispatch(GetProfile()).then(() => {

            const actions = store.getActions()
            //checked types of actions
            let dispatchedActions = actions
            let dispatchedTypes = dispatchedActions.map(action => action.type)
            expect(dispatchedTypes).toEqual([GET_PROFILE])

            const state = store.getState()
            const description = mock_res.description
            const c = 'description';
            const { [c]: _, ...withoutDescripe } = mock_res;

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
            expect(actions[0]).toEqual({
                type: GET_PROFILE,
                data: data,
                description: mock_res.description,
            });

            expect(state).toEqual({
                ...INITIAL_STATE,
                loading: false,
                data: data,
                description: description
            });

        })
    });


    it('to snapshot on failure', () => {
        const actionStateSnapshot = actionsToStateSnapshot([thunk])
        actionStateSnapshot(() => fetchDataFailure(), Reducer)
    })
    it('to snapshot on success', () => {
        const actionStateSnapshot = actionsToStateSnapshot()
        actionStateSnapshot(() => GetProfile(), Reducer)
    })


})














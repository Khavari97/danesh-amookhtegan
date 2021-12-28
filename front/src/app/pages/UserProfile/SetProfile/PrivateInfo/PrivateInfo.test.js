import React from 'react';
import Enzyme, { shallow, configure, mount } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { Provider } from "react-redux";
import App from "./PrivateInfo";
import renderer from "react-test-renderer";
import { render, screen, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Button } from '@material-ui/core';
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store';
configure({ adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-testid="${val}"]`);
};



describe('test set profile states', () => {
    let wrapper
    let store_mock
    const data = {
        city: "تهران",
        province: "تهران",
        email: "atena.ganji.ag@gmail.com",
        firstName: "آتنا",
        gender: "FEMALE",
        genderDisplay: "زن",
        lastName: "گنجی",
        phoneNumber: "+989011625458",
        university: "خوارزمی",
        username: "atena",
    }

    store_mock = mockStore({ userProfile: { loading: false, data: data } })
    store_mock.dispatch = jest.fn()

    wrapper = mount(
        <BrowserRouter>
            <Provider store={store_mock}>
                <App />
            </Provider>
        </BrowserRouter>
    );


    test('check show props', () => {
        expect(findByTestAttr(wrapper, 'username').text()).toEqual(data.username)
        expect(findByTestAttr(wrapper, 'phoneNumber').text()).toEqual(data.phoneNumber)
        expect(findByTestAttr(wrapper, 'university').text()).toEqual(data.university)
        expect(findByTestAttr(wrapper, 'city').text()).toEqual(data.city)
        expect(findByTestAttr(wrapper, 'province').text()).toEqual(data.province)
        expect(findByTestAttr(wrapper, 'email').text()).toEqual(data.email)
        expect(findByTestAttr(wrapper, 'province').text()).toEqual(data.province)
        expect(findByTestAttr(wrapper, 'genderDisplay').text()).toEqual(data.genderDisplay)
    })

    test('snapshot', () => {
        const snapshot = renderer.create(wrapper).toJSON();
        expect(snapshot).toMatchSnapshot();
    })

});
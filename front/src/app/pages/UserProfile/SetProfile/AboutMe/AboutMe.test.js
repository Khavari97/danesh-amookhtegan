import React from 'react';
import Enzyme, { shallow, configure, mount } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { Provider } from "react-redux";
import App from "./AboutMe";
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
        description: "دانشجو"
    }

    store_mock = mockStore({ userProfile: { loading: false, description: data.description } })
    store_mock.dispatch = jest.fn()

    wrapper = mount(
        <BrowserRouter>
            <Provider store={store_mock}>
                <App />
            </Provider>
        </BrowserRouter>
    );


    test('check show props', () => {
        expect(findByTestAttr(wrapper, 'desc').text()).toEqual(data.description)
    })
    test('snapshot', () => {
        const snapshot = renderer.create(wrapper).toJSON();
        expect(snapshot).toMatchSnapshot();
    })

});
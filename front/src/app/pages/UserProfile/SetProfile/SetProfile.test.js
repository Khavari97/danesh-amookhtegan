import React from 'react';
import Enzyme, { shallow, configure, mount } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { Provider } from "react-redux";
import App from "./SetProfile";
import renderer from "react-test-renderer";
import { render, screen, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Button } from '@material-ui/core';
import PrivateInfo from "./PrivateInfo/PrivateInfo";
import AboutMe from "./AboutMe/AboutMe";
import EditPrivateInfo from "./PrivateInfo/Edit/EditPrivateInfo";
import EditAboutMe from "./AboutMe/Edit/EditAboutMe";
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store';
configure({ adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureStore(middlewares);



describe('test set profile states', () => {
    let wrapper
    let store_mock
    const data = {
        city: "تهران",
        province: 8,
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


    test('check default states', () => {
        wrapper.setState({ infoEditButton: false, aboutEditButton: false })
        expect(wrapper.find(AboutMe).exists()).toBe(true)
        expect(wrapper.find(PrivateInfo).exists()).toBe(true)
        expect(wrapper.state('infoEditButton')).toEqual(false)
        expect(wrapper.state('aboutEditButton')).toEqual(false)
    })
    test('check change states', () => {
        wrapper.setState({ infoEditButton: true, aboutEditButton: true })
        expect(wrapper.state('infoEditButton')).toEqual(true)
        expect(wrapper.state('aboutEditButton')).toEqual(true)
    })

    test('check click edit private info ', () => {
        wrapper.find('#infoEditButton').find(Button).simulate('click');

        wrapper.update()
        expect(wrapper.find(AboutMe).exists()).toBe(true)
        expect(wrapper.find(EditPrivateInfo).exists()).toBe(true)
        expect(wrapper.find(PrivateInfo).exists()).toBe(false)
    })

    test('check click edit about ', () => {
        wrapper.find('#aboutEditButton').find(Button).simulate('click');
        wrapper.update()
        expect(wrapper.find(EditAboutMe).exists()).toBe(true)
        expect(wrapper.find(EditPrivateInfo).exists()).toBe(true)

    })
    test('check click to hide edit about ', () => {
        wrapper.find('#aboutEditButton').find(Button).simulate('click');
        wrapper.update()
        expect(wrapper.find(EditAboutMe).exists()).toBe(false)
        expect(wrapper.find(EditPrivateInfo).exists()).toBe(true)

    })
    test('check click to hide edit private info ', () => {
        wrapper.find('#infoEditButton').find(Button).simulate('click');
        wrapper.update()
        expect(wrapper.find(EditAboutMe).exists()).toBe(false)
        expect(wrapper.find(EditPrivateInfo).exists()).toBe(false)
        expect(wrapper.find(AboutMe).exists()).toBe(true)
        expect(wrapper.find(PrivateInfo).exists()).toBe(true)
    })
    test('snapshot', () => {
        const snapshot = renderer.create(wrapper).toJSON();
        expect(snapshot).toMatchSnapshot();
      })

});
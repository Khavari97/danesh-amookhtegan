import React from 'react';
import App from './../../SetProfile';
import EditPrivateInfo from './EditPrivateInfo'
import renderer from "react-test-renderer";
import { BrowserRouter } from 'react-router-dom'
import Enzyme, { shallow, configure, mount } from "enzyme";
import { Provider } from "react-redux";
import { render, screen, prettyDOM, act, waitFor, wait, fireEvent, queryByAttribute } from '@testing-library/react'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
configure({ adapter: new Adapter() });

let mock_data = {
    province: [{ code: "7", id: 7, name: "بوشهر" }, { code: "8", id: 8, name: "تهران" }],
    data: [{ firstName: "آتنا", lastName: "گنجی", username: "atena", email: "atena.ganji.ag@gmail.com", province: "تهران", university: "خوارزمی", city: "تهران", cityObject: 1924, provinceObject: 8, universityObject: 1, phoneNumber: "+989011625458", genderDisplay: "زن", gender: "FEMALE" }],
    description: "دانشجوی دانشگاه خوارزمی ترم 6"
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-testid="${val}"]`);
};

describe('render correctly page', () => {

    let mock_store = mockStore({
        userProfile: mock_data,
    });

    mock_store.dispatch = jest.fn()
    let wrapper = mount(<BrowserRouter>
        <Provider store={mock_store}>
            <EditPrivateInfo />
        </Provider>
    </BrowserRouter>)

    it('check render of page ', () => {
        expect(wrapper.find(EditPrivateInfo).exists()).toBe(true);
        expect(wrapper.find(EditPrivateInfo).length).toBe(1);
    });
    it('check render textfileds of page', () => {
        expect(findByTestAttr(wrapper, "firstName").exists()).toBe(true);
        expect(findByTestAttr(wrapper, "lastName").exists()).toBe(true);
        expect(findByTestAttr(wrapper, "gender").exists()).toBe(true);
        expect(findByTestAttr(wrapper, "username").exists()).toBe(true);
        expect(findByTestAttr(wrapper, "email").exists()).toBe(true);
        expect(findByTestAttr(wrapper, "province").exists()).toBe(true);
        expect(findByTestAttr(wrapper, "city").exists()).toBe(true);
        expect(findByTestAttr(wrapper, "university").exists()).toBe(true);
        expect(findByTestAttr(wrapper, "phoneNumber").exists()).toBe(true);
    });
    test('snapshot', () => {
        const snapshot = renderer.create(wrapper).toJSON();
        expect(snapshot).toMatchSnapshot();
    })
});




describe('change textarea component by render set profile to show edit private info', () => {
    let mock_store

    beforeEach(() => {
        mock_store = mockStore({
            userProfile: mock_data
        });
    });


    test('on change text fields by user event', async () => {
        const getById = queryByAttribute.bind(null, 'id');
        const handleSubmit = jest.fn();

        const dom = render(
            <BrowserRouter>
                <Provider store={mock_store}>
                    <App postData={handleSubmit} />
                </Provider>
            </BrowserRouter>
        );

        act(() => {
            fireEvent.click(getById(dom.container, 'infoEditButton'))
        })

        act(() => {
            fireEvent.change(screen.getByTestId('firstName').querySelector('input'), { target: { value: 'تستیییی' } });
        })
        expect(screen.getByTestId('firstName').querySelector('input').value).not.toBe('');
        expect(screen.getByTestId('firstName').querySelector('input').value).toBe('تستیییی');

        act(() => {
            fireEvent.change(screen.getByTestId('lastName').querySelector('input'), { target: { value: 'تستیییی' } });
        })
        expect(screen.getByTestId('lastName').querySelector('input').value).not.toBe('');
        expect(screen.getByTestId('lastName').querySelector('input').value).toBe('تستیییی');

        act(() => {
            fireEvent.change(screen.getByTestId('username').querySelector('input'), { target: { value: 'admin' } });
        })
        expect(screen.getByTestId('username').querySelector('input').value).not.toBe('');
        expect(screen.getByTestId('username').querySelector('input').value).toBe('admin');

        act(() => {
            fireEvent.change(screen.getByTestId('phoneNumber').querySelector('input'), { target: { value: '09011625458' } });
        })
        expect(screen.getByTestId('phoneNumber').querySelector('input').value).not.toBe('');
        expect(screen.getByTestId('phoneNumber').querySelector('input').value).toBe('09011625458');

        act(() => {
            fireEvent.click(getById(dom.container, 'infoEditButton'))
        })
    })


})
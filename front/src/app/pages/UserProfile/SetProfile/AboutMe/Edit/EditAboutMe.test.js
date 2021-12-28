import React from 'react';
import App from './../../SetProfile';
import Enzyme, { shallow, configure, mount } from "enzyme";
import EditAboutMe from './EditAboutMe';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { render, screen, prettyDOM, act, waitFor, wait, fireEvent, queryByAttribute } from '@testing-library/react'
import {TextareaAutosize} from "@material-ui/core";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import renderer from "react-test-renderer";

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

configure({ adapter: new Adapter() })

let mock_data={
    province: [{ code: "7", id: 7, name: "بوشهر" }, { code: "8", id: 8, name: "تهران" }],
    data: [{ firstName: "آتنا", lastName: "گنجی", username: "atena", email: "atena.ganji.ag@gmail.com", province: "تهران", university: "خوارزمی", city: "تهران", cityObject: 1924, provinceObject: 8, universityObject: 1, phoneNumber: "+989011625458", genderDisplay: "زن", gender: "FEMALE" }],
    description:"دانشجوی دانشگاه خوارزمی ترم 6"
}

describe('render correctly textarea component', () => {

        let mock_store = mockStore({
            userProfile: mock_data ,
        });

    mock_store.dispatch = jest.fn()
    let wrapper = mount(<BrowserRouter>
        <Provider store={mock_store}>
            <EditAboutMe />
        </Provider>
    </BrowserRouter>)
  
    test('check render of textarea', () => {
      expect(wrapper.find(TextareaAutosize).exists()).toBe(true);
      expect(wrapper.find(TextareaAutosize).length).toBe(1);
    });
    test('check props of textarea', () => {
        expect(wrapper.find(TextareaAutosize).prop('rowsMin')).toBe(10);
        expect(wrapper.find(TextareaAutosize).prop('aria-label')).toBe('minimum height');
        expect(wrapper.find(TextareaAutosize).prop('data-testid')).toBe('description');
        expect(wrapper.find(TextareaAutosize).prop('name')).toBe('description');
        expect(wrapper.find(TextareaAutosize).prop('value')).toBe(mock_data.description);
      });

  });
  



describe('change textarea component by render set profile to show editaboutme', () => {

let  mock_store
    beforeEach(() => {
        mock_store = mockStore({
            userProfile: 
                mock_data 
            
        });
    });


    test('on change text fields by user event', async () => {
        const getById = queryByAttribute.bind(null, 'id');

        const dom = render(
            <BrowserRouter>
                <Provider store={mock_store}>
                    <App />
                </Provider>
            </BrowserRouter>
        );

        act(() => {
            fireEvent.click(getById(dom.container, 'aboutEditButton'))
        })

        act(() => {
            fireEvent.change(screen.getByTestId('description'), { target: { value: 'تستیییی' } });
        })
        expect(screen.getByTestId('description').value).not.toBe('');
        expect(screen.getByTestId('description').value).toBe('تستیییی');

        act(() => {
            fireEvent.click(getById(dom.container, 'aboutEditButton'))
        })

    })

})
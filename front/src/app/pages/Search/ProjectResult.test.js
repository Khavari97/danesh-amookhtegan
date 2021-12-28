import React from 'react';
import Enzyme, { shallow} from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import store from "../../redux/store";
import ProjectResult  from "./ProjectResult";
import { render, screen, prettyDOM, act, waitFor, wait, fireEvent } from '@testing-library/react'
import sinon from "sinon";
import renderer from "react-test-renderer";
import configureStore from 'redux-mock-store';
import { Filter, searchPage, setSearchText } from "../../redux/Search/Actions";
import thunk from 'redux-thunk'
import * as actions from "../../redux/Search/Actions"
import { BrowserRouter } from 'react-router-dom'

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

Enzyme.configure({ adapter: new EnzymeAdapter() });
const setup = (props={},state=null) => {
  return shallow(
    <Provider store ={store}>
            <ProjectResult {...props} />
    </Provider>

  );
};
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};
describe(" test of ProjectResult page ",()=>{
    test("render without error",()=>{
        let wrapper = setup();
        expect(wrapper).toBeTruthy();
        expect(wrapper.length).toEqual(1);
    })

    test('show projects : ', () => {
        const wrapper = setup();
        let field = findByTestAttr(wrapper, 'showProjects')
        expect(field.length).toBe(0);
        expect(field.text).toBeTruthy();
    })

    test('show counter: ', () => {
        let wrapper = setup();
        wrapper.setProps({
            location: 'string',
            page:'number'
          })
        expect(wrapper.length).not.toEqual(0);
    })

    it('check props not render without class',()=>{
        let wrapper = setup();

         let props = {
             label: 'button', onClick: () => { }
         }

          wrapper.setProps(props)

          expect(wrapper.props()).not.toEqual(props);
          expect(wrapper.props().label).toBeUndefined()

    })

    it('simulate button',()=>{
        let wrapper = setup();
        const mockCallBack = sinon.spy();
        let props = {
            label: 'button', onClick: mockCallBack
        }
        wrapper.setProps(props)
        wrapper.update();
        expect(mockCallBack).toHaveProperty('callCount', 0);
    })

    test('snapshot', () => {
      let wrapper =(<BrowserRouter>
      <Provider store={store}>
        <ProjectResult/>
      </Provider></BrowserRouter>)
      const snapshot = renderer.create(wrapper).toJSON();
      expect(snapshot).toMatchSnapshot();
  })

});

describe('integration test component', () => {
let mockProject_1={
    amount: 5000009,
    category: "سرور",
    categoryId: 72,
    creator: "سوپریوزر سوپریوزر",
    creatorUrl: "/users/superuser/",
    description: "نیاز به برقراری ارتباط با سرور جزو بزرگ ترین خواسته های ما است.",
    endDate: "2021-02-09T22:17:47.204072+03:30",
    name: "تکاوری",
    skills: [{id: 75, name: "containers"}, {id: 74, name: "Nginx"}, {id: 73, name: "لینوکس"}],
    status: {code: "ENDED", label: "پایان یافته"},
    url: "/projects/%D8%AA%DA%A9%D8%A7%D9%88%D8%B1%DB%8C/"
}
let store_mock
    beforeEach(() => {
      store_mock = mockStore({
        search: {
            projects: [mockProject_1,mockProject_1 ],
            text: ""
        },
        userProfile: {
          loading: true,
          provinces: [],
          cities: [],
          universities: [],
          profile: {},
          description: '',
          data: {},
          parentSkills: [],
          skills: [],
          resume: null,
          avatar: null,
          briefprofile: {}
        }
      });
    });
  
    test("mock store check projects", () => {
      const dom = render(
        <BrowserRouter>
          <Provider store={store_mock}>
            <ProjectResult />
          </Provider>
        </BrowserRouter>
      );
      expect(screen.getAllByTestId("project-card").length).toEqual(2)
    })
  
  
    test("change search input", async () => {
      const spySetSearchText = jest.spyOn(actions, 'setSearchText');
      store_mock.dispatch = jest.fn()
      const dom = render(
        <BrowserRouter>
          <Provider store={store_mock}>
            <ProjectResult />
          </Provider>
        </BrowserRouter>
      );
  
      fireEvent.change(screen.getByTestId('search-input').querySelector('input'), { target: { value: 'test' } });
      expect(screen.getByTestId('search-input').querySelector('input').value).toBe('test');
  
      //check dispatch one setSearchText after input change
      await wait(() => {
        expect(spySetSearchText).toHaveBeenCalledTimes(1);
      });
    })
  
    test("change pagination ", async () => {

      const spyChangePagination = ProjectResult.prototype.handleChange = jest.fn();
      const spySearchPage = jest.spyOn(actions, 'searchPage');
      store_mock.dispatch = jest.fn()
      const dom = render(
        <BrowserRouter>
          <Provider store={store_mock}>
            <ProjectResult />
          </Provider>
        </BrowserRouter>
      );
  
      await spyChangePagination(Event, 2)
  
      //check dispatch one setSearchText after input change
      await wait(() => {
        //test call handleChange
        expect(spyChangePagination).toHaveBeenCalledTimes(1);
        expect(spyChangePagination).toHaveBeenCalledWith(Event, 2);
        //test call searchUsersPage
        expect(spySearchPage).toHaveBeenCalledTimes(1);
        expect(spySearchPage).toHaveBeenCalledWith(1)
      });
    })
  
    
  })
import React from 'react';
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "../../redux/store";
import UserResult from "./UserResult";
import renderer from "react-test-renderer";
import Search from "./Search";
import sinon from "sinon";
import { render, screen, prettyDOM, act, waitFor, wait, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import { FilterUsers, searchUsersPage, setSearchText } from "../../redux/Search/Actions";
import thunk from 'redux-thunk'
import * as actions from "../../redux/Search/Actions"

const middlewares = [thunk]
const mockStore = configureStore(middlewares);


Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}, state = null) => {
  return shallow(
    <Provider store={store}>
      <UserResult {...props} />
    </Provider>

  );
};
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};
describe(" test of ProjectResult page ", () => {
  test("render without error", () => {
    let wrapper = setup();
    expect(wrapper).toBeTruthy();
    expect(wrapper.length).toEqual(1);
  })

  test('show Users : ', () => {
    const wrapper = setup();
    let field = findByTestAttr(wrapper, 'showUsers')
    expect(field.length).toBe(0);
    expect(field.text).toBeTruthy();
  })

  it('check props not render without class', () => {
    let wrapper = setup();

    let props = {
      label: 'button', onClick: () => { }
    }

    wrapper.setProps(props)

    expect(wrapper.props()).not.toEqual(props);
    expect(wrapper.props().label).toBeUndefined()

  })

  it('simulate button', () => {
    let wrapper = setup();
    const mockCallBack = sinon.spy();
    let props = {
      label: 'button', onClick: mockCallBack
    }
    wrapper.setProps(props)
    wrapper.update();
    expect(mockCallBack).toHaveProperty('callCount', 0);
  })

  test('show counter: ', () => {
    let wrapper = setup();
    wrapper.setProps({
      location: 'string',
      page: 'number'
    })
    expect(wrapper.length).not.toEqual(0);
  })

  test('snapshot', () => {
    let wrapper =(<BrowserRouter>
    <Provider store={store}>
      <UserResult/>
    </Provider></BrowserRouter>)
    const snapshot = renderer.create(wrapper).toJSON();
    expect(snapshot).toMatchSnapshot();
})

})


export function createTestStore() {
  const store = createStore(
    combineReducers({
      Users: userReducer,
    })
  );
  return store;
}


describe('integration test component', () => {

  let store_mock

  beforeEach(() => {
    store_mock = mockStore({
      search: {
        users: [
          {
            avatar: "http://api.planb.markop.ir/media/defaults/default.png",
            city: "تهران",
            description: "دانشجوی دانشگاه خوارزمی ترم 6",
            firstName: "آتنا",
            lastName: "گنجی",
            province: "تهران",
            url: "/users/atena/"
          }
        ]
        , text: ""
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

  test("mock store check users", () => {
    const dom = render(
      <BrowserRouter>
        <Provider store={store_mock}>
          <UserResult />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getAllByTestId("card_user").length).toEqual(1)
  })


  test("change search input", async () => {
    const spySetSearchText = jest.spyOn(actions, 'setSearchText');
    store_mock.dispatch = jest.fn()
    const dom = render(
      <BrowserRouter>
        <Provider store={store_mock}>
          <UserResult />
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
    const spyChangePagination = UserResult.prototype.handleChange = jest.fn();
    const spySearchUserPage = jest.spyOn(actions, 'searchUsersPage');
    store_mock.dispatch = jest.fn()
    const dom = render(
      <BrowserRouter>
        <Provider store={store_mock}>
          <UserResult />
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
      expect(spySearchUserPage).toHaveBeenCalledTimes(1);
      expect(spySearchUserPage).toHaveBeenCalledWith(1)
    });
  })

})
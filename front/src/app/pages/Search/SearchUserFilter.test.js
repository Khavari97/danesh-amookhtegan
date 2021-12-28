import React from 'react';
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "../../redux/store";
import SearchUserFilter from "./SearchUserFilter";
import renderer from "react-test-renderer";
import Search from "./Search";
import sinon from "sinon";
import { render, screen, prettyDOM, act, waitFor, wait, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import { FilterUsers, searchUsersPage, setSearchText } from "../../redux/Search/Actions";
import thunk from 'redux-thunk'
import * as actions from "../../redux/Search/Actions"
import * as actionsProfile from "../../redux/User/Profile/Actions"

const middlewares = [thunk]
const mockStore = configureStore(middlewares);


Enzyme.configure({ adapter: new EnzymeAdapter() });


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
  let mock_skill={code: "12", id: 62, image: null, name: "ری اکت", skill: 51}

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
        ],
        user_university:"4",
        user_province:"4",
        user_city: "4",
        allSkills:[mock_skill],
        user_skill: "4",
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
    const spyProvinceApi = jest.spyOn(actionsProfile, 'ProvinceApi');
    const spyGetAllSkills = jest.spyOn(actions, 'getAllSkills');
    const spyFilterUsers = jest.spyOn(actions, 'FilterUsers');
    const dom = render(
      <BrowserRouter>
        <Provider store={store_mock}>
          <SearchUserFilter />
        </Provider>
      </BrowserRouter>
    );
    expect(spyProvinceApi).toHaveBeenCalledTimes(1);
    expect(spyGetAllSkills).toHaveBeenCalledTimes(1);
    expect(spyFilterUsers).toHaveBeenCalledTimes(1);
  })

  
  test("check exists autocompletes", () => {
    store_mock.dispatch = jest.fn()

    const dom = render(
      <BrowserRouter>
        <Provider store={store_mock}>
          <SearchUserFilter />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('skills')).toBeTruthy();
    expect(screen.getByTestId('university')).toBeTruthy();
    expect(screen.getByTestId('city')).toBeTruthy();
    expect(screen.getByTestId('province')).toBeTruthy();
  })


  test("change auto completes", async () => {
    const spySetUserSkill = jest.spyOn(actions, 'setUserSkill');
    store_mock.dispatch = jest.fn()
    const dom = render(
      <BrowserRouter>
        <Provider store={store_mock}>
          <SearchUserFilter />
        </Provider>
      </BrowserRouter>
    );
    const autocomplete = screen.getByTestId('skills');
    const input = (autocomplete).querySelector('input')
 
    input.focus()
    // assign value to input field
    fireEvent.change(document.activeElement, { target: { value: mock_skill.name } })

    // arrow down to first option
    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' })
    
    // select element
    fireEvent.keyDown(document.activeElement, { key: 'Enter' })

    
    expect(input.value).toEqual(mock_skill.name)

  })

})
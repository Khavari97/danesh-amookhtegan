import React from 'react';
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "../../redux/store";
import SearchProjectFilter from "./SearchProjectFilter";
import renderer from "react-test-renderer";
import { render, screen, prettyDOM, act, waitFor, wait, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
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
        projects: [],
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

  test("mock store check projects", () => {
    const spyGetSkills = jest.spyOn(actionsProfile, 'GetSkills');
    const spyGetParentSkills = jest.spyOn(actionsProfile, 'GetParentSkills');
    const spyGetAllSkills = jest.spyOn(actions, 'getAllSkills');
    const spyFilterProjects = jest.spyOn(actions, 'Filter');
    const dom = render(
      <BrowserRouter>
        <Provider store={store_mock}>
          <SearchProjectFilter />
        </Provider>
      </BrowserRouter>
    );
    expect(spyGetSkills).toHaveBeenCalledTimes(1);
    expect(spyGetParentSkills).toHaveBeenCalledTimes(1);
    expect(spyGetAllSkills).toHaveBeenCalledTimes(1);
    expect(spyFilterProjects).toHaveBeenCalledTimes(1);
  })

  test("check exists autocompletes", () => {
    store_mock.dispatch = jest.fn()

    const dom = render(
      <BrowserRouter>
        <Provider store={store_mock}>
          <SearchProjectFilter />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('childSkill')).toBeTruthy();
    expect(screen.getByTestId('parentSkill')).toBeTruthy();
    expect(screen.getByTestId('status')).toBeTruthy();
  })


  test("change autocompletes", async () => {
    store_mock.dispatch = jest.fn()
    const dom = render(
      <BrowserRouter>
        <Provider store={store_mock}>
          <SearchProjectFilter />
        </Provider>
      </BrowserRouter>
    );
    const autocomplete = screen.getByTestId('childSkill');
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
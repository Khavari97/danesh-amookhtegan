import React from 'react';
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from '../../redux/store';
import Search from './Search';
import renderer from "react-test-renderer";
import { render, screen, prettyDOM, act, waitFor, wait, fireEvent, queryByAttribute } from '@testing-library/react'
import ProjectResult from "./ProjectResult";
import UserResult from "./UserResult";
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureStore(middlewares);

Enzyme.configure({ adapter: new EnzymeAdapter() });
const setup = () => {
  return shallow(
    <Provider store={store}>
      <Search />
    </Provider>

  );
};

describe('render search component without error', () => {

  test("render test", () => {
    let wrapper = setup();
    expect(wrapper).toBeTruthy();
    expect(wrapper.length).toEqual(1);
  })

  test('snapshot', () => {
    const snapshot = renderer.create(setup).toJSON();
    expect(snapshot).toMatchSnapshot();
  })
})




describe('integration component', () => {
  const getById = queryByAttribute.bind(null, 'id');

  let mock_store

  beforeEach(() => {
    mock_store = mockStore({
    search: {
      text:""
      },
    });
  });

  test("render test", () => {

    const SearchTabs = [
      { label: "پروژه", component: <ProjectResult />, testid: "proje" },
      { label: "افراد", component: <UserResult />, testid: "users" },
    ]


    const dom = render(
      <BrowserRouter>
        <Provider store={store}>
          <Search SearchTabs={SearchTabs} />
        </Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getAllByRole('tab')[1])
    expect(getById(dom.container, 'simple-tab-1')).toBeTruthy()


  })

  test("render test", () => {

    const SearchTabs = [
      { label: "پروژه", component: <ProjectResult />, testid: "proje" },
      { label: "افراد", component: <UserResult />, testid: "users" },
    ]


    const dom = render(
      <BrowserRouter>
        <Provider store={store}>
          <Search SearchTabs={SearchTabs} />
        </Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getAllByRole('tab')[0])
    expect(getById(dom.container, 'simple-tab-0')).toBeTruthy()


  })

})



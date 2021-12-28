import React from 'react';
import Enzyme, { shallow, configure, mount } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { Provider } from "react-redux";
import Skills from './Skills';
import renderer from "react-test-renderer";
import { render, screen, prettyDOM, act, waitFor, wait, fireEvent, queryByAttribute } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import { Button, Grid, InputBase } from "@material-ui/core";
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

let parentSkills = [{ code: "5", id: 55, image: null, isAdd: false, name: "web", skill: [{ id: 71, name: "css" }, { id: 71, name: "html" }] }]
let selectedSkills = [{ id: 71, name: "css" }]

let mock_store = mockStore({
  userProfile: {
    parentSkills: parentSkills,
    skills: selectedSkills
  },
});


const setup = () => {
  return shallow(
    <Provider store={mock_store}>
      <Skills />
    </Provider>

  );
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-testid="${val}"]`);
};

describe('render Skills component without error', () => {

  test("render page correctly", () => {
    let wrapper = mount(
      <BrowserRouter>
        <Provider store={mock_store}>
          <Skills />
        </Provider>
      </BrowserRouter>
    )
    expect(wrapper).toBeTruthy();
    expect(wrapper.length).toEqual(1);
  })

  test('snapshot', () => {
    const snapshot = renderer.create(setup).toJSON();
    expect(snapshot).toMatchSnapshot();
  })


})

describe('render states Skills component without error', () => {



  test("render page correctly", () => {
    let wrapper = mount(
      <BrowserRouter>
        <Provider store={mock_store}>
          <Skills />
        </Provider>
      </BrowserRouter>
    )



    wrapper.setState({ searching: 'test' })
    expect(wrapper.state('searching')).toEqual("test")
    wrapper.setState({ isSearching: true })
    expect(wrapper.state('isSearching')).toEqual(true)

    expect(findByTestAttr(wrapper, "parentskill").length).toEqual(3)
    expect(findByTestAttr(wrapper, "userskill").length).toEqual(3)

    findByTestAttr(wrapper, "btn-parent-web").at(0).simulate('click')
  })


})



describe('change serach box', async() => {
  const getById = queryByAttribute.bind(null, 'id');

  test("render test", async() => {
    const dom = render(
      
    );
    await act(async () => render(<BrowserRouter>
      <Provider store={mock_store}>
        <Skills />
      </Provider>
    </BrowserRouter>));
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    })
    expect(screen.getByRole('textbox').value).toBe('test');

  })

})



import React from 'react';
import Enzyme, { shallow} from "enzyme";
import store from '../../redux/store';
import { Provider } from 'react-redux'
import Home from "./Home";
import EnzymeAdapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import {Button} from "../../components/material-ui";
import {Typography} from "@material-ui/core";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => {
  return shallow(
    <Provider store ={store}>
            <Home />
    </Provider>

  );
};

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

describe("render Home page ",()=>{

    test ('render textField :' , ()=>{
      const wrapper = setup().render();
      let field = findByTestAttr(wrapper, 'search')
      expect(field.text()).toBe('')
    })

    test('button render check', () => {
        const wrapper = setup();
        let btn = wrapper.find(Button)
        expect(btn.length).toEqual(0);
        expect(wrapper.find(Typography).exists()).not.toBe(true);
    })

     test ('check titleBtn :' , ()=>{
      const wrapper = setup().render();
      let field = findByTestAttr(wrapper, 'searchBtn')
      expect(field.text()).toBe('جستجو')
    })

})


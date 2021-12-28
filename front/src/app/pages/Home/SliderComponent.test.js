import React from 'react';
import Enzyme, { shallow} from "enzyme";
import Home from "./SliderComponent";
import EnzymeAdapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import store from "../../redux/store";
import AliceCarousel from 'react-alice-carousel';

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

describe("render this page ",()=>{

    test('field input render check', () => {
        const wrapper = setup().render();
        let field = findByTestAttr(wrapper, 'AliceCarousel')
        expect(field.length).toEqual(0);
    })

    test ('render part of show projects :' , ()=>{
      const wrapper = setup().render();
      let field = findByTestAttr(wrapper, 'our projects')
      expect(field.text()).toBe(' پروژه های موجود در سایت ما ')
    })

    test('button show projects render check', () => {
        const wrapper = setup();
        const showProjects =findByTestAttr(wrapper,'more projects')
        expect(showProjects.length).toEqual(0);
    })

    test ('render part of show users :' , ()=>{
      const wrapper = setup().render();
      let field = findByTestAttr(wrapper, 'our users')
      expect(field.text()).toBe(' کاربران موجود در سایت ما ')
    })

    test('button show users render check', () => {
        const wrapper = setup();
        const showUsers =findByTestAttr(wrapper,'more users')
        expect(showUsers.length).toEqual(0);
    })

    test ('render part of show employers :' , ()=>{
      const wrapper = setup().render();
      let field = findByTestAttr(wrapper, 'our employers')
      expect(field.text()).toBe(' کارفرماهای موجود در سایت ما ')
    })

    test('button show employers render check', () => {
        const wrapper = setup();
        const showEmployers =findByTestAttr(wrapper,'more employers')
        expect(showEmployers.length).toEqual(0);
    })

    test ('render part of show  :' , ()=>{
      const wrapper = setup().render();
      let field = findByTestAttr(wrapper, 'more projects')
      expect(field.text()).toBe('')
    })
});
import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import UserProjects from "../Desk/UserProjects/UserProjects";
import { Provider } from "react-redux";
import store from "../../../redux/store";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return shallow(
    <Provider store={store}>
      <UserProjects />
    </Provider>
  );
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

describe("render this page ",()=>{

    test('content of title', () => {
        const wrapper = setup().render();
        let field = findByTestAttr(wrapper, 'Ttile')
        expect(field.text()).toBe('')
    })
    test('content of Typography', () => {
        const wrapper = setup().render();
        let field = findByTestAttr(wrapper, 'Typography')
        expect(field.text()).toBe('دسته بندی بر اساس')
    })
    test('content of MenuItemss', () => {
        const wrapper = setup().render();
        let field0 = findByTestAttr(wrapper, 'MenuItem0')
        let field1 = findByTestAttr(wrapper, 'MenuItem1')
        let field2 = findByTestAttr(wrapper, 'MenuItem2')
        let field3 = findByTestAttr(wrapper, 'MenuItem3')
        let field4 = findByTestAttr(wrapper, 'MenuItem4')
        expect(field0.text()).toBe('')
        expect(field1.text()).toBe('')
        expect(field2.text()).toBe('')
        expect(field3.text()).toBe('')
        expect(field4.text()).toBe('')
        
    })

});
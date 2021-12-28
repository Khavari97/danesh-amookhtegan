import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import RequestedProjects from "../Desk/RequestedProjects/RequestedProjects";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return shallow(
    <Provider store={store}>
      <RequestedProjects />
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
    

});


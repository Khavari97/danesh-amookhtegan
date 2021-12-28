import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { apiClient } from "../../../api/_api";
import MembershipRequest from "../MembershipRequest/MembershipRequest";


Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return shallow(
    <Provider store={store}>
      <MembershipRequest />
    </Provider>
  );
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};



test("renders with real contnens", () => {
    const wrapper = setup().render();
    let Typography = findByTestAttr(wrapper, "Typography");
    let button0 = findByTestAttr(wrapper, "button0");
    let button1 = findByTestAttr(wrapper, "button1");
  
    expect(Typography.text()).toBe("آیا مایل به همکاری در این پروژه هستید ؟");
    // expect(button0.text()).toBe("در انتظار تایید");
    // expect(button1.text()).toBe("درخواست عضویت در پروژه");
  
  });


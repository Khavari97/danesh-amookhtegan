import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { apiClient } from "../../../api/_api";

import ProjectMemberCard from "../ProjectMembers/ProjectMemberCard/ProjectMemberCard";


Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return shallow(
    <Provider store={store}>
      <ProjectMemberCard />
    </Provider>
  );
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};



test("renders with real contnens", () => {
    // const wrapper = setup().render();
    // let Link = findByTestAttr(wrapper, "Link");
    // let MenuItem0 = findByTestAttr(wrapper, "MenuItem0");
    // let MenuItem1 = findByTestAttr(wrapper, "MenuItem1");
  
    // expect(Link.text()).toBe("مشاهده رزومه");
    // expect(MenuItem0.text()).toBe("عضو تیم");
    // expect(MenuItem1.text()).toBe("ادمین");
  
  });


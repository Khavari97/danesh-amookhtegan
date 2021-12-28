import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { apiClient } from "../../../api/_api";
import ProjectDescription from "../Description/ProjectDescription";


Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return shallow(
    <Provider store={store}>
      <ProjectDescription />
    </Provider>
  );
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("renders with real contnens", () => {
    const wrapper = setup().render();
    let creator = findByTestAttr(wrapper, "creator");
    let created = findByTestAttr(wrapper, "created");
    let des = findByTestAttr(wrapper, "des");
    let endtime = findByTestAttr(wrapper, "endtime");
    let types = findByTestAttr(wrapper, "types");
    let skills = findByTestAttr(wrapper, "skills");
    let fund = findByTestAttr(wrapper, "fund");
    let toman = findByTestAttr(wrapper, "toman");
    // expect(creator.text()).toBe("سازنده پروژه");
    // expect(created.text()).toBe("ساخته شده توسط");
    // expect(des.text()).toBe("توضیحات پروژه");
    // expect(endtime.text()).toBe("زمان اتمام پروژه");
    // expect(types.text()).toBe("دسته بندی پروژه");
    // expect(skills.text()).toBe("مهارت های مورد نیاز");
    // expect(fund.text()).toBe("بودجه ی پروژه");
    // expect(toman.text()).toBe("تومان");
  });

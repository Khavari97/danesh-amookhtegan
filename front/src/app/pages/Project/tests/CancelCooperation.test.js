import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import NativeSelect from "@material-ui/core/NativeSelect";
import CancelCooperation from "../CancelCooperation/CancelCooperation";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { apiClient } from "../../../api/_api";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return shallow(
    <Provider store={store}>
      <CancelCooperation />
    </Provider>
  );
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("renders with real contnens", () => {
  const wrapper = setup().render();
  let container = findByTestAttr(wrapper, "Typography");
  expect(container.text()).toBe("آیا مایل به لغو همکاری هستید ؟");
});
test("button click simulate", () => {
  const wrapper = setup().render();
  let container = findByTestAttr(wrapper, "DangerButton");
});

import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import RequestCard from "../Desk/RequestedProjects/RequestCard/RequestCard";
import { ContentWriter } from "istanbul-lib-report";
Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (
  props = {
    name: "",
    stateus: "status",
    description: "description",
    status: "staus",
    url: "url",
  }
) => {
  return shallow(<RequestCard {...props} />);
};
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("test all contents", () => {
  const wrapper = setup();
  let container = findByTestAttr(wrapper, "TypographyName");
  expect(container.text()).not.toBe(undefined);
  let container1 = findByTestAttr(wrapper, "Box");
  let element = container1.getElement().props.clickable;
  expect(element).toBe(true);
  let container2 = findByTestAttr(wrapper, "TypographyDes");
  expect(container2.text()).toBe('description');
  let container3 = findByTestAttr(wrapper, "Link");
  let element1 = container3.getElement().props.to;
  // console.log('container3.getElement().props',container3.getElement().props)
  // expect(container3.getElement().props.to).toBe("url");
});

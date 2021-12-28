import React from "react" 
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./../pages/Dashboard/Desk/CreateProject/CreateProject";
import NativeSelect from "@material-ui/core/NativeSelect";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return shallow(<App {...props} />);
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};
let CreateOptions = (options) => {
  return options.map((value, index) => {
    return (
      <option value={value.id} key={index}>
        {" "}
        {value.name}
      </option>
    );
  });
};

let HandleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value,
  });
};

test("renders without error", () => {
  const wrapper = setup();
  let container = findByTestAttr(wrapper, "Container");
  expect(container.text().length).not.toBe(0);
  let Typography = findByTestAttr(wrapper, "Typography");
  // expect(Typography.text().length).toBe(0);
  wrapper.setState({ pathname: true });
  expect(Typography.text()).toBe("ساخت پروژه");
});

test("render form of submit", () => {
  const wrapper = setup();
  let container = findByTestAttr(wrapper, "Main-div");
  expect(container).toHaveLength(1);
  wrapper.setState({ pathname: false });
  expect(container.text().length).not.toBe(0);
});

test("render category input", () => {
  const wrapper = setup();
  let category = findByTestAttr(wrapper, "FormControl");
  expect(category.prop("variant")).toBe("filled");
  expect(category.prop("name")).toBe("category");
  expect(category.prop("value")).toBe(wrapper.state().category);
  expect(
    category.html(
      <NativeSelect
        onChange={HandleChange}
        name="category"
        inputProps={{ 'aria-label': 'purpose' }}
        value={wrapper.state().category}
      >
        {' '}
        {CreateOptions(wrapper.state().options)}
      </NativeSelect>
    )
  ).not.toBeUndefined()
});

test("render category selector", () => {
  const wrapper = setup();
  let NativeSelect = findByTestAttr(wrapper, "NativeSelect");
  expect(NativeSelect.prop("name")).toBe("category");
  expect(NativeSelect.prop("value")).toBe(wrapper.state().category);
  NativeSelect.simulate("change", {
    target: { name: "category", value: 0 },
  });
  expect(NativeSelect.props().value).toBe(0)
});

test("implementation skillsnames without error", () => {
  const wrapper = setup();
  let SkillsSelector = findByTestAttr(wrapper, "skills_names_Selector");
  expect(SkillsSelector.text().length).toBe(0);
  expect(SkillsSelector.prop("labelId")).toBe("demo-mutiple-checkbox-label");
  expect(SkillsSelector.prop("id")).toBe("demo-mutiple-checkbox");
  expect(SkillsSelector.prop("multiple")).toBe(true);
  expect(SkillsSelector.prop("required")).toBe(true);
  expect(SkillsSelector.prop("value")).toBe(wrapper.state().skillsNames);
  SkillsSelector.simulate("change", {
    target: { name: "skillsNames", value:[]},
  });

  SkillsSelector.simulate("focus", {
    target: { name: "skillsNames", MenuProps: wrapper.state().skills },
  });

});

test("emount will not be zero and is required", () => {
  const wrapper = setup();
  let amount = findByTestAttr(wrapper, "amount");
  expect(amount.prop("value")).toBe(wrapper.state().amount);
  expect(amount.prop("name")).toBe("amount");
  expect(amount.prop("thousandSeparator")).toBe(true);
  expect(amount.prop("required")).toBe(true);
});

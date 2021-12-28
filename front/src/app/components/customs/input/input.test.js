import React from "react"
import Enzyme, { shallow, configure, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import InputComponent, { CssTextField } from "./input";
import { Input } from '../../material-ui'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import App from "./input"
import renderer from "react-test-renderer";
import sinon from 'sinon'

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
  return shallow(<App {...props} />);
};
describe('input component', () => {

  let wrapper = mount(<App />)

  it('render input', () => {
    expect(wrapper.find(Input).exists()).toBe(true);
    expect(wrapper.find(Input).length).toBe(1);
  });

});

describe('input components', () => {

  let wrapper = setup()

  it('check props', () => {

    wrapper.setProps({
      items: {
        id: "string",
        label: "string",
        placeholder: "string",
        type: "text",
        name: "string",
        value: "string",
        data_test: "input",
      }
    })
    expect(wrapper.prop('data-test')).toBe("input");
    expect(wrapper.prop('label')).toBe("string");
    expect(wrapper.prop('name')).toBe("string");
    expect(wrapper.prop('type')).toBe("text");
    expect(wrapper.prop('value')).toBe("string");
  });
  it('snapshot', () => {
    const shot = <App />
    const snapshot = renderer.create(shot).toJSON();
    expect(snapshot).toMatchSnapshot();
  })
})

describe('simulate onchange component', () => {

  let wrapper = mount(<App />)

  let items = {
    id: 'signInputs',
    type: "email",
    name: "email",
    label: "ایمیل ",
    placeholder: "xxxxx@gmail.com",
    value: '',
  }

  wrapper.setProps({
    items: {
      ...items,
      onChange: () => { wrapper.setProps({ items: { ...items, value: 'test' } }) }
    }
  })

  //simulate change
  wrapper.find('input').simulate('change');

  it('it should have value', () => {
    expect(wrapper.find('input').props().value).toBe("test");

  });
})

// describe('simulate mouseover component', () => {

//   let wrapper = setup();
//   const mockCallBack=sinon.spy()

//   let items = {
//     id: 'signInputs',
//     type: "email",
//     name: "email",
//     label: "ایمیل ",
//     placeholder: "xxxxx@gmail.com",
//     value: '',
//     onBlur:() => mockCallBack
//   }

//   wrapper.setProps({
//     items: {
//       ...items,
//     }
//   })


//   //simulate change
//   wrapper.simulate('blur');
//   wrapper.update();

//   it('check count of click', () => {
//     expect(mockCallBack).toHaveProperty('callCount', 1);
//   })

// })




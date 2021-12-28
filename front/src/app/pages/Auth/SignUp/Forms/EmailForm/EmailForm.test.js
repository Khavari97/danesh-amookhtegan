import React from "react"
import Enzyme, { shallow, configure, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { Input, Button } from '../../../../../components/material-ui'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import App from "./EmailForm"
import renderer from "react-test-renderer";
import sinon from 'sinon'

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
  return shallow(<App {...props} />);
};
describe('emailform signup component', () => {

  let wrapper = mount(<App />)

  it('render input component', () => {
    expect(wrapper.find(Input).exists()).toBe(true);
    expect(wrapper.find(Input).length).toBe(1);
    expect(wrapper.find(Input).props().label).toBe("ایمیل");
    expect(wrapper.find(Input).props().name).toBe("email");
    expect(wrapper.find(Input).props().type).toBe("email");
  });


  it('render button component', () => {

    expect(wrapper.find(Button).props().type).toBe("submit");
    expect(wrapper.find(Button).props().variant).toBe("contained");
    expect(wrapper.find(Button).props().color).toBe("primary");
    expect(wrapper.find(Button).props().disabled).toBe(false);

  });

  it('render link button component', () => {
    expect(wrapper.find('.login-link').html()).toContain("وارد شو");
    expect(wrapper.find(".login").html()).toContain("قبلا عضو شدی؟ ");

  });

});





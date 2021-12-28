import React from "react"
import Enzyme, { shallow, configure, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { Input,Button } from '../../../../../components/material-ui'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import App from "./EmailForm"
import renderer from "react-test-renderer";
import sinon from 'sinon'

configure({ adapter: new Adapter() })


describe('emailform resetpassword component', () => {

  let wrapper = mount(<App />)

  it('render input component', () => {
      console.log(wrapper.debug())
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
    expect(wrapper.find(Button).find(".MuiButton-label").find('span').html()).toContain("ارسال ایمیل");
                               
});

it('render link button component', () => {

    expect(wrapper.find('.login-link').html()).toContain("حساب جدید بساز ");
    expect(wrapper.find(".login").html()).toContain("حساب نداری؟");
                               
});

});





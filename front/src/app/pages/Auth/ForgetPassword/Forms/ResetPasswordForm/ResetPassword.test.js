import React from "react"
import Enzyme, { shallow, configure, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { Input,Button } from '../../../../../components/material-ui'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import App from "./ResetPasswordForm"
import renderer from "react-test-renderer";
import sinon from 'sinon'
import {Provider} from "react-redux";
import store from "../../../../../redux/store";

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
  return mount(
    <Provider store={store}><App {...props} /></Provider>
  );
};
describe('SetPasswordForm component', () => {

  let wrapper = setup()

  it('render input component', () => {

    expect(wrapper.find(Input).exists()).toBe(true);
    expect(wrapper.find(Input).length).toBe(2);
    expect(wrapper.find(Input).at(0).props().label).toBe("رمز عبور جدید");
    expect(wrapper.find(Input).at(0).props().name).toBe("password");
    expect(wrapper.find(Input).at(0).props().type).toBe("password");
    expect(wrapper.find(Input).exists()).toBe(true);

    expect(wrapper.find(Input).at(1).props().label).toBe("تکرار رمز عبور جدید");
    expect(wrapper.find(Input).at(1).props().name).toBe("confirmPassword");
    expect(wrapper.find(Input).at(1).props().type).toBe("password");


  });


it('render button component', () => {

    expect(wrapper.find(Button).props().type).toBe("submit");
    expect(wrapper.find(Button).props().variant).toBe("contained");
    expect(wrapper.find(Button).props().color).toBe("primary");
    expect(wrapper.find(Button).find(".MuiButton-label").find('span').html()).toContain("تغییر رمز عبور");
                               
});

it('render link button component', () => {

    expect(wrapper.find('.signup-link').html()).toContain("حساب جدید بساز" );
    expect(wrapper.find(".signup").html()).toContain("حساب نداری؟ ");
                               
});

});





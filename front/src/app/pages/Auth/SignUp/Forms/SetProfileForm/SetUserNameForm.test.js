import React from "react"
import Enzyme, { shallow, configure, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { Input,Button } from '../../../../../components/material-ui'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import App from "./SetUserNameForm"
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
describe('SetUserName component', () => {

  let wrapper = setup()

  it('render input component', () => {

    expect(wrapper.find(Input).exists()).toBe(true);
    expect(wrapper.find(Input).length).toBe(3);

    expect(wrapper.find(Input).at(0).props().label).toBe("نام کاربری ");
    expect(wrapper.find(Input).at(0).props().name).toBe("userName");
    expect(wrapper.find(Input).at(0).props().type).toBe("text");


    expect(wrapper.find(Input).at(1).props().label).toBe("نام ");
    expect(wrapper.find(Input).at(1).props().name).toBe("name");
    expect(wrapper.find(Input).at(1).props().type).toBe("text");

    expect(wrapper.find(Input).at(2).props().label).toBe("نام خانوادگی ");
    expect(wrapper.find(Input).at(2).props().name).toBe("family");
    expect(wrapper.find(Input).at(2).props().type).toBe("text");


  });


it('render button component', () => {

    expect(wrapper.find(Button).props().type).toBe("submit");
    expect(wrapper.find(Button).props().variant).toBe("contained");
    expect(wrapper.find(Button).props().color).toBe("primary");
    expect(wrapper.find(Button).props().disabled).toBe(false);
    expect(wrapper.find(Button).find(".MuiButton-label").find('span').html()).toContain("ثبت نام");
                               
});

it('render link button component', () => {

    expect(wrapper.find('.login-link').html()).toContain("وارد شو");
    expect(wrapper.find(".login").html()).toContain("login");
                               
});

});





import React from "react"
import Enzyme, { shallow, configure, mount } from "enzyme";
import App from "./MemberCard";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { Avatar, Grid, Link, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
  return shallow(<App {...props} />);
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};


describe('membercard component', () => {

  let wrapper = mount(<App />)

  it('render component check exists', () => {
    expect(wrapper.find(Avatar).exists()).toBe(true);
    expect(wrapper.find(Link).exists()).toBe(true);
    expect(wrapper.find(Card).exists()).toBe(true);
    expect(wrapper.find(CardActions).exists()).toBe(true);
    expect(wrapper.find(CardContent).exists()).toBe(true);
    expect(wrapper.find(Avatar).exists()).toBe(true);
  });
  it('render component check count of each of component', () => {
    expect(wrapper.find(Avatar).length).toBe(1);
    expect(wrapper.find(Link).length).toBe(1);
    expect(wrapper.find(Card).length).toBe(1);
    expect(wrapper.find(CardActions).length).toBe(1);
    expect(wrapper.find(CardContent).length).toBe(1);
  });

})
describe('input component', () => {
  let wrapper = mount(<App />)

  it('check set props', () => {

    wrapper.setProps({
      avatar: "avatar",
      firstName: 'atena',
      lastName: 'ganji',
      city: 'tehran',
      province: 'tehran',
      description: 'description',
      url: 'string'
    })

    expect(wrapper.props().avatar).toBe("avatar");
    expect(wrapper.props().firstName).toEqual("atena");
    expect(wrapper.props().lastName).toEqual("ganji");
    expect(wrapper.props().province).toEqual("tehran");
    expect(wrapper.props().city).toEqual("tehran");
    expect(wrapper.props().description).toEqual("description");
    expect(wrapper.props().url).toEqual("string");
  });
  it('snapshot', () => {
    const shot = <App />
    const snapshot = renderer.create(shot).toJSON();
    expect(snapshot).toMatchSnapshot();
  })
})

describe('input components', () => {
  let wrapper = setup()

  it('check render props in component', () => {

    wrapper.setProps({
      avatar: "avatar",
      firstName: 'atena',
      lastName: 'ganji',
      city: 'tehran',
      province: 'tehran',
      description: 'description',
      url: 'string'
    })

    expect(findByTestAttr(wrapper, 'name').text()).toBe("atena ganji");
    expect(findByTestAttr(wrapper, 'desc').text()).toBe("description")
    expect(findByTestAttr(wrapper, 'city').text()).toBe("tehran , tehran")
    expect(wrapper.find(Avatar).prop('src')).toBe("avatar");
    expect(wrapper.find(Link).prop('href')).toBe("string");
  });
})



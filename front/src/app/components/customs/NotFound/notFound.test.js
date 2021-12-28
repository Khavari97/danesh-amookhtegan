import React from "react";
import Enzyme, { shallow, configure, mount } from "enzyme";
import renderer from "react-test-renderer";
import App from './NotFound';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { Typography, Grid } from '@material-ui/core';

configure({ adapter: new Adapter() })


describe('notfound component', () => {
  let wrapper = mount(<App />)
  it('render component', () => {
    expect(wrapper.find(Typography).exists()).toBe(true);
    expect(wrapper.find(Typography).length).toEqual(1);
    expect(wrapper.find(Grid).exists()).toBe(true);
    expect(wrapper.find(Grid).length).toEqual(1);
  })
  it('check default props', () => {
    expect(wrapper.find(Typography).html()).toBe("<p class=\"MuiTypography-root MuiTypography-body1\" style=\"margin-right: 10px;\"></p>");
    expect(wrapper.find(Grid).props().alignItems).toEqual("center");
    expect(wrapper.find(Grid).props().alignItems).toEqual("center");
  })

  it('check set props', () => {
    wrapper.setProps({ label: 'test' })
    expect(wrapper.props().label).toBe('test')
    expect(wrapper.find(Typography).html()).toBe("<p class=\"MuiTypography-root MuiTypography-body1\" style=\"margin-right: 10px;\">test</p>");
  })
})

describe('render NotFound component without error', () => {
  let wrapper = shallow(<App />)

  it('it should have value', () => {
    wrapper.setProps({
      label: 'string'
    })
    expect(wrapper.find(Typography).text()).toBe('string');
  });
      it('it should have value', () => {
          wrapper.setProps({
              label: 'string'
          })
         expect(wrapper.find(Typography).text()).toBe('string');
      });

    it('snapshot',()=>{
        const shot = <App />
        const snapshot = renderer.create(shot).toJSON();
        expect(snapshot).toMatchSnapshot();
    })

})
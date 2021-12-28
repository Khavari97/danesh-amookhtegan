import React from "react"
import Enzyme, { shallow, configure, mount } from "enzyme";
import App from './DangerButton';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from "react-test-renderer";
import { Button, ButtonProps } from "@material-ui/core";
import sinon from 'sinon';
configure({ adapter: new Adapter() })

const setup = (props = {}) => {
  return shallow(<App {...props} />);
};


describe('render danger button ', () => {
  let wrapper = setup();

  let props = {
    label: 'button', onClick: () => { }
  }

  //set props
  wrapper.setProps(props)
  //check props    
  it('check props not render without class', () => {
    expect(
      wrapper
        .props()
    ).not.toEqual(props);
  })

  it('check label props ', () => {
    expect(
      wrapper
        .props().label
    ).toEqual('button')
  })

  it('check label props ', () => {
    expect(
      wrapper
        .props().className
    ).toEqual('dangerButton')
  })

  it('check props ', () => {
    expect(
      wrapper
        .props()
    ).toEqual({ ...props, className: 'dangerButton', children: 'button' });
  })

})

describe('simulate danger button ', () => {
  let wrapper = setup();
  const mockCallBack = sinon.spy();
  let props = {
    label: 'button', onClick: mockCallBack
  }

  //set props
  wrapper.setProps(props)

  //click 
  wrapper.find(Button).simulate('click');
  wrapper.update();

  it('check count of click', () => {
    expect(mockCallBack).toHaveProperty('callCount', 1);
  })

  it('snapshot', () => {
    const shot = <App />
    const snapshot = renderer.create(shot).toJSON();
    expect(snapshot).toMatchSnapshot();
  })

})


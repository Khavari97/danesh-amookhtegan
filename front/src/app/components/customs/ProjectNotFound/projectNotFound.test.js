import React from "react" 
import Enzyme, { shallow,configure,mount } from "enzyme";
import renderer from "react-test-renderer";
import App from "./ProjectNotFound";
import Adapter from 'enzyme-adapter-react-16'
import {Typography} from '@material-ui/core';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
  return shallow(<App {...props} />);
};

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

describe('render projectNotFound component without error',()=>{
    let wrapper = shallow(<App/>)

    it('it should have value', () => {
       expect(wrapper.find(Typography).text()).toBe('پروژه ای با این مشخصات یافت نشد!');
       expect(wrapper.find(Typography).prop('color')).toBe('primary');
    });

    it('snapshot',()=>{
        const shot = <App />
       const snapshot = renderer.create(shot).toJSON();
       expect(snapshot).toMatchSnapshot();
    })
})

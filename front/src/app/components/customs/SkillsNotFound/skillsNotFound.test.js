import React from "react"
import Enzyme, { shallow,configure,mount } from "enzyme";
import renderer from "react-test-renderer";
import App from './SkillsNotFound';
import Adapter from 'enzyme-adapter-react-16'
import {Typography} from '@material-ui/core';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
  return shallow(<App {...props} />);
};

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

describe('render skillsNotFound component without error',()=>{
    let wrapper = setup();

    it('it should have value', () => {
          expect(wrapper.find(Typography).text()).toBe(' مهارتی یافت نشد!');
          expect(wrapper.find(Typography).prop('color')).toBe('primary');
          expect(wrapper).toBeTruthy();
          expect(wrapper.length).toEqual(1);
    });

    it('snapshot',()=>{
        const shot = <App />
        const snapshot = renderer.create(shot).toJSON();
        expect(snapshot).toMatchSnapshot();
    })
})
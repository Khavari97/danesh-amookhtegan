import React from "react"
import Enzyme, { shallow,configure,mount } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import App from './auth';
import {Grid} from "@material-ui/core";

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
  return shallow(<App {...props} />);
};

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

describe('render auth without error',()=>{
    let wrapper = setup();
    it('test src of images',()=>{
        wrapper.setProps({
            img: 'string',
          })
        expect(findByTestAttr(wrapper,'children').text()).toBe("<Grid />");
        expect(findByTestAttr(wrapper,'darkGreenDown').text()).toBe("");
        expect(wrapper.length).toEqual(1);
        expect(wrapper).toBeTruthy();
        expect(findByTestAttr(wrapper,'darkGreenDown').prop('src')).toBe('dark-green-down.svg');
        expect(findByTestAttr(wrapper,'darkGreenTop').prop('src')).toBe('dark-green-top.svg');
        expect(findByTestAttr(wrapper,'lightGreenDown').prop('src')).toBe('light-green-down.svg');
        expect(findByTestAttr(wrapper,'lightGreenTop').prop('src')).toBe('light-green-top.svg');
    })

    it('test Grid',()=>{
        const wrapper = shallow(<App />)
        expect(wrapper.find(Grid).exists()).toBe(false);
        expect(wrapper.find(Grid).length).toEqual(0);
    })

    it('snapshot',()=>{
        const auth = <App/>
        const snapshot = renderer.create(auth).toJSON();
        expect(snapshot).toMatchSnapshot();

    })
})
import React from "react"
import Enzyme, { shallow,configure,mount } from "enzyme";
import renderer from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';
import App from './ValidationModal';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
  return shallow(<App {...props} />);
};

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

describe('render ValidationModal without error',()=>{
    let wrapper = setup();
    it('should have value',()=>{
        wrapper.setProps({
            title: 'string',
            description: 'string',
            open: 'boolean',
          })
        expect(findByTestAttr(wrapper,'title').text()).toBe("string");
        expect(findByTestAttr(wrapper,'description').text()).toBe("string");
        expect(findByTestAttr(wrapper,'button').text()).toBe("بله");
        expect(findByTestAttr(wrapper,'button').prop('color')).toBe("primary");
    })

    it('snapshot',()=>{
        const shot = <App />
        const snapshot = renderer.create(shot).toJSON();
        expect(snapshot).toMatchSnapshot();
    })
})
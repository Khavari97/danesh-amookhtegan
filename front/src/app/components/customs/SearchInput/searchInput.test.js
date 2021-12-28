import { Grid, Input } from "@material-ui/core";
import React from "react" 
import Enzyme, { shallow,configure,mount } from "enzyme";
import renderer from "react-test-renderer";
import App from "./SearchInput";
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
  return shallow(<App {...props} />);
};

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
  };

describe('render search input component without error',()=>{
    it('it should have value', () => {
        let wrapper = setup();
        wrapper.setProps({
            text: ()=>{},
            default: 'default',
            value: ""})
          expect(wrapper.find(Input).prop('defaultValue')).toBe('default');
      });

    it('test placeholder input',()=>{
        let wrapper = setup();
        let field = findByTestAttr(wrapper, 'placeholder')
      expect(field.text()).toBe('')
    })

    it('render button search',()=>{
        let wrapper = setup();
        let btn = findByTestAttr(wrapper,'btnSearch');
        expect(btn.text()).toBe('جستجو');
        expect(btn.length).toEqual(1);
        expect(btn.prop("color")).toBe("primary");
    })

    it('snapshot',()=>{
        const shot = <App />
        const snapshot = renderer.create(shot).toJSON();
        expect(snapshot).toMatchSnapshot();
    })

})

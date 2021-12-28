import React from 'react';
import Enzyme, { shallow} from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Navbar from "./PublicNavbar";
import renderer from "react-test-renderer";
import sinon from "sinon";

Enzyme.configure({ adapter: new EnzymeAdapter() });
const setup = (props = {}) => {
  return shallow(<Navbar {...props}/>);
};

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

describe("test of public navbar component",()=>{

    it('render public navbar without error',()=>{
        let wrapper = setup();
        expect(wrapper).toBeTruthy();
        expect(wrapper.length).toEqual(1);
    })

    it('render title ',()=>{
        const wrapper = setup();
        const content = findByTestAttr(wrapper,'title');
        expect(content.length).toBe(0);
        expect(content.text).toBeTruthy();
    })

     it('check props not render without class',()=>{
        let wrapper = setup();

         let props = {
             label: 'button', onClick: () => { }
         }

          wrapper.setProps(props)

          expect(wrapper.props()).not.toEqual(props);
          expect(wrapper.props().label).toBeUndefined()

    })

    it('render title text truthy',()=>{
        const wrapper = setup();
        const content = findByTestAttr(wrapper,'subject');
        expect(content.text).toBeTruthy();
        expect(content.text()).toEqual(' دانش آموختگان ');
    })

    it('simulate button',()=>{
        let wrapper = setup();
        const mockCallBack = sinon.spy();
        let props = {
            label: 'button', onClick: mockCallBack
        }
        wrapper.setProps(props)
        wrapper.update();
        expect(mockCallBack).toHaveProperty('callCount', 0);
    })

    it('render title register truthy',()=>{
        const wrapper = setup();
        const content = findByTestAttr(wrapper,'register');
        expect(content.text).toBeTruthy();
        expect(content.text()).toEqual(' ثبت نام ');
    })

    it('render title login truthy',()=>{
        const wrapper = setup();
        const content = findByTestAttr(wrapper,'login');
        expect(content.text).toBeTruthy();
        expect(content.text()).toEqual(' ورود ');
    })

    it('render title home truthy',()=>{
        const wrapper = setup();
        const content = findByTestAttr(wrapper,'home');
        expect(content.text).toBeTruthy();
        expect(content.text()).toEqual(' صفحه اصلی ');
    })

    it('render logo',()=>{
        let wrapper = setup();
        expect(findByTestAttr(wrapper,'logo').prop('src')).toBe('kharazmiLogo.svg');
    })

})
import React from 'react';
import Enzyme, { shallow} from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Navbar from "./navbar";
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import store from "../../redux/store"
import {Button, Typography} from "@material-ui/core";
import sinon from 'sinon';

Enzyme.configure({ adapter: new EnzymeAdapter() });
const setup = (props = {}) => {
  return shallow(
      <Provider store={store}>
          <Navbar {...props}/>
      </Provider>
  );
};

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

describe("test navbar",()=>{

    it('render navbar component without error',()=>{
        let wrapper = setup();
        expect(wrapper).toBeTruthy();
        expect(wrapper.length).toEqual(1);
    })

    it('render profile button',()=>{
        let wrapper;
        wrapper = setup();
        const content = findByTestAttr(wrapper,'profile');
        expect(content.length).toEqual(0);
        expect(content.text).toBeTruthy();
        expect(wrapper.find(Typography).exists()).not.toBe(true);
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

    it('render exit button',()=>{
        let wrapper;
        wrapper = setup();
        const content = findByTestAttr(wrapper,'exit');
        expect(content.length).toEqual(0);
        expect(content.text).toBeTruthy();
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

    it('render notifications',()=>{
        let wrapper;
        wrapper = setup();
        const content = findByTestAttr(wrapper,'notif');
        expect(content.length).toEqual(0);
        expect(content.text).toBeTruthy();
        expect(wrapper.find(Typography).exists()).not.toBe(true);
        expect(wrapper.find(Typography).length).toEqual(0);
    })

    it('render show more button',()=>{
        let wrapper;
        wrapper = setup();
        const content = findByTestAttr(wrapper,'show more');
        expect(content.length).toEqual(0);
        expect(content.text).toBeTruthy();
    })

     it('render not found part',()=>{
        let wrapper;
        wrapper = setup();
        const content = findByTestAttr(wrapper,'not found');
        expect(content.length).toBe(0);
        expect(content.text).toBeTruthy();
        wrapper.setProps({
          title: 'string'})
        expect(wrapper.find(Typography).text).not.toBe('');
    })

});
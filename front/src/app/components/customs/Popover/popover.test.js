import React from "react" 
import Enzyme, { shallow,configure,mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./Popover";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import {Typography} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import renderer from "react-test-renderer";
configure({ adapter: new Adapter() })

  describe('input component', () => {

     let wrapper = shallow(<App/>)
  
      it('it should have value', () => {
        wrapper.setProps({    
          title: 'string'})
          expect(wrapper.find(Typography).text()).toBe('string');
      });
      it('snapshot', () => {
        const shot = <App />
        const snapshot = renderer.create(shot).toJSON();
        expect(snapshot).toMatchSnapshot();
      })
  })
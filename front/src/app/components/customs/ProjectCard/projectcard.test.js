import React from "react" 
import Enzyme, { shallow,configure,mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./ProjectCard";
import Adapter from 'enzyme-adapter-react-16'
import {Box, Card, Chip, Grid, Typography} from '@material-ui/core';
configure({ adapter: new Adapter() })

const setup = (props = {}) => {
  return shallow(<App {...props} />);
};

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
  };


  configure({ adapter: new Adapter() })

  describe('input component', () => {

     let wrapper = shallow(<App/>)
  
      it('it should have value', () => {
          wrapper.setProps({    
            name: 'string',
            description: 'string',
            status: {
                code: '1',
                label: 'string'
            },
            url: 'string'})
          expect(findByTestAttr(wrapper,'name').text()).toBe("string")
          expect(findByTestAttr(wrapper,'description').text()).toBe("string");
          expect(wrapper.find(Chip).prop('label')).toBe("string");
      });
  })



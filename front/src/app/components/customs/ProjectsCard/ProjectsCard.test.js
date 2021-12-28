import React from "react" ;
import Enzyme, { shallow,configure,mount } from "enzyme";
import renderer from "react-test-renderer";
import App from "./ProjectsCard" ;
import Adapter from 'enzyme-adapter-react-16'
import {Box, Card, Chip, Grid, Typography} from '@material-ui/core';
import { Provider } from 'react-redux';
import store from "../../../redux/store";

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
  return shallow(<App {...props} />);
};

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

 describe('component projects card render without error', () => {

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
          expect(findByTestAttr(wrapper,'name').text()).toBe("string");
          expect(findByTestAttr(wrapper,'description').text()).toBe("string");
          expect(wrapper.find(Chip).prop('label')).toBe("string");
          expect(findByTestAttr(wrapper,'url').text()).toBe("جزئیات");
      });

     it('snapshot',()=>{
        const snapshot = renderer.create(setup).toJSON();
        expect(snapshot).toMatchSnapshot();
    })
 });


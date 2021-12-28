import React from "react" 
import Enzyme, { shallow,configure,mount } from "enzyme";
import Loading from "./Loading";
import {Box, CircularProgress, Grid} from "@material-ui/core";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from "react-test-renderer";

  configure({ adapter: new Adapter() })

  describe('loading component', () => {
     let wrapper = shallow(<Loading/>)
     it('render component', () => {
        expect(wrapper.find(Box).length).toEqual(1);
        expect(wrapper.find(CircularProgress).exists()).toBe(true);
        expect(wrapper.find(CircularProgress).length).toEqual(1);
        expect(wrapper.find(Grid).exists()).toBe(true);
        expect(wrapper.find(Grid).length).toEqual(1);
     })
     it('check props', () => {
      expect(wrapper.find(Box).props().mt).toEqual(5);
      expect(wrapper.find(Grid).props().container).toEqual(true);
      expect(wrapper.find(Grid).props().alignItems).toEqual("center");
      expect(wrapper.find(Grid).props().alignItems).toEqual("center");
   })
   it('snapshot',()=>{
      const shot = <Loading />
      const snapshot = renderer.create(shot).toJSON();
      expect(snapshot).toMatchSnapshot();
  })
  })
import React from "react"
import Enzyme, { shallow,configure,mount } from "enzyme";
import renderer from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';
import App from './UserProfileLayout';
import {Provider} from "react-redux";
import store from '../../redux/store';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
  return shallow(
      <Provider store={store}>
          <App {...props}/>
      </Provider>
  );
};

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

describe('render userProfileLayout without error',()=>{

     test('render skillIcon',()=>{
         let wrapper = setup().render();
         expect(wrapper).toBeTruthy();
         expect(wrapper.length).toEqual(1);
         expect(findByTestAttr(wrapper,'development_skill').prop('src')).toBe('development_skill.svg');
     })

    test('render infoIcon',()=>{
         let wrapper = setup().render();
         expect(findByTestAttr(wrapper,'customer').prop('src')).toBe('customer.svg');
     })

    test('render resumeIcon',()=>{
         let wrapper = setup().render();
         expect(findByTestAttr(wrapper,'pdfFile').prop('src')).toBe('pdfFile.svg');
     })

})

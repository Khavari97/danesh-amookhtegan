import React from 'react';
import Enzyme, { shallow} from "enzyme";
import Search from "../../pages/Search/SearchProjectFilter";
import Autocomplete from "@material-ui/lab/Autocomplete";
import EnzymeAdapter from "enzyme-adapter-react-16";
import store from '../../redux/store'
import { Provider } from 'react-redux'
import renderer from "react-test-renderer";
import sinon from "sinon";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return shallow(
    <Provider store ={store}>
            <Search {...props} />
    </Provider>

  );
};
  const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
  };

describe('Test case for testing Autocomplete', () => {

    test('render searchProject component without error',()=>{
        let wrapper = setup();
        expect(wrapper).toBeTruthy();
        expect(wrapper.length).toEqual(1);
    })

    test ('handle header text :' , ()=>{
      let wrapper = setup().render();
      let field = findByTestAttr(wrapper, 'sorting')
      expect(field.text()).toBe(' دسته بندی بر اساس : ')
    })

    test('field input render check', () => {
        const wrapper = setup().render();
        let field = findByTestAttr(wrapper, 'Autocomplete')
        expect(field.length).toEqual(3);
    })

    test('should have value',()=>{
        const wrapper = setup();
        let field = findByTestAttr(wrapper, 'Autocomplete');
        wrapper.setProps({
            status: "string",
            parentSkill:"programming",
            childSkill:"java",
            page:1,
        })
        expect(field).toBeTruthy();
        expect(wrapper.length).toEqual(1);
        expect(field.page).toBeUndefined();
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

    test('snapshot',()=>{
         const shot =(<Provider store={store}><Search/></Provider>);
         const snapshot = renderer.create(shot).toJSON();
         expect(snapshot).toMatchSnapshot();
    })
});


import React from "react"
import Enzyme, { shallow, configure, mount } from "enzyme";
import App from "./BasicPagination";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Pagination from '@material-ui/lab/Pagination';
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() })


describe('pagination component', () => {

  let wrapper = shallow(<App />)

  it('chek default props', () => {
    expect(wrapper.find(Pagination).prop('color')).toBe('primary');
    expect(wrapper.find(Pagination).prop('shape')).toBe('rounded');
    expect(wrapper.find(Pagination).prop('variant')).toBe('outlined');
    expect(wrapper.find(Pagination).prop('size')).toBe('large');
  });

  it('check set props', () => {
    wrapper.setProps({
      count: 3,
      siblingCount: 2,
      boundaryCount: 2,
      page: 2
    })
    expect(wrapper.find(Pagination).prop('count')).toBe(3);
    expect(wrapper.find(Pagination).prop('siblingCount')).toBe(2);
    expect(wrapper.find(Pagination).prop('boundaryCount')).toBe(2);
    expect(wrapper.find(Pagination).prop('page')).toBe(2);
  });

  it('snapshot', () => {
    const shot = <App />
    const snapshot = renderer.create(shot).toJSON();
    expect(snapshot).toMatchSnapshot();
  })
})



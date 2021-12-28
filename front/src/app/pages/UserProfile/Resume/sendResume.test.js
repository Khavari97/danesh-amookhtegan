import React from 'react';
import Enzyme, { shallow} from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import store from "../../../redux/store";
import Resume from "./SendResume";

Enzyme.configure({ adapter: new EnzymeAdapter() });
const setup =()=> {
    return shallow(
        <Provider store={store}>
            <Resume/>
        </Provider>
    );
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

describe('test sendResume component',()=>{

    test('render without error',()=>{
        const wrapper = setup();
        expect(wrapper).toBeTruthy();
        expect(wrapper.length).toEqual(1);
    })

    test('test title',()=>{
        const wrapper = setup().render();
        expect(findByTestAttr(wrapper,'userProfile').prop('src')).toBe('www.svg');
        expect(wrapper.length).toEqual(1);
        // expect(findByTestAttr(wrapper,'title').not.toBeUndefined();
    })

    test('test upload file',()=>{
        const wrapper = setup().render();
        expect(findByTestAttr(wrapper,'upload').prop('src')).toBe('uploadFile.svg');
        expect(findByTestAttr(wrapper,'uploadFile').text()).toBe(' بارگذاری فایل رزومه ');
        expect(wrapper.length).toEqual(1);
    })

    test('snapshot',()=>{
        const shot = (<Provider store={store}><Resume/></Provider>)
        const snapshot = renderer.create(shot).toJSON();
        expect(snapshot).toMatchSnapshot();

    })

});
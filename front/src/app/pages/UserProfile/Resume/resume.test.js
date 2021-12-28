import React from 'react';
import Enzyme, { shallow} from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import Resume from "./Resume";

Enzyme.configure({ adapter: new EnzymeAdapter() });
const setup =()=> {
    return shallow(<Resume/>);
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

describe('test Resume component',()=>{

    test('render without error',()=>{
        const wrapper = setup();
        expect(wrapper).toBeTruthy();
        expect(wrapper.length).toEqual(1);
    })

    test('test title1',()=>{
        const wrapper = setup().render();
        let field = findByTestAttr(wrapper, 'title1')
        expect(field.text()).toBe('در این قسمت شما می توانید رزومه ی خود را به صورت pdf بارگذاری کنید.')
        expect(field.length).toEqual(1);
    })

    test('test title2',()=>{
        const wrapper = setup().render();
        let field = findByTestAttr(wrapper, 'title2')
        expect(field.text()).toBe(' توجه داشته باشید که رزومه ی شما توسط دیگر کاربران قابل مشاهده می باشد.')
        expect(field.length).toEqual(1);
    })

    test('test image src & links',()=>{
        const wrapper = setup().render();
        expect(findByTestAttr(wrapper,'flesh1').prop('src')).toBe('flesh1.svg');
        expect(findByTestAttr(wrapper,'idea').text()).toBe('چند سایت پیشنهادی برای ساخت رزومه');
        expect(findByTestAttr(wrapper,'userProfile').prop('src')).toBe('www.svg');
        expect(findByTestAttr(wrapper,'karboom.io').prop('href')).toBe('https://karboom.io');
        expect(findByTestAttr(wrapper,'karboom.io').text()).toBe(' سایت کاربوم ');
        expect(findByTestAttr(wrapper,'cvbuilder.me').prop('href')).toBe('https://cvbuilder.me');
        expect(findByTestAttr(wrapper,'cvbuilder.me').text()).toBe(' سایت سی وی بیلدر ');
        expect(findByTestAttr(wrapper,'rezome.com').prop('href')).toBe('https://rezome.com');
        expect(findByTestAttr(wrapper,'rezome.com').text()).toBe(' سایت رزومه دات کام ');
    })

    test('snapshot',()=>{
        const shot = <Resume/>
        const snapshot = renderer.create(shot).toJSON();
        expect(snapshot).toMatchSnapshot();

    })
})
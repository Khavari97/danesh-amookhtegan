import React from 'react';
import Enzyme, { shallow, configure, mount } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { Provider } from "react-redux";
import App from "./memberShip";
import store from "../../../redux/store"
import sinon from "sinon";
import { render, screen, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Button } from '@material-ui/core';
import renderer from "react-test-renderer";


configure({ adapter: new Adapter() })
const setup = (props = {}) => {
    return shallow(
        <Provider store={store}>
            <App {...props} />
        </Provider>
    );
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

describe('test public profile component', () => {

    test('render without error', () => {
        const wrapper = setup();
        expect(wrapper).toBeTruthy();
        expect(wrapper.length).toEqual(1);
    })

    test('test title', () => {
        const wrapper = setup();
        let field = findByTestAttr(wrapper, 'personal')
        expect(field).not.toBeUndefined();
        expect(field.length).toBe(0);
        expect(field).toBeTruthy();
    })

    test('props', () => {
        const wrapper = setup();
        wrapper.setProps({
            avatar: "avatar",
            firstName: 'zahra',
            lastName: 'khavari',
            city: 'tehran',
            province: 'tehran',
            description: 'description',
            url: 'string'
        })
        expect(wrapper.length).toBe(1);
        expect(wrapper).toBeTruthy();
        expect(wrapper).toBeDefined();
    })

    it('check props not render without class', () => {
        let wrapper = setup();

        let props = {
            label: 'button', onClick: () => { }
        }

        wrapper.setProps(props)

        expect(wrapper.props()).not.toEqual(props);
        expect(wrapper.props().label).toBeUndefined()

    })

    it('simulate button', () => {
        let wrapper = setup();
        const mockCallBack = sinon.spy();
        let props = {
            label: 'button', onClick: mockCallBack
        }
        wrapper.setProps(props)
        wrapper.update();
        expect(mockCallBack).toHaveProperty('callCount', 0);
    })


});

describe('test public profile states', () => {
    let fields = [
        [{
            title: 'نام',
            name: 'firstName',

        },
        {
            title: 'نام خانوادگی',
            name: 'lastName',

        }
        ],
        {
            title: 'جنسیت',
            name: 'genderDisplay',

        },
        {
            title: 'نام کاربری',
            name: 'username',

        },
        {
            title: 'ایمیل',
            name: 'email',

        },
        [{
            title: 'استان',
            name: 'province',
            value: 'تهران'
        },
        {
            title: 'شهر',
            name: 'city',

        }],

        {
            title: 'دانشگاه',
            name: 'university',

        },
        {
            title: 'شماره تلفن',
            name: 'phoneNumber',

        }
    ]

    let data = {
        avatar: "http://api.planb.markop.ir/media/defaults/default.png",
        city: "تهران",
        description: "دانشجوی دانشگاه خوارزمی ترم 6",
        email: "atena.ganji.ag@gmail.com",
        firstName: "آتنا",
        genderDisplay: "زن",
        lastName: "گنجی",
        phoneNumber: "+989011625458",
        province: "تهران",
        resume: null,
        skills: [{ code: "21", name: "css" }, { code: "8", name: "Git" }, { code: "7", name: "MYSQL" }],
        university: "خوارزمی",
        url: "/users/atena/",
        username: "atena",
    }

    let projects = [
        {
            name: "اساتید",
            description: "ما دنبال بهترین ساختار برای ایجاد یک تیم قوی برای کمک به دانشجویان هستیم.",
            name: "اساتید",
            role: "حذف شده",
            status: { code: "STARTED", label: "شروع شده" },
            url: "/projects/%D8%A7%D8%B3%D8%A7%D8%AA%DB%8C%D8%AF/",
        },
        {
            name: "نوبت دهی",
            description: "رهبری گروهی بزرگ نیاز به یک تیمی فرهیختته دارد ما از شما دعوت به همکاری می کنیم تا بهترین تیم را برای خود داشته باشیم.",
            name: "نوبت دهی",
            role: "درخواست داده شده",
            status: { code: "STARTED", label: "شروع شده" },
            url: "/projects/%D9%86%D9%88%D8%A8%D8%AA-%D8%AF%D9%87%DB%8C/",
        }
    ]
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
    });

    test('check states', () => {
        wrapper.setState({
            fields: fields,
            data: data,
            projects: projects
        })

        wrapper.update()

        expect(wrapper.state('data')).toEqual(data);
        expect(wrapper.state('data')).not.toEqual({});
        expect(wrapper.state('projects')).toEqual(projects);
        expect(wrapper.state('projects')).not.toEqual({});

        expect(findByTestAttr(wrapper, 'resume').find(Button).prop('disabled')).toEqual(true);
    })
    test('snapshot', () => {
        const snapshot = renderer.create(wrapper).toJSON();
        expect(snapshot).toMatchSnapshot();
    })

});
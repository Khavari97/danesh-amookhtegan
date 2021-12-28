import React from 'react';
import Enzyme, { shallow ,mount} from "enzyme";
import Login from './SignInForm/SignInForm';
import {Button } from "../../../components/material-ui";
import EnzymeAdapter from "enzyme-adapter-react-16";
import {render, screen,prettyDOM,act,waitFor,wait, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import sinon from 'sinon';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
    return shallow(<Login {...props} />);
};
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};


//integration testing signin

describe('Test case for testing login', () => {

    test('username input render check', () => {
        const wrapper = setup();
        let username=findByTestAttr(wrapper,'username')
        // expect(username.length).toEqual(1);
    })
    test('password input  render check', () => {
        const wrapper = setup();
        let password=findByTestAttr(wrapper,'password')
        // expect(password.length).toEqual(1);
    })
    test('button render check', () => {
        const wrapper = setup();
        let btn=wrapper.find(Button)
        expect(btn.length).toEqual(1);
        expect(btn.prop("type")).toBe("submit");
        expect(btn.prop("color")).toBe("primary");
    })
    test('formik render check', () => {
        const wrapper = setup();
        const signupForm =findByTestAttr(wrapper,'form')
        expect(signupForm.length).toEqual(1);
    })
})
//
//
//
// ///integration testing signin
// describe('integration testing signin', () => {
//
//     test('user signin success', async () => {
//
//         const handleSubmit= jest.fn();
//          act( async () => render(<Login onSubmit={handleSubmit}/>));
//
//          fireEvent.change(screen.getByRole('textbox'), { target: { value: 'yuch' } });
//          expect(screen.getByRole('textbox').value).toBe('yuch');
//
//          fireEvent.change(screen.getByTestId('password').querySelector('input'), { target: { value: 'testpwd1234' } });
//          expect(screen.getByTestId('password').querySelector('input').value).toBe('testpwd1234');
//
//
//         fireEvent.click(screen.queryByRole('button'))
//
//         await wait(() => {
//             expect(handleSubmit).toHaveBeenCalledTimes(1);
//           });
//
//     })
//
//     test('user signin fail', async() => {
//
//         const handleSubmit= jest.fn();
//          act( async () => render(<Login onSubmit={handleSubmit}/>));
//
//          fireEvent.change(screen.getByRole('textbox'), { target: { value: 'تستیییی' } });
//          expect(screen.getByRole('textbox').value).toBe('تستیییی');
//
//          fireEvent.change(screen.getByTestId('password').querySelector('input'), { target: { value: 'testpwd1234' } });
//          expect(screen.getByTestId('password').querySelector('input').value).toBe('testpwd1234');
//
//
//         fireEvent.click(screen.queryByRole('button'))
//
//         await wait(() => {
//             expect(handleSubmit).toHaveBeenCalledTimes(0);
//           });
//
//     })
//
// })
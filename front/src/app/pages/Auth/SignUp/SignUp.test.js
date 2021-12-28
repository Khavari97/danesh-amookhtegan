import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import EmailForm from './Forms/EmailForm/EmailForm';
import SetPassword from './Forms/SetProfileForm/SetPasswordForm';
import SetUserName from './Forms/SetProfileForm/SetUserNameForm';
import { Button } from "../../../components/material-ui";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { render, screen, prettyDOM, act, waitFor, wait, fireEvent } from '@testing-library/react'

import sinon from 'sinon';
import { apiUrl } from '../../../api/_api';
import moxios from 'moxios';
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { SnackbarProvider } from 'notistack';

///integration testing signin

describe('integration testing signin', () => {

    //emailform    
    test('EmailForm success', async () => {

        const handleSubmit = jest.fn();
        await act(async () => render(<SnackbarProvider maxSnack={3}> <EmailForm onSubmit={handleSubmit} /></SnackbarProvider>));

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test@gmail.com' } });
        expect(screen.getByRole('textbox').value).toBe('test@gmail.com');


        fireEvent.click(screen.queryByRole('button'))

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledWith({ email: 'test@gmail.com' });

            moxios.stubRequest(apiUrl + `user/signup/`, {
                status: 200, response: { email: 'test@gmail.com' }
            });
            console.log(EmailForm)
        });


    })

    test('EmailForm fail', async () => {

        const handleSubmit = jest.fn();
        act(async () => render(<SnackbarProvider> <EmailForm onSubmit={handleSubmit} /></SnackbarProvider>));

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testgmai.com' } });
        expect(screen.getByRole('textbox').value).toBe('testgmai.com');

        fireEvent.click(screen.queryByRole('button'))

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledTimes(0);
            expect(handleSubmit).not.toHaveBeenCalledWith({ email: 'test@gmail.com' });
        });

    })


    //password form

    test('PasswordForm success', async () => {

        const handleSubmit = jest.fn();
        await act(async () => render(<SnackbarProvider><Provider store={store}><SetPassword onSubmit={handleSubmit} /></Provider></SnackbarProvider>));

        fireEvent.change(screen.getByTestId('password').querySelector('input'), { target: { value: '1234' } });
        expect(screen.getByTestId('password').querySelector('input').value).toBe('1234');

        fireEvent.change(screen.getByTestId('confirm_password').querySelector('input'), { target: { value: '1234' } });
        expect(screen.getByTestId('confirm_password').querySelector('input').value).toBe('1234');

        fireEvent.click(screen.queryByRole('button'))

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledWith({ password: '1234', confirmPassword: '1234' });
        });
    })

    test('PasswordForm fail', async () => {

        const handleSubmit = jest.fn();
        await act(async () => render(<SnackbarProvider> <Provider store={store}> <SetPassword onSubmit={handleSubmit} /></Provider></SnackbarProvider>));

        fireEvent.change(screen.getByTestId('password').querySelector('input'), { target: { value: '1234' } });
        expect(screen.getByTestId('password').querySelector('input').value).toBe('1234');

        fireEvent.change(screen.getByTestId('confirm_password').querySelector('input'), { target: { value: '12346' } });
        expect(screen.getByTestId('confirm_password').querySelector('input').value).toBe('12346');

        fireEvent.click(screen.queryByRole('button'))

        await waitFor(() => {
            expect(handleSubmit).not.toHaveBeenCalledWith({ password: '1234', confirmPassword: '1234' });
            expect(handleSubmit).toHaveBeenCalledTimes(0);
        });

    })


    //set username form
    test('UserName success', async () => {

        const handleSubmit = jest.fn();
        await act(async () => render(<SnackbarProvider><Provider store={store}><SetUserName onSubmit={handleSubmit} /></Provider></SnackbarProvider>));

        fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'test' } });
        expect(screen.getAllByRole('textbox')[0].value).toBe('test');


        fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'تست' } });
        expect(screen.getAllByRole('textbox')[1].value).toBe('تست');

        fireEvent.change(screen.getAllByRole('textbox')[2], { target: { value: 'تستی' } });
        expect(screen.getAllByRole('textbox')[2].value).toBe('تستی');


        fireEvent.click(screen.queryByRole('button'))

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledWith({
                userName: 'test',
                name: 'تست',
                family: 'تستی'
            });
        });
    })

    test('UserName fail', async () => {

        const handleSubmit = jest.fn();
        await act(async () => render(<SnackbarProvider> <Provider store={store}> <SetUserName onSubmit={handleSubmit} /></Provider></SnackbarProvider>));
        fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'تستی' } });
        expect(screen.getAllByRole('textbox')[0].value).toBe('تستی');


        fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'test' } });
        expect(screen.getAllByRole('textbox')[1].value).toBe('test');

        fireEvent.change(screen.getAllByRole('textbox')[2], { target: { value: 'test' } });
        expect(screen.getAllByRole('textbox')[2].value).toBe('test');

        fireEvent.click(screen.queryByRole('button'))

        await waitFor(() => {
            expect(handleSubmit).not.toHaveBeenCalledWith({
                userName: 'تستی',
                name: 'test',
                family: 'test'
            });
            expect(handleSubmit).toHaveBeenCalledTimes(0);
        });

    })

})
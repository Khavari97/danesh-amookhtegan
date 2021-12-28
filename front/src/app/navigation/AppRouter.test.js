import React from 'react';
import ReactDOM from 'react-dom';
import { mount ,configure} from 'enzyme';
import { MemoryRouter } from 'react-router';
import NotFoundPage from './../pages/PageNotFound/PageNotFound';
import Home from './../pages/Home/Home';
import SignIn from './../pages/Auth/SignIn/SignIn';
import SignUp from './../pages/Auth/SignUp/VerifyEmail';
import Dashboard from './../pages/Dashboard/DashboardHome';
import App from './AppRouter';
import { isAuthenticated } from '../api/storage';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import {Provider} from "react-redux";
import store from "../redux/store";
import { PublicNavbar } from '../layouts/PublicNavbar/PublicNavbar';
import Navbar from '../layouts/navbar/navbar';
import { AuthRoutesEnum, DashboardRoutesEnum, UserRoutesEnum } from './RoutesEnum';
import Profile from "../pages/UserProfile/UserProfile";

configure({ adapter: new Adapter() })


//mock isAuthenticate func
jest.mock('../api/storage', () => ({
    isAuthenticated: jest.fn(),
}));


//test 404 page
it('invalid path should redirect to 404', () => {

  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/random' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(NotFoundPage)).toHaveLength(1);
});

//test home page
it('redirect to / when authenticate', () => {
    isAuthenticated.mockImplementation(()=> true);
    const wrapper = mount(
      <Provider store={store}>
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Navbar)).toHaveLength(1);
    expect(wrapper.find(PublicNavbar)).toHaveLength(0);
    expect(wrapper.find(Dashboard)).toHaveLength(1);
    expect(wrapper.find(NotFoundPage)).toHaveLength(0);
  });

  it('redirect to / when user not authenticate', () => {
    isAuthenticated.mockImplementation(()=> false);
    const wrapper = mount(
      <Provider store={store}>
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Navbar)).toHaveLength(0);
    expect(wrapper.find(PublicNavbar)).toHaveLength(1);
    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(NotFoundPage)).toHaveLength(0);
  });


//test dashboard  
it('return dashboard when authenticate', () => {
  isAuthenticated.mockImplementation(()=> true);
  const wrapper = mount(
    <Provider store={store}>
    <MemoryRouter initialEntries={[ DashboardRoutesEnum.DASHBOARD ]}>
      <App/>
    </MemoryRouter>
    </Provider>
  );
  expect(wrapper.find(Navbar)).toHaveLength(1);
  expect(wrapper.find(PublicNavbar)).toHaveLength(0);
  expect(wrapper.find(Dashboard)).toHaveLength(1);
  expect(wrapper.find(NotFoundPage)).toHaveLength(0);
});

  it('return dashboard when user not authenticate', () => {
    isAuthenticated.mockImplementation(()=> false);
    const wrapper = mount(
      <Provider store={store}>
      <MemoryRouter initialEntries={[DashboardRoutesEnum.DASHBOARD  ]}>
        <App/>
      </MemoryRouter>
      </Provider>
    );
  expect(wrapper.find(Navbar)).toHaveLength(0);
  expect(wrapper.find(PublicNavbar)).toHaveLength(1);
  expect(wrapper.find(Dashboard)).toHaveLength(1);
  expect(wrapper.find(NotFoundPage)).toHaveLength(0);
});


//test signin
it('return signin when user not authenticate', () => {
  isAuthenticated.mockImplementation(()=> false);
  const wrapper = mount(
    <Provider store={store}>
    <MemoryRouter initialEntries={[ AuthRoutesEnum.SIGN_IN ]}>
      <App/>
    </MemoryRouter>
    </Provider>
  );
expect(wrapper.find(Navbar)).toHaveLength(0);
expect(wrapper.find(PublicNavbar)).toHaveLength(0);
expect(wrapper.find(SignIn)).toHaveLength(1);
expect(wrapper.find(NotFoundPage)).toHaveLength(0);
});

it('return signin when user is authenticate', () => {
  isAuthenticated.mockImplementation(()=> true);
  const wrapper = mount(
    <Provider store={store}>
    <MemoryRouter initialEntries={[ AuthRoutesEnum.SIGN_IN ]}>
      <App/>
    </MemoryRouter>
    </Provider>
  );
expect(wrapper.find(Navbar)).toHaveLength(1);
expect(wrapper.find(PublicNavbar)).toHaveLength(0);
expect(wrapper.find(Home)).toHaveLength(1);
expect(wrapper.find(NotFoundPage)).toHaveLength(0);
});


//test signup
it('return signup when user is authenticate', () => {
  isAuthenticated.mockImplementation(()=> true);
  const wrapper = mount(
    <Provider store={store}>
    <MemoryRouter initialEntries={[ AuthRoutesEnum.SIGN_UP_VERIFY ]}>
      <App/>
    </MemoryRouter>
    </Provider>
  );
expect(wrapper.find(Navbar)).toHaveLength(1);
expect(wrapper.find(PublicNavbar)).toHaveLength(0);
expect(wrapper.find(Home)).toHaveLength(1);
expect(wrapper.find(NotFoundPage)).toHaveLength(0);
});

it('return signup when user is not authenticate', () => {
  isAuthenticated.mockImplementation(()=> false);
  const wrapper = mount(
    <Provider store={store}>
    <MemoryRouter initialEntries={[ AuthRoutesEnum.SIGN_UP_VERIFY ]}>
      <App/>
    </MemoryRouter>
    </Provider>
  );
expect(wrapper.find(Navbar)).toHaveLength(0);
expect(wrapper.find(PublicNavbar)).toHaveLength(0);
expect(wrapper.find(SignUp)).toHaveLength(1);
expect(wrapper.find(NotFoundPage)).toHaveLength(0);

});

//test profile
it('return profile when authenticate', () => {
  isAuthenticated.mockImplementation(()=> true);
  const wrapper = mount(
    <Provider store={store}>
    <MemoryRouter initialEntries={[ UserRoutesEnum.USER_PROFILE ]}>
      <App/>
    </MemoryRouter>
    </Provider>
  );
  
  expect(wrapper.find(Navbar)).toHaveLength(1);
  expect(wrapper.find(PublicNavbar)).toHaveLength(0);
  expect(wrapper.find(Profile)).toHaveLength(1);
  expect(wrapper.find(NotFoundPage)).toHaveLength(0);
});

it('return profile when user not authenticate', () => {
    isAuthenticated.mockImplementation(()=> false);
    const wrapper = mount(
      <Provider store={store}>
      <MemoryRouter initialEntries={[UserRoutesEnum.USER_PROFILE ]}>
        <App/>
      </MemoryRouter>
      </Provider>
    );

  expect(wrapper.find(Navbar)).toHaveLength(0);
  expect(wrapper.find(PublicNavbar)).toHaveLength(0);
  expect(wrapper.find(SignIn)).toHaveLength(1);
  expect(wrapper.find(NotFoundPage)).toHaveLength(0);
});


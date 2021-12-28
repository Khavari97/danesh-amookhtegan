import React from "react" 
import Enzyme, { shallow,configure,mount,createMount } from "enzyme";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import {render, screen,prettyDOM,act,waitFor,wait, fireEvent} from '@testing-library/react'
import {Provider} from "react-redux";
import store from "./../../../redux/store";
import { toHaveStyle } from '@testing-library/jest-dom'
import Home from './../../../pages/Home/Home'
import Search from './../../../pages/Search/Search'
import { BrowserRouter } from 'react-router-dom'

function MockTheme({ children }) {
    const theme = createMuiTheme({});
    const themeWidth = createMuiTheme({ props: { MuiWithWidth: { initialWidth: 'xs' } } })
    return <ThemeProvider theme={{...theme}}>{children}</ThemeProvider>;
  }
 
  configure({ adapter: new Adapter() })

  describe('styled component Typography', () => {
   
     it('check font-size  body1', () => {
        act( async () => render(
            <MockTheme>
                <Provider store={store}>
               <Home/>
            </Provider>
                </MockTheme>
            ));
      expect(screen.getByTestId('body1')).toHaveStyle('font-size: 1rem') 

     })

  })




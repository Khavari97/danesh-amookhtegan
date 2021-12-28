import React from 'react';
import {createMuiTheme, ThemeProvider as TP} from '@material-ui/core/styles';
import * as palettes from './palette/palette'
import RTL from './rtl/rtl'
import "../../fonts/fonts.scss"


export const theme = createMuiTheme({
    palette: palettes.palette,
    direction: 'rtl',
    typography: {
        fontSize: 18,
        fontFamily: "Shabnam, Arial",
        h2: {
            fontSize: "3rem",
            fontWeight: "bold",
            "@media (max-width:768px)": {
                fontSize: "2.5rem",
            },
            "@media (max-width:375px)": {
                fontSize: "2rem",
            },
        },
        h1: {
            fontSize: "2.3rem",
            fontWeight: "bold",
            "@media (max-width:768px)": {
                fontSize: "2rem",
            },
            "@media (max-width:375px)": {
                fontSize: "1.8rem",
            },
        },
        body1: {
            fontSize: "1rem",
            "@media (max-width:768px)": {
                fontSize: "1rem",
            },
            "@media (max-width:375px)": {
                fontSize: "0.8rem !important",
            },
        }
    },
})
export default function ThemeProvider(props: any) {
    return (
        <TP theme={theme}>
            <RTL>
                {props.children}
            </RTL>
        </TP>
    );
}
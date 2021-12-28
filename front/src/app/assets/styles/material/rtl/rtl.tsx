import React from 'react';
import {create} from 'jss';
import rtl from 'jss-rtl';
import {jssPreset, StylesProvider} from '@material-ui/core/styles';

const jss = create({plugins: [...jssPreset().plugins, rtl()]});

const Rtl = (props: any) => {
    return (

        <StylesProvider jss={jss}>
            {props.children}
        </StylesProvider>

    );
}
export default Rtl


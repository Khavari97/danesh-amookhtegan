import React from 'react'
import {Button, ButtonProps} from '@material-ui/core';

const button = (props: ButtonProps) => {
    return (
        <Button {...props}></Button>
    )
}
export default button
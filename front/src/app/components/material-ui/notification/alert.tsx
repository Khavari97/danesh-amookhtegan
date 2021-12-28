import React from 'react';
import {Alert, AlertProps} from "@material-ui/lab";


const alert = (props: AlertProps) => {
    return (
        <Alert {...props}></Alert>
    )
}
export default alert


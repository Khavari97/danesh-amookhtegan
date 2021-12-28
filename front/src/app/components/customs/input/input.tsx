import React from 'react'
import {Input} from '../../material-ui'
import {withStyles} from '@material-ui/core/styles';


export const CssTextField = withStyles({
    root: {
        '&.MuiFormControl-root': {
            width: '100%',
            marginBottom: '1em',
        },
        '& .MuiInputLabel-outlined': {
            transform: ' translate(10px, 10px) scale(1)',
            '&:hover .MuiOutlinedInput-notchedOutline ': {
                borderColor: ' var(--secondary)',
            },
        },
        '& .MuiInputLabel-shrink': {
            transform: ' translate(14px, -9px) scale(0.75)',
        },

    },
})(Input);

interface Props {
    items: {
        id: string,
        label: string,
        placeholder: string,
        type: string,
        name: string,
        value: string,
        onChange?: any,
        defaultValue?: any,
        error?: boolean | undefined,
        helperText?: string | false | undefined,
        data_test?:string
    };
}

const mouseOver = (evt: any | undefined, placeholder: string) => {
    let textField: any = evt?.target
    textField?.focus()
    textField?.setAttribute('placeholder', placeholder)
}
const mouseLeave = (event: any) => {
    let textField: any = event?.target
    textField?.blur()
}
//we can use simple function no react
const input: React.FC<Props> = props => {
    return <CssTextField
        data-test={props.items?.data_test}
        // eslint-disable-next-line no-restricted-globals
        onMouseOver={() => mouseOver(event, props.items.placeholder)}
        onBlur={mouseLeave}
        type={props.items?.type}
        value={props?.items?.value}
        onChange={props.items?.onChange}
        error={props.items?.error}
        helperText={props.items?.helperText}
        name={props.items?.name}
        label={props.items?.label}
        data-testid={props.items?.data_test }
        defaultValue={props.items?.defaultValue}
        variant="outlined"/>
};

export default React.memo(input);
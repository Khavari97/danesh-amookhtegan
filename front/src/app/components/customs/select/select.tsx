import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import { useDispatch } from "react-redux";
import { FilterCity } from './../../../redux/User/Profile/Actions'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            minWidth: 120,
            width: "100%",
            marginBottom: "1em",
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

interface valueItem {
    code: any,
    name: any
    province?: any
}

interface valueItems extends Array<valueItem> {
}

interface IProps {
    object: {
        label: string
        valueId?: any
        value?: any
        items: valueItems
        onChange: any
        name?: string
        setFieldValue?: any
        data_test?:any
    }
}

const SimpleSelect: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();



    const handleChange = (e: any) => {
        props.object?.onChange();
        if (props.object?.setFieldValue) {
            props.object?.setFieldValue(props.object?.name, e.target.value)
        }
        if (props.object?.name === 'province') {
            dispatch(FilterCity(e.target.value));
        }
    };
    useEffect(() => {
        if (props.object.name === 'province') {
        }
    }, [])
    return (<FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{props.object?.label}</InputLabel>
        <Select
            data-testid='select'
            labelId="demo-simple-select-outlined-label"
            value={(props.object?.value) ? props.object?.value : ''}
            onChange={handleChange}
            onSelect={(value) => {
                props.object.setFieldValue(props.object.name, value)
            }}
            inputProps={{
                name: "age",
                id: "demo-controlled-open-select",
                "data-testid": props.object.data_test
            }}
            label={props.object?.label}
            name={props.object?.name}
        >
            {
                props.object?.items.map((element: any, index: number) => {

                    return (<MenuItem key={index} value={element.id}>{element.name}</MenuItem>)
                })
            }

        </Select>
    </FormControl>)

}
export default SimpleSelect
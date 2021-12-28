import React, {useEffect} from 'react'
import {Button} from "../../../../../components/material-ui"
import CustomInputs from '../../../../../components/customs/input/input'
import {AuthRoutesEnum} from "../../../../../navigation/RoutesEnum";
import {connect} from 'react-redux'
import Style from '../../SignUp.module.scss'
import * as yup from "yup";
import {useFormik} from "formik"
import {apiClient} from "../../../../../api/_api";
import {useHistory} from "react-router-dom";
import {SET_PASSWORD, SET_PROFILE} from '../../../../../redux/User/Auth/SignUp/ActionTypes'

const SetPasswordForm = (props: any) => {
    let history = useHistory()
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code')
        if (code !== null && code !== undefined && code !== "") {
            apiClient.get(`user/verify/?code=${code}`, {consoleMessage: true, notifyMessage: true}).then(res => {
                props.setTemp(res)
            }).catch(() => {
                history?.push(AuthRoutesEnum.SIGN_UP)
            })
        } else {
            history?.push(AuthRoutesEnum.SIGN_UP)
        }

    }, [])
    //use formik hook
    //validate for form
    const validationSchema = yup.object({
        password: yup
            .string()
            .max(128, "حداکثر 128 حرف میتوانید وارد کنید")
            .min(1, "حداقل 1 حرف میتوانید وارد کنید")
            .matches(/^\S*$/, "فاصله قبول نمیباشد")
            .required("لطفا رمز عبور خود را وارد کنید"),
        confirmPassword: yup
            .string()
            .required("لطفا تکرار رمز عبور خود را وارد کنید")
            .max(128, "حداکثر 128 حرف میتوانید وارد کنید")
            .min(1, "حداقل 1 حرف میتوانید وارد کنید")
            .matches(/^\S*$/, "فاصله قبول نمیباشد")
            .oneOf([yup.ref('password'), ""], 'لطفا تکرار رمز خود را به درستی وارد کنید')
    });
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            props.onSubmit(formik.values)
            props.setPass(formik.values.password)
            history.push(AuthRoutesEnum.SIGN_UP_SET_PROFILE + '/?code=' + props.temp.code)
        },
        isInitialValid: false,
    });


    let fields = [
        {
            id: 'signInputs',
            type: "password",
            name: "password",
            label: "رمز عبور",
            data_test:"password",
            placeholder: "",
            value: formik.values.password,
            onChange: formik.handleChange,
            error: Boolean(formik.errors.password),
            helperText: formik.errors.password,
        },
        {
            id: 'signInputs',
            type: "password",
            name: "confirmPassword",
            label: "تکرار رمز عبور",
            data_test:"confirm_password",
            placeholder: "",
            value: formik.values.confirmPassword,
            onChange: formik.handleChange,
            error: Boolean(formik.errors.confirmPassword),
            helperText: formik.errors.confirmPassword,
        },
    ]


    const inputs = () => {
        return (fields.map(function (element, index) {
            return (<CustomInputs key={index} items={element}/>)
        }))
    }

    return (
        <form onSubmit={formik.handleSubmit} className={Style.form}>
            <div className={Style.itemContainer}> {inputs()}</div>
            <div className={Style.itemContainer}>
                <a href={"#"}>
                    <Button type="submit" variant="contained" color="primary">ادامه</Button>
                </a>
            </div>
            <div className={Style.itemContainer}>
                <p className="login">قبلا عضو شدی؟ <span><a className="login-link" href={AuthRoutesEnum.SIGN_IN}>وارد شو</a></span></p>
            </div>
        </form>
    )
}

const mapStateToProps = (state: any) => {
    return {
        temp: state.userAuthSignUp.profile
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setPass: (pass: string) => dispatch({type: SET_PASSWORD, payload: pass}),
        setTemp: (temp: object) => dispatch({type: SET_PROFILE, payload: temp}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SetPasswordForm)
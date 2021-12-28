import React, {useEffect, useState} from 'react'
import {Button} from "../../../../../components/material-ui"
import CustomInputs from '../../../../../components/customs/input/input'
import {AuthRoutesEnum} from "../../../../../navigation/RoutesEnum";
import Style from '../../SignUp.module.scss'
import {connect} from 'react-redux'
import * as yup from "yup";
import {useFormik} from "formik";
import {apiClient} from "../../../../../api/_api";
import {useHistory} from "react-router-dom";

const SetUserNameForm = (props: any) => {
    let history = useHistory()
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code')
        if (code !== null && code !== undefined && code !== "") {
            apiClient.get(`user/verify/?code=${code}`, {consoleMessage: true, notifyMessage: true}).then(() => {
            }).catch(() => {
                history?.push(AuthRoutesEnum.SIGN_UP)
            })
        } else {
            history?.push(AuthRoutesEnum.SIGN_UP)
        }

    }, [])

    //validate for form
    const validationSchema = yup.object({
        userName: yup
            .string()
            .required("پر کردن این فیلد اجباری است")
            .max(30, "حداکثر 30 حرف میتوانید وارد کنید")
            .min(1, "حداقل 1 حرف میتوانید وارد کنید")
            .matches(/^[a-zA-Z0-9-_]+$/, "تنها استفاده از حروف انگلیسی مجاز است"),
        name: yup
            .string()
            .required("پر کردن این فیلد اجباری است")
            .max(30, "حداکثر 30 حرف میتوانید وارد کنید")
            .min(1, "حداقل 1 حرف میتوانید وارد کنید")
            .matches(/^[\u0600-\u06FF\s]+$/, "تنها استفاده از حروف فارسی مجاز است"),
        family: yup
            .string()
            .required("پر کردن این فیلد اجباری است")
            .max(30, "حداکثر 30 حرف میتوانید وارد کنید")
            .min(1, "حداقل 1 حرف میتوانید وارد کنید")
            .matches(/^[\u0600-\u06FF\s]+$/, "تنها استفاده از حروف فارسی مجاز است")
    });
    //use formik hook
    const formik = useFormik({
        initialValues: {
            userName: '',
            name: '',
            family: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values: object, {setFieldError}: any) => {
            props.onSubmit(values)
            setIsSubmitting(true)
            let data = {
                temp: {
                    code: props.temp.code
                },
                user: {
                    email: props.temp.email,
                    username: formik.values.userName,
                    password: props.password,
                    firstName: formik.values.name,
                    lastName: formik.values.family
                }
            }

            apiClient.post('user/verify/', {data: data, notifyMessage: true, consoleMessage: true}).then(() => {
                history.push(AuthRoutesEnum.SIGN_IN)
            }).catch(err => {
                console.log(err)
                if (err.status == 400) {
                    if (err.data.detail != undefined) {
                        err.data.detail.map((element: string) => {
                            setFieldError('userName', element)
                            setIsSubmitting(false)
                        })
                    }
                }

            }).finally(() => {
                setIsSubmitting(false)
            })
        },
    });


    let fields = [
        {
            id: 'signInputs',
            type: "text",
            name: "userName",
            label: "نام کاربری ",
            placeholder: "",
            value: formik.values.userName,
            onChange: formik.handleChange,
            error: formik.touched.userName && Boolean(formik.errors.userName),
            helperText: formik.touched.userName && formik.errors.userName,
        },
        {
            id: 'signInputs',
            type: "text",
            name: "name",
            label: "نام ",
            placeholder: "",
            value: formik.values.name,
            onChange: formik.handleChange,
            error: formik.touched.name && Boolean(formik.errors.name),
            helperText: formik.touched.name && (formik.errors.name),
        },
        {
            id: 'signInputs',
            type: "text",
            name: "family",
            label: "نام خانوادگی ",
            placeholder: "",
            value: formik.values.family,
            onChange: formik.handleChange,
            error: formik.touched.family && Boolean(formik.errors.family),
            helperText: formik.touched.family && (formik.errors.family),
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
                <Button disabled={isSubmitting} type="submit" variant="contained" color="primary">ثبت نام</Button>
            </div>
            <div className={Style.itemContainer}>
                <p className="login">قبلا عضو شدی؟ <span><a className="login-link" href={AuthRoutesEnum.SIGN_IN}>وارد شو</a></span></p>
            </div>
        </form>
    )
}

const mapStateToProps = (state: any) => {
    return {
        password: state.userAuthSignUp.password,
        temp: state.userAuthSignUp.profile
    }
}

export default connect(mapStateToProps)(SetUserNameForm)
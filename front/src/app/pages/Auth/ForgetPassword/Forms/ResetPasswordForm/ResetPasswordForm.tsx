import React, {useEffect} from 'react'
import {Button} from "../../../../../components/material-ui"
import CustomInputs from '../../../../../components/customs/input/input';
import {AuthRoutesEnum} from "../../../../../navigation/RoutesEnum";
import Style from '../../../SignIn/SignInForm/SignInForm.module.scss'
import * as yup from "yup";
import {useFormik} from "formik";
import {apiClient} from '../../../../../api/_api'
import {useHistory} from "react-router-dom";

const ResetPasswordForm = () => {

    let history = useHistory()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code')
        if (code !== null && code !== undefined && code !== "") {
            apiClient.get(`user/verify/?code=${code}`, {consoleMessage: true, notifyMessage: true}).then(() => {

            }).catch(() => {
                history.push(AuthRoutesEnum.FORGET_PASSWORD)
            })
        } else {
            history?.push(AuthRoutesEnum.FORGET_PASSWORD)
        }

    }, [])

    const validationSchema = yup.object({
        password: yup
            .string().required("لطفا رمز عبور جدید را وارد کنید")
            .max(128, "حداکثر 128 حرف میتوانید وارد کنید")
            .min(1, "حداقل 1 حرف میتوانید وارد کنید")
            .matches(/^\S*$/, "فاصله قبول نمیباشد"),
        confirmPassword: yup
            .string().required("لطفا تکرار رمز عبور جدید را وارد کنید")
            .max(128, "حداکثر 128 حرف میتوانید وارد کنید")
            .min(1, "حداقل 1 حرف میتوانید وارد کنید")
            .matches(/^\S*$/, "فاصله قبول نمیباشد")
            .oneOf([yup.ref('password'), ""], 'لطفا تکرار رمز عبور را به درستی وارد کنید')
    });
    //use formik hook
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            const query = new URLSearchParams(window.location.search)
            let id = query.entries().next().value[1]
            let data = {
                temp: {
                    code: id,
                    //email: ""
                },
                password: formik.values.password
            }
            apiClient.patch("user/reset-password/", {
                data: data,
                notifyMessage: true,
                consoleMessage: true
            }).then(res => {
                console.log(res)
                history.push(AuthRoutesEnum.SIGN_IN)
            })
        },
    });


    let fields = [
        {
            id: 'signInputs',
            type: "password",
            name: "password",
            label: "رمز عبور جدید",
            placeholder: "",
            value: formik.values.password,
            onChange: formik.handleChange,
            error: formik.touched.password && Boolean(formik.errors.password),
            helperText: formik.touched.password && formik.errors.password,
        },
        {
            id: 'signInputs',
            type: "password",
            name: "confirmPassword",
            label: "تکرار رمز عبور جدید",
            placeholder: "",
            value: formik.values.confirmPassword,
            onChange: formik.handleChange,
            error: formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword),
            helperText: formik.touched.confirmPassword && formik.errors.confirmPassword,
        },
    ]


    const inputs = () => {
        return (fields.map(function (element, index) {
            return (<CustomInputs key={index} items={element}/>)
        }))
    }


    return (
        <form onSubmit={formik.handleSubmit} className={Style.form}>

            <div className={Style.itemContainer}>{inputs()}</div>

            <div className={Style.itemContainer}>
                <a href={""}>
                    <Button type="submit" variant="contained" color="primary">تغییر رمز عبور</Button>
                </a>
            </div>
            <div className={Style.itemContainer}>
                <p className="signup">حساب نداری؟ <span><a className="signup-link" href={AuthRoutesEnum.SIGN_UP}>حساب جدید بساز </a></span></p>
            </div>

        </form>

    )
}
export default ResetPasswordForm



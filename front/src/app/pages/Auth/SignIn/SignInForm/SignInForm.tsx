import React, { useEffect } from "react";
import {Button, Icon} from "../../../../components/material-ui";
import {useFormik} from "formik";
import * as yup from "yup";
import images from "../../../../assets/images";
import CustomInputs from "../../../../components/customs/input/input";
import {AuthRoutesEnum} from "../../../../navigation/RoutesEnum";
import Style from "./SignInForm.module.scss";
import {useDispatch} from "react-redux";
import {Api} from "../../../../redux/User/Auth/SignIn/Actions";
import {useHistory} from "react-router-dom";

const SignInForm = (props:any) => {
    const dispatch = useDispatch();
    const history = useHistory();

    //validate for form
    const validationSchema = yup.object({
        username: yup
            .string()
            .required("لطفا نام کاربری یا ایمیل خود را وارد کنید")
            .min(1, "حداقل 1 حرف میتوانید وارد کنید")
            .max(224, "حداکثر 224 حرف میتوانید وارد کنید")
            .matches(/^[\w.@+-]+$/, "تنها استفاده از حروف انگلیسی مجاز است"),
        password: yup
            .string()
            .required("لطفا رمز عبور خود را وارد کنید")
            .max(128, "حداکثر 128 حرف میتوانید وارد کنید")
            .min(1, "حداقل 1 حرف میتوانید وارد کنید"),
    });
    //use formik hook
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values: { username: string; password: string }) => {
            // props.onSubmit()
            handleSubmit(values.username, values.password);

        },
    });

    let fields = [
        {
            id: "signInputs",
            type: "text",
            name: "username",
            label: "نام کاربری یا ایمیل ",
            placeholder: "xxxxx@gmail.com",
            value: formik.values.username,
            data_test:"username",
            onChange: formik.handleChange,
            error: formik.touched.username && Boolean(formik.errors.username),
            helperText: formik.touched.username && formik.errors.username,
        },
        {
            id: "signInputs",
            type: "password",
            name: "password",
            data_test:"password",
            label: " رمز عبور ",
            placeholder: "",
            value: formik.values.password,
            onChange: formik.handleChange,
            error: formik.touched.password && Boolean(formik.errors.password),
            helperText: formik.touched.password && formik.errors.password,
        },
    ];

    const inputs = () => {
        return fields.map(function (element, index) {
            return <CustomInputs key={index} items={element}/>;
        });
    };

     const handleSubmit = (username: string, password: string) => {
        dispatch(Api(username, password));
    };

    const svgIcon = (
        <Icon>
            <img className={Style.icon} alt="" src={images.auth.google}/>
        </Icon>
    );

    return (
        <form onSubmit={formik.handleSubmit} data-test="form" className={Style.form}>
            
            <div className={Style.itemContainer}>{inputs()}</div>
            <div className={Style.itemContainer}>
                <p>
                    رمز عبور خود را فراموش کرده اید؟{" "}
                    <span>
                        <a href={AuthRoutesEnum.FORGET_PASSWORD}>فراموشی رمز عبور </a>
                    </span>
                </p>
            </div>
            <div className={Style.itemContainer}>
                <a href={""}>
                    <Button  type="submit" variant="contained" color="primary">
                        ورود
                    </Button>
                </a>
            </div>
            <div className={Style.itemContainer}>
                <p>
                    حساب نداری؟{" "}
                    <span>
                        <a href={AuthRoutesEnum.SIGN_UP}>حساب جدید بساز </a>
                    </span>
                </p>
            </div>
        </form>
    );
};

export default SignInForm;

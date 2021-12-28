import React, {useState} from 'react'
import {Button, Icon} from "../../../../../components/material-ui"
import images from "../../../../../assets/images";
import CustomInputs from '../../../../../components/customs/input/input'
import {AuthRoutesEnum} from "../../../../../navigation/RoutesEnum";
import Style from '../../SignUp.module.scss'
import * as yup from "yup";
import {useFormik} from "formik";
import {apiClient} from '../../../../../api/_api'

const EmailForm = (props:any) => {

    const [sendData, setSendData] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timeString, setTimeString] = useState("");


    const Timer = (duration: number) => {
        setSendData(true)
        setIsSubmitting(true)
        let start = Date.now(),
            diff,
            minutes,
            seconds;

        const startTimer = () => {
            diff = duration - (((Date.now() - start) / 1000) | 0);
            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            setTimeString(minutes + ":" + seconds)
            if (diff <= 0) {
                clearInterval(interval)
                setIsSubmitting(false)
                setSendData(false)
            }
        }
        const interval = setInterval(startTimer, 1000)
    }


    //validate for form
    const validationSchema = yup.object({
        email: yup
            .string()
            .required("لطفا ایمیل خودرا وارد کنید")
            .email("لطفا ایمیل خود را به درستی وارد کنید")
            .min(1, "حداقل 1 حرف میتوانید وارد کنید")
            .max(224, "حداکثر 224 حرف میتوانید وارد کنید"),

    });
    //use formik hook
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values: object, {setFieldError}: any) => {
            props.onSubmit(values)
            setIsSubmitting(true)
            apiClient.post("user/signup/", {data: values, headers: {}, notifyMessage: true, consoleMessage: true})
                .then(() => {
                    Timer(60 * 2)
                }).catch(err => {
                if (err.status == 400) {
                    setFieldError('email', err.data.detail)
                }
            }).finally(() => {
                setIsSubmitting(false)
            })
        },
    });

    let fields = [
        {
            id: 'signInputs',
            type: "email",
            name: "email",
            label: "ایمیل",
            placeholder: "xxxxx@gmail.com",
            value: formik.values.email,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            error: formik.touched.email && Boolean(formik.errors.email),
            helperText: formik.touched.email && formik.errors.email,
        },
    ]


    const inputs = () => {
        return (fields.map(function (element, index) {
            return (<CustomInputs key={index} items={element}/>)

        }))

    }

    const svgIcon = (
        <Icon>
            <img className={Style.icon} alt="" src={images.auth.google}/>
        </Icon>
    );

    return (
        <form onSubmit={formik.handleSubmit} className={Style.form}>
            {!sendData ?
                <>

                    <div className={Style.itemContainer}>{inputs()}</div>
                    <div className={Style.itemContainer}>
                        <a href={"#"}>
                            <Button type="submit" disabled={isSubmitting} variant="contained" color="primary">ثبت
                                نام</Button>
                        </a>
                    </div>
                </>
                :
                <div data-testid="timer-test">
                    <div className={Style.itemContainer}>
                        <img className={Style.emailIcon} src={images.auth.receivedEmail} alt=""/>
                        <p>لینک تایید ایمیل با موفقیت ارسال شد</p>
                    </div>
                    <div className={Style.itemContainer}>
                        <p>در صورت عدم دریافت ایمیل پس از گذشت دو دقیقه مجددا امتحان کنید</p>
                        <p id="timer">{timeString}</p>
                    </div>
                    <div className={Style.itemContainer}>
                        <a href={"#"}>
                            <Button type="submit" disabled={true} variant="contained" color="primary">ثبت
                                نام</Button>
                        </a>
                    </div>
                </div>
            }

            <div className={Style.itemContainer}>
                <p className="login">قبلا عضو شدی؟ <span><a className="login-link" href={AuthRoutesEnum.SIGN_IN}>وارد شو</a></span></p>
            </div>
        </form>
    )
}
export default EmailForm
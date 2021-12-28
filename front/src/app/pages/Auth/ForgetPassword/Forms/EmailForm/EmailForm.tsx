import React, {useState} from 'react'
import {Button} from "../../../../../components/material-ui"
import images from "../../../../../assets/images";
import CustomInputs from '../../../../../components/customs/input/input'
import {AuthRoutesEnum} from "../../../../../navigation/RoutesEnum";
import Style from '../../../SignIn/SignInForm/SignInForm.module.scss'
import * as yup from "yup";
import {useFormik} from "formik";
import {apiClient} from '../../../../../api/_api'


const EmailForm = () => {

    //usestate
    const [sendData, setSendData] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timeString, setTimeString] = useState("");

    //func timer
    const Timer = (duration: number) => {
        setIsSubmitting(true)
        setSendData(true)
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
            .string().required("لطفا ایمیل خودرا وارد کنید")
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
            setIsSubmitting(true)
            apiClient.post("user/reset-password/", {
                data: values,
                headers: {'Content-Type': 'application/json'},
                notifyMessage: true,
                consoleMessage: true
            })
                .then(() => {
                    Timer(60 * 2)
                }).catch(err => {
                if (err.status == 400) {
                    setFieldError('email', err.data.detail);
                }
            }).finally(() => {
                setIsSubmitting(false)
            })


        },
    });

    let fields = [{
        id: 'signInputs',
        type: "email",
        name: "email",
        label: "ایمیل",
        placeholder: "",
        value: formik.values.email,
        onChange: formik.handleChange,
        error: formik.touched.email && Boolean(formik.errors.email),
        helperText: formik.touched.email && formik.errors.email,
    },
    ]

    const inputs = () => {
        return (fields.map(function (element, index) {
            return (<CustomInputs key={index} items={element}/>)
        }))
    }

    return (
        <form onSubmit={formik.handleSubmit} className={Style.form}>
            {!sendData ?
                <>
                    <div className={Style.itemContainer}>{inputs()}</div>
                    <div className={Style.itemContainer}>
                        <Button type="submit" disabled={isSubmitting} variant="contained" color="primary">
                            ارسال ایمیل
                        </Button>
                    </div>

                </>
                :
                <>
                    <div className={Style.itemContainer}>
                        <img className={Style.emailIcon} src={images.auth.receivedEmail} alt=""/>
                        <p>لینک تایید ایمیل با موفقیت ارسال شد</p>
                    </div>
                    <div className={Style.itemContainer}>
                        <p>در صورت عدم دریافت ایمیل پس از گذشت دو دقیقه مجددا امتحان کنید</p>
                        <p id="timer">{timeString}</p>
                    </div>
                    <div className={Style.itemContainer}>
                        <Button type="submit" disabled={true} variant="contained" color="primary">
                            ارسال ایمیل
                        </Button>
                    </div>
                </>
            }

            <div className={Style.itemContainer}>
                <p className="login">حساب نداری؟ <span><a className="login-link" href={AuthRoutesEnum.SIGN_UP}>حساب جدید بساز </a></span></p>
            </div>
        </form>

    )
}
export default EmailForm


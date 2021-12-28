import React from "react";
import SetPasswordForm from "./Forms/SetProfileForm/SetPasswordForm";
import AuthLayout from "../../../layouts/auth/auth"
import images from "../../../assets/images";
import {Helmet} from "react-helmet";

const SetPassword = () => {
    return (
        <AuthLayout img={images.auth.signUpImage}>
            <Helmet>
                <title>ثبت نام</title>
            </Helmet>
            <SetPasswordForm/>
        </AuthLayout>

    )
}

export default SetPassword;
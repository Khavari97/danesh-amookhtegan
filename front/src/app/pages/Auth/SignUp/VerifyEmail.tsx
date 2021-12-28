import React from "react";
import EmailForm from "./Forms/EmailForm/EmailForm";
import AuthLayout from "../../../layouts/auth/auth"
import images from "../../../assets/images";
import {Helmet} from "react-helmet";

const VerifyEmail = () => {
    return (
        <AuthLayout img={images.auth.signUpImage}>
            <Helmet>
                <title>ثبت نام</title>
            </Helmet>
            <EmailForm/>
        </AuthLayout>

    )
}

export default VerifyEmail;
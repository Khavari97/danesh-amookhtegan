import React from "react";
import SetPasswordForm from "./Forms/ResetPasswordForm/ResetPasswordForm";
import AuthLayout from "../../../layouts/auth/auth"
import images from "../../../assets/images";

const ResetPassword = () => {
    return (
        <AuthLayout img={images.auth.signInImage}>
            <SetPasswordForm/>
        </AuthLayout>

    )
}

export default ResetPassword;
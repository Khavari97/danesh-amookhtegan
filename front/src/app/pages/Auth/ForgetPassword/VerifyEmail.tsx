import React from "react";
import EmailForm from "./Forms/EmailForm/EmailForm";
import AuthLayout from "../../../layouts/auth/auth"
import images from "../../../assets/images";

const VerifyEmail = () => {
    return (
        <AuthLayout img={images.auth.signInImage}>
            <EmailForm/>
        </AuthLayout>

    )
}

export default VerifyEmail;
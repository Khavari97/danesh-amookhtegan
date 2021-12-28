import React from "react";
import SignInForm from "./SignInForm/SignInForm";
import AuthLayout from "../../../layouts/auth/auth";
import {Helmet} from "react-helmet";
import images from "../../../assets/images";

const SignIn = () => {
    return (
        <AuthLayout img={images.auth.signInImage}>
            <Helmet>
                <title>ورود</title>
            </Helmet>
            <SignInForm/>
        </AuthLayout>

    )
}

export default SignIn;
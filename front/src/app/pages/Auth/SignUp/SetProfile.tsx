import React from "react";
import SetProfileForm from "./Forms/SetProfileForm/SetUserNameForm";
import AuthLayout from "../../../layouts/auth/auth"
import images from "../../../assets/images";
import {Helmet} from "react-helmet";

const SetProfile = () => {
    return (
        <AuthLayout img={images.auth.signUpImage}>
            <Helmet>
                <title>ثبت نام</title>
            </Helmet>
            <SetProfileForm/>
        </AuthLayout>

    )
}

export default SetProfile;
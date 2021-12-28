import React from 'react'
import UserProfileLayout from './../../layouts/UserProfileLayout/UserProfileLayout'
import {Helmet} from "react-helmet";
import {Container, Typography} from "@material-ui/core";
import "animate.css"

const UserProfile = () => {
    return (
        <Container>
            <Helmet>
                <title>پروفایل</title>
            </Helmet>
            <Typography className="animate__animated animate__backInRight"
                        style={{marginBottom: "30px"}} component={"h1"} variant={"h1"}>پروفایل کاربری</Typography>
            <UserProfileLayout/>
        </Container>
    )
}
export default UserProfile
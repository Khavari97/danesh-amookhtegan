import React from "react";
import Search from "../Search/Search";
import {Container, Typography} from "@material-ui/core";


const DashboardHome = () => {
    return (
        <>
            <Container>
                <Typography component={"h1"} variant={"h1"}>خانه</Typography>
                <Search homeVersion/>
            </Container>
        </>
    )
}

export default DashboardHome
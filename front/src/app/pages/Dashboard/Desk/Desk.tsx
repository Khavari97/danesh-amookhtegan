import React from "react";
import {Link} from "react-router-dom";
import {Container, Grid, Typography} from "@material-ui/core";
import CustomTabs, {TabBarProps} from "../../../components/customs/CustomTabs/CustomTabs";
import UserProjects from "./UserProjects/UserProjects";
import RequestedProjects from "./RequestedProjects/RequestedProjects";
import {Button} from "../../../components/material-ui";
import {DashboardRoutesEnum} from "../../../navigation/RoutesEnum";
import {Helmet} from "react-helmet";

const Desk = () => {
    const DeskTabs: TabBarProps[] = [
        {label: "پروژه های من", component: <UserProjects/>},
        {label: "درخواست های من", component: <RequestedProjects/>},
    ]
    return (
        <>
            <Helmet>
                <title>میز کار</title>
            </Helmet>
            <Container>
                <Grid container direction={"row"} alignItems={"center"} style={{marginBottom: 5}}>
                    <Typography data-testid="h1" component={"h1"} variant={"h1"}>میز کار</Typography>
                    <Button variant="contained" color={"primary"} size={"small"} style={{marginRight: "auto"}}>
                        <Link to={DashboardRoutesEnum.CREATE_PROJECT} style={{color: "inherit"}}>تعریف پروژه جدید</Link>
                    </Button>
                </Grid>
                <CustomTabs tabs={DeskTabs}/>
            </Container>
        </>
    )
}

export default Desk;

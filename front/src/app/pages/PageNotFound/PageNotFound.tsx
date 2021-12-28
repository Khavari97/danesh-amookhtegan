import React from "react";
import images from "../../assets/images";
import Grid from '@material-ui/core/Grid';
import Style from "./PageNotFound.module.scss";
import {Button} from "../../components/material-ui";
import {HomeRoutesEnum} from "../../navigation/RoutesEnum";
import {Helmet} from "react-helmet";

const PageNotFound = () => {
    return (
        <Grid container className={Style.content}>
            <Helmet>
                <title>صفحه ای یافت نشد!</title>
            </Helmet>
            <Grid item xs={12} sm={12}>
                <img className={Style.backgroundImage} src={images.error.errorImage} alt={"error background"}/>
            </Grid>

            <Grid item xs={12} sm={12} className={Style.textError}>
                <p> ارور 404 ! صفحه ی مورد نظر یافت نشد !</p>
            </Grid>

            <Grid item xs={12} sm={12}>
                <a href={HomeRoutesEnum.HOME}>
                    <Button className={Style.buttonReturn}> بازگشت به سایت </Button>
                </a>
            </Grid>
        </Grid>
    )
}

export default PageNotFound;
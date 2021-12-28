import React, {PureComponent} from 'react'
import {Grid} from '../../components/material-ui';
import images from "../../assets/images";
import Style from './auth.module.scss'

type Props = {
    img: string | undefined
};

export default class AuthLayout extends PureComponent<Props> {

    render() {
        return (
            <section className={Style.section}>
                <Grid container spacing={4} className={`${Style.formContainer} ${Style.MuiGridRoot}`}>
                    <Grid item xs={12} sm={6} className={Style.muiGridRoot} data-test='children'>
                        {this.props.children}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <img src={this.props.img} className={Style.imgRight} alt={""}/>
                    </Grid>
                </Grid>
                <div className={Style.background}>
                    <img className={Style.background1} src={images.auth.darkGreenDown} alt={"background"} data-test='darkGreenDown'/>
                    <img className={Style.background2} src={images.auth.darkGreenTop} alt={"background"} data-test='darkGreenTop'/>
                    <img className={Style.background3} src={images.auth.lightGreenDown} alt={"background"} data-test='lightGreenDown'/>
                    <img className={Style.background4} src={images.auth.lightGreenTop} alt={"background"} data-test='lightGreenTop'/>
                </div>
            </section>
        )
    }

}
import React, {Component} from 'react';
import Style from "./SendResume.module.scss";
import Grid from "@material-ui/core/Grid";
import {ListItem, Typography} from "@material-ui/core";
import images from "../../../assets/images";

class Resume extends Component {
    render() {
        return (
            <>
                <Grid className={Style.header} item xs={12} sm={12} md={12}>


                    <Grid item>

                        <ListItem><img src={images.userProfile.flesh1} style={{width: '30px'}} alt=""/>
                            <Typography data-test='title1'>در این قسمت شما می توانید رزومه ی خود را به صورت pdf بارگذاری کنید.</Typography></ListItem>
                        <ListItem><span data-test='title2'> توجه داشته باشید که رزومه ی شما توسط دیگر کاربران قابل مشاهده می باشد.</span></ListItem>
                    </Grid>

                    <Grid className={Style.space} item>
                        <ListItem><img data-test='flesh1' src={images.userProfile.flesh1} style={{width: '30px'}} alt=""/>
                            <span data-test='idea'>چند سایت پیشنهادی برای ساخت رزومه</span></ListItem>

                        <Grid style={{marginTop: '10px'}} item>
                            <Grid>
                                <ListItem>
                                    <img data-test='userProfile' src={images.userProfile.www} style={{width: '25px'}} alt=""/>
                                    <span><a href="https://karboom.io" target='_blank' rel={""} data-test='karboom.io'> سایت کاربوم </a></span>
                                </ListItem>
                            </Grid>
                            <Grid>
                                <ListItem>
                                    <img src={images.userProfile.www} style={{width: '25px'}} alt=""/>
                                    <span><a href="https://cvbuilder.me" target='_blank' rel={""} data-test='cvbuilder.me'> سایت سی وی بیلدر </a></span>
                                </ListItem>
                            </Grid>
                            <Grid style={{marginBottom: '50px'}}>
                                <ListItem>
                                    <img src={images.userProfile.www} style={{width: '25px'}} alt=""/>
                                    <span><a href="https://rezome.com" target='_blank' rel={""} data-test='rezome.com'> سایت رزومه دات کام </a></span>
                                </ListItem>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }

}

export default Resume
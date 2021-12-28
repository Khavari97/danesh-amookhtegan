import React, {Component} from 'react';
import Style from "./SendResume.module.scss";
import images from "../../../assets/images";
import UploadFile from "./UploadFile";
import Resume from "./Resume";
import {Button, Grid, Icon, ListItem} from "@material-ui/core";
import {connect} from "react-redux";
import {rootState} from "../../../redux/RootReducer";
import {apiClient} from '../../../api/_api'
import Snackbar from "../../../components/material-ui/Snackbar/SnackbarUtils";
import {GET_RESUME} from "../../../redux/User/Profile/ActionTypes";
import {Helmet} from 'react-helmet'
import Popover from './../../../components/customs/Popover/Popover'
import enums from './../enums'

interface IProps {
    resume: string | null,
    GetResume: any
}

const mapStateToProps = (state: rootState) => {
    return {
        resume: state.userProfile.resume,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        GetResume: (resume: string) => dispatch({type: GET_RESUME, resume: resume})
    }
}

class SendResume extends Component<IProps> {


    deleteResume = () => {
        apiClient.delete('user/profile/resume/').then(res => {
            Snackbar.success('فایل شما حذف گردید')
            this.props.GetResume(null)
        })
    }

    render() {
        const deleteIcon = (
            <Icon>
                <img data-test='userProfile' style={{width: '18px'}} alt="" src={images.userProfile.trash}/>
            </Icon>
        );

        return (
            <>
                <Helmet data-test='title'>
                    <title data-test='title'>رزومه ی من</title>
                </Helmet>
                <div className={Style.resumeContainer}>
                    <Grid container>
                        <Resume/>
                        <Grid container item className={Style.upload}>
                            <Grid className={Style.content} item container>
                                <Grid style={{display: 'table', margin: '0 auto'}} item>
                                    <ListItem>
                                        <img data-test='upload' src={images.userProfile.uploadFile} style={{width: '30px'}} alt=""/>
                                        <p data-test='uploadFile'> بارگذاری فایل رزومه </p>
                                    </ListItem>
                                </Grid>
                                <Grid container style={{display: 'table'}}>
                                    {(this.props.resume) ?
                                        <Grid item>
                                            <Grid className={Style.showFile} xs={12} item container>
                                                <Grid item xs={12} sm={6} className={Style.infoFile}>
                                                    <ListItem style={{padding: '0'}} data-test='pdf'><img
                                                        src={images.userProfile.pdfFile} alt="" data-test='pdf'/>
                                                        <a href={this.props.resume}
                                                           target="_blank">{this.props.resume.split('resume/')[1]}</a></ListItem>
                                                </Grid>
                                                <Grid item xs={12} sm={6} style={{textAlign: 'left'}}>
                                                    <Popover title={enums.popover.delete_resume}>
                                                        <Button size='large' startIcon={deleteIcon}
                                                                onClick={this.deleteResume} color="primary"
                                                                variant="contained" className={Style.btnDelete}
                                                                data-test='button'>
                                                            حذف </Button>
                                                    </Popover>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        :
                                        <div style={{width: '100%', marginTop: '30px'}}>
                                            <UploadFile/>
                                        </div>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendResume)


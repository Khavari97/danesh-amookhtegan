import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {Button, Icon} from "../../../components/material-ui"
import Style from './SetProfile.module.scss'
import {ListItem} from "@material-ui/core";
import PrivateInfo from "./PrivateInfo/PrivateInfo";
import AboutMe from "./AboutMe/AboutMe";
import EditPrivateInfo from "./PrivateInfo/Edit/EditPrivateInfo";
import EditAboutMe from "./AboutMe/Edit/EditAboutMe";
import images from './../../../assets/images/userProfile'
import Avatar from './Avatar/Avatar'
import {connect} from 'react-redux'
import {rootState} from "../../../redux/RootReducer";
import Loading from "../../../components/customs/Loading/Loading";
import {Helmet} from 'react-helmet'
import Popover from './../../../components/customs/Popover/Popover'
import enums from './../enums'

interface IState {
    infoEditButton: boolean,
    aboutEditButton: boolean
}

interface IProps {
    province?: any
    description?: string
    data?: object
    loading?: boolean
}

const mapStateToProps = (state: rootState) => {
    return state.userProfile
}

const mapDispatchToProps = (dispatch: any) => {
    return {}
}

class SetProfile extends Component<IProps, IState> {
    public formInfoRef: any
    public formAboutRef: any

    constructor(props: IProps) {
        super(props);
        this.formInfoRef = React.createRef()
        this.formAboutRef = React.createRef()
        this.state = {
            aboutEditButton: false,
            infoEditButton: false
        }
    }


    aboutButton = () => {
        if (this.state.aboutEditButton) {
            this.formAboutRef.current.handleSubmit()

        }
        this.setState({aboutEditButton: !this.state.aboutEditButton})
    }

    infoButton = () => {
        if (this.state.infoEditButton) {
            this.formInfoRef.current.handleSubmit()

        }
        this.setState({infoEditButton: !this.state.infoEditButton})
    }

    render() {

        const infoIcon = (
            <Icon>
                <img style={{width: '20px'}} alt=""
                     src={(!this.state.infoEditButton) ? images.pencil : images.checkmark}/>
            </Icon>
        );
        const aboutMeIcon = (
            <Icon>
                <img style={{width: '20px'}} alt=""
                     src={(!this.state.aboutEditButton) ? images.pencil : images.checkmark}/>
            </Icon>
        );

        return (
            <>
                <Helmet>
                    <title>پروفایل من</title>
                </Helmet>
                <div className={Style.SetProfile}>
                    <Grid container>
                        <Grid item>
                            <Avatar/>
                        </Grid>
                        <Grid className={Style.header} item container xs={12}>
                            <Grid item xs={12} sm={6}>
                                <ListItem style={{padding: '0'}}><img style={{width: '30px'}} src={images.customer}
                                                                      alt=""/> <p>اطلاعات شخصی</p></ListItem>
                            </Grid>
                            <Grid className={Style.displayFlex} item xs={12} sm={6}>
                                <Popover title={(this.state.infoEditButton) ? enums.popover.edit_info :
                                    enums.popover.save_info}
                                >
                                    <Button id="infoEditButton" variant="contained" startIcon={infoIcon} onClick={this.infoButton}
                                            color="primary">{(this.state.infoEditButton) ? 'ذخیره' : 'ویرایش'}</Button>
                                </Popover>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {(this.state.infoEditButton) ?
                                <EditPrivateInfo forwardedRef={this.formInfoRef}/>
                                :
                                (this.props.loading)
                                    ?
                                    <Loading/>
                                    :
                                    <PrivateInfo/>
                            }
                        </Grid>

                        <Grid className={Style.header} item container xs={12}>
                            <Grid item xs={12} sm={6}>
                                <ListItem style={{padding: '0'}}><img style={{width: '30px'}} src={images.new_topic}
                                                                      alt=""/>  <p>درباره ی من</p></ListItem></Grid>
                            <Grid className={Style.displayFlex} item xs={12} sm={6}>
                                <Popover title={(this.state.aboutEditButton) ? enums.popover.edit_info :
                                    enums.popover.save_info}
                                >
                                    <Button id="aboutEditButton" startIcon={aboutMeIcon} variant="contained" onClick={this.aboutButton}
                                            color="primary">{(this.state.aboutEditButton) ? 'ذخیره' : 'ویرایش'}</Button>
                                </Popover>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {(this.state.aboutEditButton) ?
                                <EditAboutMe forwardedRef={this.formAboutRef}/>
                                :
                                <AboutMe/>
                            }
                        </Grid>
                    </Grid>
                </div>
            </>
        );
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(SetProfile)

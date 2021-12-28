import React, {Component} from 'react';
import {Grid, ListItem, TextareaAutosize} from "@material-ui/core";
import Style from '../../SetProfile.module.scss'
import {Formik} from "formik";
import {connect} from 'react-redux'
import {GetProfile, ProvinceApi} from "../../../../../redux/User/Profile/Actions";
import {rootState} from "../../../../../redux/RootReducer";
import {apiClient} from './../../../../../api/_api'

interface IProps {
    forwardedRef: any
    ProvinceApi: any
    province: any
    GetProfile: typeof GetProfile
    description: string
    data: any
}

const mapStateToProps = (state: rootState) => {
    return {
        province: state.userProfile.provinces,
        data: state.userProfile.data,
        description: state.userProfile.description
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        ProvinceApi: () => dispatch(ProvinceApi()),
        GetProfile: () => dispatch(GetProfile())

    }
}

class EditAboutMe extends Component<IProps, any> {

    postData = (values: any) => {
        let data = {
            firstName: this.props.data.firstName,
            lastName: this.props.data.lastName,
            email: this.props.data.email,
            username: this.props.data.username,
            city: this.props.data.cityObject,
            university: this.props.data.universityObject,
            phoneNumber: this.props.data.phoneNumber,
            description: values.description
        }
        apiClient.patch('user/profile/', {
            data: data,
        })
            .then(() => {
                this.props.GetProfile()
            })
    }

    render() {
        return (
            <Formik
                innerRef={this.props.forwardedRef}
                initialValues={{description: this.props.description}}
                onSubmit={(values, actions) => {
                    this.postData(values)
                    // actions.setSubmitting(false);
                }}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <Grid container className="animate__animated animate__fadeIn">
                            <Grid item xs={12} sm={12}>
                                <Grid className={Style.gridItems} item xs={12} sm={12}>
                                    <ListItem>
                                        <TextareaAutosize name='description' value={props.values.description}
                                                          onChange={props.handleChange}
                                                          aria-label="minimum height"
                                                          data-testid="description"
                                                          style={{width: '100%', fontSize: '20px'}} rowsMin={10}/>
                                    </ListItem>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>

        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EditAboutMe)
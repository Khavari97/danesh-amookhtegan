import React, {Component} from 'react';
import Style from './../SetProfile.module.scss'
import {Grid, ListItem} from "@material-ui/core";
import {connect} from 'react-redux'
import {GetProfile} from "../../../../redux/User/Profile/Actions";
import {rootState} from "../../../../redux/RootReducer";
import Loading from "./../../../../components/customs/Loading/Loading";

interface IState {
    fields?: object | any;
}

interface IProps {
    GetProfile: typeof GetProfile
    description: string
    data: any
    loading: boolean
}

const mapStateToProps = (state: rootState) => {
    return {
        province: state.userProfile.provinces,
        data: state.userProfile.data,
        description: state.userProfile.description,
        loading: state.userProfile.loading
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        GetProfile: () => dispatch(GetProfile())

    }
}

class AboutMe extends Component<IProps, IState> {
    render() {
        return (
            <Grid container className="animate__animated animate__fadeIn">
                {(this.props.loading) ?
                    <Loading/>
                    :
                    <Grid item xs={12} sm={12}>
                        <Grid className={Style.gridItems} item xs={12} sm={12}>
                            <ListItem><p data-testid='desc' className={Style.title}>{this.props.description}</p></ListItem>
                        </Grid>
                    </Grid>
                }
            </Grid>

        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AboutMe)
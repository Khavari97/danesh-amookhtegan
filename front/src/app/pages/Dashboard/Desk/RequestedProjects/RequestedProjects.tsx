import React from "react";
import {Grid} from "../../../../components/material-ui";
import {MenuItem, Select, Typography} from "@material-ui/core";
import RequestCard from "./RequestCard/RequestCard";
import {IRootState} from "../../../../redux/RootReducer";
import {apiClient} from "../../../../api/_api";
import {DeskState} from "../../../../redux/Dashboard/Desk/ActionTypes";
import {Dispatch} from "redux";
import {deskLoading, userRequestAction} from "../../../../redux/Dashboard/Desk/Actions";
import {connect} from "react-redux";
import Loading from "../../../../components/customs/Loading/Loading";
import ProjectNotFound from "../../../../components/customs/ProjectNotFound/ProjectNotFound";
import {Helmet} from "react-helmet";

const mapStateToProps = (store: IRootState) => {
    return store.dashboard.desk
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchUserRequests: (filterStatus = "") => {
            dispatch(deskLoading())
            apiClient.get("dashboard/user-projects/",
                {
                    params: {
                        category: "REQUEST",
                        status: filterStatus,
                    },
                })
                .then((response) => {
                    dispatch(userRequestAction(response))
                })
        }
    }
}

interface IState extends DeskState {
    fetchUserRequests: any;
}


class UserProjects extends React.Component<IState> {
    state = {
        selectValue: ""
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Helmet>
                    <title >درخواست های من</title>
                </Helmet>
                <Grid item xs={12} style={{marginBottom: "15px"}}>
                    <Typography component="span" style={{marginLeft: 20}} data-test='Typography'>
                        دسته بندی بر اساس
                    </Typography>
                    <Select
                        value={this.state.selectValue}
                        onChange={(event) => {
                            this.setState((state) => ({
                                ...state,
                                selectValue: event.target.value
                            }));
                            this.props.fetchUserRequests(event.target.value)
                        }}
                        displayEmpty>
                        <MenuItem value={""} defaultChecked={true}>همه</MenuItem>
                        <MenuItem value={"PENDING"}>در انتظار تایید</MenuItem>
                        <MenuItem value={"DECLINED"}>رد شده</MenuItem>
                    </Select>
                </Grid> {
                this.props.loading ? <Loading/> :
                    <Grid container spacing={3}>
                        {this.props.requests.length !== 0 ?
                            this.props.requests.map((request, index) => {
                                return <Grid item xs={12} sm={4} key={index}><RequestCard {...request}/></Grid>
                            }) : <ProjectNotFound/>}
                    </Grid>
            }
            </Grid>
        )
    }

    componentDidMount() {
        this.props.fetchUserRequests();
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserProjects);
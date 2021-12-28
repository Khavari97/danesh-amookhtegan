import React from "react";
import {Grid} from "../../../../components/material-ui";
import {MenuItem, Select, Typography} from "@material-ui/core";
import UserProjectCard from "./UserProjectCard/UserProjectCard";
import {IRootState} from "../../../../redux/RootReducer";
import {apiClient} from "../../../../api/_api";
import {DeskState} from "../../../../redux/Dashboard/Desk/ActionTypes";
import {Dispatch} from "redux";
import {deskLoading, userProjectAction} from "../../../../redux/Dashboard/Desk/Actions";
import {connect} from "react-redux";
import Loading from "../../../../components/customs/Loading/Loading";
import ProjectNotFound from "../../../../components/customs/ProjectNotFound/ProjectNotFound";
import {Helmet} from "react-helmet";

const mapStateToProps = (store: IRootState) => {
    return store.dashboard.desk
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchUserProject: (filterStatus = "") => {
            dispatch(deskLoading())
            apiClient.get("dashboard/user-projects/",
                {
                    params: {
                        category: "PROJECT",
                        status: filterStatus,
                    },
                })
                .then((response) => {
                    console.log(response)
                    dispatch(userProjectAction(response))
                })
        }
    }
}

interface IState extends DeskState {
    fetchUserProject: any;
}


class UserProjects extends React.Component<IState> {
    state = {
        selectValue: ""
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Helmet>
                    <title data-test='Title'>پروژه‌های من</title>
                </Helmet>
                <Grid item xs={12} style={{marginBottom: "15px"}}>
                    <Typography component="span" style={{marginLeft: 20}} data-test='Typography'>
                        دسته بندی بر اساس
                    </Typography>
                    <Select
                        value={this.state.selectValue}
                        data-test='Select'
                        onChange={(event) => {
                            this.setState((state) => ({
                                ...state,
                                selectValue: event.target.value
                            }));
                            this.props.fetchUserProject(event.target.value)
                        }}
                        displayEmpty>
                        <MenuItem value="" data-test='MenuItem0'>همه</MenuItem>
                        <MenuItem value={"STARTED"} selected data-test='MenuItem1'>در حال انجام</MenuItem>
                        <MenuItem value={"ENDED"} data-test='MenuItem2'>پایان یافته</MenuItem>
                        <MenuItem value={"WAITING"} data-test='MenuItem3'>شروع نشده</MenuItem>
                        <MenuItem value={"DELETED"} data-test='MenuItem4'>لغو شده</MenuItem>
                    </Select>
                </Grid>
                {
                    this.props.loading ? <Loading/> :
                        <Grid container spacing={2}>
                            {this.props.projects.length !== 0 ?
                                this.props.projects.map((project, index) => {
                                    return <Grid item xs={12} sm={6} md={4} key={index}><UserProjectCard {...project}/></Grid>
                                }) : <ProjectNotFound/>}
                        </Grid>
                }

            </Grid>
        )
    }

    componentDidMount() {
        this.props.fetchUserProject();
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserProjects);
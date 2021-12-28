import React, {Component} from "react";
import {Chip, Container, Grid, Typography} from "@material-ui/core";
import CustomTabs from "../../components/customs/CustomTabs/CustomTabs";
import {withRouter} from "react-router";
import {setProjectAction} from "../../redux/Project/Actions";
import Loading from "../../components/customs/Loading/Loading";
import {IRootState} from "../../redux/RootReducer";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {apiClient} from "../../api/_api";
import {AcceptedTabs, AdminTabs, CreatorTabs, NonMemberTabs, PendingTabs, PublicTabs} from "./ProjectTabes";
import {Helmet} from "react-helmet";
import {isAuthenticated} from "../../api/storage";
import ChangeStatus from "./Status/ChangeStatus";


const mapStateToProps = (store: IRootState) => {
    return store.project;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setProjectSlug: (slug: string) => {
            apiClient.get(`dashboard/projects/${slug}/status/`, {})
                .then((response) => {
                    dispatch(setProjectAction(slug, response))
                })
                .catch(() => {
                    window.location.href = "/*/";
                })
        }
    }
}


class Project extends Component<any> {

    setupModules(role: string, status: string) {
        if (!isAuthenticated()) {
            return <CustomTabs tabs={PublicTabs}/>
        } else {
            if (status === "ENDED" || status === "DELETED") {
                return <CustomTabs tabs={PublicTabs}/>
            } else {
                switch (role) {
                    case 'ADMIN':
                        return <CustomTabs tabs={AdminTabs}/>
                    case 'CREATOR':
                        return <CustomTabs tabs={CreatorTabs}/>
                    case 'ACCEPTED':
                        return <CustomTabs tabs={AcceptedTabs}/>
                    case 'PENDING':
                        return <CustomTabs tabs={PendingTabs}/>
                    default :
                        return <CustomTabs tabs={NonMemberTabs}/>
                }
            }
        }
    }

    render() {
        return (
            <Container>
                {
                    this.props.loading ? <Loading/>
                        :
                        <>
                            <Helmet>
                                <title>{this.props.status.name}</title>
                            </Helmet>
                            <Grid container>
                                <Grid item xs={12} md={8} style={{marginLeft: 0}}>
                                    <div style={{
                                        marginBottom: 20,
                                        display: "flex",
                                        alignItems: "center",
                                        overflow: "hidden"
                                    }}>
                                        <Typography component={"h1"}
                                                    variant={"h1"}>{this.props.status.name}</Typography>
                                        <Chip label={this.props.status.status.label} style={{marginRight: 10}}
                                              clickable/>
                                        {this.props.status.role.label ?
                                            <Chip label={this.props.status.role.label} style={{marginRight: 10}}
                                                  clickable/> : null
                                        }
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4} style={{textAlign: "left", marginTop: 10}}>
                                    {
                                        this.props.status.role.code === "CREATOR" ? <div style={{marginRight: "auto"}}>
                                            <ChangeStatus/>
                                        </div> : null
                                    }
                                </Grid>
                            </Grid>
                            {this.setupModules(this.props.status.role.code, this.props.status.status.code)}
                        </>
                }
            </Container>
        )
    }

    componentDidMount() {
        const slug = this.props.match.params.slug;
        this.props.setProjectSlug(slug);
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Project));
import React, {Component} from 'react';
import ProjectRequestCard from "./ProjectRequestCard/ProjectRequestCard";
import {Container, Grid} from "@material-ui/core";
import {apiClient} from "../../../api/_api";
import Loading from "../../../components/customs/Loading/Loading";
import {IRootState} from "../../../redux/RootReducer";
import {connect} from "react-redux";
import NotFound from "../../../components/customs/NotFound/NotFound";


const mapStateToProps = (store: IRootState) => {
    return {
        slug: store.project.slug
    }
}

interface IProps {
    slug: string,
}

class ProjectRequests extends Component<IProps> {
    state: IState = {
        loading: true,
        requestCards: []
    }

    fetchProjectMembers = (slug: string) => {
        apiClient.get(`dashboard/projects/${slug}/members/?status=PENDING`,
            {
                notifyMessage: true,
            })
            .then((response) => {
                this.setState({
                    loading: false,
                    requestCards: response
                })
            })
    }

    render() {
        return (
            <Container>
                {
                    this.state.loading ? <Loading/> :
                        <Grid container spacing={1}>
                            {
                                this.state.requestCards.length !== 0 ?
                                    this.state.requestCards.map((requestCard, index) => {
                                        return <Grid item xs={12} sm={6} md={4}>
                                            <ProjectRequestCard key={index} adminStatus={true} {...requestCard}
                                                                slug={this.props.slug}/>
                                        </Grid>
                                    }) : <NotFound label={" هم اکنون درخواستی به پروژه شما داده نشده است"}/>
                            }
                        </Grid>
                }

            </Container>
        );
    }

    componentDidMount() {
        this.fetchProjectMembers(this.props.slug);
    }
}

export interface IState {
    loading: boolean,
    requestCards: IRequestCard[]
}

export interface IRequestCard {
    avatar: string,
    city: string,
    description: string,
    id: 9,
    name: string,
    province: string,
    role: string,
    username: string
    projectId: number
}

export default connect(mapStateToProps)(ProjectRequests);
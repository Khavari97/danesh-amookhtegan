import React, {Component} from 'react';
import ProjectMemberCard from "./ProjectMemberCard/ProjectMemberCard";
import {Container, Grid} from "@material-ui/core";
import {apiClient} from "../../../api/_api";
import Loading from "../../../components/customs/Loading/Loading";
import {IRootState} from "../../../redux/RootReducer";
import {connect} from "react-redux";
import NotFound from "../../../components/customs/NotFound/NotFound";

const mapStateToProps = (store: IRootState) => {
    return {
        slug: store.project.slug,
        role: store.project.status?.role.code
    }
}

interface IProps {
    slug: string,
    role: any
}

class ProjectMembers extends Component<IProps> {
    state: IState = {
        loading: true,
        memberCards: []
    }

    fetchProjectMembers = (slug: string) => {
        apiClient.get(`dashboard/projects/${slug}/members`,
            {
                notifyMessage: true,
            })
            .then((response) => {
                console.log(response)
                this.setState({
                    loading: false,
                    memberCards: response
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
                                this.state.memberCards.length !== 0 ?
                                    this.state.memberCards.map((memberCard, index) => {
                                        return <Grid item xs={12} sm={6} md={4} key={index}>
                                            {
                                                this.props.role === "ADMIN" || this.props.role === "CREATOR" ?
                                                    <ProjectMemberCard userRole={this.props.role}
                                                                       adminStatus={true} {...memberCard}/> :
                                                    <ProjectMemberCard adminStatus={false} {...memberCard}/>
                                            }

                                        </Grid>
                                    }) : <NotFound label={"فردی در این پروژه یافت نشد."}/>
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
    memberCards: IMemberCard[]
}

export interface IMemberCard {
    avatar: string,
    city: string,
    description: string,
    id: number,
    name: string,
    province: string,
    role: string,
    username: string,
    projectId: number
}

export default connect(mapStateToProps)(ProjectMembers);
import React, { Component } from 'react';
import Loading from "../../components/customs/Loading/Loading";
import { Grid } from "../../components/material-ui";
import ProjectNotFound from "../../components/customs/ProjectNotFound/ProjectNotFound";
import { apiClient } from "../../api/_api";
import ProjectCard from "../../components/customs/ProjectCard/ProjectCard";
import { IRootState } from "../../redux/RootReducer";
import { connect } from "react-redux";
import { Filter, searchPage, setSearchText } from "../../redux/Search/Actions";
import { ISearchState } from "../../redux/Search/ActionTypes";
import { withRouter } from "react-router-dom";
import SearchProjectFilter from "./SearchProjectFilter";
import BasicPagination from "../../components/customs/Pagination/BasicPagination";
import SearchInput from "../../components/customs/SearchInput/SearchInput";


const mapStateToProps = (store: IRootState) => {
    return store.search
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        FilterProjects: (status: string, category: string, skill: string, text: string, countPages: number) => dispatch(Filter(status, category, skill, text, countPages)),
        searchPage: (page: number) => dispatch(searchPage(page)),
        setSearchText: (text: string) => dispatch(setSearchText(text)),
    }
}
interface IState {
    data: any;
    page: any;
    number: any;
    text: any;
}

interface IProps extends ISearchState {
    location: any,
    FilterProjects: any;
    searchPage: any;
    setSearchText: any
}

class ProjectResult extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            number: 1,
            text: ""

        }
    }

    handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        this.props.searchPage(value)
    };


    render() {

        return (
            <>
                <SearchInput data_testid="search-input" text={(event: any) => {
                    if (event.target.value.length >= 3 || event.target.value.length === 0) {
                        this.props.setSearchText(event.target.value)
                    }
                }}
                    default={this.props.text}
                />

                <Grid>
                    <SearchProjectFilter />
                </Grid>

                {
                    this.props.loading ? <Loading /> :
                        <Grid className='animate__animated animate__fadeIn' container spacing={2}>
                            {this.props.projects?.length !== 0 ?
                                this.props.projects?.map((project: any, index: number) => {
                                    return <Grid data-testid="project-card" item xs={12} sm={6} md={4}
                                        key={index}><ProjectCard {...project} /></Grid>
                                }) : <ProjectNotFound />}
                        </Grid>
                }
                <BasicPagination siblingCount={0} boundaryCount={2} page={this.props.page} count={this.props.countPages} onChange={this.handleChange} />
            </>
        );
    }

    componentDidMount() {
        this.props.searchPage(1)
    }

    componentDidUpdate(prevProps: IProps) {
        if (this.props.text !== prevProps.text) {
            this.props.FilterProjects(this.props.project_status, this.props.project_category, this.props.project_skill, this.props.text, this.props.page)
        }
        if (this.props.page !== prevProps.page) {
            this.props.FilterProjects(this.props.project_status, this.props.project_category, this.props.project_skill, this.props.text, this.props.page)
        }
    }


}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectResult));

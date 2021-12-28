import React, { Component } from 'react';
import Loading from "../../components/customs/Loading/Loading";
import { Grid } from "../../components/material-ui";
import MemberCard from "../../components/customs/MemberCard/MemberCard";
import UserNotFound from "../../components/customs/UserNotFound/UserNotFound";
import { IRootState } from "../../redux/RootReducer";
import { FilterUsers, searchUsersPage, setSearchText } from "../../redux/Search/Actions";
import { connect } from "react-redux";
import { ISearchState } from "../../redux/Search/ActionTypes";
import { withRouter } from "react-router-dom";
import SearchUserFilter from "./SearchUserFilter";
import BasicPagination from "../../components/customs/Pagination/BasicPagination";
import SearchInput from "../../components/customs/SearchInput/SearchInput";


const mapStateToProps = (store: IRootState) => {
    return store.search
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        searchUsersPage: (page: number) => dispatch(searchUsersPage(page)),
        setSearchText: (text: string) => dispatch(setSearchText(text)),
        FilterUsers: (university: string, skill: string, city: string, province: string, text: string, countPages: number) => dispatch(FilterUsers(university, skill, city, province, text, countPages)),
    }
}

interface IState {
    data: any;
    page: any;
    number: any;
    text: any;
    search: any
}

interface IProps extends ISearchState {
    location: any
    searchUsersPage: any
    FilterUsers: any
    setSearchText: any
}


class UserResult extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            number: 1,
            text: "",
            search: []
        }
    }

    handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        this.props.searchUsersPage(value)
    };

    render() {
        return (
            <>
                <SearchInput data_testid='search-input' text={(event: any) => {
                    if (event.target.value.length >= 3 || event.target.value.length === 0) {
                        this.props.setSearchText(event.target.value)
                    }
                }}
                    default={this.props.text}
                />

                <Grid>
                    <SearchUserFilter />
                </Grid>
                {
                    this.props.loading ? <Loading /> :
                        <Grid className='animate__animated animate__fadeIn' container spacing={2}>
                            {this.props.users?.length !== 0 ?
                                this.props.users.map((user: any, index: number) => {
                                    return <Grid data-testid="card_user" item xs={12} sm={6} md={4} key={index}>
                                        <MemberCard {...user} /></Grid>
                                }) : <UserNotFound />}

                        </Grid>
                }
                <BasicPagination siblingCount={0} boundaryCount={2} page={this.props.pageUsers} count={this.props.countUserPages} onChange={this.handleChange} />
            </>
        );
    }
    componentDidMount() {
        this.props.searchUsersPage(1)
    }
    componentDidUpdate(prevProps: IProps) {
        if (this.props.pageUsers !== prevProps.pageUsers) {
            this.props.FilterUsers(this.props.user_university, this.props.user_skill, this.props.user_city, this.props.user_province, this.props.text, this.props.pageUsers)
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserResult));
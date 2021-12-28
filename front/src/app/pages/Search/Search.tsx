import React, { Component } from 'react';
import { Container, Typography } from "@material-ui/core";
import CustomTabs, { TabBarProps } from "../../components/customs/CustomTabs/CustomTabs";
import ProjectResult from "./ProjectResult";
import UserResult from "./UserResult";
import SearchInput from "../../components/customs/SearchInput/SearchInput";


class Search extends Component<any> {

    SearchTabs: TabBarProps[] = [
        { label: "پروژه", component: <ProjectResult /> },
        { label: "افراد", component: <UserResult /> },
    ]

    render() {
        return (
            <Container>
                {this.props.homeVersion ? "" : <Typography data-testid="h1" variant={"h1"} component={"h1"}>جستجو</Typography>}
                <CustomTabs tabs={this.SearchTabs} />
            </Container>
        )
    }
}


export default Search;
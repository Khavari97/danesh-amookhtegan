import React, {Component} from 'react';
import {Container} from "@material-ui/core";
import {IRootState} from "../../../redux/RootReducer";
import {connect} from "react-redux";
import CreateProject from "../../Dashboard/Desk/CreateProject/CreateProject";

const mapStateToProps = (store: IRootState) => {
    // slug use for api
    return {
        slug: store.project.slug
    }
}

interface IProps {
    slug: string
}

class ProjectSetting extends Component<IProps> {

    render() {
        return (
            <Container>
                <CreateProject slug={this.props.slug}/>
            </Container>
        );
    }
}


export default connect(mapStateToProps)(ProjectSetting);
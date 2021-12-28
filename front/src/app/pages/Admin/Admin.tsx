import React, {Component} from 'react';
import {adminUrl} from "../../api/_api";
import {Helmet} from "react-helmet";

class Admin extends Component {
    render() {
        return (
            <>
                <Helmet>ادمین</Helmet>
            </>
        );
    }

    componentDidMount() {
        window.location.href = adminUrl
    }
}

export default Admin;

import React from 'react';
import '../styles/index.css';

import Page from '../components/Page';

class TravelListPage extends React.Component {
    state = {
        locations: null
    }

    render() {
        return (
            <Page
                success={this.props.success}
                message={this.props.message}
                setPageToLogin={this.props.setPageToLogin}
                setPageToGlobe={this.props.setPageToGlobe}>
                <h1>Zalogowano jako {this.props.username}</h1>
            </Page>
        );
    }
}

export default TravelListPage;
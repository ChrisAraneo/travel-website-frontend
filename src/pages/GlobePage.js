
import React from 'react';
import '../styles/index.css';

import Page from '../components/Page';

class GlobePage extends React.Component {
    state = {
        locations: null
    }

    render() {
        return (
            <Page>
                <h1>Zalogowano jako {this.props.username}</h1>
            </Page>
        );
    }
}

export default GlobePage;
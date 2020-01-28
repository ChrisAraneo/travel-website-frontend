import React from 'react';

import config from './config/config';
import './styles/index.css';

import Background from './components/Background';
import LogInGuestPage from './pages/LogInGuestPage';
import AdminPanelPage from './pages/AdminPanelPage';
import LogInPage from './pages/LogInPage';
import GlobePage from './pages/GlobePage';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.renderPage = this.renderPage.bind(this);
        this.fetchMeetingPoints = this.fetchMeetingPoints.bind(this);
        this.fetchAuthors = this.fetchAuthors.bind(this);
        this.fetchAll = this.fetchAll.bind(this);
    }

    state = {
        page: 0,
        token: null,
        username: null,

        meetingpoints: [],
        authors: [],

        success: false,
        message: ''
    }

    fetchAll() {
        this.fetchMeetingPoints(
            () => this.fetchAuthors(() => null)
        );
    }

    fetchMeetingPoints(successCallback) {
        fetch(`${config.url}/api/get/meetingpoints.php?token=${this.props.token}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    meetingpoints: result.data
                }, () => successCallback());
            })
            .catch(error => this.setState({
                success: false,
                message: String(error)
            }));
    }

    fetchAuthors(successCallback) {
        fetch(`${config.url}/api/get/authors.php?token=${this.props.token}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    authors: result.data
                }, () => successCallback());
            })
            .catch(error => this.setState({
                success: false,
                message: String(error)
            }));
    }

    renderPage() {

        const loginCallback = (username) => {
            if (username === 'admin') {
                this.setState({ page: 2 });
            } else if (username) {
                this.setState({ page: 3 });
            }
            this.fetchAll();
        };

        switch (this.state.page) {
            case 0:
                return (
                    <LogInGuestPage
                        setToken={token => this.setState({ token })}
                        setUsername={username => this.setState({ username },
                            () => loginCallback(this.state.username))} />
                );
            case 1:
                return (
                    <LogInPage
                        setToken={token => this.setState({ token })}
                        setUsername={username => this.setState({ username },
                            () => loginCallback(this.state.username))} />
                );
            case 2:
                return (
                    <AdminPanelPage
                        token={this.state.token}
                        username={this.state.username}
                        authors={this.state.authors}
                        meetingpoints={this.state.meetingpoints}
                    />
                );
            case 3:
                return (
                    <GlobePage
                        token={this.state.token}
                        username={this.state.username}
                    />
                );
            case 4:
                return (
                    null
                    // <TravelListPage
                    //     token={token}
                    //     username={username}
                    // />
                );
            case 5:
                return (
                    null
                    // <TravelPage
                    //     token={token}

                    // />
                );
            default:
                return null;
        }
    }

    render() {
        return (
            <>
                <Background />
                {this.renderPage()}
            </>
        );
    }
};
export default App;
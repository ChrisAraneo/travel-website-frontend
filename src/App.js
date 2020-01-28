import React from 'react';

import config from './config/config';
import './styles/index.css';

import Background from './components/Background';
import LogInGuestPage from './pages/LogInGuestPage';
import AdminPanelPage from './pages/AdminPanelPage';
import LogInPage from './pages/LogInPage';
import GlobePage from './pages/GlobePage';
import TravelListPage from './pages/TravelListPage';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.renderPage = this.renderPage.bind(this);
        this.fetchMeetingPoints = this.fetchMeetingPoints.bind(this);
        this.fetchAuthors = this.fetchAuthors.bind(this);
        this.fetchAuthorGroups = this.fetchAuthorGroups.bind(this);
        this.fetchAll = this.fetchAll.bind(this);
    }

    state = {
        page: 0,
        token: null,
        username: null,

        meetingpoints: [],
        authors: [],
        authorgroups: [],

        success: true,
        message: ''
    }

    fetchAll() {
        this.fetchMeetingPoints(
            () => this.fetchAuthors(
                () => this.fetchAuthorGroups(() => console.log(this.state)))
        );
    }

    fetchMeetingPoints(successCallback) {
        fetch(`${config.url}/api/get/meetingpoints.php?token=${this.state.token}`, {
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
        fetch(`${config.url}/api/get/authors.php?token=${this.state.token}`, {
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

    fetchPhoto(id_photo, successCallback) {
        fetch(`${config.url}/api/get/authors.php?token=${this.state.token}?id_photo=${id_photo}`, {
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

    fetchAuthorGroups(successCallback) {
        fetch(`${config.url}/api/get/authorgroups.php?token=${this.state.token}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    authorgroups: result.data
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
                this.setState({ page: 2 },
                    () => this.fetchAll());
            } else if (username) {
                this.setState({ page: 3 },
                    () => this.fetchAll());
            }
        };

        switch (this.state.page) {
            case 0:
                return (
                    <LogInGuestPage
                        setToken={token => this.setState({ token },
                            () => loginCallback(this.state.username))}
                        setUsername={username => this.setState({ username },
                            () => loginCallback(this.state.username))}
                        setPageToLogin={() => this.setState({ page: 1 })}
                        setPageToGlobe={() => this.setState({ page: 3 })}
                        setPageToTravelList={() => this.setState({ page: 4 })}
                        success={this.state.success}
                        message={this.state.message}
                    />
                );
            case 1:
                return (
                    <LogInPage
                        setToken={token => this.setState({ token })}
                        setUsername={username => this.setState({ username },
                            () => loginCallback(this.state.username))}
                        setPageToLogin={() => this.setState({ page: 1 })}
                        setPageToGlobe={() => this.setState({ page: 3 })}
                        setPageToTravelList={() => this.setState({ page: 4 })}
                        success={this.state.success}
                        message={this.state.message}
                    />
                );
            case 2:
                return (
                    <AdminPanelPage
                        token={this.state.token}
                        username={this.state.username}
                        authors={this.state.authors}
                        meetingpoints={this.state.meetingpoints}
                        setPageToLogin={() => this.setState({ page: 1 })}
                        setPageToGlobe={() => this.setState({ page: 3 })}
                        setPageToTravelList={() => this.setState({ page: 4 })}
                        success={this.state.success}
                        message={this.state.message}
                    />
                );
            case 3:
                return (
                    <GlobePage
                        token={this.state.token}
                        username={this.state.username}
                        setPageToLogin={() => this.setState({ page: 1 })}
                        setPageToGlobe={() => this.setState({ page: 3 })}
                        setPageToTravelList={() => this.setState({ page: 4 })}
                        success={this.state.success}
                        message={this.state.message}
                    />
                );
            case 4:
                return (
                    <TravelListPage
                        token={this.state.token}
                        username={this.state.username}
                        setPageToLogin={() => this.setState({ page: 1 })}
                        setPageToGlobe={() => this.setState({ page: 3 })}
                        setPageToTravelList={() => this.setState({ page: 4 })}
                        success={this.state.success}
                        message={this.state.message}
                    />
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
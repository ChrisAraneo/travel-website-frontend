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
        this.createFullTravelArray = this.createFullTravelArray.bind(this);
    }

    state = {
        page: 0,
        token: null,
        username: null,

        meetingpoints: [],
        authors: [],
        authorgroups: [],
        travels: [],
        photos: [],

        fulltravels: [],

        success: true,
        message: ''
    }

    fetchAll() {
        this.fetchMeetingPoints(
            () => this.fetchAuthors(
                () => this.fetchAuthorGroups(
                    () => this.fetchTravels(
                        () => this.fetchPhotos(
                            () => {
                                this.setState({
                                    fulltravels: this.createFullTravelArray(this.state.travels, this.state.authorgroups, this.state.authors, this.state.meetingpoints, this.state.photos)
                                }, () => console.log(this.state));
                            }
                        )
                    )
                )
            )
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

    fetchPhotos(successCallback) {
        fetch(`${config.url}/api/get/photos.php?token=${this.state.token}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    photos: result.data
                }, () => successCallback());
            })
            .catch(error => this.setState({
                success: false,
                message: String(error)
            }));
    }

    fetchTravels(successCallback) {
        fetch(`${config.url}/api/get/travels.php?token=${this.state.token}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    travels: result.data
                }, () => successCallback());
            })
            .catch(error => this.setState({
                success: false,
                message: String(error)
            }));
    }

    createFullTravelArray(travels, authorgroups, authors, meetingpoints, photos) {
        const array = [];

        const denormAuthorGroups = [];

        authorgroups.forEach(authorgroup => {
            const id_author = authorgroup.id_author;
            const author = authors.find(item => item.id_author == id_author);
            denormAuthorGroups.push({
                ...authorgroup,
                ...author
            });
        });

        for (let i = 0; i < travels.length; ++i) {
            const { id_travel, title, location, date, hour, id_meetingpoint, latitude, longitude, description } = travels[i];

            const travel = {
                id_travel: id_travel,
                title,
                location,
                date,
                hour,
                meetingpoint: meetingpoints.find(item => item.id_meetingpoint == id_meetingpoint),
                latitude,
                longitude,
                authors: [...denormAuthorGroups.filter(item => item.id_travel == id_travel)],
                photos: [...photos.filter(item => item.id_travel == id_travel)],
                description
            };

            array.push(travel);
        }

        return array;
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

        // Bundle of props data
        // Instead of giving individual props we give an object
        const bundle = {
            token: this.state.token,
            username: this.state.username,
            success: this.state.success,
            message: this.state.message,
            authors: this.state.authors,
            meetingpoints: this.state.meetingpoints,
            authorgroups: this.state.authorgroups,
            fulltravels: this.state.fulltravels,
        }

        switch (this.state.page) {
            case 0:
                return (
                    <LogInGuestPage
                        bundle={bundle}
                        setToken={token => this.setState({ token },
                            () => loginCallback(this.state.username))}
                        setUsername={username => this.setState({ username },
                            () => loginCallback(this.state.username))}
                        setPageToLogin={() => this.setState({ page: 1 })}
                        setPageToGlobe={() => this.setState({ page: 3 })}
                        setPageToTravelList={() => this.setState({ page: 4 })}
                    />
                );
            case 1:
                return (
                    <LogInPage
                        bundle={bundle}
                        setToken={token => this.setState({ token })}
                        setUsername={username => this.setState({ username },
                            () => loginCallback(this.state.username))}
                        setPageToLogin={() => this.setState({ page: 1 })}
                        setPageToGlobe={() => this.setState({ page: 3 })}
                        setPageToTravelList={() => this.setState({ page: 4 })}
                    />
                );
            case 2:
                return (
                    <AdminPanelPage
                        bundle={bundle}
                        setPageToLogin={() => this.setState({ page: 1 })}
                        setPageToGlobe={() => this.setState({ page: 3 })}
                        setPageToTravelList={() => this.setState({ page: 4 })}
                    />
                );
            case 3:
                return (
                    <GlobePage
                        bundle={bundle}
                        setPageToLogin={() => this.setState({ page: 1 })}
                        setPageToGlobe={() => this.setState({ page: 3 })}
                        setPageToTravelList={() => this.setState({ page: 4 })}
                    />
                );
            case 4:
                return (
                    <TravelListPage
                        bundle={bundle}
                        setPageToLogin={() => this.setState({ page: 1 })}
                        setPageToGlobe={() => this.setState({ page: 3 })}
                        setPageToTravelList={() => this.setState({ page: 4 })}
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
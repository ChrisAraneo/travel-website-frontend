import React from 'react';

import FormLogIn from './components/FormLogIn';
import FormLogInGuest from './components/FormLogInGuest';
import FormCreateUser from './components/FormCreateUser';
import FormCreateAuthor from './components/FormCreateAuthor';
import FormCreateMeetingPoint from './components/FormCreateMeetingPoint';
import FormCreateTravel from './components/FormCreateTravel';

import './styles/index.css';
import Background from './components/Background';

import LogInGuestPage from './pages/LogInGuestPage';
import AdminPanelPage from './pages/AdminPanelPage';
import LogInPage from './pages/LogInPage';
import GlobePage from './pages/GlobePage';

class App extends React.Component {

    state = {
        page: 0,
        token: null
    }

    render() {
        return (
            <>
                <Background />

                {this.state.page === 0 ?
                    <LogInGuestPage
                        setToken={token => this.setState({ token, page: 1 })}
                    />
                    :
                    null
                }
                {
                    this.state.page === 1 ?
                        <GlobePage
                            token={this.state.token}
                        />
                        :
                        null
                }
                {
                    this.state.page === 2 ?
                        <LogInPage
                            setToken={token => this.setState({ token })}
                        />
                        :
                        null
                }
                {
                    this.state.page === 3 ?
                        <AdminPanelPage
                            token={this.state.token}
                            setToken={token => this.setState({ token })}
                        />
                        :
                        null
                }


            </>
        );
    }
};
export default App;
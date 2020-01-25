import React from 'react';

import FormLogIn from './components/FormLogIn';
import FormLogInGuest from './components/FormLogInGuest';
import FormCreateUser from './components/FormCreateUser';
import FormCreateAuthor from './components/FormCreateAuthor';
import FormCreateMeetingPoint from './components/FormCreateMeetingPoint';
import FormCreateTravel from './components/FormCreateTravel';

import background from './images/background.jpg';

import './styles/index.css';
import SiteHeader from './components/SiteHeader';

class App extends React.Component {

    state = {
        token: null
    }

    componentDidMount() {
        const body = document.getElementsByTagName("body")[0];
        body.style.background = `url(${background}) no-repeat center center fixed`;
        body.style.backgroundSize = "cover";

        // const pageContainer = document.getElementById("page-container");
        // pageContainer.style.background = `url(${darkWood}) no-repeat center center fixed`;
        // pageContainer.style.backgroundSize = "cover";
    }

    render() {
        return (
            <div class="page-wrapper">
                <main id="page-container" className="box">
                    <div className="page">
                        <SiteHeader />
                        {this.state.token === null ?
                            <FormLogInGuest setToken={token => this.setState({ token: token })} />
                            :
                            null
                        }
                        {this.state.token === null ?
                            null
                            :
                            <>
                                <h1 className="title">Zalogowano</h1>
                                <FormCreateUser token={this.state.token} />
                                <FormCreateAuthor token={this.state.token} />
                                <FormCreateMeetingPoint token={this.state.token} />
                                <FormCreateTravel token={this.state.token} />
                                <FormLogIn setToken={token => this.setState({ token: token })} />
                            </>
                        }
                    </div>
                </main>
            </div>
        );
    }
};
export default App;
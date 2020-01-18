import React from 'react';

import FormLogIn from './components/FormLogIn';
import FormLogInGuest from './components/FormLogInGuest';
import FormCreateUser from './components/FormCreateUser';
import FormCreateAuthor from './components/FormCreateAuthor';
import FormCreateMeetingPoint from './components/FormCreateMeetingPoint';
import FormCreateTravel from './components/FormCreateTravel';

class App extends React.Component {

    state = {
        token: null
    }

    render() {
        return (
            <main style={{ maxWidth: '1200px', margin: 'auto auto' }}>
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
            </main>
        );
    }
};
export default App;
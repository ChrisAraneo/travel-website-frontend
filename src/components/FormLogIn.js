import React from 'react';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'

import config from '../config/config';
import Form from './Form';

class FormLogIn extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    state = {
        username: '',
        password: '',

        success: false,
        message: ''
    }

    handleLogIn(username, password) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch(`${config.url}/api/post/login.php`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                const token = result.data;
                this.setState({
                    success: result.success,
                    message: result.message,
                    data: token,
                    username: '',
                    password: ''
                });
                if (token !== null && token !== undefined) {
                    this.props.setToken(token);
                }
            })
            .catch(error => this.setState({
                success: false,
                message: String(error)
            }));
    }

    render() {
        return (
            <Form
                title="Zaloguj się"
                success={this.state.success}
                message={this.state.message}
                button="Zaloguj się"
                action={(event) => this.handleLogIn(this.state.username, this.state.password)}>
                <div className="field">
                    <label className="label">Nazwa użytkownika</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            value={this.state.username}
                            type="text"
                            onChange={(event) => this.setState({ username: event.target.value })} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Hasło</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            value={this.state.password}
                            type="password"
                            onChange={(event) => this.setState({ password: event.target.value })} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                    </div>
                </div>
            </Form>
        );
    }
}

export default FormLogIn;
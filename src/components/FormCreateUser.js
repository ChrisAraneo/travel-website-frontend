import React from 'react';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'

import config from '../config/config';

import Form from './Form';

class FormCreateUser extends React.Component {

    constructor(props) {
        super(props);
        this.handleCreateUser = this.handleCreateUser.bind(this);
    }

    state = {
        username: '',
        password: '',

        success: false,
        message: ''
    }

    handleCreateUser(username, password, token) {
        if (typeof username === "string" && typeof password === "string") {
            if (username.length >= 3) {
                if (password.length >= 6) {
                    const formData = new FormData();
                    formData.append('username', username);
                    formData.append('password', password);
                    formData.append('token', token);

                    fetch(`${config.url}/api/post/user.php`, {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => response.json())
                        .then(result => this.setState({
                            success: result.success,
                            message: result.message,
                            username: '',
                            password: ''
                        }))
                        .catch(error => this.setState({
                            success: false,
                            message: String(error)
                        }));
                } else {
                    this.setState({
                        success: false,
                        message: "Hasło jest za krótkie"
                    })
                }
            } else {
                this.setState({
                    success: false,
                    message: "Nazwa użytkownika jest za krótka"
                })
            }
        }

    }

    render() {
        return (
            <Form
                title="Dodaj użytkownika"
                success={this.state.success}
                message={this.state.message}
                button="Dodaj"
                action={(event) => this.handleCreateUser(this.state.username, this.state.password, this.props.token)}>
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

export default FormCreateUser;
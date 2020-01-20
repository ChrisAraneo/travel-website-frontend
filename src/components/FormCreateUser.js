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
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validate = this.validate.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    state = {
        username: '',
        password: '',

        success: false,
        message: '',

        invalidUsername: null,
        invalidPassword: null
    }

    onChangeUsername(event) {
        const username = event.target.value;
        if (this.state.invalidUsername) {
            this.setState({ username },
                () => this.validateUsername(username));
        } else {
            this.setState({ username });
        }
    }

    onChangePassword(event) {
        const password = event.target.value;
        if (this.state.invalidPassword) {
            this.setState({ password },
                () => this.validatePassword(password));
        } else {
            this.setState({ password });
        }
    }

    validateUsername(name) {
        if (name.length < 3) {
            this.setState({ invalidUsername: "Nazwa użytkownika jest za krótka." });
            return false;
        } else {
            this.setState({ invalidUsername: false });
            return true;
        }
    }

    validatePassword(password) {
        if (password.length < 6) {
            this.setState({ invalidPassword: "Proszę podać dłuższe hasło." });
            return false;
        } else {
            this.setState({ invalidPassword: false });
            return true;
        }
    }

    validate(username, password) {
        return (this.validateUsername(username) && this.validatePassword(password));
    }

    handleCreateUser(username, password, token) {
        if (!this.validate(username, password)) {
            return;
        }

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
                message: result.message
            }, () => this.resetForm()))
            .catch(error => this.setState({
                success: false,
                message: String(error)
            }));
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
            invalidUsername: null,
            invalidPassword: null
        });
    }

    render() {
        return (
            <Form
                title="Dodaj użytkownika"
                success={this.state.success}
                message={this.state.message}
                button="Dodaj"
                action={() => this.handleCreateUser(this.state.username, this.state.password, this.props.token)}>
                <div className="field">
                    <label className="label">Nazwa użytkownika</label>
                    <div className="control has-icons-left">
                        <input
                            className={`input ${this.state.invalidUsername === null ? '' : (this.state.invalidUsername === false ? 'is-success' : 'is-danger')}`}
                            value={this.state.username}
                            type="text"
                            onChange={this.onChangeUsername}
                            onBlur={() => this.validateUsername(this.state.username)} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                    </div>
                    {
                        this.state.invalidUsername ?
                            <p class="help is-danger">{this.state.invalidUsername}</p>
                            :
                            null
                    }
                </div>
                <div className="field">
                    <label className="label">Hasło</label>
                    <div className="control has-icons-left">
                        <input
                            className={`input ${this.state.invalidPassword === null ? '' : (this.state.invalidPassword === false ? 'is-success' : 'is-danger')}`}
                            value={this.state.password}
                            type="password"
                            onChange={this.onChangePassword}
                            onBlur={() => this.validatePassword(this.state.password)} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                    </div>
                    {
                        this.state.invalidPassword ?
                            <p class="help is-danger">{this.state.invalidPassword}</p>
                            :
                            null
                    }
                </div>
            </Form>
        );
    }
}

export default FormCreateUser;
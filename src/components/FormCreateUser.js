import React from 'react';
import 'bulma/css/bulma.min.css';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'

import config from '../config/config';

import Form from './Form';
import InputText from './InputText';
import InputPassword from './InputPassword';

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
        if (username && password) {
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
                }))
                .catch(error => this.setState({
                    success: false,
                    message: String(error)
                }));
        } else {
            this.setState({
                success: false,
                message: "Uzupełnij nazwę użytkownika i hasło."
            });
        }
    }

    render() {
        return (
            <Form
                title="Dodaj użytkownika"
                success={this.state.success}
                message={this.state.message}
                button="Dodaj"
                action={() => this.handleCreateUser(this.state.username, this.state.password, this.props.token)}>
                <InputText
                    label="Nazwa użytkownika"
                    icon={faUser}
                    validation={val => (val.length > 3)}
                    message="Nazwa użytkownika jest za krótka."
                    complete={username => this.setState({ username })}
                />
                <InputPassword
                    label="Hasło"
                    icon={faLock}
                    validation={val => (val.length > 5)}
                    message="Hasło jest za krótkie."
                    complete={password => this.setState({ password })}
                />
            </Form>
        );
    }
}

export default FormCreateUser;
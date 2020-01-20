import React from 'react';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import config from '../config/config';
import Form from './Form';
import InputPassword from './InputPassword';

class FormLogIn extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    state = {
        password: '',

        success: false,
        message: '',

        token: null
    }

    handleLogIn(username, password) {
        if (username && password) {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            fetch(`${config.url}/api/post/login.php`, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(result => {
                    this.setState({
                        success: result.success,
                        message: result.message,
                        token: result.data,
                        password: ''
                    }, () => {
                        if (this.state.token !== null && this.state.token !== undefined) {
                            this.props.setToken(this.state.token);
                        }
                    });

                })
                .catch(error => this.setState({
                    success: false,
                    message: String(error)
                }));
        } else {
            this.setState({
                success: false,
                message: "Uzupełnij hasło."
            });
        }
    }

    render() {
        return (
            <Form
                title="Podaj hasło"
                success={this.state.success}
                message={this.state.message}
                action={() => this.handleLogIn('user', this.state.password)}
                button="Wejdź na stronę">
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

export default FormLogIn;
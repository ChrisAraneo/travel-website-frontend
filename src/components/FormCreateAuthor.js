import React from 'react';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import config from '../config/config';

import Form from './Form';
import InputText from './InputText';

class FormCreateAuthor extends React.Component {

    constructor(props) {
        super(props);
        this.handleCreateAuthor = this.handleCreateAuthor.bind(this);
    }

    state = {
        firstname: null,
        lastname: null,

        success: false,
        message: ''
    }

    handleCreateAuthor(firstname, lastname, token) {
        if (firstname && lastname) {
            const formData = new FormData();
            formData.append('firstname', firstname);
            formData.append('lastname', lastname);
            formData.append('token', token);

            fetch(`${config.url}/api/post/author.php`, {
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
                message: "Uzupełnij imię i nazwisko."
            });
        }
    }

    render() {
        return (
            <Form
                title="Dodaj prelegenta"
                success={this.state.success}
                message={this.state.message}
                button="Dodaj"
                action={(event) => this.handleCreateAuthor(this.state.firstname, this.state.lastname, this.props.token)}>
                <InputText
                    label="Imię"
                    icon={faUser}
                    validation={val => (val.length > 2)}
                    message="Za krótkie imię."
                    complete={firstname => this.setState({ firstname })}
                />
                <InputText
                    label="Nazwisko"
                    icon={faUser}
                    validation={val => (val.length > 2)}
                    message="Za krótkie nazwisko."
                    complete={lastname => this.setState({ lastname })}
                />
            </Form>
        );
    }
}

export default FormCreateAuthor;
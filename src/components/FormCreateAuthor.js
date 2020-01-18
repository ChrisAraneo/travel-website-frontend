import React from 'react';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import config from '../config/config';

import Form from './Form';

class FormCreateAuthor extends React.Component {

    constructor(props) {
        super(props);
        this.handleCreateAuthor = this.handleCreateAuthor.bind(this);
    }

    state = {
        firstname: '',
        lastname: '',

        success: false,
        message: ''
    }

    handleCreateAuthor(firstname, lastname, token) {
        if (typeof firstname === "string" && typeof lastname === "string") {
            if (firstname.length >= 2 && lastname.length >= 2) {
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
                        message: result.message,
                        firstname: '',
                        lastname: ''
                    }))
                    .catch(error => this.setState({
                        success: false,
                        message: String(error)
                    }));
            } else {
                this.setState({
                    success: false,
                    message: "Imię i nazwisko są za krótkie"
                });
            }
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
                <div className="field">
                    <label className="label">Imię</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            value={this.state.firstname}
                            type="text"
                            onChange={(event) => this.setState({ firstname: event.target.value })} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Nazwisko</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            value={this.state.lastname}
                            type="text"
                            onChange={(event) => this.setState({ lastname: event.target.value })} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                    </div>
                </div>
            </Form>
        );
    }
}

export default FormCreateAuthor;
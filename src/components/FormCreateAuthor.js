import React from 'react';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import config from '../config/config';

import Form from './Form';

class FormCreateAuthor extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.validateFirstName = this.validateFirstName.bind(this);
        this.validateLastName = this.validateLastName.bind(this);
        this.validate = this.validate.bind(this);
        this.handleCreateAuthor = this.handleCreateAuthor.bind(this);
    }

    state = {
        firstname: '',
        lastname: '',

        success: false,
        message: '',

        invalidFirstName: null,
        invalidLastName: null
    }



    onChangeFirstName(event) {
        const string = event.target.value;
        const firstname = string.charAt(0).toUpperCase() + string.slice(1);
        if (this.state.invalidFirstName) {
            this.setState({ firstname }, () => this.validateFirstName(firstname));
        } else {
            this.setState({ firstname });
        }
    }

    onChangeLastName(event) {
        const string = event.target.value;
        const lastname = string.charAt(0).toUpperCase() + string.slice(1);
        if (this.state.invalidLastName) {
            this.setState({ lastname }, () => this.validateLastName(lastname));
        } else {
            this.setState({ lastname });
        }
    }

    validateFirstName(firstname) {
        if (firstname.length < 3) {
            this.setState({ invalidFirstName: 'Za krótkie imię.' });
            return false;
        } else {
            this.setState({ invalidFirstName: false });
            return true;
        }
    }

    validateLastName(lastname) {
        if (lastname.length < 3) {
            this.setState({ invalidLastName: 'Za krótkie nazwisko.' });
            return false;
        } else {
            this.setState({ invalidLastName: false });
            return true;
        }
    }

    validate(firstname, lastname) {
        return (this.validateFirstName(firstname) && this.validateLastName(lastname));
    }

    resetForm() {
        this.setState({
            firstname: '',
            lastname: '',
            invalidFirstName: null,
            invalidLastName: null
        });
    }

    handleCreateAuthor(firstname, lastname, token) {
        if (!this.validate(firstname, lastname)) {
            return;
        }

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
                        message: result.message
                    }, () => this.resetForm()))
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
                            className={`input ${this.state.invalidFirstName === null ? '' : (this.state.invalidFirstName === false ? 'is-success' : 'is-danger')}`}
                            value={this.state.firstname}
                            type="text"
                            onChange={this.onChangeFirstName}
                            onBlur={() => this.validateFirstName(this.state.firstname)} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                    </div>
                    {
                        this.state.invalidFirstName ?
                            <p class="help is-danger">{this.state.invalidFirstName}</p>
                            :
                            null
                    }
                </div>
                <div className="field">
                    <label className="label">Nazwisko</label>
                    <div className="control has-icons-left">
                        <input
                            className={`input ${this.state.invalidLastName === null ? '' : (this.state.invalidLastName === false ? 'is-success' : 'is-danger')}`}
                            value={this.state.lastname}
                            type="text"
                            onChange={this.onChangeLastName}
                            onBlur={() => this.validateLastName(this.state.lastname)} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                    </div>
                    {
                        this.state.invalidLastName ?
                            <p class="help is-danger">{this.state.invalidLastName}</p>
                            :
                            null
                    }
                </div>
            </Form>
        );
    }
}

export default FormCreateAuthor;
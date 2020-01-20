import React from 'react';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMapMarker } from '@fortawesome/free-solid-svg-icons'

import config from '../config/config';

import Form from './Form';

class FormCreateMeetingPoint extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateAddress = this.validateAddress.bind(this);
        this.validate = this.validate.bind(this);
        this.handleCreateMeetingPoint = this.handleCreateMeetingPoint.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    state = {
        name: '',
        address: '',

        success: false,
        message: '',

        invalidName: null,
        invalidAddress: null
    }

    onChangeName(event) {
        const name = event.target.value;
        if (this.state.invalidName) {
            this.setState({ name },
                () => this.validateName(name));
        } else {
            this.setState({ name });
        }
    }

    onChangeAddress(event) {
        const address = event.target.value;
        if (this.state.invalidAddress) {
            this.setState({ address },
                () => this.validateAddress(address));
        } else {
            this.setState({ address });
        }
    }

    validateName(name) {
        if (name.length < 3) {
            this.setState({ invalidName: "Nazwa miejsca jest za krótka." });
            return false;
        } else {
            this.setState({ invalidName: false });
            return true;
        }
    }

    validateAddress(address) {
        if (address.length < 3) {
            this.setState({ invalidAddress: "Adres jest za krótki." });
            return false;
        } else {
            this.setState({ invalidAddress: false });
            return true;
        }
    }

    validate(name, address) {
        return (this.validateName(name) && this.validateAddress(address));
    }

    resetForm() {
        this.setState({
            name: '',
            address: '',
            invalidName: null,
            invalidAddress: null
        });
    }

    handleCreateMeetingPoint(name, address, token) {
        if (!this.validateAddress(name, address)) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('token', token);

        fetch(`${config.url}/api/post/meetingpoint.php`, {
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

    render() {
        return (
            <Form
                title="Dodaj miejsce spotkania"
                success={this.state.success}
                message={this.state.message}
                button="Dodaj"
                action={(event) => this.handleCreateMeetingPoint(this.state.name, this.state.address, this.props.token)}>
                <div className="field">
                    <label className="label">Nazwa miejsca</label>
                    <div className="control has-icons-left">
                        <input
                            className={`input ${this.state.invalidName === null ? '' : (this.state.invalidName === false ? 'is-success' : 'is-danger')}`}
                            value={this.state.name}
                            type="text"
                            onChange={this.onChangeName}
                            onBlur={() => this.validateName(this.state.name)} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faHome} />
                        </span>
                    </div>
                    {
                        this.state.invalidName ?
                            <p class="help is-danger">{this.state.invalidName}</p>
                            :
                            null
                    }
                </div>
                <div className="field">
                    <label className="label">Adres</label>
                    <div className="control has-icons-left">
                        <input
                            className={`input ${this.state.invalidAddress === null ? '' : (this.state.invalidAddress === false ? 'is-success' : 'is-danger')}`}
                            value={this.state.address}
                            type="text"
                            onChange={this.onChangeAddress}
                            onBlur={() => this.validateAddress(this.state.address)} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faMapMarker} />
                        </span>
                    </div>
                    {
                        this.state.invalidAddress ?
                            <p class="help is-danger">{this.state.invalidAddress}</p>
                            :
                            null
                    }
                </div>
            </Form>
        );
    }
}

export default FormCreateMeetingPoint;
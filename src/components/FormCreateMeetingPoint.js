import React from 'react';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMapMarker } from '@fortawesome/free-solid-svg-icons'

import config from '../config/config';

import Form from './Form';

class FormCreateMeetingPoint extends React.Component {

    constructor(props) {
        super(props);
        this.handleCreateMeetingPoint = this.handleCreateMeetingPoint.bind(this);
    }

    state = {
        name: '',
        address: '',

        success: false,
        message: ''
    }

    handleCreateMeetingPoint(name, address, token) {
        if (typeof name === "string" && typeof address === "string") {
            if (name.length >= 5) {
                if (address.length >= 5) {
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
                            message: result.message,
                            name: '',
                            address: ''
                        }))
                        .catch(error => this.setState({
                            success: false,
                            message: String(error)
                        }));
                } else {
                    this.setState({
                        success: false,
                        message: "Adres jest za krótki. Podaj ulicę i numer lokalu."
                    });
                }
            } else {
                this.setState({
                    success: false,
                    message: "Nazwa miejsca jest za krótka"
                });
            }
        }
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
                            className="input"
                            value={this.state.name}
                            type="text"
                            onChange={(event) => this.setState({ name: event.target.value })} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faHome} />
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Adres</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            value={this.state.address}
                            type="text"
                            onChange={(event) => this.setState({ address: event.target.value })} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faMapMarker} />
                        </span>
                    </div>
                </div>
            </Form>
        );
    }
}

export default FormCreateMeetingPoint;
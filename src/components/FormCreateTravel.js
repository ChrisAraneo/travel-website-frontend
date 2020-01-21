import React from 'react';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faHome, faComment, faUser, faGlobe } from '@fortawesome/free-solid-svg-icons'

import config from '../config/config';

import Form from './Form';
import InputText from './InputText';
import InputLocation from './InputLocation';
import InputSelect from './InputSelect';
import InputDate from './InputDate';
import InputTime from './InputTime';
import InputList from './InputList';
import InputPhotos from './InputPhotos';

class FormCreateTravel extends React.Component {

    constructor(props) {
        super(props);

        this.handleCreateTravel = this.handleCreateTravel.bind(this);
        this.handleCreateAuthorGroup = this.handleCreateAuthorGroup.bind(this);
        this.handleCreatePhotos = this.handleCreatePhotos.bind(this);

        this.fetchMeetingPoints = this.fetchMeetingPoints.bind(this);
        this.fetchAuthors = this.fetchAuthors.bind(this);

        this.validate = this.validate.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    state = {
        title: null,
        location: null,
        latitude: null,
        longitude: null,
        id_meetingpoint: null,
        date: null,
        hour: null,
        selectedAuthors: null,
        photos: null,
        description: '',

        meetingpoints: [],
        authors: [],

        success: false,
        message: ''
    }

    componentDidMount() {
        this.fetchMeetingPoints(
            () => this.fetchAuthors(() => null)
        );
    }

    fetchMeetingPoints(successCallback) {
        fetch(`${config.url}/api/get/meetingpoints.php?token=${this.props.token}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    meetingpoints: result.data
                }, () => successCallback());
            })
            .catch(error => this.setState({
                success: false,
                message: String(error)
            }));
    }

    fetchAuthors(successCallback) {
        fetch(`${config.url}/api/get/authors.php?token=${this.props.token}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    authors: result.data
                }, () => successCallback());
            })
            .catch(error => this.setState({
                success: false,
                message: String(error)
            }));
    }


    handleCreateTravel(title, location, date, hour, id_meetingpoint, latitude, longitude, description, authors, photos, token) {

        if (!this.validate(title, location, date, hour, id_meetingpoint, latitude, longitude, authors, photos)) {
            return false;
        }

        if (description.length < 1) {
            description = " ";
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('location', location);
        formData.append('date', date);
        formData.append('hour', hour);
        formData.append('id_meetingpoint', Number(id_meetingpoint));
        formData.append('latitude', Number(latitude));
        formData.append('longitude', Number(longitude));
        formData.append('description', description);
        formData.append('token', token);

        fetch(`${config.url}/api/post/travel.php`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                const id_travel = Number(result.id_travel);
                this.handleCreateAuthorGroup(this.state.selectedAuthors, id_travel, token);
                this.handleCreatePhotos(this.state.photos, id_travel, token);
                this.setState({
                    success: result.success,
                    message: result.message
                }, () => {
                    if (this.state.success === true) {
                        this.resetForm();
                    }
                });
            })
            .catch(error => {
                this.setState({
                    success: false,
                    message: String(error)
                });
            });
    }

    validate(title, location, date, hour, id_meetingpoint, latitude, longitude, authors, photos) {
        if (title === null) {
            this.setState({
                success: false,
                message: "Tytuł prelekcji jest za krótki."
            })
            return false;
        }
        if (location === null || latitude === null || longitude === null) {
            this.setState({
                success: false,
                message: "Wybierz miejsce podróży."
            })
            return false;
        }
        if (id_meetingpoint === null) {
            this.setState({
                success: false,
                message: "Wybierz miejsce spotkania."
            })
            return false;
        }
        if (date === null) {
            this.setState({
                success: false,
                message: "Wybierz datę spotkania."
            })
            return false;
        }
        if (hour === null) {
            this.setState({
                success: false,
                message: "Wybierz godzinę spotkania."
            })
            return false;
        }
        if (authors === null) {
            this.setState({
                success: false,
                message: "Wybierz przynajmniej jednego prelegenta."
            })
            return false;
        }
        if (photos === null) {
            this.setState({
                success: false,
                message: "Wybierz przynajmniej jedno zdjęcie z podróży."
            })
            return false;
        }

        return true;
    }

    resetForm() {
        this.setState({
            title: null,
            location: null,
            latitude: null,
            longitude: null,
            id_meetingpoint: null,
            date: null,
            hour: null,
            selectedAuthors: null,
            photos: null,
            description: ''
        });
    }

    handleCreateAuthorGroup(authors, id_travel, token) {
        for (let i = 0; i < authors.length; i++) {
            const author = authors[i];

            const formData = new FormData();
            formData.append('id_author', Number(author.id_author));
            formData.append('id_travel', Number(id_travel));
            formData.append('token', token);

            fetch(`${config.url}/api/post/authorgroup.php`, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(() => null)
                .catch((error) => console.error("Author", error.message));
        }
    }

    handleCreatePhotos(photos, id_travel, token) {
        for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];

            const formData = new FormData();
            formData.append('base64', photo.base64);
            formData.append('id_travel', Number(id_travel));
            formData.append('token', token);

            fetch(`${config.url}/api/post/photo.php`, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(() => null)
                .catch(() => null);
        }
    }

    render() {
        return (
            <Form
                title="Dodaj stronę prelekcji"
                success={this.state.success}
                message={this.state.message}
                button="Dodaj stronę prelekcji"
                action={(event) => this.handleCreateTravel(this.state.title, this.state.location, this.state.date, this.state.hour, this.state.id_meetingpoint, this.state.latitude, this.state.longitude, this.state.description, this.state.selectedAuthors, this.state.photos, this.props.token)}>

                <InputText
                    label="Tytuł prelekcji"
                    icon={faFlag}
                    validation={val => (val.length > 5)}
                    message="Tytuł prelekcji jest za krótki."
                    complete={title => this.setState({ title })}
                />

                <InputLocation
                    label="Kraj podróży"
                    icon={faGlobe}
                    message="Wybierz kraj podróży"
                    complete={({ location, latitude, longitude }) => this.setState({ location, latitude, longitude })}
                />

                <InputSelect
                    label="Wybierz miejsce spotkania"
                    data={this.state.meetingpoints}
                    value="id_meetingpoint"
                    name="name"
                    icon={faHome}
                    complete={(id) => this.setState({ id_meetingpoint: id })}
                    message="Wybierz miejsce spotkania."
                />


                <div className="columns" style={{ marginBottom: 0 }}>
                    <div className="column" style={{ paddingBottom: 0 }}>
                        <InputDate
                            label="Dzień spotkania"
                            complete={date => this.setState({ date })}
                            message="Wybierz dzień spotkania"
                        />
                    </div>
                    <div className="column">
                        <InputTime
                            label="Godzina spotkania"
                            complete={hour => this.setState({ hour })}
                            message="Wybierz godzinę spotkania."
                        />
                    </div>
                </div>

                <InputList
                    label="Prelegenci"
                    data={this.state.authors}
                    value="id_author"
                    name={item => `${item.firstname} ${item.lastname}`}
                    icon={faUser}
                    button="Dodaj prelegenta"
                    message="Musisz dodać przynajmniej jednego prelegenta."
                    complete={(data) => this.setState({ selectedAuthors: data })}
                />

                <InputPhotos
                    label="Zdjęcia"
                    button="Dodaj zdjęcie"
                    complete={(photos) => this.setState({ photos })}
                    message="Dodaj przynajmniej jedno zdjęcie z podróży."
                />

                <div className="field">
                    <label className="label">Opis prelekcji (opcjonalnie)</label>
                    <div className="control has-icons-left">
                        <textarea
                            className="textarea"
                            value={this.state.description}
                            cols="40"
                            rows="5"
                            onChange={(event) => this.setState({ description: event.target.value })}
                            style={{ minHeight: "120px" }} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faComment} />
                        </span>
                    </div>
                </div>
            </Form >
        );
    }
}

export default FormCreateTravel;
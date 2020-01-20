import React from 'react';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faPlane, faCalendar, faHourglass, faHome, faComment, faUser, faCamera, faSearch, faGlobe } from '@fortawesome/free-solid-svg-icons'

import config from '../config/config';

import Form from './Form';
import InputText from './InputText';

class FormCreateTravel extends React.Component {

    constructor(props) {
        super(props);

        this.handleCreateTravel = this.handleCreateTravel.bind(this);
        this.handleCreateAuthorGroup = this.handleCreateAuthorGroup.bind(this);
        this.handleCreatePhotos = this.handleCreatePhotos.bind(this);
        this.fetchMeetingPoints = this.fetchMeetingPoints.bind(this);
        this.fetchAuthors = this.fetchAuthors.bind(this);
        this.fetchLocations = this.fetchLocations.bind(this);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeMeetingPoint = this.onChangeMeetingPoint.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeHour = this.onChangeHour.bind(this);
        this.onChangePhotos = this.onChangePhotos.bind(this);

        this.addAuthor = this.addAuthor.bind(this);
        this.removeAuthor = this.removeAuthor.bind(this);
        this.handleCreatePhotos = this.handleCreatePhotos.bind(this);
        this.setLocation = this.setLocation.bind(this);

        this.validateTitle = this.validateTitle.bind(this);
        this.validateLocation = this.validateLocation.bind(this);
        this.validateMeetingPoint = this.validateMeetingPoint.bind(this);
        this.validateDate = this.validateDate.bind(this);
        this.validateHour = this.validateHour.bind(this);
        this.validateAuthors = this.validateAuthors.bind(this);
        this.validatePhotos = this.validatePhotos.bind(this);

        this.validate = this.validate.bind(this);

        this.resetForm = this.resetForm.bind(this);
    }

    state = {
        title: '',
        location: '',
        date: '',
        hour: '',
        id_meetingpoint: -1,
        latitude: null,
        longitude: null,
        description: '',

        locationQuery: '',
        locationResults: [],

        meetingpoints: [],
        authors: [],
        photos: [],

        selectedAuthorIndex: 0,
        selectedAuthors: [],

        success: false,
        message: '',

        /* INVALID */
        invalidTitle: null,
        invalidLocation: null,
        invalidMeetingPoint: null,
        invalidDate: null,
        invalidHour: null,
        invalidAuthors: null,
        invalidPhotos: null
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

    fetchLocations(query) {
        fetch(`http://nominatim.openstreetmap.org/search?q=${query}&addressdetails=1&format=json`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    locationResults: result
                }, () => console.log(result));
            })
            .catch(error => this.setState({
                success: false,
                message: String(error)
            }));

    }

    onChangeTitle(event) {
        if (this.state.invalidTitle) {
            this.validateTitle(this.state.title);
            this.setState({ title: event.target.value });
        } else {
            this.setState({ title: event.target.value });
        }
    }

    onChangeMeetingPoint(event) {
        const id = Number(event.target.value);
        this.setState({ id_meetingpoint: id }, () => this.validateMeetingPoint(id));
    }

    onChangeDate(event) {
        const date = event.target.value;
        this.setState({ date: date });
    }

    onChangeHour(event) {
        const time = event.target.value;
        this.setState({ hour: time });
    }

    onChangeAuthor(event) {
        this.setState({ selectedAuthorIndex: event.target.value });
    }

    onChangePhotos(event) {
        const fileList = event.target.files;
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.addPhoto(file.name, reader.result);
                };
                reader.onerror = () => {
                    this.setState({
                        success: false,
                        message: reader.error.message
                    });
                }
                reader.readAsDataURL(file);
            }
        }
    }

    addAuthor(author) {
        const id = author.id_author;
        const authors = this.state.selectedAuthors;
        for (let i = 0; i < authors.length; i++) {
            if (authors[i].id_author === id) {
                return;
            }
        }
        this.setState({ selectedAuthors: [...authors, author] }, () => this.validateAuthors(this.state.selectedAuthors));
    }

    setLocation({ country, latitude, longitude }, callback) {
        this.setState({ location: country, latitude, longitude }, () => callback());
    }

    removeAuthor(id) {
        this.setState({ selectedAuthors: this.state.selectedAuthors.filter(item => (item.id_author !== id)) }, () => this.validateAuthors(this.state.selectedAuthors));
    }

    addPhoto(name, base64) {
        const photos = this.state.photos;
        for (let i = 0; i < photos.length; i++) {
            if (photos[i].name === name) {
                return;
            }
        }
        this.setState({ photos: [...photos, { name, base64 }] }, () => this.validatePhotos(this.state.photos));
    }

    removePhoto(name) {
        this.setState({ photos: this.state.photos.filter(item => (item.name !== name)) }, () => this.validatePhotos(this.state.photos));
    }

    handleCreateTravel(title, location, date, hour, id_meetingpoint, latitude, longitude, description, authors, photos, token) {

        if (!this.validate(title, location, latitude, longitude, id_meetingpoint, date, hour, authors, photos)) {
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
                }, () => console.error(error))
            });
    }

    resetForm() {
        this.setState({
            title: '',
            location: '',
            date: '',
            hour: '',
            id_meetingpoint: -1,
            latitude: null,
            longitude: null,
            description: '',

            locationQuery: '',
            locationResults: [],

            meetingpoints: [],
            authors: [],
            photos: [],

            selectedAuthorIndex: 0,
            selectedAuthors: [],

            invalidTitle: null,
            invalidLocation: null,
            invalidMeetingPoint: null,
            invalidDate: null,
            invalidHour: null,
            invalidAuthors: null,
            invalidPhotos: null
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

    validateTitle(title) {
        const length = 5;
        if (title.length < length) {
            this.setState({ invalidTitle: `Tytuł musi mieć przynajmniej ${length} znaków.` });
            return false;
        } else {
            this.setState({ invalidTitle: false });
            return true;
        }
    }

    validateLocation(location, latitude, longitude) {
        if (location.length < 1 || latitude === null || longitude === null) {
            this.setState({ invalidLocation: `Wybierz kraj podróży.` });
            return false;
        } else {
            this.setState({ invalidLocation: false });
            return true;
        }
    }

    validateMeetingPoint(id) {
        const meetingpoints = this.state.meetingpoints;
        for (let i = 0; i < meetingpoints.length; i++) {
            if (Number(meetingpoints[i].id_meetingpoint) === Number(id)) {
                this.setState({ invalidMeetingPoint: false, id_meetingpoint: Number(id) });
                return true;
            }
        }
        this.setState({ invalidMeetingPoint: 'Wybierz miejsce spotkania.', id_meetingpoint: -1 });
        return false;
    }

    validateDate(date) {
        const string = `Podaj poprawną datę.`
        if (typeof date === "string") {
            if (date.length === 10) {
                this.setState({ invalidDate: false, date: date });
                return true;
            } else {
                this.setState({ invalidDate: string });
                return false;
            }
        } else {
            this.setState({ invalidDate: string });
            return false;
        }
    }

    validateHour(time) {
        const string = `Podaj poprawną godzinę.`
        if (typeof time === "string") {
            if (time.length === 5) {
                this.setState({ invalidHour: false, hour: time });
                return true;
            } else {
                this.setState({ invalidHour: string });
                return false;
            }
        } else {
            this.setState({ invalidHour: string });
            return false;
        }
    }

    validateAuthors(authors) {
        const string = "Wybierz przynajmniej jednego prelegenta."
        if (authors.length < 1) {
            this.setState({ invalidAuthors: string });
            return false;
        } else {
            this.setState({ invalidAuthors: false });
            return true;
        }
    }

    validatePhotos(photos) {
        const string = "Dodaj przynajmniej jedno zdjęcie."
        if (photos.length < 1) {
            this.setState({ invalidPhotos: string });
            return false;
        } else {
            this.setState({ invalidPhotos: false });
            return true;
        }
    }

    validate(title, location, latitude, longitude, id_meetingpoint, date, hour, authors, photos) {
        return (
            this.validateTitle(title) &&
            this.validateLocation(location, latitude, longitude) &&
            this.validateMeetingPoint(id_meetingpoint) &&
            this.validateDate(date) &&
            this.validateHour(hour) &&
            this.validateAuthors(authors) &&
            this.validatePhotos(photos));
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

                {/* <div className="field">
                    <label className="label">Tytuł prelekcji</label>
                    <div className="control has-icons-left">
                        <input
                            className={`input ${this.state.invalidTitle === false ? 'is-success' : (this.state.invalidTitle !== null ? 'is-danger' : '')}`}
                            value={this.state.title}
                            type="text"
                            onChange={this.onChangeTitle}
                            onBlur={() => this.validateTitle(this.state.title)} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faFlag} />
                        </span>
                    </div>
                    {
                        this.state.invalidTitle ?
                            <p class="help is-danger">{this.state.invalidTitle}</p>
                            :
                            null
                    }
                </div> */}

                <div className="field">
                    <label className="label">Kraj podróży</label>
                    {
                        this.state.location === '' ?
                            <div>
                                <div className="field is-grouped">
                                    <div className="control is-expanded">
                                        <input
                                            className={`input ${this.state.invalidLocation ? 'is-danger' : ''}`}
                                            type="text"
                                            value={this.state.locationQuery}
                                            onChange={(event) => this.setState({ locationQuery: event.target.value })} />
                                    </div>
                                    <div className="control">
                                        <button className="button is-info" onClick={(event) => { event.preventDefault(); this.fetchLocations(this.state.locationQuery); }}>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                    </div>
                                </div>
                                {
                                    this.state.invalidLocation ?
                                        <p class="help is-danger">{this.state.invalidLocation}</p>
                                        :
                                        null
                                }
                            </div>
                            :
                            <div className="field is-grouped">
                                <div className="control is-expanded has-icons-left">
                                    <input
                                        className="input is-success"
                                        type="text"
                                        value={this.state.location} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faGlobe} />
                                    </span>
                                </div>
                                <div className="control">
                                    <button className="button" onClick={(event) => { event.preventDefault(); this.setState({ location: '' }) }}>Zmień</button>
                                </div>
                            </div>
                    }
                    {
                        this.state.locationResults.length > 0 ?
                            <div style={{ marginBottom: '.75em' }}>
                                <ul className="list">
                                    {this.state.locationResults.map(item => (
                                        <li key={item.place_id} className="list-item">
                                            <a onClick={(event) => {
                                                event.preventDefault();
                                                this.setLocation({ country: item.address.country, latitude: item.lat, longitude: item.lon }, () => this.setState({ locationQuery: '', locationResults: [] }));
                                            }}>
                                                {`${item.display_name}`}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            :
                            null
                    }
                </div>
                <div className="field">
                    <label className="label">Wybierz miejsce spotkania</label>
                    <div className="control has-icons-left">
                        <div className={`select ${this.state.invalidMeetingPoint === false ? 'is-success' : (this.state.invalidMeetingPoint !== null ? 'is-danger' : '')}`} style={{ width: '100%' }}>
                            <select
                                onChange={this.onChangeMeetingPoint}
                                value={this.state.id_meetingpoint}
                                style={{ width: '100%' }}>
                                <option value={-1}>Wybierz...</option>
                                {this.state.meetingpoints.map(item => {
                                    return (
                                        <option
                                            key={item.id_meetingpoint}
                                            value={Number(item.id_meetingpoint)}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faHome} />
                        </span>
                    </div>
                    {
                        this.state.invalidMeetingPoint ?
                            <p class="help is-danger">{this.state.invalidMeetingPoint}</p>
                            :
                            null
                    }
                </div>
                <div className="columns" style={{ marginBottom: 0 }}>
                    <div className="column" style={{ paddingBottom: 0 }}>
                        <div className="field">
                            <label className="label">Dzień spotkania</label>
                            <div className="control has-icons-left">
                                <input
                                    className={`input ${this.state.invalidDate === false ? 'is-success' : (this.state.invalidDate !== null ? 'is-danger' : '')}`}
                                    value={this.state.date}
                                    type="date"
                                    onChange={this.onChangeDate}
                                    onBlur={() => this.validateDate(this.state.date)} />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faCalendar} />
                                </span>
                            </div>
                            {
                                this.state.invalidDate ?
                                    <p class="help is-danger">{this.state.invalidDate}</p>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label className="label">Godzina spotkania</label>
                            <div className="control has-icons-left">
                                <input
                                    className={`input ${this.state.invalidHour === false ? 'is-success' : (this.state.invalidHour !== null ? 'is-danger' : '')}`}
                                    value={this.state.hour}
                                    type="time"
                                    onChange={this.onChangeHour}
                                    onBlur={() => this.validateHour(this.state.hour)} />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faHourglass} />
                                </span>
                            </div>
                            {
                                this.state.invalidHour ?
                                    <p class="help is-danger">{this.state.invalidHour}</p>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>


                <div className="field">
                    <label className="label">Prelegenci</label>
                    {
                        this.state.selectedAuthors.length > 0 ?
                            <div style={{ marginBottom: '.75em' }}>
                                <ul className="list" style={{ boxSizing: 'border-box', border: '1px solid #48c774' }}>
                                    {this.state.selectedAuthors.map(item => (
                                        <li key={item.id_author} className="list-item" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            {`${item.firstname} ${item.lastname}`}
                                            <a className="delete is-small" style={{ display: 'block', lineHeight: '18px' }} onClick={() => this.removeAuthor(item.id_author)}></a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            :
                            null
                    }
                    <div className="field is-grouped">
                        <div className="control is-expanded has-icons-left">
                            <div className={`select ${this.state.invalidAuthors ? 'is-danger' : ''}`} style={{ width: '100%' }}>
                                <select onChange={this.onChangeAuthor} value={this.state.selectedAuthorIndex} style={{ width: '100%' }}>
                                    {this.state.authors.map((item, index) => {
                                        return (
                                            <option key={item.id_author} value={index}> {`${item.firstname} ${item.lastname}`}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        </div>
                        <div className="control">
                            <button
                                className="button"
                                onClick={(event) => {
                                    event.preventDefault();
                                    const index = this.state.selectedAuthorIndex;
                                    const author = this.state.authors[index];
                                    this.addAuthor(author);
                                }}>
                                Dodaj prelegenta
                        </button>
                        </div>
                    </div>
                    {
                        this.state.invalidAuthors ?
                            <p class="help is-danger">{this.state.invalidAuthors}</p>
                            :
                            null
                    }
                </div>

                <div className="field">
                    <label className="label">Zdjęcia</label>
                    {
                        this.state.photos.length > 0 ?
                            <div style={{ marginBottom: '.75em' }}>
                                <ul className="list" style={{ boxSizing: 'border-box', border: '1px solid #48c774' }}>
                                    {this.state.photos.map(item => (
                                        <li key={item.name} className="list-item" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            {item.name}
                                            <a className="delete is-small" style={{ display: 'block', lineHeight: '18px' }} onClick={() => this.removePhoto(item.name)}></a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            :
                            null
                    }
                    <div className="control has-icons-left">
                        <div className={`file ${this.state.invalidPhotos ? 'is-danger' : ''}`}>
                            <label className="file-label">
                                <input
                                    className="file-input"
                                    type="file"
                                    onChange={this.onChangePhotos} />
                                <span className="file-cta">
                                    <span className="file-icon">
                                        <i className="fas fa-upload"></i>
                                    </span>
                                    <span className="file-label">Dodaj zdjęcie</span>
                                </span>
                            </label>
                        </div>
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faCamera} />
                        </span>
                    </div>
                    {
                        this.state.invalidPhotos ?
                            <p class="help is-danger">{this.state.invalidPhotos}</p>
                            :
                            null
                    }
                </div>

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
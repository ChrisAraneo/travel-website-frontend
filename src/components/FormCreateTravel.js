import React from 'react';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faPlane, faCalendar, faHourglass, faHome, faGlobe, faComment, faUser, faCamera } from '@fortawesome/free-solid-svg-icons'

import config from '../config/config';

import Form from './Form';

class FormCreateTravel extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeMeetingPlace = this.onChangeMeetingPlace.bind(this);
        this.handleCreateTravel = this.handleCreateTravel.bind(this);
        this.handleCreateAuthorGroup = this.handleCreateAuthorGroup.bind(this);
        this.handleCreatePhotos = this.handleCreatePhotos.bind(this);
        this.fetchMeetingPlaces = this.fetchMeetingPlaces.bind(this);
        this.fetchAuthors = this.fetchAuthors.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.addAuthor = this.addAuthor.bind(this);
        this.removeAuthor = this.removeAuthor.bind(this);
        this.handleCreatePhotos = this.handleCreatePhotos.bind(this);
    }

    state = {
        title: '',
        location: '',
        date: '',
        hour: '',
        id_meetingpoint: 0,
        latitude: null,
        longitude: null,
        description: '',

        meetingpoints: [],
        authors: [],
        photos: [],

        selectedAuthorIndex: 0,
        selectedAuthors: [],

        success: false,
        message: ''
    }

    componentDidMount() {
        // Init
        // POBIERANIE MIEJSC SPOTKAŃ
        this.fetchMeetingPlaces(
            () => this.fetchAuthors(() => console.log(this.state.authors))
        );

        // POBIERANIE PRELEGENTÓW
    }


    fetchMeetingPlaces(successCallback) {
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

    onChangeMeetingPlace(event) {
        this.setState({ id_meetingpoint: event.target.value });
    }

    onChangeAuthor(event) {
        this.setState({ selectedAuthorIndex: event.target.value });
    }

    onChangePhotos(fileList) {
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
        this.setState({ selectedAuthors: [...authors, author] });
    }

    removeAuthor(id) {
        this.setState({ selectedAuthors: this.state.selectedAuthors.filter(item => (item.id_author !== id)) });
    }

    addPhoto(name, base64) {
        const photos = this.state.photos;
        for (let i = 0; i < photos.length; i++) {
            if (photos[i].name === name) {
                return;
            }
        }
        this.setState({ photos: [...photos, { name, base64 }] });
    }

    removePhoto(name) {
        this.setState({ photos: this.state.photos.filter(item => (item.name !== name)) });
    }

    handleCreateTravel(title, location, date, hour, id_meetingpoint, latitude, longitude, description, token) {
        if (typeof title === "string") {
            if (title.length < 5) {
                this.setState({
                    success: false,
                    message: "Tytuł prelekcji jest za krótki"
                });
                return;
            }
            return;
        }

        if (typeof location === "string") {
            if (location.length < 3) {
                this.setState({
                    success: false,
                    message: "Nazwa miejsca, na temat którego jest prelekcja, jest z krótka"
                });
                return;
            }
            return;
        }

        // TODO
        if (typeof date === "string") {
            console.log("Date", date);
        }

        // TODO
        if (typeof hour === "string") {
            console.log("Hour", hour);
        }

        if (typeof id_meetingpoint !== "number") {
            id_meetingpoint = Number(id_meetingpoint);
        }

        if (typeof latitude !== "number" || typeof longitude !== "number") {
            this.setState({
                success: false,
                message: "Niepoprawna współrzędna geograficzna"
            });
            return;
        }

        if (typeof description !== "string") {
            description = "";
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('location', location);
        formData.append('date', date);
        formData.append('hour', hour);
        formData.append('id_meetingpoint', id_meetingpoint);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('description', description);
        formData.append('token', token);

        fetch(`${config.url}/api/post/travel.php`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    success: result.success,
                    message: result.message
                });
                const id_travel = result.id_travel;
                this.handleCreateAuthorGroup(this.state.authors, id_travel, token);
                this.handleCreatePhotos(this.state.photos, id_travel, token);
            })
            .catch(error => this.setState({
                success: false,
                message: String(error)
            }));
    }

    handleCreateAuthorGroup(authors, id_travel, token) {
        for (let i = 0; i < authors.length; i++) {
            const author = authors[i];

            const formData = new FormData();
            formData.append('id_author', author.id_author);
            formData.append('id_travel', id_travel);
            formData.append('token', token);

            fetch(`${config.url}/api/post/authorgroup.php`, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(() => console.log("Author", id_travel, author.id_author))
                .catch(() => null);
        }
    }

    handleCreatePhotos(photos, id_travel, token) {
        for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];

            const formData = new FormData();
            formData.append('base64', photo.base64);
            formData.append('id_travel', id_travel);
            formData.append('token', token);

            fetch(`${config.url}/api/post/photo.php`, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(() => console.log("Photo", id_travel, photo.name))
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
                action={(event) => this.handleCreate(this.state.title, this.state.location, this.state.date, this.state.hour, this.state.id_meetingpoint, this.state.latitude, this.state.longitude, this.state.description, this.state.photo, this.props.token)}>
                <div className="field">
                    <label className="label">Tytuł prelekcji</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            value={this.state.title}
                            type="text"
                            onChange={(event) => this.setState({ title: event.target.value })} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faFlag} />
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Miejsce podróży</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            value={this.state.location}
                            type="text"
                            onChange={(event) => this.setState({ location: event.target.value })} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faPlane} />
                        </span>
                    </div>
                </div>
                <div className="columns" style={{ marginBottom: 0 }}>
                    <div className="column" style={{ paddingBottom: 0 }}>
                        <div className="field">
                            <label className="label">Dzień spotkania</label>
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    value={this.state.date}
                                    type="date"
                                    onChange={(event) => this.setState({ date: event.target.value })} />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faCalendar} />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label className="label">Godzina spotkania</label>
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    value={this.state.hour}
                                    type="time"
                                    onChange={(event) => this.setState({ hour: event.target.value })} />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faHourglass} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Miejsce spotkania</label>
                    <div className="control has-icons-left">
                        <div className="select">
                            <select onChange={this.onChangeMeetingPlace} value={this.state.id_meetingpoint}>
                                {this.state.meetingpoints.map(item => {
                                    return (
                                        <option key={item.id_meetingpoint} value={Number(item.id_meetingpoint)}> {item.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faHome} />
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Wybierz miejsce podróży na mapie</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            value={this.state.location}
                            type="text"
                            onChange={(event) => this.setState({ location: event.target.value })} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faGlobe} />
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Opis prelekcji (opcjonalnie)</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            value={this.state.location}
                            type="text"
                            onChange={(event) => this.setState({ location: event.target.value })} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faComment} />
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Prelegenci</label>
                    {
                        this.state.selectedAuthors.length > 0 ?
                            <div style={{ marginBottom: '.75em' }}>
                                <ul className="list">
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
                    <div className="control has-icons-left">
                        <div className="select">
                            <select onChange={this.onChangeAuthor} value={this.state.selectedAuthorIndex}>
                                {this.state.authors.map((item, index) => {
                                    return (
                                        <option key={item.id_author} value={index}> {`${item.firstname} ${item.lastname}`}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <button
                            className="button"
                            style={{ marginLeft: 24 }}
                            onClick={(event) => {
                                event.preventDefault();
                                const index = this.state.selectedAuthorIndex;
                                const author = this.state.authors[index];
                                this.addAuthor(author);
                            }}>
                            Dodaj prelegenta
                        </button>
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Zdjęcia</label>
                    {
                        this.state.photos.length > 0 ?
                            <div style={{ marginBottom: '.75em' }}>
                                <ul className="list">
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
                        <div className="file">
                            <label className="file-label">
                                <input
                                    className="file-input"
                                    type="file"
                                    onChange={event => this.onChangePhotos(event.target.files)} />
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
                </div>

            </Form >
        );
    }
}

export default FormCreateTravel;
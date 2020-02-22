import React from 'react';
import '../styles/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

/*
props.label
props.icon
props.empty
props.message
props.complete
*/
class InputLocation extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.fetchLocations = this.fetchLocations.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.validate = this.validate.bind(this);
    }

    state = {
        query: '',
        results: [],

        location: '',
        latitude: null,
        longitude: null,

        invalid: null
    }

    onChange(event) {
        const query = event.target.value;
        this.setState({ query });
    }

    fetchLocations(event) {
        event.preventDefault();
        const query = this.state.query;

        fetch(`http://nominatim.openstreetmap.org/search?q=${query}&addressdetails=1&format=json`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    results: result
                }, () => null);
            })
            .catch(error => this.setState({
                invalid: String(error.message)
            }));
    }

    setLocation({ location, latitude, longitude }) {
        this.setState({ location, latitude, longitude },
            () => {
                this.validate();
                this.setState({ results: [] },
                    () => this.props.complete({ location, latitude, longitude }));
            }
        );
    }

    validate() {
        if (this.state.location === '' && this.state.latitude === null && this.state.longitude === null) {
            this.setState({ invalid: this.props.message });
        } else {
            this.setState({ invalid: false });
        }
    }

    render() {
        return (
            <div className="field">
                <label className="label">{this.props.label}</label>
                {
                    this.state.location === '' ?
                        <div>
                            <div className="field is-grouped">
                                <div className="control is-expanded">
                                    <input
                                        className={`input ${this.state.invalid ? 'is-danger' : ''}`}
                                        type="text"
                                        value={this.state.query}
                                        onChange={this.onChange} />
                                </div>
                                <div className="control">
                                    <button
                                        className="button is-primary"
                                        onClick={this.fetchLocations}>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                </div>
                            </div>
                            {
                                this.state.invalid ?
                                    <p class="help is-danger">{this.state.invalid}</p>
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
                                    <FontAwesomeIcon icon={this.props.icon} />
                                </span>
                            </div>
                            <div className="control">
                                <button className="button" onClick={(event) => { event.preventDefault(); this.setState({ location: '', latitude: null, longitude: null }) }}>Zmień</button>
                            </div>
                        </div>
                }
                {
                    this.state.results.length > 0 ?
                        <div style={{ marginBottom: '.75em' }}>
                            <ul className="list">
                                {this.state.results.map(item => (
                                    <li key={item.place_id} className="list-item">
                                        <a onClick={(event) => {
                                            event.preventDefault();
                                            this.setLocation({ location: item.address.country, latitude: item.lat, longitude: item.lon });
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
        );
    }
}

export default InputLocation;
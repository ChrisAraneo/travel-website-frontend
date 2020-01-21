import React from 'react';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

/*
props.label
props.complete
props.message
*/

class InputDate extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    state = {
        date: null,
        invalid: null
    }

    onChange(event) {
        const date = event.target.value;
        this.setState({ date })
    }

    validate(date) {
        if (typeof date === "string") {
            if (date.length === 10) {
                this.setState({ invalid: false },
                    () => this.props.complete(date));
                return true;
            }
        }
        this.setState({ invalid: this.props.message },
            () => this.props.complete(null));
        return false;
    }

    render() {
        return (
            <div className="field">
                <label className="label">{this.props.label}</label>
                <div className="control has-icons-left">
                    <input
                        className={`input ${this.state.invalid === false ? 'is-success' : (this.state.invalid !== null ? 'is-danger' : '')}`}
                        value={this.state.date}
                        type="date"
                        onChange={this.onChange}
                        onBlur={() => this.validate(this.state.date)} />
                    <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faCalendar} />
                    </span>
                </div>
                {
                    this.state.invalid ?
                        <p class="help is-danger">{this.state.invalid}</p>
                        :
                        null
                }
            </div>
        );
    }
}

export default InputDate;
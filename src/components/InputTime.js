import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/index.css";

/*
props.label
props.complete
props.message
*/

class InputTime extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  state = {
    time: null,
    invalid: null,
  };

  onChange(event) {
    const time = event.target.value;
    this.setState({ time });
  }

  validate(time) {
    if (typeof time === "string") {
      if (time.length === 5) {
        this.setState({ invalid: false }, () => this.props.complete(time));
        return true;
      }
    }
    this.setState({ invalid: this.props.message }, () =>
      this.props.complete(null)
    );
    return false;
  }

  render() {
    return (
      <div className="field">
        <label className="label">{this.props.label}</label>
        <div className="control has-icons-left">
          <input
            className={`input ${
              this.state.invalid === false
                ? "is-success"
                : this.state.invalid !== null
                ? "is-danger"
                : ""
            }`}
            value={this.state.time}
            type="time"
            onChange={this.onChange}
            onBlur={() => this.validate(this.state.time)}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faClock} />
          </span>
        </div>
        {this.state.invalid ? (
          <p class="help is-danger">{this.state.invalid}</p>
        ) : null}
      </div>
    );
  }
}

export default InputTime;

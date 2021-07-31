import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/index.css";

/*
props.label
props.icon
props.validation
props.message
props.complete
props.forceValidation
*/
class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  state = {
    value: "",
    invalid: null,
  };

  onChange(event) {
    const value = event.target.value;
    if (this.state.invalid) {
      this.setState({ value }, () => this.validate(value));
    } else {
      this.setState({ value });
    }
  }

  validate(value) {
    if (this.props.validation(value)) {
      this.setState({ invalid: false });
      this.props.complete(value);
      return true;
    } else {
      this.setState({ invalid: this.props.message });
      this.props.complete(null);
      return false;
    }
  }

  render() {
    return (
      <div className="field">
        <label className="label">{this.props.label}</label>
        <div className="control has-icons-left">
          <input
            className={`input ${
              this.state.invalid === null
                ? ""
                : this.state.invalid === false
                ? "is-success"
                : "is-danger"
            }`}
            value={this.state.value}
            type="text"
            onChange={this.onChange}
            onBlur={() => this.validate(this.state.value)}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={this.props.icon} />
          </span>
        </div>
        {this.state.invalid ? (
          <p class="help is-danger">{this.state.invalid}</p>
        ) : null}
      </div>
    );
  }
}

export default InputText;

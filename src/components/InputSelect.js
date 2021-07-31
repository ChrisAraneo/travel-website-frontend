import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/index.css";

/*
props.label
props.value // id_meetingpoint
props.name // name
props.data
props.icon
props.complete
props.message
*/

class InputSelect extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  state = {
    invalid: null,
    id: -1,
  };

  onChange(event) {
    const id = Number(event.target.value);
    this.setState({ id }, () => this.validate(id));
  }

  validate(id) {
    const data = this.props.data;
    for (let i = 0; i < data.length; i++) {
      if (Number(data[i][this.props.value]) === Number(id)) {
        this.setState({ invalid: false, id: Number(id) }, () =>
          this.props.complete(Number(id))
        );
        return true;
      }
    }
    this.setState({ invalid: this.props.message, id: -1 }, () =>
      this.props.complete(null)
    );
    return false;
  }

  render() {
    return (
      <div className="field">
        <label className="label">{this.props.label}</label>
        <div className="control has-icons-left">
          <div
            className={`select ${
              this.state.invalid === false
                ? "is-success"
                : this.state.invalid !== null
                ? "is-danger"
                : ""
            }`}
            style={{ width: "100%" }}
          >
            <select
              onChange={this.onChange}
              value={this.state.id}
              style={{ width: "100%" }}
            >
              <option value={-1}>Wybierz...</option>
              {this.props.data
                ? this.props.data.map((item) => {
                    return (
                      <option
                        key={item[this.props.value]}
                        value={Number(item[this.props.value])}
                      >
                        {item[this.props.name]}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
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

export default InputSelect;

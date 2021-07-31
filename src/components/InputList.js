import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/index.css";

/*
props.label
props.data
props.value // id_author
props.name // function
props.icon
props.button
props.message
props.complete
*/

class InputList extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.validate = this.validate.bind(this);
  }

  state = {
    selectedIndex: -1,
    selected: [],
    invalid: null,
  };

  componentDidUpdate() {
    if (this.state.selectedIndex < 0 && this.props.data) {
      if (this.props.data.length > 0) {
        this.setState({ selectedIndex: this.props.data[0][this.props.value] });
      }
    }
  }

  onChange(event) {
    const selectedIndex = event.target.value;
    this.setState({ selectedIndex });
  }

  add(item) {
    const value = item[this.props.value];
    const selected = this.state.selected;
    for (let i = 0; i < selected.length; i++) {
      if (selected[i][this.props.value] === value) {
        return;
      }
    }
    this.setState({ selected: [...selected, item] }, () =>
      this.validate(this.state.selected)
    );
  }

  remove(value) {
    this.setState(
      {
        selected: this.state.selected.filter(
          (item) => item[this.props.value] !== value
        ),
      },
      () => this.validate(this.state.selected)
    );
  }

  validate(data) {
    if (data.length < 1) {
      this.setState({ invalid: this.props.message }, () =>
        this.props.complete(null)
      );
      return false;
    } else {
      this.setState({ invalid: false }, () => this.props.complete(data));
      return true;
    }
  }

  render() {
    return (
      <div className="field">
        <label className="label">{this.props.label}</label>
        {this.state.selected.length > 0 ? (
          <div style={{ marginBottom: ".75em" }}>
            <ul
              className="list"
              style={{ boxSizing: "border-box", border: "1px solid #48c774" }}
            >
              {this.state.selected.map((item) => (
                <li
                  key={item[this.props.value]}
                  className="list-item"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {this.props.name(item)}
                  <a
                    className="delete is-small"
                    style={{ display: "block", lineHeight: "18px" }}
                    onClick={() => this.remove(item[this.props.value])}
                  ></a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="field is-grouped">
          <div className="control is-expanded has-icons-left">
            <div
              className={`select ${this.state.invalid ? "is-danger" : ""}`}
              style={{ width: "100%" }}
            >
              <select
                onChange={this.onChange}
                value={this.state.selectedIndex}
                style={{ width: "100%" }}
              >
                {this.props.data
                  ? this.props.data.map((item, index) => {
                      return (
                        <option key={item[this.props.value]} value={index}>
                          {" "}
                          {this.props.name(item)}
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
          <div className="control">
            {this.props.data ? (
              this.props.data.length > 0 ? (
                <button
                  className="button is-primary"
                  onClick={(event) => {
                    event.preventDefault();
                    const index = this.state.selectedIndex;
                    const item = this.props.data[index];
                    this.add(item);
                  }}
                >
                  {this.props.button}
                </button>
              ) : null
            ) : null}
          </div>
        </div>
        {this.state.invalid ? (
          <p class="help is-danger">{this.state.invalid}</p>
        ) : null}
      </div>
    );
  }
}

export default InputList;

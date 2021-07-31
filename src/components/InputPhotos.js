import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/index.css";

/*
props.label
props.button
props.complete
props.message
*/
class InputPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.validate = this.validate.bind(this);
  }

  state = {
    photos: [],
    invalid: null,
  };

  onChange(event) {
    const fileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.add(file.name, reader.result);
        };
        reader.onerror = () => {
          this.setState({
            invalid: reader.error.message,
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  add(name, base64) {
    const photos = this.state.photos;
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].name === name) {
        return;
      }
    }
    this.setState({ photos: [...photos, { name, base64 }] }, () =>
      this.validate(this.state.photos)
    );
  }

  remove(name) {
    this.setState(
      { photos: this.state.photos.filter((item) => item.name !== name) },
      () => this.validate(this.state.photos)
    );
  }

  validate(data) {
    if (data.length > 0) {
      this.setState({ invalid: false }, () => this.props.complete(data));
    } else {
      this.setState({ invalid: this.props.message }, () =>
        this.props.complete(null)
      );
    }
  }

  render() {
    return (
      <div className="field">
        <label className="label">{this.props.label}</label>
        {this.state.photos.length > 0 ? (
          <div style={{ marginBottom: ".75em" }}>
            <ul
              className="list"
              style={{ boxSizing: "border-box", border: "1px solid #48c774" }}
            >
              {this.state.photos.map((item) => (
                <li
                  key={item.name}
                  className="list-item"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {item.name}
                  <a
                    className="delete is-small"
                    style={{ display: "block", lineHeight: "18px" }}
                    onClick={() => this.remove(item.name)}
                  ></a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="control has-icons-left">
          <div className={`file ${this.state.invalid ? "is-danger" : ""}`}>
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                onChange={this.onChange}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">{this.props.button}</span>
              </span>
            </label>
          </div>
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faCamera} />
          </span>
        </div>
        {this.state.invalid ? (
          <p class="help is-danger">{this.state.invalid}</p>
        ) : null}
      </div>
    );
  }
}

export default InputPhotos;

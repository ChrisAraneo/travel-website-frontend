import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import config from "../config/config";
import "../styles/index.css";
import Form from "./Form/Form";
import InputPassword from "./InputPassword";
import InputText from "./InputText";

class FormLogIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  state = {
    username: "",
    password: "",

    success: false,
    message: "",

    token: null,
  };

  handleLogIn(username, password) {
    if (username && password) {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      fetch(`${config.url}/api/post/login.php`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          this.setState(
            {
              success: result.success,
              message: result.message,
              token: result.token,
              username: result.username,
            },
            () => {
              if (this.state.token !== null && this.state.token !== undefined) {
                this.props.setToken(this.state.token);
              }
              if (
                this.state.username !== null &&
                this.state.username !== undefined
              ) {
                this.props.setUsername(this.state.username);
              }
            }
          );
        })
        .catch((error) =>
          this.setState({
            success: false,
            message: String(error),
          })
        );
    } else {
      this.setState({
        success: false,
        message: "Uzupełnij nazwę użytkownika i hasło.",
      });
    }
  }

  render() {
    return (
      <Form
        title="Zaloguj się"
        success={this.state.success}
        message={this.state.message}
        button="Zaloguj się"
        action={() =>
          this.handleLogIn(this.state.username, this.state.password)
        }
      >
        <InputText
          label="Nazwa użytkownika"
          icon={faUser}
          validation={(val) => val.length > 3}
          message="Nazwa użytkownika jest za krótka."
          complete={(username) => this.setState({ username })}
        />
        <InputPassword
          label="Hasło"
          icon={faLock}
          validation={(val) => val.length > 5}
          message="Hasło jest za krótkie."
          complete={(password) => this.setState({ password })}
        />
      </Form>
    );
  }
}

export default FormLogIn;

import { faHome, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import config from "../config/config";
import "../styles/index.css";
import Form from "./Form/Form";
import InputText from "./InputText";

class FormCreateMeetingPoint extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateMeetingPoint = this.handleCreateMeetingPoint.bind(this);
  }

  state = {
    name: "",
    address: "",

    success: false,
    message: "",
  };

  handleCreateMeetingPoint(name, address, token) {
    if (name && address) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("token", token);

      fetch(`${config.url}/api/post/meetingpoint.php`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) =>
          this.setState(
            {
              success: result.success,
              message: result.message,
            },
            () => {
              /*this.resetForm()*/
            }
          )
        )
        .catch((error) =>
          this.setState({
            success: false,
            message: String(error),
          })
        );
    } else {
      this.setState({
        success: false,
        message: "Uzupełnij nazwę miejsca i adres.",
      });
    }
  }

  render() {
    return (
      <Form
        title="Dodaj miejsce spotkania"
        success={this.state.success}
        message={this.state.message}
        button="Dodaj"
        action={(event) =>
          this.handleCreateMeetingPoint(
            this.state.name,
            this.state.address,
            this.props.token
          )
        }
      >
        <InputText
          label="Nazwa miejsca"
          icon={faHome}
          validation={(val) => val.length > 5}
          message="Nazwa miejsca jest za krótka."
          complete={(name) => this.setState({ name })}
        />
        <InputText
          label="Adres"
          icon={faMapMarker}
          validation={(val) => val.length > 5}
          message="Adres jest za krótki."
          complete={(address) => this.setState({ address })}
        />
      </Form>
    );
  }
}

export default FormCreateMeetingPoint;

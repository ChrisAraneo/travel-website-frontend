import React from "react";
import FormCreateAuthor from "../components/FormCreateAuthor";
import FormCreateMeetingPoint from "../components/FormCreateMeetingPoint";
import FormCreateTravel from "../components/FormCreateTravel";
import FormCreateUser from "../components/FormCreateUser";
import Title from "../components/Title";
import "../styles/index.css";

const AdminPanelPage = (props) => {
  if (props.bundle.username === "admin") {
    return (
      <div>
        <header
          className="box"
          style={{ maxWidth: "100%", marginLeft: "auto", margtinRight: "auto" }}
        >
          <Title>{`Zalogowano jako ${props.bundle.username}`}</Title>
        </header>
        <FormCreateUser token={props.bundle.token} />
        <FormCreateAuthor token={props.bundle.token} />
        <FormCreateMeetingPoint token={props.bundle.token} />
        <FormCreateTravel
          token={props.bundle.token}
          meetingpoints={props.bundle.meetingpoints}
          authors={props.bundle.authors}
        />
        {props.children}
      </div>
    );
  } else {
    return (
      <div className="box">
        <h1 className="title">Niestety nie jesteś zalogowany jako admin</h1>
      </div>
    );
  }
};

export default AdminPanelPage;

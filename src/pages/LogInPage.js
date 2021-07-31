import React from "react";
import FormLogIn from "../components/FormLogIn";
import "../styles/index.css";

const LogInPage = (props) => (
  <FormLogIn setToken={props.setToken} setUsername={props.setUsername} />
);

export default LogInPage;

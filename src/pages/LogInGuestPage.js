import React from "react";
import FormLogInGuest from "../components/FormLoginGuest/FormLogInGuest";
import "../styles/index.css";

const LogInGuestPage = (props) => (
  <FormLogInGuest setToken={props.setToken} setUsername={props.setUsername} />
);

export default LogInGuestPage;

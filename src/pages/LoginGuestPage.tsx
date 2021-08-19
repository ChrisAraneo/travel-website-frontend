import React from "react";
import FormLogInGuest from "../components/FormLoginGuest/FormLogInGuest";

interface Props {
  setToken: (token: string) => any;
  setUsername: (username: string) => any;
}

const LoginGuestPage: React.FC<Props> = (props: Props) => (
  <FormLogInGuest setToken={props.setToken} setUsername={props.setUsername} />
);

export default LoginGuestPage;

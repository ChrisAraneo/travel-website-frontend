import React from "react";
import FormLogIn from "../components/FormLogin/FormLogin";

interface Props {
  setToken: (token: string) => any;
  setUsername: (username: string) => any;
}

const LoginPage: React.FC<Props> = (props: Props) => (
  <FormLogIn setToken={props.setToken} setUsername={props.setUsername} />
);

export default LoginPage;

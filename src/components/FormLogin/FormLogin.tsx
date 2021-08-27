import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import config from "../../config/config";
import { InputResetRef } from "../../types/InputResetRef";
import Form from "../Form/Form";
import InputPassword from "../InputPassword/InputPassword";
import InputText from "../InputText/InputText";

interface Props {
  setToken: (token: string) => any;
  setUsername: (username: string) => any;
}

const FormLogin: React.FC<Props> = (props: Props) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const usernameInputRef = useRef<InputResetRef>(null);
  const passwordInputRef = useRef<InputResetRef>(null);

  useEffect(() => {
    if (isSubmitted) {
      onLogin(username, password);
    }
  }, [isSubmitted]);

  const onLogin = (username: string, password: string) => {
    if (!username && !password) {
      setIsSuccess(false);
      setMessage("Uzupełnij nazwę użytkownika i hasło.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    fetch(`${config.url}/api/post/login.php`, {
      method: "POST",
      body: formData,
    })
      .then((httpResponse) => httpResponse.json())
      .then((result) => {
        setIsSubmitted(false);
        setIsSuccess(result.success);
        setMessage(result.message);
        setToken(result.token);
        setUsername(result.username);

        if (typeof token === "string" && token.length > 0) {
          props.setToken(token);
        }
        if (typeof username === "string" && username.length > 0) {
          props.setUsername(username);
        }

        resetForm();
      })
      .catch((error) => {
        setIsSuccess(false);
        setMessage(String(error));
        setIsSubmitted(false);
      });
  };

  const resetForm = () => {
    usernameInputRef.current?.reset();
    passwordInputRef.current?.reset();
  };

  return (
    <Form
      title="Zaloguj się"
      isSuccess={isSuccess}
      message={message}
      buttonText="Zaloguj się"
      action={() => setIsSubmitted(true)}
    >
      <InputText
        ref={usernameInputRef}
        label="Nazwa użytkownika"
        icon={faUser}
        validation={(val) => val.length > 3}
        errorMessage="Nazwa użytkownika jest za krótka."
        complete={(text) => setUsername(text ?? "")}
      />
      <InputPassword
        ref={passwordInputRef}
        label="Hasło"
        icon={faLock}
        validation={(val) => val.length > 5}
        errorMessage="Hasło jest za krótkie."
        complete={(text) => setPassword(text ?? "")}
      />
    </Form>
  );
};

export default FormLogin;

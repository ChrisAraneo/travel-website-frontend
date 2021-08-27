import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import config from "../../config/config";
import { InputResetRef } from "../../types/InputResetRef";
import Form from "../Form/Form";
import InputPassword from "../InputPassword/InputPassword";
import InputText from "../InputText/InputText";

interface Props {
  token: string;
}

const FormCreateUser: React.FC<Props> = (props: Props) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const usernameInputRef = useRef<InputResetRef>(null);
  const passwordInputRef = useRef<InputResetRef>(null);

  useEffect(() => {
    if (isSubmitted) {
      createUser(username, password, props.token);
    }
  }, [isSubmitted]);

  const validateUsername = (text: string) => text.length > 3;
  const validatePassword = (text: string) => text.length > 5;

  const createUser = (username?: string, password?: string, token?: string) => {
    if (!username || !password) {
      setIsSubmitted(false);
      setIsSuccess(false);
      setMessage("Uzupełnij nazwę użytkownika i hasło.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("token", token ?? "");

    fetch(`${config.url}/api/post/user.php`, {
      method: "POST",
      body: formData,
    })
      .then((httpResponse) => httpResponse.json())
      .then((result) => {
        setIsSubmitted(false);
        setIsSuccess(result.success);
        setMessage(result.message);
        resetForm();
      })
      .catch((error) => {
        setIsSubmitted(false);
        setIsSuccess(false);
        setMessage(String(error));
      });
  };

  const resetForm = () => {
    usernameInputRef.current?.reset();
    passwordInputRef.current?.reset();
  };

  return (
    <Form
      title="Dodaj użytkownika"
      isSuccess={isSuccess}
      message={message}
      buttonText="Dodaj"
      action={() => setIsSubmitted(true)}
    >
      <InputText
        ref={usernameInputRef}
        label="Nazwa użytkownika"
        icon={faUser}
        validation={validateUsername}
        errorMessage="Nazwa użytkownika jest za krótka."
        complete={(text) => setUsername(text ?? "")}
      />
      <InputPassword
        ref={passwordInputRef}
        label="Hasło"
        icon={faLock}
        validation={validatePassword}
        errorMessage="Hasło jest za krótkie."
        complete={(text) => setPassword(text ?? "")}
      />
    </Form>
  );
};

export default FormCreateUser;

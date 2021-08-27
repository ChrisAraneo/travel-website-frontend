import { faLock } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import config from "../../config/config";
import { InputResetRef } from "../../types/InputResetRef";
import Form from "../Form/Form";
import InputPassword from "../InputPassword/InputPassword";

const GUEST_USERNAME = "user";

interface Props {
  setToken: (token: string) => any;
  setUsername: (username: string) => any;
}

interface Response {
  success: boolean;
  message: string;
  token: string;
}

const FormLoginGuest: React.FC<Props> = (props: Props) => {
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const username = GUEST_USERNAME;

  const passwordInputRef = useRef<InputResetRef>(null);

  useEffect(() => {
    if (isSubmitted) {
      loginGuest(username, password);
    }
  }, [isSubmitted]);

  const loginGuest = (username: string, password: string) => {
    if (!username || !password) {
      setIsSubmitted(false);
      setIsSuccess(false);
      setMessage("Uzupełnij hasło.");
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
      .then((response: Response) => {
        setIsSubmitted(false);
        setIsSuccess(response.success);
        setMessage(response.message);

        props.setUsername(username);

        if (response.token) {
          props.setToken(response.token);
        } else {
          setIsSuccess(false);
          setMessage("Brak tokenu w odpowiedzi serwera.");
        }

        resetForm();
      })
      .catch((error) => {
        setIsSubmitted(false);
        setIsSuccess(false);
        setMessage(String(error));
      });
  };

  const resetForm = () => {
    passwordInputRef.current?.reset();
  };

  return (
    <Form
      title="Podaj hasło"
      isSuccess={isSuccess}
      message={message}
      action={() => setIsSubmitted(true)}
      buttonText="Wejdź na stronę"
    >
      <InputPassword
        ref={passwordInputRef}
        label="Hasło"
        icon={faLock}
        errorMessage="Hasło jest za krótkie."
        validation={(password: string) => password.length > 5}
        complete={(password?: string) => setPassword(password ?? "")}
      />
    </Form>
  );
};

export default FormLoginGuest;

import { faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import config from "../../config/config";
import { InputResetRef } from "../../types/InputResetRef";
import Form from "../Form/Form";
import InputText from "../InputText/InputText";

interface Props {
  token: string;
}

const FormCreateAuthor: React.FC<Props> = (props: Props) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const firstNameInputRef = useRef<InputResetRef>(null);
  const lastNameInputRef = useRef<InputResetRef>(null);

  useEffect(() => {
    if (isSubmitted) {
      createAuthor(firstName, lastName, props.token);
    }
  }, [isSubmitted]);

  const createAuthor = async (
    firstName: string,
    lastName: string,
    token: string
  ) => {
    if (!firstName || !lastName) {
      setIsSubmitted(false);
      setIsSuccess(false);
      setMessage("Uzupełnij imię i nazwisko.");
      return;
    }

    const formData = new FormData();
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    formData.append("token", token);

    await fetch(`${config.url}/api/post/author.php`, {
      method: "POST",
      body: formData,
    })
      .then((httpResponse) => httpResponse.json())
      .then((response) => {
        resetForm();
        setIsSubmitted(false);
        setIsSuccess(response.success);
        setMessage(response.message);
      })
      .catch((error) => {
        setIsSubmitted(false);
        setIsSuccess(false);
        setMessage(JSON.stringify(error));
      });
  };

  const resetForm = () => {
    firstNameInputRef.current?.reset();
    lastNameInputRef.current?.reset();
  };

  return (
    <Form
      title="Dodaj prelegenta"
      isSuccess={isSuccess}
      message={message}
      buttonText="Dodaj"
      action={() => setIsSubmitted(true)}
    >
      <InputText
        ref={firstNameInputRef}
        label="Imię"
        icon={faUser}
        validation={(text: string) => text.length > 2}
        errorMessage="Za krótkie imię."
        complete={(text?) => setFirstName(text ?? "")}
      />
      <InputText
        ref={lastNameInputRef}
        label="Nazwisko"
        icon={faUser}
        validation={(text: string) => text.length > 2}
        errorMessage="Za krótkie nazwisko."
        complete={(text?) => setLastName(text ?? "")}
      />
    </Form>
  );
};

export default FormCreateAuthor;

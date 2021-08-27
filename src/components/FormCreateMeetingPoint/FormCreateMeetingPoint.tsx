import { faHome, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import config from "../../config/config";
import { InputResetRef } from "../../types/InputResetRef";
import Form from "../Form/Form";
import InputText from "../InputText/InputText";

interface Props {
  token: string;
}

const FormCreateMeetingPoint: React.FC<Props> = (props: Props) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [addressString, setAddresString] = useState<string>("");

  const nameInputRef = useRef<InputResetRef>(null);
  const addressStringInputRef = useRef<InputResetRef>(null);

  useEffect(() => {
    if (isSubmitted) {
      createMeetingPoint(name, addressString);
    }
  }, [isSubmitted]);

  const createMeetingPoint = (name: string, addressString: string) => {
    if (!name || !addressString) {
      setIsSuccess(false);
      setMessage("Uzupełnij nazwę miejsca i adres.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", addressString);
    formData.append("token", props.token);

    fetch(`${config.url}/api/post/meetingpoint.php`, {
      method: "POST",
      body: formData,
    })
      .then((httpResponse) => httpResponse.json())
      .then((response) => {
        setIsSubmitted(false);
        setIsSuccess(response.success);
        setMessage(response.message);
        resetForm();
      })
      .catch((error) => {
        setIsSubmitted(false);
        setIsSuccess(false);
        setMessage(JSON.stringify(error));
      });
  };

  const resetForm = () => {
    nameInputRef.current?.reset();
    addressStringInputRef.current?.reset();
  };

  return (
    <Form
      title="Dodaj miejsce spotkania"
      isSuccess={isSuccess}
      message={message}
      buttonText="Dodaj"
      action={() => setIsSubmitted(true)}
    >
      <InputText
        ref={nameInputRef}
        label="Nazwa miejsca"
        icon={faHome}
        validation={(text) => text.length > 5}
        errorMessage="Nazwa miejsca jest za krótka."
        complete={(text?) => setName(text ?? "")}
      />
      <InputText
        ref={addressStringInputRef}
        label="Adres"
        icon={faMapMarker}
        validation={(text) => text.length > 5}
        errorMessage="Adres jest za krótki."
        complete={(text?) => setAddresString(text ?? "")}
      />
    </Form>
  );
};

export default FormCreateMeetingPoint;

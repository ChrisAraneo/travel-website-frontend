import React, { useEffect, useState } from "react";
import Message, { MessageType } from "../Message/Message";
import Title from "../Title/Title";
import "./Form.scss";

const MESSAGE_OK = "OK";
const MESSAGE_ERROR = "Błąd";

interface Props {
  title: string;
  buttonText: string;
  message: string;
  isSuccess: boolean;
  action: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => any;
  children?: any;
}

const Form: React.FC<Props> = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(false);
    if (props.message) {
      setIsMessageVisible(true);
    }
  }, [props.message, props.isSuccess]);

  const messageText = props.isSuccess ? MESSAGE_OK : MESSAGE_ERROR;
  const messageType = props.isSuccess
    ? MessageType.Success
    : MessageType.Danger;

  const onMessageClick = () => {
    setIsMessageVisible(false);
  };

  const onSubmitClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!isLoading) {
      setIsLoading(true);
      props.action(event);
    }
  };

  return (
    <form className="box">
      <Title>{props.title}</Title>
      <Message
        header={messageText}
        type={messageType}
        visible={isMessageVisible}
        onClick={onMessageClick}
      >
        {props.message}
      </Message>
      {props.children}
      <div className="submit is-clearfix">
        <input
          className={`button is-primary is-pulled-right ${
            isLoading ? "is-loading" : ""
          }`}
          type="submit"
          value={props.buttonText}
          onClick={onSubmitClick}
        />
      </div>
    </form>
  );
};

export default Form;

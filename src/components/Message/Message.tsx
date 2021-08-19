import React from "react";

export enum MessageType {
  Success = "success",
  Danger = "danger",
  Info = "info",
}

interface Props {
  visible: boolean;
  type: MessageType;
  header: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  children?: any;
}

const Message: React.FC<Props> = (props: Props) => (
  <>
    {props.visible && (
      <article className={`message is-${props.type}`}>
        <div className="message-header">
          <p>{props.header}</p>
          <button
            className="delete"
            aria-label="delete"
            onClick={(event) => {
              event.preventDefault();
              props.onClick(event);
            }}
          ></button>
        </div>
        <div className="message-body">{String(props.children)}</div>
      </article>
    )}
  </>
);

export default Message;

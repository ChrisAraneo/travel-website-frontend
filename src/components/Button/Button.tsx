import React, { MouseEventHandler } from "react";
// import "../styles/index.css";

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      className="button is-primary"
      onClick={(event) => (props.onClick ? props.onClick(event) : null)}
    >
      {props.children}
    </button>
  );
};

export default Button;

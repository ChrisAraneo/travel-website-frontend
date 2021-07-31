import React, { MouseEventHandler } from "react";

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  children?: any;
}

const Button: React.FC<Props> = (props: Props) => {
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

import React from "react";
import background from "../../images/background.jpg";
import "./Background.scss";

interface Props {
  children?: any;
}

const Background: React.FC<Props> = (props: Props) => {
  return (
    <div
      id="background"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {props.children}
    </div>
  );
};

export default Background;

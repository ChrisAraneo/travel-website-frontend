import React from "react";
import imageString from "../../images/brush-header.png";
import "./Title.scss";

interface Props {
  children?: any;
}

const Title: React.FC<Props> = (props: Props) => (
  <h1
    className="title"
    style={{
      backgroundImage: `url(${imageString})`,
    }}
  >
    {props.children}
  </h1>
);

export default Title;

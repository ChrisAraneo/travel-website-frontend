import React from "react";
import background from "../../images/background.jpg";

const Background: React.FC = (props) => {
  return (
    <div
      id="background"
      style={{
        background: `url(${background}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      {props.children}
    </div>
  );
};

export default Background;

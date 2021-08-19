import React from "react";
import background from "../../images/background.jpg";
import styles from "./Background.module.scss";

interface Props {
  children?: any;
}

const Background: React.FC<Props> = (props: Props) => {
  return (
    <div
      id="background"
      className={`${styles.background}`}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {props.children}
    </div>
  );
};

export default Background;

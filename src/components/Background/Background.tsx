import React from "react";
import styles from "./Background.module.scss";

interface Props {
  imageUrl: string;
  children?: any;
}

const Background: React.FC<Props> = (props: Props) => {
  return (
    <div
      id="background"
      className={`${styles.background}`}
      style={{
        backgroundImage: `url(${props.imageUrl})`,
      }}
      data-testid="background"
    >
      {props.children}
    </div>
  );
};

export default Background;

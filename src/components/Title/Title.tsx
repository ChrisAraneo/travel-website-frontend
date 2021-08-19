import React, { useEffect, useState } from "react";
import imageString from "../../images/brush-header.png";
import styles from "./Title.module.scss";

interface Props {
  children?: any;
}

const Title: React.FC<Props> = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const image = new Image();
    image.src = imageString;
    image.onload = () => setIsLoading(false);
  }, []);

  return (
    <h1
      className={`${styles.title}`}
      style={{
        backgroundImage: isLoading ? `url(${imageString})` : "",
      }}
    >
      {props.children}
    </h1>
  );
};

export default Title;

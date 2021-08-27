import React from "react";
import styles from "./TravelListYearSeparator.module.scss";

interface Props {
  children?: any;
}

const TravelListYearSeparator: React.FC<Props> = (props: Props) => (
  <h1
    className={`${styles.h1} has-text-light has-text-centered is-size-5 has-text-weight-bold half-margin-bottom`}
  >
    {props.children}
  </h1>
);

export default TravelListYearSeparator;

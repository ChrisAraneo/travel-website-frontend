import React from "react";
import styles from "./SiteFooter.module.scss";

interface Props {
  username?: string;
  setPageToLogin?: () => any;
}

const SiteFooter: React.FC<Props> = (props: Props) => (
  <footer className={`${styles.footer} box has-background-dark`}>
    {props.username && (
      <h2>
        Zalogowano jako <strong>{props.username}</strong>
      </h2>
    )}
    {props.setPageToLogin && (
      <h2>
        <a
          data-testid="admin-panel-link"
          onClick={(event) => {
            event.preventDefault();
            if (props.setPageToLogin) {
              props.setPageToLogin();
            }
          }}
        >
          Zaloguj się do panelu administratora
        </a>
      </h2>
    )}
    <a href="https://www.freepik.com/free-photos-vectors/abstract">
      Abstract vector created by freepik - www.freepik.com
    </a>
    <a href="https://www.freepik.com/free-photos-vectors/background">
      Background vector created by rawpixel.com - www.freepik.com
    </a>
  </footer>
);

export default SiteFooter;

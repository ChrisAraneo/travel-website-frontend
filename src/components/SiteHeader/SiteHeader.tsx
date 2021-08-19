import React from "react";
import config from "../../config/config";
import body from "../../images/site-header-title-background.png";
import background from "../../images/site-header.jpg";

const SiteHeader: React.FC = () => (
  <section
    className="site-header hero box"
    style={{
      backgroundImage: `url(${background})`,
      backgroundSize: "100% auto",
    }}
  >
    <div
      className="hero-body"
      style={{
        padding: "1.5rem 3rem",
        backgroundImage: `url(${body})`,
        backgroundSize: "100% auto",
      }}
    >
      <div className="container">
        <h3 className="subtitle has-text-centered has-text-grey-light">
          {config.siteHeaderSubtitleAbove}
        </h3>
        <h1
          className="title has-text-centered has-text-white"
          style={{ fontSize: "2.5rem" }}
        >
          {config.siteHeaderTitle}
        </h1>
        <h2
          className="subtitle has-text-centered has-text-grey-lighter"
          style={{ fontSize: "1.10rem" }}
        >
          {config.siteHeaderSubtitle}
        </h2>
      </div>
    </div>
  </section>
);
export default SiteHeader;

import React from "react";
import imageString from "../images/brush-header.png";
import "../styles/index.css";

class Title extends React.Component {
  state = {
    loaded: false,
  };

  componentDidMount() {
    const image = new Image();
    image.src = imageString;
    image.onload = () => {
      this.setState({ loaded: true });
    };
  }

  render() {
    return (
      <h1
        className="title"
        style={{
          boxSizing: "border-box",
          backgroundImage: this.state.loaded ? `url(${imageString})` : "",
          backgroundSize: "auto 1.15rem",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left bottom",
        }}
      >
        {this.props.children}
      </h1>
    );
  }
}

export default Title;

import React, { Component } from "react";
import PropTypes from "prop-types";
import Player from "./player";

class Logo extends Component {
  render() {
    const defaultSettings = {
      width: 200,
      height: 200,
      color: "#0475dc",
      isRotating: false,
      isReset: false
    };

    return <Player {...defaultSettings} />;
  }
}

export default Logo;

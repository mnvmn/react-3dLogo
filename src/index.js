import React, { Component } from "react";
import PropTypes from "prop-types";
import Player from "./player";

class Logo extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    color: PropTypes.string,
    isRotating: PropTypes.bool,
    isDevMode: PropTypes.bool
  };

  static defaultProps = {
    width: 200,
    height: 200,
    color: "#ddd",
    isRotating: false,
    isDevMode: false
  };

  render() {
    return <Player {...this.props} />;
  }
}

export default Logo;

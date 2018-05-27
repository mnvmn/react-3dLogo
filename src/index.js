import React, { Component } from "react";
import PropTypes from "prop-types";
import Player from "./player";

const defaultColor = "#404040";
const defaultColorLight = "#ddd";

class Logo extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    color: PropTypes.string,
    colorBackground: PropTypes.string,
    colorCore: PropTypes.string,
    colorOrbits: PropTypes.string,
    colorSatellites: PropTypes.string,
    color: PropTypes.string,
    isRotating: PropTypes.bool,
    isSpinning: PropTypes.bool,
    isDevMode: PropTypes.bool
  };

  static defaultProps = {
    width: 200,
    height: 200,
    color: defaultColor,
    colorBackground: "#FFF",
    colorCore: defaultColor,
    colorOrbits: defaultColor,
    colorSatellites: defaultColor,
    isRotating: false,
    isSpinning: false,
    isDevMode: true,
  };

  render() {
    return <Player {...this.props} />;
  }
}

export default Logo;

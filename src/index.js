import React, { Component } from "react";
import PropTypes from "prop-types";
import Scene from "./scene";

const defaultColor = "#404040";

class Logo extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    color: PropTypes.string,
    colorBackground: PropTypes.string,
    colorCore: PropTypes.string,
    colorOrbit: PropTypes.string,
    colorSatellite: PropTypes.string,
    isRotating: PropTypes.bool,
    isSpinning: PropTypes.bool,
    visibleSatellites: PropTypes.bool,
    isDevMode: PropTypes.bool
  };

  static defaultProps = {
    width: 200,
    height: 200,
    color: null,
    colorBackground: "#FFF",
    colorCore: defaultColor,
    colorOrbit: "#929292",
    colorSatellite: "#5a5a5a",
    visibleSatellites: true,
    isRotating: false,
    isSpinning: false,
    isDevMode: false
  };

  constructor(props) {
    super(props);
    this.state = {
      ...props
    };

    if (props.color) {
      this.state = {
        ...this.state,
        colorCore: props.color,
        colorOrbit: props.color,
        colorSatellite: props.color
      };
    }
  }

  render() {
    return <Scene {...this.state} />;
  }
}

export default Logo;

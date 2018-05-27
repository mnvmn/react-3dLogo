import React, { Component } from "react";
import { render } from "react-dom";
import Logo from "../../src/index";

class Demo extends Component {
  render() {
    return (
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          color: "#54557d"
        }}
      >
        <h3>React Logo in 3D</h3>

        {/* <Logo />
        <Logo isSpinning/> */}
        <Logo isRotating isSpinning color="#b3b3b3"/>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));

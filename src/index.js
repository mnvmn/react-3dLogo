import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
// import * as dat from 'dat.gui';
import * as orbitControls from 'three-orbit-controls';
import Scene from './Scene';

class Logo extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    color: PropTypes.string,
    isRotating: PropTypes.bool,
    isReset: PropTypes.bool,
  };

  static defaultProps = {
    width: 200,
    height: 200,
    color: '#0475dc',
    isRotating: false,
    isReset: false
  };

  componentDidMount() {
    this.scene = Scene.init(this.props);
    this.el.appendChild(this.scene.renderer.domElement);
    // this.setUpDevTools();
    // this.enableInteractivity();
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.el.removeChild(this.scene.renderer.domElement);
  }

  setUpDevTools = () => {
    // const axesHelper = new THREE.AxesHelper(5);
    // this.scene.add(axesHelper);

    const gui = new dat.GUI();
    const { camera, neutron, circles } = this.scene;
    [camera, neutron, ...circles].forEach((el, index) => {
      const gui2 = gui.addFolder(`element${index}`);
      gui2.add(el.rotation, 'x', 0, Math.PI, 0.01);
      gui2.add(el.rotation, 'y', 0, Math.PI, 0.01);
      gui2.add(el.rotation, 'z', 0, Math.PI, 0.01);

      gui2.open();
    });
  };

  enableInteractivity = () => {
    const OrbitControls = orbitControls(THREE);
    const controls = new OrbitControls(this.scene.camera, this.el); // eslint-disable-line no-new
    controls.rotateSpeed = -1;
    controls.enableZoom = false;
  };

  animate = () => {
    this.scene.renderFrame();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  start = () => {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    window.cancelAnimationFrame(this.frameId);
  };

  render() {
    return (
      <div
        className="animation"
        style={{ width: `${this.props.width}px`, height: `${this.props.height}px` }}
        ref={(el) => {
          this.el = el;
        }}
      />
    );
  }
}

export default Logo;

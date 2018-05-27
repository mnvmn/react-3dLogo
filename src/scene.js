import React, { Component } from "react";
import * as THREE from "three";
import Player from "./player";


export default class Scene extends Player {

  init() {
    this.setUpScene();
    this.setUpGeometry();
    this.setUpDefaultPositions();
  }

  setUpGeometry() {
    var matSatellite = new THREE.MeshBasicMaterial({
      color: this.props.colorSatellite
    });
    const matOrbit = new THREE.LineBasicMaterial({
      color: this.props.colorOrbit,
      linewidth: 1
    });
    const matCore = new THREE.LineBasicMaterial({
      color: this.props.colorCore,
      linewidth: 1
    });

    this.satellites = [];
    this.circles = [];

    for (var i = 0; i < 3; i++) {
      const satellite = new THREE.SphereGeometry(1, 8, 8);
      const circle = new THREE.CircleGeometry(30, 32);

      this.satellites.push(new THREE.Mesh(satellite, matSatellite));

      this.circles.push(
        new THREE.LineSegments(new THREE.EdgesGeometry(circle), matOrbit)
      );
    }

    this.orbits = this.circles.map((c, index) => {
      const orbit = new THREE.Group();
      orbit.add(c);
      orbit.add(this.satellites[index]);
      return orbit;
    });

    this.sphere = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.SphereGeometry(5, 9, 9)),
      matCore
    );

    this.orbitsGroup = new THREE.Group();
    this.orbits.forEach((orb, index) => {
      this.orbitsGroup.add(orb);
    });

    this.neutron = new THREE.Group();
    this.neutron.add(this.sphere);
    this.neutron.add(this.orbitsGroup);
    this.scene.add(this.neutron);

    [this.neutron].forEach(el => {
      this.scene.add(el);
    });
  }

  setUpScene() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(this.props.colorBackground);
    this.renderer.setSize(this.props.width, this.props.height);

    this.camera = new THREE.PerspectiveCamera(
      40,
      this.props.width / this.props.height,
      0.1,
      1000
    );
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 90;
  }

  setUpDefaultPositions() {
    if(this.props.visibleSatellites){
      this.satellites[0].position.set(30, 0, 0);
      this.satellites[1].position.set(30, 0, 0);
      this.satellites[2].position.set(30, 0, 0);
    } else {
      this.satellites.forEach(s => {
        s.visible = false;
      });
    }

    this.orbits[0].rotation.x = 16 * Math.PI / 28;
    this.orbits[1].rotation.x = 4 * Math.PI / 11;
    this.orbits[1].rotation.y = 4 * Math.PI / 12;
    this.orbits[2].rotation.x = Math.PI / 3;
    this.orbits[2].rotation.y = 4 * Math.PI / 6;

    let defaultRotation = 0;
    this.orbits.forEach(o => {
      defaultRotation += 2 * Math.PI / 3;
      o.rotation.z = defaultRotation;
    });
  }

  animateObjects() {
    if (this.props.isSpinning) {
      this.neutron.rotation.y += 0.005;
    }
    if (this.props.isRotating) {
      this.orbits.forEach(o => {
        o.rotation.z += -0.01;
      });
    }
  }
};

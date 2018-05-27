import * as THREE from "three";

const Scene = {
  init(params) {
    this.params = params;
    this.setUpScene();
    this.setUpGeometry();
    this.setUpDefaultPositions();
    return this;
  },
  setUpGeometry() {
    var matSatellite = new THREE.MeshBasicMaterial({
      color: this.params.colorSatellite
    });
    const matOrbit = new THREE.LineBasicMaterial({
      color: this.params.colorOrbit,
      linewidth: 1
    });
    const matCore = new THREE.LineBasicMaterial({
      color: this.params.colorCore,
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
  },
  setUpScene() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(this.params.colorBackground);
    this.renderer.setSize(this.params.width, this.params.height);

    this.camera = new THREE.PerspectiveCamera(
      40,
      this.params.width / this.params.height,
      0.1,
      1000
    );
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 90;
  },
  setUpDefaultPositions() {
    if(this.params.visibleSatellites){
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
  },
  animate() {
    if (this.params.isSpinning) {
      this.neutron.rotation.y += 0.005;
    }
    if (this.params.isRotating) {
      this.orbits.forEach(o => {
        o.rotation.z += -0.01;
      });
    }
  },
  renderFrame() {
    this.animate();
    this.renderer.render(this.scene, this.camera);
  }
};

export default Scene;

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
    const matWire = new THREE.LineBasicMaterial({
      color: this.params.color,
      linewidth: 1
    });
    const circle = new THREE.CircleGeometry(30, 32);
    this.circles = [
      new THREE.LineSegments(new THREE.EdgesGeometry(circle), matWire),
      new THREE.LineSegments(new THREE.EdgesGeometry(circle.clone()), matWire),
      new THREE.LineSegments(new THREE.EdgesGeometry(circle.clone()), matWire)
    ];

    this.sphere = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.SphereGeometry(5, 9, 9)),
      matWire
    );

    this.orbits = new THREE.Group();
    this.orbits.add(this.circles[0]);
    this.orbits.add(this.circles[1]);
    this.orbits.add(this.circles[2]);

    this.neutron = new THREE.Group();
    this.neutron.add(this.sphere);
    this.neutron.add(this.orbits);
    this.scene.add(this.neutron);

    [this.neutron].forEach(el => {
      this.scene.add(el);
    });
  },
  setUpScene() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#FFF");
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
    this.circles[1].rotation.y = Math.PI / 4;
    this.circles[1].rotation.x = Math.PI / 3;
    this.circles[2].rotation.y = Math.PI / 3 * 2; // eslint-disable-line no-mixed-operators

    this.orbits.rotation.x = Math.PI / 5 * 2; // eslint-disable-line no-mixed-operators
    this.orbits.rotation.y = Math.PI / 4;
    this.orbits.rotation.z = Math.PI / 5;
  },
  animate() {
    // this.sphere.rotation.y += 0.002;
    // this.neutron.rotation.x += 0.001;
    this.neutron.rotation.y += 0.005;

    if (this.params.isRotating) {
      this.circles[0].rotation.x += 0.02;
      this.circles[1].rotation.x += 0.02;
      this.circles[1].rotation.y += 0.02;
      this.circles[2].rotation.y += 0.02;
    }
    if (this.params.isReset) {
      this.setUpDefaultPositions();
    }
  },
  renderFrame() {
    this.animate();
    this.renderer.render(this.scene, this.camera);
  }
};

export default Scene;

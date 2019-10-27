import SPE from "shader-particle-engine";
import AFRAME from "aframe";
import { asset } from "../data/assets";

const THREE = AFRAME.THREE;

// Adds a smoke emitter.
AFRAME.registerComponent("smoke", {
  schema: {
    enabled: { type: "boolean", default: true },
    texture: { type: "asset", default: asset("smoke") }
  },
  init() {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(this.data.texture.getAttribute("src"));

    const emitter = new SPE.Emitter({
      maxAge: { value: 6000 },
      position: {
        value: new THREE.Vector3(0, 0, 0),
        spread: new THREE.Vector3(1, 0.5, 2)
      },
      size: {
        value: [10, 20],
        spread: [0, 1, 2]
      },
      acceleration: {
        value: new THREE.Vector3(0, 0, 0)
      },
      rotation: {
        axis: new THREE.Vector3(0, 1, 0),
        spread: new THREE.Vector3(0, 20, 0),
        angle: (100 * Math.PI) / 180
      },
      velocity: {
        value: new THREE.Vector3(0, 0.005, 0.0025),
        spread: new THREE.Vector3(0.0025, 0.001, 0.0025)
      },
      opacity: {
        value: [0.2, 0.5, 0]
      },
      color: {
        value: [new THREE.Color(0x333333), new THREE.Color(0x111111)],
        spread: [new THREE.Vector3(0.2, 0.1, 0.1), new THREE.Vector3(0, 0, 0)]
      },
      particleCount: 600
    });

    this.group = new SPE.Group({
      texture: {
        value: texture
      },
      blending: THREE.NormalBlending
    });
    this.group.mesh.position.x = -28;
    this.group.mesh.position.y = 4;
    this.group.addEmitter(emitter);

    if (this.data.enabled) {
      for (let i = 0; i < 6; i++) {
        this.group.tick(1000);
      }
    }

    this.el.setObject3D("smoke", this.group.mesh);
  },
  update() {
    this.data.enabled
      ? this.group.emitters[0].enable()
      : this.group.emitters[0].disable();
  },
  tick(t, dt) {
    if (this.data.enabled) {
      this.group.tick(dt);
    }
  },
  remove() {
    this.el.removeObject3D("smoke");
  }
});

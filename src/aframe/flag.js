import AFRAME from "aframe";
import { asset } from "../data/assets";

const THREE = AFRAME.THREE;

// Adds a flag to the entity.
AFRAME.registerComponent("flag", {
  schema: {
    logo: { type: "map", default: asset("kubernetes") }
  },
  init: function() {
    this.pole = new THREE.Mesh(
      new THREE.BoxBufferGeometry(0.1, 12, 0.1),
      new THREE.MeshBasicMaterial({ color: 0x8b4513 })
    );
    this.pole.position.set(-16, 12, 4);

    let loader = new THREE.TextureLoader();
    loader.load(this.data.logo.getAttribute("src"), texture => {
      const mat = this.flag.material;
      mat.color.set(0xffffff);
      mat.map = texture;
      mat.needsUpdate = true;
    });

    this.flag = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(4, 4),
      new THREE.MeshBasicMaterial({ color: 0x183648, side: THREE.DoubleSide })
    );

    this.flag.position.set(0, 4, 0);
    this.flag.geometry.translate(2, 0, 0); // change pivot
    this.flag.rotation.set(0, Math.PI, 0);
    this.pole.add(this.flag);

    this.el.setObject3D("flag", this.pole);
  },
  remove: function() {
    this.el.removeObject3D("flag");
  }
});

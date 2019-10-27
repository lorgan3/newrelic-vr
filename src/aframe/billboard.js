import AFRAME from "aframe";
const THREE = AFRAME.THREE;

// Billboard similar to https://github.com/blairmacintyre/aframe-look-at-billboard-component
AFRAME.registerComponent("billboard", {
  schema: {
    scale: { type: "number", default: -1 },
    lockX: { type: "boolean", default: false }
  },
  init: function() {
    this.vector = new THREE.Vector3();
  },
  tick: function(t) {
    let target = this.el.sceneEl.camera;
    let object3D = this.el.object3D;

    if (target) {
      target.getWorldPosition(this.vector);
      if (this.data.lockX === true) {
        this.vector.y = object3D.position.y;
      }
      object3D.lookAt(this.vector);

      if (this.data.scale > 0) {
        let scale =
          this.vector.subVectors(object3D.position, this.vector).length() /
          this.data.scale;
        object3D.scale.set(scale, scale, 1);
      }
    }
  }
});

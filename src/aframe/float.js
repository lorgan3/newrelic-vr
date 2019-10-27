import AFRAME from "aframe";

// Makes the element a floaty.
AFRAME.registerComponent("float", {
  schema: {
    amplitude: { type: "number", default: 2 },
    speed: { type: "number", default: 1 }
  },
  init: function() {
    this.offset = Math.random();
  },
  tick: function(t, dt) {
    let rotationTmp = this.rotationTmp || { x: 0, y: 0, z: 0 };
    let rotation = this.el.getAttribute("rotation");
    let a = Math.sin(this.offset + t / 1000) * this.data.amplitude;
    rotationTmp.x = a;
    rotationTmp.y = rotation.y;
    rotationTmp.z = a;
    this.el.setAttribute("rotation", rotationTmp);
  }
});

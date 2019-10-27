import AFRAME from "aframe";
const ANIME = AFRAME.ANIME;

// Moves the element to the position.
AFRAME.registerComponent("move-to", {
  schema: {
    to: { type: "vec3" },
    time: { type: "number", default: 1000 },
    doMove: { type: "boolean", default: true }
  },
  init: function() {
    if (this.data.doMove) {
      this.tween();
    }
  },
  update: function(oldData) {
    if (oldData.to !== this.data.to && this.data.doMove) {
      this.tween();
    }
  },
  tween: function() {
    ANIME({
      targets: this.el,
      translateX: [this.el.components.position.data.x, this.data.to.x],
      translateY: [this.el.components.position.data.y, this.data.to.y],
      translateZ: [this.el.components.position.data.z, this.data.to.z],
      easing: "easeOutQuad",
      duration: this.data.time,
      update: anim =>
        this.el.setAttribute("position", {
          x: anim.animations[0].currentValue,
          y: anim.animations[1].currentValue,
          z: anim.animations[2].currentValue
        })
    });
  }
});

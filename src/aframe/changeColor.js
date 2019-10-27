import AFRAME from "aframe";
const THREE = AFRAME.THREE;

// Change the color of a json model material to a different color.
AFRAME.registerComponent("change-color", {
  from: "",
  to: "",
  dependencies: ["gltf-model"],
  schema: {
    from: { type: "string" },
    to: { type: "color" }
  },
  init: function() {
    this.el.addEventListener("model-loaded", e => {
      if (e.target === this.el) {
        this.change(e.detail.model);
      }
    });
  },
  update: function() {
    this.change(this.el.components["gltf-model"].model);
  },
  change: function(model) {
    if (model !== null && model !== undefined) {
      const children =
        model.children[0] instanceof THREE.Group
          ? model.children[0].children
          : model.children;

      children
        .find(c => c.material.name === this.data.from)
        .material.color.setStyle(this.data.to);
    }
  }
});

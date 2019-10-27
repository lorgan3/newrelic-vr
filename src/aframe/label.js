import { wrapText } from "../data/utils";

export const WIDTH = 1024;
export const HEIGHT = 512;
export const LINE_HEIGHT = 80;
export const PADDING = 40;

const labelBase = {
  init: function() {
    this.canvas = document.createElement("canvas");
    this.canvas.imageSmoothingEnabled = false;
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;
    this.ctx = this.canvas.getContext("2d");

    const offscreen = document.createElement("canvas");
    offscreen.imageSmoothingEnabled = false;
    offscreen.width = WIDTH;
    offscreen.height = HEIGHT;
    this.bitmap = offscreen.getContext("2d");

    this.texture = new THREE.Texture(this.canvas);
    this.panel = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 1),
      new THREE.MeshBasicMaterial({
        depthTest: false,
        depthWrite: true,
        fog: false,
        opacity: 1,
        transparent: true,
        map: this.texture
      })
    );

    this.el.setObject3D("panel", this.panel);
  },
  commit: function(x, y) {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.ctx.drawImage(
      this.bitmap.canvas,
      0,
      0,
      x,
      y,
      (WIDTH - x) / 2,
      (HEIGHT - y) / 2,
      x,
      y
    );

    this.texture.needsUpdate = true;
  },
  remove() {
    this.el.removeObject3D("panel");
  }
};
export default labelBase;

// Draws generic panel
AFRAME.registerComponent("info-label", {
  ...labelBase,
  schema: {
    label: { type: "string" }
  },
  update: function() {
    this.bitmap.clearRect(0, 0, WIDTH, HEIGHT);
    this.bitmap.fillStyle = "rgba(50, 50, 50, 0.6)";
    this.bitmap.fillRect(0, 0, WIDTH, HEIGHT);
    this.bitmap.font = "Bold 80px Helvetica";

    this.bitmap.fillStyle = "#fff";
    const { x, y } = wrapText(
      this.bitmap,
      this.data.label,
      PADDING,
      LINE_HEIGHT + PADDING / 2,
      WIDTH - PADDING * 2,
      LINE_HEIGHT
    );

    this.commit(x + PADDING, y + PADDING);
  }
});

AFRAME.registerPrimitive("info-label", {
  defaultComponents: {
    "info-label": {},
    billboard: {}
  },
  mappings: {
    label: "info-label.label",
    "billboard-scale": "billboard.scale"
  }
});

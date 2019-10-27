import { wrapText } from "../data/utils";
import labelBase, { PADDING, LINE_HEIGHT, WIDTH, HEIGHT } from "./label";

// Draws a panel for a node.
AFRAME.registerComponent("node-info", {
  ...labelBase,
  schema: {
    name: { type: "string" },
    pods: { type: "string" }
  },
  update: function() {
    this.bitmap.clearRect(0, 0, WIDTH, HEIGHT);
    this.bitmap.fillStyle = "rgba(50, 50, 50, 0.6)";
    this.bitmap.fillRect(0, 0, WIDTH, HEIGHT);
    this.bitmap.font = "Bold 80px Helvetica";

    this.bitmap.fillStyle = "#fff";
    const nameCoords = wrapText(
      this.bitmap,
      this.data.name,
      PADDING,
      LINE_HEIGHT + PADDING / 2,
      WIDTH - PADDING * 2,
      LINE_HEIGHT
    );

    this.bitmap.font = "Bold 72px Helvetica";
    const podCoords = wrapText(
      this.bitmap,
      this.data.pods,
      PADDING,
      LINE_HEIGHT + nameCoords.y,
      WIDTH - PADDING * 2,
      LINE_HEIGHT
    );

    const x = Math.max(nameCoords.x, podCoords.x) + PADDING;
    const y = podCoords.y + PADDING;

    this.commit(x, y);
  }
});

AFRAME.registerPrimitive("node-info", {
  defaultComponents: {
    "node-info": {},
    billboard: {}
  },
  mappings: {
    name: "node-info.name",
    pods: "node-info.pods",
    "billboard-scale": "billboard.scale"
  }
});

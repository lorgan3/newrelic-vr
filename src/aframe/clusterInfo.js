import { wrapText } from "../data/utils";
import labelBase, { PADDING, LINE_HEIGHT, WIDTH, HEIGHT } from "./label";

// Draws a panel for a cluster.
AFRAME.registerComponent("cluster-info", {
  ...labelBase,
  schema: {
    name: { type: "string" },
    nodes: { type: "string" },
    pods: { type: "string" },
    warnings: { type: "string" },
    errors: { type: "string" }
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
    const nodeCoords = wrapText(
      this.bitmap,
      this.data.nodes,
      PADDING,
      LINE_HEIGHT + nameCoords.y,
      WIDTH - PADDING * 2,
      LINE_HEIGHT
    );

    const podCoords = wrapText(
      this.bitmap,
      this.data.pods,
      PADDING,
      LINE_HEIGHT + nodeCoords.y,
      WIDTH - PADDING * 2,
      LINE_HEIGHT
    );

    this.bitmap.fillStyle = "#ffd966";
    const warningCoords = wrapText(
      this.bitmap,
      this.data.warnings,
      PADDING,
      LINE_HEIGHT + podCoords.y,
      WIDTH - PADDING * 2,
      LINE_HEIGHT
    );

    this.bitmap.fillStyle = "#ff667a";
    const criticalCoords = wrapText(
      this.bitmap,
      this.data.errors,
      warningCoords.x,
      LINE_HEIGHT + podCoords.y,
      WIDTH - PADDING * 2,
      LINE_HEIGHT
    );

    this.bitmap.fillStyle = "#fff";
    const violationCoords = wrapText(
      this.bitmap,
      " violations",
      criticalCoords.x,
      LINE_HEIGHT + podCoords.y,
      WIDTH - PADDING * 2,
      LINE_HEIGHT
    );

    const x =
      Math.max(nameCoords.x, nodeCoords.x, podCoords.x, violationCoords.x) +
      PADDING;
    const y = violationCoords.y + PADDING;

    this.commit(x, y);
  }
});

AFRAME.registerPrimitive("cluster-info", {
  defaultComponents: {
    "cluster-info": {},
    billboard: {}
  },
  mappings: {
    name: "cluster-info.name",
    nodes: "cluster-info.nodes",
    pods: "cluster-info.pods",
    warnings: "cluster-info.warnings",
    errors: "cluster-info.errors",
    "billboard-scale": "billboard.scale"
  }
});

import AFRAME from "aframe";
const THREE = AFRAME.THREE;

export const teleportTo = (target, camera, distance, height) => {
  let pos = new THREE.Vector3();
  let dir = new THREE.Vector3();
  target.updateMatrixWorld();
  pos.setFromMatrixPosition(target.matrixWorld);

  dir.subVectors(pos, camera.position);
  dir.y = 0;
  dir.normalize().multiplyScalar(distance);

  pos.x -= dir.x;
  pos.y += height;
  pos.z -= dir.z;

  return { x: pos.x, y: pos.y, z: pos.z };
};

/**
 * Draws text on the canvas and splits it if it's too wide.
 * @param {*} ctx The context
 * @param {*} text The text to draw
 * @param {*} x x
 * @param {*} y y
 * @param {*} maxWidth The max width
 * @param {*} lineHeight The line height of the font
 */
export function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  let parts = text.split(/([\_ -\.\/])/);
  let line = "";
  let realWidth = 0;
  for (let part of parts) {
    const width = ctx.measureText(line + part).width;
    if (width > maxWidth) {
      ctx.fillText(line, x, y);
      line = part;
      y += lineHeight;
    } else {
      line += part;
      realWidth = Math.max(realWidth, width);
    }
  }

  if (line !== "") {
    ctx.fillText(line, x, y);
  }

  return { x: realWidth + x, y };
}

/**
 * @param {String} str The string to convert to a number.
 */
export function hash(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

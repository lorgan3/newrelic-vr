import smoke from "../assets/smoke.png";
import kubernetes from "../assets/kubernetes.png";
import tux from "../assets/tux.png";
import octocat from "../assets/octocat.png";

export const ASSETS = {
  boat: "./models/boat.gltf",
  container: "./models/container.gltf",
  pod: "./models/pod.gltf",
  rowboat: "./models/rowboat.gltf",

  tux,
  smoke,
  kubernetes,
  octocat
};

export const asset = asset => {
  if (ASSETS[asset] === undefined) {
    throw new Error("Referencing non existing asset");
  }

  return `#${asset}`;
  //   return ASSETS[asset];
};

export const getImages = () =>
  Object.keys(ASSETS)
    .filter(asset => !!ASSETS[asset].endsWith(".png"))
    .map(asset => ({ asset, path: ASSETS[asset] }));

export const getAssets = () =>
  Object.keys(ASSETS)
    .filter(asset => !ASSETS[asset].endsWith(".png"))
    .map(asset => ({ asset, path: ASSETS[asset] }));

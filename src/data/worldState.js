import Vuex, { Store } from "vuex";

import { teleportTo } from "./utils";
import api from "./api";

import Vue from "vue";
Vue.use(Vuex);

const state = {
  camera: null,
  cameraPosition: "",
  cameraTarget: null,
  cameraTargetType: "",
  clusters: [],
  clusterPanel: {
    visible: false,
    position: "",
    name: "",
    nodes: "",
    pods: "",
    errors: "",
    warnings: ""
  },
  nodePanel: {
    visible: false,
    position: "",
    name: "",
    pods: ""
  },
  infoPanel: {
    visible: false,
    position: "",
    text: ""
  }
};

const mutations = {
  moveCamera(state, { target, distance, height, type }) {
    const { x, y, z } = teleportTo(
      target,
      state.camera,
      distance * (state.cameraTarget === target ? -1 : 1),
      height
    );
    state.cameraPosition = `${x} ${y} ${z}`;
    state.cameraTarget = target;
    state.cameraTargetType = type;
  },
  setCamera(state, camera) {
    state.camera = camera;
  },
  setClusters(state, clusters) {
    state.clusters = clusters;
  },
  labelCluster(state, { cluster, target }) {
    if (target && cluster) {
      hidePanels(state);

      state.clusterPanel.visible = true;
      state.clusterPanel.name = `SS ${cluster.name
        .split(/[\_ -\.\/]/)
        .map(part => part[0].toUpperCase() + part.slice(1))
        .join(" ")}`;
      state.clusterPanel.nodes = `${cluster.nodes.length} nodes`;
      state.clusterPanel.pods = `${cluster.pods} ${
        cluster.pendingPods ? `(+${cluster.pendingPods})` : ""
      } pods`;
      state.clusterPanel.warnings = `${cluster.warningCount} `;
      state.clusterPanel.errors = `${cluster.criticalCount}`;

      const vector = new THREE.Vector3();
      target.updateMatrixWorld();
      vector.setFromMatrixPosition(target.matrixWorld);
      vector.add(new THREE.Vector3(0, 3, 0));
      state.clusterPanel.position = vector;
    } else {
      state.clusterPanel.visible = false;
    }
  },
  labelNode(state, { node, target }) {
    if (target && node) {
      hidePanels(state);

      state.nodePanel.visible = true;
      state.nodePanel.name = node.name;
      state.nodePanel.pods = `${node.pods} pods`;

      const vector = new THREE.Vector3();
      target.updateMatrixWorld();
      vector.setFromMatrixPosition(target.matrixWorld);
      vector.add(new THREE.Vector3(0, 3, 0));
      state.nodePanel.position = vector;
    } else {
      state.nodePanel.visible = false;
    }
  },
  labelInfo(state, { text, target }) {
    if (target && text) {
      hidePanels(state);

      state.infoPanel.visible = true;
      state.infoPanel.text = text;

      const vector = new THREE.Vector3();
      target.updateMatrixWorld();
      vector.setFromMatrixPosition(target.matrixWorld);
      vector.add(new THREE.Vector3(0, 3, 0));
      state.infoPanel.position = vector;
    } else {
      state.infoPanel.visible = false;
    }
  }
};

const hidePanels = state => {
  state.clusterPanel.visible = false;
  state.nodePanel.visible = false;
  state.infoPanel.visible = false;
};

const actions = {
  /**
   * Moves the camera
   * @param {Object3D} payload.target The target to move to.
   * @param {number} payload.distance The distance from the target.
   * @param {number=} payload.height The height of the camera.
   */
  moveCamera({ commit }, payload) {
    commit("moveCamera", payload);
  },
  setCamera({ commit }, camera) {
    commit("setCamera", camera);
  },
  async loadClusters({ commit, dispatch }) {
    const clusters = await api.getClusters();
    dispatch("setClusters", clusters);
  },
  setClusters({ commit }, clusters) {
    commit("setClusters", clusters);
  },
  /**
   * display the label for a cluster
   * @param {*} payload.cluster The cluster to label
   * @param {*} payload.target The cluster object3D
   */
  labelCluster({ commit }, payload) {
    commit("labelCluster", payload);
  },
  /**
   * display the label for a node
   * @param {*} payload.node The node to label
   * @param {*} payload.target The node object3D
   */
  labelNode({ commit }, payload) {
    commit("labelNode", payload);
  },
  /**
   * Display an info label
   * @param {*} payload.text The text to display
   * @param {*} payload.target The source object3D
   */
  labelInfo({ commit }, payload) {
    commit("labelInfo", payload);
  }
};

export const store = new Store({
  state,
  mutations,
  actions
});

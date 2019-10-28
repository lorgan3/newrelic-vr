<template>
  <a-scene>
    <Assets :on-load="onLoad" />

    <World v-if="loaded" />

    <a-entity class="camera-holder">
      <a-camera
        ref="camera"
        user-height="0"
        position="0 3 0"
        :move-to="`to: ${cameraPosition}; doMove: ${!!cameraPosition}`"
      >
        <a-cursor raycaster="objects: .clickable" fuse-timeout="2000">
          <a-animation
            begin="click"
            easing="ease-in"
            attribute="scale"
            dur="150"
            fill="forwards"
            from="0.1 0.1 0.1"
            to="1 1 1"
          />
          <a-animation begin="click" attribute="material.color" from="red" to="black" dur="0" />
          <a-animation
            begin="cursor-fusing"
            easing="ease-in"
            attribute="scale"
            dur="2000"
            fill="backwards"
            from="1 1 1"
            to="0.1 0.1 001"
          />
          <a-animation
            begin="cursor-fusing"
            attribute="material.color"
            from="black"
            to="red"
            dur="2000"
          />
        </a-cursor>
      </a-camera>
    </a-entity>

    <cluster-info
      v-if="clusterPanel.visible"
      :position="clusterPanel.position"
      :name="clusterPanel.name"
      :nodes="clusterPanel.nodes"
      :pods="clusterPanel.pods"
      :errors="clusterPanel.errors"
      :warnings="clusterPanel.warnings"
      billboard-scale="3"
    />
    <node-info
      v-if="nodePanel.visible"
      :position="nodePanel.position"
      :name="nodePanel.name"
      :pods="nodePanel.pods"
      billboard-scale="3"
    />
    <info-label
      v-if="infoPanel.visible"
      :position="infoPanel.position"
      :label="infoPanel.text"
      billboard-scale="3"
    />

    <a-simple-sun-sky sun-position="-5 5 -10" radius="120" />
    <a-light type="ambient" color="#888" />
    <a-light type="directional" position="-5 5 -10" intensity="0.7" />
  </a-scene>
</template>


<script>
// Aframe & components / primitives
import "aframe";
import "./aframe/billboard";
import "./aframe/changeColor";
import "./aframe/flag";
import "./aframe/float";
import "./aframe/moveTo";
import "./aframe/label";
import "./aframe/nodeInfo";
import "./aframe/clusterInfo";
import "./aframe/smoke";
import "aframe-simple-sun-sky";

// Global state
import { mapActions, mapState } from "vuex";
import { store } from "./data/worldState";

// Components
import Assets from "./components/Assets";
import World from "./components/World";

export default {
  name: "App",
  components: {
    Assets,
    World
  },
  data() {
    return {
      loaded: false
    };
  },
  computed: mapState([
    "cameraPosition",
    "clusterPanel",
    "nodePanel",
    "infoPanel"
  ]),
  methods: {
    ...mapActions(["setCamera"]),
    onLoad() {
      this.loaded = true;
      this.setCamera(this.$refs.camera.object3D);
    }
  },
  store
};
</script>

<style>
.a-enter-vr {
  display: none;
}
</style>
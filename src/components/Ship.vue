<template>
  <a-entity
    :gltf-model="model"
    :position="position"
    :rotation="rotation"
    class="clickable"
    float
    flag
    :smoke="`enabled: ${cluster.criticalCount > 1 ? true : false};`"
    @click="onClick"
    @mouseenter="onHover"
  >
    <Container
      v-for="(node, index) in cluster.nodes"
      :key="index"
      :position="getPosition(index)"
      :rotation="getRotation(index)"
      :node="node"
    />
  </a-entity>
</template>

<script>
import { asset } from "../data/assets";
import Container from "./Container";
import { mapActions, mapState } from "vuex";

// Spots on the boat where a container can be placed.
const CONTAINER_POSITIONS = [
  { x: -8, z: -2.4 },
  { x: 0.8, z: -2.4 },
  { x: 9.6, z: -2.4 },
  { x: 18.4, z: -2.4 },
  { x: -8, z: 2.4 },
  { x: 0.8, z: 2.4 },
  { x: 9.6, z: 2.4 },
  { x: 18.4, z: 2.4 },
  { x: -24, z: -2.4 },
  { x: -24, z: 2.4 }
];

export default {
  name: "Ship",
  components: {
    Container
  },
  props: {
    cluster: { type: Object, default: null },
    position: { type: String, default: undefined },
    rotation: { type: String, default: undefined }
  },
  data() {
    return {
      model: asset("boat")
    };
  },
  computed: mapState(["cameraTarget", "cameraTargetType"]),
  methods: {
    ...mapActions(["moveCamera", "labelCluster"]),
    getPosition(i) {
      const { x, z } = CONTAINER_POSITIONS[i % CONTAINER_POSITIONS.length];
      const y = Math.floor(i / CONTAINER_POSITIONS.length) * 4 + 3.4;

      return `${x + Math.random() * 0.5 - 0.25} ${y} ${z +
        Math.random() * 0.5 -
        0.25}`;
    },
    getRotation(i) {
      const y = Math.random() * 8 - 4;
      return `${0} ${y} ${0}`;
    },
    onClick(e) {
      // Do not move when clicking a container on the ship that was already selected.
      if (this.cameraTarget !== this.$el.object3D || e.path[1] !== this.$el)
        this.moveCamera({
          target: this.$el.object3D,
          distance: 15,
          height: 6,
          type: "ship"
        });
    },
    onHover() {
      if (this.cameraTarget !== this.$el.object3D) {
        this.labelCluster({ target: this.$el.object3D, cluster: this.cluster });
      }
    }
  }
};
</script>

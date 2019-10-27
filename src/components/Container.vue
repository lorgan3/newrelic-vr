<template>
  <a-entity
    :gltf-model="model"
    :position="position"
    :rotation="rotation"
    :change-color="`from: Red; to: ${color}`"
    class="clickable"
    @mouseenter="onHover"
  />
</template>

<script>
import { asset } from "../data/assets";
import { hash } from "../data/utils";
import { mapActions, mapState } from "vuex";

const CONTAINER_COLORS = [
  "#E6303C",
  "#3266C9",
  "#EAF2F5",
  "#54B5BB",
  "#637627",
  "#F6B966",
  "#89646B"
];

export default {
  name: "Container",
  components: {},
  props: {
    node: { type: Object, default: null },
    position: { type: String, default: undefined },
    rotation: { type: String, default: undefined }
  },
  data() {
    return {
      model: asset("container")
    };
  },
  computed: {
    ...mapState(["cameraTargetType"]),
    color() {
      return CONTAINER_COLORS[
        Math.abs(hash(this.node.name)) % CONTAINER_COLORS.length
      ];
    }
  },
  methods: {
    ...mapActions(["labelNode"]),
    onHover() {
      if (this.cameraTargetType === "ship") {
        this.labelNode({ target: this.$el.object3D, node: this.node });
      }
    }
  }
};
</script>

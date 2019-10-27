<template>
  <a-entity>
    <a-ocean width="240" depth="240" density="32" position="0 -1 0" opacity="1" />
    <a-entity>
      <a-entity
        ref="tux"
        :gltf-model="model"
        position="0 -1 -3"
        class="clickable"
        @click="onTuxClick"
        @mouseenter="onTuxHover"
      />
      <a-entity
        position="0 1.2 -3"
        geometry="primitive: plane; width: 2; height: 4;"
        :material="`shader: flat; transparent: true; side: double; src: ${tux} ; depthWrite: false;`"
        billboard="lockX: true"
      />
    </a-entity>

    <a-entity>
      <a-entity
        ref="git"
        :gltf-model="model"
        position="10 -1 -10"
        rotation="0 30 0"
        class="clickable"
        @click="onGitClick"
        @mouseenter="onGitHover"
      />
      <a-entity
        position="10 0 -10"
        geometry="primitive: plane; width: 2; height: 2;"
        :material="`shader: flat; transparent: true; side: double; src: ${octocat} ; depthWrite: false;`"
        billboard="lockX: true"
      />
    </a-entity>

    <Ship
      v-for="(cluster, index) in clusters"
      :key="index"
      :cluster="cluster"
      :position="getPosition(index)"
      :rotation="getRotation(index)"
    />
  </a-entity>
</template>


<script>
import "aframe-extras";

import { asset } from "../data/assets";
import Ship from "./Ship";
import { mockApi as api } from "../data/api";
import { mapActions } from "vuex";

export default {
  name: "World",
  components: {
    Ship
  },
  props: {},
  data() {
    return {
      model: asset("rowboat"),
      tux: asset("tux"),
      octocat: asset("octocat"),
      loading: false,
      clusters: []
    };
  },
  async created() {
    this.loading = true;
    this.clusters = await api.getClusters();
  },
  methods: {
    ...mapActions(["moveCamera", "labelInfo"]),
    getPosition(i) {
      const x = 50 * Math.sin((Math.PI * i * 2) / this.clusters.length);
      const z = 50 * Math.cos((Math.PI * i * 2) / this.clusters.length);
      return `${x} ${0} ${z}`;
    },
    getRotation(i) {
      const y = (180 * i * 2) / this.clusters.length + Math.random() * 40 - 20;
      return `${0} ${y} ${0}`;
    },
    onTuxClick() {
      this.moveCamera({
        target: this.$refs.tux.object3D,
        distance: 3,
        height: 3,
        type: "tux"
      });
    },
    onGitClick() {
      window.open("https://github.com/lorgan3/coscale-vr", "_blank");
    },
    onGitHover() {
      this.labelInfo({ text: "Visit GitHub", target: this.$refs.git.object3D });
    },
    onTuxHover() {
      this.labelInfo({
        text: "Back to center",
        target: this.$refs.tux.object3D
      });
    }
  }
};
</script>

<template>
  <a-assets @loaded="loadCallback">
    <a-asset-item v-for="asset in assets" :id="asset.asset" :key="asset.asset" :src="asset.path" />
    <img v-for="image in images" :id="image.asset" :key="image.asset" :src="image.path" />
  </a-assets>
</template>

<script>
import { getAssets, getImages } from "../data/assets";
import tux from "../assets/tux.png";

export default {
  name: "Assets",
  props: {
    onLoad: {
      type: Function,
      default: () => undefined
    }
  },
  data: function() {
    return {
      assets: getAssets(),
      images: getImages()
    };
  },
  methods: {
    loadCallback: function(event) {
      console.log("assets loaded");
      this.onLoad();
    }
  }
};
</script>

import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// Ignore aframe elements.
Vue.config.ignoredElements = [/^a-/, "cluster-info", "node-info", "info-label"];

new Vue({
  render: h => h(App)
}).$mount("#app");

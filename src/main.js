import Vue from "vue";
import App from "./App.vue";

import Clipboard from "./clipboard.js";

Vue.use(Clipboard);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

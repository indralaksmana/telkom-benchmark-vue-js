import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import store from "./store";
import {Tabs, Tab} from 'vue-tabs-component';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
Vue.prototype.$http.defaults.headers.common["Authorization"] = "Bearer " + store.state.token;
Vue.prototype.$http.defaults.headers.common["Database"] = "mysql";
Vue.component('tabs', Tabs);
Vue.component('tab', Tab);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

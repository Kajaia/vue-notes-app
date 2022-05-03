import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "sweetalert2/dist/sweetalert2.min.css";

createApp(App).use(router).use(store).mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/fontawesome-free/js/all.min.js";
import "sweetalert2/dist/sweetalert2.min.css";

createApp(App).use(router).use(store).mount("#app");

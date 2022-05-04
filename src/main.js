import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/style.css";
import "sweetalert2/dist/sweetalert2.min.css";

createApp(App).use(router).use(store).mount("#app");

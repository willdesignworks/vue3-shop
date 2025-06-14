import { createApp } from "vue";
// bootstrap v5
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// css
import "./assets/css/plugins.css";
import "./assets/css/shortcode/shortcodes.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "./assets/css/custom.css";
// css
import "./assets/css/style_will.css";

import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router"; // router 路由

const app = createApp(App);
app.use(createPinia()); // Pinia 狀態管理器
app.use(router); // router 路由
app.mount("#app");

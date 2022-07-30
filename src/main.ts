import { createApp } from "vue";
import "./style.css";
import "./assets/icon-fa/css/all.css";
import App from "./App.vue";
import { router } from "./router";
// import "../NeteaseCloudMusicApi/app.js";

const app = createApp(App);
app.use(router);
app.mount("#app");

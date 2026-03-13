import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import "remixicon/fonts/remixicon.css";
import router from "@/router/index.js";
import { loadTheme } from "@/composables/useTheme.js";

import App from "./App.vue";

loadTheme();

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");

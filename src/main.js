import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import "remixicon/fonts/remixicon.css";
import router from "@/router/index.js";
import { loadTheme } from "@/composables/useTheme.js";
import { useProfileStore } from "@/stores/useProfileStore.js";
import App from "./App.vue";

loadTheme();

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const profile = useProfileStore();
await profile.loadProfile();

app.mount("#app");

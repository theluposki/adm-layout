import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    command === 'serve' && basicSsl(), // ✅ só no dev, nunca no build
  ],
  base: '/adm-layout/',
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    https: true,
  },
}));

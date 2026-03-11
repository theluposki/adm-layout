import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { VitePWA } from "vite-plugin-pwa";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    command === 'serve' && basicSsl(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo-192x192.png', 'logo-512x512.png'],
      manifest: {
        name: 'ADM Layout',
        short_name: 'ADM',
        description: 'Painel administrativo',
        theme_color: '#212121',
        background_color: '#111111',
        display: 'standalone',
        scope: '/adm-layout/',
        start_url: '/adm-layout/',
        icons: [
          {
            src: 'logo-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  base: '/adm-layout/',
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version)
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: { https: true },
}));

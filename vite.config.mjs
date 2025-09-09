// vite.config.mjs
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/RoR-Web-site/",   // ← リポ名に合わせる（大文字小文字も）
  build: { outDir: "docs" },// ← docs公開方式なら
  plugins: [vue()],
});
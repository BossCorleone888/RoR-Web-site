import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/RoR-Web-site/",       // ← リポ名に合わせる（大小文字も厳密）
  build: { outDir: "docs" },    // ← ここがポイント
  plugins: [vue()],
});

// vite.config.mjs
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/RoR-Web-site/",
  build: {
    outDir: "docs",
    // ⚠️ これを追加
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ["vue"],
          firebase: ["firebase/app", "firebase/firestore", "firebase/auth"],
          markdown: ["markdown-it"],
        },
      },
    },
    // （警告のしきい値を上げるなら）
    chunkSizeWarningLimit: 1200,
  },
  plugins: [vue()],
});

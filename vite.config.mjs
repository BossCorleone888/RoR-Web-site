// vite.config.mjs
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// ⚠ リポジトリ名の大文字小文字は厳密一致
const GHP_BASE = "/RoR-Web-site/"

export default defineConfig({
  base: GHP_BASE,
  plugins: [vue()],
  build: {
    outDir: "docs",
    emptyOutDir: true,
    sourcemap: true,                 // デバッグしやすく
    chunkSizeWarningLimit: 1200,     // しきい値UP
    rollupOptions: {
      output: {
        // ファイル名を安定＆キャッシュ効く形に
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        // 依存ごとに“ゆるく”振り分け（将来の追加にも強い）
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("/vue")) return "vue"
            if (id.includes("/firebase/")) return "firebase"
            if (id.includes("markdown-it")) return "markdown"
            return "vendor"
          }
        },
      },
    },
  },
})

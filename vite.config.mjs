// vite.config.mjs
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

const GHP_BASE = "/RoR-Web-site/"

export default defineConfig({
  base: GHP_BASE,
  plugins: [vue()],
  build: {
    outDir: "docs",
    emptyOutDir: true,
    sourcemap: true,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks(id) {
          if (!id.includes("node_modules")) return
          // あるときだけ分割（無ければ生成されないので“空チャンク”にならない）
          if (id.includes("/firebase/")) return "firebase"
          if (id.includes("markdown-it")) return "markdown"
          if (id.includes("/vue")) return "vue"         // ← これで十分
          return "vendor"
        },
      },
    },
  },
})

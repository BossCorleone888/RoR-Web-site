import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',            // ← ここがポイント（相対パスで出力）
  build: { outDir: 'docs' } // ← GitHub Pages の /docs 公開に合わせる
})

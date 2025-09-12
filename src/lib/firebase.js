// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

function showFatal(e) {
  const pre = document.createElement('pre')
  pre.style.cssText = 'white-space:pre-wrap;padding:16px;background:#fff;color:#c00;border:1px solid #f99;font-family:monospace'
  pre.textContent = '起動時エラー:\n' + (e?.stack || e)
  document.body.innerHTML = ''
  document.body.appendChild(pre)
}

try {
  const app = createApp(App)
  app.config.errorHandler = (err) => showFatal(err)
  window.addEventListener('error', (e) => showFatal(e.error || e.message))
  window.addEventListener('unhandledrejection', (e) => showFatal(e.reason))
  app.mount('#app')
} catch (e) {
  showFatal(e)
}

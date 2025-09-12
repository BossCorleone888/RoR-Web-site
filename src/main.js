// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

// src/main.js（先頭に追加）
(function debugBanner(){
  const div = document.createElement('div');
  div.style.cssText = 'position:fixed;z-index:99999;left:0;top:0;right:0;background:#111;color:#0f0;font:12px/1.4 monospace;padding:6px 8px';
  div.textContent = 'BOOTING... location='+location.href;
  document.addEventListener('DOMContentLoaded', ()=> document.body.appendChild(div));
})();

function showFatal(e){
  const pre = document.createElement('pre')
  pre.style.cssText='white-space:pre-wrap;padding:16px;background:#fff;color:#c00;border:1px solid #f99;font-family:monospace'
  pre.textContent='起動時エラー:\n'+(e?.stack||e)
  document.body.innerHTML=''; document.body.appendChild(pre)
}
try{
  const app = createApp(App)
  app.config.errorHandler = (err)=>showFatal(err)
  window.addEventListener('error', e=>showFatal(e.error||e.message))
  window.addEventListener('unhandledrejection', e=>showFatal(e.reason))
  app.mount('#app')
}catch(e){ showFatal(e) }

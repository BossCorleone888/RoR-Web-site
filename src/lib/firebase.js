// src/lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, serverTimestamp as ts } from 'firebase/firestore'
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
  signInAnonymously,
  onAuthStateChanged,
} from 'firebase/auth'

// ==========================================================
// Firebase 設定
// ==========================================================
const firebaseConfig = {
  apiKey:      import.meta.env.VITE_FB_API_KEY,
  authDomain:  import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId:   import.meta.env.VITE_FB_PROJECT_ID,
  appId:       import.meta.env.VITE_FB_APP_ID,
}

// 欠落チェック
const missing = Object.entries(firebaseConfig).filter(([, v]) => !v).map(([k]) => k)
if (missing.length) {
  const msg = `[firebaseConfig] missing keys: ${missing.join(', ')}`
  if (import.meta.env.DEV) {
    throw new Error(msg) // 開発時は強制エラー
  } else {
    console.error(msg)   // 本番は画面を止めない
  }
}

// ==========================================================
// Firebase 初期化（HMR / 多重初期化対策）
// ==========================================================
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export { ts }

// ==========================================================
// 匿名ログインを安全に確立
// ==========================================================
async function waitForAuthReady(timeoutMs = 1500) {
  if (auth.currentUser !== null) return auth.currentUser
  await new Promise((resol

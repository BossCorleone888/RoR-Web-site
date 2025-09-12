// src/lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
  signInAnonymously,
  onAuthStateChanged,
} from 'firebase/auth'

// ---- env から読む（.env.local / .env.production など）----
const ENV = {
  apiKey:     import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId:  import.meta.env.VITE_FB_PROJECT_ID,
  appId:      import.meta.env.VITE_FB_APP_ID,
}

// すべて揃っているか
const HAS_ALL = !!(ENV.apiKey && ENV.authDomain && ENV.projectId && ENV.appId)

let app = null, db = null, auth = null
if (HAS_ALL) {
  const cfg = ENV
  app = getApps().length ? getApp() : initializeApp(cfg)
  db = getFirestore(app)
  auth = getAuth(app)
} else {
  console.warn('[firebase] config missing. App runs WITHOUT Firebase (UIは表示されるよ)')
}

// 必ず存在するエクスポート（使う側は import { ts } from './lib/firebase' で ts() 呼び出し）
export const ts = serverTimestamp
export { db, auth }

// 匿名ログイン（Firebase未設定なら何もしない）
async function waitForAuthReady(timeoutMs = 1500) {
  if (!auth) return null
  if (auth.currentUser !== null) return auth.currentUser
  await new Promise((resolve) => {
    const off = onAuthStateChanged(auth, () => { off(); resolve() })
    setTimeout(() => { try { off() } catch {} ; resolve() }, timeoutMs)
  })
  return auth.currentUser
}

export async function ensureAnonLogin() {
  if (!auth) return null
  try {
    await setPersistence(auth, browserLocalPersistence)
  } catch {
    try { await setPersistence(auth, inMemoryPersistence) } catch {}
  }
  const ready = await waitForAuthReady()
  if (ready) return ready
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return null
  try { const cred = await signInAnonymously(auth); return cred.user }
  catch { return null }
}

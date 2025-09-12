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

// ===== 設定（.env / .env.production）=====
const ENV = {
  apiKey:     import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId:  import.meta.env.VITE_FB_PROJECT_ID,
  appId:      import.meta.env.VITE_FB_APP_ID,
}

// 本番で env が欠けたときの保険（値はあなたのものに差し替え推奨）
const FALLBACK_PROD = import.meta.env.PROD ? {
  // apiKey:     'AIzaSy.........',
  // authDomain: 'xxxx.firebaseapp.com',
  // projectId:  'xxxx',
  // appId:      '1:xxxx:web:yyyy',
} : {}

const firebaseConfig = {
  ...FALLBACK_PROD,
  ...Object.fromEntries(Object.entries(ENV).filter(([,v]) => v)),
}

// 欠落ログ（DEVは throw、PRODは console.error で止めない）
const missing = Object.entries(firebaseConfig).filter(([,v]) => !v).map(([k]) => k)
if (missing.length) {
  const msg = `[firebaseConfig] missing keys: ${missing.join(', ')}`
  if (import.meta.env.DEV) throw new Error(msg)
  console.error(msg)
}

// ===== 初期化 =====
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

// ★ ここが“export の定義”
export const db   = getFirestore(app)
export const auth = getAuth(app)
export const ts   = serverTimestamp // ← 使う側では ts() と呼べる

// ===== 匿名ログイン（失敗しても throw しない）=====
async function waitForAuthReady(timeoutMs = 1500) {
  if (auth.currentUser !== null) return auth.currentUser
  await new Promise((resolve) => {
    const off = onAuthStateChanged(auth, () => { off(); resolve() })
    setTimeout(() => { try { off() } catch {} ; resolve() }, timeoutMs)
  })
  return auth.currentUser
}

export async function ensureAnonLogin() {
  try {
    await setPersistence(auth, browserLocalPersistence)
  } catch (e) {
    try { await setPersistence(auth, inMemoryPersistence) }
    catch (e2) { console.error('[auth] setPersistence failed', e2?.code || e2) }
  }

  const ready = await waitForAuthReady()
  if (ready) return ready

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    console.warn('[auth] offline, skip signInAnonymously')
    return null
  }

  try {
    const cred = await signInAnonymously(auth)
    return cred.user
  } catch (e) {
    if (e?.code === 'auth/network-request-failed') {
      console.warn('[auth] network-request-failed, continue without auth'); return null
    }
    console.error('[auth] anonymous sign-in failed', e?.code, e?.message || e); return null
  }
}

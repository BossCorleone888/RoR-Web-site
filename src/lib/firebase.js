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

// src/lib/firebase.js の config 直後に一時追加（デプロイ前に消してOK）
console.log('[FB CFG]', {
  apiKey: !!import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  appId: import.meta.env.VITE_FB_APP_ID
}, 'PROD=', import.meta.env.PROD);

// 欠落チェック
const missing = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k)

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
  await new Promise((resolve) => {
    const off = onAuthStateChanged(auth, () => { off(); resolve() })
    setTimeout(() => {
      try { off() } catch {}
      resolve()
    }, timeoutMs)
  })
  return auth.currentUser
}

export async function ensureAnonLogin() {
  // 永続化（localStorage優先 → ダメなら inMemory）
  try {
    await setPersistence(auth, browserLocalPersistence)
  } catch (e) {
    console.warn('[auth] localPersistence NG → inMemory', e?.code || e)
    try {
      await setPersistence(auth, inMemoryPersistence)
    } catch (e2) {
      console.error('[auth] setPersistence failed', e2?.code || e2)
    }
  }

  const ready = await waitForAuthReady()
  if (ready) return ready

  // オフラインならサインインを諦める
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    console.warn('[auth] offline, skip signInAnonymously')
    return null
  }

  try {
    const cred = await signInAnonymously(auth)
    return cred.user
  } catch (e) {
    if (e?.code === 'auth/network-request-failed') {
      console.warn('[auth] network-request-failed, continue without auth')
      return null
    }
    console.error('[auth] anonymous sign-in failed', e?.code, e?.message || e)
    return null
  }
}

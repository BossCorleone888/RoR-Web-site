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

// ===== 設定読込（.env / .env.production）===================================
const firebaseConfig = {
  apiKey:      import.meta.env.VITE_FB_API_KEY,
  authDomain:  import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId:   import.meta.env.VITE_FB_PROJECT_ID,
  appId:       import.meta.env.VITE_FB_APP_ID,
}

// 欠落チェック：開発時は即座に気付けるよう throw、 本番は画面は生かして console.error
{
  const missing = Object.entries(firebaseConfig).filter(([, v]) => !v).map(([k]) => k)
  if (missing.length) {
    const msg = `[firebaseConfig] missing keys: ${missing.join(', ')}`
    if (import.meta.env.DEV) throw new Error(msg)
    else console.error(msg)
  }
}

// ===== アプリ初期化（HMR/多重初期化対策）=================================
const app  = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db   = getFirestore(app)
export const auth = getAuth(app)
// ts はそのまま re-export
export { ts }

// ===== ヘルパ：Auth 初期化待ち（最大 5s）==================================
async function waitForAuthReady(timeoutMs = 5000) {
  if (auth.currentUser !== null) return auth.currentUser // 既に判明(ユーザor未ログイン)
  await new Promise((resolve) => {
    const off = onAuthStateChanged(auth, () => { off(); resolve() })
    setTimeout(() => { try { off() } catch {} ; resolve() }, timeoutMs)
  })
  return auth.currentUser
}

// ===== 匿名ログイン（安全版）=============================================
// - 永続化は localStorage 優先、使えない環境では自動で inMemory にフォールバック
// - オフライン時はサインインをスキップ（戻り値 null）
// - 例外は“投げずに”コンソールに記録 → 画面は動かし続ける
export async function ensureAnonLogin() {
  // 永続化設定（localStorage が使えない/ブロックされている場合のフォールバック）
  try {
    await setPersistence(auth, browserLocalPersistence)
  } catch (e) {
    console.warn('[auth] browserLocalPersistence unavailable, fallback to inMemory.', e?.code || e)
    try { await setPersistence(auth, inMemoryPersistence) } catch (e2) {
      console.error('[auth] setPersistence failed.', e2?.code || e2)
    }
  }

  // 既に確立済みならそれを返す
  const ready = await waitForAuthReady(1500)
  if (ready) return ready

  // オフライン時は無理に通信しない
  if (typeof navigator !== 'undefined' && navigator && navigator.onLine === false) {
    console.warn('[auth] offline detected, skip signInAnonymously.')
    return null
  }

  try {
    const cred = await signInAnonymously(auth)
    return cred.user
  } catch (e) {
    // 代表的なネットワーク系は握りつぶして稼働継続
    if (e?.code === 'auth/network-request-failed') {
      console.warn('[auth] network-request-failed (offline or blocked). App continues without auth.')
      return null
    }
    console.error('[auth] anonymous sign-in failed:', e?.code, e?.message || e)
    return null
  }
}

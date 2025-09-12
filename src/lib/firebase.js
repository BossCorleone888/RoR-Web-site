// src/lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import {
  getAuth, setPersistence, browserLocalPersistence, inMemoryPersistence,
  signInAnonymously, onAuthStateChanged,
} from 'firebase/auth'

// ← ここからは .env 経由のみ
const firebaseConfig = {
  apiKey:     import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId:  import.meta.env.VITE_FB_PROJECT_ID,
  appId:      import.meta.env.VITE_FB_APP_ID,
}

const need = ['apiKey','authDomain','projectId','appId']
const missing = need.filter(k => !firebaseConfig[k])

let app=null, db=null, auth=null
if (missing.length === 0) {
  app  = getApps().length ? getApp() : initializeApp(firebaseConfig)
  db   = getFirestore(app)
  auth = getAuth(app)
} else {
  const msg = `[firebaseConfig] missing: ${missing.join(', ')}`
  if (import.meta.env.DEV) throw new Error(msg)   // 開発中は即わかるように落とす
  console.error(msg)                               // 本番はUIを生かす
}

// 使う側は ts() でOK
export const ts = serverTimestamp
export { db, auth }

// 匿名ログイン（未設定時は何もしない）
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
  try { await setPersistence(auth, browserLocalPersistence) }
  catch { try { await setPersistence(auth, inMemoryPersistence) } catch {} }

  const ready = await waitForAuthReady()
  if (ready) return ready
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return null
  try { const cred = await signInAnonymously(auth); return cred.user }
  catch (e) { if (e?.code !== 'auth/network-request-failed') console.error('[auth]', e?.code||e); return null }
}

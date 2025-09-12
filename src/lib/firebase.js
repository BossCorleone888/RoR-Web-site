// src/lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, serverTimestamp as ts } from 'firebase/firestore'
import { getAuth, setPersistence, browserLocalPersistence, signInAnonymously } from 'firebase/auth'

// ★ Vite 環境変数から読む（.env / .env.production に値を入れてある前提）
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
}

// 値チェック（ミスに早く気づく）
for (const [k, v] of Object.entries(firebaseConfig)) {
  if (!v) throw new Error(`[firebaseConfig] ${k} is missing`)
}

// 既存インスタンスの再利用（Vite HMR 対策）
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

// 🔹 ここを “named export” で揃える
export const db   = getFirestore(app)
export const auth = getAuth(app)
export { ts }

// 匿名ログインを確立して返す（エラー内容も出す）
export async function ensureAnonLogin() {
  await setPersistence(auth, browserLocalPersistence)
  try {
    if (auth.currentUser) return auth.currentUser
    const cred = await signInAnonymously(auth)
    return cred.user
  } catch (e) {
    console.error('[anon] error', e?.code, e?.message)
    throw e
  }
}

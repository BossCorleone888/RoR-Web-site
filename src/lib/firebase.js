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

// 🔴 直値をここに入れる（Firebase Console > プロジェクトの設定 > 一般 > Webアプリ > 構成）
const firebaseConfig = {
  apiKey:     'AIzaSyCsOqpk7qzesQfNhIVb_Nm-lSAtWoNg2Z0',           // ← ここをあなたの値に
  authDomain: 'ror-web-site.firebaseapp.com', // ← ここをあなたの値に
  projectId:  'ror-web-site',                 // ← ここをあなたの値に
  appId:      '1:1234567890:web:abcde1:777517324792:web:5fe680dc85e91239d71e0d',   // ← ここをあなたの値に
}

// 値が未設定なら即わかるように
for (const k of ['apiKey','authDomain','projectId','appId']) {
  if (!firebaseConfig[k]) throw new Error(`[firebaseConfig] ${k} を直値で入れてください`)
}

// 初期化（HMR対応）
const app  = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db   = getFirestore(app)
export const auth = getAuth(app)
export const ts   = serverTimestamp  // 使う側では ts() として呼べる

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
  // 永続化（localStorage → ダメなら inMemory）
  try { await setPersistence(auth, browserLocalPersistence) }
  catch { try { await setPersistence(auth, inMemoryPersistence) } catch {} }

  const ready = await waitForAuthReady()
  if (ready) return ready

  if (typeof navigator !== 'undefined' && navigator.onLine === false) return null

  try {
    const cred = await signInAnonymously(auth)
    return cred.user
  } catch (e) {
    if (e?.code === 'auth/network-request-failed') return null
    console.error('[auth] anonymous sign-in failed', e?.code || e)
    return null
  }
}

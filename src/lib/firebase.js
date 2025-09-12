// src/lib/firebase.js
// ./lib/firebase.js or ./lib/firebase.ts
import { initializeApp } from 'firebase/app'
import {
  getFirestore, serverTimestamp as ts
} from 'firebase/firestore'
import {
  getAuth, onAuthStateChanged, signInAnonymously, setPersistence, browserLocalPersistence
} from 'firebase/auth'

// ↓ あなたの Firebase 設定に差し替え
const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  projectId: '...',
  appId: '...',
}

const app  = initializeApp(firebaseConfig)
export const db   = getFirestore(app)
export const auth = getAuth(app)
export { ts }

// ✅ 匿名ログインを“必ず”確立して返す
export async function ensureAnonLogin() {
  // 永続化をローカルに（毎回 UID が変わるのを防ぐ）
  await setPersistence(auth, browserLocalPersistence)

  if (auth.currentUser) return auth.currentUser

  // 既にサインイン中かもしれないので、まず一回待つ
  const userNow = await new Promise(resolve => {
    const off = onAuthStateChanged(auth, u => { off(); resolve(u) })
  })
  if (userNow) return userNow

  // まだなら匿名サインイン
  const cred = await signInAnonymously(auth)
  return cred.user
}

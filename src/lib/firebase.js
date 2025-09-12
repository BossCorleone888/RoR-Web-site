// ./lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, serverTimestamp as ts } from 'firebase/firestore'
import { getAuth, signInAnonymously, setPersistence, browserLocalPersistence } from 'firebase/auth'

// ★ Firebase コンソール > Project settings > General > Your apps (Web) の “同じプロジェクト”の値を丸ごと貼る
const firebaseConfig = {
  apiKey: '（Web API Key）',
  authDomain: '（your-project-id）.firebaseapp.com',
  projectId: '（your-project-id）',
  appId: '（your app id）',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export { ts }

// どの設定で初期化してるか見える化
console.log('[firebase] projectId=', app.options.projectId, ' apiKey=', String(app.options.apiKey).slice(0,8)+'...')

export async function ensureAnonLogin() {
  await setPersistence(auth, browserLocalPersistence)
  try {
    if (auth.currentUser) return auth.currentUser
    const cred = await signInAnonymously(auth)
    console.log('[anon] ok uid=', cred.user?.uid)
    return cred.user
  } catch (e) {
    // ← ここが超重要：正確な原因が出る
    console.error('[anon] error code=', e?.code, ' message=', e?.message, e)
    alert('匿名サインイン失敗: ' + (e?.code || 'unknown'))
    throw e
  }
}

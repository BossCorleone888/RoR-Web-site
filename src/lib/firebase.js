// ./lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, serverTimestamp as ts } from 'firebase/firestore'
import { getAuth, signInAnonymously, setPersistence, browserLocalPersistence } from 'firebase/auth'

// ↓↓↓ Firebase コンソール > Project settings > General > Your apps(Web) の値で “必ず同じプロジェクト”のものをコピペ
const firebaseConfig = {
  apiKey: 'YOUR_WEB_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  appId: 'YOUR_APP_ID',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export { ts }

// ✅ デバッグログ：今どのプロジェクト鍵で初期化してるかを確認
console.log('[firebase] projectId=', app.options.projectId, ' apiKey=', (app.options.apiKey || '').slice(0,8) + '...')

// 匿名ログインを“必ず”確立して返す（失敗時にコードを出す）
export async function ensureAnonLogin() {
  await setPersistence(auth, browserLocalPersistence)

  try {
    // 既にサインイン済みならそれを返す
    if (auth.currentUser) return auth.currentUser

    // まだなら匿名サインイン
    const cred = await signInAnonymously(auth)
    console.log('[anon] ok uid=', cred.user?.uid)
    return cred.user
  } catch (e) {
    console.error('[anon] error code=', e?.code, ' message=', e?.message)
    // Network > accounts:signUp の Response も見ると “OPERATION_NOT_ALLOWED / API_KEY_INVALID”等が出る
    throw e
  }
}

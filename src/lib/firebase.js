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

// ★ 直値（Firebaseコンソールの「構成」からコピペ）
// 🔴 直値をここに入れる（Firebase Console > プロジェクトの設定 > 一般 > Webアプリ > 構成）
const firebaseConfig = {
  apiKey:     'AIzaSyCsOqpk7qzesQfNhIVb_Nm-lSAtWoNg2Z0',           // ← ここをあなたの値に
  authDomain: 'ror-web-site.firebaseapp.com', // ← ここをあなたの値に
  projectId:  'ror-web-site',                 // ← ここをあなたの値に
  appId:      '1:1234567890:web:abcde1:777517324792:web:5fe680dc85e91239d71e0d',   // ← ここをあなたの値に
}

// --- デバッグ表示（ASCIIだけ使用）---
function mask(s) { return (typeof s === 'string') ? (s.slice(0, 6) + '...') : s; }
console.log('[FB_CFG LIVE]', {
  apiKey: mask(firebaseConfig.apiKey),
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  appId: mask(firebaseConfig.appId),
});
if (typeof window !== 'undefined') { window._fb = { cfg: firebaseConfig }; }

// 必須キー確認
for (const k of ['apiKey','authDomain','projectId','appId']) {
  if (!firebaseConfig[k]) throw new Error(`[firebaseConfig] ${k} is missing`);
}

// 初期化（HMR対応）
const app  = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);
export const ts   = serverTimestamp; // 呼ぶときは ts()

// ===== 匿名ログイン =====
async function waitForAuthReady(timeoutMs = 1500) {
  if (auth.currentUser !== null) return auth.currentUser;
  await new Promise((resolve) => {
    const off = onAuthStateChanged(auth, () => { off(); resolve(); });
    setTimeout(() => { try { off(); } catch {} ; resolve(); }, timeoutMs);
  });
  return auth.currentUser;
}

export async function ensureAnonLogin() {
  try { await setPersistence(auth, browserLocalPersistence); }
  catch { try { await setPersistence(auth, inMemoryPersistence); } catch {} }

  const ready = await waitForAuthReady();
  if (ready) return ready;

  if (typeof navigator !== 'undefined' && navigator.onLine === false) return null;

  try {
    const cred = await signInAnonymously(auth);
    return cred.user;
  } catch (e) {
    if (e && e.code === 'auth/network-request-failed') return null;
    console.error('[auth] anonymous sign-in failed', e?.code || e);
    return null;
  }
}

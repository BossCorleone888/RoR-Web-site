// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// ★ ここで Firebase プロジェクトと紐付け
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const ts = serverTimestamp;

const auth = getAuth(app);

// 匿名ログイン（初回だけ）
export async function ensureAnonLogin() {
  if (!auth.currentUser) await signInAnonymously(auth);
  return new Promise((resolve) => onAuthStateChanged(auth, (u) => u && resolve(u)));
}

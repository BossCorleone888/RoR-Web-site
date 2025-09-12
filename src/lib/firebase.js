// src/lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, serverTimestamp as ts } from 'firebase/firestore'
import {
  getAuth, setPersistence, browserLocalPersistence, inMemoryPersistence,
  signInAnonymously, onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
  apiKey:      import.meta.env.VITE_FB_API_KEY,
  authDomain:  import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId:   import.meta.env.VITE_FB_PROJECT_ID,
  appId:       import.meta.env.VITE_FB_APP_ID,
}

const missing = Object.entries(firebaseConfig).filter(([,v])=>!v).map(([k])=>k)
if (missing.length) {
  const msg = `[firebaseConfig] missing keys: ${missing.join(', ')}`
  if (import.meta.env.DEV) throw new Error(msg); else console.error(msg)
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export { ts }

async function waitForAuthReady(timeoutMs=1500){
  if (auth.currentUser !== null) return auth.currentUser
  await new Promise(r=>{
    const off = onAuthStateChanged(auth, ()=>{ off(); r() })
    setTimeout(()=>{ try{off()}catch{}; r() }, timeoutMs)
  })
  return auth.currentUser
}

export async function ensureAnonLogin(){
  try { await setPersistence(auth, browserLocalPersistence) }
  catch(e){ try{ await setPersistence(auth, inMemoryPersistence) }catch(e2){ console.error('[auth] setPersistence failed', e2) } }

  const ready = await waitForAuthReady()
  if (ready) return ready
  if (typeof navigator!=='undefined' && navigator.onLine===false) { console.warn('[auth] offline'); return null }

  try { const cred = await signInAnonymously(auth); return cred.user }
  catch(e){
    if (e?.code==='auth/network-request-failed'){ console.warn('[auth] network fail'); return null }
    console.error('[auth] anon failed', e); return null
  }
}

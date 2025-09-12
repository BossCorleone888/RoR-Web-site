const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
}
// ガード（デプロイ前に落として気付く）
for (const [k,v] of Object.entries(firebaseConfig)) {
  if (!v) throw new Error(`[firebaseConfig] ${k} is missing`)
}


// --- env から読む ---
const ENV = {
  apiKey:     import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId:  import.meta.env.VITE_FB_PROJECT_ID,
  appId:      import.meta.env.VITE_FB_APP_ID,
};

// --- 本番のみのフォールバック（env が欠けたキーだけ埋める）---
const FALLBACK_PROD = import.meta.env.PROD ? {
  apiKey:     "AIzaSyXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId:  "your-project-id",
  appId:      "1:1234567890:web:abcdef123456",
} : {};

// 最終的な設定（DEVはENV必須／PRODは欠けをフォールバック）
const firebaseConfig = {
  ...(import.meta.env.DEV ? {} : FALLBACK_PROD),
  ...Object.fromEntries(Object.entries(ENV).filter(([,v]) => v)),
};

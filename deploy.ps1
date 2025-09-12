cd "C:\Users\m_ohira\Desktop\RoR\RoR-web-site"
if (Test-Path .\node_modules\.vite) { rm -r -fo .\node_modules\.vite }
if (Test-Path .\docs) { rm -r -fo .\docs }
npm run build
git add .
git commit -m "auto deploy"
git push

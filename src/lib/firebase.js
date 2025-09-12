// === 診断パネル（?debug=1 で表示） ===
import { signInAnonymously } from "firebase/auth"
const debugInfo = ref({ show:false, step:'idle', anon:'(not tried)', fetch:'(not tried)' })

onMounted(() => {
  const url = new URL(location.href)
  debugInfo.value.show = url.searchParams.get('debug') === '1'
})

async function runDiag(){
  debugInfo.value.step = 'running...'
  // 1) Google 到達チェック（204）
  try {
    const r = await fetch('https://www.googleapis.com/generate_204', { mode:'no-cors' })
    debugInfo.value.fetch = 'generate_204: ok (no-cors)'
  } catch(e){
    debugInfo.value.fetch = 'generate_204: FAILED ' + (e?.message||e)
  }
  // 2) 匿名サインイン試行
  try {
    const u = await signInAnonymously(auth)
    debugInfo.value.anon = 'anon OK uid=' + (u.user?.uid||'(none)')
  } catch(e){
    debugInfo.value.anon = 'anon FAIL code=' + (e?.code||'?') + ' msg=' + (e?.message||e)
  }
  debugInfo.value.step = 'done'
}

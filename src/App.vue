<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import { db, ensureAnonLogin, auth, ts } from './lib/firebase'
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import rorLogo from './assets/ror.png'

const md = new MarkdownIt({ breaks: true })

const SITE_HASH = import.meta.env.VITE_SITE_PASS_HASH?.trim?.() || ''
const gateOpen  = ref(!SITE_HASH)   // ハッシュ未設定ならゲートOFF
const gatePwd   = ref('')
const gateErr   = ref('')

async function sha256Hex(str){
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('')
}
async function enterGate(){
  try{
    const h = await sha256Hex(gatePwd.value)
    if (h === SITE_HASH){
      gateOpen.value = true
      localStorage.setItem('siteGate', h)
      gateErr.value = ''
      gatePwd.value = ''
    } else {
      gateErr.value = 'パスワードが違うべさ'
    }
  }catch(e){
    gateErr.value = 'このブラウザは非対応かも（WebCryptoが必要）'
  }
}
function logoutGate(){
  localStorage.removeItem('siteGate')
  gateOpen.value = false
}
onMounted(() => {
  if (SITE_HASH){
    const t = localStorage.getItem('siteGate')
    if (t && t === SITE_HASH) gateOpen.value = true
  }
})

/* =============== 左サイド：Markdown ロード & 本文（安全版） =============== */
const mdFiles = import.meta.glob('./content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,           // ← 文字列を直接受け取る
})

const topics = ref([])
const selectedId = ref(null)
const selectedHtml = ref('')

function loadTopics() {
  const items = []
  for (const [path, raw] of Object.entries(mdFiles)) {
    if (typeof raw !== 'string') continue
    const firstLine = raw.split(/\r?\n/).find(l => l.trim()) || ''
    const title = firstLine.replace(/^#\s*/, '') || '(無題)'
    const id = path.split('/').pop().replace(/\.md$/, '')
    items.push({ id, title, raw })
  }
  items.sort((a, b) => a.id.localeCompare(b.id, 'ja'))
  topics.value = items
  if (!selectedId.value && items.length) selectedId.value = items[0].id
}

watch(selectedId, () => {
  const t = topics.value.find(x => x.id === selectedId.value)
  selectedHtml.value = t ? md.render(t.raw) : ''
})

/* =============== 右：メンバー投稿（Firestore共有） =============== */
const MAX_CHARS = 500
const MAX_LINES = 10

const nameInput = ref('')
const newMessage = ref('')
const messages   = ref([])
const me         = ref(null)
const hasFirebase = ref(false)    // ← Firebase有効かどうか
const SHOW_FB_NOTICE = false      // ← 一時的に「未設定バナー」を隠すなら false に固定

let colRef = null

const charCount = computed(() => newMessage.value.length)
const lineCount = computed(() => newMessage.value ? newMessage.value.split(/\r\n|\r|\n/).length : 0)
const isCharOver = computed(() => charCount.value > MAX_CHARS)
const isLineOver = computed(() => lineCount.value > MAX_LINES)
const canSubmit  = computed(() => !!newMessage.value.trim() && !isCharOver.value && !isLineOver.value)

onMounted(async () => {
  loadTopics()

  // Firebase が有効なときだけ認証＆購読
  if (db) {
    hasFirebase.value = true
    const user = await ensureAnonLogin()
    me.value = user
    if (auth) onAuthStateChanged(auth, (u) => { me.value = u })

    colRef = collection(db, 'messages')
    const q = query(colRef, orderBy('created_at', 'desc'))
    onSnapshot(q, (snap) => {
      messages.value = snap.docs.map(d => {
        const data = d.data()
        const dt = data.created_at?.toDate ? data.created_at.toDate() : new Date()
        return {
          id: d.id,
          name: data.name || '名無し',
          text: data.text || '',
          at: dt.toLocaleString(),
          uid: data.uid ?? null,
        }
      })
    })
  }
})

function needFirebase() {
  if (!hasFirebase.value || !colRef) {
    alert('Firebase未設定（.env.local を作ってビルドすると投稿できるべさ）')
    return true
  }
  return false
}

function handleSubmit(){
  if (needFirebase()) return
  const t = newMessage.value.trim()
  const nm = nameInput.value.trim() || '名無し'
  if(!canSubmit.value) return
  addDoc(colRef, {
    name: nm,
    text: t,
    created_at: ts(),
    uid: me.value?.uid ?? null,
  }).then(() => {
    newMessage.value = ''
  }).catch(e => console.error('[addDoc] error', e))
}

async function removeOne(id){
  if (needFirebase()) return
  try {
    await deleteDoc(doc(db, 'messages', id))
  } catch (e) {
    console.error('[delete] error', e)
    alert('削除に失敗したかも。')
  }
}

</script>

<template>
  <!-- 🔒 パスワードゲート -->
  <div v-if="!gateOpen" class="gate">
    <div class="gate-card">
      <h3>🔒 メンバー専用</h3>
      <p class="gate-tip">パスワードを入力して入室してね</p>
      <input class="input" type="password" v-model="gatePwd" placeholder="パスワード" @keyup.enter="enterGate" />
      <button class="btn-primary" @click="enterGate">入る</button>
      <p v-if="gateErr" class="gate-err">{{ gateErr }}</p>
    </div>
  </div>

  <!-- 👇 ラッパーはこの1個だけにする（v-showで制御） -->
  <div class="layout-pc" v-show="gateOpen">
    <!-- 左：サイドナビ -->
    <aside class="sidenav">
      <div class="sidenav-inner">
        <img :src="rorLogo" alt="RoR ロゴ" class="brand-logo" decoding="async" />
        <div class="logo">MENU</div>
        <nav aria-label="サイドナビ" class="nav-wrap">
          <ul class="nav-list">
            <li v-for="t in topics" :key="t.id">
              <a href="#" class="nav-link" :class="{active: t.id===selectedId}"
                 @click.prevent="selectedId = t.id" :aria-current="t.id===selectedId ? 'page' : undefined">
                <span class="dot" aria-hidden="true"></span>
                <span class="nav-text">{{ t.title }}</span>
              </a>
            </li>
          </ul>
        </nav>
        <button class="btn-mini logout" @click="logoutGate" title="ログアウト">ログアウト</button>
      </div>
    </aside>
    
    <!-- 中央本文 -->
    <main class="content">
      <h2 class="title">♠♡♦♧ RoRメンバーサイト ♠♡♦♧</h2>
      <p class="lead">ここではメンバー向けに <strong>ルール</strong> や <strong>ノウハウ</strong> を共有します。</p>

      <section class="panel">
        <template v-if="selectedHtml">
          <article class="md" v-html="selectedHtml"></article>
        </template>
        <template v-else>
          <div class="loading">読み込み中…（content フォルダに .md を置くと自動で出るべ）</div>
        </template>
      </section>
    </main>

    <!-- 右：投稿 -->
    <aside class="sidebar">
      <div class="pad">
        <h3>✍️ メンバー書き込み</h3>

        <!-- 一時的にバナーを隠したいときは SHOW_FB_NOTICE=false にしてある -->
        <div v-if="SHOW_FB_NOTICE && !hasFirebase" class="card" style="border-color:#f8cdcd;background:#fff5f5">
          <strong style="color:#b20000">Firebase未設定</strong><br>
          `.env.local` を作ってビルドすると投稿できるべさ（下に手順書いた）。
        </div>

        <form @submit.prevent="handleSubmit" class="card" :aria-disabled="!hasFirebase">
          <label class="lbl">ニックネーム</label>
          <input v-model="nameInput" class="input" placeholder="例：Momo56 / 名無し など" :disabled="!hasFirebase" />

          <label class="lbl">メッセージ</label>
          <textarea v-model="newMessage" class="textarea" placeholder="複数行OK。ノウハウや連絡事項などをどうぞ" rows="5" :disabled="!hasFirebase"></textarea>

          <div class="hint">
            <span :class="{over:isCharOver}">{{ charCount }}/{{ MAX_CHARS }}文字</span><span>・</span>
            <span :class="{over:isLineOver}">{{ lineCount }}/{{ MAX_LINES }}行</span>
          </div>

          <div class="row">
            <button class="btn-primary" type="submit" :disabled="!canSubmit || !hasFirebase">投稿</button>
          </div>
        </form>

        <div class="card list">
          <h4>🗂 最新の投稿</h4>
          <ul class="posts">
            <li v-for="m in messages" :key="m.id" class="post">
              <div class="meta">
                <strong class="name">{{ m.name || '名無し' }}</strong>
                <small class="time">{{ m.at }}</small>
                <button class="btn-mini" type="button" v-if="hasFirebase && m.uid && me && m.uid === me.uid" @click="removeOne(m.id)">
                  削除
                </button>
              </div>
              <div class="text" v-text="m.text"></div>
            </li>
            <li v-if="messages.length===0" class="empty">まだ投稿はありません。</li>
          </ul>
        </div>

        <p class="note">※ Firestoreでリアルタイム共有しています。</p>
      </div>
    </aside>
  </div>
</template>

<style>
.layout-pc{
  display:grid;
  grid-template-columns: 260px 1fr 360px;
  gap: 20px;
  max-width: 1400px;
  padding: 16px;
  margin: 0 auto;
  font-family: system-ui,-apple-system,Segoe UI,Roboto,"Hiragino Kaku Gothic ProN",Meiryo,sans-serif;
}
.sidenav{
  position: sticky; top: 0; height: 100vh; overflow: hidden;
  border: 1px solid #eee; border-radius: 12px; background: #fff; }

 .sidenav-inner{
  padding: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;          /* ← 子要素間に一定の隙間 */
 }
  .nav-wrap{
  flex: 1 1 auto;
  overflow-y: auto;     /* メニューだけスクロール */
  margin-top: 8px;
}
.logout{
  margin-top: auto;     /* これで一番下へ */
  align-self: stretch;  /* 横いっぱい（好みで） */
  border:1px solid #ddd;
  border-radius:8px;
  padding:8px 12px;
  background:#fafafa;
}
.logout:hover{ background:#f2f2f2; }

.logout{
  margin-top: auto;         /* 一番下へ固定（既存のまま） */
  align-self: stretch;
  display: block;
  padding: 10px 12px;
  border-radius: 8px;

  background: #e53935;      /* 赤背景 */
  border: 1px solid #c62828;
  color: #ffeb3b;           /* 黄色文字 */
  font-weight: 700;         /* 太字 */
  text-align: center;
  text-shadow: 0 1px 0 rgba(0,0,0,.25);
}

.logout:hover{
  background: #d32f2f;
  border-color: #b71c1c;
}

.logout:active{
  background: #c62828;
}

.logout:focus-visible{
  outline: 2px solid #ffeb3b;  /* アクセシビリティ */
  outline-offset: 2px;
}

.logo{
  font-weight: 1000;
  letter-spacing: .5px;
  color:#42b883;
  margin: 6px 4px 10px;
  text-align: center;   /* ← これで MENU が中央寄せ */
}
.nav-list{ list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
.nav-link{ display:flex; align-items:center; gap:10px; text-decoration: none; color:#333; background:#fff;
  border:1px solid #e9e9e9; border-radius: 10px; padding: 10px 12px; transition: background .15s, border-color .15s, box-shadow .15s; }
.nav-link .dot{ width:8px; height:8px; border-radius:50%; background:#d0d0d0; }
.nav-link.active .dot{ background:#42b883; }
.nav-link:hover{ background:#f7f7f7; }
.nav-link.active{ border-color:#42b883; box-shadow:0 0 0 2px rgba(66,184,131,.15) inset; }
.nav-text{ white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.content{ background:#fff; border:1px solid #eee; border-radius:12px; padding:24px; text-align:left; }
.lead{ margin:8px 0 24px; color:#333; }
.title{ text-align:center; color:#42b883; margin:0; }

.md{ color:#222; line-height:1.8; text-align:left; }
.md h1,.md h2,.md h3{ margin:1.2em 0 .6em; }
.md p{ margin:.6em 0; }
.md ul, .md ol{ padding-left: 1.4em; margin:.6em 0; }
.md code{ background:#f5f5f5; padding:0 .25em; border-radius:4px; }
.md pre code{ display:block; padding:10px; overflow:auto; }
.md table{ width:100%; border-collapse: collapse; margin:.6rem 0; }
.md th, .md td{ border:1px solid #e5e5e5; padding:6px 8px; }
.md th{ background:#fafafa; }

.sidebar{ position: sticky; top: 0; height: 100vh; overflow: auto;
  background:#fff; border:1px solid #eee; border-radius:12px; }
.sidebar .pad{ padding:16px; }
.card{ background:#fff; border:1px solid #eee; border-radius:12px; padding:16px; }

.lbl{ display:block; font-size:12px; color:#555; margin-top:8px; }
.input, .textarea{ width:100%; padding:10px 12px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box; }
.textarea{ resize: vertical; }
.hint{ display:flex; gap:6px; font-size:12px; color:#666; margin:6px 0 8px; }
.hint .over{ color:#e24c4c; font-weight:600; }

.row{ display:flex; gap:8px; margin-top:10px; }
.btn-primary{ background:#42b883; color:#fff; border:none; border-radius:8px; padding:8px 14px; cursor:pointer; }
.btn-danger{ background:#e24c4c; color:#fff; border:none; border-radius:8px; padding:8px 14px; cursor:pointer; }
.btn-mini{ background:transparent; border:1px solid #ddd; border-radius:6px; padding:2px 8px; cursor:pointer; }

.posts{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px; }
.post{ border:1px solid #eee; border-radius:10px; padding:10px; background:#fafafa; }
.meta{ display:flex; align-items:center; gap:8px; }
.meta .name{ color:#333; }
.meta .time{ color:#777; margin-left:auto; }
.text{ white-space: pre-wrap; margin-top:4px; }

.note{ font-size:12px; color:#666; margin:8px 4px; }
body{ background:#f9f9f9; }

.brand-logo{
 display:block;
 margin: 8px auto 12px;
 max-width: 180px;   /* ここを好みで */
 width: 100%;
 height: auto;
 border-radius: 12px;
 box-shadow: 0 2px 6px rgba(0,0,0,.06);
 object-fit: contain;
}

.gate{
  position: fixed; inset: 0; background: #f4f6f8;
  display: grid; place-items: center; z-index: 9999;
}
.gate-card{
  width: min(92vw, 420px);
  background: #fff; border:1px solid #eee; border-radius: 14px;
  padding: 20px; text-align:center; box-shadow: 0 10px 30px rgba(0,0,0,.06);
}
.gate-card h3{ margin: 4px 0 10px; color:#333; }
.gate-tip{ margin: 0 0 10px; color:#666; font-size: 13px; }
.gate-err{ color:#e24c4c; font-size: 12px; margin-top:8px; }

</style>

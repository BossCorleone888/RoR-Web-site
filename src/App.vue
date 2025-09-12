<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import rorLogo from './assets/ror.png'                // ← 左上ロゴ
import { db, ensureAnonLogin, auth, ts } from './lib/firebase'
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, query, orderBy
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

/* =============== パスワードゲート（簡易） =============== */
const SITE_HASH = import.meta.env.VITE_SITE_PASS_HASH?.trim?.() || ''
const gateOpen  = ref(!SITE_HASH)     // hash未設定ならゲートOFF
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
  }catch{
    gateErr.value = 'このブラウザは非対応かも（WebCryptoが必要）'
  }
}
function logoutGate(){
  localStorage.removeItem('siteGate')
  gateOpen.value = false
}

/* =============== 左サイド：Markdown ロード & 本文 =============== */
const md = new MarkdownIt({ breaks: true })

// ビルド時に同期読み込み
const mdModules = import.meta.glob('./content/*.md', { as: 'raw', eager: true })

const topics = ref([])          // ← 型注釈を外す
const selectedId = ref(null)
const selectedHtml = ref('')

function loadTopicsSync() {
  const items = Object.entries(mdModules)
    .map(([path, raw]) => {
      if (typeof raw !== 'string') return null
      const first = (raw.split(/\r?\n/).find(l => l.trim()) || '').replace(/^#\s*/, '')
      const id = (path.split('/').pop() || '').replace(/\.md$/, '')
      return { id, title: first || id, raw }
    })
    .filter(Boolean)
  items.sort((a, b) => a.id.localeCompare(b.id, 'ja'))
  topics.value = items
  if (!selectedId.value && items.length) selectedId.value = items[0].id
  if (items.length === 0) {
    console.warn('[content] 0 items. 「src/content」に *.md を置いてね')
  }
}

watch(selectedId, () => {
  const t = topics.value.find(x => x.id === selectedId.value)
  selectedHtml.value = t ? md.render(t.raw) : ''
})

watch(selectedId, () => {
  const t = topics.value.find(x => x.id === selectedId.value)
  selectedHtml.value = t ? md.render(t.raw) : ''
})


/* =============== 右：メンバー投稿（Firestore共有） =============== */
const MAX_CHARS = 500
const MAX_LINES = 10

const nameInput = ref('')
const newMessage = ref('')
const messages = ref([])
const me = ref(null)
const hasFirebase = ref(false)    // Firebase設定があれば true
let colRef = null                 // collection 参照

const charCount = computed(() => newMessage.value.length)
const lineCount = computed(() => newMessage.value ? newMessage.value.split(/\r\n|\r|\n/).length : 0)
const isCharOver = computed(() => charCount.value > MAX_CHARS)
const isLineOver = computed(() => lineCount.value > MAX_LINES)
const canSubmit = computed(() => !!newMessage.value.trim() && !isCharOver.value && !isLineOver.value)

onMounted(async () => {
  // パスゲート自動開放
  if (SITE_HASH){
    const t = localStorage.getItem('siteGate')
    if (t && t === SITE_HASH) gateOpen.value = true
  }

  loadTopicsSync()

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
  } else {
    console.warn('[App] Firebase 未設定：投稿UIは表示されるけど無効だべさ')
  }
})

function needFirebase() {
  if (!hasFirebase.value || !colRef) {
    alert('Firebase未設定（.env.production.local を作ってビルドすると投稿できるべさ）')
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
    created_at: ts(),          // serverTimestamp()
    uid: me.value?.uid ?? null,
  }).then(() => {
    newMessage.value = ''
  }).catch(e => {
    console.error('[addDoc] error', e)
  })
}

async function removeOne(id){
  if (needFirebase()) return
  try {
    await deleteDoc(doc(colRef.firestore, 'messages', id))
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

  <!-- 本体 -->
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

          <!-- 区切り線＋少しの余白 -->
          <hr class="side-sep" />
          <!-- メニュー直下のログアウト -->
          <button class="btn-mini logout" @click="logoutGate" title="ログアウト">ログアウト</button>
        </nav>
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

        <div v-if="!hasFirebase" class="card" style="border-color:#f8cdcd;background:#fff5f5">
          <strong style="color:#b20000">Firebase未設定</strong><br>
          `.env.production.local` を作ってビルドすると投稿できるべさ。
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
                <button class="btn-mini" type="button" v-if="m.uid && me && m.uid === me.uid" @click="removeOne(m.id)">
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
/* ===== レイアウト ===== */
.layout-pc{
  display:grid;
  grid-template-columns: 260px 1fr 360px;
  gap: 20px;
  max-width: 1400px;
  padding: 16px;
  margin: 0 auto;
  font-family: system-ui,-apple-system,Segoe UI,Roboto,"Hiragino Kaku Gothic ProN",Meiryo,sans-serif;
}

/* ===== サイド：左 ===== */
.sidenav{
  position: sticky; top: 0; height: 100vh; overflow: auto;
  border: 1px solid #eee; border-radius: 12px; background: #fff;
}
.sidenav-inner{ height: 100%; padding: 12px; }
.brand-logo{
  display:block;
  margin: 8px auto 12px;
  max-width: 180px;
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,.06);
  object-fit: contain;
}
.logo{
  font-weight: 800; letter-spacing: .5px; color:#42b883; margin: 6px 4px 10px;
  text-align: center;
  font-size: clamp(20px, 2.2vw, 28px);
  line-height: 1.2;
}
.nav-wrap{ margin-top: 8px; }
.nav-list{ list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
.nav-link{ display:flex; align-items:center; gap:10px; text-decoration: none; color:#333; background:#fff;
  border:1px solid #e9e9e9; border-radius: 10px; padding: 10px 12px; transition: .15s, border-color .15s, box-shadow .15s; }
.nav-link .dot{ width:8px; height:8px; border-radius:50%; background:#d0d0d0; }
.nav-link.active .dot{ background:#42b883; }
.nav-link:hover{ background:#d9e7ca; }
.nav-link.active{ border-color:#42b883; box-shadow:0 0 0 2px rgba(66,184,131,.15) inset; }
.nav-text{ white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.side-sep{
  border: 0; border-top: 1px solid #eee; margin: 10px 0; width: 100%;
}

/* 目立つログアウトボタン（btn-mini を上書き／必ずこのブロックを下に置く） */
.btn-mini.logout{
  display: block; width: 100%;
  padding: 10px 12px; border-radius: 8px;
  background: #f7f3f3; border: 1px solid #b71c1c;
  color: #ffeb3b; font-weight: 700; text-align: center;
  text-shadow: 0 1px 0 rgba(0,0,0,.25);
  margin-top: 0; /* 余白は .side-sep が作る */
}
.btn-mini.logout:hover{ background:#d41a1a; border-color:#b71c1c; }
.btn-mini.logout:active{ background:#c3cadf; }
.btn-mini.logout:focus-visible{ outline:2px solid #ffeb3b; outline-offset:2px; }

/* ===== 本文：中央 ===== */
.content{ background:#fff; border:1px solid #eee; border-radius:12px; padding:24px; text-align:left; }
.lead{ margin:8px 0 24px; color:#333; }
.title{ text-align:center; color:#42b883; margin:0; }

/* Markdown 表示 */
.md{ color:#222; line-height:1.8; text-align:left; }
.md h1,.md h2,.md h3{ margin:1.2em 0 .6em; }
.md p{ margin:.6em 0; }
.md ul, .md ol{ padding-left: 1.4em; margin:.6em 0; }
.md code{ background:#f5f5f5; padding:0 .25em; border-radius:4px; }
.md pre code{ display:block; padding:10px; overflow:auto; }
.md table{ width:100%; border-collapse: collapse; margin:.6rem 0; }
.md th, .md td{ border:1px solid #e5e5e5; padding:6px 8px; }
.md th{ background:#fafafa; }

/* ===== サイド：右（投稿） ===== */
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

/* ===== パスワードゲート ===== */
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

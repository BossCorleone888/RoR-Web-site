<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import { db, ensureAnonLogin, ts } from './lib/firebase'
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, query, orderBy, getDocs
} from 'firebase/firestore'

const md = new MarkdownIt({ breaks: true })

/* =============== 左サイドナビ：MD自動読込（PC専用） =============== */
const mdLoaders = import.meta.glob('./content/*.md', {
  query: '?raw',
  import: 'default',
})

const topics = ref([]) // { id, title, body }
const SELECT_KEY = 'ror_selected_topic_v2'
const selectedId = ref('')

onMounted(async () => {
  const entries = Object.entries(mdLoaders).sort((a, b) => a[0].localeCompare(b[0], 'ja'))
  for (const [path, loader] of entries) {
    const text = await loader()
    const lines = text.split(/\r?\n/)
    let title = (lines.find(l => l.trim().length) ?? 'Untitled').replace(/^#+\s*/, '').trim()
    const id = path.split('/').pop().replace(/\.md$/, '')
    topics.value.push({ id, title, body: text })
  }
  const saved = localStorage.getItem(SELECT_KEY)
  selectedId.value = (saved && topics.value.some(t => t.id === saved)) ? saved : (topics.value[0]?.id || '')
})

watch(selectedId, v => { if (v) localStorage.setItem(SELECT_KEY, v) })

const selectedTopic = computed(() => topics.value.find(t => t.id === selectedId.value))
const selectedHtml  = computed(() => selectedTopic.value ? md.render(selectedTopic.value.body) : '')

/* =============== 右：メンバー投稿（Firestore共有） =============== */
const MAX_CHARS = 500
const MAX_LINES = 10

const nameInput = ref('')
const newMessage = ref('')
const messages = ref([]) // {id,name,text,at}

const charCount = computed(() => newMessage.value.length)
const lineCount = computed(() => newMessage.value ? newMessage.value.split(/\r\n|\r|\n/).length : 0)
const isCharOver = computed(() => charCount.value > MAX_CHARS)
const isLineOver = computed(() => lineCount.value > MAX_LINES)
const canSubmit = computed(() =>
  !!newMessage.value.trim() && !isCharOver.value && !isLineOver.value
)

const col = collection(db, 'messages')

onMounted(async () => {
  await ensureAnonLogin()
  const q = query(col, orderBy('created_at', 'desc'))
  onSnapshot(q, (snap) => {
    messages.value = snap.docs.map(d => {
      const data = d.data()
      const dt = data.created_at?.toDate ? data.created_at.toDate() : new Date()
      return {
        id: d.id,
        name: data.name || '名無し',
        text: data.text || '',
        at: dt.toLocaleString(),
      }
    })
  })
})

function handleSubmit(){
  const t = newMessage.value.trim()
  const nm = nameInput.value.trim() || '名無し'
  if(!canSubmit.value) return
  addDoc(col, {
    name: nm,
    text: t,
    created_at: ts(),
  }).then(() => {
    newMessage.value = ''
  })
}

async function removeOne(id){
  await deleteDoc(doc(db, 'messages', id))
}

async function clearAll(){
  if(!confirm('全投稿を削除しますか？')) return
  const snap = await getDocs(col)
  for (const d of snap.docs) await deleteDoc(d.ref)
}
</script>

<template>
  <div class="layout-pc">
    <!-- 左：サイドナビ -->
    <aside class="sidenav">
      <div class="sidenav-inner">
        <div class="logo">MENU</div>
        <nav aria-label="サイドナビ">
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

        <form @submit.prevent="handleSubmit" class="card">
          <label class="lbl">ニックネーム</label>
          <input v-model="nameInput" class="input" placeholder="例：Momo56 / 名無し など" />

          <label class="lbl">メッセージ</label>
          <textarea v-model="newMessage" class="textarea" placeholder="複数行OK。ノウハウや連絡事項などをどうぞ" rows="5"></textarea>

          <div class="hint">
            <span :class="{over:isCharOver}">{{ charCount }}/{{ MAX_CHARS }}文字</span><span>・</span>
            <span :class="{over:isLineOver}">{{ lineCount }}/{{ MAX_LINES }}行</span>
          </div>

          <div class="row">
            <button class="btn-primary" type="submit" :disabled="!canSubmit">投稿</button>
            <button class="btn-danger" type="button" @click="clearAll">全削除</button>
          </div>
        </form>

        <div class="card list">
          <h4>🗂 最新の投稿</h4>
          <ul class="posts">
            <li v-for="m in messages" :key="m.id" class="post">
              <div class="meta">
                <strong class="name">{{ m.name || '名無し' }}</strong>
                <small class="time">{{ m.at }}</small>
                <button class="btn-mini" type="button" @click="removeOne(m.id)">削除</button>
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
/* ===== レイアウトやスタイルは元と同じ ===== */
.layout-pc{
  display:grid;
  grid-template-columns: 260px 1fr 360px;
  gap: 20px;
  max-width: 1400px;
  padding: 16px;
  margin: 0 auto;
  font-family: system-ui,-apple-system,Segoe UI,Roboto,"Hiragino Kaku Gothic ProN",Meiryo,sans-serif;
}
.sidenav{ position: sticky; top: 0; height: 100vh; overflow: hidden;
  border: 1px solid #eee; border-radius: 12px; background: #fff; }
.sidenav-inner{ height: 100%; overflow-y: auto; padding: 12px; }
.logo{ font-weight: 800; letter-spacing: .5px; color:#42b883; margin: 6px 4px 10px; }
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
</style>

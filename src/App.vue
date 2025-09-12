<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import { db, ensureAnonLogin, auth, ts } from './lib/firebase'
import {
  serverTimestamp as _ts, // 予備（使わないけど残してOK）
  collection, addDoc, deleteDoc, doc,
  onSnapshot, query, orderBy, getDocs
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const md = new MarkdownIt({ breaks: true })

/* =============== 左サイド：Markdown ロード & 本文 =============== */
const mdLoaders = import.meta.glob('./content/*.md', { query: '?raw' })
const topics = ref([])
const selectedId = ref(null)
const selectedHtml = ref('')

async function loadTopics() {
  const items = []
  for (const [path, loader] of Object.entries(mdLoaders)) {
    const raw = await loader()
    const first = (raw.split(/\r?\n/).find(l => l.trim()) || '').replace(/^#\s*/, '')
    const id = path.split('/').pop().replace(/\.md$/, '')
    items.push({ id, title: first || id, raw })
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
const messages = ref([])
const me = ref(null)
const hasFirebase = ref(false)   // ← これでテンプレ側の表示/無効化を制御
let colRef = null                // collection 参照（初期は null）

const charCount = computed(() => newMessage.value.length)
const lineCount = computed(() => newMessage.value ? newMessage.value.split(/\r\n|\r|\n/).length : 0)
const isCharOver = computed(() => charCount.value > MAX_CHARS)
const isLineOver = computed(() => lineCount.value > MAX_LINES)
const canSubmit = computed(() => !!newMessage.value.trim() && !isCharOver.value && !isLineOver.value)

onMounted(async () => {
  await loadTopics()

  // Firebase が有効なときだけ認証＆購読
  if (db) {
    hasFirebase.value = true
    const user = await ensureAnonLogin()
    me.value = user
    if (auth) {
      onAuthStateChanged(auth, (u) => { me.value = u })
    }
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
    created_at: ts(),          // lib 側の ts() を使用
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

async function clearAll(){
  if (needFirebase()) return
  if(!confirm('全投稿を削除しますか？')) return
  const snap = await getDocs(colRef)
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

        <div v-if="!hasFirebase" class="card" style="border-color:#f8cdcd;background:#fff5f5">
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
            <button class="btn-danger" type="button" @click="clearAll" :disabled="!hasFirebase">全削除</button>
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
/* 既存のCSSそのままでOK（省略） */
</style>

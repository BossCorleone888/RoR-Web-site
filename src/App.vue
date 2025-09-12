<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import { db, ensureAnonLogin, ts, auth } from './lib/firebase'
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const md = new MarkdownIt({ breaks: true })

/* =============== 左サイド：Markdown ロード & 本文 =============== */
// Vite 5 以降は as:'raw' じゃなく query:'?raw' を推奨
const mdLoaders = import.meta.glob('./content/*.md', { query: '?raw' })

const topics = ref([])          // [{id,title,raw}]
const selectedId = ref(null)    // 現在選択中の id
const selectedHtml = ref('')    // 表示用 HTML

async function loadTopics() {
  const items = []
  for (const [path, loader] of Object.entries(mdLoaders)) {
    const raw = await loader()
    // 最初の非空行をタイトルに（先頭の # を剥がす）
    const first = (raw.split(/\r?\n/).find(l => l.trim()) || '').replace(/^#\s*/, '')
    const id = path.split('/').pop().replace(/\.md$/, '')
    items.push({ id, title: first || id, raw })
  }
  // 01_ 02_… 前提で安定ソート
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

const charCount = computed(() => newMessage.value.length)
const lineCount = computed(() => newMessage.value ? newMessage.value.split(/\r\n|\r|\n/).length : 0)
const isCharOver = computed(() => charCount.value > MAX_CHARS)
const isLineOver = computed(() => lineCount.value > MAX_LINES)
const canSubmit = computed(() => !!newMessage.value.trim() && !isCharOver.value && !isLineOver.value)

const col = collection(db, 'messages')

// 🔰 ここが超重要：reactive なログイン情報
const me = ref(null)

onMounted(async () => {
  console.log('[mounted] start')

  // --- 左：Markdown 読み込み
  await loadTopics()

  // ① 匿名ログインを“必ず”確立（失敗しても null 返るだけで画面は動く設計）
  const user = await ensureAnonLogin()
  me.value = user
  console.log('[ensureAnonLogin] uid =', me.value?.uid)

  // ② 状態変化も拾う（保険）
  onAuthStateChanged(auth, (u) => {
    me.value = u
    console.log('[onAuthStateChanged] uid =', u?.uid)
  })

  // ③ デバッグ用
  window._auth = auth
  window._me = me
  window._topics = topics

  // ④ 投稿の購読
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
        uid: data.uid ?? null,
      }
    })
    console.log('[onSnapshot] first=', messages.value[0])
  })

  console.log('[mounted] done')
})

function handleSubmit(){
  const t = newMessage.value.trim()
  const nm = nameInput.value.trim() || '名無し'
  if(!canSubmit.value) return
  addDoc(col, {
    name: nm,
    text: t,
    created_at: ts(),
    uid: me.value?.uid ?? null,
  }).then(() => {
    newMessage.value = ''
    console.log('[addDoc] ok, uid=', me.value?.uid)
  }).catch(e => {
    console.error('[addDoc] error', e)
  })
}

async function removeOne(id){
  try {
    console.log('[delete] try id=', id)
    await deleteDoc(doc(db, 'messages', id))
    console.log('[delete] ok id=', id)
  } catch (e) {
    console.error('[delete] error', e)
    alert('削除に失敗したかも。コンソールを確認してね。')
  }
}

async function clearAll(){
  if(!confirm('全投稿を削除しますか？')) return
  const snap = await getDocs(col)
  for (const d of snap.docs) await deleteDoc(d.ref)
}
</script>

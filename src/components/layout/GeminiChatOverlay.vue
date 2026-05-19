<template>
  <div class="gemini-chat-overlay" :class="{ 'fade-out-active': isClosing }">
    <div
      class="gemini-sidebar-panel"
      :class="{ 'slide-out-active': isClosing, expanded: isExpanded }"
    >
      
      <!-- 简约页眉 -->
      <header class="sidebar-header">
        <div class="brand-group">
          <div class="spark-logo-animate">
            <img src="@/assets/images/ai-chat-avatar.png" alt="" class="gemini-sparkle" />
          </div>
          <div class="brand-text">
            <h3 class="brand-name">广财大 AI 智能问答</h3>
          </div>
        </div>
        
        <div class="window-actions">
          <button
            class="panel-action-btn"
            @click="toggleExpanded"
            :title="isExpanded ? '还原小窗' : '放大窗口'"
            :aria-label="isExpanded ? '还原 AI 问答小窗' : '放大 AI 问答窗口'"
          >
            <svg v-if="!isExpanded" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <path d="M8 3H3v5"></path>
              <path d="M16 3h5v5"></path>
              <path d="M21 16v5h-5"></path>
              <path d="M3 16v5h5"></path>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <path d="M8 3v5H3"></path>
              <path d="M16 3v5h5"></path>
              <path d="M21 16h-5v5"></path>
              <path d="M3 16h5v5"></path>
            </svg>
          </button>

          <button class="panel-action-btn" @click="emitClose" title="关闭助手 (Esc)" aria-label="关闭 AI 问答">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <!-- 聊天视口区域 -->
      <div class="chat-viewport" ref="viewport">
        <!-- 默认欢迎画面 (极其简约，无冗余内容) -->
        <div v-if="messages.length === 0" class="welcome-screen">
          <h2 class="welcome-title">您好！</h2>
          <p class="welcome-intro">
            我已接入学校知识库问答服务。您可以咨询课程、招生、学院概况、校园服务等问题。
          </p>
          
          <!-- 快捷提问 (精美行内微晶卡片) -->
          <div class="suggested-chips-wrapper">
            <button class="chip-btn" @click="submitSuggested('数智学院推免工作实施细则有哪些要求？')">
              <span class="chip-text">推免工作实施细则</span>
              <span class="chip-arrow">→</span>
            </button>
            <button class="chip-btn" @click="submitSuggested('介绍一下数智学院导师信息')">
              <span class="chip-text">导师信息查询</span>
              <span class="chip-arrow">→</span>
            </button>
            <button class="chip-btn" @click="submitSuggested('人工智能专业人才培养方案是什么？')">
              <span class="chip-text">人工智能专业培养方案</span>
              <span class="chip-arrow">→</span>
            </button>
          </div>
        </div>

        <!-- 消息记录渲染 -->
        <div v-else class="messages-list">
          <div 
            v-for="(msg, index) in messages" 
            :key="index"
            class="message-wrapper"
            :class="msg.role"
          >
            <!-- AI Spark 头像 (仅助手显示) -->
            <div class="message-avatar" v-if="msg.role === 'assistant'">
              <img src="@/assets/images/ai-chat-avatar.png" alt="" class="avatar-spark" />
            </div>

            <!-- 消息文本 -->
            <div class="message-bubble">
              <div class="bubble-content" v-html="formatMessageText(msg.text)"></div>
            </div>
          </div>

          <!-- AI 等待思考态 -->
          <div v-if="isThinking" class="message-wrapper assistant thinking">
            <div class="message-avatar">
              <img src="@/assets/images/ai-chat-avatar.png" alt="" class="avatar-spark spin-spark" />
            </div>
            <div class="message-bubble thinking-bubble">
              <div class="gemini-shimmer-loader">
                <span class="shimmer-dot"></span>
                <span class="shimmer-dot"></span>
                <span class="shimmer-dot"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 高阶简约输入面板 -->
      <footer class="sidebar-footer">
        <div class="input-area-box">
          <textarea 
            v-model="inputQuery" 
            placeholder="输入您的问题..." 
            rows="2"
            maxlength="200"
            :disabled="isBusy"
            @keydown="handleInputKeydown"
            ref="inputEl"
          ></textarea>
          
          <!-- 输入面板底部操作栏 -->
          <div class="input-actions-bar">
            <span class="input-char-count">{{ inputQuery.length }}/200</span>
            <button 
              class="send-message-btn" 
              :class="{ active: inputQuery.trim().length > 0 && !isBusy }"
              :disabled="isBusy || inputQuery.trim().length === 0"
              @click="submitMessage"
              title="发送"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
        <p class="assistant-provider">由 gdufe-agent.utopiacd.online 提供服务支持</p>
      </footer>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['close']);
const router = useRouter();

const CHAT_API_URL = (import.meta.env.VITE_CHAT_API_URL as string | undefined) || '/api/chat';

// Exit animation controls
const isClosing = ref(false);
const isExpanded = ref(false);
let activeController: AbortController | null = null;
let typewriterTimer: ReturnType<typeof window.setTimeout> | null = null;
let typewriterQueue = '';
let activeTypewriterMessage: Message | null = null;
let typewriterIdleResolver: (() => void) | null = null;

const TYPEWRITER_INTERVAL_MS = 14;
const TYPEWRITER_MAX_CHARS_PER_TICK = 3;

const emitClose = () => {
  abortActiveRequest();
  isClosing.value = true;
  setTimeout(() => {
    emit('close');
  }, 350); // Matches sliding transition speed
};

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
  void scrollToBottom();
};

// UI States
const inputQuery = ref('');
const isThinking = ref(false);
const isStreaming = ref(false);
const isBusy = computed(() => isThinking.value || isStreaming.value);
const viewport = ref<HTMLDivElement | null>(null);
const inputEl = ref<HTMLTextAreaElement | null>(null);

// Message interface
interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const messages = ref<Message[]>([]);

// Focus input on mount
onMounted(() => {
  nextTick(() => {
    inputEl.value?.focus();
    viewport.value?.addEventListener('click', handleChatLinkClicks);
    window.addEventListener('keydown', handleGlobalEsc);
  });
});

onUnmounted(() => {
  abortActiveRequest();
  resetTypewriter();
  viewport.value?.removeEventListener('click', handleChatLinkClicks);
  window.removeEventListener('keydown', handleGlobalEsc);
});

// ESC key to close
const handleGlobalEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emitClose();
  }
};

// Router linkages click handler
const handleChatLinkClicks = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const link = target.closest('a');
  if (link && link.getAttribute('href')?.startsWith('/')) {
    e.preventDefault();
    const href = link.getAttribute('href') || '/';
    emitClose();
    router.push(href);
  }
};

// Submit card suggestion
const submitSuggested = (query: string) => {
  inputQuery.value = query;
  void submitMessage();
};

const htmlEscapeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const escapeHtml = (value: string) => {
  return value.replace(/[&<>"']/g, char => htmlEscapeMap[char]);
};

const formatInlineMarkdown = (line: string) => {
  return escapeHtml(line)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g, (_match, label: string, href: string) => {
      const safeHref = href.startsWith('/') || /^https?:\/\//.test(href) ? href : '#';
      const targetAttrs = safeHref.startsWith('/') ? '' : ' target="_blank" rel="noopener noreferrer"';
      return `<a href="${escapeHtml(safeHref)}" class="chat-embedded-link"${targetAttrs}>${label}</a>`;
    });
};

// Safe lightweight Markdown rendering for knowledge-base answers.
const formatMessageText = (text: string) => {
  const blocks: string[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push(`<ul class="chat-list">${listItems.join('')}</ul>`);
      listItems = [];
    }
  };

  text.split(/\r?\n/).forEach(line => {
    const bulletMatch = line.match(/^\s*[-*]\s+(.+)$/);
    if (bulletMatch) {
      listItems.push(`<li class="chat-list-item">${formatInlineMarkdown(bulletMatch[1])}</li>`);
      return;
    }

    flushList();
    blocks.push(line.trim().length > 0 ? formatInlineMarkdown(line) : '<span class="chat-break"></span>');
  });

  flushList();
  return blocks.join('<br>');
};

// Scroll to viewport bottom
const scrollToBottom = async (behavior: ScrollBehavior = 'smooth') => {
  await nextTick();
  if (viewport.value) {
    viewport.value.scrollTo({
      top: viewport.value.scrollHeight,
      behavior
    });
  }
};

const extractChunkText = (payload: any): string => {
  return payload?.content || payload?.answer || payload?.delta?.content || payload?.choices?.[0]?.delta?.content || '';
};

const appendAssistantText = (message: Message, content: string) => {
  if (!content) return;
  message.text += content;
  void scrollToBottom('auto');
};

const resolveTypewriterIdle = () => {
  if (!typewriterIdleResolver) return;
  typewriterIdleResolver();
  typewriterIdleResolver = null;
};

const stepTypewriter = () => {
  typewriterTimer = null;

  if (!activeTypewriterMessage || typewriterQueue.length === 0) {
    resolveTypewriterIdle();
    return;
  }

  const nextChars = Array.from(typewriterQueue).slice(0, TYPEWRITER_MAX_CHARS_PER_TICK).join('');
  typewriterQueue = typewriterQueue.slice(nextChars.length);
  appendAssistantText(activeTypewriterMessage, nextChars);

  typewriterTimer = window.setTimeout(stepTypewriter, TYPEWRITER_INTERVAL_MS);
};

const enqueueAssistantText = (message: Message, content: string) => {
  if (!content) return;

  if (activeTypewriterMessage !== message) {
    typewriterQueue = '';
    activeTypewriterMessage = message;
    resolveTypewriterIdle();
  }

  typewriterQueue += content;

  if (!typewriterTimer) {
    typewriterTimer = window.setTimeout(stepTypewriter, TYPEWRITER_INTERVAL_MS);
  }
};

const waitForTypewriterIdle = () => {
  if (!typewriterTimer && typewriterQueue.length === 0) {
    return Promise.resolve();
  }

  return new Promise<void>(resolve => {
    typewriterIdleResolver = resolve;
  });
};

const resetTypewriter = () => {
  if (typewriterTimer) {
    window.clearTimeout(typewriterTimer);
    typewriterTimer = null;
  }

  typewriterQueue = '';
  activeTypewriterMessage = null;
  resolveTypewriterIdle();
};

const processSseLine = (line: string, assistantMessage: Message) => {
  const trimmed = line.trim();
  if (!trimmed || !trimmed.startsWith('data:')) return false;

  const data = trimmed.slice(5).trim();
  if (!data) return false;
  if (data === '[DONE]') return true;

  try {
    enqueueAssistantText(assistantMessage, extractChunkText(JSON.parse(data)));
  } catch {
    enqueueAssistantText(assistantMessage, data);
  }

  return false;
};

const requestStreamingAnswer = async (query: string) => {
  const controller = new AbortController();
  activeController = controller;
  resetTypewriter();
  isThinking.value = true;

  try {
    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: query,
        stream: true,
        retrieve_only: false
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      let errorDetail = '';
      try {
        errorDetail = await response.text();
      } catch {
        errorDetail = '';
      }
      throw new Error(errorDetail || `知识库服务返回 ${response.status}`);
    }

    const assistantMessage: Message = { role: 'assistant', text: '' };
    messages.value.push(assistantMessage);
    isThinking.value = false;

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const payload = await response.json();
      enqueueAssistantText(assistantMessage, extractChunkText(payload) || '知识库服务暂未返回可展示的回答。');
      await waitForTypewriterIdle();
      await scrollToBottom();
      return;
    }

    if (!response.body) {
      throw new Error('当前浏览器不支持流式响应读取。');
    }

    isStreaming.value = true;
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let doneSignalReceived = false;

    while (!doneSignalReceived) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (processSseLine(line, assistantMessage)) {
          doneSignalReceived = true;
          break;
        }
      }
    }

    buffer += decoder.decode();
    if (buffer.trim()) {
      processSseLine(buffer, assistantMessage);
    }

    await waitForTypewriterIdle();

    if (!assistantMessage.text.trim()) {
      assistantMessage.text = '知识库服务暂未返回可展示的回答。';
    }

    await scrollToBottom();
  } catch (error) {
    if (controller.signal.aborted) return;

    console.error('AI chat request failed:', error);
    messages.value.push({
      role: 'assistant',
      text: '抱歉，知识库问答服务暂时无法响应。请稍后再试，或联系网站管理员检查接口配置。'
    });
    await scrollToBottom();
  } finally {
    if (activeController === controller) {
      activeController = null;
    }
    isThinking.value = false;
    isStreaming.value = false;
  }
};

const abortActiveRequest = () => {
  if (activeController) {
    activeController.abort();
    activeController = null;
  }
  resetTypewriter();
  isThinking.value = false;
  isStreaming.value = false;
};

const handleInputKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    void submitMessage();
  }
};

// Send user message
const submitMessage = async () => {
  const query = inputQuery.value.trim();
  if (query.length === 0 || isBusy.value) return;

  messages.value.push({
    role: 'user',
    text: query
  });

  inputQuery.value = '';
  scrollToBottom();
  await requestStreamingAnswer(query);
};
</script>

<style scoped>
/* Non-blocking floating chat shell */
.gemini-chat-overlay {
  position: fixed;
  right: 28px;
  bottom: calc(28px + env(safe-area-inset-bottom));
  z-index: 99999;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.35s ease;
  animation: fade-in-keyframes 0.35s forwards;
}

@keyframes fade-in-keyframes {
  to { opacity: 1; }
}

/* Exit fade-out transition */
.gemini-chat-overlay.fade-out-active {
  animation: fade-out-keyframes 0.35s forwards;
}

@keyframes fade-out-keyframes {
  to { opacity: 0; }
}

.gemini-sidebar-panel {
  width: min(420px, calc(100vw - 32px));
  height: min(620px, calc(100vh - 96px));
  max-height: calc(100vh - 96px);
  background-color: #ffffff; /* Clean light background */
  border: 1px solid rgba(13, 27, 42, 0.08);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 22px 50px rgba(45, 8, 59, 0.18);
  box-sizing: border-box;
  overflow: hidden;
  pointer-events: auto;
  transform: translateY(18px) scale(0.96);
  transform-origin: right bottom;
  transition:
    width 0.28s ease,
    height 0.28s ease,
    max-height 0.28s ease,
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform; /* Hardware acceleration for 60fps performance */
  animation: slide-in-keyframes 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.gemini-sidebar-panel.expanded {
  width: min(720px, calc(100vw - 56px));
  height: min(780px, calc(100vh - 56px));
  max-height: calc(100vh - 56px);
}

@keyframes slide-in-keyframes {
  to { transform: translateY(0) scale(1); }
}

/* Exit slide-out transition */
.gemini-sidebar-panel.slide-out-active {
  animation: slide-out-keyframes 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slide-out-keyframes {
  to {
    opacity: 0;
    transform: translateY(18px) scale(0.96);
  }
}

/* Header style - clean white academic look */
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  border-bottom: 1px solid rgba(13, 27, 42, 0.06);
  background-color: #ffffff;
  flex-shrink: 0;
  box-shadow: 0 2px 12px rgba(123, 44, 191, 0.03); /* Soft elegant violet shadow */
}

.brand-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.spark-logo-animate {
  width: 38px;
  height: 38px;
  border-radius: 9px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.gemini-sparkle {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-text {
  display: flex;
  align-items: center;
}

.brand-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin: 0;
  font-family: var(--font-heading);
}

.window-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.panel-action-btn {
  background: none;
  border: none;
  color: #334155; /* Force rich slate-grey to avoid white close icon inheritance */
  opacity: 0.65;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;
}

.panel-action-btn:hover {
  background-color: rgba(123, 44, 191, 0.05);
  color: var(--primary-color);
  opacity: 1;
  transform: scale(1.05);
}

.panel-action-btn svg {
  width: 18px;
  height: 18px;
}

/* Chat view area */
.chat-viewport {
  flex-grow: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  background-color: #fcfbfe; /* Extremely soft purple tint background */
}

.chat-viewport::-webkit-scrollbar {
  width: 5px;
}

.chat-viewport::-webkit-scrollbar-track {
  background: transparent;
}

.chat-viewport::-webkit-scrollbar-thumb {
  background: rgba(123, 44, 191, 0.15); /* Sleek purple mini handle */
  border-radius: 4px;
}

.chat-viewport::-webkit-scrollbar-thumb:hover {
  background: rgba(123, 44, 191, 0.3);
}

/* Welcome view design (Strictly minimal) */
.welcome-screen {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.welcome-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--secondary-color);
  margin: 0 0 10px 0;
}

.welcome-intro {
  color: #475569; /* Explicit deep slate text color */
  font-size: 0.88rem;
  line-height: 1.6;
  margin: 0 0 24px 0;
}

/* Suggested chips wrapper (inline text-buttons instead of huge grids) */
.suggested-chips-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
}

.chip-btn {
  background-color: #ffffff;
  border: 1px solid rgba(13, 27, 42, 0.06);
  color: #334155; /* Explicit clean grey-slate text color */
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 2px 8px rgba(13, 27, 42, 0.02);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.chip-btn:hover {
  background-color: rgba(123, 44, 191, 0.02);
  color: var(--primary-color);
  border-color: rgba(123, 44, 191, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(123, 44, 191, 0.06);
}

.chip-arrow {
  color: var(--primary-color);
  font-weight: 700;
  transition: transform 0.3s ease;
}

.chip-btn:hover .chip-arrow {
  transform: translateX(4px);
}

/* Chat bubble styling */
.messages-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding-bottom: 24px; /* Proper bottom boundary breathing room */
}

.message-wrapper {
  display: flex;
  width: 100%;
}

/* User Bubble: Asymmetric rounded purple capsule */
.message-wrapper.user {
  justify-content: flex-end;
}

.message-wrapper.user .message-bubble {
  background-color: #f2eafb; 
  color: #3b0764; /* Explicit rich deep-purple text to avoid inheritance issue */
  border-radius: 16px 16px 4px 16px;
  max-width: 85%;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(123, 44, 191, 0.04);
  border: 1px solid rgba(123, 44, 191, 0.06);
}

/* Assistant Bubble: Plain clean layout next to top-aligned spark */
.message-wrapper.assistant {
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
}

.message-avatar {
  width: 34px;
  height: 34px;
  background-color: #ffffff;
  border: 1px solid rgba(123, 44, 191, 0.12);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: flex-start; /* Ensures avatar never compresses or centers */
  margin-top: 4px; /* Perfect baseline align with first bubble text line */
}

.avatar-spark {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.spin-spark {
  animation: avatar-pulsate-keyframes 2.5s infinite ease-in-out;
}

@keyframes avatar-pulsate-keyframes {
  0%, 100% { transform: scale(0.96); opacity: 0.85; }
  50% { transform: scale(1.04); opacity: 1; }
}

.message-wrapper.assistant .message-bubble {
  max-width: 82%;
  color: #1e293b; /* Explicit deep slate text color to prevent any white-color inheritances */
  background-color: #ffffff;
  border-radius: 4px 16px 16px 16px;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(13, 27, 42, 0.02);
  border: 1px solid rgba(13, 27, 42, 0.05);
}

/* bubble texts formatting */
.bubble-content {
  font-size: 0.88rem;
  line-height: 1.6;
}

:deep(.bubble-content strong) {
  color: var(--secondary-color);
  font-weight: 700;
}

:deep(.chat-list) {
  padding-left: 20px;
  margin: 8px 0;
  list-style-type: disc;
}

:deep(.chat-break) {
  display: block;
  height: 4px;
}

:deep(.chat-list-item) {
  margin-bottom: 6px;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #1e293b; /* Explicit slate list item */
}

:deep(.chat-embedded-link) {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 700;
  border-bottom: 1px dashed var(--primary-color);
  transition: all 0.3s;
  padding: 0 2px;
}

:deep(.chat-embedded-link::after) {
  content: ' ↗';
  font-size: 0.75rem;
  font-weight: normal;
  display: inline-block;
  transition: transform 0.25s ease;
}

:deep(.chat-embedded-link:hover::after) {
  transform: translate(1px, -1px);
}

:deep(.chat-embedded-link:hover) {
  color: var(--accent-color);
  border-bottom-color: var(--accent-color);
  background-color: rgba(123, 44, 191, 0.05);
}

/* Thinking dynamic dot shimmer */
.thinking-bubble {
  background-color: #ffffff;
  border: 1px solid rgba(13, 27, 42, 0.05);
  border-radius: 4px 16px 16px 16px;
  padding: 12px 16px;
}

.gemini-shimmer-loader {
  display: flex;
  gap: 4px;
  align-items: center;
  height: 10px;
}

.shimmer-dot {
  width: 6px;
  height: 6px;
  background-color: var(--primary-color);
  border-radius: 50%;
  animation: shimmer-pulsate-keyframes 1.2s infinite ease-in-out;
  opacity: 0.7;
}

.shimmer-dot:nth-child(2) {
  animation-delay: 0.2s;
  opacity: 0.85;
}

.shimmer-dot:nth-child(3) {
  animation-delay: 0.4s;
  opacity: 1;
}

@keyframes shimmer-pulsate-keyframes {
  0%, 100% { transform: scale(0.85); opacity: 0.4; }
  50% { transform: scale(1.25); opacity: 1; }
}

/* Footer panel - clean academic border */
.sidebar-footer {
  padding: 16px 24px 24px 24px;
  background-color: #ffffff;
  border-top: 1px solid rgba(13, 27, 42, 0.06);
  flex-shrink: 0;
}

/* ChatGPT / Gemini Style Advanced Textarea Container */
.input-area-box {
  background-color: #f8f9fa;
  border: 1px solid rgba(13, 27, 42, 0.08);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 10px 14px 8px 14px;
  transition: all 0.25s ease-in-out;
}

.input-area-box:focus-within {
  background-color: #ffffff;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(123, 44, 191, 0.08);
}

.input-area-box textarea {
  width: 100%;
  background: none;
  border: none;
  outline: none;
  color: #1e293b; /* FORCE rich deep-slate black text on input. Resolves white text bug 100%! */
  font-size: 0.88rem;
  resize: none;
  font-family: inherit;
  line-height: 1.5;
  padding: 0;
  min-height: 48px;
  max-height: 100px;
}

.input-area-box textarea::placeholder {
  color: #94a3b8; /* FORCE rich soft grey-slate placeholder color! */
  opacity: 1;
}

.input-area-box textarea:disabled {
  cursor: progress;
}

.assistant-provider {
  margin: 10px 0 0;
  text-align: center;
  font-size: 0.72rem;
  line-height: 1.2;
  color: #94a3b8;
}

/* Advanced integrated actions bar under textarea */
.input-actions-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  border-top: 1px solid rgba(13, 27, 42, 0.04);
  padding-top: 6px;
}

.input-char-count {
  font-size: 0.72rem;
  color: #94a3b8; /* Rich slate gray color count */
  letter-spacing: 0.3px;
}

.send-message-btn {
  background-color: rgba(13, 27, 42, 0.02);
  border: 1px solid rgba(13, 27, 42, 0.04);
  color: rgba(13, 27, 42, 0.25);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.send-message-btn.active {
  background-color: var(--primary-color);
  color: #ffffff;
  border-color: var(--primary-color);
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(123, 44, 191, 0.15);
}

.send-message-btn.active:hover {
  transform: scale(1.05);
}

.send-message-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.send-message-btn svg {
  width: 13px;
  height: 13px;
}

/* Mobile responsive drawer overlay */
@media (max-width: 480px) {
  .gemini-chat-overlay {
    right: 12px;
    bottom: calc(12px + env(safe-area-inset-bottom));
  }

  .gemini-sidebar-panel {
    width: calc(100vw - 24px);
    height: min(560px, calc(100vh - 80px));
    max-height: calc(100vh - 80px);
  }

  .gemini-sidebar-panel.expanded {
    width: calc(100vw - 24px);
    height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);
  }

  .sidebar-header {
    padding: 0 16px;
  }

  .chat-viewport {
    padding: 18px;
  }

  .sidebar-footer {
    padding: 14px 16px 16px;
  }
}
</style>

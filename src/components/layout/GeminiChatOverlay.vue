<template>
  <div class="gemini-chat-overlay" :class="{ 'fade-out-active': isClosing }" @click.self="emitClose">
    <!-- 右侧简约弹出面板 (极简浅色学术风) -->
    <div class="gemini-sidebar-panel" :class="{ 'slide-out-active': isClosing }">
      
      <!-- 简约页眉 -->
      <header class="sidebar-header">
        <div class="brand-group">
          <div class="spark-logo-animate">
            <svg viewBox="0 0 24 24" fill="currentColor" class="gemini-sparkle">
              <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z"></path>
            </svg>
          </div>
          <div class="brand-text">
            <h3 class="brand-name">学院数智 AI 助手</h3>
          </div>
        </div>
        
        <button class="close-panel-btn" @click="emitClose" title="关闭助手 (Esc)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </header>

      <!-- 聊天视口区域 -->
      <div class="chat-viewport" ref="viewport">
        <!-- 默认欢迎画面 (极其简约，无冗余内容) -->
        <div v-if="messages.length === 0" class="welcome-screen">
          <h2 class="welcome-title">您好！</h2>
          <p class="welcome-intro">
            我是大数据与人工智能学院的数智助手。有什么我可以帮您的？您可以直接在下方输入框提问，或者选择以下核心问题：
          </p>
          
          <!-- 快捷提问 (精美行内微晶卡片) -->
          <div class="suggested-chips-wrapper">
            <button class="chip-btn" @click="submitSuggested('介绍一下大数据与人工智能学院')">
              <span class="chip-text">介绍学院基本概况</span>
              <span class="chip-arrow">→</span>
            </button>
            <button class="chip-btn" @click="submitSuggested('关于学院2026年硕士研究生考试调剂和奖学金政策')">
              <span class="chip-text">了解考研与调剂政策</span>
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
              <svg viewBox="0 0 24 24" fill="currentColor" class="avatar-spark">
                <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z"></path>
              </svg>
            </div>

            <!-- 消息文本 -->
            <div class="message-bubble">
              <div class="bubble-content" v-html="formatMessageText(msg.text)"></div>
            </div>
          </div>

          <!-- AI 等待思考态 -->
          <div v-if="isThinking" class="message-wrapper assistant thinking">
            <div class="message-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor" class="avatar-spark spin-spark">
                <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z"></path>
              </svg>
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
            @keydown.prevent.enter="submitMessage"
            ref="inputEl"
          ></textarea>
          
          <!-- 输入面板底部操作栏 -->
          <div class="input-actions-bar">
            <span class="input-char-count">{{ inputQuery.length }}/200</span>
            <button 
              class="send-message-btn" 
              :class="{ active: inputQuery.trim().length > 0 }"
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
      </footer>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['close']);
const router = useRouter();

// Exit animation controls
const isClosing = ref(false);

const emitClose = () => {
  isClosing.value = true;
  setTimeout(() => {
    emit('close');
  }, 350); // Matches sliding transition speed
};

// UI States
const inputQuery = ref('');
const isThinking = ref(false);
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
  submitMessage();
};

// Markdown parsing simple regex
const formatMessageText = (text: string) => {
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.*?)$/gm, '<li class="chat-list-item">$1</li>')
    .replace(/((?:<li class="chat-list-item">.*?<\/li>\s*)+)/g, '<ul class="chat-list">$1</ul>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="chat-embedded-link">$1</a>');
  return formatted;
};

// Scroll to viewport bottom
const scrollToBottom = async () => {
  await nextTick();
  if (viewport.value) {
    viewport.value.scrollTo({
      top: viewport.value.scrollHeight,
      behavior: 'smooth'
    });
  }
};

// AI simulated response logic
const simulateAiResponse = (userText: string) => {
  isThinking.value = true;
  scrollToBottom();

  let responseText = '';
  const text = userText.toLowerCase();

  if (text.includes('介绍') || text.includes('学院') || text.includes('概况') || text.includes('关于')) {
    responseText = "**广东财经大学大数据与人工智能学院**是一所紧跟粤港澳大湾区数字化产业需求建设的高起点、强特色二级学院。\n- **学科专业特色**：聚焦“人工智能+”与“大数据+”的商科交叉特色，拥有一流的现代化科研算力中心与重点机房。\n- **学科研究平台**：学院设有广东省数智技术与商业分析重点实验室，产学联合孵化环境极为突出。\n- **海归师资力量**：汇聚了数十名海外名校博士、IEEE资深专家及行业杰出学者授课授业，践行产教联合育人模式。\n*详情参考以下链接：*\n👉 [查看学院简介](/about) | 👉 [了解学科建设](/about#discipline)";
  } 
  else if (text.includes('招生') || text.includes('调剂') || text.includes('考研') || text.includes('学费') || text.includes('专业') || text.includes('奖学金') || text.includes('硕士')) {
    responseText = "**学院2026年硕士研究生招生与调剂指南**：\n- **招生专业目录**：\n  1. *智能科学与技术（学硕）*：初试统考数一、英一，专业自命题科目为《812 计算机学科基础》。\n  2. *计算机技术（专硕）*：初试统考数二、英二，自命题科目为《812 计算机学科基础》。\n- **调剂与机试安排**：\n  - 国家调剂系统通常于 4 月中旬开放，复试包括专业代码机试 (30%)、线下专家综合面试 (50%) 及英语口语听力 (20%)。\n- **科创奖学金政策**：\n  - 除常规国家和学校助学外，设有 *腾讯之友社会奖学金*、*数智英才奖*，团队发表国际顶尖会议或斩获国赛大奖最高可获 **30,000元** 的现金重奖。\n*详情参考以下链接：*\n👉 [研究生招生简章](/news/12) | 👉 [调剂工作办法](/news/14)";
  } 
  else if (text.includes('挑战杯') || text.includes('特等奖') || text.includes('科创') || text.includes('竞赛')) {
    responseText = "**第十六届“挑战杯”全国特等奖项目及技术指标**：\n- **项目名称**：《基于自适应多模态大模型的智能金融实时风险控制系统》\n- **关键算法创新**：\n  - 独创性地提出了 **“轻量化低延迟混合注意力机制”**，成功将传统 Transformer 的二次方级空间开销降低至 **准线性 (O(N)) 复杂度**。\n  - 达成决策端响应延迟低于 **30毫秒**，欺诈特征提取成功率达 **99.8%**。\n- **辉煌荣誉**：最终以优异的技术沉淀，在数万个高校竞演项目中脱颖而出，荣获**全国特等奖**，创下我院历史最好成绩。\n*详情参考以下链接：*\n👉 [挑战杯获奖详情](/news/1) | 👉 [教师学术成果](/news/4)";
  } 
  else if (text.includes('风采') || text.includes('图片') || text.includes('画廊') || text.includes('机房') || text.includes('图书馆') || text.includes('展示') || text.includes('看图')) {
    responseText = "**学院风采与学术场景朝圣**：\n您可以前往我们的专属图片展墙进行沉浸式放映：\n- **数智极客实验室**：配备高性能多卡液冷 GPU 计算集群，提供全天候算力。\n- **逸夫图书馆**：红墙绿树，馆藏数百万册数智学科前沿文献专著。\n- **佛山校区绿道**：书香桂花交融，为师生课余灵感探讨提供惬意空间。\n*详情参考以下链接：*\n👉 [前往学院风采图片展墙](/showcase)";
  } 
  else {
    responseText = "您好！我是大数据与人工智能学院的数智助手。\n我能够为您解答以下事宜：\n- **学院基本概况** (输入：介绍学院)\n- **研究生报考与调剂指南** (输入：考研调剂)\n- **学生“挑战杯”国赛特等奖成果** (输入：挑战杯)\n- **校园风光与实验室实景风采** (输入：展示风采)\n\n请问您有什么需要具体了解的吗？您也可以点击上方的快捷按钮开始对话。";
  }

  setTimeout(() => {
    isThinking.value = false;
    const newMsg: Message = { role: 'assistant', text: '' };
    messages.value.push(newMsg);

    let currentIdx = 0;
    const textLength = responseText.length;
    const charsPerTick = 3;

    const typingTimer = setInterval(() => {
      if (currentIdx < textLength) {
        newMsg.text += responseText.slice(currentIdx, currentIdx + charsPerTick);
        currentIdx += charsPerTick;
        scrollToBottom();
      } else {
        newMsg.text = responseText;
        clearInterval(typingTimer);
        scrollToBottom();
      }
    }, 15);
  }, 800);
};

// Send user message
const submitMessage = () => {
  const query = inputQuery.value.trim();
  if (query.length === 0 || isThinking.value) return;

  messages.value.push({
    role: 'user',
    text: query
  });

  inputQuery.value = '';
  scrollToBottom();
  simulateAiResponse(query);
};
</script>

<style scoped>
/* Backdrop overlay layer with dark glass background */
.gemini-chat-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(13, 27, 42, 0.15); /* Very light grey-blue glass */
  backdrop-filter: blur(5px);
  z-index: 99999;
  display: flex;
  justify-content: flex-end; /* Align slide panel to the right */
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

/* Minimalist Right Sidebar Panel Container (Light Academic Theme) */
.gemini-sidebar-panel {
  width: 440px;
  max-width: 100%;
  height: 100%;
  background-color: #ffffff; /* Clean light background */
  border-left: 1px solid rgba(13, 27, 42, 0.08);
  display: flex;
  flex-direction: column;
  box-shadow: -6px 0 30px rgba(13, 27, 42, 0.08);
  box-sizing: border-box;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform; /* Hardware acceleration for 60fps performance */
  animation: slide-in-keyframes 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slide-in-keyframes {
  to { transform: translateX(0); }
}

/* Exit slide-out transition */
.gemini-sidebar-panel.slide-out-active {
  animation: slide-out-keyframes 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slide-out-keyframes {
  to { transform: translateX(100%); }
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
  color: var(--primary-color);
  display: flex;
  align-items: center;
}

.gemini-sparkle {
  width: 20px;
  height: 20px;
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

.close-panel-btn {
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

.close-panel-btn:hover {
  background-color: rgba(123, 44, 191, 0.05);
  color: var(--primary-color);
  opacity: 1;
  transform: scale(1.05);
}

.close-panel-btn svg {
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
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  border: 1px solid rgba(123, 44, 191, 0.12);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: flex-start; /* Ensures avatar never compresses or centers */
  margin-top: 4px; /* Perfect baseline align with first bubble text line */
}

.avatar-spark {
  width: 14px;
  height: 14px;
  color: var(--primary-color);
}

.spin-spark {
  animation: avatar-pulsate-keyframes 2.5s infinite ease-in-out;
}

@keyframes avatar-pulsate-keyframes {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
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

.send-message-btn svg {
  width: 13px;
  height: 13px;
}

/* Mobile responsive drawer overlay */
@media (max-width: 480px) {
  .gemini-sidebar-panel {
    width: 100vw;
  }
}
</style>

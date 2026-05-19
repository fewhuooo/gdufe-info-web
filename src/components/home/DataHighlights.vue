<template>
  <section class="data-highlights">
    <div class="container">
      <div class="highlights-grid">
        <div class="highlight-item" v-for="item in highlights" :key="item.label">
          <div class="icon-wrapper">
            <component :is="item.icon" :size="32" />
          </div>
          <div class="data-content">
            <div class="data-value">
              <count-up :end-val="item.value" :duration="2.5" />
              <span class="suffix">{{ item.suffix }}</span>
            </div>
            <div class="data-label">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { GraduationCap, Users, FileText, Trophy } from "lucide-vue-next";
import CountUp from "vue-countup-v3";

const highlights = [
  { icon: GraduationCap, value: 6, suffix: "个", label: "本科专业" },
  { icon: Users, value: 80, suffix: "+", label: "教职人员" },
  { icon: FileText, value: 200, suffix: "+", label: "科研论文" },
  { icon: Trophy, value: 50, suffix: "+", label: "竞赛获奖" },
];
</script>

<style scoped>
.data-highlights {
  padding: 60px 0;
  background-color: var(--bg-card);
  box-shadow: var(--shadow-sm);
  position: relative;
  z-index: 10;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.highlight-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px;
  transition: transform 0.3s ease;
}

.highlight-item:hover {
  transform: translateY(-4px);
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(26, 92, 175, 0.1);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.data-value {
  font-family: var(--font-data);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--secondary-color);
  line-height: 1.2;
}

.suffix {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-left: 4px;
}

.data-label {
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-top: 4px;
}

@media (max-width: 1024px) {
  .highlights-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .highlights-grid {
    grid-template-columns: 1fr;
  }
}
</style>

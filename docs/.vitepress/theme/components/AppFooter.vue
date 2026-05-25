<script setup lang="ts">
const columns = [
  {
    heading: '快速开始',
    links: [
      { text: 'Flutter 简介', href: '/guide/introduction' },
      { text: '环境搭建', href: '/guide/setup' },
      { text: '第一个应用', href: '/guide/first-app' }
    ]
  },
  {
    heading: '知识库模块',
    links: [
      { text: '核心概念', href: '/01-核心概念/00-核心概念索引' },
      { text: 'Widget 系统', href: '/04-Widget系统/00-Widget系统索引' },
      { text: '状态管理', href: '/05-状态管理/00-状态管理索引' },
      { text: '第三方库', href: '/13-第三方库/00-第三方库索引' }
    ]
  },
  {
    heading: '进阶学习',
    links: [
      { text: '性能优化', href: '/11-性能优化/00-性能优化索引' },
      { text: '项目实战', href: '/12-项目实战/00-项目实战索引' },
      { text: '面试与进阶', href: '/14-面试与进阶/00-面试与进阶索引' },
      { text: '完整知识库', href: '/handbook/' }
    ]
  },
  {
    heading: '官方资源',
    links: [
      { text: 'Flutter 文档', href: 'https://flutter.dev/docs' },
      { text: 'Dart 文档', href: 'https://dart.dev/guides' },
      { text: 'Flutter GitHub', href: 'https://github.com/flutter/flutter' },
      { text: '知识库 GitHub', href: 'https://github.com/liudonjun/Flutter-Knowledge-Base' }
    ]
  }
]
</script>

<template>
  <footer class="ft">
    <div class="ft__inner">
      <p class="ft__lead">Flutter 知识库</p>
      <div class="ft__cols">
        <div v-for="col in columns" :key="col.heading" class="ft__col">
          <h4>{{ col.heading }}</h4>
          <ul>
            <li v-for="link in col.links" :key="link.text">
              <a :href="link.href">{{ link.text }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="ft__bar">
      <div class="ft__bar-inner">
        <div class="ft__legal">
          <a href="/handbook/">知识库导读</a>
          <a href="https://github.com/liudonjun/Flutter-Knowledge-Base">GitHub</a>
        </div>
        <div class="ft__copy">© {{ new Date().getFullYear() }} Flutter 知识库 — 基于 VitePress 构建</div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ft {
  background: var(--fluent-subtle);
  color: var(--fluent-fg-muted);
  border-top: 1px solid var(--fluent-border);
}
.ft__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 56px 32px 32px;
}
.ft__lead {
  margin: 0 0 24px;
  color: var(--fluent-fg);
  font-weight: 600;
}
.ft__cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 32px 24px;
}
.ft__col h4 {
  color: var(--fluent-fg);
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.ft__col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}
.ft__col a {
  color: var(--fluent-fg-muted);
  font-size: 13px;
  text-decoration: none;
}
.ft__col a:hover { color: var(--fluent-accent); text-decoration: underline; }

.ft__bar {
  border-top: 1px solid var(--fluent-border);
  background: var(--fluent-subtle-2);
}
.ft__bar-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 18px 32px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 12px;
}
.ft__legal { display: flex; gap: 18px; flex-wrap: wrap; }
.ft__legal a {
  color: var(--fluent-fg-muted);
  text-decoration: none;
}
.ft__legal a:hover { color: var(--fluent-accent); }
.ft__copy { color: var(--fluent-fg-muted); }

@media (max-width: 640px) {
  .ft__inner { padding: 40px 20px 24px; }
  .ft__bar-inner { padding: 16px 20px; }
}
</style>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const nav = [
  { text: '指南', href: '/guide/introduction' },
  { text: '核心概念', href: '/core/architecture' },
  { text: '完整知识库', href: '/handbook/' },
  { text: '实战项目', href: '/projects/' },
  { text: '学习资源', href: '/resources/official' }
]
</script>

<template>
  <header class="hdr" :class="{ 'hdr--scrolled': scrolled }">
    <div class="hdr__inner">
      <a class="brand" href="/">
        <span class="brand__mark" aria-hidden="true">
          <span class="sq" />
          <span class="sq" />
          <span class="sq" />
          <span class="sq" />
        </span>
        <span class="brand__name">Flutter 知识库</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a v-for="item in nav" :key="item.text" :href="item.href" class="nav__link">
          {{ item.text }}
        </a>
      </nav>

      <div class="actions">
        <fluent-anchor href="/handbook/" appearance="hypertext" class="actions__link">
          浏览长文
        </fluent-anchor>
        <fluent-anchor appearance="accent" href="/guide/introduction">开始学习</fluent-anchor>
      </div>

      <button
        class="burger"
        aria-label="Toggle menu"
        :aria-expanded="mobileOpen"
        @click="mobileOpen = !mobileOpen"
      >
        <span /><span /><span />
      </button>
    </div>

    <div v-if="mobileOpen" class="drawer">
      <a v-for="item in nav" :key="item.text" :href="item.href" @click="mobileOpen = false">
        {{ item.text }}
      </a>
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: saturate(180%) blur(12px);
  background: color-mix(in srgb, var(--fluent-bg) 85%, transparent);
  transition: box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  border-bottom: 1px solid transparent;
}
.hdr--scrolled {
  border-bottom-color: var(--fluent-border);
  box-shadow: 0 1px 2px rgba(var(--fluent-shadow-rgb), 0.04);
}
.hdr__inner {
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 24px;
  padding: 14px 32px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
  font-weight: 600;
}
.brand__mark {
  display: inline-grid;
  grid-template: repeat(2, 10px) / repeat(2, 10px);
  gap: 2px;
}
.sq {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: var(--fluent-accent);
}
.sq:nth-child(2) { opacity: 0.7; }
.sq:nth-child(3) { opacity: 0.55; }
.sq:nth-child(4) { opacity: 0.4; }
.brand__name {
  font-size: 15px;
  letter-spacing: -0.01em;
}

.nav {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
}
.nav__link {
  padding: 6px 12px;
  font-size: 13px;
  color: var(--fluent-fg-muted);
  text-decoration: none;
  border-radius: 4px;
  white-space: nowrap;
  transition: color 0.15s ease, background 0.15s ease;
}
.nav__link:hover {
  color: var(--fluent-fg);
  background: var(--fluent-subtle);
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.actions__link {
  font-size: 13px;
}

.burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  border: 0;
  background: transparent;
  padding: 8px;
  cursor: pointer;
}
.burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--fluent-fg);
  border-radius: 2px;
}

.drawer {
  display: none;
  flex-direction: column;
  padding: 12px 24px 20px;
  gap: 4px;
  border-top: 1px solid var(--fluent-border);
}
.drawer a {
  padding: 10px 8px;
  color: var(--fluent-fg);
  text-decoration: none;
  border-radius: 6px;
}
.drawer a:hover { background: var(--fluent-subtle); }

@media (max-width: 960px) {
  .hdr__inner { grid-template-columns: auto 1fr auto; padding: 12px 18px; }
  .nav { display: none; }
  .actions { gap: 8px; }
  .actions__link { display: none; }
  .burger { display: inline-flex; }
  .drawer { display: flex; }
}
</style>

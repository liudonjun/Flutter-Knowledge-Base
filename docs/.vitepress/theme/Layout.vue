<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { inBrowser, useData } from 'vitepress'
import { computed, watch } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const { Layout } = DefaultTheme
const { frontmatter, isDark } = useData()

const isFluentHome = computed(() => frontmatter.value.layout === 'fluent-home')

if (inBrowser) {
  watch(
    isDark,
    (dark) => {
      import('./fluent.client').then(({ setFluentTheme }) => {
        setFluentTheme(dark ? 'dark' : 'light')
      })
    },
    { immediate: true }
  )
}
</script>

<template>
  <div v-if="isFluentHome" class="fluent-page">
    <AppHeader />
    <main class="fluent-main">
      <slot />
      <Content />
    </main>
    <AppFooter />
  </div>
  <Layout v-else />
</template>

<style scoped>
.fluent-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--fluent-bg);
  color: var(--fluent-fg);
}

.fluent-main {
  flex: 1;
  width: 100%;
}
</style>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
  primaryText?: string
  primaryHref?: string
  secondaryText?: string
  secondaryHref?: string
}

withDefaults(defineProps<Props>(), {
  primaryText: 'Start free',
  primaryHref: '#start'
})
</script>

<template>
  <section class="cta">
    <div class="cta__card">
      <div>
        <h2 class="cta__title">{{ title }}</h2>
        <p v-if="description" class="cta__desc">{{ description }}</p>
      </div>
      <div class="cta__actions">
        <fluent-anchor appearance="accent" :href="primaryHref">
          {{ primaryText }}
        </fluent-anchor>
        <fluent-anchor v-if="secondaryText" appearance="outline" :href="secondaryHref ?? '#'">
          {{ secondaryText }}
        </fluent-anchor>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding: 56px 32px 96px;
  max-width: 1280px;
  margin: 0 auto;
}
.cta__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  padding: 64px 32px;
  border-radius: 16px;
  background:
    radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--fluent-accent) 10%, transparent), transparent 60%),
    var(--fluent-surface);
  border: 1px solid var(--fluent-border);
}
.cta__title {
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0;
}
.cta__desc {
  color: var(--fluent-fg-muted);
  font-size: 17px;
  line-height: 1.55;
  margin: 0;
  max-width: 640px;
}
.cta__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
@media (max-width: 640px) {
  .cta { padding: 40px 20px 72px; }
  .cta__card { padding: 36px 20px; }
}
</style>

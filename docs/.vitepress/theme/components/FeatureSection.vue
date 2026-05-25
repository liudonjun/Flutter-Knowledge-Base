<script setup lang="ts">
interface Props {
  eyebrow?: string
  title: string
  description?: string
  reverse?: boolean
  image?: string
  bullets?: string[]
  ctaText?: string
  ctaHref?: string
}

withDefaults(defineProps<Props>(), {
  reverse: false,
  bullets: () => []
})
</script>

<template>
  <section class="fs" :class="{ 'fs--reverse': reverse }">
    <div class="fs__wrap">
      <div class="fs__copy">
        <span v-if="eyebrow" class="fs__eyebrow">{{ eyebrow }}</span>
        <h2 class="fs__title">{{ title }}</h2>
        <p v-if="description" class="fs__desc">{{ description }}</p>
        <ul v-if="bullets.length" class="fs__list">
          <li v-for="b in bullets" :key="b">
            <span class="check" aria-hidden="true">✓</span>
            {{ b }}
          </li>
        </ul>
        <fluent-anchor v-if="ctaText" appearance="accent" :href="ctaHref ?? '#'">
          {{ ctaText }}
        </fluent-anchor>
      </div>

      <div class="fs__visual">
        <slot>
          <div v-if="image" class="fs__image" :style="{ backgroundImage: `url(${image})` }" />
          <div v-else class="fs__placeholder">
            <span class="shape shape--a" />
            <span class="shape shape--b" />
            <span class="shape shape--c" />
          </div>
        </slot>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fs {
  padding: 80px 32px;
  background: var(--fluent-subtle);
}
.fs:nth-of-type(even) { background: transparent; }
.fs__wrap {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
.fs--reverse .fs__wrap { direction: rtl; }
.fs--reverse .fs__copy,
.fs--reverse .fs__visual { direction: ltr; }

.fs__eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fluent-accent);
  margin-bottom: 12px;
}
.fs__title {
  font-size: clamp(28px, 3.2vw, 40px);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 16px;
  line-height: 1.15;
}
.fs__desc {
  color: var(--fluent-fg-muted);
  font-size: 17px;
  line-height: 1.6;
  margin: 0 0 20px;
}
.fs__list {
  list-style: none;
  margin: 0 0 28px;
  padding: 0;
  display: grid;
  gap: 10px;
}
.fs__list li {
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 10px;
  align-items: start;
  font-size: 15px;
  color: var(--fluent-fg);
}
.check {
  width: 22px; height: 22px;
  display: grid; place-items: center;
  border-radius: 50%;
  background: color-mix(in srgb, var(--fluent-accent) 15%, transparent);
  color: var(--fluent-accent);
  font-weight: 700;
  font-size: 13px;
}

.fs__visual { min-height: 320px; display: flex; }
.fs__image {
  width: 100%;
  min-height: 320px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  box-shadow: 0 16px 32px -18px rgba(var(--fluent-shadow-rgb), 0.25);
}
.fs__placeholder {
  position: relative;
  width: 100%;
  min-height: 340px;
  border-radius: 12px;
  background:
    radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--fluent-accent) 10%, transparent), transparent 65%),
    var(--fluent-subtle);
  border: 1px solid var(--fluent-border);
  overflow: hidden;
}
.shape {
  position: absolute;
  border-radius: 12px;
  background: var(--fluent-surface);
  border: 1px solid var(--fluent-border);
  box-shadow: 0 6px 16px -8px rgba(var(--fluent-shadow-rgb), 0.15);
}
.shape--a { width: 52%; height: 44%; top: 14%; left: 10%; }
.shape--b { width: 38%; height: 34%; top: 46%; left: 36%; transform: rotate(-6deg); }
.shape--c {
  width: 30%; height: 28%; top: 22%; right: 10%;
  transform: rotate(8deg);
  background: var(--fluent-accent);
  border-color: transparent;
  opacity: 0.9;
}

@media (max-width: 900px) {
  .fs { padding: 56px 20px; }
  .fs__wrap { grid-template-columns: 1fr; gap: 36px; }
  .fs--reverse .fs__wrap { direction: ltr; }
}
</style>

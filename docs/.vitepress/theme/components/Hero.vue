<script setup lang="ts">
interface Props {
  eyebrow?: string
  title: string
  description?: string
  primaryText?: string
  primaryHref?: string
  secondaryText?: string
  secondaryHref?: string
  trustText?: string
  image?: string
}

withDefaults(defineProps<Props>(), {
  eyebrow: 'Flutter 知识库',
  primaryText: '开始学习',
  primaryHref: '/guide/introduction',
  secondaryText: '浏览知识库',
  secondaryHref: '/handbook/'
})
</script>

<template>
  <section class="hero">
    <div class="hero__bg" aria-hidden="true">
      <span class="glow" />
    </div>

    <div class="hero__grid">
      <div class="hero__copy">
        <fluent-badge class="hero__eyebrow" appearance="accent">{{ eyebrow }}</fluent-badge>
        <h1 class="hero__title">{{ title }}</h1>
        <p v-if="description" class="hero__desc">{{ description }}</p>
        <div class="hero__cta">
          <fluent-anchor appearance="accent" :href="primaryHref">
            {{ primaryText }}
          </fluent-anchor>
          <fluent-anchor appearance="outline" :href="secondaryHref">
            {{ secondaryText }}
          </fluent-anchor>
        </div>
        <div v-if="trustText" class="hero__trust">
          <span class="trust-dot" />
          {{ trustText }}
        </div>
      </div>

      <div class="hero__visual">
        <div class="glass">
          <div class="glass__bar">
            <span /><span /><span />
          </div>
          <div class="glass__body">
            <slot name="visual">
              <div class="mock">
                <div class="mock__side">
                  <div class="mock__avatar" />
                  <div class="mock__line" />
                  <div class="mock__line mock__line--short" />
                  <div class="mock__line" />
                </div>
                <div class="mock__main">
                  <div class="mock__heading" />
                  <div class="mock__row"><span /><span /><span /></div>
                  <div class="mock__row"><span /><span /><span /></div>
                  <div class="mock__row"><span /><span /><span /></div>
                </div>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 96px 32px 72px;
  background: var(--fluent-bg);
}
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.glow {
  position: absolute;
  top: -240px;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 560px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    color-mix(in srgb, var(--fluent-accent) 16%, transparent),
    transparent 65%
  );
  filter: blur(40px);
}

.hero__grid {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 56px;
  align-items: center;
}
.hero__copy { max-width: 560px; }
.hero__eyebrow {
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 11px;
}
.hero__title {
  font-size: clamp(40px, 5.5vw, 68px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 600;
  margin: 0 0 20px;
  color: var(--fluent-fg);
}
.hero__desc {
  font-size: 18px;
  line-height: 1.55;
  color: var(--fluent-fg-muted);
  margin: 0 0 28px;
}
.hero__cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}
.hero__trust {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--fluent-fg-muted);
  font-size: 13px;
}
.trust-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #13a10e;
  box-shadow: 0 0 0 4px color-mix(in srgb, #13a10e 20%, transparent);
}

.hero__visual { display: flex; justify-content: center; }
.glass {
  width: 100%;
  max-width: 520px;
  border-radius: 12px;
  background: var(--fluent-surface);
  border: 1px solid var(--fluent-border);
  box-shadow:
    0 20px 40px -20px rgba(var(--fluent-shadow-rgb), 0.18),
    0 4px 12px -6px rgba(var(--fluent-shadow-rgb), 0.08);
  overflow: hidden;
}
.glass__bar {
  display: flex;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--fluent-border);
  background: var(--fluent-subtle);
}
.glass__bar span {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--fluent-border-strong);
}
.glass__body { padding: 20px; }

.mock { display: grid; grid-template-columns: 120px 1fr; gap: 18px; }
.mock__side { display: flex; flex-direction: column; gap: 10px; }
.mock__avatar {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--fluent-accent);
}
.mock__line {
  height: 8px; border-radius: 4px;
  background: var(--fluent-subtle-2);
}
.mock__line--short { width: 60%; }
.mock__main { display: flex; flex-direction: column; gap: 14px; }
.mock__heading {
  height: 18px; width: 60%; border-radius: 4px;
  background: var(--fluent-accent);
  opacity: 0.85;
}
.mock__row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.mock__row span {
  height: 36px; border-radius: 6px;
  background: var(--fluent-subtle-2);
}

@media (max-width: 960px) {
  .hero { padding: 56px 20px 40px; }
  .hero__grid { grid-template-columns: 1fr; gap: 36px; }
  .hero__copy { max-width: none; }
}
</style>

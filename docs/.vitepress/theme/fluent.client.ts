import {
  provideFluentDesignSystem,
  fluentButton,
  fluentCard,
  fluentAnchor,
  fluentBadge,
  fluentDivider,
  fluentTab,
  fluentTabs,
  fluentTabPanel,
  fluentAccordion,
  fluentAccordionItem,
  fluentTextField,
  fluentProgressRing,
  baseLayerLuminance,
  StandardLuminance
} from '@fluentui/web-components'

let registered = false

export function registerFluent(): void {
  if (registered) return
  registered = true

  provideFluentDesignSystem().register(
    fluentButton(),
    fluentCard(),
    fluentAnchor(),
    fluentBadge(),
    fluentDivider(),
    fluentTab(),
    fluentTabs(),
    fluentTabPanel(),
    fluentAccordion(),
    fluentAccordionItem(),
    fluentTextField(),
    fluentProgressRing()
  )
}

export function setFluentTheme(mode: 'light' | 'dark'): void {
  const luminance =
    mode === 'dark' ? StandardLuminance.DarkMode : StandardLuminance.LightMode
  baseLayerLuminance.setValueFor(document.body, luminance)
}

import FluentTheme from 'vitepress-template-fluent'
import { inBrowser } from 'vitepress'

import Layout from './Layout.vue'
import Hero from './components/Hero.vue'
import FeatureSection from './components/FeatureSection.vue'
import CallToAction from './components/CallToAction.vue'
import FlutterModuleGrid from './components/FlutterModuleGrid.vue'

import './custom.css'

if (inBrowser) {
  import('./fluent.client').then(({ registerFluent, setFluentTheme }) => {
    registerFluent()
    setFluentTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  })
}

export default {
  extends: FluentTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Hero', Hero)
    app.component('FeatureSection', FeatureSection)
    app.component('CallToAction', CallToAction)
    app.component('FlutterModuleGrid', FlutterModuleGrid)
  }
}

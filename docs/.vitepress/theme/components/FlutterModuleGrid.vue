<script setup lang="ts">
import ProductGrid from 'vitepress-template-fluent/components/ProductGrid.vue'

const items = [
  {
    name: '核心概念',
    description: '架构、渲染原理、Widget 生命周期与引擎分层。',
    icon: '核',
    accent: '#02569B',
    href: '/01-核心概念/00-核心概念索引'
  },
  {
    name: 'Dart 语言',
    description: '从基础语法到面向对象、函数式与元编程。',
    icon: 'D',
    accent: '#0175C2',
    href: '/03-Dart语言/00-Dart语言索引'
  },
  {
    name: 'Widget 系统',
    description: '布局、常用组件、生命周期与性能优化。',
    icon: 'W',
    accent: '#13B9FD',
    href: '/04-Widget系统/00-Widget系统索引'
  },
  {
    name: '状态管理',
    description: 'Provider、Bloc、Riverpod、GetX 等方案详解。',
    icon: '态',
    accent: '#00BFA5',
    href: '/05-状态管理/00-状态管理索引'
  },
  {
    name: '网络与数据',
    description: 'HTTP、WebSocket、本地存储与缓存策略。',
    icon: '网',
    accent: '#7E57C2',
    href: '/07-网络与数据/00-网络与数据索引'
  },
  {
    name: 'UI 与动画',
    description: '主题系统、动画、手势与自定义绘制。',
    icon: 'UI',
    accent: '#FF6D00',
    href: '/08-UI与动画/00-UI与动画索引'
  },
  {
    name: '第三方库',
    description: '100+ 常用包详解，按分类与专题组织。',
    icon: '库',
    accent: '#E91E63',
    href: '/13-第三方库/00-第三方库索引',
    tag: '500+'
  },
  {
    name: '面试与进阶',
    description: '面试题、源码阅读与架构进阶专题。',
    icon: '进',
    accent: '#FFC107',
    href: '/14-面试与进阶/00-面试与进阶索引'
  }
]
</script>

<template>
  <ProductGrid
    title="十四模块，系统化学习路径"
    subtitle="从入门到精通的完整 Flutter 知识体系，覆盖开发、测试、性能与实战。"
    :items="items"
  />
</template>

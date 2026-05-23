import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Flutter 知识库',
  description: '系统化的 Flutter 开发学习资源',
  lang: 'zh-CN',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '核心概念', link: '/core/' },
      { text: '实战项目', link: '/projects/' },
      { text: '学习资源', link: '/resources/' }
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: '入门指南',
          items: [
            { text: 'Flutter 简介', link: '/guide/introduction' },
            { text: '环境搭建', link: '/guide/setup' },
            { text: '第一个应用', link: '/guide/first-app' }
          ]
        },
        {
          text: '进阶指南',
          items: [
            { text: 'Widget 系统', link: '/guide/widgets' },
            { text: '状态管理', link: '/guide/state-management' },
            { text: '导航与路由', link: '/guide/navigation' },
            { text: '网络与数据', link: '/guide/networking' },
            { text: 'UI 设计与动画', link: '/guide/ui-design' },
            { text: '性能优化', link: '/guide/performance' },
            { text: '测试与调试', link: '/guide/testing' }
          ]
        }
      ],
      '/core/': [
        {
          text: '核心概念',
          items: [
            { text: '架构概览', link: '/core/architecture' },
            { text: '一切皆 Widget', link: '/core/widgets' },
            { text: 'Dart 语言', link: '/core/dart' }
          ]
        }
      ],
      '/projects/': [
        {
          text: '实战项目',
          items: [
            { text: '项目实战指南', link: '/projects/' },
            { text: '电商应用', link: '/projects/ecommerce' },
            { text: '社交应用', link: '/projects/social' }
          ]
        }
      ],
      '/resources/': [
        {
          text: '学习资源',
          items: [
            { text: '官方资源', link: '/resources/official' },
            { text: '社区资源', link: '/resources/community' },
            { text: '书籍推荐', link: '/resources/books' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liudonjun/Flutter-Knowledge-Base' }
    ],
    
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2026 Flutter 知识库'
    },
    
    search: {
      provider: 'local'
    }
  }
})

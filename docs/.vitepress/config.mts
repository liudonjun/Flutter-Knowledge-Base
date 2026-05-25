import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type MarkdownIt from 'markdown-it'
import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { createWikiHrefResolver } from './lib/wikiHrefIndex'
import { markdownWikiLinksPlugin } from './lib/markdownWikiLinks'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
/** VitePress 文档根：`docs/` */
const docsRoot = path.resolve(__dirname, '..')

const wikiResolveHref = createWikiHrefResolver(docsRoot)

/** 完整知识库模块目录（位于 docs/ 下，与 Obsidian 编辑路径一致） */
const HANDBOOK_DIRS = [
  '01-核心概念',
  '02-开发环境',
  '03-Dart语言',
  '04-Widget系统',
  '05-状态管理',
  '06-导航与路由',
  '07-网络与数据',
  '08-UI与动画',
  '09-平台集成',
  '10-测试与调试',
  '11-性能优化',
  '12-项目实战',
  '13-第三方库',
  '14-面试与进阶'
] as const

function handbookModuleTitle(dirName: string): string {
  return dirName.replace(/^\d+-/, '')
}

function mdStem(name: string): string {
  return name.replace(/\.md$/, '')
}

function handbookLandingLink(dirName: string): string {
  const dir = path.join(docsRoot, dirName)
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  const indexed = files.filter((f) => f.startsWith('00-')).sort()[0]
  const fallback = [...files].sort()[0]
  const pick = indexed ?? fallback
  if (!pick) return `/handbook/`
  return `/${dirName}/${mdStem(pick)}`
}

function sidebarLabel(filename: string): string {
  return mdStem(filename).replace(/^\d+-/, '')
}

function sidebarLink(dirName: string, filename: string): string {
  return `/${dirName}/${mdStem(filename)}`
}

type HandbookFileGroup = 'index' | 'category' | 'package' | 'topic'

function classifyHandbookFile(dirName: string, filename: string): HandbookFileGroup {
  if (/^00-.*索引/.test(filename)) return 'index'
  if (dirName === '13-第三方库') {
    if (/^0[1-7]-/.test(filename)) return 'category'
    if (/^\d{2,}-.+详解\.md$/.test(filename)) return 'package'
  }
  return 'topic'
}

function toSidebarItems(dirName: string, filenames: string[]): DefaultTheme.SidebarItem[] {
  return filenames.map((f) => ({
    text: sidebarLabel(f),
    link: sidebarLink(dirName, f)
  }))
}

/** 当前路径处于某知识库前缀下时在侧栏分组列出 Markdown */
function buildHandbookSectionSidebars(): DefaultTheme.Config['sidebar'] {
  const out: Record<string, DefaultTheme.SidebarItem[]> = {}
  for (const dirName of HANDBOOK_DIRS) {
    const dir = path.join(docsRoot, dirName)
    if (!fs.existsSync(dir)) continue
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', { numeric: true }))

    const groups: Record<HandbookFileGroup, string[]> = {
      index: [],
      category: [],
      package: [],
      topic: []
    }
    for (const f of files) {
      groups[classifyHandbookFile(dirName, f)].push(f)
    }

    const title = handbookModuleTitle(dirName)
    const prefix = `/${dirName}/`
    const sections: DefaultTheme.SidebarItem[] = []

    if (groups.index.length) {
      sections.push({ text: '模块索引', items: toSidebarItems(dirName, groups.index) })
    }
    if (dirName === '13-第三方库' && groups.category.length) {
      sections.push({ text: '分类长文', items: toSidebarItems(dirName, groups.category) })
    }
    if (groups.topic.length) {
      sections.push({
        text: dirName === '13-第三方库' ? '专题文章' : title,
        items: toSidebarItems(dirName, groups.topic)
      })
    }
    if (groups.package.length) {
      sections.push({ text: '包详解', items: toSidebarItems(dirName, groups.package) })
    }

    out[prefix] = [
      ...sections,
      {
        text: '知识库导读',
        link: '/handbook/'
      }
    ]
  }
  return out
}

function wikiBacklogCount(): number {
  const backlogFile = path.join(docsRoot, 'handbook/wiki-link-backlog.md')
  if (!fs.existsSync(backlogFile)) return 0
  const m = fs.readFileSync(backlogFile, 'utf8').match(/待处理（唯一标题）\*\*：(\d+)/)
  return m ? Number.parseInt(m[1], 10) : 0
}

function buildHandbookHubSidebar(): DefaultTheme.SidebarItem[] {
  const backlog = wikiBacklogCount()
  const maintenanceItems: DefaultTheme.SidebarItem[] = [
    {
      text: backlog > 0 ? `维基待处理 (${backlog})` : '维基链接清单',
      link: '/handbook/wiki-link-backlog'
    },
    { text: '13/14 补充计划', link: '/handbook/13-14-supplement-plan' }
  ]

  return [
    { text: '总览', link: '/handbook/' },
    {
      text: '站点维护',
      collapsed: true,
      items: maintenanceItems
    },
    {
      text: '笔记与辅助',
      collapsed: true,
      items: [
        { text: '学习笔记', link: '/笔记/学习笔记' },
        { text: '笔记模板', link: '/模板/笔记模板' },
        { text: '学习资源汇总', link: '/资源/学习资源' }
      ]
    },
    {
      text: '按模块浏览',
      items: handbookNavItems()
    }
  ]
}

function handbookNavItems(): DefaultTheme.NavItemWithLink[] {
  return HANDBOOK_DIRS.map((dirName) => ({
    text: handbookModuleTitle(dirName),
    link: handbookLandingLink(dirName)
  }))
}

export default defineConfig({
  title: 'Flutter 知识库',
  description: '系统化的 Flutter 开发学习资源',
  lang: 'zh-CN',

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('fluent-')
      }
    }
  },

  markdown: {
    config(md: MarkdownIt) {
      md.use(markdownWikiLinksPlugin, { resolveHref: wikiResolveHref })
    }
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '核心概念', link: '/core/' },
      {
        text: '完整知识库',
        items: handbookNavItems()
      },
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
            { text: '测试与调试', link: '/guide/testing' },
            { text: '平台集成', link: '/guide/platform-integration' }
          ]
        },
        {
          text: '知识库原文',
          link: '/handbook/'
        }
      ],
      '/core/': [
        {
          text: '核心概念',
          items: [
            { text: '架构概览', link: '/core/architecture' },
            { text: '一切皆 Widget', link: '/core/widgets' },
            { text: 'Dart 语言', link: '/core/dart' },
            { text: '架构模式', link: '/core/architecture-patterns' }
          ]
        },
        { text: '知识库详解（长文）', link: '/handbook/' }
      ],
      '/projects/': [
        {
          text: '实战项目',
          items: [
            { text: '项目实战指南', link: '/projects/' },
            { text: '电商应用', link: '/projects/ecommerce' },
            { text: '社交应用', link: '/projects/social' }
          ]
        },
        { text: '知识库：项目实战', link: handbookLandingLink('12-项目实战') }
      ],
      '/resources/': [
        {
          text: '学习资源',
          items: [
            { text: '官方资源', link: '/resources/official' },
            { text: '社区资源', link: '/resources/community' },
            { text: '书籍推荐', link: '/resources/books' },
            { text: '第三方库推荐', link: '/resources/third-party-libraries' },
            { text: '面试准备', link: '/resources/interview-preparation' }
          ]
        },
        { text: '知识库导读', link: '/handbook/' }
      ],
      '/handbook/': buildHandbookHubSidebar(),
      '/笔记/': [
        { text: '学习笔记', link: '/笔记/学习笔记' },
        { text: '知识库导读', link: '/handbook/' }
      ],
      '/模板/': [
        { text: '笔记模板', link: '/模板/笔记模板' },
        { text: '知识库导读', link: '/handbook/' }
      ],
      '/资源/': [
        { text: '学习资源汇总', link: '/资源/学习资源' },
        { text: '站内精选资源', link: '/resources/' },
        { text: '知识库导读', link: '/handbook/' }
      ],
      ...buildHandbookSectionSidebars()
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

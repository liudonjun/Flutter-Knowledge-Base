import fs from 'node:fs'
import path from 'node:path'

/** 对齐 Obsidian / VitePress：折叠空白，便于维基标题匹配文件名 */
export function normWikiTitle(s: string): string {
  return s.trim().replace(/\s+/g, '')
}

/** 从文件名去掉的常见后缀，用于别名与模糊匹配 */
const STEM_SUFFIXES = ['详解', '索引', '指南', '原理', '概览', '概述', '入门'] as const

function normAggTitle(s: string): string {
  let n = normWikiTitle(s)
  for (const suf of STEM_SUFFIXES) {
    if (n.endsWith(suf) && n.length > suf.length) n = n.slice(0, -suf.length)
  }
  return n
}

/** 基本 ↔ 基础 等索引常用写法 */
function chineseStemVariants(s: string): string[] {
  const out = new Set<string>([s])
  if (s.includes('基本')) out.add(s.replace(/基本/g, '基础'))
  if (s.includes('基础')) out.add(s.replace(/基础/g, '基本'))
  return [...out]
}

/** 由 `02-基础路由详解` 生成 [[基本路由]]、[[基础路由详解]] 等别名 */
function generateStemAliases(strippedStem: string): string[] {
  const aliases = new Set<string>([strippedStem])
  for (const suf of STEM_SUFFIXES) {
    if (strippedStem.endsWith(suf) && strippedStem.length > suf.length) {
      aliases.add(strippedStem.slice(0, -suf.length))
    }
  }
  for (const a of [...aliases]) {
    for (const v of chineseStemVariants(a)) aliases.add(v)
  }
  return [...aliases]
}

/** 人工指定 + 索引/API 名 → 章节（无独立文章时链到最相关长文） */
const WIKI_SYNONYMS_ENTRIES: ReadonlyArray<readonly [string, string]> = [
  // —— 站内导读短名 ——
  ['架构概览', '/01-核心概念/Flutter架构概览'],
  ['Flutter架构概览', '/01-核心概念/Flutter架构概览'],
  ['渲染引擎', '/01-核心概念/01-Flutter渲染原理'],
  ['框架分层', '/01-核心概念/Flutter架构概览'],
  ['Dart语言', '/03-Dart语言/00-Dart语言索引'],
  ['Dart 语言', '/03-Dart语言/00-Dart语言索引'],
  ['Widget系统', '/04-Widget系统/00-Widget系统索引'],
  ['Widget系统索引', '/04-Widget系统/00-Widget系统索引'],
  ['Widget系统详解', '/04-Widget系统/00-Widget系统索引'],
  ['状态管理', '/guide/state-management'],
  ['性能优化', '/guide/performance'],
  ['官方资源', '/resources/official'],
  ['社区资源', '/resources/community'],
  ['书籍推荐', '/resources/books'],
  ['电商应用', '/projects/ecommerce'],
  ['社交应用', '/projects/social'],
  ['UI 设计与动画', '/08-UI与动画/00-UI与动画索引'],

  // —— 核心概念索引 ——
  ['一切皆Widget', '/10-测试与调试/一切皆Widget'],
  ['一切皆 Widget', '/10-测试与调试/一切皆Widget'],
  ['Widget生命周期', '/01-核心概念/02-Widget生命周期'],
  ['渲染流程', '/01-核心概念/01-Flutter渲染原理'],
  ['声明式UI', '/01-核心概念/06-声明式UI与Widget设计原则'],
  ['Widget', '/04-Widget系统/01-Widget基础详解'],
  ['Widget设计原则', '/01-核心概念/06-声明式UI与Widget设计原则'],
  ['布局约束', '/04-Widget系统/02-布局系统详解'],
  ['弹性布局', '/04-Widget系统/02-布局系统详解'],
  ['层叠布局', '/04-Widget系统/02-布局系统详解'],
  ['盒模型', '/04-Widget系统/02-布局系统详解'],
  ['性能考虑', '/11-性能优化/01-性能优化基础'],
  ['性能分析', '/11-性能优化/01-性能优化基础'],
  ['响应式编程', '/05-状态管理/01-状态管理基础'],
  ['热重载原理', '/01-核心概念/01-Flutter渲染原理'],
  ['StatefulWidget', '/04-Widget系统/01-Widget基础详解'],
  ['StatelessWidget', '/04-Widget系统/01-Widget基础详解'],
  ['状态提升', '/05-状态管理/07-依赖注入与状态提升'],
  ['状态管理对比', '/05-状态管理/06-状态管理对比'],
  ['调试工具', '/10-测试与调试/02-调试技巧详解'],
  ['常见陷阱', '/10-测试与调试/02-调试技巧详解'],
  ['BuildContext', '/04-Widget系统/01-Widget基础详解'],
  ['Element', '/01-核心概念/01-Flutter渲染原理'],
  ['RenderObject', '/01-核心概念/01-Flutter渲染原理'],

  // —— 开发环境 ——
  ['环境搭建详解', '/02-开发环境/01-环境搭建详解'],
  ['第一个应用详解', '/02-开发环境/02-第一个应用详解'],
  ['项目结构详解', '/02-开发环境/03-项目结构详解'],
  ['国际化详解', '/02-开发环境/05-国际化详解'],
  ['国际化', '/02-开发环境/05-国际化详解'],
  ['Windows环境搭建', '/02-开发环境/01-环境搭建详解'],
  ['macOS环境搭建', '/02-开发环境/01-环境搭建详解'],
  ['Linux环境搭建', '/02-开发环境/01-环境搭建详解'],
  ['Web开发环境', '/02-开发环境/00-开发环境索引'],

  // —— 导航与路由索引 ——
  ['Navigator基础', '/06-导航与路由/01-导航与路由基础'],
  ['基本路由', '/06-导航与路由/02-基础路由详解'],
  ['命名路由', '/06-导航与路由/03-命名路由详解'],
  ['GoRouter', '/06-导航与路由/04-GoRouter详解'],
  ['Navigator2.0', '/06-导航与路由/04-GoRouter详解'],
  ['Get路由', '/05-状态管理/05-GetX详解'],
  ['AutoRoute', '/06-导航与路由/04-GoRouter详解'],
  ['CupertinoPageRoute', '/06-导航与路由/02-基础路由详解'],
  ['MaterialPageRoute', '/06-导航与路由/02-基础路由详解'],
  ['PageRouteBuilder', '/06-导航与路由/02-基础路由详解'],
  ['路由动画', '/06-导航与路由/02-基础路由详解'],
  ['路由调试', '/10-测试与调试/02-调试技巧详解'],
  ['导航与路由', '/06-导航与路由/01-导航与路由基础'],
  ['架构模式', '/01-核心概念/03-架构模式'],

  // —— 状态管理 ——
  ['状态管理基础', '/05-状态管理/01-状态管理基础'],
  ['Provider', '/05-状态管理/02-Provider详解'],
  ['Provider基础', '/05-状态管理/02-Provider详解'],
  ['Provider类型', '/05-状态管理/02-Provider详解'],
  ['BLoC', '/05-状态管理/03-Bloc模式详解'],
  ['Bloc', '/05-状态管理/03-Bloc模式详解'],
  ['BLoC模式详解', '/05-状态管理/03-Bloc模式详解'],
  ['Riverpod', '/05-状态管理/04-Riverpod详解'],
  ['Riverpod基础', '/05-状态管理/04-Riverpod详解'],
  ['GetX', '/05-状态管理/05-GetX详解'],
  ['GetX基础', '/05-状态管理/05-GetX详解'],
  ['GetX路由', '/05-状态管理/05-GetX详解'],
  ['Stream', '/03-Dart语言/04-Dart函数式编程'],
  ['响应式状态', '/05-状态管理/01-状态管理基础'],

  // —— Widget / UI ——
  ['布局系统详解', '/04-Widget系统/02-布局系统详解'],
  ['常用Widget详解', '/04-Widget系统/03-常用Widget详解'],
  ['UI设计基础', '/08-UI与动画/01-UI设计基础'],
  ['Ui设计基础', '/08-UI与动画/01-UI设计基础'],
  ['自定义绘制详解', '/08-UI与动画/05-自定义绘制详解'],
  ['AnimationController', '/08-UI与动画/03-动画系统详解'],
  ['CustomPainter', '/08-UI与动画/05-自定义绘制详解'],
  ['ThemeData', '/08-UI与动画/02-主题系统详解'],
  ['PlatformView', '/09-平台集成/01-平台集成指南'],
  ['Container', '/04-Widget系统/03-常用Widget详解'],
  ['Text', '/04-Widget系统/03-常用Widget详解'],
  ['Image', '/04-Widget系统/03-常用Widget详解'],
  ['Icon', '/04-Widget系统/03-常用Widget详解'],
  ['Button', '/04-Widget系统/03-常用Widget详解'],
  ['Row', '/04-Widget系统/03-常用Widget详解'],
  ['Column', '/04-Widget系统/03-常用Widget详解'],
  ['Stack', '/04-Widget系统/03-常用Widget详解'],
  ['Flex', '/04-Widget系统/03-常用Widget详解'],
  ['TextField', '/04-Widget系统/03-常用Widget详解'],

  // —— 网络 / 数据 / 第三方库 ——
  ['网络请求基础', '/07-网络与数据/01-网络请求基础'],
  ['数据存储基础', '/07-网络与数据/02-数据存储基础'],
  ['Dio', '/13-第三方库/03-网络请求库详解'],
  ['http', '/13-第三方库/03-网络请求库详解'],
  ['Chopper', '/13-第三方库/03-网络请求库详解'],
  ['Hive', '/13-第三方库/04-数据库库详解'],
  ['Floor', '/13-第三方库/04-数据库库详解'],
  ['Isar', '/13-第三方库/04-数据库库详解'],
  ['SQLite', '/13-第三方库/04-数据库库详解'],
  ['第三方库推荐', '/13-第三方库/00-第三方库索引'],
  ['第三方库源码', '/13-第三方库/01-常用第三方库'],

  // —— 测试 / 调试 / 性能 ——
  ['测试基础', '/10-测试与调试/01-测试基础'],
  ['调试技巧详解', '/10-测试与调试/02-调试技巧详解'],
  ['调试基础', '/10-测试与调试/01-测试基础'],
  ['自动化测试', '/10-测试与调试/08-自动化测试'],
  ['单元测试', '/10-测试与调试/01-测试基础'],
  ['集成测试', '/10-测试与调试/08-自动化测试'],
  ['性能测试', '/10-测试与调试/01-测试基础'],
  ['UI测试', '/10-测试与调试/08-自动化测试'],
  ['功能测试', '/10-测试与调试/08-自动化测试'],
  ['安全测试', '/10-测试与调试/08-自动化测试'],
  ['兼容性测试', '/10-测试与调试/08-自动化测试'],
  ['测试金字塔', '/10-测试与调试/01-测试基础'],
  ['测试覆盖', '/10-测试与调试/01-测试基础'],
  ['测试框架', '/10-测试与调试/01-测试基础'],
  ['测试计划', '/10-测试与调试/08-自动化测试'],
  ['端到端测试', '/10-测试与调试/08-自动化测试'],
  ['DevTools', '/10-测试与调试/02-调试技巧详解'],
  ['性能优化基础', '/11-性能优化/01-性能优化基础'],
  ['内存泄漏', '/11-性能优化/03-内存优化详解'],
  ['内存优化', '/11-性能优化/03-内存优化详解'],
  ['布局调试', '/10-测试与调试/02-调试技巧详解'],
  ['布局溢出', '/04-Widget系统/02-布局系统详解'],
  ['绘制性能', '/08-UI与动画/05-自定义绘制详解'],
  ['懒加载', '/11-性能优化/01-性能优化基础'],
  ['平台集成指南', '/09-平台集成/01-平台集成指南'],

  // —— 笔记 / 模板 / 资源 ——
  ['学习笔记', '/笔记/学习笔记'],
  ['笔记模板', '/模板/笔记模板'],
  ['学习资源', '/资源/学习资源'],
  ['Flutter知识库索引', '/handbook/'],
  ['核心概念索引', '/01-核心概念/00-核心概念索引']
]

const WIKI_SYNONYMS: ReadonlyMap<string, string> = new Map(
  WIKI_SYNONYMS_ENTRIES.map(([k, v]) => [normWikiTitle(k), v])
)

/** VitePress 路由：relative path 不含 `.md` */
function relStemToVpHref(stem: string): string {
  const s = stem.replace(/\\/g, '/')
  if (s === 'index') return '/'
  if (s.endsWith('/index')) return `/${s.slice(0, -'/index'.length)}/`
  return `/${s}`
}

type StemRow = Readonly<{ href: string; full: string; stripped: string }>

function stripLeadingNumberPrefix(filenameStem: string): string {
  return filenameStem.replace(/^\d+-/u, '')
}

/** 递归列出站点内全部 Markdown（与 VitePress 相同 docs 根） */
function listStemRows(docsRoot: string): StemRow[] {
  const rows: StemRow[] = []

  const walkDir = (absDir: string) => {
    let ents: fs.Dirent[]
    try {
      ents = fs.readdirSync(absDir, { withFileTypes: true })
    } catch {
      return
    }
    for (const ent of ents) {
      const p = path.join(absDir, ent.name)
      if (ent.name === '.vitepress' || ent.name === 'public' || ent.name === '.git') continue

      let st: fs.Stats
      try {
        st = fs.statSync(p)
      } catch {
        continue
      }

      if (st.isDirectory()) {
        walkDir(p)
      } else if (st.isFile() && ent.name.endsWith('.md')) {
        const rel = path.relative(docsRoot, p).split(path.sep).join('/')
        const stem = rel.slice(0, -'.md'.length)
        const fullStem = path.posix.basename(stem)
        const href = relStemToVpHref(stem)
        rows.push({
          href,
          full: fullStem,
          stripped: stripLeadingNumberPrefix(fullStem)
        })
      }
    }
  }

  walkDir(docsRoot)
  return rows
}

function addExact(map: Map<string, string | null>, keyRaw: string, href: string) {
  const k = normWikiTitle(keyRaw)
  if (!k) return
  const cur = map.get(k)
  if (cur === undefined) map.set(k, href)
  else if (cur !== href) map.set(k, null)
}

function scoreStemMatch(wikiTarget: string, row: StemRow): number {
  const w = normAggTitle(wikiTarget)
  if (w.length < 2) return 0

  const candidates = [
    ...generateStemAliases(row.stripped),
    ...generateStemAliases(row.full),
    row.stripped,
    row.full
  ]

  let best = 0
  for (const c of candidates) {
    const s = normAggTitle(c)
    if (!s) continue
    if (w === s) best = Math.max(best, 100)
    else if (s.startsWith(w) || w.startsWith(s)) best = Math.max(best, 92)
    else if (s.includes(w) || w.includes(s)) best = Math.max(best, 82)
    else {
      let common = 0
      for (const ch of w) if (s.includes(ch)) common++
      const ratio = common / Math.max(w.length, s.length)
      if (ratio >= 0.55) best = Math.max(best, Math.floor(ratio * 70))
    }
  }
  return best
}

export type WikiHrefResolver = (targetWoHash: string) => string | undefined

/** 构建维基目标 → href 解析器（构建时跑一次即可） */
export function createWikiHrefResolver(docsRoot: string): WikiHrefResolver {
  const exact = new Map<string, string | null>()
  const stems = listStemRows(docsRoot)

  for (const row of stems) {
    addExact(exact, row.full, row.href)
    addExact(exact, row.stripped, row.href)
    for (const alias of generateStemAliases(row.stripped)) {
      addExact(exact, alias, row.href)
    }
  }

  for (const [k, v] of WIKI_SYNONYMS.entries()) addExact(exact, k, v)

  const scoredResolve = (t: string): string | undefined => {
    const n = normWikiTitle(t)
    if (n.length < 2) return undefined

    let bestHref: string | undefined
    let bestScore = 0
    let secondScore = 0

    for (const row of stems) {
      const sc = scoreStemMatch(t, row)
      if (sc > bestScore) {
        secondScore = bestScore
        bestScore = sc
        bestHref = row.href
      } else if (sc > secondScore) {
        secondScore = sc
      }
    }

    if (bestScore >= 75 && bestScore - secondScore >= 8) return bestHref
    return undefined
  }

  return (targetWoHash: string) => {
    const key = normWikiTitle(targetWoHash)
    const hitSyn = WIKI_SYNONYMS.get(key)
    if (hitSyn) return hitSyn

    const e = exact.get(key)
    if (e !== undefined && e !== null) return e

    return scoredResolve(targetWoHash)
  }
}

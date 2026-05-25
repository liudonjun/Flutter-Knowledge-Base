#!/usr/bin/env node
/**
 * 生成 13/14 模块待写文章计划（基于 wiki-link-backlog）
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createWikiHrefResolver, normWikiTitle } from '../docs/.vitepress/lib/wikiHrefIndex.ts'
import { PACKAGE_WIKI_SYNONYMS } from '../docs/.vitepress/lib/wikiPackageSynonyms.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsRoot = path.join(__dirname, '../docs')
const outFile = path.join(docsRoot, 'handbook/13-14-supplement-plan.md')
const resolveHref = createWikiHrefResolver(docsRoot)

function listMarkdownFiles(absDir, base = absDir) {
  const out = []
  for (const name of fs.readdirSync(absDir)) {
    if (name === '.vitepress' || name === 'public') continue
    const p = path.join(absDir, name)
    const st = fs.statSync(p)
    if (st.isDirectory()) out.push(...listMarkdownFiles(p, base))
    else if (name.endsWith('.md')) out.push(path.relative(base, p).split(path.sep).join('/'))
  }
  return out
}

const wikiRe = /\[\[([^\]]+)\]\]/g
const SKIP = new Set([
  'handbook/wiki-link-backlog.md',
  'handbook/13-14-supplement-plan.md',
  '模板/笔记模板.md'
])
const PLACEHOLDER_TITLES = new Set([
  '标题',
  '双括号',
  '相关问题1',
  '相关问题2',
  '相关知识点1',
  '相关知识点2'
])
const unresolved = new Map()

for (const rel of listMarkdownFiles(docsRoot)) {
  if (SKIP.has(rel)) continue
  const text = fs.readFileSync(path.join(docsRoot, rel), 'utf8')
  let m
  while ((m = wikiRe.exec(text))) {
    const raw = m[1].trim()
    const target = raw.split('|')[0].split('#')[0].trim()
    if (resolveHref(target)) continue
    if (PLACEHOLDER_TITLES.has(target)) continue
    if (!unresolved.has(target)) unresolved.set(target, { count: 0, refs: new Set() })
    const u = unresolved.get(target)
    u.count++
    u.refs.add(rel)
  }
}

function pickModule(refs) {
  const score = new Map()
  for (const r of refs) {
    const mod = r.split('/')[0]
    score.set(mod, (score.get(mod) ?? 0) + 1)
  }
  return [...score.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'other'
}

const buckets = {
  '13-第三方库': [],
  '14-面试与进阶': [],
  '12-项目实战': [],
  '09-平台集成': [],
  other: []
}

for (const [title, info] of unresolved.entries()) {
  const mod = pickModule(info.refs)
  const row = { title, count: info.count, refs: [...info.refs].slice(0, 2) }
  if (mod.startsWith('13-')) buckets['13-第三方库'].push(row)
  else if (mod.startsWith('14-')) buckets['14-面试与进阶'].push(row)
  else if (mod.startsWith('12-')) buckets['12-项目实战'].push(row)
  else if (mod.startsWith('09-')) buckets['09-平台集成'].push(row)
  else buckets.other.push(row)
}

for (const k of Object.keys(buckets)) {
  buckets[k].sort((a, b) => b.count - a.count || a.title.localeCompare(b.title, 'zh-Hans-CN'))
}

/** 各模块「分类长文 / 索引」兜底目标（尚无主题级独立页时使用） */
const LIB13_CATEGORY_FALLBACKS = new Set([
  '/13-第三方库/01-常用第三方库',
  '/13-第三方库/02-状态管理库详解',
  '/13-第三方库/03-网络请求库详解',
  '/13-第三方库/04-数据库库详解',
  '/13-第三方库/05-UI组件库详解',
  '/13-第三方库/06-工具库详解',
  '/13-第三方库/07-测试库详解'
])
const LIB14_CATEGORY_FALLBACKS = new Set([
  // 14 模块当前同义词均指向已有专题页；若将来新增兜底页在此登记
])
const LIB12_CATEGORY_FALLBACKS = new Set([
  // 12 模块同义词均指向已有专题页；索引页不算待写目标
])
const MODULE_INDEX_HREFS = new Set([
  '/13-第三方库/00-第三方库索引',
  '/14-面试与进阶/00-面试与进阶索引',
  '/12-项目实战/00-项目实战索引'
])

function hrefToDocPath(href) {
  const rel = href.split('#')[0].replace(/^\//, '') + '.md'
  return path.join(docsRoot, rel)
}

function docExists(href) {
  return fs.existsSync(hrefToDocPath(href))
}

function categoryFallbacksForPrefix(prefix) {
  if (prefix === '/13-第三方库/') return LIB13_CATEGORY_FALLBACKS
  if (prefix === '/14-面试与进阶/') return LIB14_CATEGORY_FALLBACKS
  if (prefix === '/12-项目实战/') return LIB12_CATEGORY_FALLBACKS
  return new Set()
}

/** 同义词已解析，但维基标题尚无独立页（仅兜底到分类长文或缺失文件） */
function shouldListSynonymOnly(title, href, modulePrefix) {
  const base = href.split('#')[0]
  if (MODULE_INDEX_HREFS.has(base)) return false
  if (title === '项目实战索引') return false
  if (!base.startsWith(modulePrefix)) return false

  const fallbacks = categoryFallbacksForPrefix(modulePrefix)
  if (fallbacks.has(base)) return true
  return !docExists(base)
}

/** 已链到分类长文、仍建议写独立页面的主题 */
const SYNONYM_ONLY = {
  '13-第三方库': [],
  '14-面试与进阶': [],
  '12-项目实战': []
}
for (const [title, href] of PACKAGE_WIKI_SYNONYMS) {
  const base = href.split('#')[0]
  if (shouldListSynonymOnly(title, href, '/13-第三方库/')) {
    SYNONYM_ONLY['13-第三方库'].push({ title, href: base })
  } else if (shouldListSynonymOnly(title, href, '/14-面试与进阶/')) {
    SYNONYM_ONLY['14-面试与进阶'].push({ title, href: base })
  } else if (shouldListSynonymOnly(title, href, '/12-项目实战/')) {
    SYNONYM_ONLY['12-项目实战'].push({ title, href: base })
  }
}
for (const k of Object.keys(SYNONYM_ONLY)) {
  SYNONYM_ONLY[k].sort((a, b) => a.title.localeCompare(b.title, 'zh-Hans-CN'))
}

const now = new Date().toISOString().slice(0, 10)
const lines = [
  '# 13 / 14 模块文章补充计划',
  '',
  '> 由 `pnpm generate:supplement-plan` 根据未解析 `[[维基链接]]` 自动生成。',
  '',
  `- **生成时间**：${now}`,
  `- **待写独立文章（唯一标题）**：${unresolved.size}`,
  `- **维基解析率**：${unresolved.size === 0 ? '100%（含同义词兜底）' : '见 wiki-link-backlog'}`,
  '',
  '## 说明',
  '',
  '- **未解析链接**：当前为 0；下列「同义词兜底」仅列出**尚无独立 `.md`** 的主题（已指向专题页 / `NN-包名详解` 的不再列入）',
  '- **P1 第三方库**：建议 `docs/13-第三方库/NN-包名详解.md`',
  '- **P2 面试与进阶**：建议 `docs/14-面试与进阶/NN-主题详解.md`',
  '',
  '## P1 · 13-第三方库（同义词 → 分类长文，待写独立页）',
  '',
  '| 维基标题 | 当前跳转 |',
  '| --- | --- |'
]

for (const row of SYNONYM_ONLY['13-第三方库'].slice(0, 80)) {
  lines.push(`| ${row.title.replace(/\|/g, '\\|')} | ${row.href} |`)
}
if (!SYNONYM_ONLY['13-第三方库'].length) {
  lines.push('| *(无)* | — |')
} else if (SYNONYM_ONLY['13-第三方库'].length > 80) {
  lines.push('', `*… 共 ${SYNONYM_ONLY['13-第三方库'].length} 个包名/主题*`)
}

lines.push('', '## P2 · 14-面试与进阶（同义词兜底，待写独立页）', '', '| 维基标题 | 当前跳转 |', '| --- | --- |')
if (SYNONYM_ONLY['14-面试与进阶'].length) {
  for (const row of SYNONYM_ONLY['14-面试与进阶']) {
    lines.push(`| ${row.title.replace(/\|/g, '\\|')} | ${row.href} |`)
  }
} else {
  lines.push('| *(无)* | — |')
}

lines.push('', '## P3 · 12-项目实战（同义词兜底）', '', '| 维基标题 | 当前跳转 |', '| --- | --- |')
if (SYNONYM_ONLY['12-项目实战'].length) {
  for (const row of SYNONYM_ONLY['12-项目实战']) {
    lines.push(`| ${row.title.replace(/\|/g, '\\|')} | ${row.href} |`)
  }
} else {
  lines.push('| *(无)* | — |')
}

if (unresolved.size > 0) {
  lines.push('', '## 仍未解析的维基链接', '', '| 维基标题 | 引用次数 | 引用示例 |', '| --- | ---: | --- |')
  for (const [mod, key] of [
    ['13-第三方库', '13-第三方库'],
    ['14-面试与进阶', '14-面试与进阶'],
    ['12+09', null]
  ]) {
    const rows =
      key === null ? [...buckets['12-项目实战'], ...buckets['09-平台集成']] : buckets[key]
    if (!rows.length) continue
    lines.push('', `### ${mod}`, '', '| 维基标题 | 引用次数 | 引用示例 |', '| --- | ---: | --- |')
    for (const row of rows) {
      lines.push(`| ${row.title.replace(/\|/g, '\\|')} | ${row.count} | ${row.refs.join('；')} |`)
    }
  }
  if (buckets.other.length) {
    lines.push('', '### 其它', '', '| 维基标题 | 引用次数 | 引用示例 |', '| --- | ---: | --- |')
    for (const row of buckets.other.slice(0, 40)) {
      lines.push(`| ${row.title.replace(/\|/g, '\\|')} | ${row.count} | ${row.refs.join('；')} |`)
    }
  }
}

lines.push(
  '',
  '---',
  `*P1 同义词兜底 ${SYNONYM_ONLY['13-第三方库'].length} 项 · P2 ${SYNONYM_ONLY['14-面试与进阶'].length} 项 · P3 ${SYNONYM_ONLY['12-项目实战'].length} 项*`
)

fs.writeFileSync(outFile, lines.join('\n'), 'utf8')
console.log(`Wrote ${outFile}`)
console.log(
  'synonym-only 13:',
  SYNONYM_ONLY['13-第三方库'].length,
  '14:',
  SYNONYM_ONLY['14-面试与进阶'].length,
  '12:',
  SYNONYM_ONLY['12-项目实战'].length,
  'unresolved:',
  unresolved.size
)

#!/usr/bin/env node
/**
 * 扫描 docs/ 内全部 [[维基链接]]，生成未解析条目清单。
 * 用法：pnpm audit:wiki-links
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createWikiHrefResolver, normWikiTitle } from '../docs/.vitepress/lib/wikiHrefIndex.ts'
import { pageHrefFromRelativePath } from '../docs/.vitepress/lib/markdownWikiLinks.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const docsRoot = path.join(repoRoot, 'docs')
const outFile = path.join(docsRoot, 'handbook/wiki-link-backlog.md')

const resolveHref = createWikiHrefResolver(docsRoot)

/** 列出 docs 内全部 .md（跟随符号链接目录） */
function listMarkdownFiles(absDir, base = absDir) {
  const out = []
  for (const name of fs.readdirSync(absDir)) {
    if (name === '.vitepress' || name === 'public' || name === '.git') continue
    const p = path.join(absDir, name)
    let st
    try {
      st = fs.statSync(p)
    } catch {
      continue
    }
    if (st.isDirectory()) out.push(...listMarkdownFiles(p, base))
    else if (name.endsWith('.md')) {
      out.push(path.relative(base, p).split(path.sep).join('/'))
    }
  }
  return out
}

/** 全部可发布页面的文件名（去编号前缀），用于推荐相近文章 */
function buildStemCatalog() {
  const catalog = []
  for (const rel of listMarkdownFiles(docsRoot)) {
    const stem = rel.replace(/\.md$/u, '')
    const base = path.posix.basename(stem)
    const label = base.replace(/^\d+-/u, '')
    const href =
      stem === 'index'
        ? '/'
        : stem.endsWith('/index')
          ? `/${stem.slice(0, -'/index'.length)}/`
          : `/${stem}`
    catalog.push({ href, label })
  }
  return catalog
}

const stemCatalog = buildStemCatalog()

function suggestCandidates(target) {
  const n = normWikiTitle(target)
  if (n.length < 2) return []
  const hits = []
  for (const row of stemCatalog) {
    const ln = normWikiTitle(row.label)
    if (ln.includes(n) || n.includes(ln)) hits.push(`${row.label} → ${row.href}`)
  }
  return [...new Set(hits)].slice(0, 3)
}

const wikiRe = /\[\[([^\]]+)\]\]/g
const unresolved = new Map()
const selfLoops = new Map()
let totalWiki = 0
let resolvedWiki = 0

/** 不参与统计（自动生成或含占位符示例） */
const SKIP_AUDIT_FILES = new Set([
  'handbook/wiki-link-backlog.md',
  'handbook/13-14-supplement-plan.md',
  '模板/笔记模板.md'
])

/** 模板 / 示例占位符，不计入 backlog */
const PLACEHOLDER_TITLES = new Set([
  '标题',
  '双括号',
  '相关问题1',
  '相关问题2',
  '相关知识点1',
  '相关知识点2'
])

for (const rel of listMarkdownFiles(docsRoot)) {
  if (SKIP_AUDIT_FILES.has(rel)) continue
  const text = fs.readFileSync(path.join(docsRoot, rel), 'utf8')
  let m
  while ((m = wikiRe.exec(text))) {
    totalWiki++
    const raw = m[1].trim()
    const pipeIdx = raw.indexOf('|')
    const targetSide = (pipeIdx === -1 ? raw : raw.slice(0, pipeIdx)).trim()
    const hashIdx = targetSide.indexOf('#')
    const targetWoHash = hashIdx >= 0 ? targetSide.slice(0, hashIdx).trim() : targetSide

    if (resolveHref(targetWoHash)) {
      resolvedWiki++
      const pageHref = pageHrefFromRelativePath(rel)
      const resolved = resolveHref(targetWoHash)
      if (pageHref && resolved?.split('#')[0] === pageHref.split('#')[0]) {
        if (!selfLoops.has(targetWoHash)) selfLoops.set(targetWoHash, { count: 0, refs: new Set() })
        const s = selfLoops.get(targetWoHash)
        s.count++
        s.refs.add(rel)
      }
    } else if (PLACEHOLDER_TITLES.has(targetWoHash)) {
      resolvedWiki++
    } else {
      if (!unresolved.has(targetWoHash)) unresolved.set(targetWoHash, { count: 0, refs: new Set() })
      const u = unresolved.get(targetWoHash)
      u.count++
      u.refs.add(rel)
    }
  }
}

const sorted = [...unresolved.entries()].sort(
  (a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0], 'zh-Hans-CN')
)
const now = new Date().toISOString().slice(0, 10)

const lines = [
  '# 维基链接待处理清单',
  '',
  '> 由 `pnpm audit:wiki-links` 自动生成。下列 `[[标题]]` 在站点内**尚无对应页面**，构建时会显示为纯文本。',
  '',
  `- **扫描时间**：${now}`,
  `- **维基链接总数**：${totalWiki}`,
  `- **已解析**：${resolvedWiki}（${((resolvedWiki / totalWiki) * 100).toFixed(1)}%）`,
  `- **待处理（唯一标题）**：${sorted.length}`,
  `- **自环链接（渲染为纯文本）**：${selfLoops.size} 种标题，共 ${[...selfLoops.values()].reduce((n, v) => n + v.count, 0)} 处`,
  '',
  '## 处理建议',
  '',
  '1. **已有长文但未匹配**：在 `docs/.vitepress/lib/wikiHrefIndex.ts` 的 `WIKI_SYNONYMS` 增加「维基短名 → 路径」映射。',
  '2. **确实缺文章**：在本清单中勾选后新建 `.md`，或把索引里的链接改为已有文章名。',
  '3. **仅为概念/API 名**（如 `Container`、`Stream`）：可保留为纯文本，或链到相关详解章节。',
  '',
  '## 待处理条目',
  '',
  '| 维基标题 | 引用次数 | 引用示例 | 相近已有文章（仅供参考） |',
  '| --- | ---: | --- | --- |'
]

for (const [title, info] of sorted) {
  const refs = [...info.refs].sort().slice(0, 2).join('；')
  const more = info.refs.size > 2 ? ` 等 ${info.refs.size} 篇` : ''
  const candidates = suggestCandidates(title)
  const sug = candidates.length ? candidates.join('<br>') : '—'
  lines.push(`| ${title.replace(/\|/g, '\\|')} | ${info.count} | ${refs}${more} | ${sug} |`)
}

lines.push('', '---', `*共 ${sorted.length} 条待处理维基标题*`)

if (selfLoops.size > 0) {
  lines.push(
    '',
    '## 自环链接（构建时已降级为纯文本）',
    '',
    '> 下列 `[[标题]]` 解析目标与当前页相同；插件不会生成可点击链接。',
    '',
    '| 维基标题 | 出现次数 | 引用示例 |',
    '| --- | ---: | --- |'
  )
  const loopSorted = [...selfLoops.entries()].sort(
    (a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0], 'zh-Hans-CN')
  )
  for (const [title, info] of loopSorted.slice(0, 40)) {
    const refs = [...info.refs].sort().slice(0, 2).join('；')
    lines.push(`| ${title.replace(/\|/g, '\\|')} | ${info.count} | ${refs} |`)
  }
  if (loopSorted.length > 40) {
    lines.push('', `*… 共 ${loopSorted.length} 种自环标题*`)
  }
}

fs.writeFileSync(outFile, lines.join('\n'), 'utf8')
console.log(`Wrote ${outFile}`)
console.log(
  `Resolved ${resolvedWiki}/${totalWiki}, backlog ${sorted.length} unique titles, self-loops ${selfLoops.size} titles`
)

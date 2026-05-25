#!/usr/bin/env node
/**
 * 将模块索引中的 `- [[X]] - 描述` 统一为 `- [[X]] → [[目标页]]`
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createWikiHrefResolver } from '../docs/.vitepress/lib/wikiHrefIndex.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsRoot = path.join(__dirname, '../docs')
const resolveHref = createWikiHrefResolver(docsRoot)

function listIndexFiles(dir, base = dir) {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    if (name === '.vitepress' || name === 'public') continue
    const p = path.join(dir, name)
    if (fs.statSync(p).isDirectory()) out.push(...listIndexFiles(p, base))
    else if (name.endsWith('.md') && name.includes('索引')) {
      out.push(path.relative(base, p).split(path.sep).join('/'))
    }
  }
  return out
}

function hrefToWikiStem(href) {
  const base = href.split('#')[0]
  return path.posix.basename(base)
}

const oldLineRe = /^(- \[\[([^\]|#]+)(?:#[^\]|]+)?\]\]) - (.+)$/
let changedFiles = 0
let changedLines = 0

for (const rel of listIndexFiles(docsRoot)) {
  const full = path.join(docsRoot, rel)
  const lines = fs.readFileSync(full, 'utf8').split('\n')
  let fileChanged = false

  const next = lines.map((line) => {
    if (line.includes('→')) return line
    const m = line.match(oldLineRe)
    if (!m) return line
    const [, prefix, wikiTitle, _desc] = m
    const href = resolveHref(wikiTitle.trim())
    if (!href) return line
    const stem = hrefToWikiStem(href)
    fileChanged = true
    changedLines++
    if (stem === wikiTitle.trim()) {
      return `- [[${wikiTitle.trim()}]]`
    }
    return `${prefix} → [[${stem}]]`
  })

  if (fileChanged) {
    fs.writeFileSync(full, next.join('\n'), 'utf8')
    changedFiles++
    console.log('Updated', rel)
  }
}

console.log(`Done: ${changedFiles} files, ${changedLines} lines`)

import type MarkdownIt from 'markdown-it'
import type { WikiHrefResolver } from './wikiHrefIndex'

function escapeMarkdownLabel(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
}

/** 将 `[[...]]`（不含代码围栏内）重写为 Markdown 链接或纯文本 */
function rewriteWikiLinksInText(text: string, resolveHref: WikiHrefResolver): string {
  return text.replace(/\[\[([^\]]+)\]\]/g, (whole, inner: string) => {
    const raw = inner.trim()
    const pipeIdx = raw.indexOf('|')
    const targetSide = pipeIdx === -1 ? raw : raw.slice(0, pipeIdx).trim()
    const labelSide = pipeIdx === -1 ? undefined : raw.slice(pipeIdx + 1).trim()

    let anchor = ''
    let targetWoHash = targetSide
    const hashIdx = targetSide.indexOf('#')
    if (hashIdx >= 0) {
      anchor = targetSide.slice(hashIdx) // includes #
      targetWoHash = targetSide.slice(0, hashIdx).trim()
    }

    const display = labelSide || targetWoHash.replace(/#\s*$/, '').trim() || raw
    const href = targetWoHash ? resolveHref(targetWoHash) : undefined

    if (!href) {
      return escapeMarkdownLabel(display)
    }

    // 锚点按原文传递；站内标题 slug 可能与 Obsidian 不完全一致，但多数仍可用
    return `[${escapeMarkdownLabel(display)}](${href}${anchor})`
  })
}

/** 跳过 ``` fenced code ``` 段落，仅在普通 Markdown 中替换维基链接 */
function preserveCodeBlocks(markdown: string, rewriteMd: (s: string) => string): string {
  let out = ''
  let i = 0
  while (i < markdown.length) {
    const open = markdown.indexOf('```', i)
    if (open === -1) {
      out += rewriteMd(markdown.slice(i))
      break
    }
    out += rewriteMd(markdown.slice(i, open))
    const close = markdown.indexOf('```', open + 3)
    if (close === -1) {
      out += markdown.slice(open)
      break
    }
    out += markdown.slice(open, close + 3)
    i = close + 3
  }
  return out
}

export function markdownWikiLinksPlugin(md: MarkdownIt, opts: { resolveHref: WikiHrefResolver }): void {
  md.core.ruler.before('normalize', 'flutter_kb_wiki_links', (state) => {
    state.src = preserveCodeBlocks(state.src, (chunk) =>
      rewriteWikiLinksInText(chunk, opts.resolveHref)
    )
  })
}

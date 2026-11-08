#!/usr/bin/env python3
"""把 pages/songscatalog.txt 的原文同步进 pages/songlist.html 的 noscript 区块。"""
import html
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TXT = ROOT / "pages" / "songscatalog.txt"
HTML = ROOT / "pages" / "songlist.html"

START = "<!-- ===== 爬虫文本 · 改歌只改这一块 ===== -->"
END = "<!-- ===== 爬虫文本结束 ===== -->"

def main() -> int:
    if not TXT.exists() or not HTML.exists():
        print("缺少文件：pages/songscatalog.txt 或 pages/songlist.html")
        return 1

    body = TXT.read_text(encoding="utf-8").replace("\r\n", "\n").strip("\n")
    escaped = html.escape(body)

    page = HTML.read_text(encoding="utf-8")
    i = page.find(START)
    j = page.find(END)
    if i < 0 or j < 0 or j < i:
        print("songlist.html 里找不到标记行，放弃修改")
        return 1

    new_block = (
        START
        + '\n<noscript><pre id="crawl-text">'
        + escaped
        + "</pre></noscript>\n"
        + END
    )
    new_page = page[:i] + new_block + page[j + len(END):]

    if new_page == page:
        print("内容无变化，跳过")
        return 0

    HTML.write_text(new_page, encoding="utf-8")
    print("已同步 %d 字节文本到 songlist.html" % len(escaped.encode("utf-8")))
    return 0

if __name__ == "__main__":
    sys.exit(main())

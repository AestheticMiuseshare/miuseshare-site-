#!/usr/bin/env python3
"""把 pages/songscatalog.txt 同步进 songlist.html 的 noscript 区块与 llms.txt 的曲目节。"""
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TXT = ROOT / "pages" / "songscatalog.txt"
HTML = ROOT / "pages" / "songlist.html"
LLMS = ROOT / "llms.txt"

START = "<!-- ===== 爬虫文本 · 改歌只改这一块 ===== -->"
END = "<!-- ===== 爬虫文本结束 ===== -->"
TRACK_HEAD = "## 曲目 / Tracks"


def read_body() -> str:
    raw = TXT.read_text(encoding="utf-8").replace("\r\n", "\n")
    return raw.strip("\n")


def parse_tracks(body: str) -> list:
    tracks = []
    for block in re.split(r"\n\s*\n", body):
        name = artist = genre = link = ""
        for line in block.split("\n"):
            t = line.strip()
            if not t or t.startswith("#") or re.match(r"^#\s*(single|album)$", t, re.I):
                continue
            if t.lower().startswith("http"):
                link = t
                continue
            if re.match(r"^\d+\s*[.、)）]", t):
                info = re.sub(r"^\d+\s*[.、)）]\s*", "", t)
                parts = re.split(r"[|｜]", info)
                am = re.search(r"artist\s*[:：]", info, re.I)
                if am:
                    left = info[: am.start()].strip(" |｜")
                    rest = info[am.end():]
                    parts = [left] + re.split(r"[|｜]", rest)
                parts = [p.strip() for p in parts if p.strip()]
                if parts:
                    name = parts[0]
                if len(parts) > 1:
                    artist = parts[1]
                if len(parts) > 2:
                    genre = ", ".join(parts[2:])
        if name:
            tracks.append((name, artist or "Miuseshare", genre, link))
    return tracks


def sync_html(body: str) -> bool:
    page = HTML.read_text(encoding="utf-8")
    i = page.find(START)
    j = page.find(END)
    if i < 0 or j < 0 or j < i:
        print("songlist.html 里找不到标记行，跳过")
        return False
    escaped = html.escape(body)
    new_block = (
        START
        + '\n<noscript><pre id="crawl-text">'
        + escaped
        + "</pre></noscript>\n"
        + END
    )
    new_page = page[:i] + new_block + page[j + len(END):]
    if new_page == page:
        return False
    HTML.write_text(new_page, encoding="utf-8")
    return True


def sync_llms(body: str) -> bool:
    if not LLMS.exists():
        print("缺少 llms.txt，跳过")
        return False
    text = LLMS.read_text(encoding="utf-8")
    lines = text.split("\n")
    start_idx = None
    for k, line in enumerate(lines):
        if line.strip() == TRACK_HEAD:
            start_idx = k
            break
    if start_idx is None:
        print("llms.txt 里找不到曲目节标题，跳过")
        return False
    end_idx = len(lines)
    for k in range(start_idx + 1, len(lines)):
        if lines[k].startswith("## "):
            end_idx = k
            break

    new_section = [TRACK_HEAD, ""]
    for name, artist, genre, link in parse_tracks(body):
        row = f"- {name}"
        if artist:
            row += f" | {artist}"
        if genre:
            row += f" | {genre}"
        if link:
            row += f" | {link}"
        new_section.append(row)
    new_section.append("")

    new_lines = lines[:start_idx] + new_section + lines[end_idx:]
    new_text = "\n".join(new_lines)
    if new_text == text:
        return False
    LLMS.write_text(new_text, encoding="utf-8")
    return True


def main() -> int:
    if not TXT.exists():
        print("缺少 pages/songscatalog.txt")
        return 1
    body = read_body()
    changed_html = sync_html(body)
    changed_llms = sync_llms(body)
    print("songlist.html 更新：%s，llms.txt 更新：%s" % (changed_html, changed_llms))
    return 0


if __name__ == "__main__":
    sys.exit(main())

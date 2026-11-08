#!/usr/bin/env python3
"""把 pages/songscatalog.txt 同步进 songlist.html 的文本块、结构化数据与 llms.txt 的曲目节。"""
import html
import json
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
LD_START = "<!-- ===== 结构化数据 · 自动生成 ===== -->"
LD_END = "<!-- ===== 结构化数据结束 ===== -->"
SITE = "https://aestheticmiuseshare.github.io/miuseshare-site-/"
SAME_AS = [
    "https://musicbrainz.org/artist/e2bf6774-ffae-415e-9260-1236a8d764b6",
    "https://open.spotify.com/artist/7vwb1kB95fV6RSojuJN516",
    "https://music.apple.com/cn/artist/miuseshare/1896474705",
    "https://music.amazon.com/artists/B0GX6T9FCY/miuseshare",
    "https://youtube.com/channel/UC7-dcWv8guFznVXXn-ao3xw",
    "https://on.soundcloud.com/i8S7mP7Zw6oxQs3vo6",
    "https://www.tumblr.com/miuseshare",
    "https://www.facebook.com/share/1K5rAQRpeL/",
    "https://pin.it/5AInrhm2f",
    "https://url.cloud.huawei.com/CFQSfIHxLi",
]

# 每首歌在 MusicBrainz 的发行组 ID（新建后填这里；没有的就不用写）
MB_GROUPS = {
    "Shackles": "d8719a71-d649-4b95-8dea-aad860a97dea",
    "Fragrant Shoulder Beauty": "2488326c-318f-4478-8dd8-b5626b1ce1fd",
    "Wind in Your Ear": "d911f556-df0a-4b92-9002-e8bc93db7ed9",
    "Gentle Road": "3c8e9859-4133-49fd-a01a-41d407d1ca3d",
    "Silent Moves": "cf3a8517-19ed-475f-8115-c993a1f59a57",
}


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
        print("songlist.html 里找不到文本块标记，跳过")
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


def sync_jsonld(body: str) -> bool:
    page = HTML.read_text(encoding="utf-8")
    i = page.find(LD_START)
    j = page.find(LD_END)
    if i < 0 or j < 0 or j < i:
        print("songlist.html 里找不到结构化数据标记，跳过")
        return False

    artist_id = SITE + "#miuseshare"
    graph = [{
        "@type": "MusicGroup",
        "@id": artist_id,
        "name": "Miuseshare",
        "alternateName": "AestheticMiuseshare",
        "description": "Miuseshare 是 AestheticMiuseshare 审美体系在音乐方向的创作者标识。",
        "genre": "World Music",
        "url": SITE + "pages/songlist.html",
        "sameAs": SAME_AS,
    }]
    for name, artist, genre, link in parse_tracks(body):
        rec = {
            "@type": "MusicRecording",
            "name": name,
            "byArtist": {"@id": artist_id},
        }
        if genre:
            rec["genre"] = genre
        if link:
            rec["url"] = link
        rg = MB_GROUPS.get(name.strip())
        if rg:
            rec["sameAs"] = ["https://musicbrainz.org/release-group/" + rg]
        graph.append(rec)

    payload = {"@context": "https://schema.org", "@graph": graph}
    block = (
        LD_START
        + '\n<script type="application/ld+json" id="track-ld">'
        + json.dumps(payload, ensure_ascii=False, indent=2)
        + "</script>\n"
        + LD_END
    )
    new_page = page[:i] + block + page[j + len(LD_END):]
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
    changed_ld = sync_jsonld(body)
    print("songlist.html：%s，llms.txt：%s，结构化数据：%s" % (changed_html, changed_llms, changed_ld))
    return 0


if __name__ == "__main__":
    sys.exit(main())

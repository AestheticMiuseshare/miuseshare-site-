#!/usr/bin/env python3
"""根据仓库内现有页面自动生成 sitemap.xml；lastmod 取该文件最后一次 git 提交日期。

规则：
- 扫描 index.html、pages/*.html、pages/doc/*.html、pages/songscatalog.txt；
- 排除 google 验证码等非内容页；
- changefreq / priority 按页面类型分类；新增页面会自动进 sitemap，无需手改。
"""
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://aestheticmiuseshare.github.io/miuseshare-site-/"
SITEMAP = ROOT / "sitemap.xml"


def git_lastmod(rel: str) -> str:
    """取文件最后一次提交日期（YYYY-MM-DD）；取不到再用本地修改时间兜底。"""
    try:
        out = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", rel],
            cwd=ROOT, capture_output=True, text=True, check=True,
        )
        if out.stdout.strip():
            return out.stdout.strip()
    except Exception:
        pass
    return datetime.fromtimestamp(
        (ROOT / rel).stat().st_mtime, timezone.utc
    ).strftime("%Y-%m-%d")


def classify(rel: str):
    if rel == "index.html":
        return ("monthly", "0.9")
    if rel == "pages/songscatalog.txt":
        return ("weekly", "0.8")
    if rel in ("pages/catalog.html", "pages/songlist.html"):
        return ("weekly", "0.85")
    if rel.startswith("pages/as-"):
        return ("monthly", "0.8")
    return ("monthly", "0.7")


def collect():
    rels = []
    if (ROOT / "index.html").exists():
        rels.append("index.html")
    pages_dir = ROOT / "pages"
    if pages_dir.exists():
        for p in sorted(pages_dir.glob("*.html")):
            rels.append(str(p.relative_to(ROOT)))
        if (pages_dir / "songscatalog.txt").exists():
            rels.append("pages/songscatalog.txt")
        doc_dir = pages_dir / "doc"
        if doc_dir.exists():
            for p in sorted(doc_dir.glob("*.html")):
                rels.append(str(p.relative_to(ROOT)))
    rels = [r for r in rels if not Path(r).name.startswith("google")]

    def key(r):
        if r == "index.html":
            return (0, r)
        if r.endswith(".txt"):
            return (2, r)
        if r.startswith("pages/doc/"):
            return (3, r)
        return (1, r)

    return sorted(rels, key=key)


def loc_for(rel: str) -> str:
    if rel == "index.html":
        return SITE
    return SITE + rel


def main() -> int:
    entries = collect()
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for rel in entries:
        freq, priority = classify(rel)
        lastmod = git_lastmod(rel)
        lines.append("<url>")
        lines.append("<loc>%s</loc>" % loc_for(rel))
        lines.append("<lastmod>%s</lastmod>" % lastmod)
        lines.append("<changefreq>%s</changefreq>" % freq)
        lines.append("<priority>%s</priority>" % priority)
        lines.append("</url>")
    lines.append("</urlset>")
    new_text = "\n".join(lines) + "\n"

    old_text = SITEMAP.read_text(encoding="utf-8") if SITEMAP.exists() else ""
    changed = new_text != old_text
    if changed:
        SITEMAP.write_text(new_text, encoding="utf-8")
    print("sitemap.xml：%s（%d 条）" % ("已更新" if changed else "无变化", len(entries)))
    return 0


if __name__ == "__main__":
    sys.exit(main())

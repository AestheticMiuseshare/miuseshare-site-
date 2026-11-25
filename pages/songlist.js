// songlist.js
(async () => {
  const catalogUrl = "songscatalog.txt";
  const container = document.getElementById("catalogContainer");
  container.innerHTML = "<div>加载中...</div>";

  try {
    const res = await fetch(catalogUrl);
    if (!res.ok) throw new Error("目录读取失败");
    const text = await res.text();
    const blocks = text.split(/\n{2,}/).filter(b => b.trim());
    container.innerHTML = "";

    blocks.forEach(block => {
      const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
      if (lines.length === 0) return;

      let type = "single";
      let albumTitle = "";
      let albumDescEn = "";
      let num = "";
      let title = "";
      let artist = "";
      let styleRaw = "";
      let imgSrc = "";
      let enSentence = "";
      let zhSentence = "";
      let linkUrl = "";
      let tagsLine = "";

      // 识别专辑头 Album:xxx
      if (lines[0].startsWith("Album:")) {
        type = "album";
        const albumHead = lines.shift();
        const albumMatch = albumHead.match(/^Album:(.+?)(?=\s*$)/);
        if (albumMatch) {
          albumTitle = albumMatch[1];
          // 专辑描述如果紧跟在Album行，单独提取
          if (lines.length > 0 && !/^\d+\./.test(lines[0])) {
            albumDescEn = lines.shift();
          }
        }
      }

      // 匹配曲目行 29. Lingering by Mulan Lake | Artist:Miuseshare | FusionMusic...
      const trackLineIdx = lines.findIndex(l => /^\d+\./.test(l));
      if (trackLineIdx > -1) {
        const trackLine = lines[trackLineIdx];
        lines.splice(trackLineIdx, 1);
        const trackMatch = trackLine.match(/^(\d+)\.\s*([^|]+)\s*\|\s*Artist:([^|]+)\s*\|\s*(.*)$/);
        if (trackMatch) {
          num = trackMatch[1];
          title = trackMatch[2].trim();
          artist = trackMatch[3].trim();
          styleRaw = trackMatch[4].trim();
        }
      }

      // 遍历剩下行，抓取链接、图片、英文句、中文句、标签
      for (const line of lines) {
        if (line.startsWith("https://song.link/")) {
          linkUrl = line;
          continue;
        }
        if (line.startsWith("<img src=")) {
          const imgMatch = line.match(/src="([^"]+)"/);
          if (imgMatch) imgSrc = imgMatch[1];
          continue;
        }
        if (!tagsLine && line.startsWith("#")) {
          tagsLine = line;
          continue;
        }
        // 优先英文、中文诗句
        if (!enSentence) {
          enSentence = line;
        } else if (!zhSentence) {
          zhSentence = line;
        }
      }

      // 标签数组
      const tags = tagsLine ? tagsLine.split(/\s+/).filter(t => t.startsWith("#")) : [];

      // 卡片DOM
      const card = document.createElement("div");
      card.style.cssText = `border:1px solid #eee;border-radius:14px;padding:16px;margin-bottom:18px;overflow:hidden;`;

      if (type === "album" && albumTitle) {
        const albumHeadDom = document.createElement("div");
        albumHeadDom.style.cssText = `margin-bottom:12px;color:#444;font-weight:500;`;
        albumHeadDom.innerText = `Album: ${albumTitle}`;
        card.appendChild(albumHeadDom);
        if (albumDescEn) {
          const descDom = document.createElement("div");
          descDom.style.cssText = `color:#666;font-size:0.9rem;margin-bottom:12px;`;
          descDom.innerText = albumDescEn;
          card.appendChild(descDom);
        }
      }

      // 图片 懒加载
      if (imgSrc) {
        const img = document.createElement("img");
        img.loading = "lazy";
        img.src = imgSrc;
        img.alt = title;
        img.style.cssText = `width:100%;border-radius:10px;margin-bottom:14px;`;
        card.appendChild(img);
      }

      // 曲目标题
      const titleDom = document.createElement("h2");
      titleDom.style.cssText = `font-size:1.4rem;margin:0 0 8px;`;
      titleDom.innerText = `${num}. ${title}`;
      card.appendChild(titleDom);

      // 艺术家+风格，加自动换行
      const metaDom = document.createElement("div");
      metaDom.style.cssText = `color:#555;margin-bottom:10px;word-break:break-all;`;
      metaDom.innerText = `${artist} | ${styleRaw}`;
      card.appendChild(metaDom);

      // Play按钮，有链接才渲染
      if (linkUrl) {
        const playBtn = document.createElement("a");
        playBtn.href = linkUrl;
        playBtn.target = "_blank";
        playBtn.style.cssText = `display:inline-block;background:#222;color:#fff;padding:7px 14px;border-radius:8px;text-decoration:none;margin-bottom:12px;font-size:0.9rem;`;
        playBtn.innerText = "Play";
        card.appendChild(playBtn);
      }

      // 诗句
      if (enSentence) {
        const enDom = document.createElement("div");
        enDom.style.cssText = `font-style:normal;color:#333;margin-bottom:6px;`;
        enDom.innerText = enSentence;
        card.appendChild(enDom);
      }
      if (zhSentence) {
        const zhDom = document.createElement("div");
        zhDom.style.cssText = `color:#555;margin-bottom:12px;`;
        zhDom.innerText = zhSentence;
        card.appendChild(zhDom);
      }

      // 标签胶囊
      if (tags.length > 0) {
        const tagWrap = document.createElement("div");
        tagWrap.style.cssText = `display:flex;flex-wrap:wrap;gap:8px;`;
        tags.forEach(tagText => {
          const tag = document.createElement("span");
          tag.style.cssText = `border:1px solid #bbb;border-radius:99px;padding:4px 10px;font-size:0.8rem;color:#444;white-space:nowrap;`;
          tag.innerText = tagText;
          tagWrap.appendChild(tag);
        });
        card.appendChild(tagWrap);
      }

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<div style="color:#b33">加载失败：${err.message}</div>`;
  }
})();

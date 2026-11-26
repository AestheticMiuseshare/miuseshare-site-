var _css = document.createElement('style');
_css.textContent = '.track-block{margin-bottom:1.6rem;padding:1rem;border:1px solid #ddd;border-radius:12px}' +
'.group-title-single{font-size:1.2rem;font-weight:bold;margin:2rem 0 .8rem;color:#222}' +
'.group-title-album{font-size:1.3rem;font-weight:bold;margin:2.2rem 0 1rem;color:#1a1a1a;border-bottom:1px solid #cccccc;padding-bottom:.4rem}' +
'.track-index{font-size:1rem;color:#222;font-weight:normal;margin-right:.25rem}' +
'.track-name{font-size:1rem;font-weight:bold}' +
'.track-meta{font-size:.88rem;color:#555;margin:.4rem 0 .8rem;word-break:break-word;overflow-wrap:break-word;line-height:1.5}' +
'.track-img{max-width:100%;border-radius:8px;margin-bottom:0.8rem}' +
'.poem-en{font-size:0.92rem;color:#333;margin:0.4rem 0 0.2rem 0;font-family:system-ui,-apple-system,\'Segoe UI\',Roboto,sans-serif;white-space:normal;overflow-wrap:break-word;max-width:100%}' +
'.poem-cn{font-size:0.92rem;color:#444;margin-bottom:0.8rem;white-space:normal;overflow-wrap:break-word;max-width:100%}' +
'.play-btn{display:inline-block;padding:.4rem .8rem;background:#f4f4f4;border:1px solid #ccc;border-radius:8px;text-decoration:none;color:#222;font-size:.85rem}' +
'.play-btn:active{background:#e9e9e9}' +
'.tag-group{margin-top:.8rem}' +
'.tag-item{display:inline-block;border:1px solid #777;border-radius:999px;padding:.22rem .6rem;margin:.2rem .15rem;color:#222;font-size:.8rem}' +
'.load-note{font-size:.85rem;color:#777;margin:1rem 0}' +
'.track-block{scroll-margin-top:16px}' +
'.side-nav{position:fixed;right:22px;top:50%;transform:translateY(-50%);width:176px;max-height:68vh;display:flex;flex-direction:column;background:rgba(255,255,255,.88);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid #e5e7eb;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,.07);z-index:60;overflow:hidden}' +
'.side-nav__head{display:flex;align-items:center;justify-content:space-between;padding:10px 12px 6px;font-size:.72rem;letter-spacing:.08em;color:#888}' +
'.side-nav__close{display:none;background:none;border:none;color:#888;font-size:1.1rem;line-height:1;cursor:pointer;padding:0 2px}' +
'.side-nav__list{flex:1;overflow-y:auto;padding:4px 8px 8px;scrollbar-width:thin;-webkit-overflow-scrolling:touch}' +
'.side-nav__group{font-size:.7rem;color:#999;margin:8px 4px 4px;letter-spacing:.04em}' +
'.side-nav__item{display:flex;align-items:center;gap:.45rem;width:100%;background:none;border:none;text-align:left;font-size:.78rem;color:#555;padding:.32rem .45rem;border-radius:8px;cursor:pointer;white-space:nowrap;overflow:hidden}' +
'.side-nav__item:hover{background:#f4f5f7}' +
'.side-nav__item.active{color:#1a1a1a;font-weight:600;background:#f1f2f4}' +
'.side-nav__num{flex:0 0 1.9rem;font-variant-numeric:tabular-nums;color:#999}' +
'.side-nav__item.active .side-nav__num{color:#1a1a1a}' +
'.side-nav__label{overflow:hidden;text-overflow:ellipsis}' +
'.side-nav__foot{padding:8px 12px;border-top:1px solid #eee;display:flex;justify-content:space-between;align-items:center;gap:.5rem}' +
'.side-nav__progress{font-size:.72rem;color:#888;font-variant-numeric:tabular-nums}' +
'.side-nav__top{background:#f4f4f4;border:1px solid #ddd;border-radius:8px;color:#333;font-size:.78rem;padding:.3rem .6rem;cursor:pointer}' +
'.nav-fab{position:fixed;right:16px;bottom:88px;z-index:59;width:42px;height:42px;border-radius:50%;background:#fff;border:1px solid #e5e7eb;box-shadow:0 6px 18px rgba(0,0,0,.1);display:none;align-items:center;justify-content:center;cursor:pointer;color:#333;font-size:1rem}' +
'.nav-fab svg{width:20px;height:20px;display:block;transition:color .18s ease,transform .18s ease}' +
'.nav-fab:hover{color:#1a1a1a}' +
'.nav-fab:hover svg{transform:rotate(-6deg)}' +
'.nav-topfab{position:fixed;right:16px;bottom:136px;z-index:59;width:42px;height:42px;border-radius:50%;background:#fff;border:1px solid #e5e7eb;box-shadow:0 6px 18px rgba(0,0,0,.1);display:none;align-items:center;justify-content:center;cursor:pointer;color:#333;font-size:1rem}' +
'.side-nav-mask{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.18);z-index:58;display:none}' +
'.side-nav-mask.show{display:block}' +
'body.body-lock{overflow:hidden}' +
'@media (max-width:900px){' +
'.side-nav{right:0;top:0;width:230px;max-height:100vh;border-radius:14px 0 0 14px;transform:translateX(110%);transition:transform .25s ease}' +
'.side-nav.open{transform:translateX(0)}' +
'.side-nav__close{display:block}' +
'.nav-fab{display:flex}' +
'.nav-topfab.show{display:flex}' +
'}';
document.head.appendChild(_css);
var wrap = document.querySelector('#wrap');
var note = document.querySelector('#note');
var TXT_URL = './songscatalog.txt';
var FETCH_TIMEOUT = 12000;

function stripIndex(s){
  return s.replace(/^\s*\d+\s*[.、)）]\s*/,'').trim();
}
function splitTags(line){
  var out = [];
  var parts = line.split(/[,，]/);
  for(var i=0; i<parts.length; i++){
    var words = parts[i].split(/#+/);
    for(var j=0; j<words.length; j++){
      var w = words[j].trim().replace(/[,，]+$/,'');
      if(w) out.push(w);
    }
  }
  return out;
}
function parseBlock(lines){
  var mode = 'single';
  var album = '';
  var waitAlbum = false;
  var hasMarker = false;
  var info = '';
  var link = '';
  var imgSrc = '';
  var enPoem = '';
  var cnPoem = '';
  var tagLines = [];
  var prose = [];
  for(var k=0; k<lines.length; k++){
    var t = lines[k].trim();
    if(!t) continue;
    var amLine = t.match(/^#?\s*album\s*[:：]\s*(.+)$/i);
    if(amLine){
      mode = 'album';
      hasMarker = true;
      album = amLine[1].trim();
      waitAlbum = false;
      continue;
    }
    var m = t.match(/^#?\s*(single|album)\s*$/i);
    if(m){
      mode = m[1].toLowerCase();
      hasMarker = true;
      waitAlbum = (mode === 'album');
      continue;
    }
    if(t.substring(0,4) === '<img'){
      var srcMatch = t.match(/src="([^"]+)"/);
      if(srcMatch) imgSrc = srcMatch[1];
      continue;
    }
    if(t.charAt(0) === '#'){
      tagLines.push(t);
      continue;
    }
    if(/^https?:\/\//i.test(t)){
      link = t;
      continue;
    }
    if(/^\s*\d+\s*[.、)）]/.test(t)){
      info = t;
      continue;
    }
    if(waitAlbum){
      album = t;
      waitAlbum = false;
      continue;
    }
    prose.push(t);
  }
  var enLines = [];
  var cnLines = [];
  for(var p=0; p<prose.length; p++){
    if(/[\u4e00-\u9fff]/.test(prose[p])){ cnLines.push(prose[p]); } else { enLines.push(prose[p]); }
  }
  enPoem = enLines.join(' ');
  cnPoem = cnLines.join(' ');

  var body = stripIndex(info);
  var name = body;
  var artist = '';
  var genre = '';
  var am = body.match(/artist\s*[:：]/i);
  if(am){
    var idx = am.index;
    name = body.slice(0, idx).replace(/[|｜]/g,' ').replace(/\s{2,}/g,' ').trim();
    var rest = body.slice(idx + am[0].length).trim();
    var g = rest.split(/[|｜]/);
    artist = (g[0] || '').trim();
    genre = g.slice(1).map(function(x){return x.trim();}).filter(Boolean).join(' ');
  }else if(/[|｜]/.test(body)){
    var sp = body.split(/[|｜]/).map(function(x){return x.trim();});
    name = sp[0] || body;
    artist = sp[1] || '';
    genre = sp.slice(2).filter(Boolean).join(' ');
  }
  var tags = [];
  for(var q=0; q<tagLines.length; q++){
    tags = tags.concat(splitTags(tagLines[q]));
  }
  var unique = [];
  for(var r=0; r<tags.length; r++){
    if(unique.indexOf(tags[r]) === -1) unique.push(tags[r]);
  }
  tags = unique;
  return {mode:mode, album:album, name:name, artist:artist, genre:genre, link:link, tags:tags, hasMarker:hasMarker, imgSrc:imgSrc, enPoem:enPoem, cnPoem:cnPoem};
}
function groupTitle(track){
  if(track.mode === 'album'){
    return track.album ? 'Album: ' + track.album : 'Album 专辑';
  }
  return 'Single';
}
function render(text){
  try{
    text = String(text).replace(/\u00A0/g, ' ');
    wrap.innerHTML = '';
    var blocks = text
      .replace(/\r/g,'')
      .split(/\n{2,}/)
      .map(function(b){
        return b.split('\n').filter(function(l){return l.trim() !== '';});
      })
      .filter(function(b){return b.length;});
    var carryMode = 'single';
    var carryAlbum = '';
    var tracks = blocks.map(parseBlock).map(function(t){
      if(t.hasMarker){
        carryMode = t.mode;
        carryAlbum = t.album;
      }else{
        t.mode = carryMode;
        t.album = carryAlbum;
      }
      return t;
    }).filter(function(t){return t.name || t.link;});

    var lastKey = null;
    for(var ti = 0; ti < tracks.length; ti++){
      var t = tracks[ti];
      var key = t.mode + '|' + t.album;
      if(key !== lastKey){
        var groupDiv = document.createElement('div');
        groupDiv.className = (t.mode === 'album') ? 'group-title-album' : 'group-title-single';
        groupDiv.textContent = groupTitle(t);
        wrap.appendChild(groupDiv);
        lastKey = key;
      }
      var block = document.createElement('div');
      block.className = 'track-block';

      if(t.imgSrc){
        var img = document.createElement('img');
        img.className = 'track-img';
        img.loading = 'lazy';
        img.src = t.imgSrc;
        img.alt = '';
        block.appendChild(img);
      }
      if(t.enPoem){
        var pEn = document.createElement('div');
        pEn.className = 'poem-en';
        pEn.textContent = t.enPoem;
        block.appendChild(pEn);
      }
      if(t.cnPoem){
        var pCn = document.createElement('div');
        pCn.className = 'poem-cn';
        pCn.textContent = t.cnPoem;
        block.appendChild(pCn);
      }
      var nameDiv = document.createElement('div');
      nameDiv.className = 'track-name';
      nameDiv.textContent = (ti+1)+'. '+t.name;
      block.appendChild(nameDiv);

      var metaDiv = document.createElement('div');
      metaDiv.className = 'track-meta';
      metaDiv.textContent = t.artist + ' | ' + t.genre;
      block.appendChild(metaDiv);

      if(t.link){
        var a = document.createElement('a');
        a.className = 'play-btn';
        a.href = t.link;
        a.target = '_blank';
        a.textContent = 'Play';
        block.appendChild(a);
      }
      var tagWrap = document.createElement('div');
      tagWrap.className = 'tag-group';
      for(var s=0; s<t.tags.length; s++){
        var span = document.createElement('span');
        span.className = 'tag-item';
        span.textContent = t.tags[s];
        tagWrap.appendChild(span);
      }
      block.appendChild(tagWrap);
      wrap.appendChild(block);
    }
    if(note) note.textContent = '';
    buildNav();
  }catch(e){
    if(note) note.textContent = '解析出错：' + e.message;
    console.error(e);
  }
}
function loadCatalog(){
  if(note) note.textContent = '加载曲目目录中，请稍候……';
  try{
    var xhr = new XMLHttpRequest();
    var timer = setTimeout(function(){
      xhr.abort();
      if(note) note.textContent = '加载超时，请刷新页面重试';
    }, FETCH_TIMEOUT);
    xhr.open('GET', TXT_URL, true);
    xhr.overrideMimeType('text/plain; charset=utf-8');
    xhr.onload = function(){
      clearTimeout(timer);
      if(xhr.status >= 200 && xhr.status < 300){
        render(xhr.responseText);
      }else{
        if(note) note.textContent = '读取txt失败，HTTP状态：'+xhr.status+'，可以多刷新几次';
      }
    };
    xhr.onerror = function(){
      clearTimeout(timer);
      if(note) note.textContent = '网络读取延迟/失败，请刷新重试';
    };
    xhr.send();
  }catch(e){
    if(note) note.textContent = '请求异常：'+e.message;
    console.error(e);
  }
}
loadCatalog();

/* ===== 右侧曲目索引导航（目录 + 进度 + 回顶） ===== */
var navItems = [];
var navList = null;
var navProg = null;
var navTopFab = null;
var navBuilt = false;
var nav, mask, fab;

function closeNav(){
  nav.classList.remove('open');
  mask.classList.remove('show');
  document.body.classList.remove('body-lock');
  if(fab) fab.style.display = '';
  if(navTopFab) navTopFab.style.display = '';
}
function openNav(){
  nav.classList.add('open');
  mask.classList.add('show');
  document.body.classList.add('body-lock');
  if(fab) fab.style.display = 'none';
  if(navTopFab) navTopFab.style.display = 'none';
}
function toggleNav(){
  if(nav.classList.contains('open')){
    closeNav();
  }else{
    openNav();
  }
}

function scrollToEl(el){
  if(!el) return;
  var rect = el.getBoundingClientRect();
  var target = rect.top + window.scrollY;
  window.scrollTo(0, target);
}
function scrollToTop(){
  window.scrollTo(0, 0);
}

function buildNav(){
  var old = document.querySelector('.side-nav');
  if(old) old.parentNode.removeChild(old);
  var oldFab = document.querySelector('.nav-fab');
  if(oldFab) oldFab.parentNode.removeChild(oldFab);
  var oldTop = document.querySelector('.nav-topfab');
  if(oldTop) oldTop.parentNode.removeChild(oldTop);
  var oldMask = document.querySelector('.side-nav-mask');
  if(oldMask) oldMask.parentNode.removeChild(oldMask);

  var nodes = wrap.children;
  var entries = [];
  var idx = 0;
  for(var i=0;i<nodes.length;i++){
    var el = nodes[i];
    if(el.classList && el.classList.contains('track-block')){
      idx++;
      var nameEl = el.querySelector('.track-name');
      var label = nameEl ? nameEl.textContent : ('Track '+idx);
      el.id = 'track-' + idx;
      entries.push({type:'track', label:label, el:el, num:idx});
    }else if(el.classList && (el.classList.contains('group-title-single') || el.classList.contains('group-title-album'))){
      entries.push({type:'group', label:el.textContent, el:el});
    }
  }
  if(!entries.length) return;

  nav = document.createElement('nav');
  nav.className = 'side-nav';
  nav.setAttribute('aria-label','曲目目录导航');

  var head = document.createElement('div');
  head.className = 'side-nav__head';
  var headTitle = document.createElement('span');
  headTitle.textContent = '目录 · ' + idx;
  var closeBtn = document.createElement('button');
  closeBtn.className = 'side-nav__close';
  closeBtn.setAttribute('aria-label','关闭目录');
  closeBtn.textContent = '×';
  head.appendChild(headTitle);
  head.appendChild(closeBtn);

  var list = document.createElement('div');
  list.className = 'side-nav__list';

  navItems = [];
  entries.forEach(function(en){
    if(en.type === 'group'){
      var g = document.createElement('div');
      g.className = 'side-nav__group';
      g.textContent = en.label;
      list.appendChild(g);
    }else{
      var b = document.createElement('button');
      b.className = 'side-nav__item';
      var num = document.createElement('span');
      num.className = 'side-nav__num';
      num.textContent = en.num;
      var lab = document.createElement('span');
      lab.className = 'side-nav__label';
      lab.textContent = en.label.replace(/^\s*\d+\s*[.、)）]\s*/,'');
      b.appendChild(num);
      b.appendChild(lab);
      b.addEventListener('click', function(){
        closeNav();
        setTimeout(function(){ scrollToEl(en.el); }, 60);
      });
      list.appendChild(b);
      navItems.push({el:en.el, btn:b});
    }
  });

  var foot = document.createElement('div');
  foot.className = 'side-nav__foot';
  var prog = document.createElement('span');
  prog.className = 'side-nav__progress';
  prog.textContent = '0%';
  var topBtn = document.createElement('button');
  topBtn.className = 'side-nav__top';
  topBtn.textContent = '↑ 顶部';
  topBtn.addEventListener('click', scrollToTop);
  foot.appendChild(prog);
  foot.appendChild(topBtn);

  nav.appendChild(head);
  nav.appendChild(list);
  nav.appendChild(foot);
  document.body.appendChild(nav);

  mask = document.createElement('div');
  mask.className = 'side-nav-mask';
  document.body.appendChild(mask);

  closeBtn.addEventListener('click', closeNav);
  mask.addEventListener('click', closeNav);

  fab = document.createElement('button');
  fab.className = 'nav-fab';
  fab.setAttribute('aria-label','打开目录');
  fab.innerHTML = '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width:24px;height:24px">' +
    '<defs><style>' +
    '.fab-lw{transform-origin:24px 19px;animation:fab-lw 0.6s ease-in-out infinite alternate}' +
    '.fab-rw{transform-origin:24px 19px;animation:fab-rw 0.6s ease-in-out infinite alternate}' +
    '.fab-ld{transform-origin:24px 26px;animation:fab-ld 0.68s ease-in-out infinite alternate}' +
    '.fab-rd{transform-origin:24px 26px;animation:fab-rd 0.68s ease-in-out infinite alternate}' +
    '@keyframes fab-lw{from{transform:rotate(0deg)}to{transform:rotate(-12deg)}}' +
    '@keyframes fab-rw{from{transform:rotate(0deg)}to{transform:rotate(12deg)}}' +
    '@keyframes fab-ld{from{transform:rotate(0deg)}to{transform:rotate(-9deg)}}' +
    '@keyframes fab-rd{from{transform:rotate(0deg)}to{transform:rotate(9deg)}}' +
    '</style></defs>' +
    '<path class="fab-lw" d="M24 17 C16 8 8 4 4 12 C2 20 8 27 14 26 C19 25 22 22 24 19 Z" fill="#2299ff" stroke="#084488" stroke-width="0.8"/>' +
    '<path class="fab-rw" d="M24 17 C32 8 40 4 44 12 C46 20 40 27 34 26 C29 25 26 22 24 19 Z" fill="#2299ff" stroke="#084488" stroke-width="0.8"/>' +
    '<path class="fab-ld" d="M24 26 C17 34 11 37 9 33 C8 29 15 25 20 24 C22 24 23 25 24 26 Z" fill="#1177dd" stroke="#084488" stroke-width="0.8"/>' +
    '<path class="fab-rd" d="M24 26 C31 34 37 37 39 33 C40 29 33 25 28 24 C26 24 25 25 24 26 Z" fill="#1177dd" stroke="#084488" stroke-width="0.8"/>' +
    '<path d="M24 13 L24 34" stroke="#083366" stroke-width="1.2" stroke-linecap="round"/>' +
    '<path d="M24 13 C20 8 17 7 15 9" stroke="#083366" stroke-width="0.7" fill="none" stroke-linecap="round"/>' +
    '<path d="M24 13 C28 8 31 7 33 9" stroke="#083366" stroke-width="0.7" fill="none" stroke-linecap="round"/>' +
    '</svg>';
  fab.addEventListener('click', toggleNav);
  document.body.appendChild(fab);

  var topFab = document.createElement('button');
  topFab.className = 'nav-topfab';
  topFab.setAttribute('aria-label','回到顶部');
  topFab.textContent = '↑';
  topFab.addEventListener('click', scrollToTop);
  document.body.appendChild(topFab);

  navList = list;
  navProg = prog;
  navTopFab = topFab;

  if(!navBuilt){
    navBuilt = true;
    window.addEventListener('scroll', onNavScroll, {passive:true});
  }
  onNavScroll();
}

function onNavScroll(){
  var doc = document.documentElement;
  if(!doc) return;
  var max = doc.scrollHeight - window.innerHeight;
  var ratio = max > 0 ? window.scrollY / max : 0;
  if(navProg) navProg.textContent = Math.round(ratio * 100) + '%';
  if(navTopFab) navTopFab.classList.toggle('show', window.scrollY > 300);

  var mid = window.innerHeight * 0.35;
  var current = null;
  for(var k=0;k<navItems.length;k++){
    var r = navItems[k].el.getBoundingClientRect();
    if(r.top <= mid) current = navItems[k];
  }
  if(current){
    for(var j=0;j<navItems.length;j++) navItems[j].btn.classList.remove('active');
    current.btn.classList.add('active');
    if(navList){
      navList.scrollTop = current.btn.offsetTop - navList.clientHeight / 2;
    }
  }
}

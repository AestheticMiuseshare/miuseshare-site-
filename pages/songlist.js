var _css = document.createElement('style');
_css.textContent = '.track-block{margin-bottom:1.6rem;padding:1rem;border:1px solid #ddd;border-radius:12px}' +
'.group-title-single{font-size:1.2rem;font-weight:bold;margin:2rem 0 .8rem;color:#222}' +
'.group-title-album{font-size:1.3rem;font-weight:bold;margin:2.2rem 0 1rem;color:#1a1a1a;border-bottom:1px solid #cccccc;padding-bottom:.4rem}' +
'.track-index{font-size:1rem;color:#222;font-weight:normal;margin-right:.25rem}' +
'.track-name{font-size:1rem;font-weight:bold}' +
'.track-meta{font-size:.88rem;color:#555;margin:.4rem 0 .8rem}' +
'.track-img{max-width:100%;border-radius:8px;margin-bottom:0.8rem}' +
'.poem-en{font-size:0.95rem;color:#333;margin:0.4rem 0 0.2rem 0;font-family:system-ui,-apple-system,\'Segoe UI\',Roboto,sans-serif;letter-spacing:0.02em;line-height:1.6}' +
'.poem-cn{font-size:0.92rem;color:#444;margin-bottom:0.8rem}' +
'.play-btn{display:inline-block;padding:.4rem .8rem;background:#f4f4f4;border:1px solid #ccc;border-radius:8px;text-decoration:none;color:#222;font-size:.85rem}' +
'.play-btn:active{background:#e9e9e9}' +
'.tag-group{margin-top:.8rem}' +
'.tag-item{display:inline-block;border:1px solid #777;border-radius:999px;padding:.22rem .6rem;margin:.2rem .15rem;color:#222;font-size:.8rem}' +
'.load-note{font-size:.85rem;color:#777;margin:1rem 0}';
document.head.appendChild(_css);
var wrap = document.querySelector('#wrap');
var note = document.querySelector('#note');
var TXT_URL = './songscatalog.txt';

function esc(s){
  s = String(s == null ? '' : s);
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
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
  var imgHtml = '';
  var enPoem = '';
  var cnPoem = '';
  var tagLines = [];
  var prose = [];
  for(var k=0; k<lines.length; k++){
    var t = lines[k].trim();
    if(!t) continue;
    var m = t.match(/^#?\s*(single|album)\s*$/i);
    if(m){
      mode = m[1].toLowerCase();
      hasMarker = true;
      waitAlbum = (mode === 'album');
      continue;
    }
    if(t.substring(0,4) === '<img'){
      imgHtml = t;
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
  return {mode:mode, album:album, name:name, artist:artist, genre:genre, link:link, tags:tags, hasMarker:hasMarker, imgHtml:imgHtml, enPoem:enPoem, cnPoem:cnPoem};
}
function groupTitle(track){
  if(track.mode === 'album'){
    return track.album ? track.album : 'Album 专辑';
  }
  return 'Single 单曲';
}
function render(text){
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
  var html = '';
  var lastKey = null;
  for(var ti = 0; ti < tracks.length; ti++){
    var t = tracks[ti];
    var key = t.mode + '|' + t.album;
    if(key !== lastKey){
      var cls = (t.mode === 'album') ? 'group-title-album' : 'group-title-single';
      html += '<div class="'+cls+'">'+esc(groupTitle(t))+'</div>';
      lastKey = key;
    }
    var tagHtml = '';
    for(var s=0; s<t.tags.length; s++){
      tagHtml += '<span class="tag-item">'+esc(t.tags[s])+'</span>';
    }
    var meta = [t.artist, t.genre].filter(Boolean).join(' ｜ ');
    var linkHtml = '';
    if(t.link){
      linkHtml = '<a class="play-btn" href="'+esc(t.link)+'" target="_blank" rel="noopener noreferrer">Play</a>';
    }
    var imgDom = '';
    if(t.imgHtml){
      imgDom = t.imgHtml.replace('<img ','<img class="track-img" ');
    }
    var enDom = t.enPoem ? '<div class="poem-en">'+esc(t.enPoem)+'</div>' : '';
    var cnDom = t.cnPoem ? '<div class="poem-cn">'+esc(t.cnPoem)+'</div>' : '';
    html += '<div class="track-block">'+imgDom+enDom+cnDom+
    '<div class="track-name"><span class="track-index">'+(ti+1)+'.</span> '+esc(t.name)+'</div>'+
    '<div class="track-meta">'+esc(meta)+'</div>'+linkHtml+
    '<div class="tag-group">'+tagHtml+'</div></div>';
  }
  wrap.innerHTML = html;
  if(!tracks.length){
    note.textContent = '曲目数据为空，请检查 songscatalog.txt';
  }
}
function loadCatalog(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', TXT_URL, true);
  xhr.onload = function(){
    if(xhr.status >= 200 && xhr.status < 300){
      render(xhr.responseText);
    }else{
      note.textContent = '曲目数据读取失败：HTTP ' + xhr.status;
    }
  };
  xhr.onerror = function(){
    note.textContent = '曲目数据读取失败：网络请求异常（请确认 songscatalog.txt 与本页在同一目录）';
  };
  xhr.send();
}
loadCatalog();
ock);
    }
    if(note) note.textContent = '';
  }catch(e){
    if(note) note.textContent = '解析出错：' + e.message;
    console.error(e);
  }
}
function loadCatalog(){
  try{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', TXT_URL, true);
    xhr.overrideMimeType('text/plain; charset=utf-8');
    xhr.onload = function(){
      if(xhr.status >= 200 && xhr.status < 300){
        render(xhr.responseText);
      }else{
        if(note) note.textContent = '读取txt失败，HTTP状态：'+xhr.status;
      }
    };
    xhr.onerror = function(){
      if(note) note.textContent = '网络读取失败，检查songscatalog.txt路径';
    };
    xhr.send();
  }catch(e){
    if(note) note.textContent = '请求异常：'+e.message;
    console.error(e);
  }
}
loadCatalog();

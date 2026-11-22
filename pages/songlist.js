var _css = document.createElement('style');
_css.textContent = '.track-block{margin-bottom:1.6rem;padding:1rem;border:1px solid #ddd;border-radius:12px}' +
'.group-title-single{font-size:1.2rem;font-weight:bold;margin:2rem 0 .8rem;color:#222}' +
'.group-title-album{font-size:1.3rem;font-weight:bold;margin:2.2rem 0 1rem;color:#1a1a1a;border-bottom:1px solid #cccccc;padding-bottom:.4rem}' +
'.track-index{font-size:1rem;color:#222;font-weight:normal;margin-right:.25rem}' +
'.track-name{font-size:1rem;font-weight:bold}' +
'.track-meta{font-size:.88rem;color:#555;margin:.4rem 0 .8rem}' +
'.track-img{max-width:100%;border-radius:8px;margin-bottom:0.8rem}' +
'.poem-en{font-size:0.92rem;color:#333;margin:0.4rem 0 0.2rem 0;font-family:system-ui,-apple-system,\'Segoe UI\',Roboto,sans-serif}' +
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
    return track.album ? track.album : 'Album 专辑';
  }
  return 'Single';
}
function render(text){
  try{
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

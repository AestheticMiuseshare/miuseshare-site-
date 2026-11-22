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
var EMBEDDED = "Single\n1. Shackles | Artist:Miuseshare | world music, rap\nhttps://song.link/s/0zRsSSJjkyZILkWoRnFoXs\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/Shackles.jpg\" alt=\"\">\nBreak the shackles, set the spirit free, then set myself free.\n挣脱枷锁，释放灵魂，解脱自我。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n2. Fragrant Shoulder Beauty | Artist:Miuseshare | world music, Lofi\nhttps://song.link/s/6B044eLbIiTFBI5wdQqDGI\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/bt.jpg\" alt=\"\">\nWith true heart as light, tenderness as might.\n以真心为光，以温柔为力量。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n3. Wind in Your Ear | Artist:Miuseshare | world music, Pop\nhttps://song.link/y/mEC4X383oyQ\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/wiye.jpg\" alt=\"\">\nI'll hold you close through the dark and light.\nWith you right here, I'm here to stay.\n晨昏明暗之间，我将紧紧拥住你。\n有你相伴在此，我便不会离去。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n4. Gentle Road | Artist:Miuseshare | world music, EDM\nhttps://song.link/y/XzBzZFUw-uU\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/gr.jpg\" alt=\"\">\nFree and clear inside, quietly satisfied.\n内心清朗自在，安然知足。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n5. Silent Moves | Artist:Miuseshare | world music, Dance\nhttps://song.link/y/puUZreAb46o\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/sm.jpg\" alt=\"\">\nIn the stillness of the movement, you find your own dimension.\n于动静之间，寻得属于自己的维度。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n6. Dunhuang Apsaras Dance | Artist:Miuseshare | world music, Dance\nhttps://song.link/s/5XvGr0TlHsMak1sYKF6kBr\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/dh.jpg\" alt=\"\">\nOne turn, far away I stand.\n转身一瞬间，远在天边。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n7. Butterfly in My Hand | Artist:Miuseshare | world music, Ambient\nhttps://song.link/s/2YglVEvXxldtNIIDqFCT8Z\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/bimh.jpg\" alt=\"\">\nOver hills and tides, it seeks a place to abide.\n翻山越海，寻一处栖身之地。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n8. Soft Drift | Artist:Miuseshare | world music, Ambient\nhttps://song.link/s/2PfGWdM9liZlXxCsQLdsMw\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/sd.jpg\" alt=\"\">\nWandering thoughts drift toward their release.\n纷乱思绪在飘散中释放。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n9. Chase the Wind by Moonlight | Artist:Miuseshare | world music, Ambient\nhttps://song.link/s/1MwRM5FmNkM6oojQo7pLF5\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/cwinm.jpg\" alt=\"\">\nI walk alone, wind as my companion, moon as my guide.\n我独自前行，风作伴，月为引。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n10. Stellar Trip | Artist:Miuseshare | world music, Ambient\nhttps://song.link/s/6GRMLZ18f0cMN57nSQTuQp\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/st.jpg\" alt=\"\">\nHonor nature's rhythm, and life endures.\n顺应自然节律方能生生不息。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n11. Mere Passerby | Artist:Miuseshare | world music, Downtempo\nhttps://song.link/s/0PDghcj74rIaAU1vBPZJXe\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/mp.jpg\" alt=\"\">\nI pause not to stay, but to carry on.\n我为美好驻足，亦为奔赴远方。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n12. Summer Tide | Artist:Miuseshare | world music, Chill\nhttps://song.link/s/1ZD8766HSzjuHiEGR23FPS\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/smt.jpg\" alt=\"\">\nAs the tide pulls back, troubles fade away.\n潮退之时，烦忧渐消。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n13. Starry Galaxy | Artist:Miuseshare | world music, Ambient\nhttps://song.link/s/2RRV4a9usncWKCJRXTmqex\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/sg.jpg\" alt=\"\">\nThe galaxy stays forever, yet not every place can behold it.\n星河恒在，却非处处可见。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n14. Spring Streamlight | Artist:Miuseshare | world music, Drone\nhttps://song.link/s/4Z1B7TSRib31SQF5Pci6Hi\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/ss.jpg\" alt=\"\">\nProtect the Environment, Guard the Water Source.\n保护环境，守护水源。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n15. Wild Blackberry Thickets | Artist:Miuseshare | world music, Country\nhttps://song.link/s/2ZQXVY8lPJOJynrKEkM9Ai\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/wbt.jpg\" alt=\"\">\nSweet love hides behind thorny vines.\n甜蜜的爱藏于荆棘藤蔓之后。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n16. Keep Steady | Artist:Miuseshare | world music, Rap, Pop\nhttps://song.link/s/0DujenYM7cUZ3MbdziASEl\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/ks.jpg\" alt=\"\">\nKeep steady, enrich yourself and make life more joyful.\nWisdom of the old professor lives within the pages.\n守心自持，充盈自我，让生活更愉悦。书中自有老教授。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n17. Memories of the Sandbar | Artist:Miuseshare | world music, Chill\nhttps://song.link/s/0GhzAu2YJu15jLvgCJ7fz1\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/mots.jpg\" alt=\"\">\nFragile sandbar, fleeting love.\n沙洲易逝，浮生情短。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n18. Old Pal | Artist:Miuseshare | world music, Rock\nhttps://song.link/s/7bYklBvC0LO9A71PqArfeh\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/op.jpg\" alt=\"\">\nIndustry shifts, leaving lost souls adrift.\n时代浪潮更迭，迷途之人随波逐流。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n19. False Crown | Artist:Miuseshare | world music, Rap, hip hop\nhttps://song.link/s/62HLAGZqHms1EEoRTLCUXS\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/fc.jpg\" alt=\"\">\nPut out the flames of war, reshape peace.\n熄去战火，回归和平。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n\nSingle\n20. Far From Home | Artist:Miuseshare | world music, Ambient\nhttps://song.link/s/4G7KweesEDKx9aVPXLEyrv\n<img src=\"https://raw.githubusercontent.com/AestheticMiuseshare/miuseshare-site-/main/assets/images/cht/ffh.jpg\" alt=\"\">\nPetal carries the breath of hometown.\n花瓣轻透出故土的气息。\n#AestheticMiuseshare #AM #Miuseshare #AestheticDirection #LiteraryAesthetic #WorldMusic #PaintingAesthetic #MusicTravelogue #Humour\n#审美方向 #绘画审美 #文学审美 #音乐分享\n";

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
function retryOrFail(attempt){
  if(attempt < 2){
    if(note) note.textContent = '加载中，正在重试…';
    setTimeout(function(){ loadCatalog(attempt + 1); }, 1500);
  }else{
    if(note) note.textContent = '';
    render(EMBEDDED);
  }
}
function loadCatalog(attempt){
  attempt = attempt || 0;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', TXT_URL, true);
  xhr.timeout = 8000;
  xhr.overrideMimeType('text/plain; charset=utf-8');
  xhr.onload = function(){
    if(xhr.status >= 200 && xhr.status < 300){
      render(xhr.responseText);
    }else{
      retryOrFail(attempt);
    }
  };
  xhr.onerror = function(){ retryOrFail(attempt); };
  xhr.ontimeout = function(){ retryOrFail(attempt); };
  xhr.send();
}
loadCatalog();

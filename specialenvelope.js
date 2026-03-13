const leftImages=["venti.png","blueheart.png","gwenplushie.png","blue.png","kitties.png"];
const rightImages=["kitties.png","blue.png","gwenplushie.png","blueheart.png","venti.png"];
const centerGifs=["cnc.jpg","frenchfries.jpg","gwenstacy.jpg","ac.jpg","bcdtomnl.jpg"];
const gwenPNG="gwen.png", milesPNG="miles.png", yodaPNG="yoda.png";
const catPNG="cat.gif", rabbitPNG="rabbit.gif";
const heroConfig={gwen:{tiltDeg:-8,offsetX:-22,offsetY:0,scale:2.00},miles:{tiltDeg:6,offsetX:25,offsetY:-5,scale:1.00}};
const speechData={
  "venti.png":{cta:"Venti!",quote:"”Here's your venti cup of iced spanish latte with cinammon powder. Enjoy!”"},
  "blueheart.png":{cta:"Heart!",quote:"“Here's a blue heart for you.”"},
  "gwenplushie.png":{cta:"Plushie!",quote:"“Gwen Stacy plushie for you 💙.”"},
  "blue.png":{cta:"Flowers!",quote:"“I hope you like this blue flowers.”"},
  "kitties.png":{cta:"Kitties!",quote:"“Here are some cute kitties for you.”"},
  "cnc.jpg":{cta:"C&C!",quote:"“Mag a-ice cream pa tayo ha!”"},
  "frenchfries.jpg":{cta:"FrenchFries!",quote:"“Naalala mo pa to?”"},
  "gwenstacy.jpg":{cta:"GwenStacy!",quote:"“Si Gwen Stacy muna mag babantay sayo oki!”"},
  "ac.jpg":{cta:"Bestday!",quote:"“Never Forget tong moment na to, Promise!”"},
  "bcdtomnl.jpg":{cta:"BCDtoMNL",quote:"“Worth it!, Kahit na saglit lang kita nakita.”"},
  "tats1.jpg":{cta:"Happyyyyy",quote:"“Ang cute nyan nung natapos huhu”"},
  "tats2.jpg":{cta:"Jergeeeeen",quote:"“Baka akala mo nakalimutan ko na?”"},
  "tats3.jpg":{cta:"Birthdayyyyy!",quote:"“Pa'no ba yan? lagi na kitang maaalala pag makikita ko to.”"}
};
const getCTA=src=>speechData[src]?.cta||"tap me!";
const getQuote=src=>speechData[src]?.quote||"“Happy birthday, keep shining!”";
const playlist=[
  {title:"Maki — Kahel na Langit",src:"kahel-na-langit.mp3",cover:"kahelnalangit.jpg"},
  {title:"1550 Collective — G luv 2",src:"g-luv-2.mp3",cover:"gluv2.jpg"},
  {title:"IV of Spades — Aura",src:"aura.mp3",cover:"aura.jpg"},
  {title:"Yden — Ngalan mo",src:"ngalan-mo.mp3",cover:"ngalanmo.jpg"},
  {title:"Dionela — Oksihina",src:"oksihina.mp3",cover:"oksihina.jpg"},
  {title:"Kiyo — Eba",src:"eba.mp3",cover:"eba.jpg"},
  {title:"Kiyo — Hanap",src:"hanap.mp3",cover:"hanap.jpg"},
  {title:"Kylu & Yamada — Otw",src:"otw.mp3",cover:"otw.jpg"},
  {title:"Justin Bieber — Daisies",src:"daisies.mp3",cover:"daisies.jpg"},
  {title:"Justin Bieber — Love You Different",src:"love-you-different.mp3",cover:"loveyoudifferent.jpg"},
  {title:"Justin Bieber — Stay",src:"stay.mp3",cover:"stay.jpg"},
  {title:"Ali Gatie — What If I Told You That I Love You",src:"what-if-i-told-that-i-love-you.mp3",cover:"wiiytily.jpg"},
  {title:"RCHRD — Cuddles",src:"cuddles.mp3",cover:"cuddles.jpg"},
  {title:"Ali Gatie — It's You",src:"its-you.mp3",cover:"itsyou.jpg"},
  {title:"XION. — Emerald",src:"emerald.mp3",cover:"emerald.jpg"},
];

function buildFilm(trackEl,images,direction="up"){
  trackEl.dataset.direction=direction;
  const makeSequence=()=>{
    const frag=document.createDocumentFragment();
    images.forEach((src,i)=>{
      const li=document.createElement('li');
      li.className='frame';
      const img=document.createElement('img');
      img.loading='lazy'; img.decoding='async'; img.alt=`${direction} film photo ${i+1}`; img.src=src;
      li.appendChild(img);
      const b=document.createElement('span'); b.className='bubble bubble-cta'; b.textContent=getCTA(src);
      b.style.fontSize='9px'; b.style.lineHeight='1.25';
      li.appendChild(b);
      li.addEventListener('click',()=>openLightbox(src,getQuote(src)));
      frag.appendChild(li);
    });
    return frag;
  };
  trackEl.innerHTML="";
  trackEl.appendChild(makeSequence());
  trackEl.appendChild(makeSequence());
  const basePerFrame=4, duration=Math.max(10,images.length*basePerFrame);
  trackEl.style.setProperty('--film-speed',`${duration}s`);
}
function buildGifRow(container,gifs){
  container.innerHTML="";
  gifs.forEach((src,i)=>{
    const tile=document.createElement('div'); tile.className='gif-tile';
    const img=document.createElement('img'); img.alt=`gif ${i+1}`; img.loading='lazy'; img.decoding='async'; img.src=src;
    tile.appendChild(img);
    const b=document.createElement('span'); b.className='bubble bubble-cta'; b.textContent=getCTA(src);
    b.style.fontSize='9px'; b.style.lineHeight='1.25';
    tile.appendChild(b);
    tile.addEventListener('click',()=>openLightbox(src,getQuote(src)));
    container.appendChild(tile);
  });
}

const lightbox=document.getElementById('lightbox');
const lbImg=document.getElementById('lbImg');
const lbQuote=document.getElementById('lbQuote');
const lbClose=document.getElementById('lbClose');
function openLightbox(src,quote){
  lbImg.src=src; lbImg.alt='Selected photo'; lbQuote.textContent=quote;
  lbQuote.style.fontSize='11px'; lbQuote.style.lineHeight='1.35';
  lightbox.classList.add('show'); lightbox.setAttribute('aria-hidden','false');
}
function closeLightbox(){
  lightbox.classList.remove('show'); lightbox.setAttribute('aria-hidden','true');
  lbImg.removeAttribute('src');
}
lbClose.addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{ if(e.target===lightbox) closeLightbox(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeLightbox(); });

const confettiLayer=document.getElementById('confetti-layer');
function burstConfetti(count=120){
  const colors=['#9ec0ff','#5b92ff','#cfe1ff','#ffffff'];
  const originX=window.innerWidth/2, originY=window.innerHeight*0.35;
  for(let i=0;i<count;i++){
    const piece=document.createElement('div');
    piece.className='confetti';
    piece.style.left=`${originX}px`; piece.style.top=`${originY}px`;
    piece.style.background=colors[i%colors.length];
    const dx=(Math.random()*2-1)*260, dy=(-Math.random()*200)-40;
    piece.style.setProperty('--dx',`${dx}px`); piece.style.setProperty('--dy',`${dy}px`);
    confettiLayer.appendChild(piece);
    piece.addEventListener('animationend',()=>piece.remove());
  }
}

const swingLayer=document.getElementById('swingLayer');
const spaceLayer=document.getElementById('spaceLayer');
const crittersLayer=document.getElementById('crittersLayer');
let nextKindIndex=0, isSwinging=false;
const kinds=['gwen','miles'];
const SWING_ENABLED = !document.body.classList.contains('no-swing');
if (!SWING_ENABLED) isSwinging = true;

function makeHeroImg(kind){
  const img=document.createElement('img'); img.alt=kind==='gwen'?'Gwen Stacy':'Miles Morales';
  img.src=kind==='gwen'?gwenPNG:milesPNG; img.loading='lazy'; img.decoding='async'; return img;
}
function applyHeroVars(heroEl,cfg){ heroEl.style.setProperty('--tilt',`${cfg.tiltDeg}deg`); heroEl.style.setProperty('--tx',`${cfg.offsetX}px`); heroEl.style.setProperty('--ty',`${cfg.offsetY}px`); }
function spawnSwinger(kind){
  if(isSwinging) return; isSwinging=true;
  const cfg=heroConfig[kind]||{tiltDeg:0,offsetX:0,offsetY:0,scale:1};
  const swinger=document.createElement('div'); const direction=Math.random()<0.5?'glide-ltr':'glide-rtl';
  const dur=`${Math.floor(9+Math.random()*7)}s`, rope=`${Math.floor(80+Math.random()*80)}px`;
  swinger.className=`swinger ${direction}`; swinger.style.setProperty('--dur',dur); swinger.style.setProperty('--rope',rope);
  swinger.style.setProperty('--hero-scale',String(cfg.scale??1));
  const pend=document.createElement('div'); pend.className='pendulum';
  const ropeEl=document.createElement('div'); ropeEl.className='rope';
  const hero=document.createElement('div'); hero.className='hero'; applyHeroVars(hero,cfg); hero.appendChild(makeHeroImg(kind));
  pend.appendChild(ropeEl); pend.appendChild(hero); swinger.appendChild(pend); swingLayer.appendChild(swinger);
  swinger.addEventListener('animationend',()=>{ swinger.remove(); isSwinging=false; nextKindIndex=(nextKindIndex+1)%kinds.length; setTimeout(()=>spawnSwinger(kinds[nextKindIndex]),1200); },{once:true});
}
function startSwingLoop(){ nextKindIndex=0; spawnSwinger(kinds[nextKindIndex]); }

function createSpaceship(){
  const shipWrap=document.createElement('div'); shipWrap.className='spaceship';
  shipWrap.style.setProperty('--ship-speed',`${24+Math.floor(Math.random()*10)}s`);
  const ship=document.createElement('div'); ship.className='ship';
  const saucer=document.createElement('div'); saucer.className='saucer';
  const canopy=document.createElement('div'); canopy.className='canopy';
  const yoda=document.createElement('img'); yoda.className='yoda'; yoda.alt='Yoda'; yoda.src=yodaPNG; yoda.loading='lazy'; yoda.decoding='async';
  const flame=document.createElement('div'); flame.className='flame';
  canopy.appendChild(yoda); ship.appendChild(saucer); ship.appendChild(canopy); ship.appendChild(flame);
  shipWrap.appendChild(ship); spaceLayer.appendChild(shipWrap);
}

function createCritter(src,className){
  const img=new Image(); img.src=src; img.alt=className==='cat'?'Cat':'Rabbit'; img.className=`critter ${className}`; img.draggable=false;
  crittersLayer.appendChild(img);
  return {el:img,x:window.innerWidth*0.5,y:window.innerHeight*0.55,tx:img.classList.contains('rabbit')?-24:24,ty:img.classList.contains('rabbit')?28:20};
}
let cat,rabbit,mouse={x:window.innerWidth/2,y:window.innerHeight/2},rafId=null;
function startCritters(){
  cat=createCritter(catPNG,'cat'); rabbit=createCritter(rabbitPNG,'rabbit');
  const speedCat=0.18, speedRabbit=0.12;
  const step=()=>{
    cat.x+=(mouse.x+cat.tx-cat.x)*speedCat; cat.y+=(mouse.y+cat.ty-cat.y)*speedCat;
    rabbit.x+=(mouse.x+rabbit.tx-rabbit.x)*speedRabbit; rabbit.y+=(mouse.y+rabbit.ty-rabbit.y)*speedRabbit;
    const cDir=(mouse.x-cat.x)>=0?1:-1, rDir=(mouse.x-rabbit.x)>=0?1:-1;
    cat.el.style.left=`${cat.x}px`; cat.el.style.top=`${cat.y}px`; cat.el.style.transform=`translate(-50%,-50%) scaleX(${cDir})`;
    rabbit.el.style.left=`${rabbit.y}px`; rabbit.el.style.top=`${rabbit.y}px`;
    rabbit.el.style.left=`${rabbit.x}px`; rabbit.el.style.top=`${rabbit.y}px`; rabbit.el.style.transform=`translate(-50%,-50%) scaleX(${rDir})`;
    rafId=requestAnimationFrame(step);
  };
  if(rafId) cancelAnimationFrame(rafId); rafId=requestAnimationFrame(step);
}
window.addEventListener('mousemove',e=>{ mouse.x=e.clientX; mouse.y=e.clientY; });

function initPlayer(){
  const audio=document.getElementById('audio');
  const cover=document.getElementById('playerCover');
  const titleEl=document.getElementById('playerTitle');
  const currentEl=document.getElementById('playerCurrent');
  const totalEl=document.getElementById('playerTotal');
  const playBtn=document.getElementById('playBtn');
  const prevBtn=document.getElementById('prevBtn');
  const nextBtn=document.getElementById('nextBtn');
  const bar=document.getElementById('progressBar');
  const fill=document.getElementById('progressFill');
  let idx=0;
  function fmt(t){ if(!isFinite(t)) return '0:00'; const m=Math.floor(t/60); const s=Math.floor(t%60); return `${m}:${s<10?'0':''}${s}`; }
  function setPlayIcon(paused){ playBtn.textContent=paused?'▶':'❚❚'; }
  function load(i,auto){
    idx=(i+playlist.length)%playlist.length;
    const tr=playlist[idx];
    titleEl.textContent=tr.title; cover.src=tr.cover||cover.src; audio.src=tr.src; audio.load();
    setPlayIcon(true); if(auto) audio.play().catch(()=>{});
  }
  function next(){ load(idx+1,true); } function prev(){ load(idx-1,true); }
  audio.preload='metadata';
  audio.addEventListener('loadedmetadata',()=>{ totalEl.textContent=fmt(audio.duration); });
  audio.addEventListener('timeupdate',()=>{ currentEl.textContent=fmt(audio.currentTime); const r=audio.duration? audio.currentTime/audio.duration : 0; fill.style.width=`${r*100}%`; });
  audio.addEventListener('ended',next); audio.addEventListener('play',()=>setPlayIcon(false)); audio.addEventListener('pause',()=>setPlayIcon(true)); audio.addEventListener('error',next);
  playBtn.addEventListener('click',()=>{ if(audio.paused) audio.play().catch(()=>{}); else audio.pause(); });
  nextBtn.addEventListener('click',next); prevBtn.addEventListener('click',prev);
  bar.addEventListener('click',e=>{ const rect=bar.getBoundingClientRect(); const r=Math.min(1,Math.max(0,(e.clientX-rect.left)/rect.width)); audio.currentTime=r*(audio.duration||0); });
  load(0,false);
}

const envelope=document.getElementById('envelope');
const toggleBtn=document.getElementById('toggleBtn');
let isOpen=false;
function toggleEnvelope(open){
  const wantOpen=typeof open==='boolean'?open:!isOpen;
  isOpen=wantOpen;
  envelope.classList.toggle('is-open',isOpen);
  toggleBtn.setAttribute('aria-expanded',String(isOpen));
  toggleBtn.textContent=isOpen?'Close the envelope':'Open the envelope';
  if(isOpen) burstConfetti(60);
}
envelope.addEventListener('click',()=>toggleEnvelope());
envelope.addEventListener('keydown',e=>{ const k=e.key.toLowerCase(); if(k==='enter'||k===' '){ e.preventDefault(); toggleEnvelope(); }});
toggleBtn.addEventListener('click',()=>toggleEnvelope());

const overlay=document.getElementById('puzzleOverlay');
const heartsField=document.getElementById('heartsField');
function spawnHearts(count=48){
  heartsField.innerHTML="";
  const w=window.innerWidth, h=window.innerHeight;
  for(let i=0;i<count;i++){
    const d=document.createElement('div');
    d.className='blue-heart';
    const size=12+Math.random()*22;
    const left=Math.random()*w;
    const delay=-(Math.random()*2);
    const dur=3+Math.random()*3;
    d.style.setProperty('--size', `${size}px`);
    d.style.setProperty('--x', `${left}px`);
    d.style.setProperty('--dur', `${dur}s`);
    d.style.setProperty('--delay', `${delay}s`);
    heartsField.appendChild(d);
  }
}
function startHeartsIntro(ms=6000){
  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden','false');
  spawnHearts(56);
  setTimeout(()=>{
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden','true');
  }, ms);
}

const surpriseBtn=document.getElementById('surpriseBtn');
const surpriseBox=document.getElementById('surprise');
const surpriseGrid=document.getElementById('surpriseGrid');
const spClose=document.getElementById('spClose');
const surpriseImages=["tats2.jpg","tats1.jpg","tats3.jpg"];
function openSurprise(){
  surpriseGrid.innerHTML="";
  surpriseImages.forEach((src,i)=>{
    const tile=document.createElement('div');
    tile.className='gif-tile';
    const img=document.createElement('img');
    img.alt=`surprise ${i+1}`;
    img.loading='lazy';
    img.decoding='async';
    img.src=src;
    tile.appendChild(img);
    const b=document.createElement('span'); b.className='bubble bubble-cta'; b.textContent=getCTA(src);
    b.style.fontSize='9px'; b.style.lineHeight='1.25';
    tile.appendChild(b);
    tile.addEventListener('click',()=>{
      openLightbox(src,getQuote(src));
      closeSurprise();
      surpriseGrid.innerHTML="";
    });
    surpriseGrid.appendChild(tile);
  });
  surpriseBox.classList.add('show');
  surpriseBox.setAttribute('aria-hidden','false');
  surpriseBtn.setAttribute('aria-expanded','true');
}
function closeSurprise(){
  surpriseBox.classList.remove('show');
  surpriseBox.setAttribute('aria-hidden','true');
  surpriseBtn.setAttribute('aria-expanded','false');
}
surpriseBtn.addEventListener('click',openSurprise);
spClose.addEventListener('click',closeSurprise);
surpriseBox.addEventListener('click',e=>{ if(e.target===surpriseBox) closeSurprise(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeSurprise(); });

window.addEventListener('load',()=>{
  const leftTrack=document.getElementById('leftTrack');
  const rightTrack=document.getElementById('rightTrack');
  const gifRow=document.getElementById('gifRow');
  buildFilm(leftTrack,leftImages,"down");
  buildFilm(rightTrack,rightImages,"up");
  buildGifRow(gifRow,centerGifs);
  if (SWING_ENABLED) startSwingLoop();
  createSpaceship();
  startCritters();
  initPlayer();
  startHeartsIntro(6000);
});

const btsBtn=document.getElementById('btsBtn');
const btsBox=document.getElementById('btsBox');
const btsClose=document.getElementById('btsClose');
const btsVideo=document.getElementById('btsVideo');
const BTS_SRC='bts.mp4';

function openBTS(){
  btsVideo.src=BTS_SRC;
  btsVideo.load();
  btsBox.classList.add('show');
  btsBox.setAttribute('aria-hidden','false');
  btsBtn.setAttribute('aria-expanded','true');
  btsVideo.play().catch(()=>{});
}
function closeBTS(){
  btsVideo.pause();
  btsVideo.removeAttribute('src');
  btsBox.classList.remove('show');
  btsBox.setAttribute('aria-hidden','true');
  btsBtn.setAttribute('aria-expanded','false');
}
btsBtn.addEventListener('click',openBTS);
btsClose.addEventListener('click',closeBTS);
btsBox.addEventListener('click',e=>{ if(e.target===btsBox) closeBTS(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeBTS(); });

const leftImages=["1.png","2.png","3.png","4.png","5.png"];
const rightImages=["5.png","4.png","3.png","2.png","1.png"];
const centerGifs=["cookiesandcream.jpg","blueflower.jpg","coffee.jpg","citylights.jpg","moon.jpg"];
const gwenPNG="gwen.png";
const milesPNG="miles.png";
const yodaPNG="yoda.png";
const catPNG="cat.gif";
const rabbitPNG="rabbit.gif";
const heroConfig={gwen:{tiltDeg:-8,offsetX:-22,offsetY:0,scale:2.00},miles:{tiltDeg:6,offsetX:25,offsetY:-5,scale:1.00}};
const envelope=document.getElementById('envelope');
const toggleBtn=document.getElementById('toggleBtn');
const confettiLayer=document.getElementById('confetti-layer');

function buildFilm(trackEl,images,direction="up"){
  trackEl.dataset.direction=direction;
  const makeSequence=()=>{
    const frag=document.createDocumentFragment();
    images.forEach((src,i)=>{
      const li=document.createElement('li');
      li.className='frame';
      const img=document.createElement('img');
      img.loading='lazy';
      img.decoding='async';
      img.alt=`${direction} film photo ${i+1}`;
      img.src=src;
      li.appendChild(img);
      frag.appendChild(li);
    });
    return frag;
  };
  trackEl.innerHTML="";
  trackEl.appendChild(makeSequence());
  trackEl.appendChild(makeSequence());
  const basePerFrame=4;
  const duration=Math.max(10,images.length*basePerFrame);
  trackEl.style.setProperty('--film-speed',`${duration}s`);
}

function buildGifRow(container,gifs){
  container.innerHTML="";
  gifs.forEach((src,i)=>{
    const tile=document.createElement('div');
    tile.className='gif-tile';
    const img=document.createElement('img');
    img.alt=`gif ${i+1}`;
    img.loading='lazy';
    img.decoding='async';
    img.src=src;
    tile.appendChild(img);
    container.appendChild(tile);
  });
}

let isOpen=false;
let cakeTimer=null;

const swingLayer=document.getElementById('swingLayer');
const spaceLayer=document.getElementById('spaceLayer');
const cakeOverlay=document.getElementById('cakeOverlay');
const cakeCountdown=document.getElementById('cakeCountdown');
const crittersLayer=document.getElementById('crittersLayer');
const kinds=['gwen','miles'];
let nextKindIndex=0;
let isSwinging=false;

function toggleEnvelope(open){
  const wantOpen=typeof open==='boolean'?open:!isOpen;
  if(wantOpen&&!isOpen){
    if(cakeOverlay.classList.contains('show')) return;
    isOpen=true;
    envelope.classList.toggle('is-open',true);
    toggleBtn.setAttribute('aria-expanded','true');
    toggleBtn.textContent='CLOSE';
    burstConfetti(60);
    return;
  }
  isOpen=wantOpen;
  envelope.classList.toggle('is-open',isOpen);
  toggleBtn.setAttribute('aria-expanded',String(isOpen));
  toggleBtn.textContent=isOpen?'CLOSE':'OPEN';
  if(isOpen) burstConfetti(60);
}

function burstConfetti(count=50){
  const colors=['#9ec0ff','#5b92ff','#cfe1ff','#ffffff'];
  const rect=envelope.getBoundingClientRect();
  const originX=rect.left+rect.width/2;
  const originY=rect.top+rect.height*0.35;
  for(let i=0;i<count;i++){
    const piece=document.createElement('div');
    piece.className='confetti';
    piece.style.left=`${originX}px`;
    piece.style.top=`${originY}px`;
    piece.style.background=colors[i%colors.length];
    const dx=(Math.random()*2-1)*260;
    const dy=(-Math.random()*200)-40;
    piece.style.setProperty('--dx',`${dx}px`);
    piece.style.setProperty('--dy',`${dy}px`);
    confettiLayer.appendChild(piece);
    piece.addEventListener('animationend',()=>piece.remove());
  }
}

envelope.addEventListener('click',()=>toggleEnvelope());
envelope.addEventListener('keydown',(e)=>{
  const k=e.key.toLowerCase();
  if(k==='enter'||k===' '){
    e.preventDefault();
    toggleEnvelope();
  }
});
toggleBtn.addEventListener('click',()=>toggleEnvelope());
document.addEventListener('keydown',(e)=>{ if(e.key.toLowerCase()==='o') toggleEnvelope(); });

window.addEventListener('wheel',(e)=>e.preventDefault(),{passive:false});
window.addEventListener('touchmove',(e)=>e.preventDefault(),{passive:false});

function makeHeroImg(kind){
  const img=document.createElement('img');
  img.alt=kind==='gwen'?'Gwen Stacy':'Miles Morales';
  img.src=kind==='gwen'?gwenPNG:milesPNG;
  img.loading='lazy';
  img.decoding='async';
  return img;
}

function applyHeroVars(heroEl,cfg){
  heroEl.style.setProperty('--tilt',`${cfg.tiltDeg}deg`);
  heroEl.style.setProperty('--tx',`${cfg.offsetX}px`);
  heroEl.style.setProperty('--ty',`${cfg.offsetY}px`);
}

function spawnSwinger(kind){
  if(isSwinging) return;
  isSwinging=true;
  const cfg=heroConfig[kind]||{tiltDeg:0,offsetX:0,offsetY:0,scale:1};
  const swinger=document.createElement('div');
  const direction=Math.random()<0.5?'glide-ltr':'glide-rtl';
  const dur=`${Math.floor(9+Math.random()*7)}s`;
  const rope=`${Math.floor(80+Math.random()*80)}px`;
  swinger.className=`swinger ${direction}`;
  swinger.style.setProperty('--dur',dur);
  swinger.style.setProperty('--rope',rope);
  swinger.style.setProperty('--hero-scale',String(cfg.scale??1));
  const pendulum=document.createElement('div');
  pendulum.className='pendulum';
  const ropeEl=document.createElement('div');
  ropeEl.className='rope';
  const hero=document.createElement('div');
  hero.className='hero';
  applyHeroVars(hero,cfg);
  hero.appendChild(makeHeroImg(kind));
  pendulum.appendChild(ropeEl);
  pendulum.appendChild(hero);
  swinger.appendChild(pendulum);
  swingLayer.appendChild(swinger);
  swinger.addEventListener('animationend',()=>{
    swinger.remove();
    isSwinging=false;
    nextKindIndex=(nextKindIndex+1)%kinds.length;
    const nextKind=kinds[nextKindIndex];
    setTimeout(()=>spawnSwinger(nextKind),1200);
  },{once:true});
}

function startSwingLoop(){
  nextKindIndex=0;
  spawnSwinger(kinds[nextKindIndex]);
}

function createSpaceship(){
  const shipWrap=document.createElement('div');
  shipWrap.className='spaceship';
  shipWrap.style.setProperty('--ship-speed',`${24+Math.floor(Math.random()*10)}s`);
  const ship=document.createElement('div');
  ship.className='ship';
  const saucer=document.createElement('div');
  saucer.className='saucer';
  const canopy=document.createElement('div');
  canopy.className='canopy';
  const yoda=document.createElement('img');
  yoda.className='yoda';
  yoda.alt='Yoda';
  yoda.src=yodaPNG;
  yoda.loading='lazy';
  yoda.decoding='async';
  const flame=document.createElement('div');
  flame.className='flame';
  canopy.appendChild(yoda);
  ship.appendChild(saucer);
  ship.appendChild(canopy);
  ship.appendChild(flame);
  shipWrap.appendChild(ship);
  spaceLayer.appendChild(shipWrap);
}

function showCake(seconds){
  if(cakeTimer){ clearInterval(cakeTimer); cakeTimer=null; }
  cakeOverlay.classList.add('show');
  cakeOverlay.setAttribute('aria-hidden','false');
  const end=Date.now()+seconds*1000;
  const tick=()=>{
    const remaining=Math.max(0,Math.ceil((end-Date.now())/1000));
    cakeCountdown.textContent=String(remaining);
    if(remaining<=0){
      clearInterval(cakeTimer);
      cakeTimer=null;
      cakeOverlay.classList.remove('show');
      cakeOverlay.setAttribute('aria-hidden','true');
    }
  };
  tick();
  cakeTimer=setInterval(tick,250);
}

function createCritter(src,className){
  const img=new Image();
  img.src=src;
  img.alt=className==='cat'?'Cat':'Rabbit';
  img.className=`critter ${className}`;
  img.draggable=false;
  crittersLayer.appendChild(img);
  return {el:img,x:window.innerWidth*0.5,y:window.innerHeight*0.55,tx:img.classList.contains('rabbit')?-24:24,ty:img.classList.contains('rabbit')?28:20,dir:1};
}
let cat,rabbit,mouse={x:window.innerWidth/2,y:window.innerHeight/2},rafId=null;
function startCritters(){
  cat=createCritter(catPNG,'cat');
  rabbit=createCritter(rabbitPNG,'rabbit');
  const speedCat=0.18;
  const speedRabbit=0.12;
  const step=()=>{
    cat.x+= (mouse.x+cat.tx - cat.x)*speedCat;
    cat.y+= (mouse.y+cat.ty - cat.y)*speedCat;
    rabbit.x+= (mouse.x+rabbit.tx - rabbit.x)*speedRabbit;
    rabbit.y+= (mouse.y+rabbit.ty - rabbit.y)*speedRabbit;
    const catDir = (mouse.x - cat.x)>=0 ? 1 : -1;
    const rabDir = (mouse.x - rabbit.x)>=0 ? 1 : -1;
    cat.el.style.left=`${cat.x}px`;
    cat.el.style.top =`${cat.y}px`;
    cat.el.style.transform=`translate(-50%,-50%) scaleX(${catDir})`;
    rabbit.el.style.left=`${rabbit.x}px`;
    rabbit.el.style.top =`${rabbit.y}px`;
    rabbit.el.style.transform=`translate(-50%,-50%) scaleX(${rabDir})`;
    rafId=requestAnimationFrame(step);
  };
  if(rafId) cancelAnimationFrame(rafId);
  rafId=requestAnimationFrame(step);
}
window.addEventListener('mousemove',(e)=>{ mouse.x=e.clientX; mouse.y=e.clientY; });

window.addEventListener('load',()=>{
  const leftTrack=document.getElementById('leftTrack');
  const rightTrack=document.getElementById('rightTrack');
  const gifRow=document.getElementById('gifRow');

  buildFilm(leftTrack,leftImages,"down");
  buildFilm(rightTrack,rightImages,"up");
  buildGifRow(gifRow,centerGifs);

  setTimeout(()=>burstConfetti(18),600);

  startSwingLoop();
  createSpaceship();
  startCritters();

  showCake(15);
});

// === Allow inner scrolling inside the letter on mobile/desktop ===
(function enableLetterScroll() {
  const letterEl = document.querySelector('.letter');
  if (!letterEl) return;

  // Stop these events from bubbling to the window, where you preventDefault()
  letterEl.addEventListener('touchmove', (e) => {
    e.stopPropagation();
  }, { passive: true });

  letterEl.addEventListener('wheel', (e) => {
    e.stopPropagation();
  }, { passive: true });
})();

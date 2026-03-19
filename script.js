/* ============================================================
   MICO & MEITA — Wedding Invitation
   JavaScript | Mobile-First Edition
   ============================================================ */

// ── LOADING ──
window.addEventListener('load', () => {
  let w = 0;
  const bar = document.querySelector('.loading-bar');
  const iv = setInterval(() => {
    w += Math.random() * 6 + 1;
    if (w >= 100) { w = 100; clearInterval(iv); }
    if (bar) bar.style.width = w + '%';
  }, 50);
  setTimeout(() => {
    document.getElementById('loading-screen')?.classList.add('hide');
    createPetals(); createGoldDust();
  }, 2600);
});

// ── PETALS & GOLD DUST ──
function createPetals() {
  const c = document.getElementById('petals');
  if (!c) return;
  const syms = ['🌸','🌺','✿','❀','🌼','💮'];
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = syms[Math.floor(Math.random() * syms.length)];
    p.style.cssText = `left:${Math.random()*100}%;font-size:${.6+Math.random()*1.2}rem;animation-duration:${6+Math.random()*9}s;animation-delay:${Math.random()*6}s;opacity:${.3+Math.random()*.5}`;
    c.appendChild(p);
  }
}
function createGoldDust() {
  const c = document.getElementById('petals');
  if (!c) return;
  for (let i = 0; i < 40; i++) {
    const d = document.createElement('div');
    d.className = 'gold-dust';
    d.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${1+Math.random()*3}px;height:${1+Math.random()*3}px;animation-duration:${3+Math.random()*5}s;animation-delay:${Math.random()*4}s`;
    c.appendChild(d);
  }
}

// ── OPEN INVITATION ──
document.getElementById('openInviteBtn')?.addEventListener('click', () => {
  const cover = document.getElementById('cover');
  const main  = document.getElementById('main-content');
  goldBurst();
  cover.style.cssText += ';transition:opacity .9s ease,transform .9s ease;opacity:0;transform:scale(1.04) translateY(-15px)';
  setTimeout(() => {
    cover.style.display = 'none';
    main.classList.remove('hidden');
    main.style.cssText = 'opacity:0;transition:opacity .9s ease';
    requestAnimationFrame(() => { main.style.opacity = '1'; });
    initAll();
    showGoldPlaceholders(); // show gold placeholders if real photos missing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 900);
});

// ── GOLD PLACEHOLDER REVEAL ──
function showGoldPlaceholders() {
  // Check groom photo
  const imgG = document.getElementById('imgGroom');
  const phG  = document.getElementById('phGroom');
  if (imgG && phG) {
    // If image failed to load (naturalWidth=0) or src is placeholder name
    const checkPhoto = (img, ph) => {
      if (img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
        img.style.display = 'none';
        ph.style.display = 'flex';
      }
    };
    checkPhoto(imgG, phG);
    if (!imgG.complete) imgG.addEventListener('error', () => { imgG.style.display='none'; phG.style.display='flex'; });
  }
  const imgB = document.getElementById('imgBride');
  const phB  = document.getElementById('phBride');
  if (imgB && phB) {
    const checkPhoto = (img, ph) => {
      if (img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
        img.style.display = 'none';
        ph.style.display = 'flex';
      }
    };
    checkPhoto(imgB, phB);
    if (!imgB.complete) imgB.addEventListener('error', () => { imgB.style.display='none'; phB.style.display='flex'; });
  }
}

function goldBurst() {
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    const a = (i/20)*360, d = 80+Math.random()*120, h = 38+Math.random()*20;
    p.style.cssText = `position:fixed;left:50%;top:50%;width:${4+Math.random()*5}px;height:${4+Math.random()*5}px;border-radius:50%;background:hsl(${h},90%,${60+Math.random()*25}%);box-shadow:0 0 6px hsl(${h},90%,70%);pointer-events:none;z-index:9998;transform:translate(-50%,-50%);animation:gburst .9s ease-out forwards;--dx:${Math.cos(a*Math.PI/180)*d}px;--dy:${Math.sin(a*Math.PI/180)*d}px`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1000);
  }
  if (!document.getElementById('gb-sty')) {
    const s = document.createElement('style'); s.id='gb-sty';
    s.textContent = '@keyframes gburst{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(0)}}';
    document.head.appendChild(s);
  }
}

function initAll() {
  initScrollReveal();
  initCountdown();
  initGallery();
  initGuestbook();
  initMusic();
  loadRekening();
  initFlyingHearts();
  initGoldCanvas();
}

// ── SCROLL REVEAL ──
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        e.target.querySelectorAll('[data-anim],[data-anim-l],[data-anim-r],[data-anim-u]')
          .forEach((c, i) => setTimeout(() => c.classList.add('vis'), i * 140));
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('[data-anim],[data-anim-l],[data-anim-r],[data-anim-u]').forEach(el => io.observe(el));
}

// ── COUNTDOWN ──
function initCountdown() {
  const tResepsi = new Date('2026-03-25T10:00:00+07:00');
  const tAkad    = new Date('2026-02-07T08:00:00+07:00');
  const lbl      = document.getElementById('cd-main-lbl');
  const sub      = document.getElementById('cd-sub-lbl');
  const cdEl     = document.getElementById('countdown');
  let done = false;

  const tick = () => {
    const now = new Date();
    let target, lblTxt, subTxt;
    if (now < tAkad) {
      target=''; lblTxt='✨ Menuju Akad Nikah'; subTxt='Sabtu, 07 Februari 2026 — 08.00 WIB';
      target = tAkad;
    } else if (now < tResepsi) {
      target = tResepsi; lblTxt='🎊 Menuju Resepsi Pernikahan'; subTxt='Rabu, 25 Maret 2026 — 10.00 WIB';
    } else {
      if (!done) { done=true; if(cdEl) cdEl.innerHTML='<div class="countdown-done">🎉 Alhamdulillah! Pernikahan Telah Berlangsung!</div>'; if(lbl) lbl.textContent='Terima kasih atas doa dan kehadiran Anda'; if(sub) sub.style.display='none'; } return;
    }
    if (lbl) lbl.textContent = lblTxt;
    if (sub) sub.textContent = subTxt;
    const diff = target - now;
    const d=Math.floor(diff/86400000), h=Math.floor((diff%86400000)/3600000), m=Math.floor((diff%3600000)/60000), s=Math.floor((diff%60000)/1000);
    setN('cd-days',d); setN('cd-hours',h); setN('cd-mins',m); setNT('cd-secs',s);
  };

  const setN = (id,v) => { const el=document.getElementById(id); if(!el) return; const f=String(v).padStart(2,'0'); if(el.textContent!==f){el.textContent=f;el.classList.remove('flip');void el.offsetWidth;el.classList.add('flip');} };
  const setNT= (id,v) => { const el=document.getElementById(id); if(!el) return; const f=String(v).padStart(2,'0'); if(el.textContent!==f){el.textContent=f;el.classList.remove('tick');void el.offsetWidth;el.classList.add('tick');} };

  tick(); setInterval(tick, 1000);

  // Progress bar
  const bar=document.getElementById('prog-bar'), pct=document.getElementById('prog-pct');
  if (bar) {
    const start=new Date('2025-06-01T00:00:00+07:00');
    const upd=()=>{ const p=Math.min(100,Math.max(0,((new Date()-start)/(tResepsi-start))*100)); bar.style.width=p.toFixed(1)+'%'; if(pct) pct.textContent=p.toFixed(0)+'%'; };
    upd(); setInterval(upd,5000);
  }
}

// ── GALLERY ──
let lbImgs = [], lbIdx = 0;
let activeGrid = 'akad';

function initGallery() {
  // Tabs
  document.querySelectorAll('.gtab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.gtab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      activeGrid = tab.dataset.tab;
      document.getElementById('gallery-akad').style.display = activeGrid==='akad' ? 'grid' : 'none';
      document.getElementById('gallery-couple').style.display = activeGrid==='couple' ? 'grid' : 'none';
    });
  });

  // Lightbox
  const lb=document.getElementById('lightbox');
  const img=document.getElementById('lbImage');
  const ov=document.getElementById('lbOverlay');
  const cl=document.getElementById('lbClose');
  const pr=document.getElementById('lbPrev');
  const nx=document.getElementById('lbNext');

  function collectImgs(gridId) {
    lbImgs = [];
    document.querySelectorAll(`#${gridId} .gallery-item`).forEach(item => {
      const src = item.dataset.src;
      const realImg = item.querySelector('img');
      if (src && realImg && realImg.style.display !== 'none') lbImgs.push(src);
    });
  }

  function openLB(idx) { lbIdx=idx; img.src=lbImgs[idx]; lb.classList.add('active'); document.body.style.overflow='hidden'; }
  const closeLB = () => { lb.classList.remove('active'); document.body.style.overflow=''; };
  const transImg = idx => { img.style.cssText='opacity:0;transform:scale(.95);transition:opacity .2s ease,transform .2s ease'; setTimeout(()=>{img.src=lbImgs[idx];img.style.cssText='opacity:1;transform:scale(1);transition:opacity .2s ease,transform .2s ease';},200); };
  const goNext = () => { lbIdx=(lbIdx+1)%lbImgs.length; transImg(lbIdx); };
  const goPrev = () => { lbIdx=(lbIdx-1+lbImgs.length)%lbImgs.length; transImg(lbIdx); };

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const grid = activeGrid==='akad' ? 'gallery-akad' : 'gallery-couple';
      collectImgs(grid);
      const src = item.dataset.src;
      const idx = lbImgs.indexOf(src);
      if (idx !== -1) openLB(idx);
    });
  });

  cl?.addEventListener('click', closeLB);
  ov?.addEventListener('click', closeLB);
  nx?.addEventListener('click', goNext);
  pr?.addEventListener('click', goPrev);
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key==='Escape') closeLB();
    if (e.key==='ArrowRight') goNext();
    if (e.key==='ArrowLeft') goPrev();
  });

  // Touch swipe for lightbox
  let tx = 0;
  img.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive:true });
  img.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) { if (dx < 0) goNext(); else goPrev(); }
  }, { passive:true });
}

// ── GUESTBOOK REALTIME ──
const SK = 'wedding_mico_meita_v3';
let bc = null, lastCount = 0;

function initGuestbook() {
  try {
    bc = new BroadcastChannel('mm_wedding_bc');
    bc.onmessage = e => {
      if (e.data.type==='new') { prependCard(e.data.msg, true); lastCount++; showToast('💬 Ucapan baru dari '+e.data.msg.name+'!'); }
    };
  } catch {}

  renderAll();
  setInterval(() => { const m=getMsgs(); if(m.length!==lastCount){lastCount=m.length;renderAll();} }, 3000);

  document.getElementById('guestbookForm')?.addEventListener('submit', e => { e.preventDefault(); submitMsg(); });

  const ta=document.getElementById('gbMessage'), cc=document.getElementById('charCounter');
  if (ta&&cc) ta.addEventListener('input', () => { cc.textContent=ta.value.length+'/300'; });
}

const getMsgs = () => { try { return JSON.parse(localStorage.getItem(SK))||defMsgs(); } catch { return defMsgs(); } };
const defMsgs = () => ([{id:'d0',name:'Keluarga Besar',attend:'hadir',emoji:'🌸',message:'Selamat menempuh hidup baru! Semoga sakinah, mawaddah, warahmah. Barakallah Mico & Meita 🤲',time:fmtTime(new Date())}]);

function submitMsg() {
  const name=document.getElementById('gbName').value.trim();
  const attend=document.getElementById('gbAttend').value;
  const message=document.getElementById('gbMessage').value.trim();
  if (!name||!message) { showToast('⚠️ Nama dan ucapan wajib diisi!'); return; }
  if (message.length>300) { showToast('⚠️ Maksimal 300 karakter!'); return; }
  const emojis=['🌸','💍','❤','✨','🌹','💐','🎊','💖','🌟','💕'];
  const msg={id:Date.now().toString(),name,attend,message,emoji:emojis[Math.floor(Math.random()*emojis.length)],time:fmtTime(new Date())};
  const msgs=getMsgs(); msgs.unshift(msg);
  localStorage.setItem(SK,JSON.stringify(msgs)); lastCount=msgs.length;
  prependCard(msg,true);
  try { bc?.postMessage({type:'new',msg}); } catch {}
  document.getElementById('gbName').value='';
  document.getElementById('gbMessage').value='';
  const cc=document.getElementById('charCounter'); if(cc) cc.textContent='0/300';
  showToast('✨ Ucapanmu terkirim! Terima kasih!');
  for(let i=0;i<8;i++) setTimeout(()=>spk(window.innerWidth/2+(Math.random()-.5)*200,window.innerHeight*.6),i*70);
}

function renderAll() {
  const list=document.getElementById('messagesList'); if(!list) return;
  list.innerHTML=''; getMsgs().forEach(m=>list.appendChild(mkCard(m))); lastCount=getMsgs().length;
}
function prependCard(msg,ani) {
  const list=document.getElementById('messagesList'); if(!list) return;
  const c=mkCard(msg); if(ani) c.style.animation='smsg .5s var(--eb)'; list.insertBefore(c,list.firstChild);
}
function mkCard(msg) {
  const c=document.createElement('div'); c.className='message-card';
  c.innerHTML=`<div class="msg-hdr"><div class="msg-avatar">${msg.emoji||'💌'}</div><div class="msg-meta"><span class="msg-name">${esc(msg.name)}</span><span class="msg-badge ${bdgCls(msg.attend)}">${bdgLbl(msg.attend)}</span></div></div><p class="msg-text">"${esc(msg.message)}"</p><div class="msg-time">🕐 ${msg.time}</div>`;
  return c;
}
const bdgCls=a=>({hadir:'badge-hadir',tidak:'badge-tidak',ragu:'badge-ragu'}[a]||'badge-ragu');
const bdgLbl=a=>({hadir:'✓ Hadir',tidak:'✗ Tidak Hadir',ragu:'? Ragu'}[a]||'? Ragu');
const esc=s=>{const d=document.createElement('div');d.textContent=s;return d.innerHTML;};
const fmtTime=d=>d.toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})+' '+d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});

// ── REKENING ──
const RK='wedding_rek_v3';
function loadRekening(){const d=JSON.parse(localStorage.getItem(RK)||'{}');if(d.number)document.getElementById('rekening-number').textContent=d.number;if(d.name)document.getElementById('rekening-name').textContent=d.name;}
function copyRek(){const r=document.getElementById('rekening-number').textContent,c=r.replace(/[-\s]/g,''),done=()=>showToast('✅ Disalin: '+r);navigator.clipboard?.writeText(c).then(done).catch(()=>{const e=document.createElement('textarea');e.value=c;document.body.appendChild(e);e.select();document.execCommand('copy');document.body.removeChild(e);done();});}
function toggleAdminRek(){const s=document.getElementById('adminRekSection'),h=s.style.display==='none';s.style.display=h?'block':'none';if(h){document.getElementById('inputRekNo').value=document.getElementById('rekening-number').textContent;document.getElementById('inputRekName').value=document.getElementById('rekening-name').textContent;}}
function hideAdminRek(){document.getElementById('adminRekSection').style.display='none';}
function saveRek(){const no=document.getElementById('inputRekNo').value.trim(),nm=document.getElementById('inputRekName').value.trim();if(!no||!nm){showToast('⚠️ Isi semua field!');return;}localStorage.setItem(RK,JSON.stringify({number:no,name:nm}));document.getElementById('rekening-number').textContent=no;document.getElementById('rekening-name').textContent=nm;hideAdminRek();showToast('✅ Rekening diperbarui!');}

// ── MUSIC ──
function initMusic(){
  const btn=document.getElementById('musicBtn'),audio=document.getElementById('bgMusic');let pl=false;
  btn?.addEventListener('click',()=>{if(pl){audio.pause();btn.textContent='🎵';btn.classList.remove('playing');}else{audio.play().catch(()=>{});btn.textContent='🎶';btn.classList.add('playing');}pl=!pl;});
}

// ── TOAST ──
function showToast(msg){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t);}t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3500);}

// ── FLYING HEARTS ──
function initFlyingHearts(){
  const sec=document.querySelector('.couple-section');if(!sec)return;
  setInterval(()=>{const h=document.createElement('div');h.textContent=['❤','💛','✨','💕','🌟','💖'][Math.floor(Math.random()*6)];h.style.cssText=`position:absolute;left:${Math.random()*100}%;bottom:0;font-size:${.8+Math.random()*1.8}rem;pointer-events:none;z-index:1;opacity:.65;animation:hfly ${3+Math.random()*3}s ease-out forwards;`;sec.appendChild(h);setTimeout(()=>h.remove(),6000);},2000);
  if(!document.getElementById('hfly-s')){const s=document.createElement('style');s.id='hfly-s';s.textContent='@keyframes hfly{0%{transform:translateY(0) rotate(-8deg) scale(.8);opacity:.65}50%{opacity:.4}100%{transform:translateY(-280px) rotate(18deg) scale(1.2);opacity:0}}';document.head.appendChild(s);}
}

// ── SPARKLE CURSOR ──
let lastSp=0;
document.addEventListener('mousemove',e=>{if(Date.now()-lastSp>100&&Math.random()>.6){spk(e.clientX,e.clientY);lastSp=Date.now();}});
function spk(x,y){
  const s=document.createElement('div');const syms=['✦','✧','⋆','★','◈','❋'];
  s.textContent=syms[Math.floor(Math.random()*syms.length)];
  const h=38+Math.random()*22;
  s.style.cssText=`position:fixed;left:${x}px;top:${y}px;pointer-events:none;z-index:9999;color:hsl(${h},92%,${65+Math.random()*20}%);font-size:${.5+Math.random()*.85}rem;transform:translate(-50%,-50%);animation:spka ${.5+Math.random()*.4}s ease forwards;text-shadow:0 0 8px hsl(${h},90%,75%);will-change:transform,opacity;`;
  document.body.appendChild(s);
  if(!document.getElementById('spk-s')){const st=document.createElement('style');st.id='spk-s';st.textContent='@keyframes spka{0%{opacity:1;transform:translate(-50%,-50%) scale(.3) rotate(0)}60%{opacity:.9;transform:translate(-50%,-85%) scale(1.3) rotate(200deg)}100%{opacity:0;transform:translate(-50%,-130%) scale(.2) rotate(360deg)}}';document.head.appendChild(st);}
  setTimeout(()=>s.remove(),900);
}

// ── GOLD CANVAS (mouse trail) ──
function initGoldCanvas(){
  const cv=document.createElement('canvas');
  cv.style.cssText='position:fixed;top:0;left:0;pointer-events:none;z-index:1;';
  document.body.prepend(cv);
  const cx=cv.getContext('2d');
  let pts=[];
  const rsz=()=>{cv.width=window.innerWidth;cv.height=window.innerHeight;};
  window.addEventListener('resize',rsz);rsz();
  // Only on non-touch devices
  if (!('ontouchstart' in window)) {
    document.addEventListener('mousemove',e=>{for(let i=0;i<2;i++)pts.push({x:e.clientX,y:e.clientY,vx:(Math.random()-.5)*2,vy:(Math.random()-.5)*2-1.2,life:1,sz:1.5+Math.random()*2.5,h:38+Math.random()*22});});
  }
  const draw=()=>{cx.clearRect(0,0,cv.width,cv.height);pts=pts.filter(p=>p.life>0);pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.life-=.025;p.sz*=.97;cx.beginPath();cx.arc(p.x,p.y,Math.max(0,p.sz),0,Math.PI*2);cx.fillStyle=`hsla(${p.h},92%,65%,${p.life})`;cx.shadowColor=`hsl(${p.h},90%,70%)`;cx.shadowBlur=7;cx.fill();});requestAnimationFrame(draw);};draw();
}

// ── PARALLAX (lightweight) ──
let ptick=false;
window.addEventListener('scroll',()=>{if(!ptick){requestAnimationFrame(()=>{const bg=document.querySelector('.cover-bg');if(bg)bg.style.transform=`translateY(${window.scrollY*.2}px)`;ptick=false;});ptick=true;}},{passive:true});

// ── PREVENT ZOOM on double tap for iOS ──
let lastT=0;
document.addEventListener('touchend',e=>{const now=Date.now();if(now-lastT<300){e.preventDefault();}lastT=now;},{passive:false});

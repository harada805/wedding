/* =====================================================
   WEDDING INVITATION — Mico & Meita
   JavaScript — Countdown Resepsi + Realtime Guestbook
   ===================================================== */

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  animateLoadingBar();
  setTimeout(() => {
    const loading = document.getElementById('loading-screen');
    if (loading) loading.classList.add('hide');
    initCoverAnimations();
  }, 2800);
});

function animateLoadingBar() {
  const bar = document.querySelector('.loading-bar');
  if (!bar) return;
  let w = 0;
  const iv = setInterval(() => {
    w += Math.random() * 5 + 1;
    if (w >= 100) { w = 100; clearInterval(iv); }
    bar.style.width = w + '%';
  }, 55);
}

// ===== COVER ANIMATIONS =====
function initCoverAnimations() {
  createPetals();
  createGoldDust();
}

function createPetals() {
  const container = document.getElementById('petals');
  if (!container) return;
  const symbols = ['🌸','🌺','✿','❀','🌼','💮','🌹'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.cssText = `
      left:${Math.random()*100}%;
      font-size:${0.6+Math.random()*1.4}rem;
      animation-duration:${6+Math.random()*10}s;
      animation-delay:${Math.random()*6}s;
      opacity:${0.3+Math.random()*0.6};
    `;
    container.appendChild(p);
  }
}

function createGoldDust() {
  const container = document.getElementById('petals');
  if (!container) return;
  for (let i = 0; i < 50; i++) {
    const d = document.createElement('div');
    d.className = 'gold-dust';
    d.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      width:${1+Math.random()*3}px;
      height:${1+Math.random()*3}px;
      animation-duration:${3+Math.random()*5}s;
      animation-delay:${Math.random()*4}s;
    `;
    container.appendChild(d);
  }
}

// ===== OPEN INVITATION =====
document.getElementById('openInviteBtn')?.addEventListener('click', () => {
  const cover = document.getElementById('cover');
  const main = document.getElementById('main-content');
  createGoldBurst();
  cover.style.transition = 'opacity 1s ease, transform 1s ease';
  cover.style.opacity = '0';
  cover.style.transform = 'scale(1.05) translateY(-20px)';
  setTimeout(() => {
    cover.style.display = 'none';
    main.classList.remove('hidden');
    main.style.opacity = '0';
    main.style.transition = 'opacity 1s ease';
    requestAnimationFrame(() => { main.style.opacity = '1'; });
    initScrollReveal();
    initCountdown();
    initGallery();
    initGuestbookRealtime();
    initMusic();
    loadRekening();
    initFlyingHearts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1000);
});

function createGoldBurst() {
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    const angle = (i / 24) * 360;
    const dist = 100 + Math.random() * 150;
    const hue = 38 + Math.random() * 20;
    p.style.cssText = `
      position:fixed;left:50%;top:50%;
      width:${4+Math.random()*5}px;height:${4+Math.random()*5}px;
      border-radius:50%;
      background:hsl(${hue},90%,${60+Math.random()*25}%);
      box-shadow:0 0 6px hsl(${hue},90%,70%);
      pointer-events:none;z-index:9998;
      transform:translate(-50%,-50%);
      animation:burst-out 1s ease-out forwards;
      --dx:${Math.cos(angle*Math.PI/180)*dist}px;
      --dy:${Math.sin(angle*Math.PI/180)*dist}px;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1100);
  }
  if (!document.getElementById('burst-style')) {
    const s = document.createElement('style');
    s.id = 'burst-style';
    s.textContent = `@keyframes burst-out{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(0)}}`;
    document.head.appendChild(s);
  }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('[data-animate],[data-animate-left],[data-animate-right],[data-animate-up]')
          .forEach((child, i) => setTimeout(() => child.classList.add('visible'), i * 160));
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-animate],[data-animate-left],[data-animate-right],[data-animate-up]')
    .forEach(el => observer.observe(el));
}

// ===== COUNTDOWN — RESEPSI 25 MARET 2026 =====
function initCountdown() {
  const targetResepsi = new Date('2026-03-25T10:00:00+07:00');
  const targetAkad    = new Date('2026-02-07T08:00:00+07:00');

  const labelEl    = document.getElementById('countdown-main-label');
  const subLabelEl = document.getElementById('countdown-sub-label');
  const cdEl       = document.getElementById('countdown');
  let done = false;

  function update() {
    const now = new Date();
    let target, labelText, subText;

    if (now < targetAkad) {
      target    = targetAkad;
      labelText = '✨ Menuju Akad Nikah';
      subText   = 'Sabtu, 07 Februari 2026 — 08.00 WIB';
    } else if (now < targetResepsi) {
      target    = targetResepsi;
      labelText = '🎊 Menuju Resepsi Pernikahan';
      subText   = 'Rabu, 25 Maret 2026 — 10.00 WIB';
    } else {
      if (!done) {
        done = true;
        if (cdEl) cdEl.innerHTML = '<div class="countdown-done">🎉 Alhamdulillah — Pernikahan Telah Berlangsung!</div>';
        if (labelEl) labelEl.textContent = 'Terima kasih atas doa dan kehadiran Anda';
        if (subLabelEl) subLabelEl.style.display = 'none';
      }
      return;
    }

    if (labelEl) labelEl.textContent = labelText;
    if (subLabelEl) subLabelEl.textContent = subText;

    const diff  = target - now;
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);

    setNum('cd-days',  days);
    setNum('cd-hours', hours);
    setNum('cd-mins',  mins);
    setNumTick('cd-secs', secs);
  }

  function setNum(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    const f = String(val).padStart(2, '0');
    if (el.textContent !== f) {
      el.textContent = f;
      el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip');
    }
  }
  function setNumTick(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    const f = String(val).padStart(2, '0');
    if (el.textContent !== f) {
      el.textContent = f;
      el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick');
    }
  }

  update();
  setInterval(update, 1000);

  // Progress bar menuju resepsi
  const bar = document.getElementById('resepsi-progress-bar');
  const pct = document.getElementById('resepsi-progress-pct');
  if (bar) {
    const start = new Date('2025-06-01T00:00:00+07:00');
    const updateBar = () => {
      const now2 = new Date();
      const total = targetResepsi - start;
      const done2 = now2 - start;
      const p = Math.min(100, Math.max(0, (done2 / total) * 100));
      bar.style.width = p.toFixed(1) + '%';
      if (pct) pct.textContent = p.toFixed(0) + '%';
    };
    updateBar();
    setInterval(updateBar, 5000);
  }
}

// ===== GALLERY =====
let galleryImages = [];
let lbIdx = 0;

function initGallery() {
  const items     = document.querySelectorAll('.gallery-item');
  const lightbox  = document.getElementById('lightbox');
  const lbImage   = document.getElementById('lbImage');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');
  const lbOverlay = document.getElementById('lightboxOverlay');

  items.forEach(item => {
    const img = item.querySelector('img');
    if (img && !item.classList.contains('empty-gallery')) galleryImages.push(img.src);
    item.addEventListener('click', () => {
      const i = galleryImages.indexOf(img?.src);
      if (i !== -1) openLB(i);
    });
  });

  const openLB  = idx => { lbIdx=idx; lbImage.src=galleryImages[idx]; lightbox.classList.add('active'); document.body.style.overflow='hidden'; };
  const closeLB = ()  => { lightbox.classList.remove('active'); document.body.style.overflow=''; };
  const transImg = idx => {
    lbImage.style.cssText='opacity:0;transform:scale(0.95);transition:opacity .2s ease,transform .2s ease';
    setTimeout(() => { lbImage.src=galleryImages[idx]; lbImage.style.cssText='opacity:1;transform:scale(1);transition:opacity .2s ease,transform .2s ease'; }, 200);
  };
  const next = () => { lbIdx=(lbIdx+1)%galleryImages.length; transImg(lbIdx); };
  const prev = () => { lbIdx=(lbIdx-1+galleryImages.length)%galleryImages.length; transImg(lbIdx); };

  lbClose?.addEventListener('click', closeLB);
  lbOverlay?.addEventListener('click', closeLB);
  lbNext?.addEventListener('click', next);
  lbPrev?.addEventListener('click', prev);
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key==='Escape') closeLB();
    if (e.key==='ArrowRight') next();
    if (e.key==='ArrowLeft') prev();
  });
}

// ===== REALTIME GUESTBOOK =====
// BroadcastChannel = realtime antar tab/window
// localStorage = persistent storage
// Polling tiap 3 detik untuk sinkronisasi

const STORAGE_KEY = 'wedding_mico_meita_v2';
let bc = null;
let lastCount = 0;

function initGuestbookRealtime() {
  try {
    bc = new BroadcastChannel('wedding_mico_meita_bc');
    bc.onmessage = e => {
      if (e.data.type === 'new_msg') {
        prependMsgCard(e.data.msg, true);
        lastCount++;
        showToast('💬 Ucapan baru dari ' + e.data.msg.name + '!');
      }
    };
  } catch {}

  renderAllMessages();
  setInterval(() => {
    const msgs = getMsgs();
    if (msgs.length !== lastCount) {
      lastCount = msgs.length;
      renderAllMessages();
    }
  }, 3000);

  document.getElementById('guestbookForm')?.addEventListener('submit', e => {
    e.preventDefault();
    submitMsg();
  });

  const ta = document.getElementById('gbMessage');
  const cc = document.getElementById('charCounter');
  if (ta && cc) ta.addEventListener('input', () => { cc.textContent = ta.value.length + '/300'; });
}

function getMsgs() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || getDefMsgs(); }
  catch { return getDefMsgs(); }
}

function getDefMsgs() {
  return [{
    id:'def0', name:'Keluarga Besar', attend:'hadir', emoji:'🌸',
    message:'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Barakallah Mico & Meita 🤲',
    time: formatTime(new Date())
  }];
}

function submitMsg() {
  const name    = document.getElementById('gbName').value.trim();
  const attend  = document.getElementById('gbAttend').value;
  const message = document.getElementById('gbMessage').value.trim();
  if (!name || !message) { showToast('⚠️ Nama dan ucapan wajib diisi!'); return; }
  if (message.length > 300) { showToast('⚠️ Maksimal 300 karakter!'); return; }

  const emojis = ['🌸','💍','❤','✨','🌹','💐','🎊','💖','🌟','💕'];
  const msg = {
    id: Date.now().toString(), name, attend, message,
    emoji: emojis[Math.floor(Math.random()*emojis.length)],
    time: formatTime(new Date())
  };

  const msgs = getMsgs();
  msgs.unshift(msg);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  lastCount = msgs.length;

  prependMsgCard(msg, true);
  try { bc?.postMessage({ type:'new_msg', msg }); } catch {}

  document.getElementById('gbName').value = '';
  document.getElementById('gbMessage').value = '';
  const cc = document.getElementById('charCounter');
  if (cc) cc.textContent = '0/300';

  showToast('✨ Ucapanmu terkirim! Terima kasih!');
  for (let i = 0; i < 10; i++) setTimeout(() => createSparkle(window.innerWidth/2+(Math.random()-.5)*300, window.innerHeight*.6), i*60);
}

function renderAllMessages() {
  const list = document.getElementById('messagesList');
  if (!list) return;
  list.innerHTML = '';
  getMsgs().forEach(msg => list.appendChild(makeMsgCard(msg)));
  lastCount = getMsgs().length;
}

function prependMsgCard(msg, animated) {
  const list = document.getElementById('messagesList');
  if (!list) return;
  const card = makeMsgCard(msg);
  if (animated) { card.style.animation = 'slide-in-msg .6s var(--ease-bounce)'; }
  list.insertBefore(card, list.firstChild);
}

function makeMsgCard(msg) {
  const card = document.createElement('div');
  card.className = 'message-card';
  card.innerHTML = `
    <div class="msg-header">
      <div class="msg-avatar">${msg.emoji||'💌'}</div>
      <div class="msg-meta">
        <span class="msg-name">${escapeHtml(msg.name)}</span>
        <span class="msg-badge ${getBadge(msg.attend)}">${getBadgeL(msg.attend)}</span>
      </div>
    </div>
    <p class="msg-text">"${escapeHtml(msg.message)}"</p>
    <div class="msg-time">🕐 ${msg.time}</div>`;
  return card;
}

const getBadge  = a => ({hadir:'badge-hadir',tidak:'badge-tidak',ragu:'badge-ragu'}[a]||'badge-ragu');
const getBadgeL = a => ({hadir:'✓ Hadir',tidak:'✗ Tidak Hadir',ragu:'? Ragu'}[a]||'? Ragu');
const escapeHtml = s => { const d=document.createElement('div'); d.textContent=s; return d.innerHTML; };
const formatTime = d => d.toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})+' '+d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});

// ===== REKENING =====
const REK_KEY = 'wedding_rek_v2';
function loadRekening() {
  const d = JSON.parse(localStorage.getItem(REK_KEY)||'{}');
  if (d.number) document.getElementById('rekening-number').textContent = d.number;
  if (d.name)   document.getElementById('rekening-name').textContent   = d.name;
}
function copyRek() {
  const rek = document.getElementById('rekening-number').textContent;
  const c   = rek.replace(/[-\s]/g,'');
  const done = () => showToast('✅ Disalin: ' + rek);
  navigator.clipboard?.writeText(c).then(done).catch(() => {
    const e=document.createElement('textarea'); e.value=c;
    document.body.appendChild(e); e.select();
    document.execCommand('copy'); document.body.removeChild(e); done();
  });
}
function toggleAdminRek() {
  const s = document.getElementById('adminRekSection');
  const h = s.style.display==='none';
  s.style.display = h ? 'block' : 'none';
  if (h) {
    document.getElementById('inputRekNo').value   = document.getElementById('rekening-number').textContent;
    document.getElementById('inputRekName').value = document.getElementById('rekening-name').textContent;
  }
}
function hideAdminRek() { document.getElementById('adminRekSection').style.display='none'; }
function saveRek() {
  const no=document.getElementById('inputRekNo').value.trim();
  const nm=document.getElementById('inputRekName').value.trim();
  if (!no||!nm) { showToast('⚠️ Isi semua field!'); return; }
  localStorage.setItem(REK_KEY, JSON.stringify({number:no,name:nm}));
  document.getElementById('rekening-number').textContent = no;
  document.getElementById('rekening-name').textContent   = nm;
  hideAdminRek(); showToast('✅ Rekening diperbarui!');
}

// ===== MUSIC =====
function initMusic() {
  const btn=document.getElementById('musicBtn'), audio=document.getElementById('bgMusic');
  let pl=false;
  btn?.addEventListener('click', () => {
    if (pl) { audio.pause(); btn.innerHTML='🎵'; btn.classList.remove('playing'); }
    else { audio.play().catch(()=>{}); btn.innerHTML='🎶'; btn.classList.add('playing'); }
    pl=!pl;
  });
}

// ===== TOAST =====
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t=document.createElement('div'); t.className='toast'; document.body.appendChild(t); }
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3500);
}

// ===== PARALLAX =====
let ticking=false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const bg=document.querySelector('.cover-bg');
      if (bg) bg.style.transform=`translateY(${window.scrollY*.25}px)`;
      ticking=false;
    });
    ticking=true;
  }
});

// ===== CURSOR SPARKLE =====
let lastSp=0;
document.addEventListener('mousemove', e => {
  if (Date.now()-lastSp>80&&Math.random()>.55) { createSparkle(e.clientX,e.clientY); lastSp=Date.now(); }
});

function createSparkle(x,y) {
  const s=document.createElement('div');
  const syms=['✦','✧','⋆','★','◈','❋','✿','◆'];
  s.textContent=syms[Math.floor(Math.random()*syms.length)];
  const hue=38+Math.random()*25;
  s.style.cssText=`position:fixed;left:${x}px;top:${y}px;pointer-events:none;z-index:9999;color:hsl(${hue},95%,${65+Math.random()*20}%);font-size:${.5+Math.random()*.9}rem;transform:translate(-50%,-50%);animation:sparkle-anim ${.5+Math.random()*.5}s ease forwards;text-shadow:0 0 10px hsl(${hue},90%,75%);will-change:transform,opacity;`;
  document.body.appendChild(s);
  if (!document.getElementById('sparkle-style')) {
    const st=document.createElement('style'); st.id='sparkle-style';
    st.textContent=`@keyframes sparkle-anim{0%{opacity:1;transform:translate(-50%,-50%) scale(.3) rotate(0)}60%{opacity:.9;transform:translate(-50%,-90%) scale(1.4) rotate(200deg)}100%{opacity:0;transform:translate(-50%,-140%) scale(.2) rotate(360deg)}}`;
    document.head.appendChild(st);
  }
  setTimeout(()=>s.remove(),1000);
}

// ===== FLYING GOLD HEARTS =====
function initFlyingHearts() {
  const sec=document.querySelector('.couple-section');
  if (!sec) return;
  setInterval(() => {
    const h=document.createElement('div');
    h.textContent=['❤','💛','✨','💕','🌟','💖','⭐','🔆'][Math.floor(Math.random()*8)];
    h.style.cssText=`position:absolute;left:${Math.random()*100}%;bottom:0;font-size:${.8+Math.random()*2}rem;pointer-events:none;z-index:1;opacity:.7;animation:heart-fly ${3+Math.random()*3}s ease-out forwards;`;
    sec.appendChild(h); setTimeout(()=>h.remove(),6000);
  }, 1800);
  if (!document.getElementById('heart-fly-style')) {
    const s=document.createElement('style'); s.id='heart-fly-style';
    s.textContent=`@keyframes heart-fly{0%{transform:translateY(0) rotate(-10deg) scale(.8);opacity:.7}50%{opacity:.5}100%{transform:translateY(-300px) rotate(20deg) scale(1.3);opacity:0}}`;
    document.head.appendChild(s);
  }
}

// ===== GOLD PARTICLE CANVAS (mouse trail) =====
(function(){
  const canvas=document.createElement('canvas');
  canvas.style.cssText='position:fixed;top:0;left:0;pointer-events:none;z-index:1;';
  document.body.prepend(canvas);
  const ctx=canvas.getContext('2d');
  let particles=[];
  const resize=()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;};
  window.addEventListener('resize',resize); resize();
  document.addEventListener('mousemove', e=>{
    for(let i=0;i<3;i++) particles.push({
      x:e.clientX,y:e.clientY,
      vx:(Math.random()-.5)*2.5,vy:(Math.random()-.5)*2.5-1.5,
      life:1, size:1.5+Math.random()*3, hue:38+Math.random()*22
    });
  });
  const draw=()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles=particles.filter(p=>p.life>0);
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.life-=.022;p.size*=.97;
      ctx.beginPath();ctx.arc(p.x,p.y,Math.max(0,p.size),0,Math.PI*2);
      ctx.fillStyle=`hsla(${p.hue},95%,65%,${p.life})`;
      ctx.shadowColor=`hsl(${p.hue},90%,70%)`;ctx.shadowBlur=8;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  draw();
})();

/* ═══════════════════════════════════════════════
   ANTI-GRAVITY — JAVASCRIPT
═══════════════════════════════════════════════ */

// ─── Theme Toggle ───────────────────────────────────────
const html         = document.documentElement;
const themeToggle  = document.getElementById('theme-toggle');

// Restore saved preference
const savedTheme = localStorage.getItem('ag-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('ag-theme', next);
});


// ─── Navbar Scroll Shadow ───────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


// ─── Active Nav Link on Scroll ──────────────────────────
const sections = ['home', 'features', 'how-it-works', 'pricing'];
const navLinks  = document.querySelectorAll('.nav-link');

const observerOptions = { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});


// ─── Mobile Menu Toggle ─────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !expanded);
  mobileMenu.setAttribute('aria-hidden', expanded);
  mobileMenu.classList.toggle('open', !expanded);
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('.mobile-link, .mobile-signup').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.classList.remove('open');
  });
});


// ─── Canvas Product Mockup ──────────────────────────────
function drawBeforeCanvas() {
  const canvas = document.getElementById('before-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // Background: gradient landscape-style
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#1e1b4b');
  bg.addColorStop(0.5, '#4c1d95');
  bg.addColorStop(1, '#0c4a6e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Mountains
  ctx.fillStyle = 'rgba(88,28,135,0.7)';
  ctx.beginPath(); ctx.moveTo(0, H);
  ctx.lineTo(30, 55); ctx.lineTo(70, 70); ctx.lineTo(110, 40);
  ctx.lineTo(140, 60); ctx.lineTo(W, 50); ctx.lineTo(W, H);
  ctx.closePath(); ctx.fill();

  ctx.fillStyle = 'rgba(55,48,163,0.5)';
  ctx.beginPath(); ctx.moveTo(0, H);
  ctx.lineTo(0, 75); ctx.lineTo(50, 90); ctx.lineTo(100, 65);
  ctx.lineTo(W, 80); ctx.lineTo(W, H);
  ctx.closePath(); ctx.fill();

  // Stars
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  [[10,12],[35,8],[60,15],[90,6],[120,18],[150,10],[20,30],[80,25]].forEach(([x,y]) => {
    ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
  });
}

function drawAfterCanvas() {
  const canvas = document.getElementById('after-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // Same scene but crystal clear
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#1e1b4b');
  bg.addColorStop(0.5, '#4c1d95');
  bg.addColorStop(1, '#0c4a6e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = 'rgba(88,28,135,0.7)';
  ctx.beginPath(); ctx.moveTo(0, H);
  ctx.lineTo(30, 55); ctx.lineTo(70, 70); ctx.lineTo(110, 40);
  ctx.lineTo(140, 60); ctx.lineTo(W, 50); ctx.lineTo(W, H);
  ctx.closePath(); ctx.fill();

  ctx.fillStyle = 'rgba(55,48,163,0.5)';
  ctx.beginPath(); ctx.moveTo(0, H);
  ctx.lineTo(0, 75); ctx.lineTo(50, 90); ctx.lineTo(100, 65);
  ctx.lineTo(W, 80); ctx.lineTo(W, H);
  ctx.closePath(); ctx.fill();

  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  [[10,12],[35,8],[60,15],[90,6],[120,18],[150,10],[20,30],[80,25]].forEach(([x,y]) => {
    ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
  });

  // Teal "clean" overlay tint at edges
  ctx.strokeStyle = 'rgba(45,212,191,0.3)';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, W - 2, H - 2);

  // Sparkle highlights (to show it's pristine)
  const sparkles = [[30,35],[110,20],[145,70]];
  sparkles.forEach(([x,y]) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, 10);
    g.addColorStop(0, 'rgba(45,212,191,0.5)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
  });
}

drawBeforeCanvas();
drawAfterCanvas();


// ─── Progress Bar Animation ─────────────────────────────
function animateProgress() {
  const fill = document.getElementById('progress-fill');
  const pct  = document.getElementById('progress-pct');
  if (!fill || !pct) return;

  let value = 0;
  fill.style.width = '0%';
  pct.textContent  = '0%';

  const start  = performance.now();
  const duration = 2000;

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quart
    const eased = 1 - Math.pow(1 - progress, 4);
    value = Math.round(eased * 100);
    fill.style.width = value + '%';
    pct.textContent  = value + '%';
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Trigger when card enters viewport
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProgress();
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const productCard = document.querySelector('.product-card');
if (productCard) cardObserver.observe(productCard);


// ─── Upload Zone Click ──────────────────────────────────
document.getElementById('upload-zone')?.addEventListener('click', () => {
  // In a real app, trigger <input type="file">
  console.log('[AI Editor] Upload triggered.');
});


// ─── Download Button ────────────────────────────────────
document.getElementById('download-btn')?.addEventListener('click', () => {
  const canvas = document.getElementById('after-canvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = 'antigravity-result.png';
  link.href = canvas.toDataURL();
  link.click();
});


// ─── Navbar active on load ──────────────────────────────
window.addEventListener('load', () => {
  if (window.scrollY < 100) {
    document.querySelector('.nav-link[href="#home"]')?.classList.add('active');
  }
});


// ─── Feature Cards Staggered Entrance ──────────────────
const featCards = document.querySelectorAll('.feat-card');

const featObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card  = entry.target;
      const index = [...featCards].indexOf(card);
      // Stagger: each card waits 80ms more than the previous
      setTimeout(() => {
        card.classList.add('is-visible');
      }, index * 80);
      featObserver.unobserve(card);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

featCards.forEach(card => featObserver.observe(card));


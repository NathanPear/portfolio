const root = document.documentElement;
const topbar = document.querySelector('#topbar');
const toggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const drawer = document.querySelector('#mobile-drawer');
const scrim = document.querySelector('#drawer-scrim');
const savedTheme = localStorage.getItem('theme');

const art = {
  cane: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420">
    <rect width="900" height="420" fill="#efe2c8"/>
    <rect x="80" y="55" width="740" height="310" fill="none" stroke="#111111" stroke-width="8"/>
    <path d="M250 285 L330 175 L400 220 L505 145" fill="none" stroke="#111111" stroke-width="10"/>
    <path d="M505 145 l55 -48" fill="none" stroke="#111111" stroke-width="10"/>
    <circle cx="595" cy="92" r="30" fill="none" stroke="#111111" stroke-width="10"/>
    <path d="M340 235 l-75 88" stroke="#111111" stroke-width="10"/>
    <path d="M400 220 l-20 108" stroke="#111111" stroke-width="10"/>
    <path d="M505 145 l35 114" stroke="#111111" stroke-width="10"/>
  </svg>`,
  fsm: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420">
    <rect width="900" height="420" fill="#efe2c8"/>
    <rect x="70" y="55" width="760" height="310" fill="none" stroke="#111111" stroke-width="8"/>
    <rect x="110" y="110" width="190" height="200" fill="none" stroke="#111111" stroke-width="9"/>
    <rect x="350" y="110" width="190" height="200" fill="none" stroke="#111111" stroke-width="9"/>
    <rect x="590" y="110" width="190" height="200" fill="none" stroke="#111111" stroke-width="9"/>
    <line x1="300" y1="210" x2="350" y2="210" stroke="#111111" stroke-width="10"/>
    <line x1="540" y1="210" x2="590" y2="210" stroke="#111111" stroke-width="10"/>
  </svg>`,
  docs: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420">
    <rect width="900" height="420" fill="#efe2c8"/>
    <rect x="120" y="50" width="500" height="320" fill="none" stroke="#111111" stroke-width="8"/>
    <path d="M150 110h420" stroke="#111111" stroke-width="10"/>
    <path d="M150 160h360" stroke="#111111" stroke-width="10"/>
    <path d="M150 210h430" stroke="#111111" stroke-width="10"/>
    <path d="M150 260h310" stroke="#111111" stroke-width="10"/>
    <path d="M150 310h380" stroke="#111111" stroke-width="10"/>
  </svg>`,
  airport: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420">
    <rect width="900" height="420" fill="#efe2c8"/>
    <rect x="60" y="285" width="780" height="42" fill="#111111"/>
    <rect x="155" y="180" width="160" height="75" fill="none" stroke="#111111" stroke-width="9"/>
    <rect x="350" y="120" width="110" height="180" fill="none" stroke="#111111" stroke-width="9"/>
    <path d="M460 190 L650 95 L690 142 L505 240 Z" fill="none" stroke="#111111" stroke-width="9"/>
    <circle cx="220" cy="345" r="42" fill="none" stroke="#111111" stroke-width="9"/>
    <circle cx="660" cy="345" r="42" fill="none" stroke="#111111" stroke-width="9"/>
  </svg>`
};

function buildAsciiRules() {
  document.querySelectorAll('.rule-line, .rule-segment').forEach((el) => {
    if (el.dataset.built === 'true') return;
    const fill = (el.dataset.rule || '-').repeat(1200);
    el.textContent = '';
    const leftCap = document.createElement('span');
    const lineFill = document.createElement('span');
    const rightCap = document.createElement('span');
    leftCap.className = 'rule-cap-left';
    lineFill.className = 'rule-fill';
    rightCap.className = 'rule-cap-right';
    leftCap.textContent = '+';
    lineFill.textContent = fill;
    rightCap.textContent = '+';
    el.append(leftCap, lineFill, rightCap);
    el.dataset.built = 'true';
  });
}

function updateTopbarHeight() {
  if (!topbar) return;
  const height = Math.ceil(topbar.getBoundingClientRect().height);
  root.style.setProperty('--topbar-height', `${height}px`);
}

function setThemeLabel() {
  if (!toggle) return;
  const isDark = root.getAttribute('data-theme') === 'dark';
  const glyph = toggle.querySelector('.glyph');
  if (glyph) glyph.textContent = isDark ? '☾' : '☀';
  toggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

function openDrawer() {
  if (!drawer || !scrim || !menuToggle) return;
  drawer.hidden = false;
  scrim.hidden = false;
  requestAnimationFrame(() => {
    drawer.classList.add('is-open');
    scrim.classList.add('is-open');
  });
  drawer.setAttribute('aria-hidden', 'false');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Close navigation menu');
  const glyph = menuToggle.querySelector('.glyph');
  if (glyph) glyph.textContent = '×';
}

function closeDrawer() {
  if (!drawer || !scrim || !menuToggle) return;
  drawer.classList.remove('is-open');
  scrim.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  const glyph = menuToggle.querySelector('.glyph');
  if (glyph) glyph.textContent = '☰';
  setTimeout(() => {
    if (!drawer.classList.contains('is-open')) {
      drawer.hidden = true;
      scrim.hidden = true;
    }
  }, 190);
}

function injectArt() {
  document.querySelectorAll('[data-art]').forEach((img) => {
    const svg = art[img.dataset.art];
    if (svg) img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  });
}

if (savedTheme === 'dark') {
  root.setAttribute('data-theme', 'dark');
}

if (drawer && scrim && menuToggle) {
  drawer.hidden = true;
  scrim.hidden = true;
}

buildAsciiRules();
injectArt();
setThemeLabel();
updateTopbarHeight();

window.addEventListener('load', updateTopbarHeight);
window.addEventListener('resize', () => {
  updateTopbarHeight();
  if (window.matchMedia('(max-width: 840px)').matches === false) closeDrawer();
});

if (toggle) {
  toggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    setThemeLabel();
    updateTopbarHeight();
  });
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    if (drawer.classList.contains('is-open')) closeDrawer();
    else openDrawer();
  });
}

if (scrim) scrim.addEventListener('click', closeDrawer);
if (drawer) {
  drawer.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeDrawer();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
    closeDrawer();
  }
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

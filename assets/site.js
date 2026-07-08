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
  infra: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420">
    <rect width="900" height="420" fill="#efe2c8"/>
    <rect x="60" y="40" width="780" height="340" fill="none" stroke="#111111" stroke-width="8"/>
    <!-- Stacked server rack blocks -->
    <rect x="250" y="90" width="400" height="60" fill="none" stroke="#111111" stroke-width="9"/>
    <rect x="250" y="180" width="400" height="60" fill="none" stroke="#111111" stroke-width="9"/>
    <rect x="250" y="270" width="400" height="60" fill="none" stroke="#111111" stroke-width="9"/>
    <!-- LED Indicators -->
    <circle cx="290" cy="120" r="10" fill="#111111"/>
    <circle cx="320" cy="120" r="10" fill="none" stroke="#111111" stroke-width="6"/>
    <circle cx="290" cy="210" r="10" fill="#111111"/>
    <circle cx="320" cy="210" r="10" fill="#111111"/>
    <circle cx="290" cy="300" r="10" fill="none" stroke="#111111" stroke-width="6"/>
    <circle cx="320" cy="300" r="10" fill="#111111"/>
    <!-- Vertical bus lines -->
    <line x1="380" y1="150" x2="380" y2="180" stroke="#111111" stroke-width="9"/>
    <line x1="380" y1="240" x2="380" y2="270" stroke="#111111" stroke-width="9"/>
    <line x1="520" y1="150" x2="520" y2="180" stroke="#111111" stroke-width="9"/>
    <line x1="520" y1="240" x2="520" y2="270" stroke="#111111" stroke-width="9"/>
    <!-- Client/Gateway Console on left -->
    <rect x="80" y="180" width="120" height="60" fill="none" stroke="#111111" stroke-width="9"/>
    <path d="M140 180 V120 H250" fill="none" stroke="#111111" stroke-width="9"/>
    <!-- Data store on right -->
    <rect x="700" y="180" width="120" height="60" rx="10" ry="10" fill="none" stroke="#111111" stroke-width="9"/>
    <path d="M700 210 H650" fill="none" stroke="#111111" stroke-width="9"/>
  </svg>`,
  airport: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420">
    <rect width="900" height="420" fill="#efe2c8"/>
    <rect x="60" y="285" width="780" height="42" fill="#111111"/>
    <rect x="155" y="180" width="160" height="75" fill="none" stroke="#111111" stroke-width="9"/>
    <rect x="350" y="120" width="110" height="180" fill="none" stroke="#111111" stroke-width="9"/>
    <path d="M460 190 L650 95 L690 142 L505 240 Z" fill="none" stroke="#111111" stroke-width="9"/>
    <circle cx="220" cy="345" r="42" fill="none" stroke="#111111" stroke-width="9"/>
    <circle cx="660" cy="345" r="42" fill="none" stroke="#111111" stroke-width="9"/>
  </svg>`,
  portfolio: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420">
    <rect width="900" height="420" fill="#efe2c8"/>
    <rect x="60" y="40" width="780" height="340" fill="none" stroke="#111111" stroke-width="8"/>
    <!-- Browser title bar / window controls -->
    <line x1="60" y1="90" x2="840" y2="90" stroke="#111111" stroke-width="8"/>
    <circle cx="100" cy="65" r="10" fill="#111111"/>
    <circle cx="130" cy="65" r="10" fill="none" stroke="#111111" stroke-width="6"/>
    <circle cx="160" cy="65" r="10" fill="none" stroke="#111111" stroke-width="6"/>
    <!-- Title bar text -->
    <text x="200" y="73" font-family="monospace" font-size="20" font-weight="bold" fill="#111111">portfolio_site.html</text>
    <!-- Topbar navigation buttons -->
    <rect x="100" y="125" width="130" height="40" fill="none" stroke="#111111" stroke-width="6"/>
    <rect x="280" y="125" width="130" height="40" fill="none" stroke="#111111" stroke-width="6"/>
    <rect x="460" y="125" width="130" height="40" fill="none" stroke="#111111" stroke-width="6"/>
    <rect x="640" y="125" width="130" height="40" fill="none" stroke="#111111" stroke-width="6"/>
    <!-- Main content grid -->
    <rect x="100" y="195" width="440" height="150" fill="none" stroke="#111111" stroke-width="6"/>
    <line x1="130" y1="235" x2="510" y2="235" stroke="#111111" stroke-width="6"/>
    <line x1="130" y1="270" x2="440" y2="270" stroke="#111111" stroke-width="6"/>
    <line x1="130" y1="305" x2="480" y2="305" stroke="#111111" stroke-width="6"/>
    <!-- Aside box -->
    <rect x="580" y="195" width="190" height="150" fill="none" stroke="#111111" stroke-width="6"/>
    <!-- Stylized target/compass inside aside box -->
    <circle cx="675" cy="270" r="28" fill="none" stroke="#111111" stroke-width="6"/>
    <line x1="675" y1="230" x2="675" y2="310" stroke="#111111" stroke-width="6"/>
    <line x1="635" y1="270" x2="715" y2="270" stroke="#111111" stroke-width="6"/>
  </svg>`,
  leadme: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420">
    <rect width="900" height="420" fill="#efe2c8"/>
    <rect x="60" y="40" width="780" height="340" fill="none" stroke="#111111" stroke-width="8"/>
    <!-- Block 1: Lead Queue / SQLite Database on Left -->
    <rect x="100" y="120" width="180" height="180" fill="none" stroke="#111111" stroke-width="8"/>
    <rect x="140" y="150" width="100" height="35" rx="5" ry="5" fill="none" stroke="#111111" stroke-width="6"/>
    <rect x="140" y="195" width="100" height="35" rx="5" ry="5" fill="none" stroke="#111111" stroke-width="6"/>
    <rect x="140" y="240" width="100" height="35" rx="5" ry="5" fill="none" stroke="#111111" stroke-width="6"/>

    <!-- Block 2: Orchestrator / Queue Worker in Center -->
    <rect x="360" y="120" width="180" height="180" rx="90" ry="90" fill="none" stroke="#111111" stroke-width="8"/>
    <circle cx="450" cy="210" r="30" fill="none" stroke="#111111" stroke-width="8"/>
    <line x1="450" y1="150" x2="450" y2="270" stroke="#111111" stroke-width="8"/>
    <line x1="390" y1="210" x2="510" y2="210" stroke="#111111" stroke-width="8"/>

    <!-- Block 3: Hermes (LLM Integration) / JSON Outputs on Right -->
    <rect x="620" y="120" width="180" height="180" fill="none" stroke="#111111" stroke-width="8"/>
    <text x="660" y="222" font-family="monospace" font-size="60" font-weight="bold" fill="#111111">{ }</text>
    <polyline points="695,190 710,205 745,170" fill="none" stroke="#111111" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Connector lines -->
    <line x1="280" y1="210" x2="360" y2="210" stroke="#111111" stroke-width="8"/>
    <line x1="540" y1="210" x2="620" y2="210" stroke="#111111" stroke-width="8"/>
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

// About Me Carousel
const aboutImg = document.getElementById('about-img');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');

if (aboutImg && prevBtn && nextBtn) {
  const images = [
    { src: 'assets/images/Nathan-Peredery/meSerrious.jpg', alt: 'Nathan Peredery (Serious)' },
    { src: 'assets/images/Nathan-Peredery/meSilly.JPG', alt: 'Nathan Peredery (Silly)' }
  ];
  let currentIndex = 0;

  function updateCarousel() {
    aboutImg.src = images[currentIndex].src;
    aboutImg.alt = images[currentIndex].alt;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });
}

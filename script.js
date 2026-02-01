console.log("Divya Gupta Portfolio Loaded Successfully");

/* ================= NAVBAR TOGGLE ================= */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  });
}

/* ================= TYPING EFFECT (FIXED) ================= */
/* ================= TYPING EFFECT (FIXED) ================= */

const typingText = document.getElementById("typing-text");

const roles = [
  "VLSI & Semiconductor Student",
  "RTL Design Engineer",
  "RISC-V Enthusiast",
  "Physical Design Learner",
  "Open-Source Silicon Explorer"
];

let roleIndex = 0;
let charIndex = 0;

function typeRole() {
  if (!typingText) return;

  if (charIndex < roles[roleIndex].length) {
    typingText.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, 90);
  } else {
    setTimeout(eraseRole, 1200);
  }
}

function eraseRole() {
  if (charIndex > 0) {
    typingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseRole, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 500);
  }
}

document.addEventListener("DOMContentLoaded", typeRole);

/* ================= FLIP CARD ================= */
function flipCard(el) {
  const card = el.closest('.flip-card');
  if (!card) return;

  card.classList.add('flipped');

  // Glow animation
  card.classList.remove('glow');
  void card.offsetWidth; // force reflow
  card.classList.add('glow');
}

function flipBack(el) {
  const card = el.closest('.flip-card');
  if (card) {
    card.classList.remove('flipped');
  }
}


console.log("VLSI Background Loaded");

// ================== GLOBALS ==================
let mousePos = { x: -9999, y: -9999 };
const particles = [];

// ================== INIT ==================
window.addEventListener("DOMContentLoaded", () => {
  generateParticles();
  setupMouseTracking();
  animateParticles();
});

// ================== PARTICLE GENERATION ==================
function generateParticles() {
  const container = document.getElementById("particles-container");
  if (!container) return;

  const types = ['binary','binary','binary','binary','chip','gate','circuit','dots'];
  const weights = [40,40,40,40,10,8,8,6];

  const COUNT = 220; // 🔥 DENSITY

  for (let i = 0; i < COUNT; i++) {
    const particle = {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 6, // 🔥 SMALL
      type: weightedPick(types, weights),
      rotation: Math.random() * 360,
      element: null
    };

    particle.element = createParticle(particle);
    container.appendChild(particle.element);
    particles.push(particle);
  }
}

// ================== WEIGHTED PICK ==================
function weightedPick(types, weights) {
  const sum = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * sum;
  for (let i = 0; i < types.length; i++) {
    r -= weights[i];
    if (r <= 0) return types[i];
  }
  return types[0];
}

// ================== CREATE PARTICLE ==================
function createParticle(p) {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.left = `${p.x}%`;
  el.style.top = `${p.y}%`;
  el.style.opacity = "0.12";
  el.style.position = "absolute";
  el.style.pointerEvents = "none";

  if (p.type === "binary") {
    el.innerHTML = `
      <div class="binary-text">
        ${Math.random().toString(2).substring(2, 10)}
      </div>`;
  }

  else if (p.type === "chip") {
    el.innerHTML = `
      <div class="chip"
        style="
          width:${p.size}px;
          height:${p.size}px;
          transform:rotate(${p.rotation}deg);
        ">
        <div class="chip-body">
          <div class="chip-die"></div>
        </div>
      </div>`;
  }

  else {
    el.innerHTML = createSVG(p);
  }

  return el;
}

// ================== SVG SHAPES ==================
function createSVG(p) {
  const stroke = "rgba(96,165,250,0.25)";

  switch (p.type) {
    case "gate":
      return `
      <svg width="${p.size}" height="${p.size}" viewBox="0 0 40 40"
        style="transform:rotate(${p.rotation}deg)">
        <path d="M10 14 Q30 20 10 36 Z"
          stroke="${stroke}" fill="none" stroke-width="1.6"/>
      </svg>`;

    case "circuit":
      return `
      <svg width="${p.size}" height="${p.size}" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="5"
          stroke="${stroke}" fill="none" stroke-width="1.5"/>
      </svg>`;

    case "dots":
      return `
      <svg width="${p.size}" height="${p.size}" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="2"
          fill="rgba(96,165,250,0.25)"/>
      </svg>`;
  }
}

// ================== MOUSE TRACKING ==================
function setupMouseTracking() {
  const bg = document.getElementById("vlsi-background");
  const glowBig = document.getElementById("mouse-glow-large");
  const glowSmall = document.getElementById("mouse-glow-small");

  if (!bg || !glowBig || !glowSmall) return;

  bg.addEventListener("mousemove", (e) => {
    const r = bg.getBoundingClientRect();
    mousePos.x = e.clientX - r.left;
    mousePos.y = e.clientY - r.top;

    glowBig.style.left = `${mousePos.x}px`;
    glowBig.style.top  = `${mousePos.y}px`;
    glowSmall.style.left = `${mousePos.x}px`;
    glowSmall.style.top  = `${mousePos.y}px`;

    glowBig.style.opacity = "1";
    glowSmall.style.opacity = "1";
  });

  bg.addEventListener("mouseleave", () => {
    glowBig.style.opacity = "0";
    glowSmall.style.opacity = "0";
    mousePos.x = -9999;
    mousePos.y = -9999;
  });
}

// ================== ANIMATION LOOP ==================
function animateParticles() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  particles.forEach(p => {
    const px = (p.x / 100) * vw;
    const py = (p.y / 100) * vh;

    const d = Math.hypot(mousePos.x - px, mousePos.y - py);
    const near = d < 160;
    const intensity = Math.max(0, 1 - d / 160);

    p.element.style.transform =
      `scale(${near ? 1 + intensity * 0.4 : 1})`;

    p.element.style.opacity =
      0.12 + (near ? intensity * 0.75 : 0);

    p.element.style.filter = near
      ? `drop-shadow(0 0 ${14 * intensity}px rgba(34,197,94,0.8))`
      : "none";
  });

  requestAnimationFrame(animateParticles);
}

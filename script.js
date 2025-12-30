console.log("Divya Gupta Portfolio Loaded Successfully");

// ===== Navbar toggle =====
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });
}

// ===== Typing text effect =====
const textElement = document.querySelector('.multiple-text');

const texts = [
    "VLSI & Semiconductor Student",
    "RTL Design Engineer",
    "RISC-V Enthusiast",
    "Physical Design Learner",
    "Open-Source Silicon Explorer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!textElement) return;

    const currentText = texts[textIndex];

    if (!isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    } else {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// ===== FLIP CARD FUNCTIONS (🔥 REQUIRED) =====
function flipCard(el) {
    const card = el.closest('.flip-card');
    if (card) {
        card.classList.add('flipped');
    }
}

function flipBack(el) {
    const card = el.closest('.flip-card');
    if (card) {
        card.classList.remove('flipped');
    }
}
function toggleFlip(card) {
    card.classList.toggle("flipped")

    // Glow animation
    card.classList.remove("glow")
    void card.offsetWidth   // reflow trick
    card.classList.add("glow")
}

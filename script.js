/* ===========================
   PORTFOLIO JS – Vinay D R
   =========================== */

// ===========================
// PARTICLES
// ===========================
function createParticles() {
  const container = document.getElementById('particles');
  const count = 40;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 1;
    const shade = Math.random();
    const color = shade > 0.6
      ? 'rgba(37, 99, 235, 0.25)'
      : shade > 0.3
      ? 'rgba(96, 165, 250, 0.2)'
      : 'rgba(191, 219, 254, 0.3)';
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${color};
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}

// ===========================
// NAVBAR
// ===========================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ===========================
// TYPING EFFECT
// ===========================
function initTypingEffect() {
  const texts = [
    'Java Backend Developer',
    'MCA Student @ Reva University',
    'Problem Solver & DSA Enthusiast',
    'Database Designer',
    'Tech Enthusiast'
  ];

  const el = document.getElementById('typedText');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      el.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 50 : 80;

    if (!isDeleting && charIndex === currentText.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

// ===========================
// SCROLL REVEAL
// ===========================
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.getPropertyValue('--delay') || '0s';
        const delayMs = parseFloat(delay) * 1000;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delayMs);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));
}

// ===========================
// SKILL BARS ANIMATION
// ===========================
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill, .cgpa-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-width');
        setTimeout(() => {
          entry.target.style.width = targetWidth + '%';
        }, 300);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// ===========================
// SMOOTH SCROLL
// ===========================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===========================
// SKILL TAG HOVER RIPPLE
// ===========================
function initSkillTagEffects() {
  document.querySelectorAll('.skill-tag, .tech-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.08)';
    });
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
}

// ===========================
// COUNTER ANIMATION (Stats)
// ===========================
function animateCounter(el, target, suffix = '', decimals = 0) {
  const duration = 2000;
  const start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current) + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = (decimals > 0 ? target.toFixed(decimals) : target) + suffix;
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const statItems = document.querySelectorAll('.stat-number');
  const values = [
    { value: 9.21, decimals: 2, suffix: '' },
    { value: 2, decimals: 0, suffix: '+' },
    { value: 3, decimals: 0, suffix: '+' }
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statItems.forEach((el, i) => {
          const v = values[i];
          if (v) animateCounter(el, v.value, v.suffix, v.decimals);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}

// ===========================
// CARD TILT EFFECT
// ===========================
function initCardTilt() {
  document.querySelectorAll('.project-card, .edu-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.transition = 'transform 0.5s ease';
    });
  });
}

// ===========================
// GLOWING CURSOR TRAIL
// ===========================
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: left 0.3s ease, top 0.3s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initNavbar();
  initTypingEffect();
  initScrollReveal();
  initSkillBars();
  initSmoothScroll();
  initSkillTagEffects();
  initCounters();
  initCardTilt();
  initCursorGlow();

  // Trigger hero reveals immediately
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal-up, .hero .reveal-left, .hero .reveal-right').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 150);
    });
  }, 100);
});

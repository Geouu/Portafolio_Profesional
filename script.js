/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector('.nav-links a[href="#' + id + '"]');
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});

/* ===== FADE-IN ON SCROLL ===== */
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => fadeObserver.observe(el));

/* ===== PROGRESS BARS ANIMATION ===== */
const progressBars = document.querySelectorAll('.progress-fill, .lang-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = width + '%';
    }
  });
}, { threshold: 0.5 });
progressBars.forEach(bar => barObserver.observe(bar));

/* ===== CERTIFICATE CAROUSEL ===== */
const certTrack = document.getElementById('certTrack');
const certDots = document.getElementById('certDots');
const slides = certTrack.querySelectorAll('.cert-slide');
let currentSlide = 0;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('cert-dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  certDots.appendChild(dot);
});

function goToSlide(index) {
  currentSlide = index;
  certTrack.style.transform = 'translateX(-' + (index * 100) + '%)';
  document.querySelectorAll('.cert-dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

document.getElementById('certPrev').addEventListener('click', () => {
  goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
});
document.getElementById('certNext').addEventListener('click', () => {
  goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
});

// Auto-play carousel
setInterval(() => {
  goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
}, 5000);

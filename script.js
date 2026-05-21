const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  body.classList.add('light-mode');
  if (themeToggle) themeToggle.textContent = 'Dark';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? 'Dark' : 'Light';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    if (navLinks) {
      navLinks.classList.remove('open');
    }
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

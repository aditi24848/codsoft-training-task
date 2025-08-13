// Basic interactions: mobile toggle, smooth scroll, reveal on scroll, active nav highlight
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const header = document.getElementById('site-header');
  const nav = document.getElementById('main-nav');

  // Create mobile menu container (will be toggled)
  let mobileMenu = null;
  function openMobileMenu(){
    if (!mobileMenu) {
      mobileMenu = document.createElement('div');
      mobileMenu.className = 'mobile-nav';
      mobileMenu.innerHTML = `<ul>${[...nav.querySelectorAll('a')].map(a => `<li><a href="${a.getAttribute('href')}" class="mobile-link">${a.textContent}</a></li>`).join('')}</ul>`;
      document.body.appendChild(mobileMenu);

      // close on click outside or link click
      mobileMenu.addEventListener('click', (ev) => {
        if (ev.target.tagName === 'A') closeMobileMenu();
        if (ev.target === mobileMenu) closeMobileMenu();
      });
    }
    mobileMenu.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu(){
    if (!mobileMenu) return;
    mobileMenu.style.display = 'none';
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (mobileMenu && mobileMenu.style.display === 'flex') closeMobileMenu();
    else openMobileMenu();
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMobileMenu();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        history.replaceState(null, '', href);
      }
    });
  });

  // Reveal on scroll (IntersectionObserver)
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.18});

  reveals.forEach(r => observer.observe(r));

  // Active nav link switch while scrolling
  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-link')];

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  }, {threshold: 0.45});

  sections.forEach(s => activeObserver.observe(s));

  document.getElementById('year').textContent = new Date().getFullYear();
});

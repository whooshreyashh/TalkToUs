document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (!navToggle) {
    console.error('navToggle (id="navToggle") not found in DOM');
    return;
  }
  if (!mainNav) {
    console.error('mainNav (id="mainNav") not found in DOM');
    return;
  }

  // Ensure correct initial ARIA
  navToggle.setAttribute('aria-expanded', 'false');
  mainNav.setAttribute('aria-hidden', 'true');

  const closeMenu = () => {
    navToggle.classList.remove('active');
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mainNav.setAttribute('aria-hidden', 'true');
    // re-enable body scroll if you decided to disable it while menu open
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    navToggle.classList.add('active');
    mainNav.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    mainNav.setAttribute('aria-hidden', 'false');
    // optional: prevent body scroll while menu is open on small screens
    if (window.innerWidth <= 780) document.body.style.overflow = 'hidden';
  };

  navToggle.addEventListener('click', (e) => {
    const isOpen = navToggle.classList.contains('active');
    if (isOpen) closeMenu();
    else openMenu();
  });

  // Close when a nav link is clicked (mobile)
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 780) closeMenu();
    });
  });

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.classList.contains('active')) {
      closeMenu();
    }
  });

  // Click outside to close
  document.addEventListener('click', (e) => {
    // If the click is outside the header area and the menu is open, close it
    const target = e.target;
    const header = document.querySelector('.site-header');
    if (!header) return;
    if (!header.contains(target) && mainNav.classList.contains('open')) {
      closeMenu();
    }
  });

  // Optional: handle resize to ensure state reset when switching between desktop/mobile
  window.addEventListener('resize', () => {
    if (window.innerWidth > 780) {
      // Reset mobile-specific state so desktop nav always shows normally
      navToggle.classList.remove('active');
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      mainNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = '';
    } else {
      mainNav.setAttribute('aria-hidden', mainNav.classList.contains('open') ? 'false' : 'true');
    }
  });
});

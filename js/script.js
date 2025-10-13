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



// Popup open + image loading (manual demo)
document.querySelectorAll('').forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const popup = document.getElementById('popupOverlay');
    const gallery = document.getElementById('popupGallery');
    const title = document.getElementById('popupTitle');

    // Example setup (you can change folder path for each activity)
    const imageSets = [
      'assets/activity1/',
      'assets/activity2/',
    ];

    const activityTitles = [
      'Career Guidance Workshop',
      'Mental Health Awareness Camp'
    ];

    // Images assumed to be named photo1.jpg, photo2.jpg, ...
    const folder = imageSets[index];
    const numImages = 8; // change as needed
    gallery.innerHTML = ''; // clear previous images
    title.textContent = activityTitles[index];

    for (let i = 1; i <= numImages; i++) {
      const img = document.createElement('img');
      img.src = `${folder}photo${i}.jpg`;
      img.alt = `Activity photo ${i}`;
      gallery.appendChild(img);
    }

    popup.classList.add('active');
  });
});

// Popup close
document.getElementById('popupClose').addEventListener('click', () => {
  document.getElementById('popupOverlay').classList.remove('active');
});

// Fullscreen image view
const fullscreenView = document.getElementById('fullscreenView');
const fullscreenImg = document.getElementById('fullscreenImg');
const fullscreenClose = document.getElementById('fullscreenClose');

// Click on gallery image → open fullscreen
document.addEventListener('click', (e) => {
  if (e.target.closest('#popupGallery img')) {
    fullscreenImg.src = e.target.src;
    fullscreenView.classList.add('active');
  }
});

// Close fullscreen on × button or overlay click
fullscreenClose.addEventListener('click', () => fullscreenView.classList.remove('active'));
fullscreenView.addEventListener('click', (e) => {
  if (e.target === fullscreenView) fullscreenView.classList.remove('active');
});

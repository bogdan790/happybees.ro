/**
 * Mobile Navigation Toggle
 * Handles hamburger menu functionality for mobile devices
 */

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const navLinks = mainNav?.querySelectorAll('a');

  if (!hamburger || !mainNav || !mobileOverlay) return;

  // Toggle menu function
  function toggleMenu() {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('active');
    mobileOverlay.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (mainNav.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Close menu function
  function closeMenu() {
    hamburger.classList.remove('active');
    mainNav.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Hamburger click event
  hamburger.addEventListener('click', toggleMenu);

  // Overlay click event (close menu when clicking outside)
  mobileOverlay.addEventListener('click', closeMenu);

  // Close menu when clicking on a navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      closeMenu();
    }
  });

  // Close menu on window resize (when switching to desktop view)
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 767 && mainNav.classList.contains('active')) {
        closeMenu();
      }
    }, 250);
  });
});

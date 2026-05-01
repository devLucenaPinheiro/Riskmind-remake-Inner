document.addEventListener('DOMContentLoaded', function () {
  var btn     = document.getElementById('nav-hamburger');
  var menu    = document.getElementById('nav-links');
  var overlay = document.getElementById('nav-overlay');

  if (!btn || !menu) return;

  function openMenu() {
    menu.classList.add('nav-links--open');
    if (overlay) overlay.classList.add('nav-overlay--visible');
    btn.classList.add('nav-hamburger--active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('nav-links--open');
    if (overlay) overlay.classList.remove('nav-overlay--visible');
    btn.classList.remove('nav-hamburger--active');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    menu.classList.contains('nav-links--open') ? closeMenu() : openMenu();
  });

  if (overlay) overlay.addEventListener('click', closeMenu);

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && !href.startsWith('#')) {
        closeMenu();
        return;
      }
      e.preventDefault();
      closeMenu();
      setTimeout(function () {
        var target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    });
  });

  document.addEventListener('click', function (e) {
    if (
      menu.classList.contains('nav-links--open') &&
      !menu.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeMenu();
  });
});
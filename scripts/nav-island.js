/**
 * Floating island nav: scroll shrink, mobile drawer, active link highlight.
 */
(function () {
  'use strict';

  function normalizePath(path) {
    var p = path.replace(/\/index\.html$/i, '/');
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
    return p || '/';
  }

  function setActiveNavLinks() {
    var path = normalizePath(window.location.pathname);
    var links = document.querySelectorAll('#navMainLinks .nav-link[href]');
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#') return;
      try {
        var u = new URL(href, window.location.origin);
        var hp = normalizePath(u.pathname);
        var homeMatch = path === '/' && hp === '/';
        if (path === hp || homeMatch) a.classList.add('active');
        else a.classList.remove('active');
      } catch (e) {
        /* ignore */
      }
    });
  }

  function bindScroll(nav) {
    if (!nav || nav.dataset.scrollBound) return;
    nav.dataset.scrollBound = '1';
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function closeMobileMenu() {
    document.body.classList.remove('nav-mobile-open');
    var toggle = document.querySelector('.nav-toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
  }

  function openMobileMenu() {
    document.body.classList.add('nav-mobile-open');
    var toggle = document.querySelector('.nav-toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
    }
  }

  function bindNavIsland() {
    var nav = document.getElementById('navIsland');
    if (!nav || nav.dataset.navBound) return;
    nav.dataset.navBound = '1';

    bindScroll(nav);
    setActiveNavLinks();

    var toggle = nav.querySelector('.nav-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        if (document.body.classList.contains('nav-mobile-open')) closeMobileMenu();
        else openMobileMenu();
      });
    }

    var closeBtn = nav.querySelector('.nav-mobile-close');
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);

    nav.querySelectorAll('#navMainLinks .nav-link').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.matchMedia('(max-width: 1100px)').matches) closeMobileMenu();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMobileMenu();
    });

    if (!window.__navIslandWideCloseBound) {
      window.__navIslandWideCloseBound = true;
      window.matchMedia('(min-width: 1101px)').addEventListener('change', function (e) {
        if (e.matches) closeMobileMenu();
      });
    }
  }

  function tryBind() {
    bindNavIsland();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryBind);
  } else {
    tryBind();
  }

  var mo = new MutationObserver(function () {
    tryBind();
  });
  if (document.body) {
    mo.observe(document.body, { childList: true, subtree: true });
  }
})();

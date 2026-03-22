/**
 * Projects page: second floating tray below main nav — anchor links to each project.
 * Syncs tray position under #navIsland and --projects-body-pad for content offset.
 */
(function () {
  'use strict';

  var scheduled = false;
  var navResizeBound = false;

  function bindNavResizeObserver() {
    var nav = document.getElementById('navIsland');
    if (!nav || navResizeBound || !window.ResizeObserver) return;
    navResizeBound = true;
    var ro = new ResizeObserver(scheduleSync);
    ro.observe(nav);
  }

  function syncLayout() {
    var nav = document.getElementById('navIsland');
    var tray = document.getElementById('projectsPageTray');
    if (!tray || !document.body.classList.contains('projects-page')) return;

    if (document.body.classList.contains('nav-mobile-open')) {
      tray.setAttribute('aria-hidden', 'true');
      tray.style.visibility = 'hidden';
      tray.style.pointerEvents = 'none';
      if (nav) {
        document.documentElement.style.setProperty(
          '--projects-body-pad',
          Math.max(88, nav.getBoundingClientRect().bottom + 16) + 'px'
        );
      }
      return;
    }

    tray.removeAttribute('aria-hidden');
    tray.style.visibility = '';
    tray.style.pointerEvents = '';

    if (nav) {
      var nb = nav.getBoundingClientRect().bottom;
      tray.style.top = nb + 8 + 'px';
    }

    var bottom = tray.getBoundingClientRect().bottom;
    document.documentElement.style.setProperty('--projects-body-pad', bottom + 24 + 'px');
  }

  function scheduleSync() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      syncLayout();
    });
  }

  function anchorIdFromHref(href) {
    if (!href) return '';
    var i = href.indexOf('#');
    return i >= 0 ? href.slice(i + 1) : '';
  }

  function bindOnce() {
    if (window.__projectsPageTrayBound) return;
    var tray = document.getElementById('projectsPageTray');
    if (!tray) return;
    window.__projectsPageTrayBound = true;

    syncLayout();
    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync);
    bindNavResizeObserver();

    tray.querySelectorAll('a.nav-page-anchor-link[href*="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = anchorIdFromHref(a.getAttribute('href'));
        var el = id ? document.getElementById(id) : null;
        if (!el) return;
        e.preventDefault();
        /* Category filter may hide the target; show all first so scroll lands correctly. */
        document.querySelectorAll('.project-card').forEach(function (c) {
          c.style.display = 'flex';
        });
        document.querySelectorAll('.filter-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        var allBtn = document.querySelector('.filter-btn[data-category="all"]');
        if (allBtn) allBtn.classList.add('active');
        requestAnimationFrame(function () {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (history.replaceState) {
            history.replaceState(
              null,
              '',
              window.location.pathname + window.location.search + '#' + id
            );
          }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindOnce);
  } else {
    bindOnce();
  }

  var mo = new MutationObserver(function () {
    scheduleSync();
  });
  if (document.body) {
    mo.observe(document.body, { childList: true, subtree: true });
  }
})();

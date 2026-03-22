/**
 * Shared blog-style listing: desktop left filter island + timeline;
 * narrow screens hide rail and use top toggle + chips + cloned feed.
 * Expects body[data-listing-page="projects"|"photos"|"experience"|"publications"].
 */
(function () {
  'use strict';

  var PAGE = document.body.getAttribute('data-listing-page');
  if (!PAGE) return;

  /** Projects / Photos: jump-only (no filter / no mobile category panel) */
  if (PAGE === 'projects' || PAGE === 'photos') {
    function initJumpOnlyListing() {
      if (window.switchLanguage) {
        window.switchLanguage(localStorage.getItem('language') || 'en');
      }
      document
        .querySelectorAll('.listing-jump-links a[href*="#"], .listing-jump-accordion a[href*="#"]')
        .forEach(function (a) {
          a.addEventListener('click', function (e) {
            var href = a.getAttribute('href') || '';
            var hash = href.indexOf('#');
            var id = hash >= 0 ? href.slice(hash + 1) : '';
            var el = id ? document.getElementById(id) : null;
            if (!el) return;
            e.preventDefault();
            requestAnimationFrame(function () {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              if (history.replaceState) {
                history.replaceState(null, '', window.location.pathname + window.location.search + '#' + id);
              }
            });
          });
        });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initJumpOnlyListing);
    } else {
      initJumpOnlyListing();
    }
    return;
  }

  var CFG = {
    experience: {
      storageKey: 'listingFilterExperience',
      itemSelector: '.experience-card',
      filterAttr: 'data-category',
      rail: 'experience-filter-rail',
      chips: 'experience-filter-chips',
      timeline: 'experience-timeline-list',
      feed: 'experience-category-feed',
      viewDate: 'experience-view-date',
      viewCategory: 'experience-view-category',
      btnDate: 'experience-view-btn-date',
      btnCategory: 'experience-view-btn-category'
    },
    publications: {
      storageKey: 'listingFilterPublications',
      itemSelector: '.publication-listing-item',
      filterAttr: 'data-category',
      rail: 'publications-filter-rail',
      chips: 'publications-filter-chips',
      timeline: 'publications-timeline-list',
      feed: 'publications-category-feed',
      viewDate: 'publications-view-date',
      viewCategory: 'publications-view-category',
      btnDate: 'publications-view-btn-date',
      btnCategory: 'publications-view-btn-category'
    }
  };

  var cfg = CFG[PAGE];
  if (!cfg) return;

  function isWide() {
    return window.matchMedia('(min-width: 960px)').matches;
  }

  function viewStorageKey() {
    return 'listingViewMode_' + PAGE;
  }

  function getItems() {
    return document.querySelectorAll(
      '#' + cfg.timeline + ' ' + cfg.itemSelector + ', #' + cfg.feed + ' ' + cfg.itemSelector
    );
  }

  function syncButtons(catId) {
    var rail = document.getElementById(cfg.rail);
    if (rail) {
      rail.querySelectorAll('.blog-date-filter-island__btn').forEach(function (b) {
        var on = b.getAttribute('data-category') === catId;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      rail.querySelectorAll('.listing-jump-group[data-category]').forEach(function (d) {
        var on = d.getAttribute('data-category') === catId;
        d.classList.toggle('is-active', on);
      });
    }
    var chipsRoot = document.getElementById(cfg.chips);
    if (chipsRoot) {
      chipsRoot.querySelectorAll('.blog-category-chip').forEach(function (b) {
        var on = b.getAttribute('data-category') === catId;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }
  }

  function applyFilter(catId) {
    getItems().forEach(function (el) {
      var v = el.getAttribute(cfg.filterAttr);
      if (catId === 'all' || v === catId) {
        el.hidden = false;
        el.style.removeProperty('display');
      } else {
        el.hidden = true;
        el.style.display = 'none';
      }
    });
    syncButtons(catId);
    try {
      localStorage.setItem(cfg.storageKey, catId);
    } catch (e) {
      /* ignore */
    }
  }

  function setListingView(mode) {
    var isDate = mode === 'date';
    var vd = document.getElementById(cfg.viewDate);
    var vc = document.getElementById(cfg.viewCategory);
    var bd = document.getElementById(cfg.btnDate);
    var bc = document.getElementById(cfg.btnCategory);
    if (vd) vd.hidden = !isDate;
    if (vc) vc.hidden = isDate;
    if (bd) {
      bd.classList.toggle('is-active', isDate);
      bd.setAttribute('aria-selected', isDate ? 'true' : 'false');
    }
    if (bc) {
      bc.classList.toggle('is-active', !isDate);
      bc.setAttribute('aria-selected', isDate ? 'false' : 'true');
    }
    try {
      localStorage.setItem(viewStorageKey(), mode);
    } catch (e) {
      /* ignore */
    }
  }

  function buildChipsFromRail() {
    var sourceId = cfg.chipSource || cfg.rail;
    var rail = document.getElementById(sourceId);
    var chips = document.getElementById(cfg.chips);
    if (!rail || !chips) return;
    chips.innerHTML = '';
    rail.querySelectorAll('.blog-date-filter-island__btn').forEach(function (btn) {
      var c = btn.cloneNode(true);
      c.classList.remove('blog-date-filter-island__btn');
      c.classList.add('blog-category-chip');
      c.setAttribute('role', 'tab');
      chips.appendChild(c);
    });
  }

  function buildFeedClone() {
    var tl = document.getElementById(cfg.timeline);
    var feed = document.getElementById(cfg.feed);
    if (!tl || !feed) return;
    feed.innerHTML = '';
    tl.querySelectorAll(cfg.itemSelector).forEach(function (node) {
      feed.appendChild(node.cloneNode(true));
    });
  }

  function initJumpLinks() {
    document.querySelectorAll('.listing-jump-accordion a[href*="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href') || '';
        var hash = href.indexOf('#');
        var id = hash >= 0 ? href.slice(hash + 1) : '';
        var el = id ? document.getElementById(id) : null;
        var cat = a.getAttribute('data-filter-category');
        if (cat) {
          applyFilter(cat);
        } else {
          applyFilter('all');
        }
        if (!el) return;
        e.preventDefault();
        requestAnimationFrame(function () {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (history.replaceState) {
            history.replaceState(null, '', window.location.pathname + window.location.search + '#' + id);
          }
        });
      });
    });
  }

  function init() {
    if (window.switchLanguage) {
      window.switchLanguage(localStorage.getItem('language') || 'en');
    }

    buildFeedClone();
    buildChipsFromRail();

    var rail = document.getElementById(cfg.rail);
    var chips = document.getElementById(cfg.chips);

    if (rail) {
      rail.addEventListener('click', function (e) {
        var btn = e.target.closest('.blog-date-filter-island__btn');
        if (!btn || !rail.contains(btn)) return;
        applyFilter(btn.getAttribute('data-category'));
      });
    }
    if (chips) {
      chips.addEventListener('click', function (e) {
        var btn = e.target.closest('.blog-category-chip');
        if (!btn || !chips.contains(btn)) return;
        applyFilter(btn.getAttribute('data-category'));
      });
    }

    var stored = 'all';
    try {
      stored = localStorage.getItem(cfg.storageKey) || 'all';
    } catch (e) {
      /* ignore */
    }

    var ok = false;
    var railEl = document.getElementById(cfg.rail);
    if (railEl) {
      railEl.querySelectorAll('.blog-date-filter-island__btn').forEach(function (b) {
        if (b.getAttribute('data-category') === stored) ok = true;
      });
    }
    if (!ok) stored = 'all';
    applyFilter(stored);

    var modeStored = 'date';
    try {
      var m = localStorage.getItem(viewStorageKey());
      if (m === 'category' || m === 'date') modeStored = m;
    } catch (e) {
      /* ignore */
    }
    if (isWide()) {
      setListingView('date');
    } else {
      setListingView(modeStored);
    }

    var btnDate = document.getElementById(cfg.btnDate);
    var btnCategory = document.getElementById(cfg.btnCategory);
    if (btnDate) {
      btnDate.addEventListener('click', function () {
        setListingView('date');
      });
    }
    if (btnCategory) {
      btnCategory.addEventListener('click', function () {
        setListingView('category');
      });
    }

    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        if (isWide()) {
          setListingView('date');
        }
      }, 150);
    });

    initJumpLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

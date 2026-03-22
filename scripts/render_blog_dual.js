function fetchJson(url) {
  return fetch(url).then(function (res) {
    if (!res.ok) throw new Error(url + ' HTTP ' + res.status);
    return res.json();
  });
}

Promise.all([
  fetchJson('config/category_macro_map.json'),
  fetchJson('config/article_tags.json'),
  fetchJson('config/article_metadata.json')
]).then(([macroMap, articleTags, metadata]) => {
  const categoryKeyMap = {
    Investment: 'blog.category.investment',
    Bitcoin: 'blog.category.bitcoin',
    'Real Estate': 'blog.category.real_estate',
    'Stock Market': 'blog.category.stock_market',
    'Value Investing': 'blog.category.value_investing',
    Career: 'blog.category.career',
    'Tech Innovation': 'blog.category.tech_innovation',
    'Industry News': 'blog.category.industry_news',
    'Workplace Insights': 'blog.category.workplace_insights',
    'PhD Possibilities': 'blog.category.phd_possibilities',
    'Medical AI': 'blog.category.medical_ai'
  };

  const articleTitleKeyMap = {
    'btc_4year_high_no_joy.html': 'article.btc_4year.title',
    'buffett_munger_weekend_reflection.html': 'article.buffett.title',
    'btc_regulation.html': 'article.btc_regulation.title',
    'btc_repeat_4years.html': 'article.btc_repeat.title',
    'staff_engineer.html': 'article.staff_engineer.title',
    'btc_2026_prediction.html': 'article.btc_2026_prediction.title',
    'sglang_llm_agent_id_scanner.html': 'article.sglang_llm_agent.title',
    'llm_hospital_rad_linter.html': 'article.llm_hospital_rad_linter.title',
    'phd_possibilities.html': 'article.phd_possibilities.title',
    'value_lessons.html': 'article.value_lessons.title',
    '20260102rad_linter_clinical_qa.html': 'article.rad_linter_clinical_qa.title',
    '20251230btc_yield_spread_crash.html': 'article.btc_yield_spread_crash.title',
    '20260103rad_linter_clinical_sglang_advantage.html': 'article.rad_linter_sglang_advantage.title',
    '20260122phd_career_transition.html': 'article.phd_career_transition.title',
    '20260315_startup_ten_years.html': 'article.startup_ten_years.title'
  };

  const articleSummaryKeyMap = {
    'btc_4year_high_no_joy.html': 'article.btc_4year.summary',
    'buffett_munger_weekend_reflection.html': 'article.buffett.summary',
    'btc_regulation.html': 'article.btc_regulation.summary',
    'btc_repeat_4years.html': 'article.btc_repeat.summary',
    'staff_engineer.html': 'article.staff_engineer.summary',
    'btc_2026_prediction.html': 'article.btc_2026_prediction.summary',
    'sglang_llm_agent_id_scanner.html': 'article.sglang_llm_agent.summary',
    'llm_hospital_rad_linter.html': 'article.llm_hospital_rad_linter.summary',
    'phd_possibilities.html': 'article.phd_possibilities.summary',
    'value_lessons.html': 'article.value_lessons.summary',
    '20260102rad_linter_clinical_qa.html': 'article.rad_linter_clinical_qa.summary',
    '20251230btc_yield_spread_crash.html': 'article.btc_yield_spread_crash.summary',
    '20260103rad_linter_clinical_sglang_advantage.html': 'article.rad_linter_sglang_advantage.summary',
    '20260122phd_career_transition.html': 'article.phd_career_transition.summary',
    '20260315_startup_ten_years.html': 'article.startup_ten_years.summary'
  };

  const timeline = [];
  for (const [file, meta] of Object.entries(metadata)) {
    timeline.push({ file: file, title: meta.title, date: meta.date, summary: meta.summary });
  }

  const sorted = timeline.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  /** 小类 tag → 三大类：markets | career | innovation（仅用于筛选；卡片上仍显示原小类标签） */
  function getMacroIdsForFile(file) {
    const tags = articleTags[file] || [];
    const set = new Set();
    tags.forEach(function (t) {
      var m = macroMap[t];
      if (m) set.add(m);
    });
    return Array.from(set).join(',');
  }

  const MACRO_ORDER = ['markets', 'career', 'innovation'];
  const macroSlotMeta = {
    markets: { i18nKey: 'blog.macro.markets', label: 'Markets & Capital' },
    career: { i18nKey: 'blog.macro.career', label: 'Career & Industry' },
    innovation: { i18nKey: 'blog.macro.innovation', label: 'Innovation & Systems' }
  };

  const categorySlots = [{ id: 'all', i18nKey: 'blog.category.all', label: 'All' }];
  MACRO_ORDER.forEach(function (id) {
    var meta = macroSlotMeta[id];
    categorySlots.push({ id: id, i18nKey: meta.i18nKey, label: meta.label });
  });

  function slugFromFile(file) {
    var s = file.replace(/\.html$/i, '').replace(/[^a-zA-Z0-9_-]/g, '-');
    return s || 'post';
  }

  function makeTimelineArticle(a, idPrefix) {
    const tags = articleTags[a.file] || [];
    const primaryTag = tags[0];
    const slug = slugFromFile(a.file);

    const el = document.createElement('article');
    el.className = 'blog-timeline-item';
    el.id = idPrefix + slug;
    el.dataset.file = a.file;
    el.dataset.tags = (articleTags[a.file] || []).join(',');
    el.dataset.macros = getMacroIdsForFile(a.file);

    const metaP = document.createElement('p');
    metaP.className = 'blog-timeline-meta';
    const timeEl = document.createElement('time');
    if (a.date) timeEl.setAttribute('datetime', a.date);
    timeEl.textContent = a.date || '';
    metaP.appendChild(timeEl);
    el.appendChild(metaP);

    const titleKey = articleTitleKeyMap[a.file];
    const h2 = document.createElement('h2');
    h2.className = 'blog-timeline-headline';
    const link = document.createElement('a');
    link.className = 'blog-timeline-headline__link';
    link.href = 'posts/' + a.file;
    if (titleKey) {
      link.setAttribute('data-i18n', titleKey);
      link.textContent = a.title;
    } else {
      link.textContent = a.title;
    }
    h2.appendChild(link);
    el.appendChild(h2);

    const summaryKey = articleSummaryKeyMap[a.file];
    const excerptP = document.createElement('p');
    excerptP.className = 'blog-timeline-excerpt';
    const excerptSpan = document.createElement('span');
    if (summaryKey) {
      excerptSpan.setAttribute('data-i18n', summaryKey);
      excerptSpan.textContent = a.summary || '';
    } else {
      excerptSpan.textContent = a.summary || '';
    }
    excerptP.appendChild(excerptSpan);
    el.appendChild(excerptP);

    if (primaryTag) {
      const tagEl = document.createElement('span');
      tagEl.className = 'blog-timeline-tag';
      var tk2 = categoryKeyMap[primaryTag];
      if (tk2) tagEl.setAttribute('data-i18n', tk2);
      tagEl.textContent = primaryTag;
      el.appendChild(tagEl);
    }

    return el;
  }

  const timeRoot = document.getElementById('blog-timeline-list');
  const chipsRoot = document.getElementById('blog-category-chips');
  const feedRoot = document.getElementById('blog-category-feed');
  const dateFilterRoot = document.getElementById('blog-date-filter');
  const viewDate = document.getElementById('blog-view-date');
  const viewCategory = document.getElementById('blog-view-category');
  const btnDate = document.getElementById('blog-view-btn-date');
  const btnCategory = document.getElementById('blog-view-btn-category');

  /* —— 按日期：时间线 —— */
  if (timeRoot) {
    sorted.forEach(function (a) {
      timeRoot.appendChild(makeTimelineArticle(a, 'timeline-post-'));
    });
  }

  /* —— 按分类（窄屏）：与浮岛共用同一套宏类筛选 —— */
  if (feedRoot) {
    sorted.forEach(function (a) {
      feedRoot.appendChild(makeTimelineArticle(a, 'feed-post-'));
    });
  }

  function applyCategoryFeedFilter(catId) {
    document.querySelectorAll('#blog-category-feed .blog-timeline-item').forEach(function (el) {
      if (catId === 'all') {
        el.hidden = false;
        return;
      }
      var macros = (el.dataset.macros || '').split(',').filter(Boolean);
      el.hidden = macros.indexOf(catId) === -1;
    });
  }

  function applyCategoryFilter(categoryId) {
    document.querySelectorAll('#blog-timeline-list .blog-timeline-item').forEach(function (el) {
      if (categoryId === 'all') {
        el.hidden = false;
        return;
      }
      var macros = (el.dataset.macros || '').split(',').filter(Boolean);
      el.hidden = macros.indexOf(categoryId) === -1;
    });
  }

  function scrollFirstVisibleTimeline() {
    var items = document.querySelectorAll('#blog-timeline-list .blog-timeline-item');
    for (var i = 0; i < items.length; i++) {
      if (!items[i].hidden) {
        items[i].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        items[i].classList.add('blog-timeline-item--highlight');
        (function (node) {
          setTimeout(function () {
            node.classList.remove('blog-timeline-item--highlight');
          }, 1200);
        })(items[i]);
        break;
      }
    }
  }

  function setDateFilterActive(catId) {
    if (!dateFilterRoot) return;
    dateFilterRoot.querySelectorAll('.blog-date-filter-island__btn').forEach(function (b) {
      var on = b.dataset.category === catId;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    dateFilterRoot.querySelectorAll('.listing-jump-group[data-category]').forEach(function (d) {
      var on = d.dataset.category === catId;
      d.classList.toggle('is-active', on);
    });
  }

  function persistDateFilter(catId) {
    try {
      localStorage.setItem('blogDateFilter', catId);
    } catch (e) {
      /* ignore */
    }
  }

  function setAllFilterUIs(catId) {
    applyCategoryFilter(catId);
    applyCategoryFeedFilter(catId);
    setDateFilterActive(catId);
    if (chipsRoot) {
      chipsRoot.querySelectorAll('.blog-category-chip').forEach(function (b) {
        var on = b.dataset.category === catId;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }
    persistDateFilter(catId);
  }

  function applyDateFilter(catId, opts) {
    setAllFilterUIs(catId);
    if (opts && opts.scrollTimeline) {
      scrollFirstVisibleTimeline();
    }
  }

  function buildBlogDateFilterRail() {
    if (!dateFilterRoot) return;
    dateFilterRoot.className = 'listing-jump-accordion';
    dateFilterRoot.setAttribute('role', 'navigation');
    dateFilterRoot.setAttribute('aria-label', 'Blog categories');
    dateFilterRoot.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = 'blog-date-filter-island__btn listing-jump-all';
    allBtn.dataset.category = 'all';
    allBtn.setAttribute('data-i18n', 'blog.category.all');
    allBtn.textContent = 'All';
    allBtn.setAttribute('role', 'tab');
    allBtn.setAttribute('aria-selected', 'false');
    dateFilterRoot.appendChild(allBtn);

    MACRO_ORDER.forEach(function (macroId) {
      const posts = [];
      sorted.forEach(function (a) {
        var macros = (getMacroIdsForFile(a.file) || '').split(',').filter(Boolean);
        if (macros.indexOf(macroId) !== -1) posts.push(a);
      });
      if (posts.length === 0) return;

      const det = document.createElement('details');
      det.className = 'listing-jump-group';
      det.dataset.category = macroId;

      const sum = document.createElement('summary');
      sum.className = 'listing-jump-group__summary';
      const meta = macroSlotMeta[macroId];
      sum.setAttribute('data-i18n', meta.i18nKey);
      sum.textContent = meta.label;

      const nav = document.createElement('nav');
      nav.className = 'listing-jump-group__links';

      posts.forEach(function (a) {
        const slug = slugFromFile(a.file);
        const id = 'timeline-post-' + slug;
        const link = document.createElement('a');
        link.href = '#' + id;
        link.dataset.category = macroId;
        const titleKey = articleTitleKeyMap[a.file];
        if (titleKey) {
          link.setAttribute('data-i18n', titleKey);
        }
        link.textContent = a.title;
        nav.appendChild(link);
      });

      det.appendChild(sum);
      det.appendChild(nav);
      dateFilterRoot.appendChild(det);
    });

    dateFilterRoot.addEventListener('click', function (e) {
      var btn = e.target.closest('.blog-date-filter-island__btn');
      if (btn && dateFilterRoot.contains(btn)) {
        applyDateFilter(btn.dataset.category, { scrollTimeline: true });
        return;
      }
      var a = e.target.closest('a[href^="#"]');
      if (!a || !dateFilterRoot.contains(a)) return;
      e.preventDefault();
      var catId = a.dataset.category;
      if (catId) {
        applyDateFilter(catId, { scrollTimeline: false });
      }
      var href = a.getAttribute('href') || '';
      var id = href.slice(1);
      var el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(function () {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (history.replaceState) {
            history.replaceState(null, '', window.location.pathname + window.location.search + '#' + id);
          }
        });
      }
    });
  }

  var storedFilter = 'all';
  try {
    var sf = localStorage.getItem('blogDateFilter');
    if (sf === 'all' || sf === 'markets' || sf === 'career' || sf === 'innovation') {
      storedFilter = sf;
    }
  } catch (e) {
    /* ignore */
  }

  if (chipsRoot) {
    categorySlots.forEach(function (cat) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'blog-category-chip';
      btn.dataset.category = cat.id;
      if (cat.i18nKey) btn.setAttribute('data-i18n', cat.i18nKey);
      btn.textContent = cat.label;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
      chipsRoot.appendChild(btn);
    });

    chipsRoot.addEventListener('click', function (e) {
      const btn = e.target.closest('.blog-category-chip');
      if (!btn || !chipsRoot.contains(btn)) return;
      setAllFilterUIs(btn.dataset.category);
    });
  }

  buildBlogDateFilterRail();

  setAllFilterUIs(storedFilter);

  function isBlogWideLayout() {
    return window.matchMedia('(min-width: 960px)').matches;
  }

  function setBlogView(mode) {
    const isDate = mode === 'date';
    if (viewDate) {
      viewDate.hidden = !isDate;
    }
    if (viewCategory) {
      viewCategory.hidden = isDate;
    }
    if (btnDate) {
      btnDate.classList.toggle('is-active', isDate);
      btnDate.setAttribute('aria-selected', isDate ? 'true' : 'false');
    }
    if (btnCategory) {
      btnCategory.classList.toggle('is-active', !isDate);
      btnCategory.setAttribute('aria-selected', isDate ? 'false' : 'true');
    }
    try {
      localStorage.setItem('blogViewMode', mode);
    } catch (e) {
      /* ignore */
    }
  }

  var stored = null;
  try {
    stored = localStorage.getItem('blogViewMode');
  } catch (e) {
    /* ignore */
  }
  if (isBlogWideLayout()) {
    setBlogView('date');
  } else if (stored === 'category' || stored === 'date') {
    setBlogView(stored);
  } else {
    setBlogView('date');
  }

  var blogResizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(blogResizeTimer);
    blogResizeTimer = setTimeout(function () {
      if (isBlogWideLayout()) {
        setBlogView('date');
      }
    }, 150);
  });

  if (btnDate && btnCategory) {
    btnDate.addEventListener('click', function () {
      setBlogView('date');
    });
    btnCategory.addEventListener('click', function () {
      setBlogView('category');
    });
  }

  if (window.switchLanguage) {
    window.switchLanguage(localStorage.getItem('language') || 'en');
  }
}).catch(function (err) {
  console.error('[blog] Failed to load config or render:', err);
});

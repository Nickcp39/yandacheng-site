Promise.all([
  fetch('config/category_tree.json').then(res => res.json()),
  fetch('config/article_tags.json').then(res => res.json()),
  fetch('config/article_metadata.json').then(res => res.json())
]).then(([categoryTree, articleTags, metadata]) => {
  const byTag = {};
  const timeline = [];

  // 组装子类 → 文章映射
  for (const [file, meta] of Object.entries(metadata)) {
    const tags = articleTags[file] || [];
    tags.forEach(tag => {
      if (!byTag[tag]) byTag[tag] = [];
      byTag[tag].push({ file, ...meta });
    });
    timeline.push({ file, ...meta });
  }

  // 分类视图渲染
  const catRoot = document.getElementById('blog-category-list');
  
  // 分类名称到翻译键的映射
  const categoryKeyMap = {
    'Investment': 'blog.category.investment',
    'Bitcoin': 'blog.category.bitcoin',
    'Real Estate': 'blog.category.real_estate',
    'Stock Market': 'blog.category.stock_market',
    'Value Investing': 'blog.category.value_investing',
    'Career': 'blog.category.career',
    'Tech Innovation': 'blog.category.tech_innovation',
    'Industry News': 'blog.category.industry_news',
    'Workplace Insights': 'blog.category.workplace_insights',
    'PhD Possibilities': 'blog.category.phd_possibilities',
    'Medical AI': 'blog.category.medical_ai'
  };
  
  // 文件名到文章标题翻译键的映射
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
    'btc_yield_spread_crash.html': 'article.btc_yield_spread_crash.title',
    '20260103rad_linter_clinical_sglang_advantage.html': 'article.rad_linter_sglang_advantage.title'
  };
  
  // 文件名到文章摘要翻译键的映射
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
    'btc_yield_spread_crash.html': 'article.btc_yield_spread_crash.summary',
    '20260103rad_linter_clinical_sglang_advantage.html': 'article.rad_linter_sglang_advantage.summary'
  };
  
  for (const [main, subs] of Object.entries(categoryTree)) {
    const section = document.createElement('section');
    const mainKey = categoryKeyMap[main] || main;
    const h2 = document.createElement('h2');
    h2.setAttribute('data-i18n', mainKey);
    h2.textContent = main; // 默认显示英文，翻译系统会替换
    section.appendChild(h2);
    
    subs.forEach(sub => {
      const items = byTag[sub];
      if (items?.length) {
        const block = document.createElement('div');
        const subKey = categoryKeyMap[sub] || sub;
        const h3 = document.createElement('h3');
        h3.setAttribute('data-i18n', subKey);
        h3.textContent = sub; // 默认显示英文，翻译系统会替换
        block.appendChild(h3);
        
        const ul = document.createElement('ul');
        items.forEach(a => {
          const li = document.createElement('li');
          const titleKey = articleTitleKeyMap[a.file];
          if (titleKey) {
            // 使用翻译系统
            const link = document.createElement('a');
            link.href = `posts/${a.file}`;
            link.style.fontWeight = 'bold';
            link.setAttribute('data-i18n', titleKey);
            link.textContent = a.title; // 默认显示，翻译系统会替换
            li.appendChild(link);
            li.appendChild(document.createElement('br'));
            const dateSpan = document.createElement('span');
            dateSpan.style.fontSize = '0.85em';
            dateSpan.style.color = '#888';
            dateSpan.textContent = a.date || '';
            li.appendChild(dateSpan);
          } else {
            // 没有翻译键，直接显示
            li.innerHTML = `
              <a href="posts/${a.file}" style="font-weight: bold;">${a.title}</a><br>
              <span style="font-size: 0.85em; color: #888;">${a.date || ''}</span>
            `;
          }
          ul.appendChild(li);
        });
        block.appendChild(ul);
        section.appendChild(block);
      }
    });
    catRoot.appendChild(section);
  }
  
  // 渲染完成后，触发翻译更新
  if (window.switchLanguage) {
    const currentLang = localStorage.getItem('language') || 'en';
    window.switchLanguage(currentLang);
  }

  // 时间线视图渲染
  const timeRoot = document.getElementById('blog-timeline-list');
  timeline
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // 倒序
    .forEach(a => {
      const el = document.createElement('div');
      const p = document.createElement('p');
      p.style.marginBottom = '20px';
      
      const titleKey = articleTitleKeyMap[a.file];
      if (titleKey) {
        // 使用翻译系统
        const strong = document.createElement('strong');
        const link = document.createElement('a');
        link.href = `posts/${a.file}`;
        link.setAttribute('data-i18n', titleKey);
        link.textContent = a.title; // 默认显示，翻译系统会替换
        strong.appendChild(link);
        p.appendChild(strong);
        p.appendChild(document.createElement('br'));
        
        const dateSpan = document.createElement('span');
        dateSpan.style.fontSize = '0.85em';
        dateSpan.style.color = '#999';
        dateSpan.textContent = a.date;
        p.appendChild(dateSpan);
        p.appendChild(document.createElement('br'));
        
        const summaryKey = articleSummaryKeyMap[a.file];
        const summarySpan = document.createElement('span');
        summarySpan.style.fontSize = '0.95em';
        if (summaryKey) {
          summarySpan.setAttribute('data-i18n', summaryKey);
          summarySpan.textContent = a.summary || ''; // 默认显示，翻译系统会替换
        } else {
          summarySpan.textContent = a.summary || '';
        }
        p.appendChild(summarySpan);
      } else {
        // 没有翻译键，直接显示
        const summaryKey = articleSummaryKeyMap[a.file];
        const summaryHtml = summaryKey 
          ? `<span style="font-size: 0.95em;" data-i18n="${summaryKey}">${a.summary || ''}</span>`
          : `<span style="font-size: 0.95em;">${a.summary || ''}</span>`;
        p.innerHTML = `
          <strong><a href="posts/${a.file}">${a.title}</a></strong><br>
          <span style="font-size: 0.85em; color: #999;">${a.date}</span><br>
          ${summaryHtml}
        `;
      }
      el.appendChild(p);
      timeRoot.appendChild(el);
    });
  
  // 时间线渲染完成后，再次触发翻译更新
  if (window.switchLanguage) {
    const currentLang = localStorage.getItem('language') || 'en';
    window.switchLanguage(currentLang);
  }
});

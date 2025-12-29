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
          li.innerHTML = `
            <a href="posts/${a.file}" style="font-weight: bold;">${a.title}</a><br>
            <span style="font-size: 0.85em; color: #888;">${a.date || ''}</span>
          `;
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
      el.innerHTML = `
        <p style="margin-bottom: 20px;">
          <strong><a href="posts/${a.file}">${a.title}</a></strong><br>
          <span style="font-size: 0.85em; color: #999;">${a.date}</span><br>
          <span style="font-size: 0.95em;">${a.summary || ''}</span>
        </p>`;
      timeRoot.appendChild(el);
    });
});

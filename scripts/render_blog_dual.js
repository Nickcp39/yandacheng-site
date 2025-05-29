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
  for (const [main, subs] of Object.entries(categoryTree)) {
    const section = document.createElement('section');
    section.innerHTML = `<h2>${main}</h2>`;
    subs.forEach(sub => {
      const items = byTag[sub];
      if (items?.length) {
        const block = document.createElement('div');
        block.innerHTML = `<h3>${sub}</h3><ul>` + items.map(a => `
          <li>
            <a href="posts/${a.file}" style="font-weight: bold;">${a.title}</a><br>
            <span style="font-size: 0.85em; color: #888;">${a.date || ''}</span>
          </li>`).join('') + `</ul>`;
        section.appendChild(block);
      }
    });
    catRoot.appendChild(section);
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

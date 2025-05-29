Promise.all([
  fetch('config/category_tree.json').then(res => res.json()),
  fetch('config/article_tags.json').then(res => res.json())
]).then(([categoryTree, articleTags]) => {
  const subCategoryToArticles = {};

  // 建立子类 → [文章列表] 映射
  for (const [article, tags] of Object.entries(articleTags)) {
    tags.forEach(tag => {
      if (!subCategoryToArticles[tag]) {
        subCategoryToArticles[tag] = [];
      }
      subCategoryToArticles[tag].push(article);
    });
  }

  const container = document.getElementById('blog-category-list');

  // 按大类 → 子类 渲染
  for (const [mainCategory, subCategories] of Object.entries(categoryTree)) {
    const section = document.createElement('section');
    section.innerHTML = `<h2>${mainCategory}</h2>`;

    subCategories.forEach(sub => {
      const articles = subCategoryToArticles[sub];
      if (articles && articles.length > 0) {
        const subBlock = document.createElement('div');
        subBlock.innerHTML = `<h3 style="margin-top: 10px;">${sub}</h3><ul>` +
          articles.map(file => {
            const title = decodeURIComponent(file.replace('.html', '').replace(/_/g, ' '));
            return `<li><a href="posts/${file}">${title}</a></li>`;
          }).join('') +
          '</ul>';
        section.appendChild(subBlock);
      }
    });

    container.appendChild(section);
  }
});

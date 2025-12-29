#!/usr/bin/env node
/**
 * 博客文章自动添加脚本
 * 功能：自动获取当天日期，创建新文章并更新相关配置文件
 * 
 * 使用方法：
 *   node scripts/02-blog-management/add_article.js <filename> <title> <summary> [tags...]
 * 
 * 示例：
 *   node scripts/02-blog-management/add_article.js "my_article.html" "My Article Title" "Article summary" "Bitcoin" "Investment"
 */

const fs = require('fs');
const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);
if (args.length < 3) {
  console.error('❌ 错误：参数不足');
  console.log('\n使用方法：');
  console.log('  node scripts/02-blog-management/add_article.js <filename> <title> <summary> [tags...]');
  console.log('\n示例：');
  console.log('  node scripts/02-blog-management/add_article.js "my_article.html" "My Article Title" "Article summary" "Bitcoin" "Investment"');
  process.exit(1);
}

const filename = args[0];
const title = args[1];
const summary = args[2];
const tags = args.slice(3) || [];

// 确保文件名以 .html 结尾
const articleFile = filename.endsWith('.html') ? filename : `${filename}.html`;

// 获取当前日期
const today = new Date();
const dateISO = today.toISOString().split('T')[0]; // "2025-12-28"

// 格式化日期为英文显示格式
function formatDateEnglish(date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  // 添加序数后缀
  const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
                 (day % 10 === 2 && day !== 12) ? 'nd' :
                 (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
  
  return `${month} ${day}${suffix}, ${year}`;
}

// 格式化日期为中文显示格式
function formatDateChinese(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

const dateEnglish = formatDateEnglish(today);
const dateChinese = formatDateChinese(today);

// 项目根目录
const rootDir = path.resolve(__dirname, '../..');
const configDir = path.join(rootDir, 'config');
const postsDir = path.join(rootDir, 'posts');
const articlePath = path.join(postsDir, articleFile);

// 检查文件是否已存在
if (fs.existsSync(articlePath)) {
  console.error(`❌ 错误：文件 ${articleFile} 已存在`);
  process.exit(1);
}

// 1. 更新 article_metadata.json
console.log('📝 更新 article_metadata.json...');
const metadataPath = path.join(configDir, 'article_metadata.json');
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

if (metadata[articleFile]) {
  console.error(`❌ 错误：${articleFile} 已在 article_metadata.json 中存在`);
  process.exit(1);
}

metadata[articleFile] = {
  title: title,
  date: dateISO,
  summary: summary
};

fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2) + '\n');
console.log(`✅ 已添加 ${articleFile} 到 article_metadata.json，日期：${dateISO}`);

// 2. 更新 article_tags.json
if (tags.length > 0) {
  console.log('📝 更新 article_tags.json...');
  const tagsPath = path.join(configDir, 'article_tags.json');
  const articleTags = JSON.parse(fs.readFileSync(tagsPath, 'utf8'));
  
  articleTags[articleFile] = tags;
  
  fs.writeFileSync(tagsPath, JSON.stringify(articleTags, null, 2) + '\n');
  console.log(`✅ 已添加标签：${tags.join(', ')}`);
}

// 3. 生成文章HTML模板
console.log('📝 创建文章HTML文件...');
const htmlTemplate = `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="../style_blog.css">
</head>
<body>
  <!-- 🔹 Navbar -->
  <div id="navbar-placeholder"></div>
  <script>
    fetch('../navbar.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
        // navbar 加载完成后，触发语言按钮事件绑定
        if (window.attachLanguageButtonListeners) {
          window.attachLanguageButtonListeners();
        }
      });
  </script>

  <!-- 🌐 i18n 翻译脚本 -->
  <script src="../scripts/i18n.js"></script>

  <!-- 🔸 Blog Layout -->
  <div class="blog-container" style="display: flex; gap: 40px; align-items: flex-start;">

    <!-- ⬅ Left Sidebar -->
    <aside style="flex: 0 0 150px; font-size: 0.9em; color: #666;">
      <p><strong>Written by</strong><br>Yanda Cheng</p>
      <p><strong>Date</strong><br>${dateEnglish}</p>
      <p><a href="#disqus_thread">💬 Leave a comment</a></p>
    </aside>

    <!-- 🔳 Main Content -->
    <main style="flex: 1;">
      <p style="color: #888; font-size: 0.9em;">分类标签</p>
      <h1>${title}</h1>

      <!-- 在这里添加文章内容 -->

      <!-- 🔻 评论区域 -->
      <div id="disqus_thread" style="margin-top: 60px;"></div>
      <script>
        var disqus_config = function () {
          this.page.url = window.location.href;
          this.page.identifier = window.location.pathname;
        };
        (function() {
          var d = document, s = d.createElement('script');
          s.src = 'https://yanda-cheng.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
        })();
      </script>
    </main>

    <!-- ➡ Right Sidebar -->
    <aside style="flex: 0 0 250px;">
      <div style="margin-bottom: 30px;">
        <input type="text" placeholder="Search ..." style="width: 100%; padding: 6px;">
      </div>

      <div style="font-size: 0.9em; color: #555; margin-bottom: 30px;">
        <h3>Disclaimer</h3>
        <p>本文观点仅代表作者个人，不构成任何投资建议。</p>
      </div>

      <div style="font-size: 0.9em; color: #555;">
        <h3>Recent Posts</h3>
        <ul style="list-style-type: none; padding-left: 0;">
          <li><a href="btc_4year_high_no_joy.html">BTC 又站上四年高点，我却高兴不起来</a></li>
          <li><a href="btc_regulation.html">比特币是新时代的数字黄金</a></li>
          <li><a href="btc_repeat_4years.html">为什么比特币四年一轮回，但你依然赚不到钱？</a></li>
        </ul>
      </div>
    </aside>
  </div>

  <!-- 🔻 Footer -->
  <div class="footer">
    Blog © Yanda Cheng | Last updated ${today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
  </div>
</body>
</html>
`;

fs.writeFileSync(articlePath, htmlTemplate);
console.log(`✅ 已创建文章文件：${articlePath}`);

// 4. 输出总结
console.log('\n✨ 文章创建完成！');
console.log('\n📋 下一步：');
console.log('  1. 编辑文章内容：', articlePath);
if (tags.length === 0) {
  console.log('  2. 在 config/article_tags.json 中添加标签');
}
console.log('  3. 在 scripts/i18n.js 中添加翻译键值对（如果需要翻译）');
console.log('  4. 在 scripts/render_blog_dual.js 中添加标题翻译映射（如果需要翻译）');
console.log('\n📅 日期信息：');
console.log(`  ISO格式（用于排序）: ${dateISO}`);
console.log(`  英文格式: ${dateEnglish}`);
console.log(`  中文格式: ${dateChinese}`);


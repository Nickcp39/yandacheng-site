# Phase 5 — 博客系统美化

> 目标：博客列表页和文章页视觉升级，保持结构简单

---

## 1. 涉及文件

- `blog_yc.html` — 博客列表页
- `style_blog.css` — 博客样式
- `posts/*.html` — 14 篇文章页面
- `scripts/render_blog_dual.js` — 列表渲染脚本

## 2. 博客列表页 (blog_yc.html)

### 当前状态
- 双栏布局：左分类 + 右时间线
- inline style `display: flex; gap: 40px;`
- 分类渲染为 `<h2>` + `<h3>` + `<ul><li>` 嵌套
- 时间线渲染为 `<p>` 列表

### 改动

**布局：** 保持双栏，但改用 CSS class 替代 inline style：

```html
<div class="blog-container blog-layout">
  <div class="blog-col-left">
    <h1 class="blog-title"><span data-i18n="blog.title">Yanda's Blog</span></h1>
    <p class="blog-subtitle" data-i18n="blog.subtitle">Browse posts by category</p>
    <div id="blog-category-list"></div>
  </div>
  <div class="blog-col-right">
    <h2><span data-i18n="blog.timeline">Sorted by date</span></h2>
    <div id="blog-timeline-list"></div>
  </div>
</div>
```

```css
.blog-layout {
  display: flex;
  gap: 60px;
  align-items: flex-start;
}
.blog-col-left { flex: 1.2; min-width: 0; }
.blog-col-right { flex: 1; min-width: 0; }

@media (max-width: 768px) {
  .blog-layout {
    flex-direction: column;
    gap: 32px;
  }
}
```

**去掉 emoji：** 标题中 📚 和 🕒 移除。

**分类列表美化：**
- 分类名（h3）加左侧 3px 色条：`border-left: 3px solid var(--color-accent); padding-left: 12px;`
- 文章链接 hover 时加背景色微变
- 日期用 `var(--color-text-secondary)`

**时间线美化：**

```css
.timeline-item {
  position: relative;
  padding-left: 24px;
  padding-bottom: 24px;
  border-left: 1px solid var(--color-border);
}
.timeline-item::before {
  content: '';
  position: absolute;
  left: -4px;
  top: 6px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-accent);
}
```

这需要 `render_blog_dual.js` 渲染时给元素加 `.timeline-item` class。改动量：在渲染函数中加 `className` 赋值，约 5 行。

## 3. 文章页面 (posts/*.html)

### 当前状态

每篇文章是独立 HTML，引用 `style_blog.css`，结构：
- navbar 加载
- i18n 脚本
- 文章内容（h1/h2/p/img/blockquote）

### 改动

**文章内容区宽度限制：** 最大 720px 居中，提升阅读体验：

```css
.article-content {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-md) 20px;
}
```

**文章标题：**
```css
.article-content h1 {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: 8px;
}
```

**日期/标签（如有）：**
```css
.article-meta {
  color: var(--color-text-secondary);
  font-size: 15px;
  margin-bottom: var(--space-md);
}
```

**正文排版：**
```css
.article-content p {
  font-size: 17px;
  line-height: 1.7;
  margin-bottom: 1.2em;
}

.article-content img {
  max-width: 100%;
  border-radius: var(--radius-md);
  margin: var(--space-md) 0;
}

.article-content blockquote {
  border-left: 3px solid var(--color-accent);
  padding-left: 20px;
  color: var(--color-text-secondary);
  font-style: italic;
  margin: var(--space-md) 0;
}
```

### 文章页面批量更新

所有 14 篇文章需要：
1. 确保引用 `style.css`（CSS 变量）+ `style_blog.css`
2. 文章内容区域加 `.article-content` class

可以写个简单脚本批量处理，但手动改也只需 14 次，每次加一个 class。

## 4. render_blog_dual.js 改动

当前代码用 inline style 设置样式（`style.fontSize`、`style.color`）。
需要改为用 CSS class：

| 当前 | 改为 |
|------|------|
| `style.fontWeight = 'bold'` | 链接本身在 CSS 中设定 |
| `style.fontSize = '0.85em'; style.color = '#888'` | `.post-date` class |
| `style.fontSize = '0.95em'` | `.post-summary` class |
| `style.marginBottom = '20px'` | `.timeline-item` class |

改动量约 20 行，把 `el.style.xxx = yyy` 替换为 `el.className = 'xxx'`。

## 5. Footer 统一

博客 footer 当前样式（灰色背景）与首页 footer（深色背景）不统一。
统一为：

```css
.footer {
  text-align: center;
  padding: var(--space-md) 20px;
  color: var(--color-text-secondary);
  font-size: 14px;
  border-top: 1px solid var(--color-border);
  margin-top: var(--space-xl);
  background: transparent;
}
```

简洁的顶部细线 + 灰色文字，不用深色/浅灰色背景。

## 6. 侧面浮岛集成

### 博客列表页 (blog_yc.html)
- 左侧显示侧面浮岛，内容为分类快跳（Tech / Investment / Career 及子分类）
- 从 `category_tree.json` 动态生成
- 子分类缩进 `padding-left: 20px`
- 当前分类高亮
- 底部有 `← Home` 返回链接

### 文章页 (posts/*.html)
- 左侧显示侧面浮岛，内容为文章目录（TOC）
- 自动从 `h2` / `h3` 标签生成
- `IntersectionObserver` 滚动高亮当前章节
- 底部有 `← Back to Blog` 返回链接
- 面包屑导航：`Blog / 分类 / 子分类`

### 文章底部导航
- 上一篇 / 下一篇（从 article_metadata.json 按日期排序）
- 居中返回博客按钮

### 宽屏适配
- `@media (min-width: 1100px)`：文章内容 margin-left 偏移，避免被侧面浮岛遮挡

## 7. 留言系统

### Giscus（GitHub 登录留言）
- 基于 GitHub Discussions，零后端
- 嵌入 `<script>` 标签在每篇文章底部
- GitHub 自动发邮件通知 repo owner
- 配置步骤见 `18-BLOG_NAVIGATION_COMMENTS.md`

### Formspree（匿名留言）
- 折叠在 Giscus 下方的 `<details>` 元素中
- 表单提交到 Formspree，转发到站主邮箱
- 免费版 50 次/月

### 样式
```css
.comments-section {
  max-width: 720px;
  margin: 48px auto 0;
}
.comment-box {
  background: var(--color-bg-alt);
  border-radius: var(--radius-lg);
  padding: 24px;
}
```

## 8. 博客分类重组

当前 2 大类 9 子类 → 新 3 大类 6 子类：

```json
{
  "Tech": ["Medical AI", "AI Engineering"],
  "Investment": ["Bitcoin", "Value Investing"],
  "Career": ["PhD & Research", "Engineering Life"]
}
```

详见 `18-BLOG_NAVIGATION_COMMENTS.md` 第 3 节。

## 9. 不做的事

- ❌ 不加代码高亮库（Prism.js, highlight.js）
- ❌ 不做阅读进度条
- ❌ 不改 render_blog_dual.js 的数据逻辑，只改渲染样式

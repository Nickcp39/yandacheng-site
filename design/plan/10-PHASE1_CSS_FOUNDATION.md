# Phase 1 — CSS 基础设施 + 配色字体统一

> 目标：建立全站 CSS 变量系统，统一配色和字体，不改变布局结构

---

## 1. 约束

- GitHub Pages 静态站，不能用 Sass/PostCSS 预处理
- 所有 CSS 变量直接写在原生 CSS 的 `:root` 中
- 不引入任何构建工具

## 2. 变量定义

在 `style.css` 顶部添加：

```css
:root {
  /* 配色 */
  --color-bg: #ffffff;
  --color-bg-alt: #f5f5f7;
  --color-text: #1d1d1f;
  --color-text-secondary: #86868b;
  --color-border: #d2d2d7;
  --color-accent: #0071e3;
  --color-accent-hover: #0077ed;

  /* 字体 */
  --font-primary: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI',
                  'Helvetica Neue', sans-serif;

  /* 间距 */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 32px;
  --space-lg: 64px;
  --space-xl: 96px;

  /* 圆角 */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 18px;
  --radius-full: 980px;

  /* 过渡 */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
}
```

## 3. 字体加载

在每个页面 `<head>` 中添加 Inter 字体（仅一个字重文件，约 20KB gzip）：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**可行性注意：** Google Fonts CDN 在全球可用，GitHub Pages 无限制。`display=swap` 确保字体加载前用系统字体，不阻塞渲染。

## 4. 逐项替换清单

### style.css

| 当前值 | 替换为 | 涉及选择器 |
|--------|--------|------------|
| `font-family: "Segoe UI", sans-serif` | `var(--font-primary)` | `body` |
| `background-color: #fdfdfd` | `var(--color-bg)` | `body` |
| `color: #333` | `var(--color-text)` | `body` |
| `color: #007bff` | `var(--color-accent)` | `a`, `.btn`, `.filter-btn.active` |
| `color: #0056b3` | `var(--color-accent-hover)` | `a:hover`, `.btn:hover` |
| `background-color: #222` | `#1d1d1f` | `.navbar`, `.footer` |
| `color: #1abc9c` | `var(--color-accent)` | `.navbar a:hover`, `.lang-btn:hover/.active` |
| `border: 1px solid #ddd` | `border: 1px solid var(--color-border)` | `.experience-card`, `.project-card` |
| `background-color: #f9f9f9` | `var(--color-bg-alt)` | `.experience-card`, `.project-card` |
| `border-bottom: 2px solid #ddd` | `border-bottom: 1px solid var(--color-border)` | `h2` |
| `background-color: #d9534f` | `#ff3b30` | `.btn-red` |
| `border: 2px solid #ccc` | `border: 2px solid var(--color-border)` | `.home-profile-pic` |

### style_blog.css

| 当前值 | 替换为 |
|--------|--------|
| `font-family: 'Segoe UI', sans-serif` | `var(--font-primary)` |
| `background: #fdfdfd` | `var(--color-bg)` |
| `color: #333` | `var(--color-text)` |
| `color: #0055aa` | `var(--color-accent)` |
| `background: #333` | `#1d1d1f` |
| `color: #222` | `var(--color-text)` |
| `color: #777` | `var(--color-text-secondary)` |
| `border-bottom: 1px solid #ddd` | `border-bottom: 1px solid var(--color-border)` |
| `background-color: #f1f1f1` | `var(--color-bg-alt)` |

## 5. 共享变量方案

`style_blog.css` 也需要访问 CSS 变量。两种方案：

**方案 A：在 blog 页面同时引用 style.css（推荐）**
- `blog_yc.html` 改为引用两个样式表：`style.css`（基础变量）+ `style_blog.css`（博客覆盖）
- 优点：变量只定义一次
- 代价：blog 页面多加载一个 CSS 文件（~2KB gzip），可忽略

**方案 B：在 style_blog.css 中重复 :root 变量**
- 冗余，维护成本高
- 不推荐

→ 选择方案 A

## 6. 验证方法

逐页打开检查：
- [ ] index.html — 配色一致、字体生效
- [ ] about_yc.html
- [ ] projects_yc.html
- [ ] publications_yc.html
- [ ] experience_yc.html
- [ ] awards_yc.html
- [ ] photos_yc.html
- [ ] blog_yc.html
- [ ] 任意一篇 posts/*.html

验证标准：视觉上与当前版本"基本一致"（配色微调可接受），无布局错位。

## 7. 风险

- **无风险：** 纯 CSS 变量替换，不改布局，不改 HTML
- **唯一注意：** CSS 变量不支持 IE11，但 GitHub Pages 学术站用户基本不用 IE

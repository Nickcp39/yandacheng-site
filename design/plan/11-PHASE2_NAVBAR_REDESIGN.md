# Phase 2 — 浮岛式导航系统

> 目标：用 iOS 26 Liquid Glass 风格的浮岛替代传统固定顶栏
> 详细设计参见 `19-FLOATING_ISLAND_NAVIGATION.md`

---

## 1. 当前状态

- `navbar.html`：简单的 flex 布局，左 Home 右 7 个链接 + 语言切换
- 桌面端：水平排列，背景 #222 实色，`position: static`
- 移动端 (≤768px)：折行显示，体验差
- 没有 sticky/fixed，滚动后导航消失

## 2. 新方案：双浮岛

### 2.1 顶部浮岛（全站导航）

**视觉：**
- 居中悬浮胶囊，**不占满宽度**
- `position: fixed; top: 12px; left: 50%; transform: translateX(-50%)`
- 毛玻璃：`backdrop-filter: saturate(180%) blur(20px)`
- 背景：`rgba(255, 255, 255, 0.72)`
- 圆角 16px，微妙阴影 + 1px 边框
- 滚动超过 60px 时微缩（padding 减小，阴影加深）

**内容：**
- 左侧：名字 "Yanda Cheng"（logo 位）
- 中间：导航链接（Home / About / Projects / Blog 等）
- 右侧：语言切换（中文 / EN 胶囊按钮）

**导航链接交互：**
- 默认灰色，hover 时深色 + 浅灰背景
- 当前页面链接高亮蓝色 + 蓝色浅底

### 2.2 侧面浮岛（上下文导航）

**视觉：**
- `position: fixed; left: 20px; top: 50%; transform: translateY(-50%)`
- 同样毛玻璃效果，宽 180px
- 圆角 16px

**内容按页面类型切换：**

| 页面 | 侧面浮岛内容 | 是否显示 |
|------|-------------|----------|
| index.html | 无 | ❌ |
| about/projects/experience 等 | 无（页面不长） | ❌ |
| blog_yc.html | 分类快跳（Tech / Investment / Career 及子分类） | ✅ |
| posts/*.html | 文章目录（TOC，自动从 h2/h3 生成）+ 返回博客链接 | ✅ |

## 3. HTML 结构

### navbar.html 替换为：

```html
<!-- 顶部浮岛 -->
<nav class="nav-island floating-island" id="navIsland">
  <a href="/" class="nav-logo" data-i18n="nav.home">Yanda Cheng</a>
  <a href="/about_yc.html" class="nav-link" data-i18n="nav.about">About</a>
  <a href="/projects_yc.html" class="nav-link" data-i18n="nav.projects">Projects</a>
  <a href="/publications_yc.html" class="nav-link" data-i18n="nav.publications">Publications</a>
  <a href="/experience_yc.html" class="nav-link" data-i18n="nav.experience">Experience</a>
  <a href="/awards_yc.html" class="nav-link" data-i18n="nav.awards">Awards</a>
  <a href="/photos_yc.html" class="nav-link" data-i18n="nav.photos">Photos</a>
  <a href="/blog_yc.html" class="nav-link" data-i18n="nav.blog">Blog</a>
  <div class="lang-switcher">
    <button type="button" class="lang-btn" data-lang="zh">中文</button>
    <button type="button" class="lang-btn" data-lang="en">EN</button>
  </div>
  <button class="nav-toggle" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>
```

### 博客列表页侧面浮岛（blog_yc.html 中）：

```html
<aside class="side-island floating-island" id="blogSideIsland">
  <div class="side-island-label">Categories</div>
  <!-- JS 从 category_tree.json 动态渲染 -->
  <div id="side-island-categories"></div>
  <a href="/" class="back-link" data-i18n="nav.home">&larr; Home</a>
</aside>
```

### 文章页侧面浮岛（posts/*.html 中）：

```html
<aside class="side-island floating-island" id="articleSideIsland">
  <div class="side-island-label">Contents</div>
  <div id="side-island-toc"></div>
  <!-- JS 自动从 h2/h3 生成 -->
  <a href="/blog_yc.html" class="back-link">&larr; Back to Blog</a>
</aside>
```

## 4. CSS 关键样式

```css
/* 浮岛基础 */
.floating-island {
  position: fixed;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04);
  border-radius: 16px;
}

/* 顶部浮岛 */
.nav-island {
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 32px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 侧面浮岛 */
.side-island {
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  padding: 20px 16px;
  width: 180px;
}
```

完整 CSS 见 mockup_preview.html 和 `19-FLOATING_ISLAND_NAVIGATION.md`。

## 5. JS 逻辑（约 70 行总计）

1. **滚动缩放**：顶部浮岛滚动 >60px 时加 `.scrolled` class
2. **TOC 自动生成**：扫描 `.article-content h2, h3`，生成侧面浮岛目录
3. **滚动高亮**：`IntersectionObserver` 高亮当前阅读章节
4. **移动端交互**：侧面浮岛收成圆形按钮，点击展开

## 6. 移动端 (≤768px)

- **顶部浮岛**：全宽（left: 12px; right: 12px），只显示 logo + 语言切换 + 汉堡按钮
- **汉堡菜单**：点击后展开毛玻璃全屏导航，链接垂直排列
- **侧面浮岛**：收成 48px 圆形按钮（左下角），点击展开

## 7. 对其他文件的影响

- `style.css`：新增 `.floating-island`, `.nav-island`, `.side-island` 样式
- `style_blog.css`：原有 `.navbar` 样式删除，引用新样式
- 所有页面的 `<body>` 需要 `padding-top: 0`（浮岛是 fixed 不占文档流）
- 博客页和文章页需要在 HTML 中添加侧面浮岛容器

## 8. 验证清单

- [ ] 桌面：浮岛居中悬浮，毛玻璃可见
- [ ] 桌面：滚动时浮岛微缩
- [ ] 桌面：导航链接 hover/active 状态正确
- [ ] 桌面：语言切换正常
- [ ] 桌面：博客页侧面浮岛显示分类
- [ ] 桌面：文章页侧面浮岛显示 TOC，滚动高亮
- [ ] 移动端：顶部浮岛只显示 logo + 汉堡
- [ ] 移动端：汉堡展开导航正常
- [ ] 移动端：侧面浮岛收成圆形按钮
- [ ] 移动端：点击按钮展开侧面浮岛
- [ ] 宽屏 (>1100px)：文章内容不被侧面浮岛遮挡

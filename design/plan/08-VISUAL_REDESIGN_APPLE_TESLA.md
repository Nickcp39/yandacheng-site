# 视觉重设计方案 — Apple/Tesla 高端极简风格

> 目标：将 yandacheng-site 的视觉体验升级到 Apple/Tesla 级别的高端极简风格，
> 覆盖桌面端和移动端，同时改进自动化流程和翻译系统。

---

## 1. 设计理念

### 核心原则
- **Less is More** — 去掉一切不必要的装饰，让内容本身成为焦点
- **留白即高级** — 大量使用空间呼吸感，元素之间保持充裕距离
- **动效即品质** — 微妙、流畅的动画传递精致感，而非花哨
- **一致性** — 全站统一设计语言，所有页面遵循同一套视觉规范

### 参考风格
| 特征 | Apple | Tesla | 我们的取向 |
|------|-------|-------|------------|
| 配色 | 黑白灰 + 蓝色强调 | 黑白灰 + 红色强调 | 黑白灰 + 深蓝强调 |
| 排版 | SF Pro，字重对比强烈 | 简洁无衬线，极大标题 | Inter/SF Pro，层级清晰 |
| 动效 | 滚动视差、渐入 | 极简过渡、数字动画 | 滚动渐入 + 悬浮微动效 |
| 导航 | 毛玻璃半透明 | 极简固定顶栏 | 毛玻璃固定导航 |

---

## 2. 配色系统

### 主色板
```
--color-bg:          #ffffff      /* 页面背景 */
--color-bg-secondary:#f5f5f7      /* 卡片/区块背景（Apple 标志性浅灰） */
--color-surface:     #fbfbfd      /* 表面层 */
--color-text:        #1d1d1f      /* 主文本（Apple 标志性近黑） */
--color-text-secondary: #86868b  /* 次要文本 */
--color-border:      #d2d2d7      /* 边框 */
--color-accent:      #0071e3      /* 强调色（Apple 蓝） */
--color-accent-hover:#0077ed      /* 强调色悬停 */
```

### 深色模式（Phase 2 可选）
```
--color-bg:          #000000
--color-bg-secondary:#1d1d1f
--color-surface:     #2d2d2d
--color-text:        #f5f5f7
--color-text-secondary: #86868b
--color-accent:      #2997ff
```

### 去掉的颜色
- ~~#007bff~~ Bootstrap 蓝 → 替换为 `#0071e3`
- ~~#1abc9c~~ Teal 绿 → 移除
- ~~#d9534f~~ Bootstrap 红 → 移除或替换为 `#ff3b30`（Apple 红）
- ~~#fdfdfd~~ → 替换为纯 `#ffffff`

---

## 3. 字体系统

### 字体栈
```css
--font-primary: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter',
                'Segoe UI', 'Helvetica Neue', sans-serif;
--font-mono: 'SF Mono', 'Fira Code', 'Consolas', monospace;
```

### 字体层级
| 用途 | 字号 | 字重 | 行高 | 字间距 |
|------|------|------|------|--------|
| 页面大标题 (h1) | 48px / 3rem | 700 (Bold) | 1.1 | -0.02em |
| 区块标题 (h2) | 32px / 2rem | 600 (Semibold) | 1.2 | -0.01em |
| 卡片标题 (h3) | 21px / 1.3rem | 600 | 1.3 | 0 |
| 正文 | 17px / 1.06rem | 400 (Regular) | 1.65 | 0 |
| 辅助文本 | 14px / 0.875rem | 400 | 1.5 | 0.01em |
| 标签/按钮 | 14px | 500 (Medium) | 1 | 0.02em |

### 移动端字体缩放
- h1: 32px
- h2: 24px
- 正文: 16px（保持可读性）

---

## 4. 组件设计

### 4.1 导航栏 (Navbar)

**桌面端：**
- 固定顶部 (`position: sticky`)
- 毛玻璃效果：`backdrop-filter: saturate(180%) blur(20px)`
- 背景：`rgba(255, 255, 255, 0.72)`
- 高度：52px
- 底部细线：`1px solid rgba(0, 0, 0, 0.1)`
- 导航链接无下划线，hover 时颜色过渡
- 语言切换器：胶囊形切换按钮，当前语言高亮

**移动端：**
- 保持毛玻璃效果
- 汉堡菜单图标（右上角），点击展开全屏/半屏导航
- 展开动画：从上往下滑入，带 `backdrop-filter`
- 导航项垂直排列，字号加大（18px），触摸区域 44px+

```html
<!-- 移动端汉堡菜单结构 -->
<button class="nav-toggle" aria-label="Menu">
  <span class="nav-toggle-bar"></span>
  <span class="nav-toggle-bar"></span>
</button>
<div class="nav-mobile-menu">
  <!-- 导航链接 -->
</div>
```

### 4.2 Profile Card (首页)

- 布局改为居中垂直排列
- 头像：200px 圆形，带微妙阴影 `box-shadow: 0 4px 24px rgba(0,0,0,0.08)`
- 姓名：h1 级别，48px Bold
- 职位/学校：次要文本色，17px
- 链接行：用 pill 形按钮替代纯文本链接
- 去掉 emoji（📄），用简洁的 SVG icon 或纯文字

```
        [头像]
     Yanda Cheng
  Ph.D. Candidate in BME
  University at Buffalo

  [Resume]  [GitHub]  [Scholar]  [LinkedIn]
```

### 4.3 卡片系统

**统一卡片样式：**
```css
.card {
  background: var(--color-bg-secondary);  /* #f5f5f7 */
  border-radius: 18px;
  padding: 32px;
  border: none;                           /* 去掉 1px border */
  box-shadow: none;                       /* 去掉阴影，靠背景色区分 */
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.card:hover {
  transform: scale(1.02);                 /* 微放大而非上移 */
}
```

适用于：experience-card, project-card, publication, blog post-item

### 4.4 按钮系统

**主按钮 (Primary)：**
```css
.btn-primary {
  background: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: 980px;        /* 胶囊形 */
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: background 0.3s ease;
}
.btn-primary:hover {
  background: var(--color-accent-hover);
}
```

**次按钮 (Secondary)：**
```css
.btn-secondary {
  background: transparent;
  color: var(--color-accent);
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
}
```

### 4.5 页面区块分隔

- 不用 `border-bottom: 2px solid #ddd`（当前 h2 的样式）
- 改用大段留白 + 背景色交替（白底区块 → 浅灰底区块 → 白底区块）
- 区块之间间距：80px（桌面）/ 48px（移动）

---

## 5. 动效系统

### 5.1 滚动渐入 (Scroll Reveal)
```css
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

用 `IntersectionObserver` 触发，阈值 0.1，每个元素只触发一次。

### 5.2 页面切换
- 页面加载时整体淡入（`opacity 0→1`，300ms）

### 5.3 悬停效果
- 链接：颜色过渡 0.2s
- 卡片：`transform: scale(1.02)` 0.3s cubic-bezier
- 按钮：背景色过渡 0.3s
- 导航链接：底部滑入下划线动画

### 5.4 新闻滚动
- 保留当前滚动逻辑，但优化为更平滑的 ease 曲线
- 悬停时暂停滚动

---

## 6. 响应式策略

### 断点
```
--bp-mobile:  480px    /* 小手机 */
--bp-tablet:  768px    /* 平板/大手机 */
--bp-desktop: 1024px   /* 桌面 */
--bp-wide:    1440px   /* 宽屏 */
```

### 移动端关键调整
| 组件 | 桌面 | 移动端 |
|------|------|--------|
| 导航 | 水平链接 + 语言切换 | 汉堡菜单 + 全屏导航 |
| Profile | 水平排列 | 垂直居中 |
| 博客双栏 | 左分类 + 右时间线 | 上下堆叠 |
| Experience 卡片 | 图文水平 | 图文垂直 |
| 内容宽度 | max-width 960px | 100% - 32px padding |
| 触摸目标 | - | 最小 44×44px |

### 移动端导航交互
```
[Logo/Home]                    [☰]
                                ↓ 点击展开
┌──────────────────────────────┐
│  Home                        │
│  About                       │
│  Projects                    │
│  Publications                │
│  Experience                  │
│  Awards                      │
│  Photos                      │
│  Blog                        │
│                              │
│  [中文 / EN]                 │
└──────────────────────────────┘
```

---

## 7. Emoji 替换方案

当前站点大量使用 emoji 作为视觉标记。Apple/Tesla 风格不使用 emoji。

| 当前 | 替换方案 |
|------|----------|
| 📄 Resume | 纯文字 "Resume" 或小 SVG icon |
| 🧠 Selected Projects | "Selected Projects" |
| 📚 Publications / Blog | "Publications" / "Blog" |
| 💼 Experience | "Experience" |
| 🏆 Awards | "Awards" |
| 📸 Photo Gallery | "Photo Gallery" |
| 🕒 Sorted by date | "Sorted by date" |
| BTC gif 动图 | 移除或替换为静态极简 logo |

首页底部的两个 BTC gif + Visitor Map 区域需要重新设计，保持简洁。

---

## 8. 页面级设计说明

### 8.1 index.html (首页)
```
[毛玻璃导航栏]

        [头像]
      Yanda Cheng
   Ph.D. Candidate in BME
   University at Buffalo

   [Resume] [GitHub] [Scholar] [LinkedIn]

─── About Me ───────────────────────
   正文段落...

─── News ───────────────────────────
   滚动新闻列表...

─── Quick Links ────────────────────
   网格卡片布局：
   [Projects] [Publications] [Experience]
   [Awards]   [Photos]       [Blog]

─── Footer ─────────────────────────
   © Yanda Cheng · Visitor Map
```

Quick Links 改为卡片网格（3列桌面 / 2列平板 / 1列手机），每张卡片包含标题 + 一句描述。

### 8.2 blog_yc.html (博客)
- 保持双栏结构，但加大间距
- 分类标题用粗体 + 次要色
- 文章链接 hover 时整行背景微变
- 时间线用竖线 + 圆点的经典时间线 UI

### 8.3 文章页面 (posts/*.html)
- 文章标题用大号字体（40px）
- 日期和标签在标题下方，次要文本色
- 正文最大宽度 680px，居中，阅读舒适
- 图片全宽展示，圆角 12px

---

## 9. 翻译系统改进

### 当前问题
- `i18n.js` 单文件 2000+ 行，中英文混在一起
- 新文章的翻译 key 需要手动在多处同步
- `render_blog_dual.js` 中有 hardcoded 的 key map

### 改进方案
- 将翻译数据拆分为 `locales/zh.json` 和 `locales/en.json`
- `i18n.js` 只保留加载和切换逻辑
- 新增文章时，`add_article.js` 自动生成翻译 key 模板
- 博客渲染脚本从 metadata 自动读取，去掉 hardcoded map

---

## 10. 自动化改进

### 当前流程（手动）
1. 写 HTML 文章
2. 手动更新 `article_metadata.json`
3. 手动更新 `article_tags.json`
4. 手动在 `i18n.js` 添加翻译
5. 手动在 `render_blog_dual.js` 添加 key map

### 目标流程（半自动）
1. 运行 `node scripts/add_article.js` — 自动生成文章模板 + 更新所有 JSON
2. 写内容
3. 运行 `node scripts/sync_translations.js` — 扫描文章中的 i18n key，自动生成翻译骨架
4. 填写翻译
5. 运行 `node scripts/validate.js` — 检查所有元数据、翻译、日期的一致性

---

## 11. 文件变更清单

| 文件 | 变更类型 | 说明 |
|------|----------|------|
| `style.css` | 重写 | 全站主样式，CSS 变量系统 |
| `style_blog.css` | 重写 | 博客样式，继承主变量 |
| `style_loading.css` | 更新 | 适配新视觉 |
| `navbar.html` | 重写 | 毛玻璃导航 + 汉堡菜单 |
| `index.html` | 重构 | 去 emoji、新布局结构 |
| `blog_yc.html` | 更新 | 适配新样式 |
| `posts/*.html` | 批量更新 | 引用新样式表 |
| `scripts/i18n.js` | 拆分 | 逻辑和数据分离 |
| `scripts/render_blog_dual.js` | 更新 | 去 hardcoded map |
| `locales/zh.json` | 新增 | 中文翻译数据 |
| `locales/en.json` | 新增 | 英文翻译数据 |
| `scripts/sync_translations.js` | 新增 | 翻译同步脚本 |
| `scripts/validate.js` | 新增 | 全站一致性校验 |

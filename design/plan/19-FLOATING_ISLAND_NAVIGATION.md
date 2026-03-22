# 浮岛式导航设计 — iOS 26 Liquid Glass 风格

> 替代传统固定顶栏，改为悬浮毛玻璃浮岛导航

---

## 1. 设计理念

传统网站导航占满顶部整行，视觉上"压"住内容。浮岛式导航悬浮在内容上方，
圆角 + 毛玻璃 + 阴影，像一个独立的控件漂浮在页面上，视觉更轻盈、更高级。

参考：
- iOS 26 Liquid Glass 导航栏
- Apple Developer 文档侧边栏
- Notion 浮动目录

## 2. 两个浮岛

### 2.1 顶部浮岛（全站导航）

- **不占满宽度**，居中悬浮，最大宽度约 720px
- 圆角胶囊形（border-radius: 16px）
- 毛玻璃背景
- 固定在视口顶部，距顶 12px
- 内容：主导航链接 + 语言切换

```
          ┌──────────────────────────────────────┐
          │  Home  About  Projects  Blog  中文/EN │
          └──────────────────────────────────────┘
```

### 2.2 侧面浮岛（上下文导航）

根据页面类型不同，内容不同：

**在博客文章页：**
- 固定在视口左侧，距左 16px，垂直居中
- 显示当前文章目录（TOC）
- 当前阅读位置高亮
- 底部有"返回博客"按钮

```
  ┌──────────┐
  │ 目录      │
  │ · 引言    │
  │ · 第一节  │ ← 当前位置高亮
  │ · 第二节  │
  │ · 第三节  │
  │ · 结论    │
  │           │
  │ ← 返回Blog│
  └──────────┘
```

**在博客列表页：**
- 显示分类快跳
- Tech / Investment / Career

**在其他页面（About, Projects 等）：**
- 不显示侧面浮岛（这些页面内容不长，不需要）
- 只保留顶部浮岛

## 3. CSS 实现

### 3.1 毛玻璃浮岛基础样式

```css
.floating-island {
  position: fixed;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow:
    0 2px 20px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
```

### 3.2 顶部浮岛

```css
.nav-island {
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 28px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-island a {
  color: var(--color-text);
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
  white-space: nowrap;
}
.nav-island a:hover {
  color: var(--color-accent);
}

/* 滚动时自动缩小/淡化（可选） */
.nav-island.scrolled {
  padding: 8px 24px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
```

### 3.3 侧面浮岛

```css
.side-island {
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  padding: 20px 16px;
  width: 180px;
  max-height: 70vh;
  overflow-y: auto;
}

.side-island a {
  display: block;
  padding: 6px 10px;
  font-size: 13px;
  color: var(--color-text-secondary);
  border-radius: 6px;
  transition: all 0.2s;
  margin-bottom: 2px;
}
.side-island a:hover {
  background: rgba(0, 0, 0, 0.04);
  color: var(--color-text);
}
.side-island a.active {
  color: var(--color-accent);
  background: rgba(0, 113, 227, 0.08);
  font-weight: 600;
}

.side-island .back-link {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-accent);
}
```

### 3.4 文章正文偏移

侧面浮岛占 180px + 16px 间距，文章内容需要偏移：

```css
/* 有侧面浮岛时，内容区右移 */
.article-content {
  max-width: 720px;
  margin-left: 220px;  /* 180 + 16 + 24 padding */
  margin-right: auto;
}

/* 宽屏居中优化 */
@media (min-width: 1200px) {
  .article-content {
    margin-left: auto;
    margin-right: auto;
  }
  .side-island {
    left: calc(50% - 580px);  /* 内容区左侧外 */
  }
}
```

## 4. 移动端适配

### 顶部浮岛
- 缩减为：logo + 汉堡按钮
- 点击汉堡展开全屏毛玻璃导航

### 侧面浮岛
- **收起为浮动小圆形按钮**，固定在左下角

```css
@media (max-width: 768px) {
  .side-island {
    /* 收成圆形按钮 */
    width: 48px;
    height: 48px;
    border-radius: 50%;
    padding: 0;
    left: 16px;
    bottom: 16px;
    top: auto;
    transform: none;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .side-island .side-island-content {
    display: none;
  }
  .side-island .side-island-icon {
    display: block; /* ≡ 或 📑 图标 */
  }

  /* 展开状态 */
  .side-island.open {
    width: 240px;
    height: auto;
    max-height: 60vh;
    border-radius: 16px;
    padding: 20px 16px;
  }
  .side-island.open .side-island-content {
    display: block;
  }
  .side-island.open .side-island-icon {
    display: none;
  }

  /* 文章内容回到全宽 */
  .article-content {
    margin-left: auto;
    margin-right: auto;
    padding: 0 20px;
  }
}
```

## 5. JS 逻辑

### 5.1 目录自动生成（文章页）

扫描文章中的 h2/h3，自动生成侧面浮岛目录，约 25 行：

```javascript
function buildTOC() {
  const headings = document.querySelectorAll('.article-content h2, .article-content h3');
  const island = document.querySelector('.side-island-content');
  if (!island || headings.length === 0) return;

  headings.forEach((h, i) => {
    if (!h.id) h.id = `section-${i}`;
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    a.style.paddingLeft = h.tagName === 'H3' ? '20px' : '10px';
    island.appendChild(a);
  });
}
```

### 5.2 滚动高亮当前节

```javascript
function setupScrollSpy() {
  const headings = document.querySelectorAll('.article-content h2, .article-content h3');
  const links = document.querySelectorAll('.side-island-content a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(
          `.side-island-content a[href="#${entry.target.id}"]`
        );
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px' });

  headings.forEach(h => observer.observe(h));
}
```

### 5.3 移动端展开/收起

```javascript
document.querySelector('.side-island')?.addEventListener('click', (e) => {
  const island = e.currentTarget;
  if (window.innerWidth <= 768 && !island.classList.contains('open')) {
    island.classList.add('open');
    e.stopPropagation();
  }
});
document.addEventListener('click', () => {
  document.querySelector('.side-island')?.classList.remove('open');
});
```

### 5.4 顶部浮岛滚动响应（可选）

```javascript
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav-island');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});
```

## 6. 对现有页面的影响

| 页面类型 | 顶部浮岛 | 侧面浮岛 |
|----------|----------|----------|
| index.html | ✅ | ❌ 不需要 |
| about/projects/experience 等 | ✅ | ❌ 页面不长 |
| blog_yc.html | ✅ | ✅ 分类快跳 |
| posts/*.html | ✅ | ✅ 文章目录 |

### navbar.html 替换

现有 `navbar.html` 完全替换为浮岛结构。因为所有页面都是 `fetch('navbar.html')` 加载，改一处全站生效。

## 7. 可行性确认

| 技术 | 支持率 | 降级方案 |
|------|--------|----------|
| `position: fixed` | 99%+ | 无需降级 |
| `backdrop-filter` | 95%+ | 半透明白底 |
| `IntersectionObserver` | 97%+ | 无滚动高亮，功能不受影响 |
| CSS `border-radius` | 99%+ | 无需降级 |

**总 JS 量：** ~70 行（目录生成 + 滚动高亮 + 移动端交互 + 滚动响应）
**总 CSS 量：** ~120 行
**零依赖，GitHub Pages 完全兼容。**

## 8. 替代 Phase 2 导航方案

本方案替代 `11-PHASE2_NAVBAR_REDESIGN.md` 中的传统固定导航栏设计。
其他 Phase 不受影响。执行优先级不变。

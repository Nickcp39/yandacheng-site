# Phase 4 — 卡片系统 + 内容页统一

> 目标：统一所有内容页面的卡片、按钮、布局风格

---

## 1. 涉及页面

| 页面 | 当前主要组件 | 改动量 |
|------|------------|--------|
| `experience_yc.html` | experience-card（图+文水平） | 中 |
| `projects_yc.html` | project-card + filter-btn | 中 |
| `publications_yc.html` | publication（图+文水平） | 小 |
| `awards_yc.html` | 列表 | 小 |
| `about_yc.html` | 纯文本 + profile-pic | 小 |
| `photos_yc.html` | 图片展示 | 中 |

## 2. 统一卡片基础类

当前 `experience-card` 和 `project-card` 样式接近但独立定义。统一为一个基础：

```css
.card {
  background: var(--color-bg-alt);
  border-radius: var(--radius-lg);
  padding: 28px;
  border: none;
  box-shadow: none;
  transition: transform var(--transition-normal);
  margin-bottom: var(--space-md);
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
}
```

- 去掉 `border: 1px solid #ddd`
- 去掉默认 `box-shadow`，只在 hover 时出现
- 背景用 `--color-bg-alt`（#f5f5f7）区分

### 卡片内图片

```css
.card img {
  border-radius: var(--radius-md);
  border: none;
  object-fit: cover;
}
```

去掉 `border: 1px solid #ccc` 和 `background-color: white; padding: 4px`。

## 3. 逐页改动

### 3.1 experience_yc.html

- `.experience-card` → `.card .card-horizontal`
- 水平布局保持（图左文右），移动端垂直
- 去掉 `border: 1px solid #aaa` 在图片上
- 基本只改 class name，HTML 结构不变

### 3.2 projects_yc.html

- `.project-card` → `.card`
- 视频/图片保持在卡片内，但去掉 `float: left`（已在当前 CSS 中）
- **筛选按钮** 更新样式：

```css
.filter-btn {
  padding: 8px 20px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.filter-btn:hover {
  color: var(--color-text);
  border-color: var(--color-text);
}
.filter-btn.active {
  background: var(--color-text);
  color: #fff;
  border-color: var(--color-text);
}
```

胶囊形，active 用黑底白字（Apple 风格），去掉蓝色。

- 去掉项目描述中的 emoji 🔗，链接用 `var(--color-accent)` 即可
- 去掉 `style="color: #007bff; text-decoration: underline;"` inline style

### 3.3 publications_yc.html

- `.publication` 布局基本不变（图左文右）
- 图片 `border-radius: var(--radius-md)`，去掉 `border: 1px solid #ccc`
- `.btn` 按钮统一为新按钮系统

### 3.4 awards_yc.html

- 如果是简单列表，保持列表格式
- 加大行距，列表项之间加间距

### 3.5 about_yc.html

- 移除 `<style>` 内嵌样式（`.profile-pic`），改用全局 class
- 去掉 📎 emoji
- 结构保持不变

### 3.6 photos_yc.html

- 如有图片画廊，改为 CSS Grid 布局：

```css
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-sm);
}
.photo-grid img {
  width: 100%;
  border-radius: var(--radius-md);
  aspect-ratio: 4/3;
  object-fit: cover;
}
```

不加 lightbox 库（保持简单）。如果需要点击放大，用纯 CSS `<dialog>` 即可。

## 4. 按钮系统统一

当前有 `.btn` 和 `.btn-red`。统一为：

```css
/* 主按钮 */
.btn {
  display: inline-block;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  background: var(--color-accent);
  border-radius: var(--radius-full);
  border: none;
  transition: background var(--transition-fast);
}
.btn:hover {
  background: var(--color-accent-hover);
  color: #fff;
}

/* 次要按钮 */
.btn-secondary {
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
}
.btn-secondary:hover {
  background: var(--color-accent);
  color: #fff;
}

/* 危险按钮（如有需要） */
.btn-danger {
  background: #ff3b30;
}
```

## 5. Inline Style 清理

多个页面存在 inline style，需要逐步迁移到 CSS class：
- `style="color: #007bff; text-decoration: underline;"` → `.link-accent`
- `style="margin-top: 10px;"` → margin 写进组件 CSS
- `style="font-weight: bold;"` → `<strong>` 或 class

**原则：不一次全清，每个页面改的时候顺手迁移。**

## 6. 移动端

所有内容页面在移动端已有合理的 flex-direction: column 响应式。
新的 `.card` 基础类保持这个行为：

```css
@media (max-width: 768px) {
  .card-horizontal {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .card-horizontal img {
    max-width: 100%;
    margin-bottom: var(--space-sm);
  }
}
```

## 7. 不做的事

- ❌ 不加动画库（AOS, GSAP 等）
- ❌ 不做 lightbox/modal（除非 photos 页面确实需要）
- ❌ 不重构 HTML 结构，只更新 class 和样式
- ❌ 不添加 icon 库（Font Awesome 等），纯文字足够

# Phase 3 — 首页重设计

> 目标：简洁大气，一目了然，信息层级清晰

---

## 1. 设计原则回顾

这是一个学术/职业展示页面，访客来这里是为了快速了解 Yanda Cheng 是谁、做什么。
**不是产品页，不需要 hero 大图、parallax 视差、花哨动画。**
核心：信息清晰 > 视觉炫酷。

## 2. 当前首页结构

```
[Navbar（实色 #222，static）]
[Profile: 头像 + 名字 + 学校 + 链接（水平排列）]
[About Me 段落]
[News 滚动]
[链接列表：Projects / Publications / Experience / Awards / Photos]
[Footer]
[BTC gif + Visitor Map + BTC gif]
```

问题：
- 链接列表是纯 `<ul><li><a>` 无样式，emoji 做前缀
- BTC gif × 2 在底部，与学术展示不搭
- 信息密度合适，但视觉层级扁平

## 3. 新结构

```
[顶部浮岛导航（fixed，居中胶囊，毛玻璃）]
    ← 首页不显示侧面浮岛

───── Hero 区域 ─────────────────────
        [头像 180px]
       Yanda Cheng
    Ph.D. Candidate in BME
    University at Buffalo
    yandache@buffalo.edu

    [Resume]  [GitHub]  [Scholar]  [LinkedIn]
    （pill 胶囊按钮，hover 变蓝底白字）

───── About（白底）──────────────────
    About Me
    正文段落...

───── News（灰底 #f5f5f7）──────────
    News
    滚动新闻（hover 暂停）...

───── Quick Links（白底）────────────
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ Projects │ │ Pubs     │ │ Exp      │
    └──────────┘ └──────────┘ └──────────┘
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ Awards   │ │ Photos   │ │ Blog     │
    └──────────┘ └──────────┘ └──────────┘

───── Footer ───────────────────────
    © Yanda Cheng · Last updated Jan 2026
    [Visitor Map 小尺寸]
```

**注意：** 由于顶部浮岛是 `position: fixed`，不占文档流。
Profile hero 区域需要 `padding-top: 100px` 来避免被浮岛遮挡。

## 4. 逐块详细设计

### 4.1 Profile / Hero

**布局改动：水平 → 垂直居中**

```css
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-lg) 0 var(--space-md);
}

.home-profile-pic {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: var(--space-sm);
}
```

名字用 h1，40px Bold。学校和邮箱用次要文本色。

**链接行改为 pill 按钮：**
```html
<div class="profile-links">
  <a href="files/yandacheng_cv.pdf" class="pill">Resume</a>
  <a href="https://github.com/nickcp39" class="pill">GitHub</a>
  <a href="..." class="pill">Scholar</a>
  <a href="..." class="pill">LinkedIn</a>
</div>
```

```css
.pill {
  display: inline-block;
  padding: 8px 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-accent);
  transition: all var(--transition-fast);
}
.pill:hover {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
}
```

去掉 emoji 📄，用纯文字。

### 4.2 About Me

保持简单。一个 h2 + 一段 p。
- h2 去掉 `border-bottom`，改为只用字体大小和间距区分
- 段落 17px，行高 1.65

```css
.section-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-sm);
  /* 无边框、无装饰 */
}
```

### 4.3 News

- 用浅灰背景区块 (`--color-bg-alt`) 与 About 区分
- 去掉标题旁边的 `update_news.gif` 动图
- 新闻滚动保留，但加上 hover 暂停

```css
.section-alt {
  background: var(--color-bg-alt);
  padding: var(--space-lg) 0;
  margin: 0 calc(-50vw + 50%);  /* 全宽背景 */
  padding-left: calc(50vw - 50%);
  padding-right: calc(50vw - 50%);
}
```

**注意：** 全宽背景在 `.container` 内实现的方式需要 `overflow: hidden` 在 body 上。如果实现复杂，退回为给 News section 加一个独立的 wrapper div，放在 `.container` 外面。

**简化方案（推荐）：** 不做全宽，直接在 News 区域加 `background + border-radius + padding`。

### 4.4 Quick Links

替代当前的 emoji + `<ul><li>` 列表。

```html
<div class="quick-links">
  <a href="projects_yc.html" class="quick-card">
    <h3 data-i18n="home.projects">Selected Projects</h3>
    <p data-i18n="home.projects.desc">IoT, AI, Robotics</p>
  </a>
  <!-- 同理 6 张卡片 -->
</div>
```

```css
.quick-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

.quick-card {
  background: var(--color-bg-alt);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  transition: transform var(--transition-normal);
  color: var(--color-text);
}
.quick-card:hover {
  transform: scale(1.02);
}
.quick-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 6px;
}
.quick-card p {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .quick-links { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .quick-links { grid-template-columns: 1fr; }
}
```

### 4.5 底部区域

**去掉：** 两个 BTC gif
**保留：** Visitor Map，移到 Footer 内，缩小尺寸
**Footer 简化为一行：**

```html
<footer class="footer">
  <p>© Yanda Cheng · Last updated January 2026</p>
  <div id="clustrmaps-widget" style="margin-top: 12px;"></div>
</footer>
```

Footer 背景改为 `var(--color-bg-alt)` 而非深色。

### 4.6 滚动渐入

简单的 `IntersectionObserver`，约 15 行 JS：

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
```

给需要动画的元素加 `.fade-in` 类：
```css
.fade-in {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: none;
}
```

**可行性：** `IntersectionObserver` 支持率 >97%，无需 polyfill。

## 5. HTML 改动量估算

- Profile card：改 class 和结构 → ~15 行
- About：加 class → ~3 行
- News：去 gif、加 class → ~5 行
- Quick Links：替换 `<ul>` 为卡片网格 → ~30 行
- 底部：去 BTC gif，简化 footer → 删 ~20 行
- 加载 IntersectionObserver 脚本 → ~15 行

**总改动约 80 行 HTML + 对应 CSS。规模可控。**

## 6. 不做的事

- ❌ 不做 hero 大图/视频背景
- ❌ 不做 parallax 滚动
- ❌ 不做 particle.js 等动效库
- ❌ 不做 dark mode toggle（Phase 8 可选）
- ❌ 不做 typing animation 打字效果
- ❌ 不增加内容，只重新组织现有信息

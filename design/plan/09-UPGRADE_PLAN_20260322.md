# 升级计划 — 2026-03-22 启动

> 基于设计文档 `08-VISUAL_REDESIGN_APPLE_TESLA.md` + `19-FLOATING_ISLAND_NAVIGATION.md`
> 原则：每个 Phase 独立可交付，合并后站点始终可用
> 导航方案：浮岛式（iOS 26 Liquid Glass 风格），替代传统固定顶栏

---

## Phase 1 — 基础设施 + CSS 变量系统
**预期交付：可立即开始**

### 任务
- [ ] 1.1 在 `style.css` 顶部建立 CSS 自定义属性（配色、字体、间距、断点）
- [ ] 1.2 将现有颜色值全部替换为 CSS 变量引用
- [ ] 1.3 引入 Inter 字体（Google Fonts CDN），更新 font-family 栈
- [ ] 1.4 统一 `style.css` 和 `style_blog.css` 的公共变量（通过共享 `:root`）
- [ ] 1.5 验证：所有页面视觉无破坏性变化（颜色/字体切换后一致）

### 产出
- 更新后的 `style.css`、`style_blog.css`
- 全站配色和字体统一

---

## Phase 2 — 浮岛式导航系统
**依赖：Phase 1**

### 任务
- [ ] 2.1 `navbar.html` 重写为顶部浮岛（居中胶囊，毛玻璃，`position: fixed`）
- [ ] 2.2 浮岛基础 CSS：`.floating-island`, `.nav-island`, `.side-island`
- [ ] 2.3 顶部浮岛滚动缩放 JS（scrolled class）
- [ ] 2.4 语言切换器更新：胶囊按钮，active 用黑底白字
- [ ] 2.5 移动端：顶部浮岛全宽 + 汉堡菜单展开
- [ ] 2.6 博客页侧面浮岛：分类快跳（从 category_tree.json 动态生成）
- [ ] 2.7 文章页侧面浮岛：TOC 自动生成 + 滚动高亮
- [ ] 2.8 移动端：侧面浮岛收成圆形按钮 + 点击展开
- [ ] 2.9 测试：桌面 Chrome/Firefox/Safari，移动端 iOS/Android

### 产出
- 新版 `navbar.html`（浮岛结构）
- 浮岛 CSS + JS（~120行 CSS + ~70行 JS）
- 博客/文章页侧面浮岛 HTML 模板

---

## Phase 3 — 首页重设计
**依赖：Phase 2**

### 任务
- [ ] 3.1 Profile Card 改为居中垂直布局
- [ ] 3.2 链接行改为 pill 按钮样式
- [ ] 3.3 去掉所有 emoji，替换为纯文字或 SVG icon
- [ ] 3.4 Quick Links 改为卡片网格布局（3/2/1 列响应式）
- [ ] 3.5 底部区域重设计（BTC gif 移除，Visitor Map 简化）
- [ ] 3.6 添加 `IntersectionObserver` 滚动渐入动画
- [ ] 3.7 新闻滚动区优化：hover 暂停、更平滑的动画曲线
- [ ] 3.8 移动端验证

### 产出
- 更新后的 `index.html`

---

## Phase 4 — 卡片系统 + 内容页美化
**依赖：Phase 1**

### 任务
- [ ] 4.1 统一卡片样式：`.card` 基础类（圆角 18px、浅灰背景、无边框）
- [ ] 4.2 重构 `experience_yc.html` 卡片
- [ ] 4.3 重构 `projects_yc.html` 卡片 + 筛选按钮样式
- [ ] 4.4 重构 `publications_yc.html` 布局
- [ ] 4.5 重构 `awards_yc.html`
- [ ] 4.6 重构 `photos_yc.html`（图片画廊用网格 + lightbox）
- [ ] 4.7 按钮系统统一：primary / secondary 胶囊按钮
- [ ] 4.8 移动端验证

### 产出
- 所有内容页面视觉统一

---

## Phase 5 — 博客系统美化 + 留言 + 分类重组
**依赖：Phase 1、Phase 2**

### 任务
- [ ] 5.1 `blog_yc.html` 双栏布局优化：间距、字体层级
- [ ] 5.2 分类列表样式：左侧色条、缩进层级、hover 效果
- [ ] 5.3 时间线 UI：竖线 + 圆点 + 日期 + 标题
- [ ] 5.4 文章页面模板优化：标题加大、正文居中 720px、面包屑、图片全宽圆角
- [ ] 5.5 文章底部：上/下篇导航 + 返回博客按钮
- [ ] 5.6 留言系统：Giscus 集成（GitHub 登录）+ Formspree 匿名表单
- [ ] 5.7 分类重组：category_tree.json 改为 3 大类 6 子类 + 更新 article_tags.json
- [ ] 5.8 更新所有 `posts/*.html` 引用新样式 + 添加侧面浮岛容器
- [ ] 5.9 移动端验证

### 产出
- 更新后的 `style_blog.css`
- 更新后的博客页面
- 留言系统上线
- 分类结构清理完毕

---

## Phase 6 — 翻译系统重构
**依赖：无（可并行）**

### 任务
- [ ] 6.1 创建 `locales/zh.json` 和 `locales/en.json`，从 `i18n.js` 迁移数据
- [ ] 6.2 重写 `i18n.js`：改为加载 JSON 文件 + 切换逻辑
- [ ] 6.3 `render_blog_dual.js` 去掉 hardcoded key map，改为从 metadata 动态读取
- [ ] 6.4 补齐缺失的翻译 key（phd_career_transition 等）
- [ ] 6.5 全站翻译验证：中英文切换无遗漏

### 产出
- `locales/zh.json`、`locales/en.json`
- 重构后的 `i18n.js`
- 更新后的 `render_blog_dual.js`

---

## Phase 7 — 自动化工具链
**依赖：Phase 6**

### 任务
- [ ] 7.1 升级 `add_article.js`：同时更新 metadata + tags + 生成翻译骨架
- [ ] 7.2 新增 `scripts/sync_translations.js`：扫描 HTML 中的 i18n key，对比 JSON，报告缺失
- [ ] 7.3 新增 `scripts/validate.js`：校验 metadata/tags/翻译/文件是否一致
- [ ] 7.4 添加 `package.json`，定义 npm scripts（`npm run new-post`、`npm run validate`）
- [ ] 7.5 编写使用说明更新到 `scripts/02-blog-management/README.md`

### 产出
- 完善的工具链
- `package.json`

---

## Phase 8 — 深色模式（可选）
**依赖：Phase 1**

### 任务
- [ ] 8.1 CSS 变量支持 `prefers-color-scheme: dark`
- [ ] 8.2 手动切换按钮（导航栏或页脚）
- [ ] 8.3 图片/头像在深色模式下的适配
- [ ] 8.4 全站测试

### 产出
- 深色模式支持

---

## 执行优先级总览

```
Week 1:  Phase 1 (CSS 基础) + Phase 6 (翻译，并行)
Week 2:  Phase 2 (导航栏) + Phase 3 (首页)
Week 3:  Phase 4 (内容页) + Phase 5 (博客)
Week 4:  Phase 7 (自动化)
Future:  Phase 8 (深色模式)
```

## 风险和注意事项

1. **不破坏现有功能** — 每个 Phase 完成后都应该是可部署状态
2. **移动端优先验证** — 每次改动都在手机上检查
3. **翻译迁移风险** — Phase 6 需要仔细验证所有 key 都迁移完毕，建议写脚本自动对比
4. **Git 分支策略** — 建议每个 Phase 用独立分支，完成后合并到 main
5. **donglu_site 不动** — 按要求暂不处理
6. **空文件不动** — `phd_possibilities.html` 和 `value_lessons.html` 保留

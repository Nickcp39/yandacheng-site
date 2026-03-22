# 博客导航优化 + 留言系统 + 分类重组

---

## 1. 导航问题：进了文章回不去

### 当前状态
- 文章页 `posts/xxx.html` 只有顶部 navbar（全站导航）
- 没有"返回博客列表"按钮
- 没有上一篇/下一篇导航
- 用户看完文章只能点 navbar 的 Blog 链接回去

### 解决方案

**A. 文章顶部面包屑导航**

```html
<nav class="breadcrumb">
  <a href="/blog_yc.html">Blog</a> / <span>当前文章分类</span>
</nav>
```

```css
.breadcrumb {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}
.breadcrumb a {
  color: var(--color-accent);
}
```

位于文章标题上方，一键返回博客主页。

**B. 文章底部：上一篇 / 下一篇**

```html
<nav class="article-nav">
  <a href="posts/prev.html" class="article-nav-prev">
    <span class="article-nav-label">← 上一篇</span>
    <span class="article-nav-title">前一篇文章标题</span>
  </a>
  <a href="posts/next.html" class="article-nav-next">
    <span class="article-nav-label">下一篇 →</span>
    <span class="article-nav-title">后一篇文章标题</span>
  </a>
</nav>
```

```css
.article-nav {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 64px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border);
}
.article-nav a {
  color: var(--color-text);
  max-width: 45%;
}
.article-nav-label {
  font-size: 13px;
  color: var(--color-text-secondary);
}
.article-nav-title {
  display: block;
  font-weight: 600;
  margin-top: 4px;
}
```

**实现方式：** 两个选项

- **选项 1（简单）：** 手动在每篇文章底部写死链接。14 篇文章，工作量可控。
- **选项 2（自动）：** 用 JS 读取 `article_metadata.json`，根据日期排序自动计算上/下一篇，动态渲染。约 30 行 JS，一次写好全部文章自动生效。

→ 推荐选项 2，写一个 `article-nav.js` 自动处理。

**C. 文章底部：返回博客列表按钮**

在上/下篇导航下方加一个居中按钮：

```html
<div style="text-align: center; margin-top: 32px;">
  <a href="/blog_yc.html" class="btn btn-secondary">← 返回博客列表</a>
</div>
```

### 总结：文章页导航结构

```
[Navbar（全站导航，sticky）]

Blog / Medical AI                  ← 面包屑

# 文章标题
2026-01-22 · Career

正文内容...

────────────────────────────────
← 上一篇                  下一篇 →
  文章标题A               文章标题B

        [← 返回博客列表]

────── 留言区 ──────────────

[Footer]
```

---

## 2. 留言系统

### 需求
- 匿名留言为主（不强制登录）
- 可选登录（GitHub）
- 留言后自动发邮件通知站主
- GitHub Pages 兼容（无后端）

### 方案：Giscus + 匿名回退

**主方案：Giscus**
- 基于 GitHub Discussions
- 用户可用 GitHub 账号留言
- GitHub 自动发邮件通知到你的邮箱（repo owner 默认收到 Discussion 通知）
- 零后端、零费用
- 嵌入代码约 10 行

```html
<div class="comments-section">
  <h3>留言 / Comments</h3>
  <script src="https://giscus.app/client.js"
    data-repo="Nickcp39/yandacheng-site"
    data-repo-id="[从 giscus.app 获取]"
    data-category="Blog Comments"
    data-category-id="[从 giscus.app 获取]"
    data-mapping="pathname"
    data-strict="0"
    data-reactions-enabled="1"
    data-emit-metadata="0"
    data-input-position="top"
    data-theme="light"
    data-lang="zh-CN"
    crossorigin="anonymous"
    async>
  </script>
</div>
```

**配置步骤：**
1. 在 GitHub repo 开启 Discussions 功能（Settings → Features → Discussions ✓）
2. 创建一个 Discussion Category 叫 "Blog Comments"
3. 去 https://giscus.app 填写 repo 信息，生成嵌入代码
4. 粘贴到每篇文章底部

**匿名留言补充：Formspree 表单**

对于没有 GitHub 账号的访客，在 Giscus 下方加一个简单表单：

```html
<details class="anonymous-comment">
  <summary>没有 GitHub 账号？点此匿名留言</summary>
  <form action="https://formspree.io/f/[你的ID]" method="POST">
    <input type="text" name="name" placeholder="你的名字（可选）">
    <textarea name="message" placeholder="留言内容..." required></textarea>
    <input type="hidden" name="_subject" value="博客新留言">
    <input type="hidden" name="_next" value="https://yandacheng.com/blog_yc.html">
    <button type="submit" class="btn">发送</button>
  </form>
</details>
```

**Formspree 免费版：** 每月 50 次提交，够用。留言直接发到你邮箱。

```css
.anonymous-comment {
  margin-top: 24px;
  padding: 20px;
  background: var(--color-bg-alt);
  border-radius: var(--radius-md);
}
.anonymous-comment summary {
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text-secondary);
}
.anonymous-comment input,
.anonymous-comment textarea {
  width: 100%;
  padding: 10px 14px;
  margin-top: 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 15px;
}
.anonymous-comment textarea {
  height: 100px;
  resize: vertical;
}
.anonymous-comment button {
  margin-top: 10px;
}
```

### 邮件通知总结

| 来源 | 通知方式 |
|------|----------|
| Giscus（GitHub 登录留言） | GitHub 自动发邮件（repo Discussion 通知） |
| Formspree（匿名留言） | Formspree 直接转发到你邮箱 |

两条路都自动通知，你不需要手动检查。

---

## 3. 博客分类重组

### 当前分类（2大类 + 9子类，部分空）

```
Investment
  ├── Bitcoin (5 篇)
  ├── Real Estate (0 篇)        ← 空
  ├── Stock Market (2 篇，都是 BTC 交叉标签)
  └── Value Investing (3 篇)

Career
  ├── Tech Innovation (3 篇)
  ├── Industry News (0 篇)      ← 空
  ├── Workplace Insights (1 篇)
  ├── PhD Possibilities (1 篇，空文件)
  └── Medical AI (3 篇)
```

### 新分类（3大类 + 6子类）

```json
{
  "Tech": ["Medical AI", "AI Engineering"],
  "Investment": ["Bitcoin", "Value Investing"],
  "Career": ["PhD & Research", "Engineering Life"]
}
```

**文章归属重新映射：**

| 文章 | 新分类 |
|------|--------|
| 3 篇 Rad-Linter + LLM hospital | Tech → Medical AI |
| SGLang Agent ID Scanner | Tech → AI Engineering |
| 5 篇 BTC 相关 | Investment → Bitcoin |
| Buffett/Munger + Value Lessons | Investment → Value Investing |
| PhD Career Transition + PhD Possibilities | Career → PhD & Research |
| Staff Engineer | Career → Engineering Life |

**清理：**
- 删除空子类：Real Estate, Industry News
- Stock Market 标签取消（BTC 文章归 Bitcoin 即可）
- Workplace Insights 改名 Engineering Life（更广泛）
- Tech Innovation + Medical AI 拆分更清晰

### category_tree.json 更新

```json
{
  "Tech": ["Medical AI", "AI Engineering"],
  "Investment": ["Bitcoin", "Value Investing"],
  "Career": ["PhD & Research", "Engineering Life"]
}
```

### article_tags.json 更新

```json
{
  "20260103rad_linter_clinical_sglang_advantage.html": ["Medical AI"],
  "20260102rad_linter_clinical_qa.html": ["Medical AI"],
  "llm_hospital_rad_linter.html": ["Medical AI"],
  "sglang_llm_agent_id_scanner.html": ["AI Engineering"],
  "btc_regulation.html": ["Bitcoin"],
  "btc_repeat_4years.html": ["Bitcoin"],
  "btc_4year_high_no_joy.html": ["Bitcoin"],
  "btc_2026_prediction.html": ["Bitcoin", "Value Investing"],
  "20251230btc_yield_spread_crash.html": ["Bitcoin"],
  "buffett_munger_weekend_reflection.html": ["Value Investing"],
  "value_lessons.html": ["Value Investing"],
  "20260122phd_career_transition.html": ["PhD & Research"],
  "phd_possibilities.html": ["PhD & Research"],
  "staff_engineer.html": ["Engineering Life"]
}
```

---

## 4. 实施优先级

1. **面包屑 + 返回按钮** — 最快见效，每篇文章加几行 HTML
2. **分类重组** — 改两个 JSON 文件即可
3. **上/下篇导航 JS** — 写一次，全部文章自动生效
4. **Giscus 留言** — 开启 Discussions + 嵌入脚本
5. **Formspree 匿名表单** — 注册 Formspree + 嵌入表单

全部不需要后端，GitHub Pages 完全支持。

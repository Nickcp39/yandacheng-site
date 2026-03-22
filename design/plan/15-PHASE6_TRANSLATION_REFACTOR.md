# Phase 6 — 翻译系统重构

> 目标：降低维护成本，减少手动同步，保持 GitHub Pages 兼容

---

## 1. 当前问题

1. **i18n.js 单文件 2000+ 行**，中英文翻译数据和切换逻辑混在一起
2. **新增文章需要在 4 个地方手动更新：**
   - `article_metadata.json` — 标题、日期、摘要
   - `article_tags.json` — 标签
   - `i18n.js` — 中文翻译（标题、摘要、正文所有段落）
   - `render_blog_dual.js` — hardcoded `articleTitleKeyMap` 和 `articleSummaryKeyMap`
3. **render_blog_dual.js 中两个 hardcoded map** 每新增文章需手动添加映射
4. **部分文章缺少翻译 key**（phd_career_transition）

## 2. 重构方案

### 2.1 拆分翻译数据

**创建：**
- `locales/zh.json` — 所有中文翻译
- `locales/en.json` — 所有英文翻译（可选，当前英文是 HTML 默认值）

**格式（扁平 key-value）：**
```json
{
  "nav.home": "首页",
  "nav.about": "关于",
  "article.btc_4year.title": "比特币4年新高...",
  "article.btc_4year.summary": "..."
}
```

保持当前的扁平 key 格式，不做嵌套。原因：
- 与现有 `data-i18n="xxx.yyy.zzz"` 属性完全兼容
- 查找替换简单
- 不需要 nested object lookup 逻辑

### 2.2 重写 i18n.js

从 2000+ 行缩减为约 50 行核心逻辑：

```javascript
(function() {
  let translations = {};

  async function loadTranslations(lang) {
    if (lang === 'en') {
      // 英文是 HTML 默认值，不需要加载
      document.querySelectorAll('[data-i18n]').forEach(el => {
        if (el._originalText) el.innerHTML = el._originalText;
      });
      return;
    }
    if (!translations[lang]) {
      const res = await fetch(`locales/${lang}.json`);
      translations[lang] = await res.json();
    }
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!el._originalText) el._originalText = el.innerHTML;
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  }

  window.switchLanguage = function(lang) {
    localStorage.setItem('language', lang);
    loadTranslations(lang);
    // 更新语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  };

  window.attachLanguageButtonListeners = function() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });
  };

  // 初始化
  const saved = localStorage.getItem('language') || 'en';
  if (saved !== 'en') loadTranslations(saved);
})();
```

**可行性关键问题：`fetch()` 在 GitHub Pages 上加载 JSON**
- GitHub Pages 正确返回 `.json` 文件的 Content-Type
- `fetch('locales/zh.json')` 在 GitHub Pages 上完全正常
- JSON 文件大小：约 2000 个 key × 平均 50 字符 = ~100KB，gzip 后 ~20KB
- 首次加载多一次 HTTP 请求，但缓存后不再重复

### 2.3 去掉 render_blog_dual.js 中的 hardcoded map

当前的 `articleTitleKeyMap` 和 `articleSummaryKeyMap` 可以自动生成。

**方案：用文件名自动推导 key**

```javascript
function fileToKey(filename) {
  // "20260102rad_linter_clinical_qa.html" → "rad_linter_clinical_qa"
  // "btc_4year_high_no_joy.html" → "btc_4year_high_no_joy"
  return filename.replace(/\.html$/, '').replace(/^\d+/, '');
}

// 使用
const baseKey = fileToKey(a.file);
const titleKey = `article.${baseKey}.title`;
const summaryKey = `article.${baseKey}.summary`;
```

**问题：** 当前 key 不完全匹配这个规则。例如：
- `btc_4year_high_no_joy.html` → key 是 `article.btc_4year.title`（缩写了）
- `buffett_munger_weekend_reflection.html` → key 是 `article.buffett.title`

**两个解决路径：**

**路径 A：在 article_metadata.json 中加 i18n_key 字段**
```json
{
  "btc_4year_high_no_joy.html": {
    "title": "...",
    "date": "...",
    "summary": "...",
    "i18n_key": "btc_4year"
  }
}
```
- 优点：显式映射，不依赖命名规则
- 改动：metadata 加字段，render 脚本读取
- 推荐 ✅

**路径 B：统一 key 命名规则，全部重命名**
- 工作量大，需要同步更新 i18n.js / zh.json 中所有 key
- 不推荐

→ 选择路径 A

### 2.4 英文翻译 (locales/en.json) 是否需要？

当前英文是 HTML 中的默认值。不需要 en.json。

但如果想支持"三语"或在 JSON 中集中管理所有文案，可以创建 en.json。

**结论：Phase 6 不创建 en.json，保持英文为 HTML 默认值。**

## 3. 迁移步骤

1. 从 `i18n.js` 的 `translations.zh` 对象导出为 `locales/zh.json`
2. 重写 `i18n.js` 为加载器（~50 行）
3. 在 `article_metadata.json` 中给每篇文章加 `i18n_key` 字段
4. 更新 `render_blog_dual.js`：删除两个 hardcoded map，改为从 metadata 的 `i18n_key` 读取
5. 逐页验证中英文切换

## 4. 迁移脚本

可以写一个一次性 Node.js 脚本自动从 i18n.js 提取 zh 翻译数据到 JSON：

```javascript
// scripts/migrate_i18n.js (一次性使用)
const fs = require('fs');
const content = fs.readFileSync('scripts/i18n.js', 'utf-8');
// 用正则或 eval 提取 translations.zh 对象
// 写入 locales/zh.json
```

但由于 i18n.js 是标准 JS 对象，手动复制粘贴到 JSON 也只需 5 分钟。两种方式都可以。

## 5. 风险

- **最大风险：** 迁移过程中遗漏翻译 key，导致中文模式下部分内容显示英文
- **缓解：** 写验证脚本（Phase 7），对比 HTML 中所有 `data-i18n` 属性和 JSON 中的 key
- **回滚：** 保留旧 i18n.js 备份，出问题可立即切回

## 6. 不做的事

- ❌ 不做自动翻译（Google Translate API / LLM API）
- ❌ 不做嵌套 JSON 结构
- ❌ 不做按页面拆分翻译文件（一个 zh.json 足够）
- ❌ 不做 SSR/预渲染翻译

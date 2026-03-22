# Phase 7 — 自动化工具链

> 目标：减少新增文章时的手动操作，增加一致性校验

---

## 1. 当前流程 vs 目标流程

### 当前（5 步手动）
```
1. 创建 posts/xxx.html（手写或复制模板）
2. 编辑 config/article_metadata.json（加标题/日期/摘要）
3. 编辑 config/article_tags.json（加标签）
4. 编辑 scripts/i18n.js → locales/zh.json（加中文翻译）
5. 编辑 scripts/render_blog_dual.js（加 key map）← Phase 6 后不再需要
```

### 目标（3 步）
```
1. node scripts/new-post.js xxx → 自动生成模板 + 更新 JSON
2. 写内容 + 写翻译
3. node scripts/validate.js → 校验一致性
```

## 2. 工具设计

### 2.1 new-post.js（升级现有 add_article.js）

```
用法：node scripts/new-post.js <slug> <title> <summary> [--tags tag1,tag2]
示例：node scripts/new-post.js my_new_article "My Title" "Summary here" --tags Bitcoin,Tech
```

**自动执行：**
1. 生成 `posts/YYYYMMDDslug.html`，包含标准模板：
   - DOCTYPE, head（引用 style.css + style_blog.css）
   - navbar 加载脚本
   - i18n 脚本加载
   - `.article-content` wrapper
   - 文章标题 h1 + meta（日期）
   - 占位正文
   - footer
2. 更新 `config/article_metadata.json`：添加条目（带 `i18n_key`）
3. 更新 `config/article_tags.json`：添加标签
4. 在 `locales/zh.json` 中生成翻译骨架：
   ```json
   "article.my_new_article.title": "[待翻译] My Title",
   "article.my_new_article.summary": "[待翻译] Summary here"
   ```

**依赖：** 仅 Node.js 内置模块（fs, path）。零外部依赖。

### 2.2 validate.js（新增）

```
用法：node scripts/validate.js
```

**检查项：**

| # | 检查 | 严重度 |
|---|------|--------|
| 1 | metadata 中每个文件在 posts/ 目录存在 | ERROR |
| 2 | metadata 中每个文件在 tags JSON 中存在 | WARN |
| 3 | metadata 中每个文件有 i18n_key | WARN |
| 4 | 每个 i18n_key 在 zh.json 中有 .title 和 .summary | WARN |
| 5 | 扫描所有 HTML 的 data-i18n 属性，检查 zh.json 中是否存在 | WARN |
| 6 | metadata 日期格式为 YYYY-MM-DD | ERROR |
| 7 | 文件名日期前缀与 metadata 日期一致（如有前缀） | WARN |

**输出示例：**
```
✓ 14 articles in metadata
✓ All article files exist
⚠ phd_possibilities.html missing from article_tags.json
⚠ value_lessons.html missing from article_tags.json
⚠ Missing zh translation: article.phd_career_transition.section9.para4
✓ All dates valid
───
2 errors, 3 warnings
```

**依赖：** 仅 Node.js 内置模块。

### 2.3 package.json

```json
{
  "name": "yandacheng-site",
  "private": true,
  "scripts": {
    "new-post": "node scripts/new-post.js",
    "validate": "node scripts/validate.js"
  }
}
```

极简。不引入任何 devDependencies。package.json 只是为了提供 `npm run` 快捷命令。

## 3. 不做的事

- ❌ 不做构建系统（Webpack, Vite, 11ty）
- ❌ 不做 CI/CD pipeline（GitHub Actions）
- ❌ 不做自动部署脚本（GitHub Pages 本身就是 push = deploy）
- ❌ 不做 linter（ESLint, Stylelint）— 代码量不大，不值得
- ❌ 不做 markdown → HTML 转换（文章直接写 HTML，保持当前模式）
- ❌ 不引入任何 npm 包依赖

## 4. 可行性

- 全部基于 Node.js 内置模块，用户已有 Node.js 环境（现有 add_article.js 已在使用）
- 脚本总计约 200 行 JS
- GitHub Pages 不受影响（脚本不参与网站运行，只是开发辅助）

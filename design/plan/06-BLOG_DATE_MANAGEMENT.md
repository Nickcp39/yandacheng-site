# 博客文章日期管理系统设计文档

## 📅 创建时间
2025-01-20

## 🎯 目的

本文档说明博客文章日期管理的机制，以及如何实现自动日期管理，确保新文章自动使用当天日期，避免手动修改导致的排序错误。

---

## 📊 当前日期管理机制

### 1. 负责排序的核心文件

#### **`config/article_metadata.json`** - 数据源文件
- **作用**：存储所有文章的元数据，包括标题、日期、摘要
- **日期格式**：`"YYYY-MM-DD"`（ISO 8601格式）
- **重要性**：这是**唯一**控制博客排序的数据源

**示例**：
```json
{
  "sglang_llm_agent_id_scanner.html": {
    "title": "Building LLM Agent ID Scanner with SGLang: A Deep Dive",
    "date": "2025-12-28",
    "summary": "A technical deep dive..."
  }
}
```

#### **`scripts/render_blog_dual.js`** - 排序和渲染脚本
- **作用**：读取 `article_metadata.json`，按日期排序并渲染博客列表
- **排序逻辑**：第112行
  ```javascript
  timeline.sort((a, b) => new Date(b.date) - new Date(a.date)) // 倒序
  ```
- **排序规则**：按日期倒序排列（最新的文章在前）

### 2. 日期显示位置

文章日期需要在以下位置保持一致：

1. **`config/article_metadata.json`** - 控制排序（最重要）
2. **文章HTML文件** - 侧边栏日期显示
   - 位置：`<aside>` 中的 `<p><strong>Date</strong><br>...</p>`
   - 格式：`"December 28th, 2025"` 或 `"2025年12月28日"`
3. **文章HTML文件** - 页脚日期（可选）
   - 位置：`<div class="footer">` 中的 `Last updated ...`
4. **文章HTML文件** - 其他日期引用（如 trace_id 等）

---

## ⚠️ 当前问题

### 问题1：手动修改容易遗漏
- 添加新文章时，需要手动在多个地方修改日期
- 容易遗漏某些位置，导致日期不一致
- 排序可能因为日期格式错误或不一致而出现问题

### 问题2：日期格式不统一
- `article_metadata.json` 使用：`"2025-12-28"`
- HTML 文件使用：`"December 28th, 2025"`
- 需要手动转换格式

### 问题3：排序依赖单一数据源
- 排序完全依赖 `article_metadata.json` 中的 `date` 字段
- 如果该字段错误或缺失，排序就会出错
- 其他位置的日期只是显示，不影响排序

---

## 🔧 解决方案：自动日期管理

### 方案1：创建文章时自动添加日期（推荐）

#### 实现方式：创建辅助脚本 `scripts/add_article.js`

**功能**：
1. 自动获取当前日期（YYYY-MM-DD格式）
2. 在 `article_metadata.json` 中自动添加新文章条目
3. 生成文章HTML模板，自动填充日期
4. 确保所有位置的日期一致

**使用方式**：
```bash
node scripts/add_article.js "new_article.html" "Article Title" "Article Summary"
```

**脚本逻辑**：
```javascript
// 1. 获取当前日期
const today = new Date();
const dateISO = today.toISOString().split('T')[0]; // "2025-12-28"
const dateFormatted = formatDateForHTML(today); // "December 28th, 2025"

// 2. 读取 article_metadata.json
const metadata = JSON.parse(fs.readFileSync('config/article_metadata.json'));

// 3. 添加新文章条目
metadata['new_article.html'] = {
  "title": "Article Title",
  "date": dateISO,  // 自动使用当天日期
  "summary": "Article Summary"
};

// 4. 保存更新后的 metadata
fs.writeFileSync('config/article_metadata.json', JSON.stringify(metadata, null, 2));

// 5. 生成HTML模板，自动填充日期
const htmlTemplate = generateArticleTemplate({
  title: "Article Title",
  date: dateFormatted,
  dateISO: dateISO
});
```

### 方案2：使用Git Hooks自动检查

#### 实现方式：`.git/hooks/pre-commit`

**功能**：
- 在提交前检查 `article_metadata.json` 中的日期格式
- 检查是否有新文章缺少日期
- 如果有问题，阻止提交并提示

### 方案3：日期验证脚本

#### 实现方式：`scripts/validate_dates.js`

**功能**：
- 验证所有文章的日期格式是否正确
- 检查日期是否在合理范围内（不能是未来日期，除非特殊说明）
- 检查是否有重复日期导致排序问题

---

## 📝 新文章添加流程（推荐）

### 步骤1：使用辅助脚本创建文章

```bash
# 运行脚本，自动获取当天日期
node scripts/add_article.js "my_new_article.html" "My Article Title" "Article summary here"
```

### 步骤2：脚本自动完成以下操作

1. ✅ 在 `config/article_metadata.json` 中添加条目，日期自动设为今天
2. ✅ 创建 `posts/my_new_article.html` 模板，日期自动填充
3. ✅ 在 `config/article_tags.json` 中添加空标签数组（需要手动填写）
4. ✅ 生成文章HTML模板，包含：
   - 正确的日期格式（侧边栏）
   - 正确的日期格式（页脚，如果需要）
   - 所有必要的i18n引用

### 步骤3：手动完成

1. 填写文章内容
2. 在 `config/article_tags.json` 中添加标签
3. 在 `scripts/i18n.js` 中添加翻译键值对（如果需要翻译）

---

## 🌐 翻译更新流程（重要）

### 📍 翻译文件位置

**核心文件**：`scripts/i18n.js`

这个文件包含所有页面的中英文翻译，采用键值对结构：
- `zh` 对象：中文翻译
- `en` 对象：英文翻译

### 🔑 翻译键命名规范

对于博客文章，翻译键的命名格式为：
```
article.{文章文件名（不含.html）}.{元素路径}
```

**示例**：
- 文章文件：`posts/sglang_llm_agent_id_scanner.html`
- 翻译键前缀：`article.sglang_llm_agent`
- 标题翻译键：`article.sglang_llm_agent.title`
- 副标题翻译键：`article.sglang_llm_agent.subtitle`
- 章节标题：`article.sglang_llm_agent.section1.title`
- 段落内容：`article.sglang_llm_agent.section1.para1`
- 列表项：`article.sglang_llm_agent.section1.li1`

### 📝 添加新文章翻译的步骤

#### 步骤1：在HTML文件中添加 `data-i18n` 属性

对于需要翻译的元素，添加 `data-i18n` 属性：

```html
<!-- 标题 -->
<h1>
  <span data-i18n="article.my_article.title">English Title</span>
  <br>
  <span data-i18n="article.my_article.subtitle">English Subtitle</span>
</h1>

<!-- 段落 -->
<p data-i18n="article.my_article.intro">English paragraph text...</p>

<!-- 章节标题 -->
<h2 data-i18n="article.my_article.section1.title">Section Title</h2>

<!-- 列表项 -->
<ul>
  <li data-i18n="article.my_article.section1.li1">List item 1</li>
  <li data-i18n="article.my_article.section1.li2">List item 2</li>
</ul>
```

#### 步骤2：在 `scripts/i18n.js` 中添加翻译

**位置1：中文翻译部分（`zh` 对象）**

找到 `// 文章翻译 - {文章名}.html` 注释，在对应位置添加：

```javascript
const translations = {
  zh: {
    // ... 其他翻译 ...
    
    // 文章翻译 - my_article.html (完整内容)
    'article.my_article.title': '我的文章标题',
    'article.my_article.subtitle': '我的文章副标题',
    'article.my_article.intro': '这是文章的介绍段落...',
    'article.my_article.section1.title': '第一章：介绍',
    'article.my_article.section1.para1': '这是第一段的正文内容...',
    'article.my_article.section1.li1': '列表项1的内容',
    'article.my_article.section1.li2': '列表项2的内容',
    // ... 更多翻译键 ...
    
    'article.my_article.summary': '文章摘要（用于博客列表页）',
  },
```

**位置2：英文翻译部分（`en` 对象）**

在 `en` 对象中的对应位置添加英文翻译：

```javascript
  en: {
    // ... 其他翻译 ...
    
    // Article translations - my_article.html (full content)
    'article.my_article.title': 'My Article Title',
    'article.my_article.subtitle': 'My Article Subtitle',
    'article.my_article.intro': 'This is the introduction paragraph...',
    'article.my_article.section1.title': 'Section 1: Introduction',
    'article.my_article.section1.para1': 'This is the first paragraph content...',
    'article.my_article.section1.li1': 'List item 1 content',
    'article.my_article.section1.li2': 'List item 2 content',
    // ... 更多翻译键 ...
    
    'article.my_article.summary': 'Article summary (for blog list page)',
  }
}
```

### ✅ 翻译检查清单

添加翻译时，确保：

- [ ] **HTML文件中的所有需要翻译的元素都添加了 `data-i18n` 属性**
  - 标题（h1, h2, h3）
  - 段落（p）
  - 列表项（li）
  - 按钮文本
  - 其他需要翻译的文本

- [ ] **`scripts/i18n.js` 中同时添加了中文和英文翻译**
  - 中文翻译在 `zh` 对象中
  - 英文翻译在 `en` 对象中
  - 翻译键名称完全一致

- [ ] **翻译键命名遵循规范**
  - 格式：`article.{文件名}.{元素路径}`
  - 文件名不包含 `.html` 后缀
  - 使用小写字母和下划线

- [ ] **所有翻译键都有对应的值**
  - 不能有空的翻译值
  - 中英文翻译都要完整

- [ ] **特殊字符正确转义**
  - HTML标签使用 `&lt;` 和 `&gt;`
  - 引号正确转义
  - 换行符使用 `<br>` 或保留在翻译中

### 🎯 翻译最佳实践

#### 1. 翻译键的组织结构

按照文章结构组织翻译键，使用清晰的层级：

```
article.{文件名}
  ├── title          # 文章标题
  ├── subtitle       # 副标题
  ├── intro          # 介绍段落
  ├── summary        # 摘要（用于列表页）
  ├── section1       # 第一章节
  │   ├── title      # 章节标题
  │   ├── para1      # 第一段
  │   ├── para2      # 第二段
  │   ├── li1        # 列表项1
  │   └── li2        # 列表项2
  ├── section2       # 第二章节
  └── ...
```

#### 2. 保持翻译一致性

- 使用相同的术语翻译（如"SGLang"、"LLM"等专有名词）
- 保持语气和风格一致
- 技术术语统一翻译

#### 3. 处理HTML标签

如果翻译中包含HTML标签，确保在翻译中正确保留：

```javascript
// 正确
'article.my_article.intro': '这是<strong>重要</strong>的内容'

// 错误（标签被转义）
'article.my_article.intro': '这是&lt;strong&gt;重要&lt;/strong&gt;的内容'
```

#### 4. 处理特殊格式

- **加粗文本**：使用 `<strong>` 标签
- **代码**：使用 `<code>` 标签
- **链接**：保留完整的 `<a>` 标签
- **换行**：使用 `<br>` 或保留段落结构

### 🔍 常见问题排查

#### 问题1：翻译不显示

**可能原因**：
- `data-i18n` 属性拼写错误
- 翻译键在 `i18n.js` 中不存在
- JavaScript 加载顺序问题

**解决方法**：
1. 检查浏览器控制台是否有错误
2. 确认翻译键名称完全匹配
3. 确认 `i18n.js` 已正确加载

#### 问题2：翻译显示为键名

**可能原因**：
- 翻译键在 `i18n.js` 中未定义
- 翻译键拼写错误

**解决方法**：
1. 在 `i18n.js` 中搜索翻译键
2. 确认中英文翻译都已添加
3. 检查键名是否完全匹配（大小写敏感）

#### 问题3：部分内容未翻译

**可能原因**：
- 某些元素忘记添加 `data-i18n` 属性
- 翻译键未在 `i18n.js` 中定义

**解决方法**：
1. 检查HTML中所有需要翻译的元素
2. 确认每个元素都有对应的翻译键
3. 使用浏览器开发者工具检查元素

### 📋 完整翻译工作流示例

假设要为新文章 `my_new_article.html` 添加翻译：

1. **在HTML文件中标记需要翻译的元素**
   ```html
   <h1 data-i18n="article.my_new_article.title">My New Article</h1>
   <p data-i18n="article.my_new_article.intro">Introduction text...</p>
   ```

2. **在 `scripts/i18n.js` 的 `zh` 对象中添加中文翻译**
   ```javascript
   'article.my_new_article.title': '我的新文章',
   'article.my_new_article.intro': '介绍文本...',
   ```

3. **在 `scripts/i18n.js` 的 `en` 对象中添加英文翻译**
   ```javascript
   'article.my_new_article.title': 'My New Article',
   'article.my_new_article.intro': 'Introduction text...',
   ```

4. **测试翻译**
   - 刷新页面
   - 切换语言按钮
   - 确认所有翻译正确显示

### 🚨 重要提醒

1. **每次添加新文章时，必须同时更新翻译**
   - 不要只添加英文或只添加中文
   - 确保所有需要翻译的内容都有对应的翻译键

2. **翻译键命名要一致**
   - 使用统一的命名规范
   - 保持与文章结构对应

3. **定期检查翻译完整性**
   - 确保没有遗漏的翻译
   - 确保翻译质量

---

## 🔍 日期格式规范

### 1. `config/article_metadata.json`
- **格式**：`"YYYY-MM-DD"`
- **示例**：`"2025-12-28"`
- **要求**：必须使用ISO 8601格式，确保排序正确

### 2. HTML文件侧边栏
- **英文格式**：`"December 28th, 2025"`
- **中文格式**：`"2025年12月28日"`
- **位置**：`<aside>` 中的 `<p><strong>Date</strong><br>...</p>`

### 3. HTML文件页脚
- **格式**：`"Last updated December 2025"`
- **位置**：`<div class="footer">`

### 4. 其他日期引用
- 根据上下文使用合适的格式
- 确保与主日期一致

---

## 🛠️ 实现建议

### 优先级1：创建辅助脚本（高优先级）

**文件**：`scripts/add_article.js`

**功能清单**：
- [ ] 自动获取当前日期（YYYY-MM-DD）
- [ ] 读取并更新 `article_metadata.json`
- [ ] 生成文章HTML模板
- [ ] 自动填充日期到所有必要位置
- [ ] 验证日期格式
- [ ] 提供使用说明

### 优先级2：日期验证脚本（中优先级）

**文件**：`scripts/validate_dates.js`

**功能清单**：
- [ ] 验证所有文章的日期格式
- [ ] 检查日期是否在合理范围内
- [ ] 检查是否有缺失日期
- [ ] 检查排序是否正确

### 优先级3：Git Hook（低优先级）

**文件**：`.git/hooks/pre-commit`

**功能清单**：
- [ ] 提交前自动运行日期验证
- [ ] 如果有问题，阻止提交
- [ ] 提供修复建议

---

## 📋 检查清单：添加新文章时

### 必须完成的步骤

- [ ] **`config/article_metadata.json`** - 添加条目，日期设为今天（YYYY-MM-DD格式）
- [ ] **`posts/xxx.html`** - 创建文章文件，侧边栏日期设为今天
- [ ] **`config/article_tags.json`** - 添加标签
- [ ] **`scripts/i18n.js`** - 添加翻译键值对（**必须完成，详见"翻译更新流程"章节**）
  - [ ] 在HTML文件中为所有需要翻译的元素添加 `data-i18n` 属性
  - [ ] 在 `scripts/i18n.js` 的 `zh` 对象中添加中文翻译
  - [ ] 在 `scripts/i18n.js` 的 `en` 对象中添加英文翻译
  - [ ] 测试翻译切换功能，确保所有翻译正确显示

### 可选步骤

- [ ] 更新页脚日期
- [ ] 更新其他日期引用（如 trace_id）

---

## 🎯 最佳实践

### 1. 始终使用辅助脚本
- 不要手动创建文章条目
- 使用脚本确保日期一致性

### 2. 日期格式严格遵循规范
- `article_metadata.json` 必须使用 `YYYY-MM-DD` 格式
- HTML文件使用人类可读格式

### 3. 定期验证日期
- 在发布前运行验证脚本
- 确保所有日期正确且一致

### 4. 版本控制
- 提交前检查日期是否正确
- 使用Git Hook自动验证

### 5. 翻译完整性
- 每次添加新文章时，必须同时添加中英文翻译
- 确保所有需要翻译的元素都添加了 `data-i18n` 属性
- 测试语言切换功能，确保翻译正确显示
- 遵循翻译键命名规范，保持一致性

---

## 📚 相关文件

### 核心文件
- `config/article_metadata.json` - 文章元数据（控制排序）
- `scripts/render_blog_dual.js` - 排序和渲染逻辑
- `config/article_tags.json` - 文章标签
- `config/category_tree.json` - 分类树

### 文章文件
- `posts/*.html` - 所有文章文件

### 翻译文件
- `scripts/i18n.js` - 翻译键值对（**重要：每次添加新文章必须更新**）
  - 包含所有页面的中英文翻译
  - 使用 `data-i18n` 属性在HTML中引用
  - 详细使用说明见"翻译更新流程"章节

---

## 🔄 未来改进方向

1. **自动化程度提升**
   - 创建文章时自动生成所有必要文件
   - 自动添加翻译键值对模板
   - 自动生成文章摘要（可选）

2. **日期管理增强**
   - 支持预定发布日期
   - 支持日期范围（系列文章）
   - 自动更新"最后更新"日期

3. **验证和检查**
   - 集成到CI/CD流程
   - 自动检查日期一致性
   - 自动修复常见日期格式错误

---

## 📝 总结

**关键要点**：
1. **`config/article_metadata.json`** 是排序的唯一数据源
2. 日期格式必须严格遵循：`YYYY-MM-DD`
3. 使用辅助脚本可以避免手动错误
4. 所有位置的日期必须保持一致

**下一步行动**：
1. 创建 `scripts/add_article.js` 辅助脚本
2. 创建 `scripts/validate_dates.js` 验证脚本
3. 更新文档，说明新文章添加流程

---

## 👤 文档维护者

AI Assistant (Auto)


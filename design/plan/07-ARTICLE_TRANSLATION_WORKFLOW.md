# 新文章翻译工作流程

## 📋 概述

为新文章添加完整的中英文翻译支持需要以下步骤：

1. **HTML中添加 `data-i18n` 属性**
2. **在 `i18n.js` 中添加翻译内容**
3. **在 `render_blog_dual.js` 中添加翻译键映射**（用于博客列表页）
4. **在配置文件中添加元数据和标签**

## 🔄 完整流程

### 步骤 1: 在 HTML 中添加 `data-i18n` 属性

为每个需要翻译的元素添加 `data-i18n` 属性，命名规范：

```
article.{article_id}.{section}.{element}
```

**示例：**

```html
<!-- 标题 -->
<h1>
  <span data-i18n="article.rad_linter_sglang_advantage.title">
    Rad-Linter：用 SGLang 搭一个"签发前"的跨模态质控层（可插拔）
  </span>
  <br>
  <span style="font-weight: normal; font-size: 0.9em;" 
        data-i18n="article.rad_linter_sglang_advantage.subtitle">
    Rad-Linter: Building a Pre-Sign-Off Cross-Modal Quality Control Layer with SGLang
  </span>
</h1>

<!-- 段落 -->
<p data-i18n="article.rad_linter_sglang_advantage.intro">
  最近我在医院场景里落地了一个系统：Radiology Report Linter（Rad-Linter）...
</p>

<!-- 章节标题 -->
<h2 data-i18n="article.rad_linter_sglang_advantage.section1.title">
  🎯 为什么选择SGLang？核心原因
</h2>

<!-- 子章节 -->
<h3 data-i18n="article.rad_linter_sglang_advantage.section1.subsection1.title">
  1. 完全本地化：不涉及云端API，数据不出院
</h3>

<!-- 列表项 -->
<ul>
  <li data-i18n="article.rad_linter_sglang_advantage.section1.subsection1.li1">
    <strong>零云端依赖</strong>：不需要调用任何外部API...
  </li>
  <li data-i18n="article.rad_linter_sglang_advantage.section1.subsection1.li2">
    <strong>训练也可本地化</strong>：如果需要fine-tuning...
  </li>
</ul>
```

**注意事项：**
- 翻译键名要有层次结构，便于管理
- 保持命名一致性（section1, section2, subsection1 等）
- HTML 中的默认文本应该是中文（或主要语言）

### 步骤 2: 在 `i18n.js` 中添加翻译内容

在 `scripts/i18n.js` 的 `translations` 对象中添加翻译键值对。

**中文部分（zh）：**

```javascript
const translations = {
  zh: {
    // ... 其他翻译
    
    // 文章标题和副标题
    'article.rad_linter_sglang_advantage.title': 'Rad-Linter：用 SGLang 搭一个"签发前"的跨模态质控层（可插拔）',
    'article.rad_linter_sglang_advantage.subtitle': 'Rad-Linter: Building a Pre-Sign-Off Cross-Modal Quality Control Layer with SGLang',
    
    // 文章摘要（用于博客列表页）
    'article.rad_linter_sglang_advantage.summary': '这套系统之所以能"真落地"，关键是底层用了SGLang做serving/judge runtime...',
    
    // 文章内容
    'article.rad_linter_sglang_advantage.intro': '最近我在医院场景里落地了一个系统：Radiology Report Linter（Rad-Linter）...',
    
    // 章节翻译
    'article.rad_linter_sglang_advantage.section1.title': '🎯 为什么选择SGLang？核心原因',
    'article.rad_linter_sglang_advantage.section1.subsection1.title': '1. 完全本地化：不涉及云端API，数据不出院',
    'article.rad_linter_sglang_advantage.section1.subsection1.li1': '<strong>零云端依赖</strong>：不需要调用任何外部API，不涉及数据传输，天然满足HIPAA/ePHI合规要求',
    'article.rad_linter_sglang_advantage.section1.subsection1.li2': '<strong>训练也可本地化</strong>：如果需要fine-tuning，SGLang支持本地训练，整个pipeline都可以在医院内网完成',
    
    // ... 更多翻译
  },
  
  en: {
    // ... 其他翻译
    
    // 英文翻译（对应中文）
    'article.rad_linter_sglang_advantage.title': 'Rad-Linter: Building a Pre-Sign-Off Cross-Modal Quality Control Layer with SGLang',
    'article.rad_linter_sglang_advantage.subtitle': 'Rad-Linter：用 SGLang 搭一个"签发前"的跨模态质控层（可插拔）',
    'article.rad_linter_sglang_advantage.summary': 'The key reason this system can truly be deployed is that it uses SGLang as the serving/judge runtime...',
    'article.rad_linter_sglang_advantage.intro': 'Recently, I deployed a system in a hospital setting: Radiology Report Linter (Rad-Linter)...',
    'article.rad_linter_sglang_advantage.section1.title': '🎯 Why Choose SGLang? Core Reasons',
    'article.rad_linter_sglang_advantage.section1.subsection1.title': '1. Complete Localization: No Cloud API, Data Stays In-House',
    'article.rad_linter_sglang_advantage.section1.subsection1.li1': '<strong>Zero Cloud Dependencies</strong>: No need to call any external APIs, no data transmission, naturally meets HIPAA/ePHI compliance requirements',
    'article.rad_linter_sglang_advantage.section1.subsection1.li2': '<strong>Training Can Also Be Localized</strong>: If fine-tuning is needed, SGLang supports local training, the entire pipeline can be completed within the hospital intranet',
    
    // ... 更多翻译
  }
};
```

**注意事项：**
- 中文和英文翻译要一一对应
- 保持 HTML 标签（如 `<strong>`）在翻译中
- 翻译要自然、准确

### 步骤 3: 在 `render_blog_dual.js` 中添加翻译键映射

在 `scripts/render_blog_dual.js` 中添加文章标题和摘要的翻译键映射，用于博客列表页显示。

```javascript
// 文件名到文章标题翻译键的映射
const articleTitleKeyMap = {
  // ... 其他文章
  '20260103rad_linter_clinical_sglang_advantage.html': 'article.rad_linter_sglang_advantage.title'
};

// 文件名到文章摘要翻译键的映射
const articleSummaryKeyMap = {
  // ... 其他文章
  '20260103rad_linter_clinical_sglang_advantage.html': 'article.rad_linter_sglang_advantage.summary'
};
```

### 步骤 4: 在配置文件中添加元数据和标签

#### 4.1 在 `config/article_metadata.json` 中添加元数据

```json
{
  "20260103rad_linter_clinical_sglang_advantage.html": {
    "title": "Rad-Linter：用 SGLang 搭一个\"签发前\"的跨模态质控层（可插拔）",
    "date": "2026-01-03",
    "summary": "这套系统之所以能\"真落地\"，关键是底层用了SGLang做serving/judge runtime。SGLang不涉及云端API的问题，训练也都可以在本地做，而且适配大量的不同的GPU/CPU，Windows/Mac/Linux系统也都很容易适配，所以对大部分的医疗系统场景都容易嵌入。"
  }
}
```

#### 4.2 在 `config/article_tags.json` 中添加标签

```json
{
  "20260103rad_linter_clinical_sglang_advantage.html": ["Tech Innovation", "Medical AI"]
}
```

## 📝 翻译键命名规范

### 基本结构

```
article.{article_id}.{section}.{element}
```

### 命名示例

- `article.rad_linter_sglang_advantage.title` - 文章标题
- `article.rad_linter_sglang_advantage.subtitle` - 文章副标题
- `article.rad_linter_sglang_advantage.summary` - 文章摘要（用于列表页）
- `article.rad_linter_sglang_advantage.intro` - 文章介绍段落
- `article.rad_linter_sglang_advantage.section1.title` - 第1章节标题
- `article.rad_linter_sglang_advantage.section1.para1` - 第1章节第1段
- `article.rad_linter_sglang_advantage.section1.subsection1.title` - 第1章节第1子章节标题
- `article.rad_linter_sglang_advantage.section1.subsection1.li1` - 第1章节第1子章节第1列表项
- `article.rad_linter_sglang_advantage.section1.highlight.title` - 第1章节高亮框标题
- `article.rad_linter_sglang_advantage.section1.table.header1` - 第1章节表格第1列标题

### 常用元素类型

- `title` - 标题
- `subtitle` - 副标题
- `summary` - 摘要
- `intro` - 介绍
- `para1`, `para2`, ... - 段落
- `li1`, `li2`, ... - 列表项
- `header1`, `header2`, ... - 表格列标题
- `row1.col1`, `row1.col2`, ... - 表格单元格

## ⚠️ 常见问题和注意事项

### 1. HTML 标签处理

翻译文本中如果包含 HTML 标签（如 `<strong>`, `<a>`），需要保留：

```javascript
'article.example.para1': '这是<strong>重要</strong>的内容，请查看<a href="link.html">链接</a>。'
```

### 2. 特殊字符转义

JSON 中的引号需要转义：

```javascript
'article.example.para1': '这是"重要"的内容。'  // 正确
'article.example.para1': "这是\"重要\"的内容。"  // 也正确
```

### 3. 翻译键的唯一性

确保每个翻译键在整个 `i18n.js` 文件中是唯一的。

### 4. 默认文本

HTML 中的默认文本应该是主要语言（通常是中文），翻译系统会在切换语言时替换它。

### 5. 翻译完整性

确保所有 `data-i18n` 属性都有对应的翻译键值对，否则切换语言时该元素不会改变。

## 🚀 快速检查清单

发布新文章前，确保完成以下所有步骤：

- [ ] HTML 中所有需要翻译的元素都添加了 `data-i18n` 属性
- [ ] `i18n.js` 中 `zh` 对象包含了所有中文翻译
- [ ] `i18n.js` 中 `en` 对象包含了所有英文翻译
- [ ] `render_blog_dual.js` 中添加了标题和摘要的翻译键映射
- [ ] `config/article_metadata.json` 中添加了文章元数据
- [ ] `config/article_tags.json` 中添加了文章标签
- [ ] 测试了语言切换功能
- [ ] 检查了博客列表页是否正确显示

## 💡 简化建议

由于完整翻译工作量较大，可以考虑：

1. **分阶段翻译**：先翻译标题、摘要和关键章节，其他内容后续补充
2. **使用模板**：创建文章模板，预定义常用的翻译键结构
3. **自动化工具**：考虑编写脚本自动生成翻译键结构（但翻译内容仍需人工）

## 📚 参考示例

完整翻译示例请参考：
- `posts/20260102rad_linter_clinical_qa.html` - 已完整翻译的文章
- `scripts/i18n.js` - 查看 `article.rad_linter_clinical_qa.*` 相关翻译


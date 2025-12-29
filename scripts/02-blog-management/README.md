# 博客管理脚本

## 📁 目录说明

本目录包含博客文章管理的辅助脚本。

## 📝 脚本列表

### 1. `add_article.js` - 自动添加新文章

**功能**：
- 自动获取当天日期（YYYY-MM-DD格式）
- 在 `config/article_metadata.json` 中自动添加新文章条目
- 在 `config/article_tags.json` 中添加标签（可选）
- 生成文章HTML模板，自动填充日期

**使用方法**：
```bash
node scripts/02-blog-management/add_article.js <filename> <title> <summary> [tags...]
```

**示例**：
```bash
node scripts/02-blog-management/add_article.js "my_article.html" "My Article Title" "Article summary" "Bitcoin" "Investment"
```

**输出**：
- 自动更新 `config/article_metadata.json`
- 自动更新 `config/article_tags.json`（如果提供了标签）
- 创建 `posts/my_article.html` 模板文件
- 所有日期自动设置为当天

### 2. `validate_dates.js` - 验证文章日期

**功能**：
- 验证所有文章的日期格式是否正确（YYYY-MM-DD）
- 检查日期是否在合理范围内
- 检查是否有重复日期
- 检查排序是否正确

**使用方法**：
```bash
node scripts/02-blog-management/validate_dates.js
```

**输出**：
- 显示所有错误和警告
- 显示日期统计信息
- 如果有错误，退出码为1

## 📋 使用流程

### 添加新文章

1. **运行添加脚本**：
   ```bash
   node scripts/02-blog-management/add_article.js "new_article.html" "Article Title" "Summary" "Tag1" "Tag2"
   ```

2. **编辑文章内容**：
   - 打开 `posts/new_article.html`
   - 填写文章内容

3. **添加翻译**（如果需要）：
   - 在 `scripts/i18n.js` 中添加翻译键值对
   - 在 `scripts/render_blog_dual.js` 中添加标题翻译映射

4. **验证日期**：
   ```bash
   node scripts/02-blog-management/validate_dates.js
   ```

## 🔍 日期格式规范

### `config/article_metadata.json`
- **格式**：`"YYYY-MM-DD"`
- **示例**：`"2025-12-28"`
- **重要性**：这是排序的唯一数据源

### HTML文件侧边栏
- **英文格式**：`"December 28th, 2025"`
- **中文格式**：`"2025年12月28日"`

### HTML文件页脚
- **格式**：`"Last updated December 2025"`

## ⚠️ 注意事项

1. **日期是排序的唯一依据**：`config/article_metadata.json` 中的 `date` 字段控制博客排序
2. **日期格式必须严格**：必须使用 `YYYY-MM-DD` 格式
3. **所有位置日期需一致**：虽然只有 `article_metadata.json` 影响排序，但显示日期也应保持一致

## 📚 相关文档

- 详细设计文档：`design/plan/BLOG_DATE_MANAGEMENT.md`


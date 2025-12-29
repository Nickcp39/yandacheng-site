# 网站文件结构优化设计

## 设计原则

1. **简洁性**: 未来不会添加太多新功能，保持结构简单
2. **可维护性**: 重点优化博客维护流程
3. **可扩展性**: 支持大量博客文章（50+，100+）
4. **自动化**: 减少手动维护工作

## 当前结构问题

### 主要问题
1. **博客文章管理混乱**
   - `posts/` 文件夹扁平，所有文章混在一起
   - 没有按时间或分类组织
   - 资源文件散落各处

2. **配置维护繁琐**
   - 需要手动维护 3 个 JSON 文件
   - 添加新文章需要修改多个文件
   - 容易出错

3. **文件组织不清晰**
   - 根目录文件较多
   - 缺少清晰的分类

## 优化后的文件结构

```
yandacheng-site/
│
├── 📄 核心页面（根目录，保持简洁）
│   ├── index.html              # 主页
│   ├── blog_yc.html           # 博客列表页
│   ├── about_yc.html          # 关于
│   ├── projects_yc.html       # 项目
│   ├── publications_yc.html   # 发表
│   ├── experience_yc.html     # 经历
│   ├── awards_yc.html         # 奖项
│   ├── photos_yc.html         # 照片
│   ├── navbar.html            # 导航栏
│   └── news.html              # 新闻
│
├── 📁 blog/                    # 博客相关（重点优化）
│   ├── posts/                  # 文章（按日期组织）
│   │   ├── 2024/
│   │   │   ├── 04/
│   │   │   │   └── phd_possibilities.html
│   │   │   └── 05/
│   │   │       └── value_lessons.html
│   │   └── 2025/
│   │       ├── 01/
│   │       │   └── llm_hospital_rad_linter.html
│   │       ├── 05/
│   │       │   ├── btc_regulation.html
│   │       │   └── btc_repeat_4years.html
│   │       ├── 06/
│   │       │   └── buffett_munger_weekend_reflection.html
│   │       ├── 07/
│   │       │   └── btc_4year_high_no_joy.html
│   │       └── 12/
│   │           ├── btc_2026_prediction.html
│   │           ├── sglang_llm_agent_id_scanner.html
│   │           └── staff_engineer.html
│   │
│   ├── assets/                 # 博客资源文件
│   │   ├── 2024/
│   │   │   └── 04/
│   │   │       └── phd_possibilities/
│   │   │           └── [图片等资源]
│   │   └── 2025/
│   │       └── 12/
│   │           └── sglang_llm_agent_id_scanner/
│   │               ├── architecture.png
│   │               └── performance.png
│   │
│   └── config/                 # 博客配置（简化）
│       └── categories.json     # 分类定义（一次性配置，很少修改）
│
├── 📁 config/                   # 网站配置（保留）
│   └── [其他配置文件]
│
├── 📁 scripts/                  # 脚本文件
│   ├── i18n.js                # 翻译系统
│   ├── loading.js             # 加载动画
│   ├── render_blog_dual.js    # 博客渲染（需更新路径）
│   └── [其他脚本]
│
├── 📁 files/                    # 静态资源（保持现状）
│   ├── amazing_photo/
│   ├── experience/
│   ├── projects/
│   └── [其他资源]
│
├── 📁 design/                   # 设计文档（已创建）
│   ├── plan/
│   └── result/
│
├── 📁 style/                    # 样式文件（可选重组）
│   ├── style.css
│   ├── style_blog.css
│   └── style_loading.css
│
└── 📄 其他文件
    ├── CNAME
    ├── sitemap.xml
    └── README.md
```

## 博客维护优化方案

### 方案 1: HTML Front Matter（推荐）

#### 实现方式
在 HTML 文件的 `<head>` 中添加元数据：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <base href="/">
  
  <!-- Blog Metadata (自动提取) -->
  <meta name="blog-title" content="BTC 的内在价值/The Intrinsic Value of Bitcoin">
  <meta name="blog-date" content="2025-05-29">
  <meta name="blog-summary" content="Bitcoin acts as digital gold...">
  <meta name="blog-tags" content="Bitcoin,Stock Market">
  <meta name="blog-category" content="Investment">
  <meta name="blog-slug" content="btc_regulation">
  
  <!-- 标准 HTML meta -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ETF通过后比特币为何反而大跌？</title>
  <link rel="stylesheet" href="../../style_blog.css">
</head>
```

#### 优点
- ✅ 元数据和内容在一起，易于维护
- ✅ 不需要额外的 JSON 文件
- ✅ 可以自动提取
- ✅ 符合 HTML 标准

#### 渲染脚本更新
```javascript
// scripts/render_blog_dual.js
// 自动扫描 blog/posts/ 目录
// 从 HTML 提取元数据
// 生成索引
```

### 方案 2: 每篇文章一个 JSON（备选）

如果 Front Matter 不够用，可以为每篇文章创建对应的 JSON：

```
blog/posts/2025/05/
├── btc_regulation.html
└── btc_regulation.json  # 元数据
```

## 自动化工具设计

### 1. 新文章创建工具

```bash
# scripts/blog/new-post.js
node scripts/blog/new-post.js \
  --title "My New Post" \
  --date "2025-01-15" \
  --tags "Tech,AI" \
  --category "Career"
```

功能：
- 自动创建日期文件夹
- 从模板生成 HTML 文件
- 自动添加元数据
- 创建资源文件夹
- 更新索引（可选）

### 2. 元数据提取工具

```javascript
// scripts/blog/extract-metadata.js
// 扫描所有文章，从 HTML 提取元数据
// 生成统一的索引文件
// 验证数据完整性
```

### 3. 验证工具

```javascript
// scripts/blog/validate.js
// 验证所有文章：
// - 元数据完整性
// - 链接有效性
// - 资源文件存在性
// - 格式正确性
```

## 迁移计划

### 阶段 1: 准备（不破坏现有功能）

1. **创建新结构**
   ```bash
   mkdir -p blog/posts blog/assets blog/config
   ```

2. **创建迁移脚本**
   - 读取现有 `config/article_metadata.json`
   - 按日期创建文件夹
   - 移动文件
   - 更新 HTML 中的路径引用

3. **测试新结构**
   - 更新渲染脚本
   - 测试博客列表页
   - 测试文章页面

### 阶段 2: 迁移（逐步进行）

1. **迁移文章**
   - 按日期组织
   - 更新路径引用
   - 添加 Front Matter

2. **迁移资源**
   - 识别文章使用的资源
   - 移动到对应文件夹
   - 更新引用路径

3. **更新配置**
   - 简化配置文件
   - 更新渲染脚本
   - 测试功能

### 阶段 3: 优化（长期）

1. **自动化工具**
   - 创建新文章工具
   - 元数据提取工具
   - 验证工具

2. **文档**
   - 维护指南
   - 贡献指南
   - 最佳实践

## URL 路径处理

### 新路径结构
```
旧: /posts/btc_regulation.html
新: /blog/posts/2025/05/btc_regulation.html
```

### 重定向方案

#### GitHub Pages
创建 `_redirects` 文件或使用 JavaScript 重定向：

```javascript
// 在旧路径页面添加
if (window.location.pathname === '/posts/btc_regulation.html') {
  window.location.replace('/blog/posts/2025/05/btc_regulation.html');
}
```

#### 或者保持旧路径
使用符号链接或复制文件到旧位置（不推荐，维护成本高）

## 维护工作流

### 添加新文章（优化后）

1. **运行创建工具**
   ```bash
   node scripts/blog/new-post.js --title "..." --date "2025-01-15"
   ```

2. **编辑内容**
   - 打开生成的 HTML 文件
   - 编辑内容
   - 添加资源到对应的 assets 文件夹

3. **验证**
   ```bash
   node scripts/blog/validate.js
   ```

4. **提交**
   ```bash
   git add blog/posts/2025/01/new-post.html
   git commit -m "Add: New post about..."
   ```

### 更新文章

1. 直接编辑 HTML 文件
2. 如需更新元数据，修改 Front Matter
3. 运行验证脚本
4. 提交

### 删除文章

1. 删除 HTML 文件
2. 删除对应的资源文件夹
3. 索引会自动更新（下次构建时）

## 配置文件简化

### 当前配置（3个文件）
```
config/
├── article_metadata.json  # 10+ 条目
├── article_tags.json      # 10+ 条目
└── category_tree.json    # 很少修改
```

### 优化后配置（1个文件）
```
blog/config/
└── categories.json       # 分类定义（很少修改）
```

元数据从 HTML Front Matter 自动提取，不需要单独维护。

## 预期收益

### 维护效率
- **添加新文章**: 从 5 步减少到 2 步
- **配置维护**: 从 3 个文件减少到 0 个（自动提取）
- **查找文章**: 从搜索变为按日期浏览

### 可扩展性
- **支持文章数量**: 从 10+ 扩展到 100+
- **资源管理**: 从混乱到有序
- **团队协作**: 更清晰的目录结构

### 错误减少
- **配置错误**: 从手动维护到自动提取
- **路径错误**: 从手动更新到自动处理
- **格式错误**: 从人工检查到自动验证

## 实施建议

### 立即实施（高优先级）
1. ✅ 创建新的目录结构
2. ✅ 编写迁移脚本
3. ✅ 迁移现有文章（保持旧路径可用）

### 短期实施（中优先级）
4. 实现 Front Matter 元数据
5. 更新渲染脚本支持自动提取
6. 创建新文章工具

### 长期优化（低优先级）
7. 完善自动化工具
8. 添加搜索功能
9. 性能优化

## 注意事项

1. **向后兼容**: 迁移时保持旧 URL 可用（重定向）
2. **渐进迁移**: 可以逐步迁移，不需要一次性完成
3. **备份**: 迁移前完整备份
4. **测试**: 每个阶段都要充分测试

## 总结

通过按日期组织博客文章、使用 Front Matter 存储元数据、创建自动化工具，可以：
- 大幅提升维护效率
- 支持大量文章管理
- 减少人为错误
- 保持结构清晰简洁


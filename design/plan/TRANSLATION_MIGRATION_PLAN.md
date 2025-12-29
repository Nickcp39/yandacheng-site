# 翻译系统迁移计划

## 目标
将 yandacheng-site 的翻译系统从 Google Translate API 迁移到基于 `data-i18n` 属性的静态翻译系统（参考 Company_website_liuyuxinrun 项目）。

## 当前系统分析

### 现有实现
- **工具**: Google Translate API（客户端自动翻译）
- **脚本**: `scripts/auto-translate.js`
- **方式**: 
  - 自动检测浏览器语言
  - 使用 localStorage 保存语言偏好
  - 通过 Google Translate Element 进行页面翻译
- **问题**:
  - 依赖外部 API，可能有延迟
  - 翻译质量不可控
  - 不支持手动管理翻译内容
  - 页面语言设置不一致（有些是 `lang="zh"`，有些是 `lang="en"`）

### 目标系统特点（参考 Company_website_liuyuxinrun）
- **工具**: 自定义 JavaScript 翻译系统
- **方式**: 
  - 使用 `data-i18n` 属性标记需要翻译的元素
  - 使用 `translations` 对象存储所有翻译文本
  - 通过 `switchLanguage()` 函数切换语言
  - 语言切换按钮使用 `lang-btn` 类和 `data-lang` 属性
- **优势**:
  - 完全离线工作，无外部依赖
  - 翻译质量可控，可手动编辑
  - 性能更好，无网络延迟
  - 支持精确控制哪些内容需要翻译

## 迁移步骤

### 阶段 1: 创建核心翻译系统

#### 1.1 创建新的翻译脚本
- **文件**: `scripts/i18n.js`
- **功能**:
  - 定义 `translations` 对象（包含中英文翻译）
  - 实现 `switchLanguage(lang)` 函数
  - 自动检测用户语言偏好（localStorage + 浏览器语言）
  - 初始化时应用用户偏好语言
  - 支持 `data-i18n` 和 `data-i18n-placeholder` 属性

#### 1.2 翻译键的命名规范
- 使用点号分隔的层级结构，如 `nav.home`, `home.about.title`
- 前缀分类:
  - `nav.*` - 导航栏
  - `home.*` - 主页内容
  - `footer.*` - 页脚
  - `blog.*` - 博客相关
  - `common.*` - 通用文本

### 阶段 2: 更新 HTML 页面

#### 2.1 导航栏 (navbar.html)
- 添加语言切换按钮（中文/英文）
- 为所有导航链接添加 `data-i18n` 属性
- 需要翻译的内容:
  - Home / 首页
  - About / 关于
  - Projects / 项目
  - Publications / 发表
  - Experience / 经历
  - Awards / 奖项
  - Photos / 照片
  - Blog / 博客

#### 2.2 主页 (index.html)
- 移除 Google Translate 相关代码
- 替换为新的 i18n.js 脚本
- 添加 `data-i18n` 属性到需要翻译的元素
- 需要翻译的内容:
  - "About Me" / "关于我"
  - "News" / "新闻"
  - "Selected Projects" / "精选项目"
  - "Publications" / "发表"
  - "Experience" / "经历"
  - "Awards" / "奖项"
  - "Photo Gallery" / "照片集"
  - "Visitor Map" / "访客地图"
  - "Last updated" / "最后更新"

#### 2.3 博客页面 (blog_yc.html)
- 添加翻译支持
- 需要翻译的内容:
  - "Yanda's Blog" / "Yanda 的博客"
  - "Browse posts by category" / "按分类浏览所有博文"
  - "Sorted by date" / "按时间排序"

#### 2.4 文章页面 (posts/*.html)
- 注意：文章内容本身可能不需要翻译（保持原文）
- 但页面框架（导航、页脚等）需要翻译支持
- 可以通过 navbar 和 footer 的统一管理来解决

### 阶段 3: CSS 样式

#### 3.1 语言切换按钮样式
- 添加 `.lang-switcher` 容器样式
- 添加 `.lang-btn` 按钮样式（包括 active 状态）
- 位置：固定在页面右上角
- 响应式设计（移动端适配）

### 阶段 4: 翻译内容管理

#### 4.1 初始翻译内容收集
需要从现有页面提取所有需要翻译的文本，包括：
- 导航栏文本
- 主页所有可见文本
- 页脚文本
- 通用按钮和链接文本

#### 4.2 翻译质量
- 确保中文翻译准确、自然
- 保持术语一致性
- 注意专业术语的正确翻译

### 阶段 5: 测试和优化

#### 5.1 功能测试
- 测试语言切换功能
- 测试 localStorage 持久化
- 测试浏览器语言检测
- 测试不同页面的翻译一致性

#### 5.2 兼容性测试
- 测试不同浏览器（Chrome, Firefox, Safari, Edge）
- 测试移动端设备
- 测试不同屏幕尺寸

#### 5.3 性能测试
- 检查页面加载速度
- 检查语言切换响应速度

## 文件变更清单

### 新增文件
- `scripts/i18n.js` - 新的翻译系统核心脚本

### 修改文件
- `scripts/auto-translate.js` - **删除**（替换为 i18n.js）
- `navbar.html` - 添加语言切换按钮和 data-i18n 属性
- `index.html` - 替换翻译脚本，添加 data-i18n 属性
- `blog_yc.html` - 替换翻译脚本，添加 data-i18n 属性
- `posts/*.html` - 替换翻译脚本（如需要）
- `style.css` - 添加语言切换按钮样式（如需要）

### 保留但修改
- 其他页面（projects_yc.html, publications_yc.html 等）可以后续逐步迁移

## 翻译键结构设计

```javascript
const translations = {
  zh: {
    // 导航栏
    'nav.home': '首页',
    'nav.about': '关于',
    'nav.projects': '项目',
    'nav.publications': '发表',
    'nav.experience': '经历',
    'nav.awards': '奖项',
    'nav.photos': '照片',
    'nav.blog': '博客',
    
    // 主页
    'home.about.title': '关于我',
    'home.news.title': '新闻',
    'home.projects': '精选项目',
    'home.publications': '发表',
    'home.experience': '经历',
    'home.awards': '奖项',
    'home.photos': '照片集',
    'home.visitor_map': '访客地图',
    'home.footer.updated': '最后更新',
    'home.footer.copyright': '© Yanda Cheng',
    
    // 博客
    'blog.title': "Yanda's Blog",
    'blog.subtitle': '按分类浏览所有博文',
    'blog.timeline': '按时间排序',
    
    // 通用
    'common.read_more': '了解更多',
    'common.contact': '联系我们',
    // ... 更多翻译键
  },
  en: {
    // 对应的英文翻译
    // ...
  }
};
```

## 实施优先级

### 高优先级（必须完成）
1. ✅ 创建 `scripts/i18n.js` 核心脚本
2. ✅ 更新 `navbar.html` 添加语言切换
3. ✅ 更新 `index.html` 替换翻译系统

### 中优先级（建议完成）
4. ✅ 更新 `blog_yc.html`
5. ✅ 添加 CSS 样式

### 低优先级（可选）
6. 更新其他页面（projects_yc.html 等）
7. 优化翻译内容

## 注意事项

1. **向后兼容**: 确保移除 Google Translate 后，网站仍能正常显示
2. **渐进增强**: 可以先在主要页面实施，其他页面保持原样
3. **翻译质量**: 确保所有翻译内容准确、自然
4. **性能考虑**: 翻译对象可能较大，确保不会影响页面加载
5. **SEO**: 考虑是否需要为不同语言创建不同的 URL（当前方案是同一 URL 切换语言）

## 成功标准

- [ ] 语言切换功能正常工作
- [ ] 所有主要页面的文本都能正确翻译
- [ ] 语言偏好能够正确保存和恢复
- [ ] 页面加载速度不受影响
- [ ] 代码结构清晰，易于维护

## 后续优化方向

1. **翻译文件分离**: 可以考虑将 translations 对象拆分到单独的文件
2. **懒加载**: 只在需要时加载翻译内容
3. **更多语言支持**: 如果将来需要，可以轻松添加更多语言
4. **翻译内容管理**: 考虑使用 JSON 文件存储翻译，便于编辑


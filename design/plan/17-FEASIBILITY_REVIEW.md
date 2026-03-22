# 可行性复查 + 承载能力评估

> 核心前提：这是一个 GitHub Pages 静态站，展示为主，简洁优先

---

## 1. GitHub Pages 约束

| 限制 | 值 | 影响 |
|------|----|------|
| 仓库大小上限 | 推荐 <1GB，硬限制 ~5GB | 当前含 donglu_site 约 700MB，可用 |
| 单文件大小 | <100MB | 无问题 |
| 带宽 | 软限制 100GB/月 | 学术站流量极低，无问题 |
| 构建 | 仅静态文件，无 server | 所有方案都是纯前端，兼容 |
| 自定义域名 | 支持（已配置 CNAME） | 无影响 |
| HTTPS | 自动 | 无影响 |

**结论：所有 Phase 都在 GitHub Pages 能力范围内。**

## 2. 逐 Phase 可行性

### Phase 1: CSS 变量 ✅ 无风险
- 纯 CSS 改动，不增加文件
- CSS 变量浏览器支持 >97%（不支持 IE11，可接受）
- Google Fonts CDN 加载 Inter 字体：+1 个 HTTP 请求，~20KB
- **复杂度：低**

### Phase 2: 浮岛式导航 ✅ 低风险
- `position: fixed` + `backdrop-filter` 是核心，支持率 >95%
- 不支持 `backdrop-filter` 时降级为半透明白底，功能不受影响
- 顶部浮岛改 navbar.html 一处，全站生效
- 侧面浮岛只在博客/文章页出现，影响范围有限
- TOC 自动生成 + 滚动高亮用 `IntersectionObserver`（>97%）
- **复杂度：中**
- **注意：** `position: fixed` 在 iOS Safari 中偶有 bug，需测试移动端
- **注意：** 侧面浮岛在 768px-1100px 区间可能遮挡文章内容 → 需要在此区间隐藏侧面浮岛或调整文章 margin

### Phase 3: 首页 ✅ 低风险
- CSS Grid 支持率 >97%
- IntersectionObserver 支持率 >97%
- 只改一个页面 (index.html) + 对应 CSS
- **复杂度：中**
- **过度设计风险：** 全宽背景色区块的 CSS 技巧可能在某些布局下不稳定 → 已在文档中标注简化方案

### Phase 4: 内容页 ✅ 低风险
- 主要是 CSS class 替换，不改 HTML 结构
- 逐页改动，互不影响
- **复杂度：中（因为页面多，但每页改动小）**

### Phase 5: 博客 + 留言 + 分类重组 ⚠️ 中等风险
- render_blog_dual.js 改动需要验证动态渲染的元素样式正确
- 时间线 UI 的 CSS 伪元素在所有现代浏览器支持
- **Giscus 留言依赖：** 需要在 GitHub repo 开启 Discussions 功能
- **Formspree 匿名留言：** 需要注册 Formspree 账号，免费版 50 次/月
- **分类重组：** 改两个 JSON 文件 + render 脚本中的 categoryKeyMap
- **复杂度：中**
- **注意：** 动态渲染的 DOM 元素需要确保 i18n 翻译在渲染后触发（当前已有此机制）
- **注意：** 分类重组需要同步更新 i18n.js 中的分类翻译 key

### Phase 6: 翻译重构 ⚠️ 中等风险
- **最大风险项**
- fetch() 加载 JSON 在 GitHub Pages 上可行，但：
  - 多一次 HTTP 请求（首次加载中文时）
  - 如果 JSON 路径错误，翻译静默失败
- 迁移过程中可能遗漏 key → 需要 validate 脚本辅助
- **复杂度：中-高**
- **缓解：** 保留旧 i18n.js 备份，可快速回滚

### Phase 7: 自动化 ✅ 低风险
- 纯开发工具，不影响网站运行
- 零外部依赖
- **复杂度：低**

### Phase 8: 深色模式 ⚠️ 可选
- CSS 变量切换本身简单
- 但需要逐一验证所有页面在深色下的可读性
- 图片、头像、第三方 widget (ClustrMaps) 在深色背景下可能不协调
- **建议推迟或不做**

## 3. 性能影响评估

| 项目 | 当前 | 改动后 | 差异 |
|------|------|--------|------|
| CSS 文件数 | 2-3 | 2-3 | 不变 |
| CSS 总大小 | ~8KB | ~12KB | +4KB（新样式） |
| JS 文件数 | 2-3 | 2-3 | 不变 |
| JS 总大小 | ~80KB (i18n.js 含数据) | ~5KB (i18n.js) + ~80KB (zh.json 按需) | 英文用户更快 |
| 字体请求 | 0 | 1（Inter from Google CDN） | +20KB |
| 首屏渲染 | 快 | 快（字体 swap 不阻塞） | 无感知差异 |

**总结：改动后总传输量增加约 25KB，对学术站用户体验无影响。**

## 4. "不能太复杂" 检查

### 已砍掉的功能
- ❌ 构建工具（Webpack/Vite/11ty）
- ❌ CSS 预处理器（Sass/PostCSS）
- ❌ JS 框架（React/Vue）
- ❌ 动画库（AOS/GSAP/Framer Motion）
- ❌ Icon 库（Font Awesome/Lucide）
- ❌ Markdown 引擎
- ❌ 评论系统（Giscus/Disqus）
- ❌ 搜索功能
- ❌ CI/CD pipeline
- ❌ 自动翻译 API

### 保留的技术
- ✅ 原生 CSS（含变量）
- ✅ 原生 JS（无框架）
- ✅ 一个 Google Font
- ✅ fetch() 加载 HTML/JSON（已在使用）
- ✅ Node.js 脚本辅助（已在使用）

**全站零外部依赖，任何人 clone 后无需 npm install 即可在浏览器打开。**

## 5. 核心原则对齐

用户原话："优先级第一是一目了然，信息简洁"

| 设计决策 | 是否符合 |
|----------|----------|
| 首页 profile 居中、信息层级清晰 | ✅ 一眼看到名字、身份、链接 |
| Quick Links 卡片替代 emoji 列表 | ✅ 每张卡片一个入口，比列表更直观 |
| 去掉 emoji | ✅ 更专业，信息不被装饰干扰 |
| 去掉 BTC gif | ✅ 与学术展示无关的元素移除 |
| 毛玻璃导航固定顶部 | ✅ 随时可跳转，不丢失导航 |
| 文章页 720px 居中 | ✅ 阅读体验最佳宽度 |
| 统一配色（黑白灰+蓝） | ✅ 视觉噪音降低 |
| 卡片无边框 | ✅ 更干净 |

## 6. 执行建议

1. **Phase 1 和 Phase 6 可以并行**，互不依赖
2. **Phase 2→3→4→5 串行**，每个依赖前一个的 CSS 基础
3. **Phase 7 在 Phase 6 后**
4. **Phase 8 暂不排期**
5. 每完成一个 Phase 就 commit + push，确保随时可部署
6. 保持每个 commit 可独立运行，不做跨 Phase 的"半完成"提交

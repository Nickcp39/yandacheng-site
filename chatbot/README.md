# AI Chatbot 集成指南

## 📋 概述

这是一个基于 Hugging Face 的 AI Chatbot，集成到个人网站中。包含完整的安全机制：

- ✅ **内容限制**：只回答与 Yanda 工作/研究相关的问题
- ✅ **速率限制**：防止 DoS 攻击（前端 + 后端双重保护）
- ✅ **超出范围处理**：自动拒绝无关问题
- ✅ **免费使用**：使用 Hugging Face 公开模型，无需 API key

## 🚀 快速开始

### 1. 集成到网站

在你的 `index.html` 或其他页面的 `</body>` 标签之前添加：

```html
<!-- 引入 Chatbot -->
<script>
  fetch('chatbot/chatbot.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
    })
    .catch(err => console.error('Failed to load chatbot:', err));
</script>
```

### 2. 配置（可选）

编辑 `chatbot/chatbot.html`，在 JavaScript 的 `CONFIG` 对象中：

```javascript
const CONFIG = {
  // Hugging Face 模型（当前使用公开模型，无需 API key）
  HF_MODEL: 'microsoft/DialoGPT-medium',
  
  // 如果以后要使用 API key，取消下面的注释
  // HF_API_TOKEN: 'your_huggingface_token_here',
  
  // 速率限制配置
  RATE_LIMIT: {
    MIN_INTERVAL: 3000,        // 最小间隔 3 秒
    MAX_PER_MINUTE: 10,        // 每分钟最多 10 次
    MAX_PER_HOUR: 50,          // 每小时最多 50 次
  },
  
  // 内容过滤关键词（可以自定义）
  CONTENT_FILTER: {
    ALLOWED_KEYWORDS: [...],  // 允许的关键词
    BLOCKED_KEYWORDS: [...],  // 禁止的关键词
  }
};
```

## 🔧 使用 API Key（可选，未来升级）

### 获取 Hugging Face API Token

1. 访问 https://huggingface.co/ 注册账号（免费）
2. 进入 Settings → Access Tokens
3. 创建新的 token（选择 Read 权限即可）
4. 复制 token

### 配置 API Token

在 `chatbot.html` 中：

```javascript
const CONFIG = {
  HF_API_TOKEN: 'your_token_here', // 填入你的 token
  // ... 其他配置
};
```

**优势：**
- 更稳定的速率限制（免费层每月 30,000 次请求）
- 更好的性能
- 可以访问更多模型

## 🛡️ 安全机制

### 1. 内容限制

**白名单机制：**
- 用户问题必须包含至少一个允许的关键词
- 允许的关键词：research, project, IoT, AWS, ML, sensor, HydroTech 等

**黑名单机制：**
- 包含禁止关键词的问题直接拒绝
- 禁止的关键词：politics, medical advice, legal advice 等

**超出范围处理：**
- 自动拒绝无关问题
- 连续 3 次超出范围，暂停对话 1 分钟

### 2. 速率限制（防 DoS）

**前端限制：**
- 最小间隔：3 秒
- 每分钟最多：10 次请求
- 每小时最多：50 次请求
- 超过限制后冷却 60 秒

**实现方式：**
- 使用 `localStorage` 记录请求时间戳
- 自动清理过期记录
- 实时显示等待时间

### 3. 输入验证

- 最大长度：500 字符
- HTML 转义：防止 XSS 攻击
- 自动清理：过滤特殊字符

## 📝 自定义配置

### 修改允许/禁止的关键词

编辑 `chatbot.html` 中的 `CONTENT_FILTER`：

```javascript
CONTENT_FILTER: {
  ALLOWED_KEYWORDS: [
    'your', 'custom', 'keywords', 'here'
  ],
  BLOCKED_KEYWORDS: [
    'blocked', 'words', 'here'
  ]
}
```

### 修改速率限制

```javascript
RATE_LIMIT: {
  MIN_INTERVAL: 5000,        // 改为 5 秒
  MAX_PER_MINUTE: 5,         // 改为每分钟 5 次
  MAX_PER_HOUR: 30,          // 改为每小时 30 次
}
```

### 修改系统提示词

编辑 `SYSTEM_CONTEXT` 来改变 AI 的回答风格和内容。

## 🎨 自定义样式

所有样式都在 `chatbot.html` 的 `<style>` 标签中，可以直接修改：

```css
/* 修改主色调 */
.chatbot-btn {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}

/* 修改窗口大小 */
.chatbot-window {
  width: 400px;
  height: 650px;
}
```

## ✅ 已实现的改进功能

### 1. **请求超时处理**
- ✅ 添加 30 秒超时设置
- ✅ 超时后自动取消请求
- ✅ 显示友好的超时提示

### 2. **503 错误自动重试**
- ✅ 检测模型加载中（503 错误）
- ✅ 自动重试最多 3 次
- ✅ 递增延迟（2秒、4秒、6秒）
- ✅ 显示加载提示

### 3. **请求取消机制**
- ✅ 使用 AbortController 取消请求
- ✅ 关闭窗口时自动取消
- ✅ 防止内存泄漏

### 4. **重复请求防护**
- ✅ 防止快速点击发送重复请求
- ✅ 请求进行中禁用发送按钮

### 5. **localStorage 自动清理**
- ✅ 自动清理超过 7 天的数据
- ✅ 每天自动清理一次
- ✅ 防止存储溢出

### 6. **网络状态检测**
- ✅ 检测在线/离线状态
- ✅ 离线时显示提示
- ✅ 恢复连接时通知用户

### 7. **响应格式兼容性**
- ✅ 支持多种响应格式（数组、对象、字符串）
- ✅ 处理不同模型的响应结构
- ✅ 更健壮的错误处理

### 8. **错误处理增强**
- ✅ 区分不同类型的错误（超时、网络、CORS、速率限制）
- ✅ 针对性的错误提示
- ✅ 更好的用户体验

## 🔍 故障排除

### Chatbot 不显示
- 检查文件路径是否正确：`chatbot/chatbot.html`
- 检查浏览器控制台是否有错误

### API 请求失败
- **429 错误**：速率限制，等待后重试
- **503 错误**：模型正在加载，已自动重试（最多3次）
- **CORS 错误**：需要后端代理（见下方说明）
- **超时错误**：网络问题，检查连接
- **其他错误**：检查网络连接

### 回答质量不佳
- 当前使用公开模型，性能有限
- 建议升级到使用 API key 的版本
- 或更换其他 Hugging Face 模型

## ⚠️ 重要注意事项

### 1. **CORS 限制**
**问题**：Hugging Face API 可能不允许直接从浏览器调用（CORS 限制）

**解决方案**：
- 当前：使用公开模型，通常允许 CORS
- 如果遇到 CORS 错误：需要后端代理
- 建议：使用 Vercel/Netlify Functions 作为代理

**检测方法**：
打开浏览器控制台，如果看到 CORS 相关错误，需要设置后端代理。

### 2. **API Key 安全**
**⚠️ 警告**：如果使用 API key，不应该在前端直接暴露！

**建议**：
- 使用后端代理（Vercel/Netlify Functions）
- 或使用环境变量（但仍有风险）
- 最佳实践：所有 API 调用通过后端

### 3. **浏览器兼容性**
**已测试**：
- ✅ Chrome/Edge（现代版本）
- ✅ Firefox（现代版本）
- ✅ Safari（现代版本）

**可能不兼容**：
- ❌ IE 11 及以下（不支持 fetch API）
- ❌ 非常旧的移动浏览器

### 4. **配置说明**

**超时设置**：
```javascript
API_TIMEOUT: 30000,  // 30 秒
```

**重试设置**：
```javascript
MAX_RETRIES: 3,      // 最多重试 3 次
RETRY_DELAY: 2000,   // 初始延迟 2 秒
```

**清理设置**：
- localStorage 数据保留：7 天
- 自动清理频率：每天一次
- 速率限制数据保留：1 小时

## 📊 成本分析

### 当前方案（公开模型）
- **成本**：$0
- **限制**：速率限制较严格，可能不稳定
- **适合**：个人网站，访问量小

### 升级方案（API Token）
- **成本**：$0（免费层）
- **限制**：每月 30,000 次请求
- **适合**：访问量中等（每天约 1000 次）

### 估算
- 每天 100 次对话 ≈ 每月 3,000 次
- 每天 500 次对话 ≈ 每月 15,000 次
- 每天 1,000 次对话 ≈ 每月 30,000 次（接近上限）

## 🚀 未来升级

如果需要更好的性能，可以考虑：

1. **使用 API Token**：更稳定的速率限制
2. **更换模型**：使用更强大的模型（如 Llama, Mistral）
3. **后端代理**：通过后端 API 代理请求（更安全）
4. **缓存机制**：缓存常见问题的回答

## 📞 支持

如有问题，检查：
1. 浏览器控制台的错误信息
2. 网络请求是否成功
3. 速率限制状态（localStorage）

## 🔮 未来可考虑的改进

1. **对话历史持久化**：使用 localStorage 保存对话历史
2. **常见问题缓存**：缓存常见问题的回答，减少 API 调用
3. **请求去重**：检测相同问题，直接返回缓存答案
4. **无障碍访问**：添加 ARIA 标签，键盘导航支持
5. **多语言支持**：检测用户语言，提供多语言界面
6. **后端代理**：使用 Vercel/Netlify Functions（推荐，更安全）

---

**当前版本**：v1.1 - 增强版（使用 Hugging Face 公开模型）
**最后更新**：2025-01-21

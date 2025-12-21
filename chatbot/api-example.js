/**
 * Chatbot API 后端示例
 * 
 * 这是一个简单的 Node.js/Express 后端示例
 * 用于代理 AI API 请求（避免在前端暴露 API key）
 * 
 * 使用方法:
 * 1. 安装依赖: npm install express openai dotenv
 * 2. 创建 .env 文件，添加: OPENAI_API_KEY=your_key_here
 * 3. 运行: node api-example.js
 */

const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 初始化 OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 中间件
app.use(cors());
app.use(express.json());

// 速率限制（简单实现）
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 分钟
const MAX_REQUESTS = 10; // 每分钟最多 10 次请求

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];
  
  // 清理过期请求
  const validRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  validRequests.push(now);
  rateLimit.set(ip, validRequests);
  return true;
}

// Chat API 端点
app.post('/api/chat', async (req, res) => {
  try {
    // 速率限制检查
    const clientIp = req.ip || req.connection.remoteAddress;
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.' 
      });
    }
    
    const { message, history = [], system_prompt } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // 构建消息历史
    const messages = [
      { role: 'system', content: system_prompt || 'You are a helpful assistant.' },
      ...history.slice(-10).map(h => ({
        role: h.role === 'user' ? 'user' : 'assistant',
        content: h.content
      })),
      { role: 'user', content: message }
    ];
    
    // 调用 OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });
    
    const response = completion.choices[0].message.content;
    
    res.json({ 
      response: response,
      usage: completion.usage
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    
    if (error.response) {
      res.status(error.response.status).json({ 
        error: error.response.data?.error?.message || 'API request failed' 
      });
    } else {
      res.status(500).json({ 
        error: 'Internal server error' 
      });
    }
  }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Chatbot API server running on http://localhost:${PORT}`);
  console.log(`📝 Make sure to set OPENAI_API_KEY in your .env file`);
});

/**
 * 使用 Anthropic Claude 的替代版本
 * 
 * 如果你使用 Claude，取消下面的注释并注释掉上面的 OpenAI 代码
 */

/*
const Anthropic = require('@anthropic-ai/sdk');
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

app.post('/api/chat', async (req, res) => {
  try {
    const clientIp = req.ip || req.connection.remoteAddress;
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.' 
      });
    }
    
    const { message, history = [], system_prompt } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const messages = history.slice(-10).map(h => ({
      role: h.role === 'user' ? 'user' : 'assistant',
      content: h.content
    }));
    
    messages.push({ role: 'user', content: message });
    
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      system: system_prompt || 'You are a helpful assistant.',
      messages: messages
    });
    
    res.json({ 
      response: response.content[0].text 
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
*/

/**
 * 部署到 Vercel 的版本
 * 
 * 创建 vercel.json:
 * {
 *   "version": 2,
 *   "builds": [
 *     { "src": "api/chat.js", "use": "@vercel/node" }
 *   ],
 *   "routes": [
 *     { "src": "/api/chat", "dest": "api/chat.js" }
 *   ]
 * }
 * 
 * 创建 api/chat.js:
 * module.exports = async (req, res) => {
 *   // 上面的 API 逻辑
 * };
 */


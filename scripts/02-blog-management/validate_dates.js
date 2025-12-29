#!/usr/bin/env node
/**
 * 博客文章日期验证脚本
 * 功能：验证所有文章的日期格式、一致性和排序正确性
 * 
 * 使用方法：
 *   node scripts/02-blog-management/validate_dates.js
 */

const fs = require('fs');
const path = require('path');

// 项目根目录
const rootDir = path.resolve(__dirname, '../..');
const configDir = path.join(rootDir, 'config');
const postsDir = path.join(rootDir, 'posts');
const metadataPath = path.join(configDir, 'article_metadata.json');

// 读取 article_metadata.json
if (!fs.existsSync(metadataPath)) {
  console.error('❌ 错误：找不到 config/article_metadata.json');
  process.exit(1);
}

const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

// 日期格式验证正则表达式 (YYYY-MM-DD)
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// 验证结果
const errors = [];
const warnings = [];
const dates = [];

console.log('🔍 开始验证文章日期...\n');

// 验证每个文章的日期
for (const [file, meta] of Object.entries(metadata)) {
  if (!meta.date) {
    errors.push(`❌ ${file}: 缺少日期字段`);
    continue;
  }

  // 验证日期格式
  if (!dateRegex.test(meta.date)) {
    errors.push(`❌ ${file}: 日期格式错误 "${meta.date}"，应为 YYYY-MM-DD 格式`);
    continue;
  }

  // 验证日期是否有效
  const date = new Date(meta.date);
  if (isNaN(date.getTime())) {
    errors.push(`❌ ${file}: 无效的日期 "${meta.date}"`);
    continue;
  }

  // 检查日期是否为未来日期（允许未来1天，考虑时区问题）
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const articleDate = new Date(meta.date);
  articleDate.setHours(23, 59, 59, 999);
  
  if (articleDate > today) {
    warnings.push(`⚠️  ${file}: 日期是未来日期 "${meta.date}"`);
  }

  // 检查文章文件是否存在
  const articlePath = path.join(postsDir, file);
  if (!fs.existsSync(articlePath)) {
    warnings.push(`⚠️  ${file}: 文章文件不存在 ${articlePath}`);
  }

  dates.push({ file, date: meta.date, dateObj: date });
}

// 检查日期排序
console.log('📊 检查日期排序...');
const sortedDates = [...dates].sort((a, b) => b.dateObj - a.dateObj);
const isSorted = dates.every((item, index) => {
  if (index === 0) return true;
  return item.dateObj <= dates[index - 1].dateObj;
});

if (!isSorted) {
  warnings.push('⚠️  article_metadata.json 中的文章未按日期倒序排列');
  console.log('\n当前顺序：');
  dates.forEach((item, index) => {
    console.log(`  ${index + 1}. ${item.file}: ${item.date}`);
  });
  console.log('\n正确顺序（按日期倒序）：');
  sortedDates.forEach((item, index) => {
    console.log(`  ${index + 1}. ${item.file}: ${item.date}`);
  });
}

// 检查重复日期
console.log('\n📊 检查重复日期...');
const dateMap = {};
dates.forEach(item => {
  if (!dateMap[item.date]) {
    dateMap[item.date] = [];
  }
  dateMap[item.date].push(item.file);
});

Object.entries(dateMap).forEach(([date, files]) => {
  if (files.length > 1) {
    warnings.push(`⚠️  日期 ${date} 被 ${files.length} 篇文章使用: ${files.join(', ')}`);
  }
});

// 输出结果
console.log('\n' + '='.repeat(60));
console.log('📋 验证结果');
console.log('='.repeat(60));

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ 所有日期验证通过！');
  console.log(`\n📊 统计信息：`);
  console.log(`  - 总文章数: ${dates.length}`);
  console.log(`  - 日期范围: ${sortedDates[sortedDates.length - 1].date} 到 ${sortedDates[0].date}`);
  process.exit(0);
}

if (errors.length > 0) {
  console.log(`\n❌ 发现 ${errors.length} 个错误：`);
  errors.forEach(error => console.log(`  ${error}`));
}

if (warnings.length > 0) {
  console.log(`\n⚠️  发现 ${warnings.length} 个警告：`);
  warnings.forEach(warning => console.log(`  ${warning}`));
}

console.log(`\n📊 统计信息：`);
console.log(`  - 总文章数: ${dates.length}`);
if (sortedDates.length > 0) {
  console.log(`  - 日期范围: ${sortedDates[sortedDates.length - 1].date} 到 ${sortedDates[0].date}`);
}

// 如果有错误，退出码为1
if (errors.length > 0) {
  process.exit(1);
}


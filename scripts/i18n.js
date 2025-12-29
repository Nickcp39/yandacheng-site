/**
 * i18n 翻译系统
 * 基于 data-i18n 属性的静态翻译系统
 * 参考 Company_website_liuyuxinrun 项目
 */

/* ========== 翻译内容定义 ========== */
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
    'blog.footer.copyright': 'Blog © Yanda Cheng',
    'blog.footer.updated': '最后更新',
    
    // 通用
    'common.resume': '简历',
    'common.read_more': '了解更多',
    'common.contact': '联系我们',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.publications': 'Publications',
    'nav.experience': 'Experience',
    'nav.awards': 'Awards',
    'nav.photos': 'Photos',
    'nav.blog': 'Blog',
    
    // Home page
    'home.about.title': 'About Me',
    'home.news.title': 'News',
    'home.projects': 'Selected Projects',
    'home.publications': 'Publications',
    'home.experience': 'Experience',
    'home.awards': 'Awards',
    'home.photos': 'Photo Gallery',
    'home.visitor_map': 'Visitor Map',
    'home.footer.updated': 'Last updated',
    'home.footer.copyright': '© Yanda Cheng',
    
    // Blog
    'blog.title': "Yanda's Blog",
    'blog.subtitle': 'Browse posts by category',
    'blog.timeline': 'Sorted by date',
    'blog.footer.copyright': 'Blog © Yanda Cheng',
    'blog.footer.updated': 'Last updated',
    
    // Common
    'common.resume': 'Resume',
    'common.read_more': 'Read More',
    'common.contact': 'Contact Us',
  }
};

/* ========== 核心函数 ========== */

// 获取当前语言（从 localStorage 或浏览器语言检测）
function getCurrentLanguage() {
  // 优先使用 localStorage 中保存的语言偏好
  const savedLang = localStorage.getItem('language');
  if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
    return savedLang;
  }
  
  // 检测浏览器语言
  const browserLang = navigator.language || navigator.userLanguage;
  
  // 如果是中文相关语言，返回中文
  if (browserLang.startsWith('zh')) {
    return 'zh';
  }
  
  // 默认返回英文
  return 'en';
}

// 切换语言函数
function switchLanguage(lang) {
  if (!translations[lang]) {
    console.warn(`Language ${lang} not supported`);
    return;
  }
  
  // 保存语言偏好
  localStorage.setItem('language', lang);
  
  // 更新所有带有 data-i18n 属性的元素
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  
  // 更新所有带有 data-i18n-placeholder 属性的元素（如 input, textarea）
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });
  
  // 更新语言切换按钮状态
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // 更新 HTML lang 属性
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

// 初始化函数
function initI18n() {
  // 获取当前语言
  const currentLang = getCurrentLanguage();
  
  // 应用当前语言
  switchLanguage(currentLang);
  
  // 为语言切换按钮绑定事件（使用事件委托，支持动态加载的元素）
  function attachLanguageButtonListeners() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      // 检查是否已经绑定过事件
      if (!btn.dataset.hasListener) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const targetLang = btn.dataset.lang;
          if (targetLang) {
            switchLanguage(targetLang);
          }
        });
        btn.dataset.hasListener = 'true';
      }
    });
  }
  
  // 立即绑定
  attachLanguageButtonListeners();
  
  // 使用 MutationObserver 监听 DOM 变化，以便在 navbar 动态加载后也能绑定事件
  const observer = new MutationObserver(() => {
    attachLanguageButtonListeners();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // 存储到全局，供外部调用
  window.attachLanguageButtonListeners = attachLanguageButtonListeners;
}

// 导出函数供外部调用
window.switchLanguage = switchLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.initI18n = initI18n;

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  // 如果 DOM 已经加载完成，立即初始化
  initI18n();
}


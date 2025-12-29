/**
 * 自动翻译脚本 - 参考 yanda-cheng.com
 * 自动检测用户语言偏好并应用翻译
 */

(function() {
  'use strict';

  // 检测用户浏览器语言
  function getUserLanguage() {
    // 优先使用localStorage中保存的语言偏好
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
      return savedLang;
    }

    // 检测浏览器语言
    const browserLang = navigator.language || navigator.userLanguage;
    
    // 如果是中文相关语言，返回中文
    if (browserLang.startsWith('zh')) {
      return 'zh-CN';
    }
    
    // 默认返回英文
    return 'en';
  }

  // 保存用户语言偏好
  function saveLanguagePreference(lang) {
    localStorage.setItem('preferred-language', lang);
  }

  // 初始化Google Translate
  function initGoogleTranslate() {
    // 检查是否已经加载
    if (window.google && window.google.translate) {
      setupTranslate();
      return;
    }

    // 加载Google Translate脚本
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
  }

  // 设置翻译功能
  function setupTranslate() {
    const userLang = getUserLanguage();
    const pageLang = document.documentElement.lang || 'en';
    
    // 如果用户语言与页面语言不同，且用户语言是中文，则自动翻译
    if (userLang === 'zh-CN' && pageLang === 'en') {
      // 多次尝试，确保Google Translate已完全加载
      let attempts = 0;
      const maxAttempts = 10;
      
      const tryTranslate = function() {
        attempts++;
        const translateElement = document.querySelector('.goog-te-combo');
        if (translateElement && translateElement.options.length > 0) {
          // 找到中文选项
          for (let i = 0; i < translateElement.options.length; i++) {
            if (translateElement.options[i].value === 'zh-CN' || 
                translateElement.options[i].value === 'zh') {
              translateElement.selectedIndex = i;
              translateElement.dispatchEvent(new Event('change'));
              return;
            }
          }
        } else if (attempts < maxAttempts) {
          setTimeout(tryTranslate, 300);
        }
      };
      
      // 延迟执行，确保Google Translate已完全加载
      setTimeout(tryTranslate, 500);
    }
  }

  // Google Translate初始化回调
  window.googleTranslateElementInit = function() {
    if (!window.google || !window.google.translate) {
      return;
    }

    // 查找或创建翻译控制容器
    let translateContainer = document.getElementById('translate-control');
    if (!translateContainer) {
      translateContainer = document.createElement('div');
      translateContainer.id = 'translate-control';
      translateContainer.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 999;';
      document.body.appendChild(translateContainer);
    }

    // 初始化Google Translate
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,zh-CN,zh-TW',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false, // 不自动显示，我们手动控制
      multilanguagePage: false
    }, 'translate-control');

    // 设置完成后，根据用户语言偏好自动翻译
    setTimeout(setupTranslate, 800);

    // 监听语言切换事件 - 使用更可靠的方式
    function attachLanguageChangeListener() {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        // 移除旧的监听器（如果存在）
        const newSelect = select.cloneNode(true);
        select.parentNode.replaceChild(newSelect, select);
        
        // 添加新的监听器
        newSelect.addEventListener('change', function() {
          const selectedLang = this.value;
          if (selectedLang && selectedLang !== '') {
            saveLanguagePreference(selectedLang);
          }
        });
        return true;
      }
      return false;
    }

    // 使用MutationObserver监听翻译控件加载
    const observer = new MutationObserver(function(mutations) {
      attachLanguageChangeListener();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // 立即尝试附加监听器
    setTimeout(attachLanguageChangeListener, 1000);
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGoogleTranslate);
  } else {
    initGoogleTranslate();
  }

  // 提供手动切换语言的函数
  window.switchLanguage = function(lang) {
    saveLanguagePreference(lang);
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
    }
  };

})();


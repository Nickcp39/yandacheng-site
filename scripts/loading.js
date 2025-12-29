/**
 * 加载动画和占位符管理
 * 提供统一的加载状态管理和动画效果
 */

(function() {
  'use strict';

  // ========== 加载骨架屏 ==========
  
  /**
   * 创建骨架屏元素
   * @param {string} type - 骨架屏类型 ('navbar', 'news', 'card', 'text')
   * @param {Object} options - 配置选项
   */
  function createSkeleton(type, options = {}) {
    const skeleton = document.createElement('div');
    skeleton.className = `skeleton skeleton-${type}`;
    
    switch(type) {
      case 'navbar':
        skeleton.innerHTML = `
          <div class="skeleton-navbar">
            <div class="skeleton-line" style="width: 60px; height: 20px;"></div>
            <div class="skeleton-line" style="width: 80px; height: 20px;"></div>
            <div class="skeleton-line" style="width: 100px; height: 20px;"></div>
            <div class="skeleton-line" style="width: 70px; height: 20px;"></div>
          </div>
        `;
        break;
      case 'news':
        skeleton.innerHTML = `
          <div class="skeleton-news">
            <div class="skeleton-line" style="width: 100%; height: 20px; margin-bottom: 10px;"></div>
            <div class="skeleton-line" style="width: 90%; height: 20px; margin-bottom: 10px;"></div>
            <div class="skeleton-line" style="width: 95%; height: 20px; margin-bottom: 10px;"></div>
            <div class="skeleton-line" style="width: 85%; height: 20px;"></div>
          </div>
        `;
        break;
      case 'text':
        const lines = options.lines || 3;
        const width = options.width || '100%';
        skeleton.innerHTML = Array(lines).fill(0).map((_, i) => 
          `<div class="skeleton-line" style="width: ${i === lines - 1 ? '80%' : width}; height: 16px; margin-bottom: 8px;"></div>`
        ).join('');
        break;
      default:
        skeleton.innerHTML = '<div class="skeleton-line" style="width: 100%; height: 20px;"></div>';
    }
    
    return skeleton;
  }

  // ========== 加载状态管理 ==========
  
  /**
   * 显示加载状态
   * @param {HTMLElement} container - 容器元素
   * @param {string} type - 骨架屏类型
   */
  function showLoading(container, type = 'text') {
    if (!container) return;
    
    const skeleton = createSkeleton(type);
    container.innerHTML = '';
    container.appendChild(skeleton);
    container.classList.add('loading');
  }

  /**
   * 隐藏加载状态并显示内容
   * @param {HTMLElement} container - 容器元素
   * @param {string} content - 要显示的内容（HTML字符串）
   * @param {boolean} fadeIn - 是否使用淡入动画
   */
  function hideLoading(container, content, fadeIn = true) {
    if (!container) return;
    
    container.classList.remove('loading');
    
    if (fadeIn) {
      container.style.opacity = '0';
      container.innerHTML = content;
      
      // 使用 requestAnimationFrame 确保 DOM 更新后再执行动画
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.style.transition = 'opacity 0.3s ease-in';
          container.style.opacity = '1';
        });
      });
    } else {
      container.innerHTML = content;
    }
  }

  // ========== 错误处理 ==========
  
  /**
   * 显示错误信息
   * @param {HTMLElement} container - 容器元素
   * @param {string} message - 错误消息
   */
  function showError(container, message = '加载失败，请稍后重试') {
    if (!container) return;
    
    container.classList.remove('loading');
    container.innerHTML = `
      <div class="loading-error">
        <p>⚠️ ${message}</p>
        <button class="retry-btn" onclick="location.reload()">重试</button>
      </div>
    `;
  }

  // ========== 图片懒加载 ==========
  
  /**
   * 初始化图片懒加载
   */
  function initLazyLoad() {
    // 检查浏览器是否原生支持懒加载
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
      return;
    }

    // 使用 Intersection Observer 实现懒加载
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              // 添加加载动画
              img.classList.add('lazy-loading');
              
              const tempImg = new Image();
              tempImg.onload = () => {
                img.src = img.dataset.src;
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-loaded');
                observer.unobserve(img);
              };
              tempImg.onerror = () => {
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-error');
                observer.unobserve(img);
              };
              tempImg.src = img.dataset.src;
            }
          }
        });
      }, {
        rootMargin: '50px' // 提前50px开始加载
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // ========== 页面元素淡入动画 ==========
  
  /**
   * 初始化滚动触发动画
   */
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // 为需要动画的元素添加类
    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // ========== 导出函数 ==========
  
  window.LoadingManager = {
    show: showLoading,
    hide: hideLoading,
    error: showError,
    initLazyLoad: initLazyLoad,
    initScrollAnimations: initScrollAnimations
  };

  // ========== 自动初始化 ==========
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initLazyLoad();
      initScrollAnimations();
    });
  } else {
    initLazyLoad();
    initScrollAnimations();
  }

})();


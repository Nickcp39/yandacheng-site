/**
 * Photo strips: horizontal scroll without visible scrollbar; drag, wheel, and arrow controls.
 */
(function () {
  'use strict';

  function scrollStep(viewport) {
    return Math.min(Math.round(viewport.clientWidth * 0.75), 420);
  }

  function initCarousel(root) {
    var viewport = root.querySelector('.photo-carousel__viewport');
    var prev = root.querySelector('.photo-carousel__arrow--prev');
    var next = root.querySelector('.photo-carousel__arrow--next');
    if (!viewport || !prev || !next) return;

    function updateArrows() {
      var max = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      var sl = viewport.scrollLeft;
      var eps = 2;
      prev.disabled = sl <= eps;
      next.disabled = sl >= max - eps;
      prev.setAttribute('aria-disabled', prev.disabled ? 'true' : 'false');
      next.setAttribute('aria-disabled', next.disabled ? 'true' : 'false');
    }

    prev.addEventListener('click', function () {
      viewport.scrollBy({ left: -scrollStep(viewport), behavior: 'smooth' });
    });
    next.addEventListener('click', function () {
      viewport.scrollBy({ left: scrollStep(viewport), behavior: 'smooth' });
    });

    viewport.addEventListener('scroll', updateArrows, { passive: true });

    viewport.addEventListener(
      'wheel',
      function (e) {
        var absY = Math.abs(e.deltaY);
        var absX = Math.abs(e.deltaX);
        if (absX >= absY) return;
        e.preventDefault();
        viewport.scrollLeft += e.deltaY;
      },
      { passive: false }
    );

    viewport.addEventListener('mousedown', function (e) {
      if (e.button === 1) e.preventDefault();
    });

    var dragging = false;
    var startX = 0;
    var startScroll = 0;
    var activePointerId = null;

    function onPointerDown(e) {
      if (e.button !== 0 && e.button !== 1) return;
      dragging = true;
      startX = e.clientX;
      startScroll = viewport.scrollLeft;
      activePointerId = e.pointerId;
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add('is-dragging');
    }

    function onPointerMove(e) {
      if (!dragging || e.pointerId !== activePointerId) return;
      var dx = e.clientX - startX;
      viewport.scrollLeft = startScroll - dx;
    }

    function onPointerUp(e) {
      if (e.pointerId !== activePointerId) return;
      dragging = false;
      activePointerId = null;
      viewport.classList.remove('is-dragging');
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }

    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerUp);

    root.querySelectorAll('.photo-carousel__track img').forEach(function (img) {
      if (img.complete) return;
      img.addEventListener('load', updateArrows, { once: true });
    });

    window.addEventListener('resize', updateArrows, { passive: true });
    updateArrows();
  }

  function init() {
    document.querySelectorAll('[data-photo-carousel]').forEach(initCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

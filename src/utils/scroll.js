/**
 * scroll.js
 * Scroll utilities and intersection observer helpers
 */

/**
 * Setup Intersection Observer for elements
 * @param {string} selector - CSS selector for elements to observe
 * @param {Function} callback - Callback when element intersects
 * @param {Object} options - Intersection Observer options
 */
export function observeElements(selector, callback, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target, entry);
      }
    });
  }, defaultOptions);

  const elements = document.querySelectorAll(selector);
  elements.forEach(el => observer.observe(el));

  return observer;
}

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector or element ID
 */
export function smoothScrollTo(selector) {
  const element = selector.startsWith('#')
    ? document.getElementById(selector.substring(1))
    : document.querySelector(selector);

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Get current scroll position
 * @returns {Object} Current scroll position and percentage
 */
export function getScrollPosition() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  return {
    top: scrollTop,
    percent: scrollPercent,
    height: scrollHeight
  };
}

/**
 * theme.js
 * Theme management utilities (light/dark mode)
 */

const THEME_KEY = 'divine-commentary-theme';

/**
 * Get current theme
 * @returns {string} 'light' or 'dark'
 */
export function getCurrentTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) return savedTheme;

  // Check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Set theme
 * @param {string} theme - 'light' or 'dark'
 */
export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * Toggle between light and dark theme
 * @returns {string} New theme
 */
export function toggleTheme() {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
}

/**
 * Initialize theme
 */
export function initializeTheme() {
  const theme = getCurrentTheme();
  setTheme(theme);
}

/**
 * Update theme toggle button UI
 * @param {HTMLElement} button - Theme toggle button
 */
export function updateThemeButton(button) {
  const theme = getCurrentTheme();
  const icon = button.querySelector('.theme-icon');
  if (icon) {
    icon.textContent = theme === 'light' ? '🌙' : '☀️';
  }
}

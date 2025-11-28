/**
 * api.js
 * API utilities for communicating with AI services
 */

/**
 * Get API key from environment
 * @param {string} provider - 'openai' or 'anthropic'
 * @returns {string} API key
 */
export function getApiKey(provider) {
  const key = provider === 'openai'
    ? import.meta.env.VITE_OPENAI_API_KEY
    : import.meta.env.VITE_ANTHROPIC_API_KEY;

  if (!key) {
    console.warn(`${provider} API key not found in environment`);
  }

  return key;
}

/**
 * Check if feature is enabled
 * @param {string} feature - Feature name
 * @returns {boolean}
 */
export function isFeatureEnabled(feature) {
  const featureMap = {
    chat: import.meta.env.VITE_ENABLE_CHAT,
    commentary: import.meta.env.VITE_ENABLE_COMMENTARY,
    audio: import.meta.env.VITE_ENABLE_AUDIO
  };

  return featureMap[feature] === 'true' || featureMap[feature] === true;
}

/**
 * Make API request to OpenAI
 * @param {string} prompt - User prompt
 * @param {Object} options - Additional options
 * @returns {Promise<string>}
 */
export async function callOpenAI(prompt, options = {}) {
  const apiKey = getApiKey('openai');
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  // TODO: Implement OpenAI API call
  console.log('OpenAI API call:', prompt, options);
  return 'OpenAI response (not implemented)';
}

/**
 * Make API request to Anthropic Claude
 * @param {string} prompt - User prompt
 * @param {Object} options - Additional options
 * @returns {Promise<string>}
 */
export async function callClaude(prompt, options = {}) {
  const apiKey = getApiKey('anthropic');
  if (!apiKey) {
    throw new Error('Anthropic API key not configured');
  }

  // TODO: Implement Anthropic API call
  console.log('Claude API call:', prompt, options);
  return 'Claude response (not implemented)';
}

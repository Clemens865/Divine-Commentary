/**
 * commentary.js
 * Commentary event configuration and audio mappings
 */

export const commentaryEvents = {
  // Scroll events
  SCROLL_START: 'scroll_start',
  SCROLL_SECTION: 'scroll_section',
  SECTION_REVEAL: 'section_reveal',

  // Project events
  PROJECT_HOVER: 'project_hover',
  PROJECT_CLICK: 'project_click',
  PROJECT_REVEAL: 'project_reveal',

  // Chat events
  CHAT_OPEN: 'chat_open',
  CHAT_MESSAGE: 'chat_message',

  // General events
  PAGE_LOAD: 'page_load',
  THEME_TOGGLE: 'theme_toggle'
};

export const commentaryConfig = {
  sports: {
    [commentaryEvents.PAGE_LOAD]: '/audio/sports-announcer/page-load.mp3',
    [commentaryEvents.SCROLL_START]: '/audio/sports-announcer/scroll-start.mp3',
    [commentaryEvents.PROJECT_REVEAL]: '/audio/sports-announcer/project-reveal.mp3',
    [commentaryEvents.CHAT_OPEN]: '/audio/sports-announcer/chat-open.mp3'
  },
  documentary: {
    [commentaryEvents.PAGE_LOAD]: '/audio/documentary/page-load.mp3',
    [commentaryEvents.SCROLL_START]: '/audio/documentary/scroll-start.mp3',
    [commentaryEvents.PROJECT_REVEAL]: '/audio/documentary/project-reveal.mp3',
    [commentaryEvents.CHAT_OPEN]: '/audio/documentary/chat-open.mp3'
  },
  hype: {
    [commentaryEvents.PAGE_LOAD]: '/audio/hype-man/page-load.mp3',
    [commentaryEvents.SCROLL_START]: '/audio/hype-man/scroll-start.mp3',
    [commentaryEvents.PROJECT_REVEAL]: '/audio/hype-man/project-reveal.mp3',
    [commentaryEvents.CHAT_OPEN]: '/audio/hype-man/chat-open.mp3'
  }
};

/**
 * ChatInterface.js
 * Manages the chat interface and AI conversations
 */

export class ChatInterface {
  constructor() {
    this.container = null;
    this.messagesContainer = null;
    this.input = null;
    this.isOpen = false;
  }

  initialize() {
    this.container = document.getElementById('chat-container');
    this.messagesContainer = document.getElementById('chat-messages');
    this.input = document.getElementById('chat-input');

    if (!this.container || !this.messagesContainer || !this.input) {
      console.error('Chat elements not found');
      return;
    }

    this.setupEventListeners();
    console.log('ChatInterface initialized');
  }

  setupEventListeners() {
    // Open chat button
    const openBtn = document.getElementById('open-chat');
    if (openBtn) {
      openBtn.addEventListener('click', () => this.open());
    }

    // Close chat button
    const closeBtn = document.getElementById('close-chat');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Send message button
    const sendBtn = document.getElementById('send-message');
    if (sendBtn) {
      sendBtn.addEventListener('click', () => this.sendMessage());
    }

    // Enter key to send
    if (this.input) {
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
      });
    }
  }

  open() {
    if (this.container) {
      this.container.classList.remove('hidden');
      this.isOpen = true;
      this.input?.focus();
    }
  }

  close() {
    if (this.container) {
      this.container.classList.add('hidden');
      this.isOpen = false;
    }
  }

  sendMessage() {
    if (!this.input) return;

    const message = this.input.value.trim();
    if (!message) return;

    // Add user message to chat
    this.addMessage('user', message);

    // Clear input
    this.input.value = '';

    // TODO: Send to AI and get response
    this.handleAIResponse(message);
  }

  addMessage(role, content) {
    if (!this.messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message chat-message-${role}`;
    messageDiv.textContent = content;

    this.messagesContainer.appendChild(messageDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  async handleAIResponse(userMessage) {
    // TODO: Implement AI API call
    // Placeholder response
    setTimeout(() => {
      this.addMessage('assistant', 'I am the Divine Assistant. Your message has been received.');
    }, 1000);
  }
}

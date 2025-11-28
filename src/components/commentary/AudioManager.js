/**
 * AudioManager.js
 * Handles audio playback, queue management, and volume control
 */

export class AudioManager {
  constructor() {
    this.audio = null;
    this.queue = [];
    this.isPlaying = false;
  }

  initialize() {
    this.audio = document.getElementById('commentary-audio');
    if (!this.audio) {
      console.error('Audio element not found');
      return;
    }

    this.setupEventListeners();
    console.log('AudioManager initialized');
  }

  setupEventListeners() {
    if (!this.audio) return;

    this.audio.addEventListener('ended', () => {
      this.playNext();
    });

    this.audio.addEventListener('error', (e) => {
      console.error('Audio playback error:', e);
      this.playNext();
    });
  }

  play(audioUrl) {
    if (!this.audio) return;

    this.audio.src = audioUrl;
    this.audio.play()
      .then(() => {
        this.isPlaying = true;
      })
      .catch(err => {
        console.error('Error playing audio:', err);
      });
  }

  addToQueue(audioUrl) {
    this.queue.push(audioUrl);
    if (!this.isPlaying) {
      this.playNext();
    }
  }

  playNext() {
    if (this.queue.length === 0) {
      this.isPlaying = false;
      return;
    }

    const nextAudio = this.queue.shift();
    this.play(nextAudio);
  }

  stop() {
    if (!this.audio) return;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }

  clearQueue() {
    this.queue = [];
  }
}

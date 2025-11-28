import './styles/main.css'

/**
 * Divine Commentary - Main Application
 * Sports-style commentary on user interactions
 * Enhanced with voice queuing and idle detection
 */

// ============================================
// Audio Manager - Handles all audio playback
// ============================================
class AudioManager {
  constructor() {
    this.backgroundMusic = document.getElementById('background-music');
    this.commentaryAudio = document.getElementById('commentary-audio');
    this.audioToggle = document.getElementById('audio-toggle');
    this.audioWaveform = document.getElementById('audio-waveform');
    this.audioIconOn = document.getElementById('audio-icon-on');
    this.audioIconOff = document.getElementById('audio-icon-off');

    this.isMuted = true;
    this.isCommentaryPlaying = false;
    this.voiceQueue = []; // Queue for pending voice clips
    this.cooldownDuration = 1000; // 1 second between clips (reduced for more reactivity)
    this.isInCooldown = false;

    this.init();
  }

  init() {
    // Set initial volumes
    if (this.backgroundMusic) {
      this.backgroundMusic.volume = 0.35; // Background music at 35%
    }
    if (this.commentaryAudio) {
      this.commentaryAudio.volume = 0.85; // Commentary at 85%
    }

    // Audio toggle button
    this.audioToggle?.addEventListener('click', () => this.toggleAudio());

    // Commentary end handler - process queue
    this.commentaryAudio?.addEventListener('ended', () => {
      this.isCommentaryPlaying = false;
      this.audioWaveform?.classList.remove('active');
      this.startCooldown();

      // Check if there's a queued clip
      this.processQueue();
    });
  }

  toggleAudio() {
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.backgroundMusic?.pause();
      this.commentaryAudio?.pause();
      this.audioToggle?.classList.add('muted');
      this.audioIconOn?.classList.add('hidden');
      this.audioIconOff?.classList.remove('hidden');
      // Clear queue when muted
      this.voiceQueue = [];
    } else {
      this.backgroundMusic?.play().catch(console.log);
      this.audioToggle?.classList.remove('muted');
      this.audioIconOn?.classList.remove('hidden');
      this.audioIconOff?.classList.add('hidden');
    }
  }

  /**
   * Queue a clip to play - will play immediately if nothing playing,
   * otherwise queued for after current clip ends
   */
  queueCommentary(clipPath, priority = 'normal') {
    if (this.isMuted) return false;

    // High priority clips replace the queue entirely
    if (priority === 'high') {
      this.voiceQueue = [clipPath];
    } else {
      // Normal priority - only queue ONE item max to prevent buildup
      if (this.voiceQueue.length === 0) {
        this.voiceQueue.push(clipPath);
      }
      // If there's already something queued, just ignore this one
    }

    // Try to play immediately
    this.processQueue();
    return true;
  }

  /**
   * Clear the voice queue (use when context changes significantly)
   */
  clearQueue() {
    this.voiceQueue = [];
  }

  /**
   * Process the voice queue
   */
  processQueue() {
    if (this.isMuted || this.isCommentaryPlaying || this.isInCooldown || this.voiceQueue.length === 0) {
      return;
    }

    const clipPath = this.voiceQueue.shift();
    this.playCommentaryDirect(clipPath);
  }

  /**
   * Direct playback (internal use)
   */
  playCommentaryDirect(clipPath) {
    if (this.isMuted || this.isCommentaryPlaying) {
      return false;
    }

    if (this.commentaryAudio) {
      this.commentaryAudio.src = clipPath;
      this.commentaryAudio.play()
        .then(() => {
          this.isCommentaryPlaying = true;
          this.audioWaveform?.classList.add('active');
        })
        .catch(err => {
          console.log('Commentary playback failed:', err);
          this.isCommentaryPlaying = false;
          // Try next in queue on error
          setTimeout(() => this.processQueue(), 500);
        });
    }
    return true;
  }

  /**
   * Immediate playback (bypasses queue, for urgent clips)
   */
  playCommentaryImmediate(clipPath) {
    if (this.isMuted || this.isCommentaryPlaying || this.isInCooldown) {
      return false;
    }
    return this.playCommentaryDirect(clipPath);
  }

  startCooldown() {
    this.isInCooldown = true;
    setTimeout(() => {
      this.isInCooldown = false;
      // Check queue after cooldown
      this.processQueue();
    }, this.cooldownDuration);
  }

  get canPlayCommentary() {
    return !this.isMuted && !this.isCommentaryPlaying && !this.isInCooldown;
  }

  get hasQueueSpace() {
    return this.voiceQueue.length < 2;
  }
}

// ============================================
// Commentary Engine - Manages clip selection
// ============================================
class CommentaryEngine {
  constructor(audioManager) {
    this.audioManager = audioManager;
    this.isEnabled = false;
    this.currentSection = null;
    this.currentProject = null;
    this.playedClips = new Map(); // Track played clips per context
    this.lastInteractionTime = Date.now();
    this.idleTimer = null;
    this.idleDelay = 5000; // 5 seconds of idle triggers ambient commentary

    // All 12 projects
    this.projectList = [
      'universe', 'earth', 'platypus', 'sunsets', 'brain', 'aurora',
      'dreams', 'mountains', 'coffee', 'dogs', 'fibonacci', 'sleep'
    ];
  }

  /**
   * Get clip path based on actual file structure
   * Structure: /audio/sports-announcer/{section}/{section}-{context}-{type}-{number}.mp3
   */
  getClipPath(section, context, type, number) {
    return `/audio/sports-announcer/${section}/${section}-${context}-${type}-${number}.mp3`;
  }

  /**
   * Get project clip path
   * Structure: /audio/sports-announcer/projects/projects-{project}-{type}-{number}.mp3
   */
  getProjectClipPath(project, type, number) {
    return `/audio/sports-announcer/projects/projects-${project}-${type}-${number}.mp3`;
  }

  enable() {
    this.isEnabled = true;
    this.startIdleTracking();
  }

  disable() {
    this.isEnabled = false;
    this.stopIdleTracking();
  }

  /**
   * Track user activity and trigger idle commentary
   */
  startIdleTracking() {
    this.resetIdleTimer();
  }

  stopIdleTracking() {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
  }

  resetIdleTimer() {
    this.lastInteractionTime = Date.now();

    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }

    if (!this.isEnabled) return;

    this.idleTimer = setTimeout(() => {
      this.onIdle();
    }, this.idleDelay);
  }

  /**
   * Called when user is idle - play contextual commentary
   */
  onIdle() {
    if (!this.isEnabled) return;

    // Play section-specific idle commentary
    if (this.currentSection) {
      // For projects section, sometimes play a random project commentary
      if (this.currentSection === 'projects' && Math.random() > 0.4) {
        this.playRandomProjectIdle();
      } else {
        this.playSectionIdle(this.currentSection);
      }
    }

    // Reset timer for next idle commentary (6-10 seconds random interval)
    const nextIdleDelay = 6000 + Math.random() * 4000;
    this.idleTimer = setTimeout(() => {
      this.onIdle();
    }, nextIdleDelay);
  }

  /**
   * Play random project commentary during idle on projects section
   */
  playRandomProjectIdle() {
    const randomProject = this.projectList[Math.floor(Math.random() * this.projectList.length)];
    const clipNum = this.getRandomClipNumber(3, `idle-project-${randomProject}`);
    const clipPath = this.getProjectClipPath(randomProject, 'hover', clipNum);
    this.audioManager.queueCommentary(clipPath, 'normal');
  }

  /**
   * Play section-specific idle commentary using enter clips
   */
  playSectionIdle(section) {
    // For projects section, mix between section enter clips and random project clips
    if (section === 'projects') {
      // 40% chance to play a projects-enter clip, 60% random project
      if (Math.random() < 0.4) {
        const clipNum = this.getRandomClipNumber(6, 'projects-enter-idle');
        const clipPath = `/audio/sports-announcer/projects/projects-enter-${clipNum}.mp3`;
        this.audioManager.queueCommentary(clipPath, 'normal');
      } else {
        this.playRandomProjectIdle();
      }
      return;
    }

    // Use enter clips for idle commentary (these are section-specific)
    const sectionClips = {
      hero: { type: 'enter', count: 8 },
      process: { type: 'enter', count: 4 },
      awards: { type: 'enter', count: 5 },
      testimonials: { type: 'enter', count: 4 },
      about: { type: 'enter', count: 5 },
      faq: { type: 'question-click', count: 7 },
      contact: { type: 'form-focus', count: 4 }
    };

    const config = sectionClips[section];
    if (!config) {
      // Fallback to generic idle clips
      const clipNum = this.getRandomClipNumber(4, 'generic-idle');
      const clipPath = `/audio/sports-announcer/generic/generic-idle-${clipNum}.mp3`;
      this.audioManager.queueCommentary(clipPath, 'normal');
      return;
    }

    const clipNum = this.getRandomClipNumber(config.count, `${section}-idle`);
    const clipPath = `/audio/sports-announcer/${section}/${section}-${config.type}-${clipNum}.mp3`;

    this.audioManager.queueCommentary(clipPath, 'normal');
  }

  /**
   * Play section viewport/enter commentary (legacy - kept for compatibility)
   */
  playSectionViewport(section) {
    this.playSectionIdle(section);
  }

  /**
   * Register user interaction (resets idle timer)
   */
  registerInteraction() {
    this.resetIdleTimer();
  }

  /**
   * Play project-specific clip (hover, click, viewport)
   */
  playProjectClip(project, type) {
    if (!this.isEnabled) return;
    this.registerInteraction();

    // Clip counts: hover=3, click=3, viewport=1
    const counts = { hover: 3, click: 3, viewport: 1 };
    const count = counts[type] || 3;

    const clipNum = this.getRandomClipNumber(count, `project-${project}-${type}`);
    const clipPath = this.getProjectClipPath(project, type, clipNum);

    // Hover uses queue, click is high priority
    const priority = type === 'click' ? 'high' : 'normal';
    this.audioManager.queueCommentary(clipPath, priority);
  }

  /**
   * Play opening commentary when user first enables
   */
  playOpeningGreeting() {
    if (!this.isEnabled) return;

    // Use hero-enter clips for the opening (8 available)
    const clipNum = this.getRandomClipNumber(8, 'opening-greeting');
    const clipPath = `/audio/sports-announcer/hero/hero-enter-${clipNum}.mp3`;

    // Play immediately with high priority
    this.audioManager.queueCommentary(clipPath, 'high');
  }

  /**
   * Play section entry clip
   */
  playSectionEnter(section) {
    if (!this.isEnabled) return;
    this.registerInteraction();
    this.currentSection = section;

    // Clear any queued clips when entering a new section to prevent chaos
    this.audioManager.clearQueue();

    // Section enter clips - use {section}-enter-{n}.mp3 format
    const enterCounts = {
      hero: 8,
      projects: 6,  // Now has projects-enter clips
      process: 4,
      awards: 5,
      testimonials: 4,
      about: 5,
      faq: 7,       // Uses faq-question-click for entering FAQ
      contact: 4
    };

    const count = enterCounts[section] || 4;
    const clipNum = this.getRandomClipNumber(count, `${section}-section-enter`);

    // FAQ section uses question-click clips, others use enter
    const clipType = section === 'faq' ? 'question-click' : 'enter';
    const clipPath = `/audio/sports-announcer/${section}/${section}-${clipType}-${clipNum}.mp3`;

    this.audioManager.queueCommentary(clipPath, 'high');
  }

  /**
   * Play generic interaction clips (hover on awards, process steps, etc.)
   */
  playGenericHover(section, element) {
    if (!this.isEnabled) return;
    this.registerInteraction();

    // Map elements to clip paths
    const hoverConfigs = {
      'award-card': { section: 'awards', context: 'hover', count: 3 },
      'testimonial-card': { section: 'testimonials', context: 'hover', count: 3 },
      'process-step': { section: 'process', context: 'hover', count: 3 },
      'skill-item': { section: 'about', context: 'hover', count: 3 },
      'contact-method': { section: 'contact', context: 'hover', count: 3 },
      'faq-item': { section: 'faq', context: 'question-click', count: 7 }
    };

    const config = hoverConfigs[element];
    if (!config) return;

    const clipNum = this.getRandomClipNumber(config.count, `${config.section}-${element}`);
    const clipPath = `/audio/sports-announcer/${config.section}/${config.section}-${config.context}-${clipNum}.mp3`;

    this.audioManager.queueCommentary(clipPath, 'normal');
  }

  /**
   * Get random clip number, avoiding recently played
   */
  getRandomClipNumber(max, contextKey) {
    if (!this.playedClips.has(contextKey)) {
      this.playedClips.set(contextKey, new Set());
    }

    const played = this.playedClips.get(contextKey);
    const available = [];

    for (let i = 1; i <= max; i++) {
      if (!played.has(i)) {
        available.push(i);
      }
    }

    // Reset if all played
    if (available.length === 0) {
      played.clear();
      for (let i = 1; i <= max; i++) {
        available.push(i);
      }
    }

    const chosen = available[Math.floor(Math.random() * available.length)];
    played.add(chosen);
    return chosen;
  }
}

// ============================================
// Scroll Observer - Detects section visibility
// ============================================
class ScrollObserver {
  constructor(commentaryEngine) {
    this.commentaryEngine = commentaryEngine;
    this.currentSection = null;
    this.lastScrollY = 0;
    this.scrollVelocity = 0;
    this.init();
  }

  init() {
    // Intersection Observer for sections
    const options = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target.dataset.commentary;
          if (section && section !== this.currentSection) {
            this.onSectionEnter(section);
          }
        }
      });
    }, options);

    // Observe all sections
    document.querySelectorAll('[data-commentary]').forEach(section => {
      observer.observe(section);
    });

    // Scroll animation observer
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up, .scale-in').forEach(el => {
      animationObserver.observe(el);
    });

    // Scroll tracking for idle reset
    window.addEventListener('scroll', () => {
      this.commentaryEngine.registerInteraction();

      const nav = document.getElementById('nav');
      if (window.scrollY > 100) {
        nav?.classList.add('scrolled');
      } else {
        nav?.classList.remove('scrolled');
      }
    });
  }

  onSectionEnter(section) {
    this.currentSection = section;
    this.commentaryEngine.playSectionEnter(section);
  }
}

// ============================================
// Interaction Handler - Manages user events
// ============================================
class InteractionHandler {
  constructor(commentaryEngine) {
    this.commentaryEngine = commentaryEngine;
    this.init();
  }

  init() {
    // Project card interactions
    document.querySelectorAll('.project-card').forEach(card => {
      const project = card.dataset.project;

      card.addEventListener('mouseenter', () => {
        this.commentaryEngine.playProjectClip(project, 'hover');
      });

      card.addEventListener('click', () => {
        this.commentaryEngine.playProjectClip(project, 'click');
      });
    });

    // Award card hovers
    document.querySelectorAll('.award-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.commentaryEngine.playGenericHover('awards', 'award-card');
      });
    });

    // Testimonial hovers
    document.querySelectorAll('.testimonial-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.commentaryEngine.playGenericHover('testimonials', 'testimonial-card');
      });
    });

    // Process step hovers
    document.querySelectorAll('.process-step').forEach(step => {
      step.addEventListener('mouseenter', () => {
        this.commentaryEngine.playGenericHover('process', 'process-step');
      });
    });

    // FAQ interactions
    document.querySelectorAll('.faq-item').forEach(item => {
      const button = item.querySelector('.faq-question');
      button?.addEventListener('click', () => {
        item.classList.toggle('open');
        this.commentaryEngine.playGenericHover('faq', 'faq-item');
      });
    });

    // CTA button hovers
    document.querySelectorAll('.hero-cta .btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        this.commentaryEngine.registerInteraction();
      });
    });

    // Contact method hovers
    document.querySelectorAll('.contact-method').forEach(method => {
      method.addEventListener('mouseenter', () => {
        this.commentaryEngine.playGenericHover('contact', 'contact-method');
      });
    });

    // Skills list hovers
    document.querySelectorAll('.skills-list li').forEach(skill => {
      skill.addEventListener('mouseenter', () => {
        this.commentaryEngine.playGenericHover('about', 'skill-item');
      });
    });

    // Mouse movement resets idle timer
    document.addEventListener('mousemove', () => {
      this.commentaryEngine.registerInteraction();
    });

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    navToggle?.addEventListener('click', () => {
      navMenu?.classList.toggle('open');
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        navMenu?.classList.remove('open');
      });
    });

    // Active nav link tracking
    this.trackActiveNavLink();
  }

  trackActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
}

// ============================================
// Commentary Toggle Controller
// ============================================
class CommentaryController {
  constructor(commentaryEngine, audioManager) {
    this.commentaryEngine = commentaryEngine;
    this.audioManager = audioManager;
    this.toggleBtn = document.getElementById('commentary-toggle');
    this.statusIndicator = document.getElementById('status-indicator');
    this.statusText = document.getElementById('status-text');
    this.isActive = false;

    this.init();
  }

  init() {
    this.toggleBtn?.addEventListener('click', () => this.toggle());
  }

  toggle() {
    this.isActive = !this.isActive;

    if (this.isActive) {
      // Enable commentary
      this.commentaryEngine.enable();

      // Also unmute audio if muted
      if (this.audioManager.isMuted) {
        this.audioManager.toggleAudio();
      }

      this.toggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
        Disable Commentary
      `;
      this.statusIndicator?.classList.add('active');
      if (this.statusText) this.statusText.textContent = 'Commentary Active';

      // Play opening greeting immediately
      setTimeout(() => {
        this.commentaryEngine.playOpeningGreeting();
      }, 300);
    } else {
      // Disable commentary
      this.commentaryEngine.disable();

      this.toggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
        Enable Commentary
      `;
      this.statusIndicator?.classList.remove('active');
      if (this.statusText) this.statusText.textContent = 'Commentary Off';
    }
  }
}

// ============================================
// Initialize Application
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Divine Commentary - Initializing...');

  // Initialize managers
  const audioManager = new AudioManager();
  const commentaryEngine = new CommentaryEngine(audioManager);
  const scrollObserver = new ScrollObserver(commentaryEngine);
  const interactionHandler = new InteractionHandler(commentaryEngine);
  const commentaryController = new CommentaryController(commentaryEngine, audioManager);

  // Add visible class to hero elements immediately
  setTimeout(() => {
    document.querySelectorAll('.hero .fade-in-up').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);

  console.log('Divine Commentary - Ready!');
});

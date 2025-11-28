# Divine Commentary - God's Portfolio Website

An interactive portfolio website featuring AI-powered sports-style commentary as users browse through divine creations. Experience the Almighty's greatest works with enthusiastic play-by-play narration!

## Live Demo

**[View Live Demo](https://clemens865.github.io/Divine-Commentary/)**

No setup required - just click and experience!

## Features

- **Sports Announcer Commentary**: 221 AI-generated voice clips (ElevenLabs Adam voice) providing energetic play-by-play commentary
- **Interactive Experience**: Commentary triggers on hover, click, scroll, and idle states
- **Voice Queue System**: Smart queuing with priority levels prevents audio chaos
- **Idle Detection**: Contextual commentary plays every 6-10 seconds when idle on a section
- **Animated Starfield**: Multi-layer parallax stars, shooting stars, and nebula glow effects
- **Background Music**: "Celestial Workshop" ambient track at 35% volume
- **12 Divine Projects**: Universe, Earth, Platypus, Sunsets, Human Brain, Dreams, Aurora Borealis, Mountains, Coffee, Dogs, Fibonacci Sequence, and Sleep
- **Responsive Design**: Works on desktop and mobile

## Quick Start

### Option 1: View Online
Visit the [live demo](https://clemens865.github.io/Divine-Commentary/) - no installation needed!

### Option 2: Run Locally

```bash
# Clone the repository
git clone https://github.com/Clemens865/Divine-Commentary.git
cd Divine-Commentary

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:3000` in your browser.

**No API keys required!** All audio and images are pre-generated and included.

## How It Works

1. Click "Enable Commentary" to start the experience
2. Browse the portfolio - commentary plays as you interact
3. Hover over projects to hear divine insights
4. Stay idle on a section for automatic commentary
5. Background music plays alongside the voice

## Project Structure

```
divine-commentary/
├── public/
│   ├── audio/
│   │   ├── sports-announcer/     # 221 commentary clips
│   │   │   ├── hero/             # Opening greetings
│   │   │   ├── projects/         # Project-specific clips
│   │   │   ├── about/            # About section
│   │   │   └── ...
│   │   └── background-music-celestial.mp3
│   └── images/                   # AI-generated project images
├── src/
│   ├── components/
│   │   ├── commentary/           # Audio engine & commentary logic
│   │   └── chat/                 # Chat interface (future)
│   ├── data/                     # Project configurations
│   ├── styles/                   # CSS with starfield animations
│   └── main.js                   # Main application
├── index.html
└── vite.config.js
```

## Tech Stack

- **Vite** - Build tool and dev server
- **Vanilla JavaScript** - No framework dependencies
- **CSS Animations** - Starfield, shooting stars, nebula effects
- **Web Audio API** - Audio playback with volume control
- **Intersection Observer** - Section detection for contextual commentary

## Audio Generation (For Developers)

The audio clips were generated using ElevenLabs API with the "Adam" voice. If you want to regenerate or add new clips, see the `audio-generator` folder in the parent directory.

## Building for Production

```bash
npm run build
npm run preview  # Preview production build
```

## License

Copyright Eternity - All rights reserved across all dimensions.

## Credits

- Voice Generation: [ElevenLabs](https://elevenlabs.io/) (Adam voice)
- Image Generation: Google Gemini
- Built with assistance from Claude (Anthropic)

---

*"And on the eighth day, God created a portfolio website with sports commentary. And it was INCREDIBLE!"*

# Divine Commentary - God's Portfolio Website

An interactive portfolio website featuring AI-powered live commentary as users browse through divine creations.

## Features

- **Live Commentary System**: AI-generated commentary in three styles:
  - Sports Announcer (energetic play-by-play)
  - Documentary Narrator (thoughtful and informative)
  - Hype Man (pure enthusiasm)

- **Interactive Chat**: Chat with the divine using AI
- **Portfolio Showcase**: Browse notable creations (Universe, Earth, Humanity, etc.)
- **Smooth Animations**: Scroll-triggered reveals and transitions
- **Light/Dark Theme**: Toggle between heavenly light and mysterious dark modes

## Project Structure

```
divine-commentary/
├── public/
│   ├── audio/                    # Commentary audio files
│   │   ├── sports-announcer/
│   │   ├── documentary/
│   │   └── hype-man/
│   └── images/                   # Project and UI images
│       ├── hero/
│       ├── projects/
│       ├── sections/
│       └── ui/
├── src/
│   ├── components/
│   │   ├── commentary/           # Commentary engine
│   │   ├── chat/                 # Chat interface
│   │   └── portfolio/            # Project cards
│   ├── data/                     # Project data and config
│   ├── styles/                   # CSS styles
│   └── utils/                    # Utilities
├── index.html
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your API keys to `.env`:
   ```
   VITE_OPENAI_API_KEY=your_key_here
   VITE_ANTHROPIC_API_KEY=your_key_here
   ```

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Configuration

### Commentary Styles

Edit `src/data/commentary.js` to configure commentary events and audio mappings.

### Projects

Edit `src/data/projects.js` to add or modify portfolio projects.

### Theme

Customize colors and styles in `src/styles/main.css` using CSS custom properties.

## Audio Files

Place your audio commentary files in:
- `public/audio/sports-announcer/`
- `public/audio/documentary/`
- `public/audio/hype-man/`

Supported formats: MP3, WAV, OGG

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_OPENAI_API_KEY` | OpenAI API key | - |
| `VITE_ANTHROPIC_API_KEY` | Anthropic Claude API key | - |
| `VITE_ENABLE_CHAT` | Enable chat feature | `true` |
| `VITE_ENABLE_COMMENTARY` | Enable commentary | `true` |
| `VITE_ENABLE_AUDIO` | Enable audio playback | `true` |

## Tech Stack

- **Vite** - Build tool and dev server
- **Vanilla JavaScript** - No framework dependencies
- **CSS Custom Properties** - Theming and design system
- **Intersection Observer API** - Scroll-triggered animations
- **Web Audio API** - Audio playback

## License

Copyright Eternity - All rights reserved across all dimensions.

## Contributing

Suggestions for improving creation are welcome, though perfection is hard to improve upon.

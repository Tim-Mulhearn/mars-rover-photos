# Mars Rover Photos

Free to use.

## What I built
- Single-page Vue 3 app that shows Mars rover images.
- Weekly feed: **last 7 sols × up to 3 photos/sol**, merged into one array per active rover.
- Hero slideshow on the home view: autoplay (~5s), hover-pause, keyboard ←/→.
- Gallery grid with lightbox modal **and its own slideshow** (built with help from ChatGPT).
- “Random Photo” picks from Perseverance + Curiosity and opens the modal.
- Rover manifest panels for all four rovers; active vs. historic sections.
- 24-hour `localStorage` caching of API responses.
- Theme via CSS variables (orange/red/maroon palette).
- Basic a11y: roles/labels, ESC to close modal, focus management on open.
- Simple, responsive layout.

## Run
- Add your NASA API key in `index.html` (search for `api_key`): const api_key = 'DEMO_KEY'
- Open `index.html` in any browser (or use a simple local server). No build step required.

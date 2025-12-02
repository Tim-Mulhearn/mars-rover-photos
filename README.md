# Mars Rover Photos

Built with vue 3, free to use.

## NOTE
- The API has been discontinued by NASA, so for demo purposes, im hardcoding data.
  
## What I built
- Single-page Vue 3 app that shows Mars rover images.
- Shows images from the latest sol for each rover.
- Hero slideshow on the home view: autoplay (~5s), hover-pause, keyboard ←/→.
- Gallery grid with lightbox modal **and its own slideshow** (built with help from ChatGPT).
- “Random” picks from Perseverance + Curiosity and opens the modal.
- Rover manifest panels for all four rovers; active vs. historic sections.
- 24-hour `localStorage` caching of API responses.
- Basic a11y: roles/labels, ESC to close modal, focus management on open.
- Simple, responsive layout.

## Run
- Edit index.html.
- Comment out the functions: NETLIFY VERSION , NETLIFY HELPER
- Uncomment the function: DATA FETCH
- Add your NASA - API key (search for `api_key`): const api_key = 'DEMO_KEY', or just use DEMO_KEY(limited calls).
- Open `index.html` in any browser (or use a simple local server). No build step required.

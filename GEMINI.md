# Mohamed Elnagar Portfolio

A high-performance, professional web portfolio for mobile developers, built with vanilla HTML, CSS, and JavaScript. This project serves as a modern showcase for Android and Flutter development expertise, featuring a responsive design, dark/light mode, and dynamic project rendering.

## Project Overview

*   **Tech Stack:** Vanilla HTML5, CSS3, ES6+ JavaScript.
*   **Key Libraries:**
    *   **AOS (Animate On Scroll):** For entrance animations.
    *   **Typed.js:** For the hero section typing effect.
    *   **FontAwesome:** For iconography.
*   **Architecture:**
    *   **Modular CSS:** Styles are organized using a component-based directory structure (`css/base`, `css/components`, `css/layout`, etc.).
    *   **Data-Driven Projects:** Project data is decoupled from the UI and fetched dynamically from an external JSON source (GitHub Gist).
    *   **PWA Ready:** Includes a `manifest.json` and service worker considerations for installability.
    *   **SEO Optimized:** Comprehensive meta tags, Open Graph support, and JSON-LD schema for personal branding.

## Directory Structure

*   `index.html`: Main entry point containing structural layout and hardcoded personal sections.
*   `main.js`: Handles global initializations (AOS, Typed.js), theme toggling, and scroll behaviors.
*   `project_management.js`: Core logic for fetching and rendering project cards from a JSON feed.
*   `css/`:
    *   `base/`: Reset styles and global CSS variables (`variables.css`).
    *   `components/`: Reusable UI elements (buttons, cards, modals, etc.).
    *   `layout/`: Structural styles for header, nav, and sections.
    *   `media_queries/`: Responsive design breakpoints.

## Building and Running

Since this is a static site, no complex build process is required.

*   **Development:** Open `index.html` directly in any modern web browser or use a simple local server (e.g., VS Code "Live Server" extension or `npx serve .`).
*   **Deployment:** Host the root directory on any static hosting provider (GitHub Pages, Vercel, Netlify).

## Development Conventions

*   **Theming:** All colors and theme-specific properties must use CSS variables defined in `css/base/variables.css`.
*   **Modularity:** New UI components should be added as separate files in `css/components/` and linked in `index.html`.
*   **Data Handling:** Update the projects list by modifying the external JSON Gist linked in `project_management.js`.
*   **Responsive Design:** Always verify changes against the `responsive.css` breakpoints to ensure mobile compatibility.

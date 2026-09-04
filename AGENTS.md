Whatever actions you can do by yourself, please do it yourself. This includes starting app and verification

# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vite-powered React portfolio. Application code lives in `src/`: route-level views are in `src/pages/`, reusable UI is grouped under `src/components/`, routing and providers begin in `src/app/App.jsx`, and shared content and helpers live in `src/data/` and `src/utils/`. The browser entry point is `src/main.jsx`. Keep theme state in `src/context/` and reusable icons in `src/icons/`. Imported design imagery belongs in `src/images/`; files that must retain their public URL, such as gallery photos and favicons, belong in `public/`.

## Build, Test, and Development Commands

- `npm ci` installs the exact dependency versions recorded in `package-lock.json`.
- `npm run dev` starts the Vite development server with hot reloading. `npm start` is an alias.
- `npm run build` creates an optimized production bundle in `dist/` and catches compilation errors.
- `npm run preview` serves the production bundle locally for final verification.

Run commands from the repository root. Do not commit generated `dist/` output or `node_modules/`.

## Coding Style & Naming Conventions

Use two-space indentation, double quotes, semicolons, and functional React components. Name components and page files in PascalCase (`ProjectCard.jsx`), utilities in camelCase (`formatDate.js`), and module-level constants in uppercase snake case (`SOCIAL_POSITIONS`). Keep route components in `pages` and extract repeated UI into the closest `components` subdirectory. Prefer Tailwind utility classes for styling; add global CSS to `src/index.css` only for base rules or genuinely shared utilities. Preserve the existing mobile-first responsive and `dark:` class patterns. No standalone formatter or linter is configured, so match surrounding code closely.

## Testing Guidelines

There is currently no automated test script or test framework configured. For every change, run `npm run build` and manually verify affected routes at mobile and desktop widths, including light/dark themes, navigation, animation, and image loading. If tests are introduced, use colocated files such as `ComponentName.test.jsx` and add the corresponding test script.

## Commit & Pull Request Guidelines

Existing commits use brief action summaries such as `add favicon and nav padding` and `updated about page`. Continue with concise, imperative, lowercase subjects that describe one logical change. Pull requests should explain the user-visible result, identify affected routes, list verification performed, and link related issues. Include before/after screenshots or a short recording for visual, responsive, or animation changes. Keep unrelated refactors out of the same pull request.

# Library and Third-Party API Rules

## Dependency Policy

- Check `package.json` before importing a package.
- Prefer installed dependencies and browser APIs.
- Add a dependency only when it removes meaningful complexity, has acceptable maintenance health, and fits the performance budget.
- Record every new dependency and its purpose in this file.
- Do not mix multiple libraries that own the same animation or UI responsibility.
- Do not import an entire package when a documented narrow import is available.
- Lock versions through `package-lock.json`.
- Do not add CDN scripts directly to `public/index.html` without approval.

## Approved Current Libraries

### React

Purpose: component composition and state.

Rules:

- Use functional components.
- Keep state local by default.
- Avoid state for continuous animation values.
- Effects must include cleanup.
- Use `React.lazy` and `Suspense` for route-level code splitting.

### React Router

Purpose: canonical URL state and navigation.

Rules:

- `/life` is a real route, not a display-only boolean.
- Use router navigation for committed side changes.
- Preserve browser history behavior.
- Do not reach into router internals.
- A direct route refresh must work.

### Framer Motion

Purpose: existing page transitions, micro-interactions, and the layered vertical portfolio transition.

Rules:

- Use the installed package. Do not add GSAP for the portfolio wipe.
- Use `useMotionValue` and transforms for pointer progress.
- Use `useReducedMotion` for all non-trivial motion.
- Do not animate `top`, `left`, `width`, or `height` during the portfolio wipe.
- Avoid `layout` on static elements.
- Unsubscribe from motion value listeners.
- Keep animated surfaces isolated from the full React tree.

### Tailwind CSS 3.4

Purpose: layout, responsive styling, and ordinary visual states.

Rules:

- Follow the existing Tailwind 3 configuration.
- Do not use Tailwind 4-only syntax.
- Prefer shared semantic CSS variables for lifestyle colors.
- Add utilities to global CSS only when they are genuinely reused.
- Keep explicit responsive collapse classes beside the relevant component.

## Browser APIs

### Pointer Events

- Use Pointer Events rather than separate mouse and touch implementations.
- Capture the active pointer during drag.
- Release pointer capture on completion, cancellation, and unmount.
- Clicking remains the reliable fallback.

### Intersection Observer

- Allowed for lightweight media activation and section observation.
- Reuse observers when practical.
- Disconnect on unmount.
- Do not use scroll event listeners for visibility detection.

### `requestIdleCallback`

- May be used as an optional prefetch optimization.
- Always provide a timeout and a browser fallback.
- Never block navigation on idle work.

### Web Storage

- Use only for small preferences or optional previous-route restoration.
- Do not store personal content or large payloads.
- Storage access must fail safely.

## Image and Media APIs

- Prefer project-owned optimized files.
- Remote media requires stable HTTPS URLs, rights review, dimensions, and a fallback.
- Do not hotlink poster or game artwork from unstable sources.
- Do not load media from a third party before it is required.
- Avoid autoplay audio and video.
- The existing background music behavior should initialize audio only after user intent during the performance phase.

## Third-Party Content APIs

No third-party content API is approved for release one.

Potential future integrations such as Letterboxd, IMDb alternatives, Steam, PlayStation, Xbox, Strava, Google Maps, or travel services require a separate review covering:

- Official API availability and terms.
- Authentication and secret handling.
- Rate limits and caching.
- Data ownership and user consent.
- Client bundle impact.
- Failure and offline behavior.
- Attribution requirements.
- Whether a static local record is simpler and more reliable.

API secrets must never be placed in Vite client environment variables or committed files. Any variable prefixed with `VITE_` is exposed to browser code.

## Maps

- No interactive map library in release one.
- Use an editorial location list, static map image, or simple CSS layout if needed.
- Do not download a large mapping runtime for decorative geography.

## Icon Libraries

The repository currently contains a local icon module with several custom SVG components. Preserve it for existing features.

For new lifestyle icons:

- Prefer one maintained icon family if icons are necessary.
- Do not mix multiple new icon families.
- Do not hand-draw complex SVG paths.
- If no new dependency is approved, prefer text labels over adding decorative icons.

## Adding a New Library

Before installation, document:

1. The user-facing behavior it enables.
2. Why browser APIs and current libraries are insufficient.
3. Expected compressed bundle cost.
4. Maintenance and license status.
5. Accessibility implications.
6. Loading strategy.
7. Removal or fallback plan.

Then install it through npm so the lockfile remains authoritative.

## Prohibited for the Current Scope

- Three.js.
- Page-turning packages.
- Canvas rendering frameworks.
- GSAP solely for the portfolio transition.
- Full interactive map libraries.
- Autoplay video libraries.
- Client-side database SDKs.
- Analytics or tracking packages without explicit approval.

## Documentation Sources

- Prefer official library documentation and primary sources.
- Confirm examples match installed major versions.
- Record any version-specific workaround near the code and in this file.
- Do not copy undocumented snippets into production behavior.

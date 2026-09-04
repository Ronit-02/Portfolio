# Architecture

## Current Stack

- React 18
- Vite 8 with `@vitejs/plugin-react`
- React Router
- Tailwind CSS 3.4
- Framer Motion 11
- Static local data and media
- No backend or database

## Architectural Goal

Support two portfolio modes in one application while preserving the existing professional site. Cross-mode navigation must feel like one page layer being removed to expose another, without permanently mounting two applications or adding another animation dependency.

## System Boundaries

### App shell

`src/app/App.jsx` owns routing, route composition, cross-portfolio transition state, and the final navigation commit.

### Professional portfolio

Existing pages, data, bottom navigation, project routes, blog routes, and theme behavior remain intact.

### Personal portfolio

`src/pages/LifeHomePage.jsx` is currently a temporary destination. It matches the existing design language and intentionally contains no final lifestyle architecture.

### Top navigation

`src/components/layout/TopNav.jsx` owns the shared Ronit identity, location treatment, and semantic top-center portfolio pull handle.

### Layer transition

`src/components/layout/PortfolioLayerTransition.jsx` owns:

- The temporary fixed outgoing page layer.
- Body scroll locking while it moves.
- Stationary layer removal through an animated clip.
- The restrained one-pixel moving boundary.
- Reduced-motion behavior.
- Completion notification.

It does not own router navigation or destination content.

## Current Folder Structure

```text
src/
  app/
    App.jsx
  components/
    layout/
      TopNav.jsx
      BottomNav.jsx
      PortfolioLayerTransition.jsx
  pages/
    HomePage.jsx
    LifeHomePage.jsx
    existing pages...
  context/
    ThemeContext.jsx
  data/
  images/
```

Future personal content modules may be added under `src/data/life/` and `src/components/life/` only after the transition is approved.

## Transition Rendering Model

### Resting state

Only the active portfolio route is mounted. The top-center pull handle is part of the shared navigation.

### Transition start

1. `AppInner` records both the origin and destination locations.
2. The destination portfolio replaces the base rendering layer immediately.
3. An exact rendering of the origin route is mounted above it in a fixed viewport layer.
4. Both switch controls are disabled until the transition completes.

### Reveal

1. The outgoing layer remains fixed at its original coordinates and fully covers the destination.
2. Its `clip-path` animates from a full rectangle to a fully inset rectangle.
3. The destination is progressively exposed from the top edge without translating either page.
4. A restrained one-pixel accent boundary travels with the reveal.
5. The pull handle supports both click and a short downward drag gesture.

### Commit

1. The transition component reports animation completion.
2. `AppInner` navigates to the already-visible destination route.
3. The temporary outgoing layer unmounts after a short settling interval.
4. Body scrolling is restored.

## Data Flow

```text
TopNav arrow click
        |
        v
AppInner transition state
        |
        +--> origin location --> fixed outgoing layer --> clip-path sweep
        |
        +--> destination location --> base portfolio rendering
        |
        +--> onComplete --> React Router navigate --> remove outgoing layer
```

## State Ownership

- Current route: React Router.
- Global theme: existing `ThemeContext`.
- Transition origin, destination, and active state: local state in `AppInner`.
- Animation progress: internal Framer Motion timeline, not React state per frame.
- Personal content: static temporary content for the current milestone.

## Database Schema

No database is in scope. The current transition and temporary page require no persistent data.

Future personal entries may use `LifeEntry` and `LifeMedia` domain types, but those types should not be added until personal content development begins.

## Invariants

- `/life` always works as a direct route.
- Existing professional route paths and labels remain unchanged.
- The destination is present beneath the outgoing page before movement begins.
- Only one temporary outgoing application tree is added during transition.
- The temporary transition layer is pointer-inert.
- Body scrolling is restored on completion or unmount.
- The top-center pull handle is a semantic button with a visible focus state.
- Clicking or pulling the handle downward triggers the same transition.
- The destination route is committed only after the visual removal completes.
- Reduced motion replaces vertical travel with a short opacity dissolve.
- No scroll listener, canvas, WebGL, GSAP, clip-path choreography, or page-turn package is used.
- Light and dark themes remain synchronized because both layers share the existing theme root.
- The professional bottom navigation does not appear on `/life`.

## Error and Loading Boundaries

- The temporary `/life` page has no external loading dependency.
- A transition interruption leaves a complete route tree visible.
- Future lazy-loading must prepare the destination before starting the outgoing motion.

## Performance Boundaries

- No new runtime dependency.
- One fixed outgoing layer for less than approximately 1.1 seconds.
- One full-screen clip animation and one one-pixel boundary transform.
- No media is required by the temporary personal home.
- Transition duration: 960ms plus a short route-settle interval.
- Reduced-motion duration: 200ms plus route settling.

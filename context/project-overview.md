# Project Overview

## Project

Ronit Khatri Portfolio is a two-mode personal website. The existing professional portfolio presents Ronit's design and development work. A second portfolio at `/life` will eventually present sports, games, travel, movies and series, events, photography, and other interests.

The two modes use the same product language. The existing layout, Satoshi typography, Ronit signature, light and dark surfaces, blue accent, rounded controls, and motion character are preserved. The personal portfolio may later introduce small changes in color, typography, or structure, but it must remain recognizably part of the same website.

## Current Milestone

Only the portfolio-switch transition is being developed and reviewed.

- A quiet pull handle sits at the center of the top edge.
- Clicking it mounts the destination portfolio beneath the current page.
- The current page stays fixed while a boundary masks it away from top to bottom.
- The destination page is revealed progressively from the top edge.
- Navigation commits after the animation finishes.
- `/life` currently contains a temporary same-design home page.
- The full personal portfolio is blocked until the transition is approved.

## Problem It Solves

The work portfolio explains what Ronit creates, but it does not fully communicate what shapes his personality and interests. The second mode creates room for that story without adding unrelated content to the professional navigation.

The transition provides a memorable relationship between the two portfolios while remaining lightweight. It uses one temporary fixed outgoing layer, one animated clip, and a one-pixel moving boundary. It does not use canvas, WebGL, page-turn libraries, autoplay video, or permanent duplicate application trees.

## Target Users

- Recruiters and hiring managers who want a fuller sense of Ronit's personality.
- Potential collaborators and clients evaluating cultural fit.
- Friends, peers, and people discovering Ronit through shared interests.
- Ronit as the editor and long-term maintainer.

## Pages and Routes

### Existing work routes

- `/` - professional home
- `/about` - professional narrative
- `/projects` - project index
- `/projects/:projectId` - project detail
- `/experience` - experience timeline
- `/blog` - writing index
- `/blog/:blogId` - article detail
- `/photos` - photography gallery
- `/contact` - contact

### Personal route

- `/life` - temporary personal home, later the personal portfolio

## Navigation

- The professional bottom navigation remains unchanged.
- A top-center pull handle labeled `Open personal portfolio` switches to `/life`.
- The temporary personal page does not show the professional bottom dock.
- Its arrow is labeled `Return to work portfolio` and returns to `/`.
- `/life` works as a normal shareable route.
- Direct URL visits do not require the transition.
- Browser history remains valid.

## Core User Flow

1. A visitor opens a professional route.
2. The visitor clicks or pulls the top-center handle downward.
3. The page locks scrolling for the short transition.
4. The destination portfolio is mounted beneath the active screen.
5. The active screen becomes a temporary fixed top layer.
6. A moving clip boundary reveals the destination while the top layer content remains stationary.
7. The router commits to `/life` after the layer removal finishes.
8. The visitor can use the reverse arrow to return to `/` with the same transition.

## Future Personal Portfolio Content

The following remains planned but is not part of the current milestone:

- Personal hero and introduction.
- Sports and active interests.
- Games and current play queue.
- Travel photography and notes.
- Movies and series.
- Events and experiences.
- Changing interests and a personal archive.

## Data Architecture

The current temporary `/life` page uses static presentational content. The future personal portfolio will use local typed content modules before any CMS is considered.

- Content records will live in `src/data/life/`.
- Media will live in `src/images/life/` or `public/life/`.
- Sections will receive normalized data through props.
- No database, CMS, authentication, or server mutation is required for the first release.

## Features in Scope for This Milestone

- Minimal labeled portfolio switch button.
- Work-to-personal layered vertical transition.
- Personal-to-work layered vertical transition.
- Temporary `/life` home page.
- Light and dark theme continuity.
- Desktop and mobile behavior.
- Keyboard-accessible controls.
- Reduced-motion dissolve fallback.
- Browser history and direct route support.
- Production build and manual browser verification.

## Features Out of Scope for This Milestone

- Final personal portfolio art direction.
- Final lifestyle content and media.
- Personal portfolio section navigation.
- Drag gestures.
- Canvas, WebGL, Three.js, or page-turn simulation.
- CMS, authentication, admin dashboard, or database.
- Interactive maps or third-party lifestyle APIs.
- A redesign of professional routes.

## Success Criteria

- The arrow is visible, understandable, and keyboard accessible.
- The transition reveals the destination from the top edge and clears toward the bottom.
- The moving layer remains smooth at desktop and mobile sizes.
- Both transition directions work.
- Direct `/life` visits render normally.
- Light and dark modes maintain the existing visual identity.
- Reduced-motion users receive a short dissolve instead of the vertical choreography.
- The production build passes.
- No browser console errors occur during repeated switching.
- Only a temporary outgoing layer is duplicated during the transition.

## Working Design Direction

- Mode: preservation-first extension.
- Design variance: match the existing portfolio.
- Transition motion intensity: 7/10.
- Page motion intensity: match the existing portfolio.
- Visual density: match the existing portfolio.
- Shared accent: `#4075F7` for the current transition proof.
- Status: transition implementation complete and awaiting user review.

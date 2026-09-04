# Build Plan

## Layered Transition Proof

### Objective

Finalize the cross-portfolio transition before designing or building the personal portfolio.

### Implemented

- Added a quiet top-center click-and-pull handle to the existing shared header.
- Added accessible labels for both directions.
- Added `/life` as a normal route.
- Added a lightweight temporary personal home page.
- Mounted the destination beneath the active screen before motion begins.
- Added a stationary outgoing layer with a moving clip boundary that reveals the destination from the top edge.
- Added a restrained one-pixel moving edge.
- Added reverse navigation from `/life` to `/`.
- Added body scroll locking during the layer transition.
- Added reduced-motion dissolve behavior.
- Preserved light and dark themes.
- Preserved the professional bottom navigation on work routes only.

### Verification Completed

- Production build.
- Desktop light-mode transition.
- Mobile light-mode transition at 390 by 844.
- Reverse transition.
- Dark-mode destination rendering.
- Direct `/life` route semantics.
- Browser console error check.

### Approval Questions

- Is the 960ms transition speed correct?
- Should the moving edge feel softer, sharper, or more physical?
- Should returning from `/life` always go to `/`, or restore the exact previous work route?

### Exit Criteria

- Ronit approves the direction, speed, line treatment, and arrow treatment.
- Any requested transition refinements are implemented and reverified.

## Personal Portfolio Definition

Blocked until transition approval.

- Confirm the personal portfolio name.
- Inventory real photography and content.
- Define the personal content hierarchy.
- Decide which small visual changes distinguish the personal side while preserving the shared design.
- Create desktop and mobile page prototypes.

## Personal Portfolio Foundation

Blocked until prototype approval.

- Add typed lifestyle content models.
- Add `src/data/life/` content modules.
- Add `src/components/life/` section components.
- Add responsive media handling.
- Add personal navigation only when the content structure is approved.

## Personal Content

Potential section order:

1. Hero and introduction.
2. Sports.
3. Games.
4. Travel.
5. Movies and series.
6. Events.
7. Other interests.
8. Personal archive.

Rules:

- Use real content and media.
- Do not fabricate statistics, dates, locations, ratings, or attendance.
- Avoid identical equal-card layouts.
- Keep the same overall design language as the work portfolio.

## Performance Pass

- Route-level code splitting where practical.
- Responsive AVIF or WebP personal media.
- One eager hero asset maximum.
- Lazy-load later media.
- Optimize existing large work PNG assets separately.
- Review background audio so it initializes only after user intent.
- Check repeated cross-portfolio navigation for memory growth.

## Accessibility and Browser Verification

- Keyboard navigation and visible focus.
- Reduced-motion verification.
- Light and dark contrast.
- Mobile and desktop touch targets.
- Chrome, Firefox, Safari, and Chromium checks where available.
- Route history and direct refresh.
- Screen-reader labels.

## Release

- Final copy and media-rights audit.
- Production build.
- Lighthouse review.
- Manual regression verification across all professional routes and `/life`.
- Update `progress-tracker.md` with final results.

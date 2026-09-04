# UI Registry

## Purpose

The UI registry defines reusable component responsibilities and prevents page-specific markup from becoming an accidental design system.

## Registry Rules

- Register a component when it is reused, owns a distinct interaction, or enforces a shared visual rule.
- Keep one clear responsibility per component.
- Use finite, documented variants.
- Keep feature-specific components in their feature folder.
- Move components to `components/common/` only after reuse is proven.
- Define responsive, keyboard, error, and reduced-motion behavior where relevant.

## Implemented Cross-Portfolio Components

### `TopNav`

- File: `src/components/layout/TopNav.jsx`.
- Purpose: shared portfolio identity, location treatment, and cross-portfolio arrow.
- Inputs: `portfolioSide`, `onSwitchPortfolio`, `switchDisabled`.
- Variants: work and life.
- States: rest, hover, focus-visible, active, disabled.
- Accessibility: semantic button, 44px target, descriptive label, visible focus ring.
- Responsive behavior: location badge hides below the `xs` breakpoint; arrow remains visible.
- Status: implemented and verified.

### `PortfolioLayerTransition`

- File: `src/components/layout/PortfolioLayerTransition.jsx`.
- Purpose: remove the current screen as a top layer and reveal a prepared destination underneath.
- Inputs: destination children and `onComplete`.
- States: initial, revealing, complete, reduced motion.
- Accessibility: transition layer is decorative and pointer-inert; semantic navigation remains in `TopNav`.
- Responsive behavior: line length and angle derive from current viewport dimensions.
- Motion: stationary full-screen clip reveal plus a one-pixel boundary transform, with opacity only for reduced motion.
- Dependencies: existing Framer Motion.
- Status: implemented and verified.

### `LifeHomePage`

- File: `src/pages/LifeHomePage.jsx`.
- Purpose: temporary same-design destination used to judge the transition.
- Inputs: none.
- Responsive behavior: two-column desktop composition and single-column mobile composition.
- Notes: not the final personal portfolio.
- Status: temporary and implemented.

## Existing Components Reused

- `SectionWrapper`: provides established width, spacing, typography, and entrance motion.
- `BottomNav`: remains professional-only.
- Existing `ArrowUpRight`: preserves the repository's established icon language.
- `ThemeContext`: keeps both portfolio modes synchronized in light and dark themes.

## Future Personal Components

Do not implement until the transition and personal prototypes are approved.

- `LifeSectionNav`
- `LifeHero`
- `EditorialMedia`
- `LifeEntryPreview`
- `PlacesSection`
- `PlaySection`
- `GamesSection`
- `WatchSection`
- `EventsSection`
- `CuriositiesSection`
- `LifeArchive`

## Component Contract Template

```text
Name:
Purpose:
Owner folder:
Inputs:
Variants:
States:
Responsive behavior:
Accessibility:
Motion:
Dependencies:
Used by:
Status:
```

## Component Admission Checklist

- Does it remove repeated behavior or enforce a real shared rule?
- Is the name based on responsibility rather than appearance?
- Are its variants finite and necessary?
- Are responsive and accessibility behaviors defined?
- Does it stay useful without motion?
- Is it located in the narrowest appropriate folder?

If any answer is no, keep the implementation local until reuse is clear.

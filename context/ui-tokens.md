# UI Tokens

## Token Strategy

The current transition proof deliberately reuses the established portfolio tokens. Future personal-page variations must remain scoped and require prototype approval before new semantic tokens are added.

## Color Tokens

### Shared light theme

```css
:root {
  --portfolio-canvas: #ffffff;
  --portfolio-surface: #f9fafb;
  --portfolio-surface-raised: #ffffff;
  --portfolio-ink: #111827;
  --portfolio-ink-muted: #6b7280;
  --portfolio-line: #e5e7eb;
  --portfolio-accent: #4075f7;
  --portfolio-on-accent: #ffffff;
  --portfolio-shadow: rgb(0 0 0 / 0.12);
}
```

### Shared dark theme

```css
.dark {
  --portfolio-canvas: #0f0f0f;
  --portfolio-surface: #1c1c1e;
  --portfolio-surface-raised: #1c1c1e;
  --portfolio-ink: #f1f1f1;
  --portfolio-ink-muted: #9ca3af;
  --portfolio-line: #1f2937;
  --portfolio-accent: #4075f7;
  --portfolio-on-accent: #ffffff;
  --portfolio-shadow: rgb(0 0 0 / 0.34);
}
```

The implementation still uses existing Tailwind classes. These semantic values document the intended shared mapping for later consolidation.

## Existing Work Palette

- Work canvas light: white.
- Work canvas dark: `#0f0f0f`.
- Work accent: `#4075F7`.
- Work primary type: Satoshi.
- Work signature type: Dancing Script for the Ronit wordmark.

The temporary personal page uses the same blue accent. A later personal accent must be scoped and approved.

## Typography

### Families

- Primary UI and display: Satoshi.
- Signature wordmark: existing Dancing Script usage only.
- System fallback: `system-ui, sans-serif`.
- Do not add a serif solely to make the lifestyle page feel editorial.
- Do not introduce a third font family in release one.

### Scale

```text
display-xl: clamp(3.25rem, 7vw, 6.5rem), 0.92 line-height, -0.055em tracking
display-lg: clamp(2.5rem, 5vw, 4.75rem), 0.98 line-height, -0.045em tracking
heading-lg: clamp(2rem, 3.5vw, 3.25rem), 1.02 line-height, -0.035em tracking
heading-md: clamp(1.5rem, 2.4vw, 2.25rem), 1.08 line-height, -0.025em tracking
body-lg: 1.125rem, 1.55 line-height
body: 1rem, 1.6 line-height
body-sm: 0.875rem, 1.5 line-height
label: 0.75rem, 1.25 line-height, 0.08em tracking maximum
```

The hero headline must remain within two lines on desktop and four short lines on narrow mobile.

## Layout

### Container

- Primary maximum width: 1280px.
- Reading width: 65ch.
- Desktop horizontal padding: 48px.
- Tablet horizontal padding: 32px.
- Mobile horizontal padding: 20px.

### Breakpoints

- `sm`: 640px.
- `md`: 768px.
- `lg`: 1024px.
- `xl`: 1280px.
- `2xl`: 1536px.

### Grid

- Desktop composition: 12-column CSS Grid.
- Tablet composition: 8 columns.
- Mobile composition: one strict content column with optional two-column thumbnail pairs.
- Use CSS Grid for asymmetric media placement.
- Do not rely on fragile flex percentage calculations.

### Spacing Scale

```text
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
20: 80px
24: 96px
32: 128px
```

- Desktop section spacing: 96px to 144px according to content.
- Mobile section spacing: 64px to 88px.
- Hero top padding: no more than 96px after navigation.

## Shape

- Media and content surfaces: 14px radius.
- Compact panels: 14px radius.
- Buttons and compact controls: full pill.
- Portfolio switch: 44 by 28px top-edge pull handle with a downward chevron.
- Do not mix multiple card radii.

## Borders and Shadows

- Default border: 1px using `--portfolio-line`.
- Raised surfaces use a tinted shadow derived from `--portfolio-shadow`.
- Avoid pure black shadows.
- Avoid outer glows.
- Use one shadow level for ordinary elevated surfaces. The transition line has no glow.

## Motion

### Timing

- Micro feedback: 120 to 180ms.
- Hover preview: 180 to 260ms.
- Content reveal: 420 to 600ms.
- Full layered reveal: 960ms during the current proof.

### Easing

- Standard reveal: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Layer removal: `cubic-bezier(0.76, 0, 0.24, 1)`.

### Rules

- Animate transforms and opacity.
- Keep continuous transition progress inside Framer Motion rather than React state.
- No endless motion in content sections.
- Reduced motion uses direct state change or a short opacity transition.

## Layer Scale

```text
base content: 0
sticky section navigation: 20
existing top navigation: 40
transition destination: 55
transition line: 56
temporary transition controls: 57
modal or blocking dialog: 60
```

Do not create arbitrary z-index values outside this scale without updating the token document.

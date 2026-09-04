# UI Rules

## General Composition

- The lifestyle side is image-led and editorial, not a dashboard.
- Use cards only when a surface represents a meaningful grouped object.
- Prefer open composition, image placement, and spacing over boxing every item.
- Do not use three equal feature cards.
- Do not repeat the same section layout family across the full page.
- Keep section introductions below 25 words by default.
- Use no more than one small uppercase eyebrow per three sections.
- Do not number sections decoratively.
- Do not add scroll instructions.

## Cards

- Use a card for a saved item, media object, or grouped entry with a real interaction.
- Default card radius is 14px.
- Cards use either a border or a shadow, not both at full strength.
- Avoid nested cards.
- Image labels live below images, not as pills over images.
- Card hover may translate up by at most 3px and adjust image scale slightly.
- Card active state scales to approximately `0.98`.
- Entire clickable cards must have correct semantic links or buttons.
- Empty cards are not used to balance a grid.

## Buttons

- Buttons use full-pill geometry.
- Primary personal-portfolio button uses `--portfolio-accent` and `--portfolio-on-accent` until a scoped variation is approved.
- Secondary button uses a visible border and readable text.
- Button labels remain on one line and use no more than three words.
- Minimum touch target is 44 by 44px.
- Every button has hover, focus-visible, active, and disabled states.
- Focus-visible uses `--life-focus` with sufficient offset.
- Do not duplicate CTA intent using different labels.

## Portfolio Switch

- A compact pull handle remains visible at the center of the top edge.
- A small downward chevron communicates the pull direction.
- The location badge may hide on narrow mobile screens, but the handle remains.
- The handle has semantic button behavior and visible focus.
- The accessible label is `Open personal portfolio` on work routes.
- The accessible label is `Return to work portfolio` on `/life`.
- A restrained blue state and small vertical response provide hover and focus feedback.
- Clicking or pulling downward triggers the layered top-to-bottom reveal.
- Reduced motion replaces the vertical choreography with a short dissolve.

## Navigation Bars

- Existing professional bottom navigation remains unchanged unless integration requires a targeted adjustment.
- Lifestyle local navigation is a single line on desktop.
- At narrow widths, use horizontal scroll snap or a compact menu.
- Navigation height remains at or below 72px where practical and never exceeds 80px on desktop.
- Active state is communicated through type weight, underline, or background, not decorative dots.
- Do not duplicate all professional navigation inside the lifestyle page.

## Badges and Labels

- Badges represent real metadata such as category or availability.
- Do not use badges as decoration.
- Do not overlay badges on photographs.
- Use no more than one separator per metadata line.
- Avoid uppercase tracking above every heading.
- Dates and ranges use a standard hyphen.

## Typography

- Satoshi is the default for display, body, controls, and labels.
- Dancing Script remains limited to the Ronit signature.
- Do not introduce a serif for generic lifestyle polish.
- Display type uses weight and scale for hierarchy, not gradient text.
- Hero headline stays within two lines on desktop.
- Body copy stays within 65 characters per line where practical.
- Avoid tiny gray text that fails contrast.
- Do not use em dash or en dash characters in visible copy.

## Images

- Use real personal media for final implementation.
- Prototype photography can be generated but must be replaced or explicitly approved before release.
- Provide intrinsic width and height.
- Use descriptive alt text based on the image purpose.
- Do not use an image's filename as alt text.
- Only the hero image may load eagerly on `/life`.
- Use responsive formats and sizes.
- Do not add fake photo credits or archive numbering.
- Use restrained cropping and respect configured focal points.

## Motion

- Every animation must communicate hierarchy, feedback, storytelling, or state change.
- Content reveals happen once and do not loop.
- Avoid scroll hijacking.
- Do not use a custom cursor.
- Do not animate layout properties such as width, height, top, or left during ordinary interactions.
- Respect reduced motion everywhere.
- Effects and listeners clean up when a component unmounts.

## Loading, Empty, and Error States

- Loading states match final media geometry.
- Do not use a generic centered spinner for page content.
- Empty sections explain that content is being collected without pretending entries exist.
- Media errors preserve aspect ratio and display the entry title outside the missing image area.
- A failed lifestyle route import keeps a normal `/life` link available.

## Themes

- The lifestyle page has one consistent theme at a time.
- Sections may use nearby surface tones but do not flip between unrelated light and dark palettes.
- Light and dark modes preserve equivalent hierarchy.
- Work and temporary personal modes share the existing blue interaction language. Any later personal accent change requires explicit design approval.

## Copy

- Write in first person where the content is Ronit's personal perspective.
- Prefer concrete memories and opinions over promotional language.
- Do not invent ratings, statistics, locations, or dates.
- Avoid generic phrases such as `living life to the fullest`.
- Keep image captions functional.
- Review every visible string before release.

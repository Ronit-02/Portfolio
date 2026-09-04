# Code Standards

## Engineering Mindset

- Prefer the smallest architecture that clearly supports the approved behavior.
- Preserve existing behavior unless a change is required by the feature.
- Optimize measured bottlenecks, but establish budgets before adding media or animation.
- Treat accessibility, loading, empty, error, and reduced-motion states as product states.
- Keep content separate from presentation.
- Prefer explicit code over hidden conventions.
- Avoid broad refactors while integrating the lifestyle portfolio.
- Do not add a dependency for behavior already supported by the platform or installed libraries.
- Do not fabricate personal content to make a layout look complete.

## Existing Style

The repository currently uses:

- Two-space indentation.
- Double quotes.
- Semicolons.
- Functional React components.
- Tailwind utilities for component styling.
- PascalCase component files.
- camelCase utility files.
- Upper snake case for module-level constants.

New work must follow these conventions.

## TypeScript Rules

The existing application is JavaScript. New isolated lifestyle and transition modules may use TypeScript through Vite where it provides clear value. Do not migrate unrelated existing files solely for consistency.

- Enable strict typing for new TypeScript modules.
- Do not use `any`. Use `unknown` and narrow it.
- Prefer `type` for unions and data shapes; use `interface` when declaration merging or public extension is intentional.
- Export domain types from dedicated `*.types.ts` files.
- Keep component props near the component unless reused across modules.
- Use string literal unions for finite states and categories.
- Represent absent optional content with optional properties, not empty strings.
- Validate untrusted external data before casting.
- Do not duplicate types that can be derived with `typeof`, indexed access, or library exports.
- Avoid enums unless interoperability requires them.
- Do not type React components with `React.FC` by default. Type props directly.
- Event handlers use the precise React event type.
- Refs use the precise element type and account for `null`.

## Naming Conventions

- Components: `PascalCase`, for example `PortfolioLayerTransition`.
- Hooks: `useCamelCase`, for example `usePortfolioTransition`.
- Utilities: `camelCase`, for example `getLineGeometry`.
- Constants: `UPPER_SNAKE_CASE`, for example `REVEAL_KEYFRAMES`.
- Types: `PascalCase`, for example `LifeEntry`.
- Boolean values: begin with `is`, `has`, `can`, or `should`.
- Event handlers: `handleAction` inside components and `onAction` in props.
- CSS custom properties: kebab-case with a feature prefix, for example `--portfolio-accent`.
- Data IDs: stable lowercase kebab-case.
- Route segments: lowercase nouns.

## File and Folder Naming

- React components: `PascalCase.tsx` or the existing `PascalCase.jsx` format.
- Hooks: `useFeatureName.ts`.
- Utilities: `camelCase.ts`.
- Constants: `feature.constants.ts`.
- Types: `feature.types.ts`.
- Data records: lowercase category names such as `places.ts`.
- Folders: lowercase feature names such as `components/life/`.
- One primary exported component per component file.
- Use local `index.ts` barrels only when they simplify stable public imports. Do not create deep barrel chains.

## Component Structure

Recommended order:

1. Imports.
2. Local types.
3. Module constants.
4. Pure utilities.
5. Small private components.
6. Main exported component.

Component rules:

- Components receive normalized data through props.
- Avoid reading global context in leaf components when one prop is sufficient.
- Keep animation mechanics in small leaf components.
- Use motion values for continuous pointer or scroll values.
- Do not put `window.scrollY`, pointer coordinates, or animation progress in React state.
- Effects must clean up timers, observers, listeners, pointer capture, and animation subscriptions.
- Memoize only after identifying a meaningful rerender boundary.
- Use semantic HTML before adding ARIA.
- Never make a `div` the only interactive target.
- Reserve intrinsic image space with `width`, `height`, or `aspect-ratio`.

## State Rules

- URL state belongs to React Router.
- Global theme stays in the theme provider.
- Cross-portfolio destination and active state belong to the app shell.
- Continuous animation progress must stay inside Motion or a motion value.
- Section-level UI state stays local.
- Derived values are calculated during render or with `useMemo` only when expensive.
- Do not mirror props in state.

## Styling Rules

- Prefer Tailwind utilities for layout and ordinary styling.
- Use CSS custom properties for future personal theme variations and calculate viewport transition geometry once per transition.
- Put shared base rules in `src/index.css` only when genuinely global.
- Animate only transforms and opacity, with clipping limited to the transition surface.
- Use `min-h-[100dvh]`, not `h-screen`, for full viewport sections.
- Multi-column sections must define an explicit mobile collapse.
- Avoid arbitrary z-index values. Use the documented layer scale.
- Avoid pure black and pure white in page themes.

## API Route Structure

There are no API routes in the current Vite client application and none are required for release one.

If a backend is introduced later:

```text
/api/v1/life/entries
/api/v1/life/entries/:id
/api/v1/life/categories/:category
```

Rules for a future API:

- Version public endpoints.
- Use plural resource nouns.
- Keep transport DTOs separate from UI domain types.
- Validate path, query, and body inputs at the boundary.
- Return a consistent error envelope with a stable machine code and safe message.
- Use ISO 8601 timestamps.
- Use cursor pagination for collections that can grow.
- Do not expose storage-provider URLs or vendor response objects as the domain contract.
- Do not add an API until editing, synchronization, or dynamic content actually requires one.

## Error Handling

- User-facing errors explain what failed and what action is available.
- Development assertions identify invalid content close to its source.
- Lazy import failures retain a normal navigation option.
- Media errors preserve layout.
- Never swallow errors without a reason. A deliberately ignored error must include a short comment.

## Verification

For every implementation change:

- Run `npm run build`.
- Manually verify affected routes at mobile and desktop widths.
- Verify light and dark modes.
- Verify keyboard navigation and reduced motion.
- Verify image loading and route history.
- Check that no unrelated worktree changes were overwritten.

# Contributing to Atelier UI

Thanks for helping improve Atelier. Keep changes focused and easy to review.

## Development

Use Node 24 and pnpm 11.25.0. Run `pnpm install`, then `pnpm dev`. Keep public UI text, documentation, accessibility labels, validation messages, and test descriptions in English. Use fictional identities and `example.com` addresses in examples.

## Where changes belong

- Shared tokens and Taiga overrides: `packages/theme/src/theme.less`.
- Configuration helpers and public types: `packages/theme/src/index.js` and `index.d.ts`.
- App layouts and examples: `src/app/` and `src/styles.less`.
- Do not edit generated `dist/` files. `src/theme/atelier.less` is only a compatibility import.

The theme must not import app routes, demo assets, Angular services, or browser globals at module initialization. Keep its CSS exports marked as side effects so consumer bundlers preserve them.

## Before opening a pull request

```sh
pnpm format
pnpm test:ci
pnpm build
pnpm test:package
```

Check the affected pages in light and dark modes, with keyboard input, and at narrow and wide widths. Add behavioral tests for bug fixes; avoid tests that only repeat markup. Record user-visible changes under `Unreleased` in `CHANGELOG.md`.

Describe the problem, the resulting behavior, and how you verified it. Include screenshots for visual changes. Discuss breaking token or API changes before implementing them.

## Releases

The app and theme are currently pre-release. Do not publish to npm as part of an ordinary pull request. Follow `docs/RELEASING.md` when a maintainer schedules a release. No automatic publishing workflow is enabled.

Contributions are made under the repository's MIT license. Preserve third-party notices when adding or redistributing assets.

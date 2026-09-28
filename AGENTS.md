# AGENTS.md

This is an [AnalogJS](https://analogjs.org) app — an Angular meta-framework powered by Vite.

Framework conventions for AI assistants — file-based routing, server/API routes, data fetching, content routes, and modern Angular usage — ship with the framework and are installed alongside your dependencies. Read them here:

- `node_modules/@analogjs/platform/AGENTS.md`

Reading from `@analogjs/platform` keeps the guidance in sync with the installed version instead of drifting from a copy checked into the project.

Full documentation: https://analogjs.org/docs · LLM-friendly index: https://analogjs.org/llms.txt

## Atelier project conventions

- This repository contains an English demo and a separate reusable theme package.
- Keep all public content, documentation, accessibility labels, and test descriptions in English.
- Maintain shared tokens and Taiga overrides in `packages/theme/src/theme.less`; `src/theme/atelier.less` forwards to the package.
- Keep demo-specific layout out of the theme package. Use `example.com` for fictional contact details.
- Run `pnpm test:ci`, `pnpm build`, and `pnpm test:package` for package changes.
- Update `CHANGELOG.md` for user-visible changes. Keep release status honest; a local tarball is not a published npm release.

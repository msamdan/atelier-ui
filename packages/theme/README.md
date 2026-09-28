# Atelier Theme

A small, reusable theme for Taiga UI: neutral surfaces, compact controls, light and dark modes, four accent palettes, and adjustable corners.

**Pre-release:** this package is currently distributed as a local tarball. The name `atelier-theme` is provisional and has not been reserved or published on npm.

## Install

Build and pack from the Atelier repository:

```sh
pnpm install
pnpm pack:theme
```

Install the resulting tarball in your application:

```sh
pnpm add /path/to/atelier-theme-0.1.0.tgz
```

## Angular + Taiga UI setup

The package does not bundle Taiga UI or automatically change your Angular configuration. Install and configure Taiga UI following its documentation. The current integration is tested with Taiga UI 5.25.x and Angular 22.

1. Add `provideTaiga()` to your application providers and wrap the root template in `<tui-root>`.
2. Include Taiga UI's base theme followed by Atelier in your global LESS stylesheet:

```less
@import "@taiga-ui/styles/taiga-ui-theme.less";
@import (inline) "atelier-theme/theme.css";
```

The compiled CSS does not require a LESS compiler itself. If you already load Taiga UI's base CSS separately, you can simply import `atelier-theme/theme.css` through your application's bundler. A LESS entry is available at `atelier-theme/theme.less` for projects that prefer source imports.

3. Apply your desired configuration to the **document root**:

```ts
import { applyTheme } from "atelier-theme";

applyTheme(document.documentElement, {
  dark: true,
  accent: "green",
  radius: "8",
});
```

In Angular, inject `DOCUMENT` instead of accessing global `document` where server compatibility matters. The package has no import-time browser access, but your application and Taiga UI still require their own SSR configuration. Persistence is intentionally owned by the application, not this package.

## API

```ts
import {
  applyTheme,
  normalizeTheme,
  defaultTheme,
  accents,
  radii,
  type ThemeConfig,
} from "atelier-theme";
```

- `normalizeTheme(unknown)` validates imported or saved JSON and returns a complete configuration.
- `applyTheme(root, unknown)` validates settings, applies HTML attributes and `--radius`, and returns the normalized configuration.
- `defaultTheme`: `{ dark: false, accent: "green", radius: "8" }`.
- Accents: `green`, `blue`, `violet`, `orange`.
- Radii: `"0"`, `"4"`, `"8"`, `"12"` (pixels).

This theme is designed for one application-wide configuration on `<html>`. Independently themed nested roots are not currently supported.

## Tokens

| Token                                       | Purpose                      |
| ------------------------------------------- | ---------------------------- |
| `--bg`                                      | Page background              |
| `--surface`                                 | Cards and controls           |
| `--sidebar`                                 | Navigation surface           |
| `--subtle`, `--hover`                       | Secondary and hover surfaces |
| `--text`, `--muted`                         | Foreground colors            |
| `--border`                                  | Dividers and outlines        |
| `--accent`, `--accent-soft`, `--accent-ink` | Accent palette               |
| `--radius`                                  | Control and card corners     |
| `--font`                                    | Font family                  |

These map onto Taiga's CSS variables. `data-theme="dark"` and `data-accent="blue"` on `<html>` also work without JavaScript. Override `--font` to use your own font; fonts and icons are not included.

## Included and excluded

Included: semantic tokens, Taiga button/input/control styling, CSS and LESS entries, typed ESM helpers.

Not included: dashboard layout, charts, custom demo badges and avatars, Angular components, storage, icon assets, fonts, or Taiga's base stylesheet. No runtime JavaScript dependencies are bundled.

## License

MIT. Taiga UI and any assets you install retain their own licenses. This is an independent project, not an official Taiga UI theme.

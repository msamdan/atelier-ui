import {
  Injectable,
  signal,
  inject,
  afterNextRender,
  effect,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import {
  applyTheme,
  normalizeTheme,
  type Accent,
  type Radius,
} from "atelier-theme";
@Injectable({ providedIn: "root" })
export class ThemeService {
  private document = inject(DOCUMENT);
  private ready = signal(false);
  dark = signal(false);
  accent = signal<Accent>("green");
  radius = signal<Radius>("8");
  constructor() {
    afterNextRender(() => {
      try {
        const config = normalizeTheme(
          JSON.parse(localStorage.getItem("atelier-theme") || "{}"),
        );
        this.dark.set(config.dark);
        this.accent.set(config.accent);
        this.radius.set(config.radius);
      } catch {
        /* Storage may be unavailable; the default theme remains usable. */
      }
      this.ready.set(true);
    });
    effect(() => {
      const config = applyTheme(this.document.documentElement, {
        dark: this.dark(),
        accent: this.accent(),
        radius: this.radius(),
      });
      if (this.ready()) {
        try {
          localStorage.setItem("atelier-theme", JSON.stringify(config));
        } catch {
          /* The visual theme does not depend on persistence. */
        }
      }
    });
  }
  toggle() {
    this.dark.update((value) => !value);
  }
}

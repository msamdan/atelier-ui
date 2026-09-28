export type Accent = "green" | "blue" | "violet" | "orange";
export type Radius = "0" | "4" | "8" | "12";
export interface ThemeConfig {
  dark: boolean;
  accent: Accent;
  radius: Radius;
}
export declare const accents: readonly Accent[];
export declare const radii: readonly Radius[];
export declare const defaultTheme: Readonly<ThemeConfig>;
export declare function normalizeTheme(value: unknown): ThemeConfig;
export declare function applyTheme(
  root: HTMLElement,
  value: unknown,
): ThemeConfig;

/** The available options are deliberately finite so imported configuration stays predictable. */
export const accents = Object.freeze(["green", "blue", "violet", "orange"]);
export const radii = Object.freeze(["0", "4", "8", "12"]);
export const defaultTheme = Object.freeze({
  dark: false,
  accent: "green",
  radius: "8",
});

/** Validate untrusted JSON or persisted settings without accessing browser globals. */
export function normalizeTheme(value) {
  const config = value && typeof value === "object" ? value : {};
  return {
    dark: config.dark === true,
    accent: accents.includes(config.accent)
      ? config.accent
      : defaultTheme.accent,
    radius: radii.includes(config.radius) ? config.radius : defaultTheme.radius,
  };
}

/** Apply settings to the document root (or another explicitly supplied HTML element). */
export function applyTheme(root, value) {
  const config = normalizeTheme(value);
  root.setAttribute("data-theme", config.dark ? "dark" : "light");
  root.setAttribute("data-accent", config.accent);
  root.style.setProperty("--radius", `${config.radius}px`);
  return config;
}

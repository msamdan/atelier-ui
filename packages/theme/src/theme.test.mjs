import { test } from "node:test";
import assert from "node:assert/strict";
import { applyTheme, normalizeTheme, defaultTheme } from "./index.js";
test("invalid imported settings safely fall back to defaults", () => {
  for (const value of [
    null,
    undefined,
    "dark",
    [],
    { dark: "true", accent: "red", radius: "url(x)" },
  ]) {
    assert.deepEqual(normalizeTheme(value), defaultTheme);
  }
});
test("valid settings survive serialization and retain a zero radius", () => {
  const value = { dark: true, accent: "violet", radius: "0" };
  assert.deepEqual(normalizeTheme(JSON.parse(JSON.stringify(value))), value);
});
test("applies settings to the supplied root without browser globals", () => {
  const attributes = new Map();
  const root = {
    setAttribute: (key, value) => attributes.set(key, value),
    style: { setProperty: (key, value) => attributes.set(key, value) },
  };
  applyTheme(root, { dark: true, accent: "blue", radius: "12" });
  assert.equal(attributes.get("data-theme"), "dark");
  assert.equal(attributes.get("data-accent"), "blue");
  assert.equal(attributes.get("--radius"), "12px");
});

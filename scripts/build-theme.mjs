import { readFile, mkdir, writeFile, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import less from "less";
const base = new URL("../packages/theme/", import.meta.url);
const source = new URL("src/theme.less", base);
const manifest = JSON.parse(
  await readFile(new URL("package.json", base), "utf8"),
);
const result = await less.render(await readFile(source, "utf8"), {
  filename: fileURLToPath(source),
});
await mkdir(new URL("dist/", base), { recursive: true });
await writeFile(
  new URL("dist/theme.css", base),
  `/*! Atelier Theme v${manifest.version} | MIT License */\n` + result.css,
);
for (const name of ["index.js", "index.d.ts", "theme.less"]) {
  await copyFile(new URL(`src/${name}`, base), new URL(`dist/${name}`, base));
}
console.log(
  "Built atelier-theme: CSS, LESS, ESM, and TypeScript declarations.",
);

await copyFile(new URL("dist/theme.css", base), new URL("theme.css", base));
await copyFile(new URL("dist/theme.less", base), new URL("theme.less", base));

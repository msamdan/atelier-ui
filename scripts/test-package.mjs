import { mkdtemp, readFile, writeFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import assert from "node:assert/strict";
const repository = fileURLToPath(new URL("../", import.meta.url));
const manifest = JSON.parse(
  await readFile(join(repository, "packages/theme/package.json"), "utf8"),
);
const run = (command, args, cwd) => {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    env: process.env,
  });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, `${command} ${args.join(" ")} failed`);
};
run(
  "pnpm",
  [
    "--filter",
    manifest.name,
    "pack",
    "--pack-destination",
    resolve(repository, "artifacts"),
  ],
  repository,
);
const tarball = resolve(
  repository,
  "artifacts",
  `${manifest.name.replace("@", "").replace("/", "-")}-${manifest.version}.tgz`,
);
const consumer = await mkdtemp(join(tmpdir(), "atelier-consumer-"));
await writeFile(
  join(consumer, "package.json"),
  JSON.stringify(
    {
      private: true,
      type: "module",
      dependencies: { [manifest.name]: `file:${tarball}` },
    },
    null,
    2,
  ),
);
await writeFile(join(consumer, ".npmrc"), "auto-install-peers=false\n");
run("pnpm", ["install", "--offline", "--ignore-scripts"], consumer);
await writeFile(
  join(consumer, "check.mjs"),
  `
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {normalizeTheme, applyTheme, defaultTheme} from '${manifest.name}';
assert.deepEqual(normalizeTheme(null), defaultTheme);
assert.deepEqual(normalizeTheme({dark:true,accent:'blue',radius:'0'}), {dark:true,accent:'blue',radius:'0'});
assert.equal(typeof applyTheme, 'function');
const css = await readFile(new URL(import.meta.resolve('${manifest.name}/theme.css')), 'utf8');
assert.ok(css.includes('--tui-background-base'));
assert.ok(css.includes('data-theme'));
assert.ok(!css.includes('@import'));
const less = await readFile(new URL(import.meta.resolve('${manifest.name}/theme.less')), 'utf8');
assert.ok(less.includes('--accent'));
console.log('Packed consumer: runtime and stylesheet exports passed.');
`,
);
run(process.execPath, ["check.mjs"], consumer);
await writeFile(
  join(consumer, "check.ts"),
  `import {normalizeTheme, type ThemeConfig, type Accent} from '${manifest.name}';\nconst config: ThemeConfig = normalizeTheme({dark:true});\nconst accent: Accent = config.accent;\nvoid accent;\n`,
);
run(
  process.execPath,
  [
    join(repository, "node_modules/typescript/bin/tsc"),
    "--noEmit",
    "--strict",
    "--skipLibCheck",
    "--module",
    "nodenext",
    "--target",
    "es2022",
    "check.ts",
  ],
  consumer,
);
const files = await readdir(join(consumer, "node_modules", manifest.name));
assert.ok(!files.includes("src"));
assert.ok(files.includes("LICENSE"));
assert.ok(files.includes("README.md"));
console.log(
  `Packed consumer: TypeScript declarations and package allowlist passed.\nTarball: ${tarball}\nConsumer: ${consumer}`,
);

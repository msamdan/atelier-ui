import { copyFile, mkdir, readdir } from "node:fs/promises";

const source = new URL("../node_modules/@taiga-ui/icons/src/", import.meta.url);
const destination = new URL("../public/icons/", import.meta.url);
await mkdir(destination, { recursive: true });
const files = (await readdir(source)).filter((file) => file.endsWith(".svg"));
await Promise.all(
  files.map((file) =>
    copyFile(new URL(file, source), new URL(file, destination)),
  ),
);
console.log(`Prepared ${files.length} Taiga UI icons.`);

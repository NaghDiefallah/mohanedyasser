import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Critters from "critters";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const htmlPath = path.join(distDir, "index.html");

const inlineCriticalCss = async () => {
  const html = await fs.readFile(htmlPath, "utf8");
  const critters = new Critters({
    path: distDir,
    preload: "swap",
    compress: true,
    pruneSource: true,
    logLevel: "silent",
  });

  const output = await critters.process(html);
  await fs.writeFile(htmlPath, output, "utf8");
};

inlineCriticalCss().catch((error) => {
  console.error("Critical CSS inlining failed:", error);
  process.exit(1);
});

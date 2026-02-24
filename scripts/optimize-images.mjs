import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "src", "assets", "optimized");

fs.mkdirSync(outputDir, { recursive: true });

const defaultFormatOptions = {
  avif: { quality: 45, effort: 4 },
  webp: { quality: 75 },
};

const images = [
  {
    name: "hero-portrait",
    input: "src/assets/hero-portrait.png",
    widths: [360, 480, 720, 960],
  },
  {
    name: "color-grading-before",
    input: "src/assets/color-grading-before.png",
    widths: [640, 960, 1280],
    formatOptions: { avif: { quality: 40, effort: 4 }, webp: { quality: 70 } },
  },
  {
    name: "color-grading-after",
    input: "src/assets/color-grading-after.png",
    widths: [640, 960, 1280],
    formatOptions: { avif: { quality: 40, effort: 4 }, webp: { quality: 70 } },
  },
  {
    name: "brand-commercial",
    input: "src/assets/brand-commercial.jpg",
    widths: [320, 480, 640, 960],
  },
  {
    name: "logo-mark",
    input: "src/assets/png/008.png",
    widths: [256, 384, 512],
    formatOptions: { avif: { quality: 45, effort: 4 }, webp: { quality: 80 } },
  },
  {
    name: "davinci-resolve",
    input: "src/assets/davinci-resolve.png",
    widths: [64, 96, 128],
    formatOptions: { avif: { quality: 45, effort: 4 }, webp: { quality: 80 } },
  },
];

const resolveInput = (relativePath) => path.join(rootDir, relativePath);

const buildTasks = (image) => {
  const formats = ["avif", "webp"];
  const formatOptions = {
    ...defaultFormatOptions,
    ...image.formatOptions,
  };

  return image.widths.flatMap((width) =>
    formats.map((format) => {
      const outputFile = `${image.name}-${width}w.${format}`;
      const outputPath = path.join(outputDir, outputFile);
      const inputPath = resolveInput(image.input);

      return sharp(inputPath)
        .resize({ width, withoutEnlargement: true })
        .toFormat(format, formatOptions[format])
        .toFile(outputPath)
        .then(() => ({ outputFile, format, width }));
    })
  );
};

const run = async () => {
  const tasks = images.flatMap((image) => buildTasks(image));
  const results = await Promise.all(tasks);

  const report = results
    .map((result) => `- ${result.outputFile}`)
    .join("\n");

  console.log("Generated optimized images:\n" + report);
};

run().catch((error) => {
  console.error("Image optimization failed:", error);
  process.exit(1);
});

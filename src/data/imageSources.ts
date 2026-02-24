export interface ImageSources {
  fallback: string;
  avifSrcSet: string;
  webpSrcSet: string;
}

import heroPortraitFallback from "@/assets/hero-portrait.png";
import heroPortraitAvif360 from "@/assets/optimized/hero-portrait-360w.avif";
import heroPortraitAvif480 from "@/assets/optimized/hero-portrait-480w.avif";
import heroPortraitAvif720 from "@/assets/optimized/hero-portrait-720w.avif";
import heroPortraitAvif960 from "@/assets/optimized/hero-portrait-960w.avif";
import heroPortraitWebp360 from "@/assets/optimized/hero-portrait-360w.webp";
import heroPortraitWebp480 from "@/assets/optimized/hero-portrait-480w.webp";
import heroPortraitWebp720 from "@/assets/optimized/hero-portrait-720w.webp";
import heroPortraitWebp960 from "@/assets/optimized/hero-portrait-960w.webp";

import colorGradingBeforeFallback from "@/assets/color-grading-before.png";
import colorGradingBeforeAvif640 from "@/assets/optimized/color-grading-before-640w.avif";
import colorGradingBeforeAvif960 from "@/assets/optimized/color-grading-before-960w.avif";
import colorGradingBeforeAvif1280 from "@/assets/optimized/color-grading-before-1280w.avif";
import colorGradingBeforeWebp640 from "@/assets/optimized/color-grading-before-640w.webp";
import colorGradingBeforeWebp960 from "@/assets/optimized/color-grading-before-960w.webp";
import colorGradingBeforeWebp1280 from "@/assets/optimized/color-grading-before-1280w.webp";

import colorGradingAfterFallback from "@/assets/color-grading-after.png";
import colorGradingAfterAvif640 from "@/assets/optimized/color-grading-after-640w.avif";
import colorGradingAfterAvif960 from "@/assets/optimized/color-grading-after-960w.avif";
import colorGradingAfterAvif1280 from "@/assets/optimized/color-grading-after-1280w.avif";
import colorGradingAfterWebp640 from "@/assets/optimized/color-grading-after-640w.webp";
import colorGradingAfterWebp960 from "@/assets/optimized/color-grading-after-960w.webp";
import colorGradingAfterWebp1280 from "@/assets/optimized/color-grading-after-1280w.webp";

import logoMarkFallback from "@/assets/png/008.png";
import logoMarkAvif256 from "@/assets/optimized/logo-mark-256w.avif";
import logoMarkAvif384 from "@/assets/optimized/logo-mark-384w.avif";
import logoMarkAvif512 from "@/assets/optimized/logo-mark-512w.avif";
import logoMarkWebp256 from "@/assets/optimized/logo-mark-256w.webp";
import logoMarkWebp384 from "@/assets/optimized/logo-mark-384w.webp";
import logoMarkWebp512 from "@/assets/optimized/logo-mark-512w.webp";

import davinciResolveFallback from "@/assets/davinci-resolve.png";
import davinciResolveAvif64 from "@/assets/optimized/davinci-resolve-64w.avif";
import davinciResolveAvif96 from "@/assets/optimized/davinci-resolve-96w.avif";
import davinciResolveAvif128 from "@/assets/optimized/davinci-resolve-128w.avif";
import davinciResolveWebp64 from "@/assets/optimized/davinci-resolve-64w.webp";
import davinciResolveWebp96 from "@/assets/optimized/davinci-resolve-96w.webp";
import davinciResolveWebp128 from "@/assets/optimized/davinci-resolve-128w.webp";

const heroPortraitAvifSrcSet = `${heroPortraitAvif360} 360w, ${heroPortraitAvif480} 480w, ${heroPortraitAvif720} 720w, ${heroPortraitAvif960} 960w`;
const heroPortraitWebpSrcSet = `${heroPortraitWebp360} 360w, ${heroPortraitWebp480} 480w, ${heroPortraitWebp720} 720w, ${heroPortraitWebp960} 960w`;

const colorGradingBeforeAvifSrcSet = `${colorGradingBeforeAvif640} 640w, ${colorGradingBeforeAvif960} 960w, ${colorGradingBeforeAvif1280} 1280w`;
const colorGradingBeforeWebpSrcSet = `${colorGradingBeforeWebp640} 640w, ${colorGradingBeforeWebp960} 960w, ${colorGradingBeforeWebp1280} 1280w`;

const colorGradingAfterAvifSrcSet = `${colorGradingAfterAvif640} 640w, ${colorGradingAfterAvif960} 960w, ${colorGradingAfterAvif1280} 1280w`;
const colorGradingAfterWebpSrcSet = `${colorGradingAfterWebp640} 640w, ${colorGradingAfterWebp960} 960w, ${colorGradingAfterWebp1280} 1280w`;

const logoMarkAvifSrcSet = `${logoMarkAvif256} 256w, ${logoMarkAvif384} 384w, ${logoMarkAvif512} 512w`;
const logoMarkWebpSrcSet = `${logoMarkWebp256} 256w, ${logoMarkWebp384} 384w, ${logoMarkWebp512} 512w`;

const davinciResolveAvifSrcSet = `${davinciResolveAvif64} 64w, ${davinciResolveAvif96} 96w, ${davinciResolveAvif128} 128w`;
const davinciResolveWebpSrcSet = `${davinciResolveWebp64} 64w, ${davinciResolveWebp96} 96w, ${davinciResolveWebp128} 128w`;

export const heroPortraitSources: ImageSources = {
  fallback: heroPortraitFallback,
  avifSrcSet: heroPortraitAvifSrcSet,
  webpSrcSet: heroPortraitWebpSrcSet,
};

export const colorGradingBeforeSources: ImageSources = {
  fallback: colorGradingBeforeFallback,
  avifSrcSet: colorGradingBeforeAvifSrcSet,
  webpSrcSet: colorGradingBeforeWebpSrcSet,
};

export const colorGradingAfterSources: ImageSources = {
  fallback: colorGradingAfterFallback,
  avifSrcSet: colorGradingAfterAvifSrcSet,
  webpSrcSet: colorGradingAfterWebpSrcSet,
};

export const logoMarkSources: ImageSources = {
  fallback: logoMarkFallback,
  avifSrcSet: logoMarkAvifSrcSet,
  webpSrcSet: logoMarkWebpSrcSet,
};

export const davinciResolveSources: ImageSources = {
  fallback: davinciResolveFallback,
  avifSrcSet: davinciResolveAvifSrcSet,
  webpSrcSet: davinciResolveWebpSrcSet,
};

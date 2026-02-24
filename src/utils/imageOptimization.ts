/**
 * Image optimization utilities
 * Helps reduce payload size through responsive images and lazy loading
 */

interface ResponsiveImageProps {
  src: string;
  alt: string;
  widths?: number[];
  sizes?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Generate srcset for responsive images
 */
export const generateSrcSet = (
  baseSrc: string,
  widths: number[] = [320, 640, 960, 1280, 1920]
): string => {
  return widths
    .map((width) => {
      // Assumes images follow naming convention: image.jpg, image-640w.jpg
      const ext = baseSrc.split('.').pop();
      const name = baseSrc.replace(`.${ext}`, '');
      return `${name}-${width}w.${ext} ${width}w`;
    })
    .join(', ');
};

/**
 * Recommended sizes attribute for common breakpoints
 */
export const commonSizes = {
  hero: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px',
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 400px',
  thumbnail: '(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 300px',
};

/**
 * Intersection Observer for lazy loading images
 */
export const observeImage = (img: HTMLImageElement) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          if (image.dataset.src) {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
            observer.unobserve(image);
          }
        }
      });
    });
    observer.observe(img);
  }
};

export default {
  generateSrcSet,
  commonSizes,
  observeImage,
};

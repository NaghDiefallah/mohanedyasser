/**
 * Dynamic import utilities for code-splitting heavy components
 * Helps reduce main bundle size and improve Time to Interactive
 */

import { lazy, Suspense, ReactNode, ComponentType } from 'react';

/**
 * Create a lazy-loaded component with a custom loading fallback
 */
export const withLazyLoad = <P extends Record<string, any> = {}>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  LoadingComponent?: ReactNode,
  ErrorComponent?: ReactNode
) => {
  const LazyComponent = lazy(importFn);

  return (props: P) => (
    <Suspense fallback={LoadingComponent || <div className="h-screen" />}>
      <LazyComponent {...(props as any)} />
    </Suspense>
  );
};

/**
 * Prefetch a component to load it in advance
 * Useful for components you know will be needed soon
 */
export const prefetchComponent = (
  importFn: () => Promise<{ default: ComponentType }>
) => {
  // Start loading immediately
  importFn().catch((error) => {
    console.warn('Failed to prefetch component:', error);
  });
};

export default {
  withLazyLoad,
  prefetchComponent,
};

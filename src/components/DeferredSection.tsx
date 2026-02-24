import { ReactNode, useEffect, useRef, useState } from "react";

interface DeferredSectionProps {
  children: ReactNode;
  minHeight?: number;
  rootMargin?: string;
  fallback?: ReactNode;
}

const DeferredSection = ({
  children,
  minHeight = 200,
  rootMargin = "200px",
  fallback,
}: DeferredSectionProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldRender) return;

    let timeoutId: number | undefined;
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const renderNow = () => setShouldRender(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          renderNow();
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    if (win.requestIdleCallback) {
      const idleId = win.requestIdleCallback(renderNow, { timeout: 2500 });
      return () => {
        observer.disconnect();
        win.cancelIdleCallback?.(idleId);
      };
    }

    timeoutId = window.setTimeout(renderNow, 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [rootMargin, shouldRender]);

  if (shouldRender) return <>{children}</>;

  return (
    <div ref={placeholderRef} style={{ minHeight }}>
      {fallback ?? null}
    </div>
  );
};

export default DeferredSection;

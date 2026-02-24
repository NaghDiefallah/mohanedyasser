import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import PageTransition from "./PageTransition";

// Lazy load route components
const Index = lazy(() => import("@/pages/Index"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const ReelsGallery = lazy(() => import("@/pages/ReelsGallery"));
const MotionGraphicsGallery = lazy(() => import("@/pages/MotionGraphicsGallery"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-primary text-xl">Loading...</div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/reels"
          element={
            <PageTransition>
              <ReelsGallery />
            </PageTransition>
          }
        />
        <Route
          path="/motion-graphics"
          element={
            <PageTransition>
              <MotionGraphicsGallery />
            </PageTransition>
          }
        />
        <Route
          path="/project/:slug"
          element={
            <PageTransition>
              <ProjectDetail />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

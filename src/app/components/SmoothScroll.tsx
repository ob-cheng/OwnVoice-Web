import ReactLenis from "lenis/react";
import "lenis/dist/lenis.css";

/**
 * Wraps the page in Lenis smooth scroll.
 * Provides a buttery, linear-interpolated scrolling feel.
 *
 * - `lerp` controls the smoothness (lower = more inertia, higher = snappier)
 * - Touch / mobile: Lenis uses native touch scroll by default
 * - Respects prefers-reduced-motion automatically
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        autoResize: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

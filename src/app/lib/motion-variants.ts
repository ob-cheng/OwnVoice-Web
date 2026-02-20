import { useReducedMotion } from "motion/react";

export function useShouldReduceMotion() {
  return useReducedMotion();
}

const EASING = [0.22, 1, 0.36, 1] as const;

export const fadeInUp = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: EASING },
  }),
};

export const blurReveal = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 8 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.8, ease: EASING },
  },
};

export const scaleSubtle = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: EASING },
  }),
};

export const staggerContainer = (stagger = 0.15) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
});

export const staggerLine = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASING },
  },
};

export function getMotionProps(reduce: boolean | null) {
  if (reduce) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      transition: { duration: 0 },
    };
  }
  return {};
}

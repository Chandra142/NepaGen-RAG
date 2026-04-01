const baseEase = [0.22, 1, 0.36, 1];

export const baseTransition = {
  duration: 0.55,
  ease: baseEase,
};

export const slowTransition = {
  duration: 0.85,
  ease: baseEase,
};

export const makeFadeUp = (delay = 0, distance = 24) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...baseTransition, delay },
  },
});

export const makeSlideIn = (direction = 'up', delay = 0, distance = 32) => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const sign = direction === 'left' || direction === 'up' ? -1 : 1;
  return {
    hidden: { opacity: 0, [axis]: sign * distance },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: { ...baseTransition, delay },
    },
  };
};

export const staggerChildren = (stagger = 0.12, delayChildren = 0.08) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const floatCard = {
  initial: { y: 0 },
  animate: {
    y: [-4, 6, -4],
    transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const heroHighlight = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...slowTransition, delay: 0.15 },
  },
};

export const navVariants = {
  expanded: { y: 0, opacity: 1, transition: baseTransition },
  condensed: { y: -8, opacity: 0.94, scale: 0.96, transition: baseTransition },
};

export const messageReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...baseTransition, damping: 18 },
  },
};

export const chipVariants = makeFadeUp(0, 10);

export const getReducedMotionVariant = (prefersReducedMotion) =>
  prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
      }
    : undefined;

export default {
  baseTransition,
  slowTransition,
  makeFadeUp,
  makeSlideIn,
  staggerChildren,
  floatCard,
  heroHighlight,
  navVariants,
  messageReveal,
  chipVariants,
  getReducedMotionVariant,
};
